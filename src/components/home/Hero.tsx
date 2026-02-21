"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
    return (
        <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-background">
            {/* Subtle premium gradient background instead of muddy blobs */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-70" />

            <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
                <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm font-semibold text-primary mb-6 border border-border">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            Bangladesh&apos;s biggest cat community platform
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-[1.1] mb-6 tracking-tight">
                            Every Cat Deserves a <span className="text-primary">Loving Home</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
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
                            <Button size="lg" className="w-full sm:w-auto text-lg h-14 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 transition-all gap-2">
                                Adopt a Cat <ArrowRight className="w-5 h-5" />
                            </Button>
                        </Link>
                        <Link href="/volunteer">
                            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 rounded-2xl border-2 border-border hover:bg-muted text-foreground font-semibold hover:-translate-y-0.5 transition-all bg-transparent">
                                Become a Volunteer
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Kuttawaala Link */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-8 pt-8 border-t border-border flex items-center gap-4"
                    >
                        <div className="text-sm font-medium text-muted-foreground">Also love dogs?</div>
                        <a
                            href="https://kuttawaala.vercel.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2 px-5 py-2.5 bg-secondary hover:bg-secondary/80 text-foreground rounded-xl transition-all border border-border shadow-sm"
                        >
                            <span className="text-lg">🐕</span>
                            <span className="font-bold">Visit Kuttawaala</span>
                            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 group-hover:text-foreground transition-all" />
                        </a>
                    </motion.div>
                </div>

                {/* Hero Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
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
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-20 -left-6 glass-card p-4 rounded-2xl flex items-center gap-3 z-20 max-w-[200px]"
                        >
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                                <Heart className="w-5 h-5 fill-current" />
                            </div>
                            <div>
                                <p className="font-bold text-sm text-foreground">500+ Rescued</p>
                                <p className="text-xs text-muted-foreground">Since 2020</p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
