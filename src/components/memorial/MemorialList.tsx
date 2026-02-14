"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Memorial } from "@/services/server-data";
import { MemorialService } from "@/services/MemorialService";
import { Heart, Cloud, Star, Flame } from "lucide-react";
import { MemorialModal } from "@/components/memorial/MemorialModal";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Image from "next/image";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export function MemorialList() {
    const [memorials, setMemorials] = useState<Memorial[]>([]);
    const [loading, setLoading] = useState(true);
    const [candles, setCandles] = useState<Record<string, number>>({});

    useEffect(() => {
        loadMemorials();
    }, []);

    async function loadMemorials() {
        try {
            const data = await MemorialService.getAll();
            setMemorials(data);
            // Initialize random candle counts for demo feel
            const initialCandles: Record<string, number> = {};
            data.forEach(m => {
                initialCandles[m.id] = Math.floor(Math.random() * 20) + 1;
            });
            setCandles(initialCandles);
        } catch (error) {
            console.error("Failed to load memorials", error);
        } finally {
            setLoading(false);
        }
    }

    const handleAddTribute = (newMemorial: Memorial) => {
        setMemorials([newMemorial, ...memorials]);
    };

    const lightCandle = (id: string | number) => {
        setCandles(prev => ({
            ...prev,
            [id]: (prev[id] || 0) + 1
        }));
    };

    return (
        <div className="min-h-screen pb-24 relative overflow-hidden bg-[#FFFDF8]">
            {/* Background elements */}
            <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-rose-100/30 to-transparent pointer-events-none" />
            <div className="absolute top-20 left-10 text-rose-200/40 animate-pulse delay-700">
                <Cloud className="w-24 h-24 fill-current" />
            </div>
            <div className="absolute top-40 right-20 text-indigo-200/40 animate-pulse delay-1000">
                <Cloud className="w-32 h-32 fill-current" />
            </div>

            {/* Header */}
            <div className="container mx-auto text-center max-w-4xl pt-24 pb-16 px-4 relative z-10">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="inline-block p-4 rounded-full bg-white shadow-xl shadow-rose-100/50 mb-6 border border-rose-100"
                >
                    <Heart className="fill-rose-500 text-rose-500 w-8 h-8" />
                </motion.div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 font-heading text-stone-800 tracking-tight">
                    The Memorial Wall 🕊️
                </h1>
                <p className="text-xl text-stone-500 max-w-2xl mx-auto leading-relaxed mb-10 font-medium">
                    A sanctuary to honor the beloved feline companions who have crossed the rainbow bridge. Gone but never forgotten.
                </p>

                <MemorialModal onAddTribute={handleAddTribute} />
            </div>

            <div className="container mx-auto px-4 relative z-10 max-w-7xl">
                <ResponsiveMasonry
                    columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                >
                    <Masonry gutter="2rem">
                        {memorials.map((memorial, index) => (
                            <motion.div
                                key={memorial.id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group glass-card rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-rose-100/40 transition-all duration-500 hover:-translate-y-2 bg-white/60 backdrop-blur-md border border-white/60 mb-8 break-inside-avoid"
                            >
                                <div className="relative aspect-square overflow-hidden bg-rose-50">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    {memorial.image_url ? (
                                        <img
                                            src={memorial.image_url}
                                            alt={memorial.pet_name}
                                            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-rose-200">
                                            <Heart className="w-16 h-16 fill-current" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                                    <div className="absolute top-4 right-4 bg-white/30 backdrop-blur-md p-2 rounded-full text-white border border-white/40">
                                        <Star className="w-5 h-5 fill-white text-white" />
                                    </div>
                                </div>

                                <div className="p-6 relative">
                                    <div className="absolute -top-8 left-6">
                                        <div className="bg-white/95 backdrop-blur-md px-6 py-2 rounded-2xl shadow-lg border border-white/60 font-heading text-2xl font-bold text-stone-800 transform group-hover:scale-105 transition-transform origin-bottom-left">
                                            {memorial.pet_name}
                                        </div>
                                    </div>

                                    <div className="mt-6 space-y-4">
                                        <p className="text-stone-600 italic leading-relaxed font-medium font-serif text-lg">
                                            "{memorial.tribute}"
                                        </p>
                                        <div className="flex justify-between items-center border-t border-amber-100/50 pt-4">
                                            <div>
                                                <p className="text-xs uppercase tracking-widest text-stone-400 font-bold mb-1">
                                                    Loved by <span className="text-rose-500">{memorial.owner_name}</span>
                                                </p>
                                                <p className="text-xs text-stone-400 font-medium">
                                                    {new Date(memorial.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => lightCandle(memorial.id)}
                                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-600 transition-colors group/candle"
                                            >
                                                <Flame className={`w-4 h-4 transition-all duration-300 ${candles[memorial.id] && candles[memorial.id] > 0 ? 'fill-amber-500 text-amber-500 animate-pulse' : 'text-stone-300'}`} />
                                                <span className="text-sm font-bold">{candles[memorial.id] || 0}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </Masonry>
                </ResponsiveMasonry>
            </div>
        </div>
    );
}
