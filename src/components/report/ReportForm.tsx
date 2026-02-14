"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { MapPin, Camera, AlertTriangle, CheckCircle, PawPrint, Shield, ChevronRight, ChevronLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReCAPTCHA from "react-google-recaptcha";
import dynamic from "next/dynamic";
import { ReportService } from "@/services/ReportService";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import { submitToWeb3Forms } from "@/lib/web3forms";

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

const STEPS = [
    { id: 1, title: "Situation", icon: AlertTriangle },
    { id: 2, title: "Location", icon: MapPin },
    { id: 3, title: "Details", icon: Camera },
    { id: 4, title: "Contact", icon: Shield },
];

export function ReportForm() {
    const { user } = useAuth();
    const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting }, reset, trigger } = useForm<ReportFormType>();
    const [submitted, setSubmitted] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    // Verification State
    const [captchaValue, setCaptchaValue] = useState<string | null>(null);
    const [useMathChallenge, setUseMathChallenge] = useState(false);
    const [mathChallenge, setMathChallenge] = useState({ q: "3 + 4", a: "7" });
    const [userMathAnswer, setUserMathAnswer] = useState("");
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    // Watch values for previews
    const imageFiles = watch("image");
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        if (imageFiles && imageFiles.length > 0) {
            const file = imageFiles[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    }, [imageFiles]);

    // Initialize Math Challenge
    useEffect(() => {
        const n1 = Math.floor(Math.random() * 10);
        const n2 = Math.floor(Math.random() * 10);
        setMathChallenge({ q: `${n1} + ${n2}`, a: (n1 + n2).toString() });
    }, []);

    const handleRecaptchaError = () => {
        console.warn("reCAPTCHA failed to load. Falling back to Math Challenge.");
        setUseMathChallenge(true);
    };

    const nextStep = async () => {
        let valid = false;
        if (currentStep === 1) valid = await trigger("type");
        if (currentStep === 2) valid = await trigger(["latitude", "longitude", "locationDetails"]);
        if (currentStep === 3) valid = await trigger("description");

        if (valid) setCurrentStep(prev => prev + 1);
    };

    const prevStep = () => setCurrentStep(prev => prev - 1);

    const onSubmit = async (data: ReportFormType) => {
        // Verification Check
        if (useMathChallenge) {
            if (userMathAnswer.trim() !== mathChallenge.a) {
                alert(`Incorrect answer. Please solve ${mathChallenge.q}`);
                return;
            }
        } else {
            if (!captchaValue) {
                alert("Please complete the reCAPTCHA verification.");
                return;
            }
        }

        try {
            let imageUrl = null;
            if (data.image && data.image.length > 0) {
                try {
                    imageUrl = await ReportService.uploadImage(data.image[0]);
                } catch (uploadError) {
                    console.error("Image upload failed:", uploadError);
                    alert("Failed to upload image. Checks your internet connection or try a smaller image.");
                    return;
                }
            }

            await ReportService.create({
                type: data.type,
                description: data.description,
                latitude: data.latitude,
                longitude: data.longitude,
                location_text: data.locationDetails,
                contact_info: data.contact,
                image_url: imageUrl,
                user_id: user?.uid, // Link report to user
            });

            // Send Email Notification via Web3Forms
            await submitToWeb3Forms({
                form_name: "New Rescue Report",
                subject: `🚨 New ${data.type} Cat Report!`,
                message: `
                    <strong>Type:</strong> ${data.type} <br/>
                    <strong>Location:</strong> ${data.locationDetails} <br/>
                    <strong>Coordinates:</strong> <a href="https://www.google.com/maps?q=${data.latitude},${data.longitude}">${data.latitude}, ${data.longitude}</a> <br/>
                    <strong>Description:</strong> ${data.description} <br/>
                    <strong>Contact:</strong> ${data.contact} <br/>
                    <strong>Image:</strong> ${imageUrl ? `<a href="${imageUrl}">View Image</a>` : "No image uploaded"}
                `,
                // Web3Forms specific fields to make the email look better
                from_name: "Catwaala Reporter",
            });

            setSubmitted(true);
            reset();
            setCaptchaValue(null);
            if (recaptchaRef.current) recaptchaRef.current.reset();
            setImagePreview(null);
        } catch (error) {
            console.error("Submission failed:", error);
            alert("Failed to submit report. Please check your connection and try again.");
        }
    };

    if (submitted) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600 shadow-lg shadow-green-200">
                    <CheckCircle className="w-12 h-12" />
                </div>
                <h2 className="text-4xl font-bold mb-4 font-heading text-stone-800">Report Received</h2>
                <p className="text-stone-500 max-w-md mb-8 text-lg">
                    We've alerted the Catwaala volunteer network. The report has been securely sent to our system. Thank you for being a responsible citizen. 🐱
                </p>
                <Button onClick={() => { setSubmitted(false); setCurrentStep(1); }} className="bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-500/20 rounded-full px-8 py-6 text-lg">
                    Submit Another Report
                </Button>
            </div>
        )
    }

    return (
        <div className="min-h-screen py-12 px-4 flex items-center justify-center">
            <div className="w-full max-w-2xl">

                {/* Steps Header */}
                <div className="mb-8 flex justify-between items-center relative px-4">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-stone-200 -z-10 rounded-full"></div>
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-rose-500 transition-all duration-500 -z-10 rounded-full" style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}></div>

                    {STEPS.map((step) => {
                        const Icon = step.icon;
                        const isActive = currentStep >= step.id;
                        const isCurrent = currentStep === step.id;
                        return (
                            <div key={step.id} className="flex flex-col items-center gap-2">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${isActive ? 'bg-rose-500 border-rose-100 text-white shadow-lg shadow-rose-500/30' : 'bg-white border-stone-200 text-stone-300'}`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <span className={`text-xs font-bold transition-colors ${isCurrent ? 'text-rose-600' : 'text-stone-400'}`}>{step.title}</span>
                            </div>
                        )
                    })}
                </div>

                <div className="glass-card p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden transition-all duration-500">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                        {/* STEP 1: SITUATION */}
                        {currentStep === 1 && (
                            <div className="space-y-6 animate-in slide-in-from-right-8 fade-in duration-300">
                                <div className="text-center mb-8">
                                    <h2 className="text-2xl font-bold text-stone-800 font-heading">What's the situation?</h2>
                                    <p className="text-stone-500">Choose the option that best describes the emergency.</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {["Lost", "Found", "Injured"].map((type) => (
                                        <label key={type} className="cursor-pointer group">
                                            <input
                                                type="radio"
                                                value={type}
                                                {...register("type", { required: true })}
                                                className="peer sr-only"
                                            />
                                            <div className="h-32 flex flex-col items-center justify-center p-4 rounded-3xl border-2 border-stone-100 bg-white/50 peer-checked:border-rose-500 peer-checked:bg-rose-50 peer-checked:shadow-xl peer-checked:shadow-rose-500/10 transition-all group-hover:border-rose-200">
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${type === 'Injured' ? 'bg-red-100 text-red-500' : type === 'Lost' ? 'bg-orange-100 text-orange-500' : 'bg-emerald-100 text-emerald-500'}`}>
                                                    {type === 'Injured' ? <AlertTriangle className="w-6 h-6" /> : type === 'Lost' ? <Shield className="w-6 h-6" /> : <PawPrint className="w-6 h-6" />}
                                                </div>
                                                <span className="font-bold text-stone-600 peer-checked:text-rose-600 text-lg">{type}</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                                {errors.type && <p className="text-center text-rose-500 font-medium">Please select a situation type.</p>}
                            </div>
                        )}

                        {/* STEP 2: LOCATION */}
                        {currentStep === 2 && (
                            <div className="space-y-4 animate-in slide-in-from-right-8 fade-in duration-300">
                                <div className="text-center mb-6">
                                    <h2 className="text-2xl font-bold text-stone-800 font-heading">Where is it?</h2>
                                    <p className="text-stone-500">Pin the exact location to help rescuers find it fast.</p>
                                </div>
                                <div className="rounded-2xl overflow-hidden border-4 border-white shadow-inner h-[300px] relative">
                                    <LocationPicker
                                        onLocationSelect={(lat, lng) => {
                                            setValue("latitude", lat);
                                            setValue("longitude", lng);
                                        }}
                                    />
                                    {(!watch("latitude") || !watch("longitude")) && (
                                        <div className="absolute inset-0 bg-black/5 flex items-center justify-center pointer-events-none">
                                            <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg text-sm font-bold text-rose-600 animate-bounce">
                                                Click on map to pin location
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-500 w-5 h-5" />
                                    <input
                                        {...register("locationDetails", { required: "Please provide specific location details" })}
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl border-none ring-1 ring-stone-200 bg-white/80 focus:ring-2 focus:ring-rose-500 outline-none text-stone-700 font-medium shadow-sm transition-all"
                                        placeholder="Specific details (e.g. Beside the tea stall, under the bridge...)"
                                    />
                                </div>
                                {errors.locationDetails && <p className="text-sm text-rose-500 font-bold ml-2">{errors.locationDetails.message}</p>}
                            </div>
                        )}

                        {/* STEP 3: DETAILS */}
                        {currentStep === 3 && (
                            <div className="space-y-6 animate-in slide-in-from-right-8 fade-in duration-300">
                                <div className="text-center mb-6">
                                    <h2 className="text-2xl font-bold text-stone-800 font-heading">Add Details</h2>
                                    <p className="text-stone-500">A picture says a thousand words.</p>
                                </div>

                                <div className="space-y-4">
                                    <textarea
                                        {...register("description", { required: "Please provide a description" })}
                                        className="w-full p-4 rounded-2xl border-none ring-1 ring-stone-200 bg-white/80 focus:ring-2 focus:ring-rose-500 outline-none min-h-[120px] text-stone-700 resize-none font-medium text-lg leading-relaxed shadow-sm"
                                        placeholder="Describe the animal (color, size, condition)..."
                                    />
                                    {errors.description && <p className="text-sm text-rose-500 font-bold ml-2">{errors.description.message}</p>}

                                    <div className="relative group">
                                        <div className={`border-2 border-dashed rounded-3xl p-8 text-center transition-all cursor-pointer relative overflow-hidden ${imagePreview ? 'border-rose-500 bg-white' : 'border-stone-300 bg-stone-50 hover:bg-stone-100 hover:border-rose-300'}`}>
                                            <input
                                                type="file"
                                                className="absolute inset-0 z-20 opacity-0 cursor-pointer"
                                                accept="image/*"
                                                {...register("image", {
                                                    validate: {
                                                        lessThan10MB: (files) => {
                                                            if (!files || files.length === 0) return true;
                                                            return files[0].size <= 10 * 1024 * 1024 || "File size should be less than 10MB";
                                                        }
                                                    }
                                                })}
                                            />

                                            {imagePreview ? (
                                                <div className="relative z-10 h-48 w-full">
                                                    <Image src={imagePreview} alt="Preview" fill className="object-cover rounded-2xl" />
                                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
                                                        <p className="text-white font-bold flex items-center gap-2"><Camera /> Change Photo</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="py-6">
                                                    <div className="w-16 h-16 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                                        <Camera className="w-8 h-8" />
                                                    </div>
                                                    <h3 className="text-lg font-bold text-stone-700">Upload Photo</h3>
                                                    <p className="text-stone-400 text-sm mt-1">Tap to select from gallery (Max 10MB)</p>
                                                </div>
                                            )}
                                        </div>
                                        {errors.image && <p className="text-sm text-rose-500 font-bold mt-2 ml-2">{errors.image.message}</p>}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 4: CONTACT & VERIFY */}
                        {currentStep === 4 && (
                            <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-300">
                                <div className="text-center mb-6">
                                    <h2 className="text-2xl font-bold text-stone-800 font-heading">Final Step</h2>
                                    <p className="text-stone-500">How can we reach you?</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="relative">
                                        <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-500 w-5 h-5" />
                                        <input
                                            {...register("contact", { required: "Contact info is required" })}
                                            className="w-full pl-12 pr-4 py-4 rounded-2xl border-none ring-1 ring-stone-200 bg-white/80 focus:ring-2 focus:ring-rose-500 outline-none text-stone-700 font-bold text-lg shadow-sm"
                                            placeholder="Mobile Number"
                                        />
                                    </div>
                                </div>

                                <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
                                    <p className="text-stone-500 text-sm font-bold mb-4 text-center uppercase tracking-wider">Security Check</p>
                                    <div className="flex justify-center">
                                        {!useMathChallenge ? (
                                            <ReCAPTCHA
                                                ref={recaptchaRef}
                                                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                                                onChange={(val) => setCaptchaValue(val)}
                                                onError={handleRecaptchaError} // Trigger fallback on error
                                                onExpired={() => setCaptchaValue(null)}
                                            />
                                        ) : (
                                            <div className="text-center space-y-3 w-full max-w-xs">
                                                <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
                                                    <p className="text-lg font-bold text-stone-700 mb-2">What is {mathChallenge.q}?</p>
                                                    <input
                                                        type="number"
                                                        className="w-full p-2 text-center text-xl font-bold border rounded-lg focus:ring-2 focus:ring-rose-500 outline-none"
                                                        placeholder="?"
                                                        value={userMathAnswer}
                                                        onChange={(e) => setUserMathAnswer(e.target.value)}
                                                    />
                                                </div>
                                                <p className="text-xs text-stone-400">reCAPTCHA failed to load. Please solve this simple math problem.</p>
                                            </div>
                                        )}
                                    </div>
                                    {(!captchaValue && !useMathChallenge) && (
                                        <p className="text-center text-xs text-rose-400 mt-2 cursor-pointer hover:underline" onClick={() => setUseMathChallenge(true)}>
                                            Having trouble with reCAPTCHA? Switch to simple mode.
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex gap-4 pt-4">
                            {currentStep > 1 && (
                                <Button type="button" onClick={prevStep} className="flex-1 h-14 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-600 font-bold text-lg" disabled={isSubmitting}>
                                    Back
                                </Button>
                            )}

                            {currentStep < 4 ? (
                                <Button type="button" onClick={nextStep} className="flex-1 h-14 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-lg shadow-xl shadow-rose-500/20">
                                    Next Step <ChevronRight className="ml-2 w-5 h-5" />
                                </Button>
                            ) : (
                                <Button type="submit" className="flex-1 h-14 rounded-2xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold text-lg shadow-xl shadow-rose-500/20" disabled={isSubmitting}>
                                    {isSubmitting ? "Submitting..." : "Submit Report"}
                                </Button>
                            )}
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}
