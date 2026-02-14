"use client";

import { Award, Shield, Star, Heart, Zap, Trophy } from "lucide-react";

const BADGES = [
    { id: 'newbie', name: 'Newbie Rescuer', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-100', desc: 'Joined the squad' },
    { id: 'meal', name: 'Meal Provider', icon: Star, color: 'text-amber-500', bg: 'bg-amber-100', desc: 'Sponsored a meal' },
    { id: 'vaccine', name: 'Vaccine Hero', icon: Shield, color: 'text-emerald-500', bg: 'bg-emerald-100', desc: 'Sponsored a vaccine' },
    { id: 'guardian', name: 'Guardian Angel', icon: Award, color: 'text-purple-500', bg: 'bg-purple-100', desc: 'Sponsored a surgery' },
    { id: 'reporter', name: 'Eagle Eye', icon: Zap, color: 'text-blue-500', bg: 'bg-blue-100', desc: 'Reported 5+ cases' },
    { id: 'legend', name: 'Catwaala Legend', icon: Trophy, color: 'text-orange-500', bg: 'bg-orange-100', desc: 'Top 1% Volunteer' },
];

export function Badges({ earned = ['newbie', 'meal'] }: { earned?: string[] }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {BADGES.map((badge) => {
                const isEarned = earned.includes(badge.id);
                const Icon = badge.icon;
                return (
                    <div
                        key={badge.id}
                        className={`flex flex-col items-center text-center p-4 rounded-2xl border transition-all ${isEarned
                            ? `bg-white border-stone-100 shadow-sm opacity-100`
                            : 'bg-stone-50 border-transparent opacity-50 grayscale'
                            }`}
                    >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${isEarned ? badge.bg : 'bg-stone-200'} ${isEarned ? badge.color : 'text-stone-400'}`}>
                            <Icon className="w-6 h-6 fill-current" />
                        </div>
                        <h4 className="font-bold text-stone-800 text-sm">{badge.name}</h4>
                        <p className="text-stone-400 text-xs mt-1">{badge.desc}</p>
                    </div>
                );
            })}
        </div>
    );
}
