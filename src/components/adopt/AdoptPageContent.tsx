"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, Heart, Printer, Sparkles, MessageCircle, HeartHandshake, ShieldCheck } from "lucide-react";

const FACEBOOK_GROUP_URL = "https://www.facebook.com/groups/catwaala/";

const infoCards = [
    {
        icon: Sparkles,
        iconColor: "text-amber-500 bg-amber-500/10 border-amber-500/20",
        title: "Real-Time Updates",
        description:
            "See new rescues the moment they're posted. Every cat has a story, and you'll find it on our community page.",
    },
    {
        icon: MessageCircle,
        iconColor: "text-blue-500 bg-blue-500/10 border-blue-500/20",
        title: "Direct Communication",
        description:
            "Chat directly with our rescue volunteers. Ask questions, schedule visits, and get to know your future companion.",
    },
    {
        icon: HeartHandshake,
        iconColor: "text-rose-500 bg-rose-500/10 border-rose-500/20",
        title: "Hundreds of Rescues",
        description:
            "Over 650 street cats rescued and rehabilitated. From fragile newborns to wise seniors, a companion is waiting.",
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
};

export function AdoptPageContent() {
    return (
        <div className="min-h-screen pb-24">
            {/* ───────────────── Subtle Hero Header ───────────────── */}
            <div className="relative py-16 md:py-24 text-center px-4 overflow-hidden bg-stone-50/70 dark:bg-zinc-950 border-b border-stone-200/60 dark:border-zinc-800/60">
                {/* Ambient glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-rose-500/5 dark:bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/40 border border-rose-200/70 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs font-semibold mb-6 shadow-sm"
                    >
                        <ShieldCheck className="w-4 h-4 text-rose-500" />
                        <span>Adopt, Don&apos;t Shop • Non-profit animal welfare</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading text-stone-900 dark:text-stone-100 mb-4 tracking-tight"
                    >
                        Find Your Feline Soulmate
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-stone-600 dark:text-stone-400 max-w-xl mx-auto mb-8 text-base md:text-lg leading-relaxed font-normal"
                    >
                        Browse through our rescued stray cats across Dhaka. Every life deserves dignity, shelter, and a warm family.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap items-center justify-center gap-3.5"
                    >
                        {/* Print Adoption Form */}
                        <a href="/adoption-form" target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" className="h-11 px-5 rounded-xl border-stone-200 dark:border-zinc-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-zinc-800 font-semibold text-xs sm:text-sm gap-2 shadow-sm">
                                <Printer className="w-4 h-4 text-stone-500" />
                                Print Adoption Form
                            </Button>
                        </a>

                        {/* Kuttawaala cross-site badge */}
                        <a
                            href="https://kuttawaala.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 h-11 px-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40 text-stone-800 dark:text-stone-200 hover:border-amber-300 transition-colors text-xs font-semibold shadow-sm"
                        >
                            <span>🐕</span>
                            <span>Looking for a dog? <span className="underline decoration-amber-500/50">Visit Kuttawaala</span></span>
                            <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
                        </a>
                    </motion.div>
                </div>
            </div>

            {/* ───────────────── Main Content ───────────────── */}
            <div className="container mx-auto px-4 -mt-6 relative z-20">
                {/* ── Facebook Community Card ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-stone-200/80 dark:border-zinc-800 shadow-[0_20px_50px_rgba(28,25,23,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] rounded-[2.5rem] p-6 sm:p-10 md:p-14 text-center max-w-3xl mx-auto"
                >
                    {/* Facebook icon */}
                    <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 rounded-2xl bg-[#1877F2]/10 border border-[#1877F2]/20 flex items-center justify-center text-[#1877F2] shadow-sm">
                        <svg
                            className="w-8 h-8 md:w-10 md:h-10 fill-current"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold font-heading text-stone-800 dark:text-stone-100 mb-3 tracking-tight">
                        Adopt Through Our Facebook Community
                    </h2>

                    <p className="text-stone-600 dark:text-stone-400 leading-relaxed max-w-2xl mx-auto mb-8 text-sm sm:text-base md:text-lg">
                        We have rescued cats and kittens waiting for their forever homes. Our Facebook community is where all adoption profiles are published in real time with photos, medical history, and direct foster contact.
                    </p>

                    {/* Primary CTA */}
                    <a
                        href={FACEBOOK_GROUP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block w-full sm:w-auto"
                    >
                        <Button
                            size="lg"
                            className="w-full sm:w-auto bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-2xl px-8 h-12 sm:h-14 text-sm sm:text-base font-bold shadow-lg shadow-blue-500/20 gap-2.5 transition-transform hover:-translate-y-0.5"
                        >
                            <svg
                                className="w-4 h-4 sm:w-5 sm:h-5 fill-current"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            <span>Visit Catwaala Community</span>
                            <ExternalLink className="w-4 h-4 opacity-70" />
                        </Button>
                    </a>
                </motion.div>

                {/* ── Three Info Cards ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto">
                    {infoCards.map((card, i) => {
                        const Icon = card.icon;
                        return (
                            <motion.div
                                key={card.title}
                                custom={i}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                className="glass-card bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-stone-200/80 dark:border-zinc-800 shadow-md rounded-[2rem] p-6 sm:p-8 text-center hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                            >
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 border ${card.iconColor}`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-base sm:text-lg font-bold text-stone-800 dark:text-stone-100 mb-2">
                                    {card.title}
                                </h3>
                                <p className="text-stone-600 dark:text-stone-400 text-xs sm:text-sm leading-relaxed">
                                    {card.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* ── Bottom CTA Banner ── */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={{
                        hidden: { opacity: 0, y: 24 },
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.5, ease: "easeOut" },
                        },
                    }}
                    className="mt-16 rounded-[2.5rem] bg-gradient-to-br from-zinc-900 via-zinc-900 to-stone-900 border border-zinc-800 p-8 sm:p-12 md:p-16 text-center text-white relative overflow-hidden shadow-2xl"
                >
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <div className="w-12 h-12 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto mb-4">
                            <Heart className="w-6 h-6 fill-current" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 tracking-tight font-heading">
                            Ready to Meet Your New Best Friend?
                        </h2>
                        <p className="text-zinc-400 max-w-lg mx-auto mb-8 text-sm sm:text-base leading-relaxed">
                            Join thousands of animal lovers in our community. Your purr-fect companion is just one conversation away.
                        </p>

                        <a
                            href={FACEBOOK_GROUP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block w-full sm:w-auto"
                        >
                            <Button
                                size="lg"
                                className="w-full sm:w-auto bg-rose-600 hover:bg-rose-500 text-white rounded-2xl px-8 h-12 sm:h-14 text-sm sm:text-base font-bold shadow-lg shadow-rose-600/25 transition-transform hover:-translate-y-0.5 gap-2"
                            >
                                <span>Join the Group to Adopt</span>
                                <ExternalLink className="w-4 h-4 opacity-70" />
                            </Button>
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
