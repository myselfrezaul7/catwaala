"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, Heart, Printer } from "lucide-react";

const FACEBOOK_GROUP_URL = "https://www.facebook.com/groups/catwaala/";

const infoCards = [
    {
        emoji: "🐾",
        title: "Real-Time Updates",
        description:
            "See new rescues the moment they're posted. Every cat has a story, and you'll find it on our community page.",
    },
    {
        emoji: "💬",
        title: "Direct Communication",
        description:
            "Chat directly with our rescue volunteers. Ask questions, schedule visits, and get to know your future companion.",
    },
    {
        emoji: "❤️",
        title: "Hundreds of Lives",
        description:
            "Over 500 cats rescued and counting. From tiny kittens to wise seniors, there's a perfect match waiting for you.",
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.12, duration: 0.55, ease: "easeOut" },
    }),
};

export function AdoptPageContent() {
    return (
        <div className="min-h-screen pb-24">
            {/* ───────────────── Hero Banner ───────────────── */}
            <div className="bg-gradient-to-br from-rose-500 to-rose-600 text-white py-16 text-center px-4 relative overflow-hidden">
                <div className="relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold mb-4"
                    >
                        Find Your Feline Soulmate
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-rose-100 max-w-xl mx-auto mb-8 text-lg"
                    >
                        Browse through our rescued cats. From kittens to snoozy
                        seniors, they are all waiting for love.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col items-center gap-6"
                    >
                        {/* Adopt Don't Shop badge */}
                        <p className="text-sm font-bold bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 inline-block shadow-lg">
                            🚫 We promote &quot;Adopt Don&apos;t Shop&quot;. No
                            buying/selling.
                        </p>

                        {/* Kuttawaala cross-site badge */}
                        <a
                            href="https://kuttawaala.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 p-3 sm:p-4 rounded-2xl bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200/50 dark:border-amber-800/50 hover:border-amber-300 dark:hover:border-amber-700 transition-all shadow-sm hover:shadow-md mt-2"
                        >
                            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-amber-100 dark:bg-amber-900/60 flex items-center justify-center shrink-0 border border-amber-200/50 dark:border-amber-800/50 text-xl sm:text-2xl group-hover:scale-105 transition-transform">
                                🐕
                            </div>
                            <div className="flex-1 min-w-0 pr-4 text-left">
                                <span className="block text-[10px] sm:text-xs font-bold text-amber-800 dark:text-amber-200 uppercase tracking-wider mb-0.5">
                                    Looking for a dog?
                                </span>
                                <span className="block text-sm sm:text-base font-bold text-amber-950 dark:text-amber-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors flex items-center gap-1">
                                    Visit Kuttawaala
                                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-amber-600" />
                                </span>
                            </div>
                        </a>

                        {/* Print Adoption Form */}
                        <a href="/adoption-form" target="_blank">
                            <motion.div whileTap={{ scale: 0.96 }}>
                                <Button className="bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white border border-white/30 rounded-xl px-6 h-12 text-sm font-bold shadow-lg gap-2">
                                    <Printer className="w-4 h-4" />
                                    Print Adoption Form
                                </Button>
                            </motion.div>
                        </a>
                    </motion.div>
                </div>

                {/* Radial glow overlay */}
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,_rgba(255,255,255,0.15)_0%,_transparent_50%)] pointer-events-none" />
            </div>

            {/* ───────────────── Main Content ───────────────── */}
            <div className="container mx-auto px-4 -mt-10 relative z-20">
                {/* ── Facebook Community Card ── */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl border border-white/40 dark:border-zinc-800 shadow-xl rounded-[2.5rem] p-8 md:p-14 text-center max-w-3xl mx-auto"
                >
                    {/* Facebook icon */}
                    <motion.div
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            delay: 0.25,
                            type: "spring",
                            stiffness: 200,
                            damping: 14,
                        }}
                        className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-xl shadow-blue-500/25"
                    >
                        <svg
                            className="w-10 h-10 md:w-12 md:h-12 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                    </motion.div>

                    <h2 className="text-2xl md:text-3xl font-bold text-stone-800 dark:text-stone-100 mb-4 tracking-tight">
                        Adopt Through Our Facebook Community
                    </h2>

                    <p className="text-stone-600 dark:text-stone-400 leading-relaxed max-w-2xl mx-auto mb-8 text-base md:text-lg">
                        We have hundreds of rescued cats waiting for their
                        forever homes. Our Facebook community is where all
                        adoptions happen — you can see real-time posts, photos,
                        and connect directly with our rescue team.
                    </p>

                    {/* Primary CTA */}
                    <a
                        href={FACEBOOK_GROUP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <motion.div
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-2xl px-10 h-14 text-base font-bold shadow-xl shadow-blue-500/30 gap-2.5"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                Visit Our Facebook Group
                                <ExternalLink className="w-4 h-4 opacity-70" />
                            </Button>
                        </motion.div>
                    </a>
                </motion.div>

                {/* ── Three Info Cards ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14 max-w-5xl mx-auto">
                    {infoCards.map((card, i) => (
                        <motion.div
                            key={card.title}
                            custom={i}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            className="glass-card bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl border border-white/40 dark:border-zinc-800 shadow-xl rounded-[2.5rem] p-8 text-center hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="text-5xl mb-5">{card.emoji}</div>
                            <h3 className="text-lg font-bold text-stone-800 dark:text-stone-100 mb-3">
                                {card.title}
                            </h3>
                            <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                                {card.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* ── Bottom CTA Banner ── */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.6, ease: "easeOut" },
                        },
                    }}
                    className="mt-16 rounded-[2.5rem] bg-gradient-to-br from-rose-500 via-rose-600 to-orange-500 p-10 md:p-14 text-center text-white relative overflow-hidden shadow-2xl"
                >
                    {/* Decorative glow */}
                    <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-orange-400/15 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10">
                        <Heart className="w-10 h-10 mx-auto mb-4 opacity-80" />
                        <h2 className="text-2xl md:text-4xl font-bold mb-4 tracking-tight">
                            Ready to Meet Your New Best Friend?
                        </h2>
                        <p className="text-rose-100 max-w-lg mx-auto mb-8 text-base md:text-lg">
                            Join thousands of cat lovers in our community. Your
                            purr-fect companion is just a click away.
                        </p>

                        <a
                            href={FACEBOOK_GROUP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <motion.div
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <Button
                                    size="lg"
                                    className="bg-white text-rose-600 hover:bg-rose-50 rounded-2xl px-10 h-14 text-base font-bold shadow-xl shadow-black/10 gap-2.5"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                    Join Catwaala on Facebook
                                    <ExternalLink className="w-4 h-4 opacity-70" />
                                </Button>
                            </motion.div>
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
