"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag } from "lucide-react";
import Image from "next/image";

export function PromoPetBhai() {
    return (
        <section className="py-16 md:py-24 relative overflow-hidden bg-stone-50 dark:bg-zinc-900/50">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-200/50 dark:bg-purple-900/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-fuchsia-200/50 dark:bg-fuchsia-900/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>

            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <div className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl border border-border/50 rounded-[2.5rem] p-8 md:p-12 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        {/* Text Content */}
                        <div className="flex-1 space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-semibold"
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                                </span>
                                Coming Soon
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-3xl md:text-5xl font-bold text-foreground leading-tight font-sans"
                            >
                                Prepare your home.<br />
                                The ultimate <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-600">pet shop</span> is coming.
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="text-lg text-muted-foreground max-w-xl"
                            >
                                We are building something special for you and your furry friends. 
                                Everything your newly adopted buddy needs, from premium food to cozy beds, 
                                delivered right to your doorstep.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="pt-4"
                            >
                                <a
                                    href="https://www.petbhai.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white rounded-2xl font-bold hover:scale-105 transition-all shadow-lg shadow-purple-500/25"
                                >
                                    <ShoppingBag className="w-5 h-5" />
                                    Visit PetBhai.com
                                    <ArrowRight className="w-5 h-5" />
                                </a>
                            </motion.div>
                        </div>

                        {/* Image/Visual Content */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
                            className="flex-1 relative w-full aspect-square md:aspect-auto md:h-[400px] rounded-3xl overflow-hidden bg-gradient-to-br from-purple-100 to-fuchsia-100 dark:from-purple-900/20 dark:to-fuchsia-900/20 border border-purple-200/50 dark:border-purple-800/50 flex items-center justify-center"
                        >
                            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
                            {/* Abstract decorative elements to represent shopping/pets */}
                            <div className="relative z-10 w-48 h-48 bg-white dark:bg-zinc-800 rounded-3xl shadow-2xl rotate-3 flex items-center justify-center p-6 border border-border/50">
                                <ShoppingBag className="w-24 h-24 text-purple-500" />
                            </div>
                            <div className="absolute z-0 w-32 h-32 bg-fuchsia-200 dark:bg-fuchsia-800/50 rounded-full blur-2xl top-1/4 right-1/4"></div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
