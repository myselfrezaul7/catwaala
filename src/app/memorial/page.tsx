"use client";

import { useState } from "react";
import { MOCK_MEMORIALS, Memorial } from "@/data/memorials";
import { Button } from "@/components/ui/button";
import { Heart, Plus } from "lucide-react";

export default function MemorialPage() {
    const [memorials, setMemorials] = useState<Memorial[]>(MOCK_MEMORIALS);

    // Mock adding form state (simplified)
    const handleAddMock = () => {
        alert("In a real app, this would open a form to verify and upload your tribute.");
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white py-16 px-4 dotted-bg">
            <div className="container mx-auto text-center max-w-4xl mb-16">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 font-heading bg-clip-text text-transparent bg-gradient-to-r from-rose-200 to-indigo-200">
                    The Memorial Wall
                </h1>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    A sanctuary to honor the beloved feline companions who have crossed the rainbow bridge. Gone but never forgotten.
                </p>
                <div className="mt-8">
                    <Button onClick={handleAddMock} className="rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm h-12 px-8">
                        <Plus className="w-4 h-4 mr-2" /> Add a Tribute
                    </Button>
                </div>
            </div>

            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                                "{memorial.tribute}"
                            </p>
                            <p className="text-xs text-slate-500 mt-6 text-right">
                                {new Date(memorial.timestamp).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
