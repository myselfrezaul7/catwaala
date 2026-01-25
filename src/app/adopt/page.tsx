"use client";

import { useState } from "react";
import { PetCard } from "@/components/shared/PetCard";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";
import { cats } from "@/data/cats";

export default function AdoptPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState<string | null>(null);

    const filteredCats = cats.filter(cat => {
        const matchesSearch = cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cat.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cat.location.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterType ? cat.tag === filterType : true;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 pb-24">
            {/* Header */}
            <div className="bg-rose-500 text-white py-16 text-center px-4 relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-4xl font-bold mb-4 font-heading">Find Your Feline Soulmate</h1>
                    <p className="text-rose-100 max-w-xl mx-auto">
                        Browse through our list of rescued cats. From kittens to snoozy seniors, they are all waiting for love.
                    </p>
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,_rgba(255,255,255,0.2)_0%,_transparent_50%)] pointer-events-none" />
            </div>

            <div className="container mx-auto px-4 -mt-8 relative z-20">
                {/* Search & Filter Bar */}
                <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-lg border border-slate-100 dark:border-zinc-800 flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-grow w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by name, breed, or location..."
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-rose-100 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-rose-500 outline-none transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                        <Button
                            variant={filterType === null ? "default" : "outline"}
                            onClick={() => setFilterType(null)}
                            className={`whitespace-nowrap rounded-lg border-2 ${filterType === null ? 'bg-rose-600 border-rose-600' : 'border-slate-200'}`}
                        >
                            All
                        </Button>
                        <Button
                            variant={filterType === "Urgent" ? "default" : "outline"}
                            onClick={() => setFilterType("Urgent")}
                            className={`whitespace-nowrap rounded-lg border-2 ${filterType === "Urgent" ? 'bg-rose-500 border-rose-500' : 'text-rose-600 border-rose-100'}`}
                        >
                            Urgent
                        </Button>
                        <Button
                            variant={filterType === "New" ? "default" : "outline"}
                            onClick={() => setFilterType("New")}
                            className={`whitespace-nowrap rounded-lg border-2 ${filterType === "New" ? 'bg-indigo-500 border-indigo-500' : 'text-indigo-600 border-indigo-100'}`}
                        >
                            New Arrivals
                        </Button>
                    </div>
                </div>

                {/* Results */}
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
                            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">No cats found</h3>
                            <p className="text-slate-500">Maybe they are hiding? Try adjusting your search.</p>
                            <Button variant="link" onClick={() => { setSearchQuery(""); setFilterType(null); }} className="text-rose-600">Clear all filters</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
