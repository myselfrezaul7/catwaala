"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { submitToWeb3Forms } from "@/lib/web3forms";

export function AdoptionForm({ catName }: { catName: string }) {
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
            setSubmitted(true);
            form.reset();
        } else {
            alert(result.message || "Failed to submit. Please try again.");
        }
    };

    if (submitted) {
        return (
            <div className="bg-green-50 dark:bg-green-900/20 p-8 rounded-2xl border border-green-100 dark:border-green-800 text-center">
                <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-2">Application Sent! 😻</h3>
                <p className="text-slate-600 dark:text-slate-300">
                    We've received your request to adopt {catName}. We'll review it and get back to you shortly.
                </p>
                <Button variant="outline" onClick={() => setSubmitted(false)} className="mt-4">
                    Send another
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-rose-50/50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-rose-100 dark:border-zinc-800">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Name</label>
                    <input name="name" required type="text" className="w-full p-3 rounded-xl border bg-white dark:bg-black focus:ring-2 focus:ring-rose-500 outline-none" placeholder="Your Name" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Phone</label>
                    <input name="phone" required type="tel" className="w-full p-3 rounded-xl border bg-white dark:bg-black focus:ring-2 focus:ring-rose-500 outline-none" placeholder="017..." />
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Email (Optional)</label>
                <input name="email" type="email" className="w-full p-3 rounded-xl border bg-white dark:bg-black focus:ring-2 focus:ring-rose-500 outline-none" placeholder="you@example.com" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Why do you want to adopt {catName}?</label>
                <textarea name="message" required className="w-full p-3 rounded-xl border bg-white dark:bg-black focus:ring-2 focus:ring-rose-500 outline-none min-h-[100px]" placeholder="Tell us about your home and experience with cats..." />
            </div>
            <div className="hidden">
                {/* HoneyPot for spam protection */}
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
            </div>
            <Button type="submit" size="lg" disabled={isSubmitting} className="w-full text-lg h-14 shadow-xl shadow-rose-500/20 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl">
                {isSubmitting ? "Sending..." : "Submit Adoption Application"}
            </Button>
            <p className="text-center text-xs text-slate-400 mt-2">
                We will review your application and contact you within 24 hours.
            </p>
        </form>
    );
}
