"use client";

import { useState } from "react";
import { PetCard } from "@/components/shared/PetCard";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";
import { cats, getAgeCategory, type AgeCategory } from "@/data/cats";

export default function AdoptPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedGender, setSelectedGender] = useState<string>("All");
    const [selectedAge, setSelectedAge] = useState<AgeCategory | "All">("All");
    const [attributes, setAttributes] = useState({
        vaccinated: false,
        neutered: false,
        goodWithKids: false,
    });

    const filteredCats = cats.filter(cat => {
        // Text Search
        const matchesSearch = searchQuery === "" ||
            cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cat.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cat.location.toLowerCase().includes(searchQuery.toLowerCase());

        // Category Filters
        const matchesGender = selectedGender === "All" || cat.gender === selectedGender;
        const matchesAge = selectedAge === "All" || getAgeCategory(cat.age) === selectedAge;

        // Attribute Filters (AND logic)
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
        <div className="min-h-screen bg-white dark:bg-zinc-950 pb-24">
            {/* Header */}
            <div className="bg-rose-500 text-white py-16 text-center px-4 relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-4xl font-bold mb-4 font-heading">Find Your Feline Soulmate</h1>
                    <p className="text-rose-100 max-w-xl mx-auto mb-6">
                        Browse through our list of rescued cats. From kittens to snoozy seniors, they are all waiting for love.
                    </p>
                    <div className="flex flex-col items-center gap-4">
                        <p className="text-sm font-bold bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 inline-block">
                            🚫 We promotes &quot;Adopt Don&apos;t Shop&quot;. No buying/selling.
                        </p>
                        <a
                            href="https://www.kuttawaala.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-orange-200 underline underline-offset-4 decoration-orange-300 decoration-2 font-bold transition-all hover:scale-105"
                        >
                            🐕 Looking for a dog instead? Visit KuttaWaala
                        </a>
                    </div>
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,_rgba(255,255,255,0.2)_0%,_transparent_50%)] pointer-events-none" />
            </div>

            <div className="container mx-auto px-4 -mt-8 relative z-20">
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-zinc-800 space-y-6">
                    {/* Search Bar */}
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by name, breed, or location..."
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-rose-100 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-rose-500 outline-none transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Filter Controls */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                        {/* Gender */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Gender</label>
                            <select
                                className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-zinc-700 bg-transparent outline-none focus:ring-2 focus:ring-rose-500"
                                value={selectedGender}
                                onChange={(e) => setSelectedGender(e.target.value)}
                            >
                                <option value="All">Any Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>

                        {/* Age */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Age</label>
                            <select
                                className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-zinc-700 bg-transparent outline-none focus:ring-2 focus:ring-rose-500"
                                value={selectedAge}
                                onChange={(e) => setSelectedAge(e.target.value as AgeCategory | "All")}
                            >
                                <option value="All">Any Age</option>
                                <option value="Kitten">Kitten (&lt; 1 year)</option>
                                <option value="Adult">Adult (1-7 years)</option>
                                <option value="Senior">Senior (7+ years)</option>
                            </select>
                        </div>

                        {/* Attributes Checklist */}
                        <div className="col-span-1 md:col-span-2 flex flex-wrap gap-4 pt-2">
                            <label className="flex items-center gap-2 cursor-pointer bg-slate-50 dark:bg-zinc-800 px-3 py-2 rounded-lg border border-transparent hover:border-rose-200 transition-colors">
                                <input
                                    type="checkbox"
                                    checked={attributes.goodWithKids}
                                    onChange={(e) => setAttributes(prev => ({ ...prev, goodWithKids: e.target.checked }))}
                                    className="w-4 h-4 text-rose-600 rounded focus:ring-rose-500"
                                />
                                <span className="text-sm font-medium">Good with Kids</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer bg-slate-50 dark:bg-zinc-800 px-3 py-2 rounded-lg border border-transparent hover:border-rose-200 transition-colors">
                                <input
                                    type="checkbox"
                                    checked={attributes.vaccinated}
                                    onChange={(e) => setAttributes(prev => ({ ...prev, vaccinated: e.target.checked }))}
                                    className="w-4 h-4 text-rose-600 rounded focus:ring-rose-500"
                                />
                                <span className="text-sm font-medium">Vaccinated</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer bg-slate-50 dark:bg-zinc-800 px-3 py-2 rounded-lg border border-transparent hover:border-rose-200 transition-colors">
                                <input
                                    type="checkbox"
                                    checked={attributes.neutered}
                                    onChange={(e) => setAttributes(prev => ({ ...prev, neutered: e.target.checked }))}
                                    className="w-4 h-4 text-rose-600 rounded focus:ring-rose-500"
                                />
                                <span className="text-sm font-medium">Neutered</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Results & Stats */}
                <div className="mt-8 flex justify-between items-center text-slate-500 mb-6">
                    <p className="font-medium">Showing {filteredCats.length} cats</p>
                    {(searchQuery || selectedGender !== "All" || selectedAge !== "All" || Object.values(attributes).some(Boolean)) && (
                        <Button variant="ghost" onClick={resetFilters} className="text-rose-600 hover:text-rose-700 h-auto p-0 hover:bg-transparent">
                            <X className="w-4 h-4 mr-1" /> Clear Filters
                        </Button>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCats.length > 0 ? (
                        filteredCats.map(cat => (
                            // @ts-ignore
                            <PetCard key={cat.id} cat={cat} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20">
                            <div className="w-24 h-24 bg-rose-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                                😿
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">No cats matched your filters</h3>
                            <p className="text-slate-500">Maybe try broadening your search? Our cats are picky, but you shouldn't have to be!</p>
                            <Button variant="link" onClick={resetFilters} className="text-rose-600">Clear all filters</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
