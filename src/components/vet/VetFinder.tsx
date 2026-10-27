"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
    VetService,
    VetClinic,
    VetDivision,
    BANGLADESH_DIVISIONS,
} from "@/services/VetService";
import { Button } from "@/components/ui/button";
import {
    MapPin,
    Search,
    Filter,
    X,
    Building2,
    Stethoscope,
    Sparkles,
    PhoneCall,
    GraduationCap,
    ShieldAlert,
    Compass,
} from "lucide-react";
import { VetCard } from "./VetCard";
import { motion, AnimatePresence } from "framer-motion";
import { DataErrorState } from "@/components/shared/DataErrorState";
import { SkeletonGrid } from "@/components/shared/SkeletonCard";

type QuickCategoryFilter = "all" | "emergency" | "private" | "university_ngo" | "government";

const QUICK_CATEGORY_OPTIONS: {
    id: QuickCategoryFilter;
    label: string;
}[] = [
    { id: "all", label: "All Clinics" },
    { id: "emergency", label: "24/7 Emergency" },
    { id: "private", label: "Private Clinics" },
    { id: "university_ngo", label: "University & NGO" },
    { id: "government", label: "Govt Hospitals" },
];

const POPULAR_SERVICES = [
    "Vaccination",
    "Surgery",
    "Spay/Neuter",
    "Diagnostics",
    "Deworming",
    "General Checkup",
];

function isEmergencyClinic(vet: VetClinic): boolean {
    return (
        Boolean(vet.emergency24h) ||
        (vet.hours || "").toLowerCase().includes("24") ||
        (vet.services || []).some((s) => s?.toLowerCase().includes("24/7"))
    );
}

function getClinicSortScore(vet: VetClinic): number {
    let score = 0;
    if (isEmergencyClinic(vet)) score += 300;
    if (vet.type === "University") score += 220;
    else if (vet.type === "Private") score += 180;
    else if (vet.type === "NGO") score += 170;
    else if (vet.type === "Government") score += 50;

    score += (vet.rating || 4.0) * 20;
    score += Math.min(vet.reviewCount || 0, 500) * 0.05;
    return score;
}

export function VetFinder() {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get("query") || "";
    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [selectedDivision, setSelectedDivision] = useState<"all" | VetDivision>("all");
    const [selectedDistrict, setSelectedDistrict] = useState<string>("all");
    const [selectedCategory, setSelectedCategory] = useState<QuickCategoryFilter>("all");
    const [selectedService, setSelectedService] = useState<string>("all");
    const [vets, setVets] = useState<VetClinic[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchVets = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await VetService.getAll();
            setVets(data);
        } catch (err) {
            console.error("Failed to load vets", err);
            setError("Could not retrieve clinic list.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVets();
    }, []);

    // Division counts
    const divisionCounts = useMemo(() => {
        const counts: Record<string, number> = { all: vets.length };
        for (const div of BANGLADESH_DIVISIONS) {
            counts[div] = 0;
        }
        for (const vet of vets) {
            const div = vet.division || "Dhaka";
            counts[div] = (counts[div] || 0) + 1;
        }
        return counts;
    }, [vets]);

    // Districts scoped to selected division
    const availableDistricts = useMemo(() => {
        const scoped =
            selectedDivision === "all"
                ? vets
                : vets.filter((v) => (v.division || "Dhaka") === selectedDivision);
        return Array.from(new Set(scoped.map((v) => v.district).filter(Boolean))).sort();
    }, [vets, selectedDivision]);

    // Total unique districts across Bangladesh
    const totalDistrictsCount = useMemo(() => {
        return new Set(vets.map((v) => v.district).filter(Boolean)).size;
    }, [vets]);

    // Handle division change cleanly
    const handleDivisionChange = (division: "all" | VetDivision) => {
        setSelectedDivision(division);
        setSelectedDistrict("all");
    };

    // Filter and smart-sort vets
    const filteredVets = useMemo(() => {
        const filtered = vets.filter((vet) => {
            const searchLower = searchQuery.trim().toLowerCase();
            const searchTerms = searchLower.split(/\s+/).filter(Boolean);

            const matchesSearch =
                searchTerms.length === 0 ||
                searchTerms.every(
                    (term) =>
                        (vet.name || "").toLowerCase().includes(term) ||
                        (vet.address || "").toLowerCase().includes(term) ||
                        (vet.district || "").toLowerCase().includes(term) ||
                        (vet.division || "").toLowerCase().includes(term) ||
                        (vet.type || "").toLowerCase().includes(term) ||
                        (vet.services || []).some((s) => s?.toLowerCase().includes(term))
                );

            const matchesDivision =
                selectedDivision === "all" || (vet.division || "Dhaka") === selectedDivision;
            const matchesDistrict =
                selectedDistrict === "all" || vet.district === selectedDistrict;

            let matchesCategory = true;
            if (selectedCategory === "emergency") {
                matchesCategory = isEmergencyClinic(vet);
            } else if (selectedCategory === "private") {
                matchesCategory = (vet.type || "Private") === "Private";
            } else if (selectedCategory === "university_ngo") {
                matchesCategory = vet.type === "University" || vet.type === "NGO";
            } else if (selectedCategory === "government") {
                matchesCategory = vet.type === "Government";
            }

            const matchesService =
                selectedService === "all" ||
                (vet.services || []).some((s) =>
                    s?.toLowerCase().includes(selectedService.toLowerCase())
                );

            return (
                matchesSearch &&
                matchesDivision &&
                matchesDistrict &&
                matchesCategory &&
                matchesService
            );
        });

        return [...filtered].sort((a, b) => getClinicSortScore(b) - getClinicSortScore(a));
    }, [
        vets,
        searchQuery,
        selectedDivision,
        selectedDistrict,
        selectedCategory,
        selectedService,
    ]);

    // Directory summary stats
    const stats = useMemo(
        () => ({
            total: vets.length,
            districts: totalDistrictsCount || 64,
            emergencyAndTeaching: vets.filter(
                (v) => isEmergencyClinic(v) || v.type === "University"
            ).length,
        }),
        [vets, totalDistrictsCount]
    );

    const resetFilters = () => {
        setSearchQuery("");
        setSelectedDivision("all");
        setSelectedDistrict("all");
        setSelectedCategory("all");
        setSelectedService("all");
    };

    const hasActiveFilters =
        Boolean(searchQuery.trim()) ||
        selectedDivision !== "all" ||
        selectedDistrict !== "all" ||
        selectedCategory !== "all" ||
        selectedService !== "all";

    return (
        <div className="min-h-screen bg-stone-50/60 dark:bg-zinc-950 pb-24">
            {/* Clean Editorial Header */}
            <section className="relative bg-gradient-to-b from-emerald-900 via-emerald-800 to-teal-900 text-white pt-14 pb-20 px-4 overflow-hidden border-b border-emerald-700/40">
                <div className="relative z-10 container mx-auto max-w-6xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45 }}
                    >
                        <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-emerald-100 mb-4">
                            <Compass className="w-3.5 h-3.5 text-emerald-300" />
                            Bangladesh Nationwide Veterinary Directory
                        </span>
                        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4 font-heading">
                            Find Trusted Vet Care Across Bangladesh
                        </h1>
                        <p className="text-emerald-100/90 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
                            Verified private pet clinics, university teaching hospitals, and government
                            veterinary centers across all {stats.districts} districts and 8 divisions.
                        </p>
                    </motion.div>

                    {/* Key Metrics Pills */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.1 }}
                        className="flex flex-wrap justify-center gap-2.5 sm:gap-3.5 mt-7"
                    >
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xs border border-white/15 px-3.5 py-1.5 rounded-full text-xs sm:text-sm">
                            <Building2 className="w-4 h-4 text-emerald-300" />
                            <span className="font-semibold">{stats.total} Verified Clinics</span>
                        </div>
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xs border border-white/15 px-3.5 py-1.5 rounded-full text-xs sm:text-sm">
                            <MapPin className="w-4 h-4 text-emerald-300" />
                            <span className="font-semibold">{stats.districts} Districts Covered</span>
                        </div>
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xs border border-white/15 px-3.5 py-1.5 rounded-full text-xs sm:text-sm">
                            <GraduationCap className="w-4 h-4 text-emerald-300" />
                            <span className="font-semibold">
                                {stats.emergencyAndTeaching} Emergency & Teaching Centers
                            </span>
                        </div>
                    </motion.div>
                </div>

                {/* Subtle Ambient Glow */}
                <div className="absolute -top-24 right-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 left-1/4 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />
            </section>

            <div className="container mx-auto max-w-6xl px-4 -mt-10 relative z-20 space-y-5">
                {/* Filter & Discovery Panel */}
                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="bg-white dark:bg-zinc-900 p-4 sm:p-6 rounded-2xl shadow-md border border-stone-200/80 dark:border-zinc-800/90 space-y-5"
                >
                    {/* Division Navigation Bar */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-zinc-400">
                                Browse by Division
                            </span>
                            {selectedDivision !== "all" && (
                                <button
                                    type="button"
                                    onClick={() => handleDivisionChange("all")}
                                    className="text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
                                >
                                    Show all divisions
                                </button>
                            )}
                        </div>
                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 no-scrollbar">
                            <button
                                type="button"
                                onClick={() => handleDivisionChange("all")}
                                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border ${
                                    selectedDivision === "all"
                                        ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                                        : "bg-stone-50 dark:bg-zinc-800/70 text-stone-700 dark:text-zinc-300 border-stone-200/80 dark:border-zinc-700/70 hover:border-emerald-500/50"
                                }`}
                            >
                                <span>All Bangladesh</span>
                                <span
                                    className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                                        selectedDivision === "all"
                                            ? "bg-white/20 text-white"
                                            : "bg-stone-200/80 dark:bg-zinc-700 text-stone-600 dark:text-zinc-300"
                                    }`}
                                >
                                    {divisionCounts.all}
                                </span>
                            </button>

                            {BANGLADESH_DIVISIONS.map((division) => {
                                const isActive = selectedDivision === division;
                                return (
                                    <button
                                        key={division}
                                        type="button"
                                        onClick={() => handleDivisionChange(division)}
                                        className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border ${
                                            isActive
                                                ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                                                : "bg-stone-50 dark:bg-zinc-800/70 text-stone-700 dark:text-zinc-300 border-stone-200/80 dark:border-zinc-700/70 hover:border-emerald-500/50"
                                        }`}
                                    >
                                        <span>{division}</span>
                                        <span
                                            className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                                                isActive
                                                    ? "bg-white/20 text-white"
                                                    : "bg-stone-200/80 dark:bg-zinc-700 text-stone-600 dark:text-zinc-300"
                                            }`}
                                        >
                                            {divisionCounts[division] || 0}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Search & District Row */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                        {/* Instant Search Input */}
                        <div className="md:col-span-8 relative">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 dark:text-zinc-500 w-4 h-4 sm:w-5 sm:h-5" />
                            <input
                                type="text"
                                aria-label="Search clinics by name, area, district, or service"
                                placeholder="Search clinic name, area (e.g. Mirpur, Uttara, Dhanmondi), district, or service..."
                                className="w-full pl-10 sm:pl-11 pr-9 py-2.5 sm:py-3 rounded-xl border border-stone-200 dark:border-zinc-700/80 bg-stone-50/60 dark:bg-zinc-800/50 focus:bg-white dark:focus:bg-zinc-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 outline-none transition-all text-sm sm:text-base text-stone-900 dark:text-zinc-100 placeholder:text-stone-400"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery("")}
                                    aria-label="Clear search query"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-stone-200/70 dark:hover:bg-zinc-700 text-stone-500 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        {/* District Dropdown */}
                        <div className="md:col-span-4 relative">
                            <select
                                value={selectedDistrict}
                                aria-label="Filter clinics by district"
                                onChange={(e) => setSelectedDistrict(e.target.value)}
                                className="w-full appearance-none py-2.5 sm:py-3 pl-3.5 pr-9 rounded-xl border border-stone-200 dark:border-zinc-700/80 bg-stone-50/60 dark:bg-zinc-800/50 text-stone-800 dark:text-zinc-100 text-sm sm:text-base font-medium focus:bg-white dark:focus:bg-zinc-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 outline-none transition-all cursor-pointer"
                            >
                                <option value="all">
                                    {selectedDivision === "all"
                                        ? `All Districts (${availableDistricts.length})`
                                        : `All ${selectedDivision} Districts (${availableDistricts.length})`}
                                </option>
                                {availableDistricts.map((district) => {
                                    const count = vets.filter(
                                        (v) =>
                                            v.district === district &&
                                            (selectedDivision === "all" ||
                                                (v.division || "Dhaka") === selectedDivision)
                                    ).length;
                                    return (
                                        <option key={district} value={district}>
                                            {district} ({count})
                                        </option>
                                    );
                                })}
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
                                <Filter className="w-4 h-4" />
                            </div>
                        </div>
                    </div>

                    {/* Quick-Filter Category Toggles & Service Tags */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-1">
                        {/* Segmented Clinic Type Filter */}
                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 no-scrollbar">
                            {QUICK_CATEGORY_OPTIONS.map((option) => {
                                const active = selectedCategory === option.id;
                                const isEmergencyTab = option.id === "emergency";
                                return (
                                    <button
                                        key={option.id}
                                        type="button"
                                        onClick={() => setSelectedCategory(option.id)}
                                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                                            active
                                                ? isEmergencyTab
                                                    ? "bg-rose-600 text-white border-rose-600 shadow-xs"
                                                    : "bg-stone-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-stone-900 dark:border-zinc-100"
                                                : "bg-white dark:bg-zinc-900 text-stone-600 dark:text-zinc-400 border-stone-200 dark:border-zinc-800 hover:border-stone-300 dark:hover:border-zinc-700"
                                        }`}
                                    >
                                        {isEmergencyTab && (
                                            <span
                                                className={`w-1.5 h-1.5 rounded-full ${
                                                    active ? "bg-white" : "bg-rose-500"
                                                }`}
                                            />
                                        )}
                                        {option.label}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Service Chips */}
                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 no-scrollbar">
                            <span className="text-xs font-medium text-stone-400 dark:text-zinc-500 mr-1 shrink-0 hidden sm:inline">
                                <Stethoscope className="w-3.5 h-3.5 inline mr-1" />
                                Service:
                            </span>
                            {POPULAR_SERVICES.map((service) => {
                                const active = selectedService === service;
                                return (
                                    <button
                                        key={service}
                                        type="button"
                                        onClick={() =>
                                            setSelectedService(active ? "all" : service)
                                        }
                                        className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${
                                            active
                                                ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700 font-semibold"
                                                : "bg-stone-50/70 dark:bg-zinc-800/50 text-stone-600 dark:text-zinc-400 border-stone-200/70 dark:border-zinc-800 hover:border-emerald-400/50"
                                        }`}
                                    >
                                        {service}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Results Count & Active Filter Reset Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-stone-100 dark:border-zinc-800/80 text-xs sm:text-sm">
                        <p className="text-stone-600 dark:text-zinc-400">
                            Showing{" "}
                            <span className="font-bold text-stone-900 dark:text-zinc-100">
                                {filteredVets.length}
                            </span>{" "}
                            {filteredVets.length === 1 ? "clinic" : "clinics"}
                            {selectedDivision !== "all" && (
                                <span>
                                    {" "}
                                    in <strong className="text-emerald-700 dark:text-emerald-400">{selectedDivision} Division</strong>
                                </span>
                            )}
                            {selectedDistrict !== "all" && (
                                <span>
                                    {" "}
                                    • <strong>{selectedDistrict}</strong>
                                </span>
                            )}
                        </p>

                        {hasActiveFilters && (
                            <button
                                type="button"
                                onClick={resetFilters}
                                className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline"
                            >
                                <X className="w-3.5 h-3.5" />
                                Reset all filters
                            </button>
                        )}
                    </div>
                </motion.div>

                {/* Subtle National Vet Helpline & Emergency Guidance Banner */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 py-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/25 border border-emerald-200/70 dark:border-emerald-900/50 text-xs sm:text-sm text-stone-700 dark:text-zinc-300">
                    <div className="flex items-start sm:items-center gap-2.5">
                        <ShieldAlert className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5 sm:mt-0" />
                        <p>
                            <span className="font-semibold text-stone-900 dark:text-zinc-100">
                                National Livestock & Vet Helpline (DLS):
                            </span>{" "}
                            Call{" "}
                            <a
                                href="tel:16358"
                                className="font-bold text-emerald-700 dark:text-emerald-400 underline underline-offset-2"
                            >
                                16358
                            </a>{" "}
                            (toll-free across Bangladesh) for government veterinary support, or filter by{" "}
                            <button
                                type="button"
                                onClick={() => setSelectedCategory("emergency")}
                                className="font-semibold text-rose-600 dark:text-rose-400 hover:underline"
                            >
                                24/7 Emergency
                            </button>{" "}
                            for urgent after-hours care.
                        </p>
                    </div>
                    <a
                        href="tel:16358"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shrink-0 transition-colors"
                    >
                        <PhoneCall className="w-3.5 h-3.5" />
                        Dial 16358
                    </a>
                </div>

                {/* Loading, Error, or Equal-Height Results Grid */}
                {loading ? (
                    <SkeletonGrid count={6} />
                ) : error ? (
                    <div className="py-12">
                        <DataErrorState message={error} onRetry={fetchVets} />
                    </div>
                ) : (
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2 items-stretch"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredVets.map((vet, index) => (
                                <VetCard key={vet.id} vet={vet} index={index} />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}

                {/* Empty State */}
                {!loading && !error && filteredVets.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-16 px-4 bg-white dark:bg-zinc-900 rounded-2xl border border-stone-200/80 dark:border-zinc-800 max-w-lg mx-auto my-8"
                    >
                        <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-950/40 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <h3 className="text-xl font-bold text-stone-900 dark:text-zinc-100 mb-2">
                            No veterinary clinics match your filters
                        </h3>
                        <p className="text-sm text-stone-500 dark:text-zinc-400 mb-6 max-w-xs mx-auto">
                            Try clearing your service or category filter, or switch to All Bangladesh to
                            browse nearby districts.
                        </p>
                        <Button
                            onClick={resetFilters}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl"
                        >
                            <Sparkles className="w-4 h-4 mr-2" />
                            Show All {stats.total} Clinics
                        </Button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
