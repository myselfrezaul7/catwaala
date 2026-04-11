"use client";

import { Hero } from "@/components/home/Hero";
import { SuccessStories } from "@/components/home/SuccessStories";
import { HomepageStats } from "@/components/home/HomepageStats";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles, PawPrint, Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <Hero />

            <SuccessStories />

            {/* Compact Cross-Link Banner */}
            <section className="py-8 md:py-16 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    {/* Companion Chip */}
                    <div className="flex justify-center mb-4">
                        <a href="https://kuttawaala.com" target="_blank" rel="noopener noreferrer"
                           className="group flex items-center gap-3 p-3 sm:p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30 hover:border-amber-300 dark:hover:border-amber-700 transition-all shadow-sm hover:shadow-md">
                            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center shrink-0 border border-amber-200/50 dark:border-amber-800/50 text-xl sm:text-2xl group-hover:scale-105 transition-transform">
                                🐕
                            </div>
                            <div className="flex-1 min-w-0 pr-4">
                                <span className="block text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-wider mb-0.5">Also love dogs?</span>
                                <span className="block text-sm sm:text-base font-bold text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors flex items-center gap-1">
                                    Visit Kuttawaala 
                                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-amber-500" />
                                </span>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            {/* Mission Section with Glass Stats */}
            <section className="py-16 md:py-28 relative overflow-hidden">
                <div className="absolute inset-0 gradient-bg dark:bg-stone-950" />
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-300/15 dark:bg-rose-900/10 rounded-full blur-3xl animate-float" />
                    <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-300/15 dark:bg-amber-900/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-rose-100/80 dark:bg-rose-900/30 mb-8">
                        <Sparkles className="w-8 h-8 text-rose-500" />
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-stone-800 dark:text-white leading-tight">
                        Our Mission
                    </h2>
                    <p className="text-xl text-stone-500 dark:text-stone-400 mb-16 leading-relaxed max-w-2xl mx-auto">
                        We are dedicated to improving the lives of street cats in Bangladesh through rescue, rehabilitation, and adoption programs.
                    </p>

                    {/* Stats Cards - Dynamic from Firestore */}
                    <HomepageStats />
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-24 relative overflow-hidden bg-rose-50/50 dark:bg-zinc-950/50">
                <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-rose-200/40 dark:from-rose-900/20 to-transparent rounded-full blur-3xl opacity-70" />
                    {/* Faded Paw Pattern Background Overlay */}
                    <div className="absolute inset-0 bg-[url('/assets/paw-pattern.png')] bg-repeat opacity-5 dark:opacity-[0.02]" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="relative max-w-4xl mx-auto">
                        {/* Animated Gradient Border Wrapper */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-rose-400 via-teal-400 to-amber-400 rounded-[2.5rem] blur-md opacity-30 group-hover:opacity-60 transition duration-1000 animate-gradient-xy"></div>

                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="relative bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-[2rem] p-8 md:p-16 text-center shadow-xl border border-white/50 dark:border-zinc-800/50"
                        >

                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-br from-rose-100 to-rose-50 dark:from-rose-900/40 dark:to-rose-800/20 mb-6 shadow-inner">
                                <Heart className="w-8 h-8 text-rose-500 animate-pulse" />
                            </div>

                            <h2 className="text-3xl md:text-5xl font-bold font-heading text-stone-800 dark:text-white mb-6 leading-tight">
                                Ready to Change a Life?
                            </h2>
                            <p className="text-lg md:text-xl text-stone-600 dark:text-stone-300 mb-2 max-w-2xl mx-auto">
                                Every action counts. Whether you adopt, volunteer, or donate, you are actively saving the street cats of Bangladesh.
                            </p>

                            {/* Live Proof Counter */}
                            <div className="inline-block px-4 py-2 bg-rose-50 dark:bg-rose-900/10 rounded-full border border-rose-100 dark:border-rose-900/30 text-rose-600 dark:text-rose-400 text-sm font-semibold mb-10">
                                <span className="relative flex h-2 w-2 inline-flex mr-2 -translate-y-0.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                                </span>
                                Over 650+ cats rescued and counting
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <Link href="/donate" className="w-full sm:w-auto">
                                    <Button size="lg" className="h-14 px-8 w-full rounded-2xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold text-lg shadow-lg shadow-rose-500/25 hover:shadow-xl hover:shadow-rose-500/40 transition-all duration-300 hover:-translate-y-1">
                                        Donate Now <Heart className="ml-2 w-5 h-5" />
                                    </Button>
                                </Link>
                                <Link href="/adopt" className="w-full sm:w-auto">
                                    <Button size="lg" className="h-14 px-8 w-full rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-lg shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/40 transition-all duration-300 hover:-translate-y-1">
                                        Adopt a Cat
                                    </Button>
                                </Link>
                                <Link href="/volunteer" className="w-full sm:w-auto">
                                    <Button size="lg" variant="outline" className="h-14 px-8 w-full rounded-2xl border-2 border-stone-200 dark:border-zinc-700 hover:border-stone-300 dark:hover:border-zinc-600 text-stone-700 dark:text-stone-300 font-bold text-lg transition-all duration-300 bg-white dark:bg-zinc-900">
                                        Volunteer
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
