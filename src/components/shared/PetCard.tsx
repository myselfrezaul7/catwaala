"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/contexts/FavoritesContext";
import { motion } from "framer-motion";

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
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group glass-card rounded-[28px] overflow-hidden transition-all duration-300"
        >
            <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                    src={cat.imageUrl}
                    alt={cat.name}
                    fill
                    width={400}
                    height={400}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />

                {/* Favorite button with glass effect */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavorite(cat.id);
                    }}
                    className={`absolute top-4 right-4 p-3 rounded-2xl backdrop-blur-xl transition-all duration-300 ${favorite
                        ? "bg-rose-500/90 text-white shadow-lg shadow-rose-500/30"
                        : "bg-white/25 text-white hover:bg-rose-500/80 hover:shadow-lg hover:shadow-rose-500/20"
                        }`}
                >
                    <Heart className={`w-5 h-5 transition-transform duration-300 ${favorite ? "fill-current scale-110" : "group-hover:scale-110"}`} />
                </button>

                {/* Tag badge */}
                {cat.tag && (
                    <span className={`absolute top-4 left-4 px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider backdrop-blur-xl shadow-lg ${cat.tag === 'Urgent'
                        ? 'bg-rose-500/90 text-white shadow-rose-500/30'
                        : cat.tag === 'New'
                            ? 'bg-amber-500/90 text-white shadow-amber-500/30'
                            : 'bg-emerald-500/90 text-white shadow-emerald-500/30'
                        }`}>
                        {cat.tag}
                    </span>
                )}

                {/* Cat info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                        {cat.name}
                    </h3>
                    <div className="flex items-center gap-2 text-white/90 text-sm">
                        <MapPin className="w-4 h-4" />
                        <span className="font-medium">{cat.location}</span>
                    </div>
                </div>
            </div>

            {/* Card content */}
            <div className="p-5 bg-white/60 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-semibold text-rose-600 bg-rose-50/80 px-4 py-1.5 rounded-xl">
                        {cat.breed}
                    </span>
                    <span className="text-sm text-stone-500 font-medium">
                        {cat.age}
                    </span>
                </div>

                <Link href={`/adopt/${cat.id}`}>
                    <Button className="w-full h-12 rounded-2xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold shadow-lg shadow-rose-500/20 hover:shadow-rose-500/35 transition-all duration-300">
                        <span>Meet {cat.name}</span>
                        <Sparkles className="w-4 h-4 ml-2" />
                    </Button>
                </Link>
            </div>
        </motion.div>
    );
}
