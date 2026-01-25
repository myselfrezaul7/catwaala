"use client";

import { useState } from "react";
import { MOCK_VET_CLINICS } from "@/data/vets";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, ExternalLink, Search } from "lucide-react";

export default function FindVetPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

    const districts = Array.from(new Set(MOCK_VET_CLINICS.map(v => v.district)));

    const filteredClinics = MOCK_VET_CLINICS.filter(clinic => {
        const matchesSearch = clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            clinic.address.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDistrict = selectedDistrict ? clinic.district === selectedDistrict : true;
        return matchesSearch && matchesDistrict;
    });

    return (
        <div className="min-h-screen bg-rose-50/30 dark:bg-zinc-950 pb-24">
            {/* Header */}
            <div className="bg-slate-900 text-white py-16 text-center px-4 relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-4xl font-bold mb-4 font-heading text-rose-400">Find a Vet Near You</h1>
                    <p className="text-slate-300 max-w-xl mx-auto">
                        Emergency? Checkup? Find trusted veterinary professionals across Bangladesh.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-8 relative z-20">
                <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-lg border border-slate-100 dark:border-zinc-800 flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-grow w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search clinic name or area..."
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-rose-100 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-rose-500 outline-none transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                        <select
                            className="p-3 rounded-xl border border-rose-100 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-rose-500 outline-none"
                            onChange={(e) => setSelectedDistrict(e.target.value || null)}
                        >
                            <option value="">All Districts</option>
                            {districts.map(d => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredClinics.map(clinic => (
                        <div key={clinic.id} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-rose-100 dark:border-zinc-800 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">{clinic.name}</h3>
                                <span className="text-xs font-bold px-2 py-1 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-md">
                                    {clinic.district}
                                </span>
                            </div>

                            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                                <p className="flex items-start gap-2">
                                    <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                                    {clinic.address}
                                </p>
                                <p className="flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-green-500" />
                                    <a href={`tel:${clinic.phone}`} className="hover:text-green-600 underline decoration-dotted">{clinic.phone}</a>
                                </p>
                                <p className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-blue-500" />
                                    {clinic.hours}
                                </p>
                            </div>

                            <div className="mt-6 flex gap-3">
                                <a href={clinic.mapUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                                    <Button variant="outline" className="w-full gap-2 border-rose-200 text-rose-600 hover:text-white hover:bg-rose-600">
                                        <MapPin className="w-4 h-4" /> Directions
                                    </Button>
                                </a>
                                {clinic.website && (
                                    <a href={clinic.website} target="_blank" rel="noopener noreferrer" className="flex-1">
                                        <Button variant="secondary" className="w-full gap-2">
                                            <ExternalLink className="w-4 h-4" /> Website
                                        </Button>
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
