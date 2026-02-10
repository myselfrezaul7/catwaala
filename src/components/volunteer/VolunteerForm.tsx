"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Hand, CheckCircle, AlertTriangle } from "lucide-react";
import { submitToWeb3Forms } from "@/lib/web3forms";

export function VolunteerForm() {
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const form = e.currentTarget;
        const formData = new FormData(form);

        const data = {
            form_name: "Volunteer Application",
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
            interest: formData.get("interest") as string,
            message: formData.get("message") as string,
        };

        const result = await submitToWeb3Forms(data);

        if (result.success) {
            setSubmitted(true);
            form.reset();
        } else {
            setError(result.message || "Failed to submit application. Please try again.");
        }
        setIsSubmitting(false);
    };

    if (submitted) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 text-emerald-600">
                    <CheckCircle className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold mb-4 font-heading text-stone-800">Application Received!</h2>
                <p className="text-stone-500 max-w-md mb-8">
                    Thank you for offering your time and love. We will review your application and contact you soon.
                </p>
                <Button onClick={() => setSubmitted(false)} variant="outline" className="rounded-xl border-emerald-200 text-emerald-600 hover:bg-emerald-50">Submit Another</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-20 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4 font-heading flex items-center justify-center gap-3 text-stone-800">
                        <Hand className="w-10 h-10 text-orange-500" /> Join the Squad
                    </h1>
                    <p className="text-lg text-stone-500 max-w-2xl mx-auto">
                        We need more hands to pet cats (and scoop litter). Whether you can foster, transport, or help with events, we have a spot for you.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="glass-card p-8 rounded-[2rem]">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-stone-800">
                            <Heart className="text-rose-500 w-5 h-5 fill-rose-500" /> Why Volunteer?
                        </h3>
                        <ul className="space-y-4 text-stone-600 font-medium">
                            <li className="flex items-start gap-3">
                                <span className="w-2 h-2 rounded-full bg-orange-500 mt-2 shrink-0"></span> Make a direct impact on animal welfare in Dhaka.
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-2 h-2 rounded-full bg-orange-500 mt-2 shrink-0"></span> Gain experience in rescue operations and care.
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-2 h-2 rounded-full bg-orange-500 mt-2 shrink-0"></span> Join a community of passionate animal lovers.
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-2 h-2 rounded-full bg-orange-500 mt-2 shrink-0"></span> Unlimited purrs and headbutts (guaranteed).
                            </li>
                        </ul>
                    </div>

                    <div className="glass-card p-8 rounded-[2rem]">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {error && (
                                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl flex items-center gap-2 border border-red-100">
                                    <AlertTriangle className="w-4 h-4" /> {error}
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-bold text-stone-700 mb-1.5">Name</label>
                                <input name="name" required className="w-full p-3 rounded-xl border border-amber-100 bg-white/60 focus:ring-2 focus:ring-orange-500 outline-none placeholder:text-stone-400 text-stone-700" placeholder="Your Name" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-stone-700 mb-1.5">Contact</label>
                                <input name="email" type="email" required className="w-full p-3 rounded-xl border border-amber-100 bg-white/60 focus:ring-2 focus:ring-orange-500 outline-none mb-3 placeholder:text-stone-400 text-stone-700" placeholder="Email Address" />
                                <input name="phone" type="tel" className="w-full p-3 rounded-xl border border-amber-100 bg-white/60 focus:ring-2 focus:ring-orange-500 outline-none placeholder:text-stone-400 text-stone-700" placeholder="Phone Number (Optional)" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-stone-700 mb-1.5">I want to help with...</label>
                                <div className="relative">
                                    <select name="interest" className="w-full p-3 rounded-xl border border-amber-100 bg-white/60 focus:ring-2 focus:ring-orange-500 outline-none text-stone-700 appearance-none">
                                        <option value="General">General Help</option>
                                        <option value="Fostering">Fostering (Short-term home)</option>
                                        <option value="Transport">Transport (Driving cats to vet)</option>
                                        <option value="SocialMedia">Social Media / Photography</option>
                                        <option value="AdoptionEvents">Adoption Events</option>
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">▼</div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-stone-700 mb-1.5">Message (Optional)</label>
                                <textarea name="message" className="w-full p-3 rounded-xl border border-amber-100 bg-white/60 focus:ring-2 focus:ring-orange-500 outline-none h-24 placeholder:text-stone-400 text-stone-700" placeholder="Tell us a bit about yourself..." />
                            </div>
                            <Button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold h-12 text-lg rounded-xl shadow-lg shadow-orange-500/20 transition-all duration-300" disabled={isSubmitting}>
                                {isSubmitting ? "Sending..." : "Submit Application"}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
