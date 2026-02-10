"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { MapPin, Camera, AlertTriangle, CheckCircle, PawPrint, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReCAPTCHA from "react-google-recaptcha";
import dynamic from "next/dynamic";
import { submitToWeb3Forms } from "@/lib/web3forms";
import { ReportService } from "@/services/ReportService";

// Dynamically import LocationPicker to avoid SSR issues with Leaflet
const LocationPicker = dynamic(() => import("@/components/shared/LocationPicker"), {
    ssr: false,
    loading: () => <div className="h-[300px] w-full bg-amber-50 animate-pulse rounded-xl flex items-center justify-center text-stone-400">Loading Map...</div>
});

type ReportFormType = {
    type: "Lost" | "Found" | "Injured";
    locationDetails: string;
    latitude?: number;
    longitude?: number;
    description: string;
    contact: string;
    image: FileList;
};

export function ReportForm() {
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting }, reset } = useForm<ReportFormType>();
    const [submitted, setSubmitted] = useState(false);
    const [captchaValue, setCaptchaValue] = useState<string | null>(null);
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    const onSubmit = async (data: ReportFormType) => {
        if (!captchaValue) {
            alert("Please verify you are not a robot (or a very smart cat).");
            return;
        }

        if (!data.latitude || !data.longitude) {
            alert("Please pin the location on the map.");
            return;
        }

        try {
            let imageUrl = null;
            if (data.image && data.image.length > 0) {
                imageUrl = await ReportService.uploadImage(data.image[0]);
            }

            await ReportService.create({
                type: data.type,
                description: data.description,
                latitude: data.latitude,
                longitude: data.longitude,
                location_text: data.locationDetails,
                contact_info: data.contact, // Check if schema uses contact_info
                image_url: imageUrl,
            });

            setSubmitted(true);
            reset();
            setCaptchaValue(null);
            recaptchaRef.current?.reset();
        } catch (error) {
            console.error(error);
            alert("Failed to submit report. Please try again.");
        }
    };

    if (submitted) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
                    <CheckCircle className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold mb-4 font-heading text-stone-800">Report Received</h2>
                <p className="text-stone-500 max-w-md mb-8">
                    We've alerted the Catwaala volunteer network. Thank you for being a responsible citizen.
                </p>
                <Button onClick={() => setSubmitted(false)} className="bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-500/20">Submit Another</Button>
            </div>
        )
    }

    return (
        <div className="min-h-screen py-16 px-4">
            <div className="max-w-xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2 font-heading text-stone-800">
                        <AlertTriangle className="text-rose-500 fill-rose-100" /> Report an Issue
                    </h1>
                    <p className="text-stone-500">
                        Found a stray kitten alone? Or a cat in distress?
                    </p>
                </div>

                <div className="glass-card p-8 rounded-[2.5rem]">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                        <div className="space-y-3">
                            <label className="text-sm font-bold text-stone-700">Situation Type</label>
                            <div className="grid grid-cols-3 gap-3">
                                {["Lost", "Found", "Injured"].map((type) => (
                                    <label key={type} className="cursor-pointer">
                                        <input
                                            type="radio"
                                            value={type}
                                            {...register("type", { required: true })}
                                            className="peer sr-only"
                                        />
                                        <div className="text-center p-3 rounded-xl border-2 border-amber-100 peer-checked:border-rose-500 peer-checked:bg-rose-50 transition-all font-bold text-stone-500 peer-checked:text-rose-600 bg-white/50">
                                            {type}
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-stone-700 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-rose-500" /> Pin Location
                            </label>
                            <div className="rounded-xl overflow-hidden border-2 border-amber-100/60 shadow-inner">
                                <LocationPicker
                                    onLocationSelect={(lat, lng) => {
                                        setValue("latitude", lat);
                                        setValue("longitude", lng);
                                    }}
                                />
                            </div>
                            <input
                                {...register("locationDetails", { required: "Please provide location details" })}
                                className="w-full p-3 rounded-xl border border-amber-100 bg-white/60 focus:ring-2 focus:ring-rose-500 outline-none mt-2 placeholder:text-stone-400 text-stone-700"
                                placeholder="Details (e.g. Near Dhanmondi Lake, Bridge 2)"
                            />
                            {errors.locationDetails && <p className="text-xs text-rose-500 font-medium">{errors.locationDetails.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-stone-700">Description</label>
                            <textarea
                                {...register("description", { required: "Please provide details" })}
                                className="w-full p-3 rounded-xl border border-amber-100 bg-white/60 focus:ring-2 focus:ring-rose-500 outline-none min-h-[100px] placeholder:text-stone-400 text-stone-700"
                                placeholder="Calico cat with a limp, missing collar..."
                            />
                            {errors.description && <p className="text-xs text-rose-500 font-medium">{errors.description.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-stone-700 flex items-center gap-2">
                                <Camera className="w-4 h-4 text-rose-500" /> Photo (Optional)
                            </label>
                            <div className="border-2 border-dashed border-rose-200 rounded-2xl p-8 text-center bg-rose-50/50 hover:bg-rose-50 transition-colors cursor-pointer relative group">
                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" {...register("image")} />
                                <PawPrint className="w-8 h-8 mx-auto text-rose-300 mb-2 group-hover:scale-110 transition-transform" />
                                <p className="text-sm text-stone-500 font-medium">Tap to upload a photo</p>
                            </div>
                            <p className="text-xs text-stone-400 text-center">Supported formats: JPG, PNG, MP4. Max size: 10MB.</p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-stone-700">Your Contact</label>
                            <input
                                {...register("contact", { required: "Contact is required" })}
                                className="w-full p-3 rounded-xl border border-amber-100 bg-white/60 focus:ring-2 focus:ring-rose-500 outline-none placeholder:text-stone-400 text-stone-700"
                                placeholder="Phone or Email"
                            />
                            {errors.contact && <p className="text-xs text-rose-500 font-medium">{errors.contact.message}</p>}
                        </div>

                        <div className="flex justify-center py-2">
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"} // Test key
                                onChange={(val) => setCaptchaValue(val)}
                            />
                        </div>

                        <Button type="submit" className="w-full h-14 text-lg font-bold shadow-xl shadow-rose-500/20 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white rounded-2xl transition-all duration-300" disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Submit Report"}
                        </Button>

                        <div className="flex items-center justify-center gap-2 text-xs text-stone-400">
                            <Shield className="w-3.5 h-3.5" />
                            <p>All reports are verified by our team.</p>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}
