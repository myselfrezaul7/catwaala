"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PetCard } from "@/components/shared/PetCard";
import { Button } from "@/components/ui/button";
import { Search, X, ArrowRight } from "lucide-react";
import { Cat as DbCat } from "@/services/server-data";
import { CatService } from "@/services/CatService";
import { getAgeCategory, type AgeCategory } from "@/data/cats";

// UI Cat type matching PetCard expectations (derived from old data/cats.ts)
type UiCat = {
    id: string;
    name: string;
    breed: string;
    age: string;
    gender: string;
    location: string;
    imageUrl: string;
    tag: string | null;
    vaccinated: boolean;
    neutered: boolean;
    goodWithKids: boolean;
};

import { useSearchParams } from "next/navigation";

// ... (UiCat definition)

export function AdoptPageContent() {
    const searchParams = useSearchParams();
    const [cats, setCats] = useState<UiCat[]>([]);
    const [loading, setLoading] = useState(true);

    // Filters
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const query = searchParams.get("query");
        if (query) {
            setSearchQuery(query);
        }
    }, [searchParams]);

    const [selectedGender, setSelectedGender] = useState<string>("All");
    const [selectedAge, setSelectedAge] = useState<AgeCategory | "All">("All");
    const [attributes, setAttributes] = useState({
        vaccinated: false,
        neutered: false,
        goodWithKids: false,
    });

    useEffect(() => {
        loadCats();
    }, []);

    async function loadCats() {
        try {
            const dbCats = await CatService.getAll();
            // Adapt DB data to UI format
            const uiCats: UiCat[] = dbCats.map(cat => ({
                id: cat.id,
                name: cat.name,
                breed: cat.breed || "Domestic Short Hair",
                age: formatAge(cat.age),
                gender: cat.gender,
                location: cat.location,
                imageUrl: cat.images?.[0] || `/assets/cat${(Math.floor(Math.random() * 3) + 1)}.jpg`, // Fallback
                tag: cat.status === 'Adopted' ? 'Adopted' : null,
                vaccinated: cat.attributes?.vaccinated || false,
                neutered: cat.attributes?.neutered || false,
                goodWithKids: cat.attributes?.goodWithKids || false,
            }));
            setCats(uiCats);
        } catch (error) {
            console.error("Failed to load cats", error);
        } finally {
            setLoading(false);
        }
    }

    function formatAge(ageInMonths: number): string {
        if (ageInMonths < 12) return `${ageInMonths} months`;
        const years = Math.floor(ageInMonths / 12);
        return `${years} year${years > 1 ? 's' : ''}`;
    }

    const filteredCats = cats.filter(cat => {
        const matchesSearch = searchQuery === "" ||
            cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cat.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cat.location.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesGender = selectedGender === "All" || cat.gender === selectedGender;
        const matchesAge = selectedAge === "All" || getAgeCategory(cat.age) === selectedAge;

        const matchesAttributes =
            (!attributes.vaccinated || cat.vaccinated) &&
            (!attributes.neutered || cat.neutered) &&
            (!attributes.goodWithKids || cat.goodWithKids);

        return matchesSearch && matchesGender && matchesAge && matchesAttributes;
    });

    const resetFilters = () => {
        setSearchQuery("");
        setSelectedGender("All");
        setSelectedAge("All");
        setAttributes({ vaccinated: false, neutered: false, goodWithKids: false });
    };

    return (
        <div className="min-h-screen pb-24">
            {/* Header */}
            <div className="bg-gradient-to-br from-rose-500 to-rose-600 text-white py-16 text-center px-4 relative overflow-hidden">
                <div className="relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-bold mb-4"
                    >
                        Find Your Feline Soulmate
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-rose-100 max-w-xl mx-auto mb-8"
                    >
                        Browse through our list of rescued cats. From kittens to snoozy seniors, they are all waiting for love.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col items-center gap-6"
                    >
                        <p className="text-sm font-bold bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 inline-block shadow-lg">
                            🚫 We promote &quot;Adopt Don&apos;t Shop&quot;. No buying/selling.
                        </p>

                        <a
                            href="https://www.kuttawaala.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-400 to-amber-500 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                        >
                            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            <span className="text-2xl">🐕</span>
                            <div className="text-left">
                                <span className="block text-xs text-orange-100 uppercase tracking-wider">Looking for a dog?</span>
                                <span className="block text-lg leading-none">Visit KuttaWaala</span>
                            </div>
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </motion.div>
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,_rgba(255,255,255,0.15)_0%,_transparent_50%)] pointer-events-none" />
            </div>

            <div className="container mx-auto px-4 -mt-8 relative z-20">
                <div className="glass-card p-6 rounded-2xl space-y-6">
                    {/* Search Bar */}
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by name, breed, or location..."
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-amber-100 bg-white/60 focus:ring-2 focus:ring-rose-500 outline-none transition-all text-stone-700 placeholder:text-stone-400"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Filter Controls */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-stone-600">Gender</label>
                            <select
                                className="w-full p-2.5 rounded-lg border border-amber-100 bg-white/60 outline-none focus:ring-2 focus:ring-rose-500 text-stone-700"
                                value={selectedGender}
                                onChange={(e) => setSelectedGender(e.target.value)}
                            >
                                <option value="All">Any Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-stone-600">Age</label>
                            <select
                                className="w-full p-2.5 rounded-lg border border-amber-100 bg-white/60 outline-none focus:ring-2 focus:ring-rose-500 text-stone-700"
                                value={selectedAge}
                                onChange={(e) => setSelectedAge(e.target.value as AgeCategory | "All")}
                            >
                                <option value="All">Any Age</option>
                                <option value="Kitten">Kitten (&lt; 1 year)</option>
                                <option value="Adult">Adult (1-7 years)</option>
                                <option value="Senior">Senior (7+ years)</option>
                            </select>
                        </div>

                        <div className="col-span-1 md:col-span-2 flex flex-wrap gap-4 pt-2">
                            <label className="flex items-center gap-2 cursor-pointer bg-amber-50/60 px-3 py-2 rounded-lg border border-transparent hover:border-rose-200 transition-colors">
                                <input
                                    type="checkbox"
                                    checked={attributes.goodWithKids}
                                    onChange={(e) => setAttributes(prev => ({ ...prev, goodWithKids: e.target.checked }))}
                                    className="w-4 h-4 text-rose-600 rounded focus:ring-rose-500"
                                />
                                <span className="text-sm font-medium text-stone-600">Good with Kids</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer bg-amber-50/60 px-3 py-2 rounded-lg border border-transparent hover:border-rose-200 transition-colors">
                                <input
                                    type="checkbox"
                                    checked={attributes.vaccinated}
                                    onChange={(e) => setAttributes(prev => ({ ...prev, vaccinated: e.target.checked }))}
                                    className="w-4 h-4 text-rose-600 rounded focus:ring-rose-500"
                                />
                                <span className="text-sm font-medium text-stone-600">Vaccinated</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer bg-amber-50/60 px-3 py-2 rounded-lg border border-transparent hover:border-rose-200 transition-colors">
                                <input
                                    type="checkbox"
                                    checked={attributes.neutered}
                                    onChange={(e) => setAttributes(prev => ({ ...prev, neutered: e.target.checked }))}
                                    className="w-4 h-4 text-rose-600 rounded focus:ring-rose-500"
                                />
                                <span className="text-sm font-medium text-stone-600">Neutered</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Results & Stats */}
                <div className="mt-8 flex justify-between items-center text-stone-500 mb-6">
                    <p className="font-medium">Showing {filteredCats.length} cats</p>
                    {(searchQuery || selectedGender !== "All" || selectedAge !== "All" || Object.values(attributes).some(Boolean)) && (
                        <Button variant="ghost" onClick={resetFilters} className="text-rose-600 hover:text-rose-700 h-auto p-0 hover:bg-transparent">
                            <X className="w-4 h-4 mr-1" /> Clear Filters
                        </Button>
                    )}
                </div>

                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredCats.length > 0 ? (
                            filteredCats.map((cat, index) => (
                                <motion.div
                                    key={cat.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                >
                                    {/* @ts-ignore */}
                                    <PetCard cat={cat} />
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full text-center py-20"
                            >
                                <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl animate-bounce">
                                    😿
                                </div>
                                <h3 className="text-xl font-bold text-stone-800 mb-2">No cats matched your filters</h3>
                                <p className="text-stone-400">Maybe try broadening your search? Our cats are picky, but you shouldn't have to be!</p>
                                <Button variant="link" onClick={resetFilters} className="text-rose-600">Clear all filters</Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
}
