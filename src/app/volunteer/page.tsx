"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Truck, Camera, Calendar, CheckCircle } from "lucide-react";

export default function VolunteerPage() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-rose-50/50">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 text-green-600 dark:text-green-400">
                    <CheckCircle className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold mb-4 font-heading">Application Received!</h2>
                <p className="text-slate-600 max-w-md mb-8">
                    Thank you for offering your time. Our coordinator will reach out to you via email shortly.
                </p>
                <Button onClick={() => setSubmitted(false)} className="bg-rose-600 hover:bg-rose-700">Submit Another</Button>
            </div>
        )
    }

    return (
        <div className="min-h-screen py-16 px-4 bg-white dark:bg-zinc-950">
            <div className="container mx-auto max-w-5xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 font-heading text-slate-900 dark:text-white">Join the Catwaala Heroes</h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Volunteers are the backbone of our mission. Whether you can spare an hour a week or a whole day, every bit of help saves lives.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-start">
                    <div>
                        <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Ways to Help</h2>
                        <div className="space-y-6">
                            <div className="flex gap-4 p-6 bg-rose-50 dark:bg-zinc-900 rounded-2xl border border-rose-100 dark:border-zinc-800">
                                <div className="w-12 h-12 bg-white dark:bg-zinc-800 rounded-xl flex items-center justify-center text-rose-500 shadow-sm shrink-0">
                                    <Heart className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Foster Care</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm">Provide a temporary home for kittens or recovering cats. We cover food and vet bills.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 p-6 bg-blue-50 dark:bg-zinc-900 rounded-2xl border border-blue-100 dark:border-zinc-800">
                                <div className="w-12 h-12 bg-white dark:bg-zinc-800 rounded-xl flex items-center justify-center text-blue-500 shadow-sm shrink-0">
                                    <Truck className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Transport</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm">Help transport cats to vet appointments or their new forever homes.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 p-6 bg-purple-50 dark:bg-zinc-900 rounded-2xl border border-purple-100 dark:border-zinc-800">
                                <div className="w-12 h-12 bg-white dark:bg-zinc-800 rounded-xl flex items-center justify-center text-purple-500 shadow-sm shrink-0">
                                    <Camera className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Photography</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm">Take beautiful photos of our rescues to help them get adopted faster.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-zinc-800">
                        <h2 className="text-2xl font-bold mb-6">Volunteer Application</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Name</label>
                                    <input required className="w-full p-3 rounded-xl border bg-slate-50 dark:bg-black" placeholder="Your Name" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Phone</label>
                                    <input required className="w-full p-3 rounded-xl border bg-slate-50 dark:bg-black" placeholder="017..." />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Email</label>
                                <input type="email" required className="w-full p-3 rounded-xl border bg-slate-50 dark:bg-black" placeholder="you@example.com" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Oragnization (Optional)</label>
                                <input className="w-full p-3 rounded-xl border bg-slate-50 dark:bg-black" placeholder="University/Workplace" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Why do you want to volunteer?</label>
                                <textarea required className="w-full p-3 rounded-xl border bg-slate-50 dark:bg-black min-h-[100px]" placeholder="Tell us a bit about yourself..." />
                            </div>
                            <Button type="submit" className="w-full h-12 text-lg bg-slate-900 hover:bg-rose-600">Apply Now</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
