"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PawPrint, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
    return (
        <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-rose-50/50 dark:bg-zinc-900/50">
            {/* Decorative blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-rose-200/30 mix-blend-multiply filter blur-3xl opacity-60 animate-float" />
            <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-indigo-200/30 mix-blend-multiply filter blur-3xl opacity-60 animate-float delay-1000" />

            <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
                <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-slate-100 leading-[1.1] mb-6 font-heading">
                            Every Cat Deserves a <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-indigo-500">Soft Landing.</span>
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                            We bridge the gap between street cats and loving homes. Adopt, foster, or support the feline welfare movement in Bangladesh.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                    >
                        <Link href="/adopt">
                            <Button size="lg" className="w-full sm:w-auto text-lg h-14 rounded-full shadow-xl shadow-rose-500/20 bg-rose-600 hover:bg-rose-700">
                                Adopt a Cat
                            </Button>
                        </Link>
                        <Link href="/volunteer">
                            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 rounded-full border-2">
                                Become a Volunteer
                            </Button>
                        </Link>
                    </motion.div>
                </div>

                {/* Hero Illustration/Image Placeholder */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative order-1 lg:order-2 flex justify-center"
                >
                    <div className="relative w-full max-w-md aspect-[3/4] rounded-t-full rounded-b-[200px] overflow-hidden border-8 border-white/50 dark:border-white/10 shadow-2xl bg-rose-100 flex items-center justify-center">
                        {/* This would be a real image */}
                        <div className="absolute inset-0 bg-gradient-to-br from-rose-200 to-indigo-100 flex items-center justify-center">
                            <PawPrint className="w-40 h-40 text-white opacity-50 rotate-12" />
                        </div>

                        {/* Floating badge */}
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-20 -left-6 bg-white dark:bg-zinc-800 p-4 rounded-2xl shadow-xl flex items-center gap-3 z-20 max-w-[200px]"
                        >
                            <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 shrink-0">
                                <Heart className="w-5 h-5 fill-current" />
                            </div>
                            <div>
                                <p className="font-bold text-sm">1,200+ Rescued</p>
                                <p className="text-xs text-slate-500">Since 2023</p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
