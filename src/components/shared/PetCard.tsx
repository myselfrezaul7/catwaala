"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useFavorites } from "@/contexts/FavoritesContext";

interface CatProps {
    id: string;
    name: string;
    breed: string;
    age: string;
    location: string;
    imageUrl: string;
    tag: string | null;
}

export function PetCard({ cat }: { cat: CatProps }) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const favorite = isFavorite(cat.id);

    return (
        <div className="group bg-white dark:bg-zinc-800 rounded-3xl overflow-hidden shadow-sm border border-rose-100 dark:border-zinc-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="relative aspect-[4/5] overflow-hidden bg-rose-50">
                <Image
                    src={cat.imageUrl}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavorite(cat.id);
                    }}
                    className={`absolute top-3 right-3 p-2 backdrop-blur-md rounded-full transition-all ${favorite
                            ? "bg-rose-500 text-white"
                            : "bg-white/20 text-white hover:bg-rose-500"
                        }`}
                >
                    <Heart className={`w-5 h-5 ${favorite ? "fill-current" : ""}`} />
                </button>

                {cat.tag && (
                    <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${cat.tag === 'Urgent' ? 'bg-rose-500 text-white' :
                        cat.tag === 'New' ? 'bg-indigo-500 text-white' : 'bg-green-500 text-white'
                        }`}>
                        {cat.tag}
                    </span>
                )}

                <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-2xl font-bold mb-1">{cat.name}</h3>
                    <div className="flex items-center gap-2 text-sm opacity-90">
                        <MapPin className="w-3 h-3" /> {cat.location}
                    </div>
                </div>
            </div>

            <div className="p-5">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium text-rose-600 bg-rose-50 px-3 py-1 rounded-lg">
                        {cat.breed}
                    </span>
                    <span className="text-sm text-slate-500 font-medium">
                        {cat.age}
                    </span>
                </div>

                <Link href={`/adopt/${cat.id}`}>
                    <Button className="w-full rounded-xl bg-slate-900 text-white hover:bg-rose-600 transition-colors h-12">
                        Meet {cat.name} <Sparkles className="w-4 h-4 ml-2" />
                    </Button>
                </Link>
            </div>
        </div>
    );
}
