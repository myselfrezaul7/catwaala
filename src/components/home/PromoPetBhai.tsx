"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Sparkles, Gift } from "lucide-react";

export function PromoPetBhai() {
    return (
        <section className="py-8 md:py-16 relative overflow-hidden bg-stone-50 dark:bg-zinc-900/50">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[200px] md:h-[350px] bg-gradient-to-r from-purple-500/20 via-fuchsia-500/20 to-pink-500/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="container mx-auto px-4 max-w-5xl relative z-10">
                <div className="relative bg-gradient-to-br from-purple-950/80 via-zinc-900/90 to-purple-900/80 backdrop-blur-2xl border border-purple-500/30 rounded-3xl md:rounded-[2.5rem] p-6 sm:p-8 md:p-12 overflow-hidden shadow-[0_12px_40px_rgba(147,51,234,0.15)] text-white">
                    {/* Creative Floating Glass & Decorative Badges (Desktop & Mobile scale) */}
                    <motion.div 
                        animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-4 -right-4 md:top-6 md:right-8 w-20 h-20 md:w-32 md:h-32 bg-purple-500/20 backdrop-blur-xl border border-purple-400/30 rounded-2xl md:rounded-3xl flex items-center justify-center pointer-events-none shadow-xl"
                    >
                        <ShoppingBag className="w-10 h-10 md:w-16 md:h-16 text-purple-300 opacity-80" />
                    </motion.div>

                    <motion.div 
                        animate={{ y: [0, 8, 0], rotate: [0, -5, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute -bottom-6 -left-4 md:bottom-4 md:left-6 w-16 h-16 md:w-24 md:h-24 bg-fuchsia-500/20 backdrop-blur-xl border border-fuchsia-400/30 rounded-2xl md:rounded-3xl flex items-center justify-center pointer-events-none shadow-xl"
                    >
                        <Gift className="w-8 h-8 md:w-12 md:h-12 text-fuchsia-300 opacity-80" />
                    </motion.div>

                    {/* Main Content inside One Compact Card */}
                    <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto space-y-4 sm:space-y-6">
                        {/* Tag */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs sm:text-sm font-semibold"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-400"></span>
                            </span>
                            <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                            Official E-Commerce Partner
                        </motion.div>

                        {/* Title */}
                        <motion.h2
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight leading-tight"
                        >
                            Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-300 to-pink-400">PetBhai.com</span>
                        </motion.h2>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-sm sm:text-base md:text-lg text-purple-100/80 max-w-xl font-normal leading-relaxed"
                        >
                            Everything your newborn kitten needs—premium food, cat trees, and essentials delivered right to your door.
                        </motion.p>

                        {/* Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="pt-2 sm:pt-4"
                        >
                            <a
                                href="https://www.petbhai.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-fuchsia-600 hover:from-purple-400 hover:to-fuchsia-500 text-white rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base hover:scale-105 transition-all duration-200 shadow-lg shadow-purple-500/30 border border-purple-400/40"
                            >
                                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                                Explore PetBhai Shop
                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
