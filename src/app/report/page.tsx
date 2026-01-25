"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { MapPin, Camera, AlertTriangle, CheckCircle, PawPrint } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReCAPTCHA from "react-google-recaptcha";

type ReportForm = {
    type: "Lost" | "Found" | "Injured";
    location: string;
    description: string;
    contact: string;
    image: FileList;
};

export default function ReportPage() {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ReportForm>();
    const [submitted, setSubmitted] = useState(false);
    const [captchaValue, setCaptchaValue] = useState<string | null>(null);
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    const onSubmit = async (data: ReportForm) => {
        if (!captchaValue) {
            alert("Please verify you are not a robot (or a very smart cat).");
            return;
        }

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log("Form Data:", data, "Captcha:", captchaValue);

        setSubmitted(true);
        reset();
        setCaptchaValue(null);
        recaptchaRef.current?.reset();
    };

    if (submitted) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-rose-50/50">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 text-green-600 dark:text-green-400">
                    <CheckCircle className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold mb-4 font-heading">Report Received</h2>
                <p className="text-slate-600 max-w-md mb-8">
                    We've alerted the Catwaala volunteer network. Thank you for being a responsible citizen.
                </p>
                <Button onClick={() => setSubmitted(false)} className="bg-rose-600 hover:bg-rose-700">Submit Another</Button>
            </div>
        )
    }

    return (
        <div className="min-h-screen py-16 px-4 bg-rose-50/30 dark:bg-zinc-950">
            <div className="max-w-xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2 font-heading">
                        <AlertTriangle className="text-rose-500" /> Report an Issue
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        Found a stray kitten alone? Or a cat in distress?
                    </p>
                </div>

                <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl border border-rose-100 dark:border-zinc-800">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                        <div className="space-y-3">
                            <label className="text-sm font-medium">Situation Type</label>
                            <div className="grid grid-cols-3 gap-3">
                                {["Lost", "Found", "Injured"].map((type) => (
                                    <label key={type} className="cursor-pointer">
                                        <input
                                            type="radio"
                                            value={type}
                                            {...register("type", { required: true })}
                                            className="peer sr-only"
                                        />
                                        <div className="text-center p-3 rounded-xl border-2 border-slate-200 dark:border-zinc-700 peer-checked:border-rose-500 peer-checked:bg-rose-50 dark:peer-checked:bg-rose-900/20 transition-all font-bold text-slate-600 dark:text-slate-300 peer-checked:text-rose-600">
                                            {type}
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-rose-500" /> Location
                            </label>
                            <input
                                {...register("location", { required: "Location is required" })}
                                className="w-full p-3 rounded-lg border bg-background focus:ring-2 focus:ring-rose-500 outline-none"
                                placeholder="e.g. Near Dhanmondi Lake, Bridge 2"
                            />
                            {errors.location && <p className="text-xs text-red-500">{errors.location.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Description</label>
                            <textarea
                                {...register("description", { required: "Please provide details" })}
                                className="w-full p-3 rounded-lg border bg-background focus:ring-2 focus:ring-rose-500 outline-none min-h-[100px]"
                                placeholder="Calico cat with a limp, missing collar..."
                            />
                            {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2">
                                <Camera className="w-4 h-4 text-rose-500" /> Photo (Optional)
                            </label>
                            <div className="border-2 border-dashed border-rose-200 dark:border-zinc-700 rounded-xl p-8 text-center bg-rose-50 dark:bg-rose-900/10 hover:bg-rose-100 transition-colors cursor-pointer relative group">
                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" {...register("image")} />
                                <PawPrint className="w-8 h-8 mx-auto text-rose-300 mb-2 group-hover:scale-110 transition-transform" />
                                <p className="text-sm text-slate-500">Tap to upload a photo</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Your Contact</label>
                            <input
                                {...register("contact", { required: "Contact is required" })}
                                className="w-full p-3 rounded-lg border bg-background focus:ring-2 focus:ring-rose-500 outline-none"
                                placeholder="Phone or Email"
                            />
                            {errors.contact && <p className="text-xs text-red-500">{errors.contact.message}</p>}
                        </div>

                        <div className="flex justify-center py-2">
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"} // Test key
                                onChange={(val) => setCaptchaValue(val)}
                            />
                        </div>

                        <Button type="submit" className="w-full h-12 text-lg font-bold shadow-lg shadow-rose-500/20 bg-rose-600 hover:bg-rose-700/90" disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Submit Report"}
                        </Button>

                    </form>
                </div>
            </div>
        </div>
    );
}
