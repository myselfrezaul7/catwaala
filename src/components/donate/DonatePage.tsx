"use client";

import { useState } from "react";
import { Copy, Check, Heart, Pill, Syringe, Scissors, Wallet, ArrowRight, Cat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type DonationOption = {
    id: string;
    title: string;
    description: string;
    icon: any;
    amount: string;
    color: string;
    bgColor: string;
};

const OPTIONS: DonationOption[] = [
    {
        id: "medicine",
        title: "Donate Medicine",
        description: "Directly fund or send essential medicines for injured cats.",
        icon: Pill,
        amount: "Any Amount",
        color: "text-blue-500",
        bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
        id: "vaccine",
        title: "Sponsor Cat Vaccine",
        description: "Cover the cost of a Tricat or Rabies vaccine for one rescue.",
        icon: Syringe,
        amount: "1000 BDT",
        color: "text-teal-500",
        bgColor: "bg-teal-100 dark:bg-teal-900/30",
    },
    {
        id: "neuter",
        title: "Sponsor Neuter/Spay",
        description: "Fund a sterilization surgery to control the stray cat population.",
        icon: Scissors,
        amount: "2000 BDT",
        color: "text-purple-500",
        bgColor: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
        id: "other",
        title: "General Donation",
        description: "Support our daily operations, cat food, and emergency rescues.",
        icon: Wallet,
        amount: "Custom",
        color: "text-rose-500",
        bgColor: "bg-rose-100 dark:bg-rose-900/30",
    },
];

export function DonatePage() {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Number copied to clipboard!");
    };

    return (
        <div className="min-h-screen bg-[#FFFDF8] dark:bg-zinc-950 pb-20">
            {/* Hero Section */}
            <div className="relative pt-32 pb-20 px-4 overflow-hidden bg-orange-50/50 dark:bg-zinc-900/50">
                <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
                <div className="container mx-auto text-center relative z-10 max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-zinc-800 shadow-sm border border-orange-100 dark:border-zinc-800 mb-6">
                        <Cat className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
                        <span className="text-sm font-bold text-foreground">Purr-fect Generosity</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold font-heading text-foreground mb-6 leading-tight">
                        Your Support = <span className="text-orange-500">More Purrs</span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        We rely 100% on community donations. Every taka goes directly towards feeding, treating, and sheltering street cats in Bangladesh.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-20">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {OPTIONS.map((option) => {
                        const Icon = option.icon;
                        const isSelected = selectedOption === option.id;
                        return (
                            <div
                                key={option.id}
                                onClick={() => setSelectedOption(option.id)}
                                className={`
                                    cursor-pointer rounded-[2rem] p-6 border-2 transition-all duration-300 relative overflow-hidden group
                                    ${isSelected
                                        ? "bg-white dark:bg-zinc-900 border-orange-500 shadow-xl scale-105 z-10"
                                        : "bg-white/80 dark:bg-zinc-900/80 border-transparent hover:border-orange-200 dark:hover:border-zinc-700 hover:shadow-lg backdrop-blur-md"}
                                `}
                            >
                                <div className={`w-14 h-14 rounded-2xl ${option.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon className={`w-7 h-7 ${option.color}`} />
                                </div>
                                <h3 className="text-xl font-bold mb-2 font-heading">{option.title}</h3>
                                <p className="text-sm text-muted-foreground mb-4 min-h-[60px]">{option.description}</p>
                                <div className={`inline-block px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${option.bgColor} ${option.color}`}>
                                    {option.amount}
                                </div>

                                {isSelected && (
                                    <div className="absolute top-4 right-4 text-orange-500 bg-orange-100/50 rounded-full p-1 animate-in zoom-in">
                                        <Check className="w-5 h-5" />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Donation Details Section (Revealed on Selection) */}
                {selectedOption && (
                    <div className="mt-12 animate-in slide-in-from-bottom-8 fade-in duration-500 max-w-4xl mx-auto">
                        <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-orange-100 dark:border-zinc-800 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 to-amber-400" />

                            <div className="text-center mb-10">
                                <h2 className="text-3xl font-bold mb-4 font-heading">
                                    Donate via Mobile Banking
                                </h2>
                                <p className="text-muted-foreground">
                                    Send your donation to one of the numbers below. Please use <span className="font-bold text-orange-500">"Cat Rescue"</span> as the reference.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8 mb-10">
                                {/* bKash */}
                                <div className="bg-pink-50 dark:bg-pink-900/10 rounded-2xl p-6 border border-pink-100 dark:border-pink-900/30 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-pink-500 text-white rounded-xl flex items-center justify-center font-bold text-xl">
                                            b
                                        </div>
                                        <div>
                                            <p className="font-bold text-lg">bKash</p>
                                            <p className="text-pink-600 font-mono text-xl tracking-wider">Coming Soon</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Nagad */}
                                <div className="bg-orange-50 dark:bg-orange-900/10 rounded-2xl p-6 border border-orange-100 dark:border-orange-900/30 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-orange-500 text-white rounded-xl flex items-center justify-center font-bold text-xl">
                                            N
                                        </div>
                                        <div>
                                            <p className="font-bold text-lg">Nagad</p>
                                            <p className="text-orange-600 font-mono text-xl tracking-wider">Coming Soon</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Instructions for Medicine */}
                            {selectedOption === 'medicine' && (
                                <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/30 flex flex-col items-start gap-4 mb-8">
                                    <div className="flex items-start gap-4">
                                        <Pill className="w-6 h-6 text-blue-500 shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-2">Donate Physical Medicines?</h4>
                                            <p className="text-sm text-blue-600 dark:text-blue-200 mb-2">
                                                We accept unused medicines! Please email us to arrange a pickup or drop-off.
                                            </p>
                                        </div>
                                    </div>
                                    <a href="mailto:catwaala@gmail.com" className="ml-10">
                                        <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6">
                                            Mail Us at catwaala@gmail.com
                                        </Button>
                                    </a>
                                </div>
                            )}

                            <div className="text-center">
                                <p className="text-sm text-muted-foreground mb-4">
                                    After sending, please email us with the Transaction ID so we can thank you!
                                </p>
                                <a href="mailto:donate@catwaala.com">
                                    <Button className="rounded-full px-8 h-12 shadow-lg shadow-orange-500/20 bg-orange-500 hover:bg-orange-600 text-white">
                                        Sent Donation? Click to Notify Us <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </div>
                )}

                {/* FAQ / Trust Section */}
                <div className="max-w-3xl mx-auto mt-24 text-center">
                    <h3 className="text-2xl font-bold mb-8">Where does the money go?</h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div>
                            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4 text-2xl">🐟</div>
                            <h4 className="font-bold mb-2">60% Food (Fish/Rice)</h4>
                            <p className="text-sm text-muted-foreground">Daily meals for 80+ cats and kitten formula.</p>
                        </div>
                        <div>
                            <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4 text-2xl">⚕️</div>
                            <h4 className="font-bold mb-2">30% Medical</h4>
                            <p className="text-sm text-muted-foreground">Emergency surgeries, vaccinations, and deworming.</p>
                        </div>
                        <div>
                            <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4 text-2xl">🏠</div>
                            <h4 className="font-bold mb-2">10% Shelter</h4>
                            <p className="text-sm text-muted-foreground">Litter, cleaning supplies, and rent.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
