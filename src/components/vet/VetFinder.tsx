"use client";

import { useState } from "react";
import { MOCK_VET_CLINICS } from "@/data/vets";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, ExternalLink, Search, Star } from "lucide-react";

export function VetFinder() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

    const districts = Array.from(new Set(MOCK_VET_CLINICS.map(v => v.district))).sort();

    const filteredVets = MOCK_VET_CLINICS.filter(vet => {
        const matchesSearch = vet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vet.address.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDistrict = selectedDistrict ? vet.district === selectedDistrict : true;
        return matchesSearch && matchesDistrict;
    });

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 pb-20">
            {/* Header */}
            <div className="bg-emerald-600 text-white py-16 text-center px-4 relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-4xl font-bold mb-4 font-heading">Find a Vet Near You</h1>
                    <p className="text-emerald-100 max-w-xl mx-auto">
                        Locate verified veterinary clinics and hospitals across Bangladesh. Urgent care for your furry friends.
                    </p>
                </div>
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-700/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="container mx-auto px-4 -mt-8 relative z-20">
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-zinc-800 space-y-6">
                    {/* Search & Filter */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-grow">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search clinic name or area..."
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                            <Button
                                variant={selectedDistrict === null ? "default" : "outline"}
                                onClick={() => setSelectedDistrict(null)}
                                className={selectedDistrict === null ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                            >
                                All Districts
                            </Button>
                            {districts.map(district => (
                                <Button
                                    key={district}
                                    variant={selectedDistrict === district ? "default" : "outline"}
                                    onClick={() => setSelectedDistrict(district)}
                                    className={selectedDistrict === district ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                                >
                                    {district}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Results Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    {filteredVets.map(vet => (
                        <div key={vet.id} className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-zinc-800 hover:shadow-xl transition-all duration-300 group">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors mb-1">{vet.name}</h3>
                                        <span className="text-xs font-semibold px-2 py-1 bg-slate-100 dark:bg-zinc-800 rounded-lg text-slate-500">
                                            {vet.district}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-lg">
                                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                        <span className="font-bold text-sm text-yellow-700 dark:text-yellow-400">{vet.rating}</span>
                                    </div>
                                </div>

                                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400 mb-6">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                        <p>{vet.address}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                                        <p>{vet.phone}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
                                        <p>{vet.hours}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <a
                                        href={`tel:${vet.phone}`}
                                        className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-emerald-200 dark:border-emerald-900/30 text-emerald-600 dark:text-emerald-400 font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                                    >
                                        <Phone className="w-4 h-4" /> Call
                                    </a>
                                    <a
                                        href={vet.mapUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-500/20"
                                    >
                                        Map <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredVets.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-slate-500 text-lg">No clinics found matching your search.</p>
                        <Button variant="link" onClick={() => { setSearchQuery(""); setSelectedDistrict(null); }} className="text-emerald-600">
                            Clear Filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
