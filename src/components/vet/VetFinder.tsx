"use client";
import { VetService, VetClinic } from "@/services/VetService";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, ExternalLink, Search, Star, Loader2 } from "lucide-react";

export function VetFinder() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
    const [showEmergencyOnly, setShowEmergencyOnly] = useState(false);
    const [vets, setVets] = useState<VetClinic[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVets = async () => {
            try {
                const data = await VetService.getAll();
                setVets(data);
            } catch (error) {
                console.error("Failed to load vets", error);
            } finally {
                setLoading(false);
            }
        };
        fetchVets();
    }, []);

    const districts = Array.from(new Set(vets.map(v => v.district))).sort();

    const filteredVets = vets.filter(vet => {
        const matchesSearch = vet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vet.address.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDistrict = selectedDistrict ? vet.district === selectedDistrict : true;
        const matchesEmergency = showEmergencyOnly ? (vet.services.some(s => s.toLowerCase().includes("24") || s.toLowerCase().includes("emergency"))) : true;

        return matchesSearch && matchesDistrict && matchesEmergency;
    });

    return (
        <div className="min-h-screen pb-20">
            {/* Header */}
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white py-16 text-center px-4 relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-4xl font-bold mb-4">Find a Vet Near You</h1>
                    <p className="text-emerald-100 max-w-xl mx-auto">
                        Locate verified veterinary clinics and hospitals across Bangladesh. Urgent care for your furry friends.
                    </p>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-600/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="container mx-auto px-4 -mt-8 relative z-20">
                <div className="glass-card p-6 rounded-2xl space-y-6">
                    {/* Search & Filter */}
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-grow group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500/50 w-5 h-5 pointer-events-none" />
                                <input
                                    type="text"
                                    placeholder="Search by clinic name or area..."
                                    className="w-full pl-11 pr-4 py-4 rounded-2xl border-2 border-emerald-100/50 bg-white/80 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-stone-700 placeholder:text-stone-400 shadow-sm text-lg"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center">
                                <label className="flex items-center gap-3 cursor-pointer bg-red-50 hover:bg-red-100 border border-red-200 px-5 py-3.5 rounded-2xl transition-all select-none">
                                    <input
                                        type="checkbox"
                                        checked={showEmergencyOnly}
                                        onChange={(e) => setShowEmergencyOnly(e.target.checked)}
                                        className="w-5 h-5 text-red-600 rounded focus:ring-red-500 border-gray-300"
                                    />
                                    <span className="font-bold text-red-700">Emergency / 24h</span>
                                </label>
                            </div>
                        </div>

                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                            <Button
                                variant={selectedDistrict === null ? "default" : "outline"}
                                onClick={() => setSelectedDistrict(null)}
                                className={selectedDistrict === null ? "bg-emerald-600 hover:bg-emerald-700 text-white" : ""}
                            >
                                All Districts
                            </Button>
                            {districts.map(district => (
                                <Button
                                    key={district}
                                    variant={selectedDistrict === district ? "default" : "outline"}
                                    onClick={() => setSelectedDistrict(district)}
                                    className={selectedDistrict === district ? "bg-emerald-600 hover:bg-emerald-700 text-white" : ""}
                                >
                                    {district}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
                    </div>
                ) : (
                    <>
                        {/* Results Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                            {filteredVets.map(vet => (
                                <div key={vet.id} className="glass-card-hover rounded-2xl overflow-hidden group">
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-stone-800 group-hover:text-emerald-600 transition-colors mb-1">{vet.name}</h3>
                                                <span className="text-xs font-semibold px-2 py-1 bg-amber-50/70 rounded-lg text-stone-500">
                                                    {vet.district}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                                <span className="font-bold text-sm text-yellow-700">{vet.rating}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-3 text-sm text-stone-500 mb-6">
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
                                                className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-emerald-200 text-emerald-600 font-semibold hover:bg-emerald-50 transition-colors"
                                            >
                                                <Phone className="w-4 h-4" /> Call
                                            </a>
                                            <a
                                                href={vet.mapUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-500/20"
                                            >
                                                Get Directions <ExternalLink className="w-4 h-4" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredVets.length === 0 && (
                            <div className="text-center py-20">
                                <p className="text-stone-400 text-lg">No clinics found matching your search.</p>
                                <Button variant="link" onClick={() => { setSearchQuery(""); setSelectedDistrict(null); setShowEmergencyOnly(false); }} className="text-emerald-600">
                                    Clear Filters
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
