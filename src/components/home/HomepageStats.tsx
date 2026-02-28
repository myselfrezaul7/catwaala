"use client";

import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Heart, Users, Stethoscope } from "lucide-react";

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

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="glass-card dark:bg-stone-900/60 rounded-3xl p-6 md:p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group cursor-default relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-700">
                    <Heart className="w-24 h-24 text-rose-500" />
                </div>
                <div className="w-14 h-14 rounded-2xl bg-rose-100/80 dark:bg-rose-900/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10">
                    <Heart className="w-7 h-7 text-rose-500" />
                </div>
                <span className="block text-4xl font-bold text-rose-600 dark:text-rose-400 mb-2 relative z-10">
                    <AnimatedCounter value={stats.catsTnr} />+
                </span>
                <span className="text-sm font-semibold text-stone-400 uppercase tracking-wider relative z-10">Cats TNR&apos;d</span>
            </div>

            <div className="glass-card dark:bg-stone-900/60 rounded-3xl p-6 md:p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group cursor-default relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-700">
                    <Users className="w-24 h-24 text-amber-600 dark:text-amber-500" />
                </div>
                <div className="w-14 h-14 rounded-2xl bg-amber-100/80 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10">
                    <Users className="w-7 h-7 text-amber-600 dark:text-amber-500" />
                </div>
                <span className="block text-4xl font-bold text-amber-600 dark:text-amber-500 mb-2 relative z-10">
                    <AnimatedCounter value={stats.adoptions} />+
                </span>
                <span className="text-sm font-semibold text-stone-400 uppercase tracking-wider relative z-10">Adoptions</span>
            </div>

            <div className="glass-card dark:bg-stone-900/60 rounded-3xl p-6 md:p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group cursor-default relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-700">
                    <Stethoscope className="w-24 h-24 text-emerald-600 dark:text-emerald-500" />
                </div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-100/80 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10">
                    <Stethoscope className="w-7 h-7 text-emerald-600 dark:text-emerald-500" />
                </div>
                <span className="block text-4xl font-bold text-emerald-600 dark:text-emerald-500 mb-2 relative z-10">
                    <AnimatedCounter value={stats.volunteers} />+
                </span>
                <span className="text-sm font-semibold text-stone-400 uppercase tracking-wider relative z-10">Volunteers</span>
            </div>
        </div>
    );
}
