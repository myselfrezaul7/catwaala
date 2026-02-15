"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Heart, Hand, CheckCircle, AlertTriangle, User, Mail, Phone, MessageSquare } from "lucide-react";
import { submitToWeb3Forms } from "@/lib/web3forms";
import confetti from "canvas-confetti";

type VolunteerFormData = {
    name: string;
    email: string;
    phone?: string;
    interest: string;
    message?: string;
};

export function VolunteerForm() {
    const [submitted, setSubmitted] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<VolunteerFormData>({
        defaultValues: {
            interest: "General",
        },
    });

    const onSubmit = async (data: VolunteerFormData) => {
        setServerError(null);

        const result = await submitToWeb3Forms({
            form_name: "Volunteer Application",
            ...data,
        });

        if (result.success) {
            setSubmitted(true);
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#f97316', '#fb923c', '#ffffff'] // Orange theme colors
            });
            reset();
        } else {
            setServerError(result.message || "Failed to submit application. Please try again.");
        }
    };

    if (submitted) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-emerald-100/80 rounded-full flex items-center justify-center mb-6 text-emerald-600 shadow-lg shadow-emerald-100">
                    <CheckCircle className="w-12 h-12" />
                </div>
                <h2 className="text-4xl font-bold mb-4 font-heading text-stone-800">Application Received!</h2>
                <p className="text-stone-500 max-w-md mb-8 text-lg">
                    Thank you for offering your time and love. We will review your application and contact you soon.
                </p>
                <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    className="rounded-xl border-emerald-200 text-emerald-600 hover:bg-emerald-50 h-12 px-8 text-base"
                >
                    Submit Another Application
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-24 px-4 bg-gradient-to-br from-orange-50/50 via-white to-orange-50/30">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center p-3 bg-orange-100 rounded-2xl mb-4 text-orange-600">
                        <Hand className="w-8 h-8" />
                    </div>
                    <h1 className="text-5xl font-bold mb-6 font-heading text-stone-800 tracking-tight">
                        Join the Rescue Squad
                    </h1>
                    <p className="text-xl text-stone-500 max-w-2xl mx-auto leading-relaxed">
                        We need more hands to pet cats (and scoop litter). Whether you can foster, transport, or help with events, we have a spot for you.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
                    {/* Info Card */}
                    <div className="glass-card p-10 rounded-[2.5rem] bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl shadow-orange-500/5 sticky top-24">
                        <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-stone-800">
                            <div className="p-2 bg-rose-100 rounded-lg text-rose-500">
                                <Heart className="w-6 h-6 fill-rose-500" />
                            </div>
                            Why Volunteer?
                        </h3>
                        <ul className="space-y-6">
                            {[
                                "Make a direct impact on animal welfare in Dhaka.",
                                "Gain experience in rescue operations and care.",
                                "Join a community of passionate animal lovers.",
                                "Unlimited purrs and headbutts (guaranteed)."
                            ].map((item, index) => (
                                <li key={index} className="flex gap-4 items-start text-stone-600 font-medium text-lg group">
                                    <div className="w-2 h-2 rounded-full bg-orange-400 mt-2.5 shrink-0 group-hover:scale-150 transition-transform duration-300" />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <div className="mt-10 p-6 bg-orange-50 rounded-2xl border border-orange-100">
                            <p className="text-orange-800 font-medium italic">
                                "Saving one cat will not change the world, but surely for that one cat, the world will change forever."
                            </p>
                        </div>
                    </div>

                    {/* Form Card */}
                    <div className="glass-card p-10 rounded-[2.5rem] bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl shadow-orange-500/10">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {serverError && (
                                <div className="p-4 bg-red-50 text-red-600 text-sm rounded-2xl flex items-center gap-3 border border-red-100 animate-in slide-in-from-top-2">
                                    <AlertTriangle className="w-5 h-5 shrink-0" /> {serverError}
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-stone-700 ml-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5" />
                                    <input
                                        {...register("name", { required: "Name is required" })}
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-stone-200 bg-white/50 focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all placeholder:text-stone-400 text-stone-800 font-medium"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                                {errors.name && <p className="text-red-500 text-sm ml-1">{errors.name.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-stone-700 ml-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5" />
                                    <input
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address"
                                            }
                                        })}
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-stone-200 bg-white/50 focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all placeholder:text-stone-400 text-stone-800 font-medium"
                                        placeholder="your@email.com"
                                    />
                                </div>
                                {errors.email && <p className="text-red-500 text-sm ml-1">{errors.email.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-stone-700 ml-1">Phone Number <span className="text-stone-400 font-normal">(Optional)</span></label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5" />
                                    <input
                                        {...register("phone")}
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-stone-200 bg-white/50 focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all placeholder:text-stone-400 text-stone-800 font-medium"
                                        placeholder="+880 1XXX XXXXXX"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-stone-700 ml-1">I want to help with...</label>
                                <div className="relative">
                                    <select
                                        {...register("interest")}
                                        className="w-full pl-4 pr-10 py-4 rounded-2xl border border-stone-200 bg-white/50 focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-stone-800 font-medium appearance-none cursor-pointer hover:bg-white/80"
                                    >
                                        <option value="General">General Help</option>
                                        <option value="Fostering">Fostering (Short-term home)</option>
                                        <option value="Transport">Transport (Driving cats to vet)</option>
                                        <option value="SocialMedia">Social Media / Photography</option>
                                        <option value="AdoptionEvents">Adoption Events</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-stone-500">▼</div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-stone-700 ml-1">Message <span className="text-stone-400 font-normal">(Optional)</span></label>
                                <div className="relative">
                                    <MessageSquare className="absolute left-4 top-5 text-stone-400 w-5 h-5" />
                                    <textarea
                                        {...register("message")}
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-stone-200 bg-white/50 focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all placeholder:text-stone-400 text-stone-800 font-medium min-h-[120px] resize-none"
                                        placeholder="Tell us a bit about yourself and why you'd like to join..."
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold h-14 text-lg rounded-2xl shadow-xl shadow-orange-500/20 hover:shadow-orange-500/30 active:scale-[0.98] transition-all duration-300"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Sending Application...
                                    </div>
                                ) : (
                                    "Submit Application"
                                )}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
