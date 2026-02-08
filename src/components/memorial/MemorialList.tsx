"use client";

import { useState } from "react";
import { type Memorial, MOCK_MEMORIALS } from "@/data/memorials";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { MemorialModal } from "@/components/memorial/MemorialModal";

export function MemorialList() {
    const [memorials, setMemorials] = useState<Memorial[]>(MOCK_MEMORIALS);

    const handleAddTribute = (newMemorial: Memorial) => {
        setMemorials([newMemorial, ...memorials]);
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white pb-24 relative overflow-hidden">
            {/* Background Stars - simplified for now */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-zinc-950 to-zinc-950 pointer-events-none" />

            {/* Header */}
            <div className="container mx-auto text-center max-w-4xl pt-20 pb-16 px-4 relative z-10">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 font-heading bg-clip-text text-transparent bg-gradient-to-r from-rose-200 to-indigo-200 flex items-center justify-center gap-4">
                    <Heart className="fill-rose-300 text-rose-300 w-10 h-10 md:w-16 md:h-16" /> The Memorial Wall
                </h1>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
                    A sanctuary to honor the beloved feline companions who have crossed the rainbow bridge. Gone but never forgotten.
                </p>

                <MemorialModal onAddTribute={handleAddTribute} />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {memorials.map((memorial) => (
                        <div key={memorial.id} className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 transition-colors">
                            <div className="relative aspect-square">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={memorial.imageUrl} alt={memorial.petName} className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6">
                                    <h2 className="text-3xl font-bold text-white mb-1 font-heading">{memorial.petName}</h2>
                                    <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">Remembered by {memorial.ownerName}</p>
                                </div>
                                <div className="absolute top-4 right-4">
                                    <Heart className="w-6 h-6 text-rose-500 fill-current drop-shadow-lg" />
                                </div>
                            </div>
                            <div className="p-8">
                                <p className="text-slate-300 italic leading-relaxed font-light border-l-2 border-rose-500/50 pl-4">
                                    &quot;{memorial.tribute}&quot;
                                </p>
                                <p className="text-xs text-slate-500 mt-6 text-right">
                                    {new Date(memorial.timestamp).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
