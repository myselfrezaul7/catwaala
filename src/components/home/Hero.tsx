"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
    return (
        <section className="relative min-h-[85vh] flex items-center overflow-hidden">
            {/* Warm decorative blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-rose-200/25 filter blur-3xl opacity-70 animate-float" />
            <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-amber-200/25 filter blur-3xl opacity-70 animate-float" style={{ animationDelay: "2s" }} />
            <div className="absolute top-[60%] left-[30%] w-[300px] h-[300px] rounded-full bg-orange-100/30 filter blur-3xl opacity-50 animate-float" style={{ animationDelay: "4s" }} />

            <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
                <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-semibold text-rose-600 mb-6">
                            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                            Bangladesh&apos;s Cat Rescue Platform
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-stone-800 leading-[1.1] mb-6">
                            Every Cat Deserves a <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-rose-600">Loving Home</span>
                        </h1>
                        <p className="text-xl text-stone-500 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                            Join us in transforming the lives of street cats in Bangladesh through rescue, care, and adoption.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                    >
                        <Link href="/adopt">
                            <Button size="lg" className="w-full sm:w-auto text-lg h-14 rounded-2xl shadow-xl shadow-rose-500/20 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-rose-500/30 gap-2">
                                Adopt a Cat <ArrowRight className="w-5 h-5" />
                            </Button>
                        </Link>
                        <Link href="/volunteer">
                            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 rounded-2xl border-2 border-stone-200 text-stone-700 hover:border-rose-300 hover:text-rose-600 hover:bg-rose-50/50 font-semibold transition-all duration-300">
                                Become a Volunteer
                            </Button>
                        </Link>
                    </motion.div>
                </div>

                {/* Hero Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative order-1 lg:order-2 flex justify-center"
                >
                    <div className="relative w-full max-w-md aspect-[3/4] rounded-t-full rounded-b-[200px] overflow-hidden border-4 border-white/70 shadow-2xl shadow-rose-100/50 bg-amber-50 flex items-center justify-center">
                        <img
                            src="/hero-community.png"
                            alt="Community caring for cats"
                            className="w-full h-full object-cover"
                        />

                        {/* Floating badge */}
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-20 -left-6 glass-card p-4 rounded-2xl flex items-center gap-3 z-20 max-w-[200px]"
                        >
                            <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center text-rose-500 shrink-0">
                                <Heart className="w-5 h-5 fill-current" />
                            </div>
                            <div>
                                <p className="font-bold text-sm text-stone-800">500+ Rescued</p>
                                <p className="text-xs text-stone-400">Since 2020</p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
