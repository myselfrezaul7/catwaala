"use client";

import { useState, useMemo, useEffect } from "react";
import { VetService, VetClinic } from "@/services/VetService";
import { Button } from "@/components/ui/button";
import { MapPin, Search, Filter, X, Building2, Stethoscope, Loader2, Sparkles } from "lucide-react";
import { VetCard } from "./VetCard";
import { motion, AnimatePresence } from "framer-motion";

export function VetFinder() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState<string>("all");
    const [selectedService, setSelectedService] = useState<string>("all");
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

    // Extract unique districts
    const districts = useMemo(() => {
        return Array.from(new Set(vets.map(v => v.district))).sort();
    }, [vets]);

    // Popular services for chips
    const POPULAR_SERVICES = [
        "Vaccination", "Surgery", "Emergency", "Deworming", "General Checkup", "Spay/Neuter"
    ];

    // Filter vets based on search, district, and service
    const filteredVets = useMemo(() => {
        return vets.filter(vet => {
            const searchLower = searchQuery.toLowerCase();
            const matchesSearch = searchQuery === "" ||
                vet.name.toLowerCase().includes(searchLower) ||
                vet.address.toLowerCase().includes(searchLower) ||
                vet.district.toLowerCase().includes(searchLower) ||
                vet.services.some(s => s.toLowerCase().includes(searchLower));

            const matchesDistrict = selectedDistrict === "all" || vet.district === selectedDistrict;
            const matchesService = selectedService === "all" || vet.services.some(s => s.toLowerCase().includes(selectedService.toLowerCase()));
            const matchesEmergency = showEmergencyOnly ? (vet.services.some(s => s.toLowerCase().includes("24") || s.toLowerCase().includes("emergency"))) : true;

            return matchesSearch && matchesDistrict && matchesService && matchesEmergency;
        });
    }, [vets, searchQuery, selectedDistrict, selectedService, showEmergencyOnly]);

    // Stats
    const stats = useMemo(() => ({
        total: vets.length,
        districts: districts.length,
        emergency: vets.filter(v => v.services.some(s => s.toLowerCase().includes("24") || s.toLowerCase().includes("emergency"))).length,
    }), [vets, districts]);

    const resetFilters = () => {
        setSearchQuery("");
        setSelectedDistrict("all");
        setSelectedService("all");
        setShowEmergencyOnly(false);
    };

    const hasActiveFilters = searchQuery || selectedDistrict !== "all" || selectedService !== "all" || showEmergencyOnly;

    return (
        <div className="min-h-screen bg-muted/30 dark:bg-zinc-950 pb-20">
            {/* Hero Header */}
            <div className="bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 text-white py-20 text-center px-4 relative overflow-hidden">
                <div className="relative z-10 container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 font-heading drop-shadow-md">
                            Find Trusted Vet Care
                        </h1>
                        <p className="text-emerald-50 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
                            Connect with {stats.total}+ verified clinics across {stats.districts} districts.
                            From routine checkups to 24/7 emergency care.
                        </p>
                    </motion.div>

                    {/* Stats Pills */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-wrap justify-center gap-4 mt-10"
                    >
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2.5 rounded-full shadow-lg">
                            <Building2 className="w-5 h-5 text-emerald-200" />
                            <span className="font-semibold">{stats.total} Clinics</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2.5 rounded-full shadow-lg">
                            <MapPin className="w-5 h-5 text-emerald-200" />
                            <span className="font-semibold">{stats.districts} Districts</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2.5 rounded-full shadow-lg">
                            <Stethoscope className="w-5 h-5 text-emerald-200" />
                            <span className="font-semibold">{stats.emergency} Emergency Centers</span>
                        </div>
                    </motion.div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-400/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-800/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-20">
                {/* Search & Filter Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-white/20 dark:border-zinc-800 space-y-6"
                >
                    {/* Main Search */}
                    <div className="relative group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground/80 w-5 h-5 group-focus-within:text-emerald-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search by clinic name, area, or service..."
                            className="w-full pl-14 pr-12 py-4 rounded-2xl border-2 border-transparent bg-muted/50 dark:bg-zinc-800/50 focus:bg-white dark:focus:bg-zinc-900 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-lg shadow-inner"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>

                    {/* Filter Row */}
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* District Dropdown */}
                        <div className="w-full lg:w-1/4 space-y-2">
                            <label className="text-sm font-semibold text-muted-foreground ml-1">
                                <MapPin className="w-4 h-4 inline mr-1.5" /> Location
                            </label>
                            <div className="relative">
                                <select
                                    value={selectedDistrict}
                                    onChange={(e) => setSelectedDistrict(e.target.value)}
                                    className="w-full appearance-none p-3 pl-4 pr-10 rounded-xl border border-border dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-emerald-500 outline-none transition-all cursor-pointer hover:border-emerald-500/50"
                                >
                                    <option value="all">All Districts ({vets.length})</option>
                                    {districts.map(district => (
                                        <option key={district} value={district}>
                                            {district} ({vets.filter(v => v.district === district).length})
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                                    <Filter className="w-4 h-4" />
                                </div>
                            </div>
                        </div>

                        {/* Service Chips */}
                        <div className="w-full lg:w-3/4 space-y-2">
                            <label className="text-sm font-semibold text-muted-foreground ml-1">
                                <Stethoscope className="w-4 h-4 inline mr-1.5" /> Filter by Service
                            </label>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => setSelectedService("all")}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${selectedService === "all"
                                        ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-500/20 scale-105"
                                        : "bg-white dark:bg-zinc-900 border-border dark:border-zinc-700 text-muted-foreground hover:border-emerald-500 hover:text-emerald-600"
                                        }`}
                                >
                                    All Services
                                </button>
                                {POPULAR_SERVICES.map(service => (
                                    <button
                                        key={service}
                                        onClick={() => setSelectedService(selectedService === service ? "all" : service)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${selectedService === service
                                            ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-500/20 scale-105"
                                            : "bg-white dark:bg-zinc-900 border-border dark:border-zinc-700 text-muted-foreground hover:border-emerald-500 hover:text-emerald-600"
                                            }`}
                                    >
                                        {service}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Active Filters & Results Count */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/50">
                        <div className="flex items-center gap-4">
                            <p className="font-medium text-muted-foreground">
                                Found <span className="font-bold text-foreground text-lg">{filteredVets.length}</span> clinics
                            </p>
                            {/* Emergency Toggle */}
                            <label className="flex items-center gap-2 cursor-pointer select-none">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        checked={showEmergencyOnly}
                                        onChange={(e) => setShowEmergencyOnly(e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
                                </div>
                                <span className={`text-sm font-bold ${showEmergencyOnly ? "text-red-600" : "text-muted-foreground"}`}>
                                    Emergency Only
                                </span>
                            </label>
                        </div>

                        {hasActiveFilters && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={resetFilters}
                                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                            >
                                <X className="w-4 h-4 mr-1" /> Clear All Filters
                            </Button>
                        )}
                    </div>
                </motion.div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex justify-center py-32">
                        <div className="flex flex-col items-center gap-4">
                            <Loader2 className="w-12 h-12 animate-spin text-emerald-500" />
                            <p className="text-muted-foreground animate-pulse">Locating clinics...</p>
                        </div>
                    </div>
                ) : (
                    /* Results Grid */
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10"
                    >
                        <AnimatePresence>
                            {filteredVets.map((vet, index) => (
                                <VetCard key={vet.id} vet={vet} index={index} />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}

                {/* Empty State */}
                {!loading && filteredVets.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-24 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm rounded-3xl border border-border/50 dark:border-zinc-800 mt-8 max-w-lg mx-auto"
                    >
                        <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search className="w-10 h-10 text-emerald-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-3">No clinics match criteria</h3>
                        <p className="text-muted-foreground mb-8 max-w-xs mx-auto">
                            Try adjusting your filters or search for a nearby district.
                        </p>
                        <Button onClick={resetFilters} size="lg" className="bg-emerald-600 hover:bg-emerald-700 shadow-xl shadow-emerald-500/20 rounded-xl">
                            <Sparkles className="w-4 h-4 mr-2" /> Show All Clinics
                        </Button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
