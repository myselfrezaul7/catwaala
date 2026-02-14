"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Heart, Gift, Award, CheckCircle } from "lucide-react";
// @ts-ignore
import confetti from "canvas-confetti";

type SponsorshipModalProps = {
    catName: string;
};

const TIERS = [
    { id: 'meal', name: 'Gift a Meal', amount: '500 BDT', icon: '🐟', desc: 'Provides food for 1 week.' },
    { id: 'vaccine', name: 'Vaccine Hero', amount: '1,500 BDT', icon: '💉', desc: 'Covers essential vaccinations.' },
    { id: 'guardian', name: 'Guardian Angel', amount: '5,000 BDT', icon: '👼', desc: 'Helps with medical emergencies.' },
];

export function SponsorshipModal({ catName }: SponsorshipModalProps) {
    const [selectedTier, setSelectedTier] = useState<string | null>(null);
    const [step, setStep] = useState<'select' | 'payment' | 'success'>('select');

    const handleSponsor = () => {
        setStep('success');
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#f43f5e', '#fbbf24', '#10b981']
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="flex-1 h-16 rounded-2xl border-2 border-rose-100 text-rose-600 font-bold text-lg hover:bg-rose-50 hover:border-rose-200 transition-all">
                    <Heart className="mr-2 w-5 h-5 fill-rose-100" /> Sponsor Me
                </Button>
            </DialogTrigger>
            <DialogContent className="glass-card border-white/50 max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl font-bold font-heading">
                        {step === 'success' ? 'Thank You! 🎉' : `Sponsor ${catName}`}
                    </DialogTitle>
                </DialogHeader>

                {step === 'select' && (
                    <div className="py-4 space-y-4">
                        <p className="text-center text-stone-500 mb-6">
                            Can't adopt right now? You can still change {catName}'s life.
                        </p>
                        <div className="grid gap-3">
                            {TIERS.map((tier) => (
                                <button
                                    key={tier.id}
                                    onClick={() => setSelectedTier(tier.id)}
                                    className={`relative p-4 rounded-2xl border-2 text-left transition-all ${selectedTier === tier.id
                                        ? 'border-rose-500 bg-rose-50 shadow-md ring-2 ring-rose-200 ring-offset-2'
                                        : 'border-stone-100 hover:border-rose-200 bg-white/50'
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-bold text-stone-800 flex items-center gap-2">
                                            <span className="text-2xl">{tier.icon}</span> {tier.name}
                                        </span>
                                        <span className="text-rose-600 font-bold bg-white px-3 py-1 rounded-lg border border-rose-100 text-sm">
                                            {tier.amount}
                                        </span>
                                    </div>
                                    <p className="text-stone-500 text-sm pl-10">{tier.desc}</p>
                                    {selectedTier === tier.id && (
                                        <div className="absolute top-4 right-4 text-rose-500">
                                            <CheckCircle className="w-5 h-5 fill-rose-100" />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                        <Button
                            className="w-full h-12 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 text-white font-bold shadow-lg shadow-rose-500/20 mt-4"
                            disabled={!selectedTier}
                            onClick={() => setStep('payment')}
                        >
                            Continue
                        </Button>
                    </div>
                )}

                {step === 'payment' && (
                    <div className="py-8 text-center space-y-6 animate-in slide-in-from-right-8 fade-in">
                        <div className="w-20 h-20 bg-stone-100 rounded-2xl mx-auto flex items-center justify-center text-4xl">
                            💳
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-stone-800">Complete Donation</h3>
                            <p className="text-stone-500 text-sm mt-2">Mock Payment Gateway...</p>
                        </div>
                        <Button
                            className="w-full h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold shadow-lg shadow-emerald-500/20"
                            onClick={handleSponsor}
                        >
                            Pay {TIERS.find(t => t.id === selectedTier)?.amount}
                        </Button>
                        <button onClick={() => setStep('select')} className="text-stone-400 text-sm hover:underline">
                            Back
                        </button>
                    </div>
                )}

                {step === 'success' && (
                    <div className="py-8 text-center space-y-6 animate-in zoom-in fade-in duration-500">
                        <div className="w-24 h-24 bg-rose-100 rounded-full mx-auto flex items-center justify-center text-rose-500 shadow-xl shadow-rose-200">
                            <Award className="w-12 h-12" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-stone-800">You're Awesome!</h3>
                            <p className="text-stone-500 mt-2 max-w-[260px] mx-auto">
                                You've just earned the <strong>{TIERS.find(t => t.id === selectedTier)?.name}</strong> badge!
                            </p>
                        </div>
                        <Button
                            className="w-full h-12 rounded-xl bg-stone-800 text-white font-bold"
                            onClick={() => setStep('select')}
                        >
                            Close
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
