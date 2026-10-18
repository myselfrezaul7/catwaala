"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RemoteConfigService } from "@/services/RemoteConfigService";

export function Hero() {
    return (
        <section className="relative py-12 lg:py-32 flex items-center overflow-hidden bg-background">
            {/* Subtle premium gradient background instead of muddy blobs */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-70" />

            <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
                <motion.div 
                    className="space-y-8 text-center lg:text-left order-2 lg:order-1"
                    initial="hidden"
                    animate="visible"
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
                >
                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}>
                        {RemoteConfigService.isHeroAnnouncementEnabled ? (
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-sm font-semibold text-amber-700 dark:text-amber-400 mb-6 border border-amber-200 dark:border-amber-800/50">
                                <AlertCircle className="w-4 h-4" />
                                {RemoteConfigService.heroAnnouncementText}
                            </div>
                        ) : (
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm font-semibold text-primary mb-6 border border-border">
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                Bangladesh&apos;s biggest cat community platform
                            </div>
                        )}
                    </motion.div>
                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}>
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-foreground leading-[1.1] mb-6 tracking-tight">
                            Every Cat Deserves a <span className="text-primary">Loving Home</span>
                        </h1>
                    </motion.div>
                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}>
                        <p className="text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
                            Join us in transforming the lives of street cats in Bangladesh through rescue, care, and adoption.
                        </p>
                    </motion.div>
                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-2 sm:pt-4 w-full sm:w-auto">
                            <Link href="/adopt" className="w-full sm:w-auto">
                                <motion.div whileTap={{ scale: 0.96 }} className="w-full">
                                    <Button size="lg" className="w-full sm:w-auto text-base sm:text-lg h-14 px-8 rounded-2xl shadow-xl shadow-rose-500/20 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 transition-transform hover:-translate-y-1 text-white font-bold">
                                        Adopt a Cat
                                    </Button>
                                </motion.div>
                            </Link>
                            <Link href="/volunteer" className="w-full sm:w-auto text-center">
                                <motion.div whileTap={{ scale: 0.96 }} className="w-full">
                                    <Button size="lg" variant="outline" className="w-full sm:w-auto text-rose-600 dark:text-rose-400 text-base sm:text-lg h-14 px-8 rounded-2xl border-2 border-stone-200 dark:border-zinc-800 hover:bg-stone-100 dark:hover:bg-zinc-800 transition-transform hover:-translate-y-1 bg-transparent hover:text-rose-700 dark:hover:text-rose-300 font-bold shadow-sm">
                                        Become a Volunteer
                                    </Button>
                                </motion.div>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Floating Companion Badge Redirect */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                        className="mt-8 md:mt-12 flex justify-center lg:justify-start"
                    >
                        <a
                            href="https://www.kuttawaala.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative inline-flex items-center gap-2 sm:gap-4 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md border border-border/50 dark:border-zinc-800 px-2 py-2 pr-4 sm:pr-6 rounded-full shadow-lg shadow-zinc-200/20 dark:shadow-none hover:bg-white dark:hover:bg-zinc-900 transition-all duration-300 overflow-hidden"
                        >
                            {/* Hover Color Sweep */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/5 to-amber-500/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-out" />

                            {/* Split Circle Icon */}
                            <div className="relative w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:rotate-180 shrink-0 border border-zinc-200 dark:border-zinc-700">
                                <div className="absolute inset-y-0 left-0 w-1/2 bg-teal-100 dark:bg-teal-900/40 flex justify-end items-center pr-1 transition-colors duration-300">
                                    <span className="text-[12px] opacity-70 group-hover:rotate-180 transition-transform duration-500">🐈</span>
                                </div>
                                <div className="absolute inset-y-0 right-0 w-1/2 bg-amber-100 dark:bg-amber-900/40 flex justify-start items-center pl-1 transition-colors duration-300">
                                    <span className="text-[12px] opacity-70 group-hover:-rotate-180 transition-transform duration-500">🐕</span>
                                </div>
                                <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-zinc-200 dark:border-zinc-700 z-10" />
                            </div>

                            <div className="relative z-10 flex flex-col justify-center">
                                <span className="hidden sm:block text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-wider leading-none mb-1">Also love dogs?</span>
                                <span className="text-sm font-bold text-foreground leading-none group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors flex items-center gap-1">
                                    Visit Kuttawaala
                                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-amber-500" />
                                </span>
                            </div>
                        </a>
                    </motion.div>
                </motion.div>

                {/* Right Column — Subtle & Clean Stray Newborn Kitten Portrait */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
                    className="order-1 lg:order-2 relative"
                >
                    <div className="relative mx-auto max-w-md lg:max-w-none">
                        {/* Subtle warm ambient halo */}
                        <div className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-tr from-amber-500/10 via-rose-500/5 to-transparent blur-2xl pointer-events-none" />

                        {/* Clean framed image container */}
                        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-stone-100 dark:bg-zinc-900 border border-stone-200/80 dark:border-zinc-800/80 shadow-[0_20px_50px_rgba(28,25,23,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
                            <Image
                                src="/assets/hero-newborn-kitten.webp"
                                alt="Tiny stray newborn kitten rescued in Dhaka"
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 45vw, 520px"
                                className="object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />

                            {/* Minimal, clean bottom caption pill */}
                            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-2xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-4 py-3 border border-white/60 dark:border-zinc-800 shadow-sm">
                                <div className="flex items-center gap-3 min-w-0">
                                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shrink-0" />
                                    <div className="truncate">
                                        <p className="text-xs font-bold text-stone-800 dark:text-stone-100 truncate">Every fragile life matters</p>
                                        <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate">Newborn street rescue • Dhaka, BD</p>
                                    </div>
                                </div>
                                <Link
                                    href="/adopt"
                                    className="text-xs font-bold text-primary hover:underline shrink-0"
                                >
                                    Foster / Adopt →
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
