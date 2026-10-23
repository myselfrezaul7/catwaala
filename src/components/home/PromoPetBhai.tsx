"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Sparkles } from "lucide-react";

export function PromoPetBhai() {
    return (
        <section className="py-12 md:py-20 relative overflow-hidden bg-stone-50/50 dark:bg-zinc-950/40">
            <div className="container mx-auto px-4 max-w-5xl relative z-10">
                <div className="relative bg-gradient-to-br from-zinc-900 via-zinc-900 to-purple-950/70 border border-purple-500/20 dark:border-zinc-800 rounded-3xl md:rounded-[2.5rem] p-8 sm:p-10 md:p-14 overflow-hidden shadow-xl text-white">
                    {/* Subtle ambient light */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

                    {/* Main Content inside One Compact Card */}
                    <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto space-y-4 sm:space-y-6">
                        {/* Tag */}
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/15 border border-purple-400/20 text-purple-300 text-xs sm:text-sm font-semibold">
                            <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                            Official E-Commerce Partner
                        </div>

                        {/* Title */}
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
                            Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-300 to-pink-400">PetBhai.com</span>
                        </h2>

                        {/* Description */}
                        <p className="text-sm sm:text-base md:text-lg text-zinc-300 max-w-xl font-normal leading-relaxed">
                            Everything your rescued kitten needs—premium nutrition, accessories, and supplies delivered to your door.
                        </p>

                        {/* Button */}
                        <div className="pt-2 sm:pt-4">
                            <a
                                href="https://www.petbhai.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl font-bold text-sm sm:text-base transition-all duration-200 shadow-lg shadow-purple-600/25 hover:-translate-y-0.5 border border-purple-400/30"
                            >
                                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span>Visit PetBhai Store</span>
                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
