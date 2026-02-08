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
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 text-green-600 dark:text-green-400">
                    <CheckCircle className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold mb-4 font-heading">Application Received!</h2>
                <p className="text-slate-600 max-w-md mb-8">
                    Thank you for offering your time and love. We will review your application and contact you soon.
                </p>
                <Button onClick={() => setSubmitted(false)} variant="outline">Submit Another</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-20 px-4 bg-orange-50/50 dark:bg-zinc-950">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4 font-heading flex items-center justify-center gap-3">
                        <Hand className="w-10 h-10 text-orange-500" /> Join the Squad
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        We need more hands to pet cats (and scoop litter). Whether you can foster, transport, or help with events, we have a spot for you.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl border border-orange-100 dark:border-zinc-800">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Heart className="text-rose-500 w-5 h-5" /> Why Volunteer?
                        </h3>
                        <ul className="space-y-3 text-slate-600 dark:text-slate-400">
                            <li className="flex items-start gap-2">
                                <span className="text-orange-500 mt-1">•</span> Make a direct impact on animal welfare in Dhaka.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-orange-500 mt-1">•</span> Gain experience in rescue operations and care.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-orange-500 mt-1">•</span> Join a community of passionate animal lovers.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-orange-500 mt-1">•</span> Unlimited purrs and headbutts (guaranteed).
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl border border-orange-100 dark:border-zinc-800">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4" /> {error}
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <input name="name" required className="w-full p-3 rounded-xl border bg-slate-50 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Your Name" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Contact</label>
                                <input name="email" type="email" required className="w-full p-3 rounded-xl border bg-slate-50 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 focus:ring-2 focus:ring-orange-500 outline-none mb-2" placeholder="Email Address" />
                                <input name="phone" type="tel" className="w-full p-3 rounded-xl border bg-slate-50 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Phone Number (Optional)" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">I want to help with...</label>
                                <select name="interest" className="w-full p-3 rounded-xl border bg-slate-50 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 focus:ring-2 focus:ring-orange-500 outline-none">
                                    <option value="General">General Help</option>
                                    <option value="Fostering">Fostering (Short-term home)</option>
                                    <option value="Transport">Transport (Driving cats to vet)</option>
                                    <option value="SocialMedia">Social Media / Photography</option>
                                    <option value="AdoptionEvents">Adoption Events</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Message (Optional)</label>
                                <textarea name="message" className="w-full p-3 rounded-xl border bg-slate-50 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 focus:ring-2 focus:ring-orange-500 outline-none h-24" placeholder="Tell us a bit about yourself..." />
                            </div>
                            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold h-12 text-lg rounded-xl shadow-lg shadow-orange-500/20" disabled={isSubmitting}>
                                {isSubmitting ? "Sending..." : "Submit Application"}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
