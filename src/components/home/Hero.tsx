"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
    return (
        <section className="relative py-12 lg:py-32 flex items-center overflow-hidden bg-background">
            {/* Subtle premium gradient background instead of muddy blobs */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-70" />

            <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
                <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm font-semibold text-primary mb-6 border border-border">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            Bangladesh&apos;s biggest cat community platform
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-foreground leading-[1.1] mb-6 tracking-tight">
                            Every Cat Deserves a <span className="text-primary">Loving Home</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
                            Join us in transforming the lives of street cats in Bangladesh through rescue, care, and adoption.
                        </p>
                    </motion.div>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-2 sm:pt-4 w-full sm:w-auto">
                            <Link href="/adopt" className="w-full sm:w-auto">
                                <motion.div whileTap={{ scale: 0.96 }} className="w-full">
                                    <Button size="lg" className="w-full text-lg h-16 sm:h-14 rounded-2xl shadow-xl shadow-rose-500/20 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 transition-transform hover:-translate-y-1">
                                        Adopt a Cat
                                    </Button>
                                </motion.div>
                            </Link>
                            <Link href="/volunteer" className="w-full sm:w-auto text-center">
                                <motion.div whileTap={{ scale: 0.96 }} className="w-full">
                                    <Button size="lg" variant="outline" className="w-full sm:w-auto text-stone-500 dark:text-stone-400 sm:text-rose-600 dark:sm:text-rose-400 text-base sm:text-lg h-12 sm:h-14 rounded-2xl border-none sm:border-2 border-stone-200 dark:border-zinc-800 hover:bg-stone-100 dark:hover:bg-zinc-800 transition-transform sm:hover:-translate-y-1 bg-transparent hover:text-rose-600 underline sm:no-underline">
                                        Become a Volunteer
                                    </Button>
                                </motion.div>
                            </Link>
                        </div>

                    {/* Floating Companion Badge Redirect */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                        className="mt-8 md:mt-12 flex justify-start"
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
                                <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-zinc-200 dark:bg-zinc-700 z-10" />
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
                </div>

                {/* Hero Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="relative order-1 lg:order-2 flex justify-center"
                >
                    <div className="relative w-full max-w-md aspect-[3/4] rounded-t-full rounded-b-[200px] overflow-hidden border-[8px] border-background shadow-2xl bg-secondary flex items-center justify-center isolate">
                        {/* Decorative ring */}
                        <div className="absolute inset-0 rounded-t-full rounded-b-[200px] border border-border/80 z-10 pointer-events-none" />
                        <Image
                            src="/hero-community.png"
                            alt="Community caring for cats"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority
                        />

                        {/* Floating badge */}
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-6 sm:bottom-20 left-4 sm:-left-6 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-md p-2.5 sm:p-4 rounded-full sm:rounded-2xl shadow-xl flex items-center gap-2 sm:gap-3 z-20"
                        >
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center text-rose-500 shrink-0">
                                <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                            </div>
                            <div className="pr-2 sm:pr-0 flex items-center gap-2 sm:block">
                                <p className="font-bold text-sm">3,500+ Rescued</p>
                                <p className="text-xs text-stone-500 dark:text-stone-400 hidden sm:block">Since 2020</p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
