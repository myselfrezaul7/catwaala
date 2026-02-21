"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { submitToWeb3Forms } from "@/lib/web3forms";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/utils/firebase";
import { collection, addDoc } from "firebase/firestore";

export function AdoptionForm({ catName }: { catName: string }) {
    const { user } = useAuth();
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        const result = await submitToWeb3Forms({
            form_name: `Adoption Application for ${catName}`,
            cat_name: catName,
            ...data
        });

        setIsSubmitting(false);

        if (result.success) {
            try {
                await addDoc(collection(db, "adoptions"), {
                    dogName: catName, // Re-using property name for compatibility with admin page if they share DB structures, or changing to petName
                    catName: catName,
                    applicantName: data.name,
                    applicantEmail: data.email || "",
                    applicantPhone: data.phone,
                    status: "Pending",
                    created_at: Date.now(),
                    experience: data.message,
                    userId: user?.uid || null,
                });
            } catch (e) {
                console.error("Failed to save adoption to firestore:", e);
            }

            setSubmitted(true);
            form.reset();
        } else {
            alert(result.message || "Failed to submit. Please try again.");
        }
    };

    if (submitted) {
        return (
            <div className="bg-emerald-50 p-8 rounded-2xl border border-emerald-100 text-center">
                <h3 className="text-xl font-bold text-emerald-700 mb-2">Application Sent! 😻</h3>
                <p className="text-stone-600">
                    We've received your request to adopt {catName}. We'll review it and get back to you shortly.
                </p>
                <Button variant="outline" onClick={() => setSubmitted(false)} className="mt-4 border-emerald-200 text-emerald-700 hover:bg-emerald-100">
                    Send another
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 glass-card p-8 rounded-[2rem]">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-stone-700">Name</label>
                    <input name="name" required type="text" className="w-full p-3 rounded-xl border border-amber-100 bg-white/60 focus:ring-2 focus:ring-rose-500 outline-none placeholder:text-stone-400 text-stone-700" placeholder="Your Name" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-stone-700">Phone</label>
                    <input name="phone" required type="tel" className="w-full p-3 rounded-xl border border-amber-100 bg-white/60 focus:ring-2 focus:ring-rose-500 outline-none placeholder:text-stone-400 text-stone-700" placeholder="017..." />
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-bold text-stone-700">Email (Optional)</label>
                <input name="email" type="email" className="w-full p-3 rounded-xl border border-amber-100 bg-white/60 focus:ring-2 focus:ring-rose-500 outline-none placeholder:text-stone-400 text-stone-700" placeholder="you@example.com" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-bold text-stone-700">Why do you want to adopt {catName}?</label>
                <textarea name="message" required className="w-full p-3 rounded-xl border border-amber-100 bg-white/60 focus:ring-2 focus:ring-rose-500 outline-none min-h-[100px] placeholder:text-stone-400 text-stone-700" placeholder="Tell us about your home and experience with cats..." />
            </div>
            <div className="hidden">
                {/* HoneyPot for spam protection */}
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
            </div>
            <Button type="submit" size="lg" disabled={isSubmitting} className="w-full text-lg h-14 shadow-xl shadow-rose-500/20 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white rounded-2xl transition-all duration-300">
                {isSubmitting ? "Sending..." : "Submit Adoption Application"}
            </Button>
            <p className="text-center text-xs text-stone-400 mt-2">
                We will review your application and contact you within 24 hours.
            </p>
        </form>
    );
}
