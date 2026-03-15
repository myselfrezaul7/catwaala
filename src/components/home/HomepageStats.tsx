"use client";

import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Users, Stethoscope, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

const DEFAULTS = { catsTnr: 500, adoptions: 200, volunteers: 50 };

export function HomepageStats() {
    const [stats, setStats] = useState(DEFAULTS);

    useEffect(() => {
        async function load() {
            try {
                const snap = await getDoc(doc(db, "site_config", "homepage"));
                if (snap.exists()) {
                    const data = snap.data();
                    setStats({
                        catsTnr: data.catsTnr ?? DEFAULTS.catsTnr,
                        adoptions: data.adoptions ?? DEFAULTS.adoptions,
                        volunteers: data.volunteers ?? DEFAULTS.volunteers,
                    });
                }
            } catch {
                // Use defaults on error
            }
        }
        load();
    }, []);

    const STAT_CARDS = [
        {
            id: 'tnr',
            title: "Cats TNR'd",
            value: stats.catsTnr,
            icon: Heart,
            color: "text-rose-600 dark:text-rose-400",
            bg: "bg-rose-100/80 dark:bg-rose-900/30",
            bgHover: "text-rose-500",
            delay: 0
        },
        {
            id: 'adoptions',
            title: "Adoptions",
            value: stats.adoptions,
            icon: Users,
            color: "text-amber-600 dark:text-amber-500",
            bg: "bg-amber-100/80 dark:bg-amber-900/30",
            bgHover: "text-amber-600 dark:text-amber-500",
            delay: 0.1
        },
        {
            id: 'volunteers',
            title: "Volunteers",
            value: stats.volunteers,
            icon: Stethoscope,
            color: "text-emerald-600 dark:text-emerald-500",
            bg: "bg-emerald-100/80 dark:bg-emerald-900/30",
            bgHover: "text-emerald-600 dark:text-emerald-500",
            delay: 0.2
        }
    ];

    return (
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 sm:gap-6 pb-6 sm:pb-0 sm:grid sm:grid-cols-3 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {STAT_CARDS.map((stat) => {
                const Icon = stat.icon;
                return (
                    <motion.div
                        key={stat.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut", delay: stat.delay }}
                        viewport={{ once: true, margin: "-50px" }}
                        className="min-w-[75%] sm:min-w-0 snap-center glass-card dark:bg-stone-900/60 rounded-3xl p-4 md:p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group cursor-default relative overflow-hidden flex-shrink-0"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-700">
                            <Icon className={`w-24 h-24 ${stat.bgHover}`} />
                        </div>
                        <div className={`w-11 h-11 md:w-14 md:h-14 rounded-2xl ${stat.bg} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                            <Icon className={`w-5 h-5 md:w-7 md:h-7 ${stat.color}`} />
                        </div>
                        <span className={`block text-3xl md:text-4xl font-bold ${stat.color} mb-2 relative z-10`}>
                            <AnimatedCounter value={stat.value} />+
                        </span>
                        <span className="text-sm font-semibold text-stone-400 uppercase tracking-wider relative z-10">{stat.title}</span>
                    </motion.div>
                );
            })}
        </div>
    );
}
