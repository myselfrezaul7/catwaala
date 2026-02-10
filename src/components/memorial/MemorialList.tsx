"use client";

import { useState } from "react";
import { type Memorial, MOCK_MEMORIALS } from "@/data/memorials";
import { Heart, Cloud, Starr, Star } from "lucide-react";
import { MemorialModal } from "@/components/memorial/MemorialModal";
import Image from "next/image";

export function MemorialList() {
    const [memorials, setMemorials] = useState<Memorial[]>(MOCK_MEMORIALS);

    const handleAddTribute = (newMemorial: Memorial) => {
        setMemorials([newMemorial, ...memorials]);
    };

    return (
        <div className="min-h-screen pb-24 relative overflow-hidden bg-gradient-to-b from-rose-50 to-white">
            {/* Background elements */}
            <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-rose-100/50 to-transparent pointer-events-none" />
            <div className="absolute top-20 left-10 text-rose-200/40 animate-pulse delay-700">
                <Cloud className="w-24 h-24 fill-current" />
            </div>
            <div className="absolute top-40 right-20 text-indigo-200/40 animate-pulse delay-1000">
                <Cloud className="w-32 h-32 fill-current" />
            </div>

            {/* Header */}
            <div className="container mx-auto text-center max-w-4xl pt-24 pb-16 px-4 relative z-10">
                <div className="inline-block p-3 rounded-full bg-rose-100/50 mb-6 backdrop-blur-sm border border-rose-200/50">
                    <Heart className="fill-rose-400 text-rose-500 w-8 h-8" />
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 font-heading text-stone-800 drop-shadow-sm">
                    The Memorial Wall
                </h1>
                <p className="text-xl text-stone-500 max-w-2xl mx-auto leading-relaxed mb-10 font-medium">
                    A sanctuary to honor the beloved feline companions who have crossed the rainbow bridge. Gone but never forgotten.
                </p>

                <MemorialModal onAddTribute={handleAddTribute} />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {memorials.map((memorial) => (
                        <div key={memorial.id} className="group glass-card rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-rose-100/50 transition-all duration-500 hover:-translate-y-2 relative">
                            <div className="relative aspect-square overflow-hidden">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={memorial.imageUrl}
                                    alt={memorial.petName}
                                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                                <div className="absolute top-4 right-4 bg-white/30 backdrop-blur-md p-2 rounded-full text-white border border-white/40">
                                    <Star className="w-5 h-5 fill-white text-white" />
                                </div>
                            </div>

                            <div className="p-8 relative">
                                <div className="absolute -top-10 left-6">
                                    <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg border border-white font-heading text-2xl font-bold text-stone-800 transform group-hover:scale-105 transition-transform origin-bottom-left">
                                        {memorial.petName}
                                    </div>
                                </div>

                                <div className="mt-4 space-y-4">
                                    <p className="text-stone-600 italic leading-relaxed font-medium">
                                        &quot;{memorial.tribute}&quot;
                                    </p>
                                    <div className="flex justify-between items-end border-t border-amber-100/50 pt-4">
                                        <p className="text-xs uppercase tracking-widest text-stone-400 font-bold">
                                            Loved by <span className="text-rose-500">{memorial.ownerName}</span>
                                        </p>
                                        <p className="text-xs text-stone-400 font-medium bg-stone-100 px-2 py-1 rounded-lg">
                                            {new Date(memorial.timestamp).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
