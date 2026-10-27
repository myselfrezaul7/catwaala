"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    MapPin,
    Phone,
    Clock,
    ExternalLink,
    Star,
    Globe,
    Copy,
    Check,
    GraduationCap,
    Building2,
    HeartHandshake,
    Stethoscope,
} from "lucide-react";
import { toast } from "sonner";
import { VetClinic, VetClinicType } from "@/services/VetService";
import { isSafeUrl } from "@/lib/validation";

interface VetCardProps {
    vet: VetClinic;
    index?: number;
}

const TYPE_BADGE_CONFIG: Record<
    VetClinicType,
    { label: string; className: string; icon: typeof Stethoscope }
> = {
    Private: {
        label: "Private Clinic",
        className:
            "bg-teal-50/90 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border-teal-200/70 dark:border-teal-800/60",
        icon: Stethoscope,
    },
    University: {
        label: "University Hospital",
        className:
            "bg-indigo-50/90 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200/70 dark:border-indigo-800/60",
        icon: GraduationCap,
    },
    NGO: {
        label: "Animal Welfare NGO",
        className:
            "bg-amber-50/90 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200/70 dark:border-amber-800/60",
        icon: HeartHandshake,
    },
    Government: {
        label: "Govt Hospital",
        className:
            "bg-stone-100/90 dark:bg-zinc-800/80 text-stone-700 dark:text-zinc-300 border-stone-200/80 dark:border-zinc-700",
        icon: Building2,
    },
};

export function VetCard({ vet, index = 0 }: VetCardProps) {
    const [copied, setCopied] = useState(false);

    const isEmergency =
        Boolean(vet.emergency24h) ||
        (vet.hours || "").toLowerCase().includes("24") ||
        (vet.services || []).some((s) => s?.toLowerCase().includes("24/7"));

    const clinicType: VetClinicType = vet.type || "Private";
    const badgeConfig = TYPE_BADGE_CONFIG[clinicType] || TYPE_BADGE_CONFIG.Private;
    const TypeIcon = badgeConfig.icon;

    const rawPhone = (vet.phone || "").trim();
    const isNationalHelpline = rawPhone === "16358";
    const displayPhone = isNationalHelpline
        ? "16358 (National Vet Helpline)"
        : rawPhone || "No phone listed";
    const dialablePhone = rawPhone.replace(/[^0-9+]/g, "");

    const handleCopyPhone = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!rawPhone) return;

        try {
            await navigator.clipboard.writeText(rawPhone);
            setCopied(true);
            toast.success(`Copied ${rawPhone} to clipboard`);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            toast.error("Could not copy phone number");
        }
    };

    const hasValidWebsite = Boolean(vet.website && isSafeUrl(vet.website));

    return (
        <motion.article
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.35,
                delay: Math.min(index * 0.03, 0.25),
                ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative h-full flex flex-col justify-between bg-white dark:bg-zinc-900 rounded-2xl p-5 sm:p-6 border border-stone-200/80 dark:border-zinc-800/80 shadow-sm hover:shadow-md hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all duration-200"
        >
            {/* Top Content */}
            <div className="flex flex-col flex-1">
                {/* Metadata Badges & Rating Row */}
                <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-zinc-800 text-stone-700 dark:text-zinc-300 border border-stone-200/60 dark:border-zinc-700/60">
                            <MapPin className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                            {vet.district || "Dhaka"}
                        </span>

                        <span
                            className={`inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${badgeConfig.className}`}
                        >
                            <TypeIcon className="w-3 h-3 shrink-0" />
                            {badgeConfig.label}
                        </span>

                        {isEmergency && (
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200/70 dark:border-rose-800/60">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                                24/7 Emergency
                            </span>
                        )}
                    </div>

                    {/* Compact Rating Badge */}
                    <div
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40 shrink-0"
                        title={`${vet.rating || 4.5} average rating (${vet.reviewCount || 0} reviews)`}
                    >
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
                        <span className="font-bold text-xs text-stone-800 dark:text-zinc-200">
                            {(vet.rating || 4.5).toFixed(1)}
                        </span>
                        <span className="text-[10px] text-stone-500 dark:text-zinc-400">
                            ({vet.reviewCount || 0})
                        </span>
                    </div>
                </div>

                {/* Clinic Name */}
                <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-zinc-100 leading-snug mb-3.5 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                    {vet.name}
                </h3>

                {/* Address, Phone & Hours */}
                <div className="space-y-2.5 text-xs sm:text-sm text-stone-600 dark:text-zinc-400 mb-4 flex-1">
                    <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-stone-400 dark:text-zinc-500 shrink-0 mt-0.5" />
                        <p className="line-clamp-2 leading-relaxed">{vet.address || "Address unavailable"}</p>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                            <Phone className="w-4 h-4 text-stone-400 dark:text-zinc-500 shrink-0" />
                            <span
                                className={`font-medium truncate ${
                                    isNationalHelpline
                                        ? "text-emerald-700 dark:text-emerald-400"
                                        : "text-stone-800 dark:text-zinc-200"
                                }`}
                            >
                                {displayPhone}
                            </span>
                        </div>

                        {rawPhone && (
                            <button
                                type="button"
                                onClick={handleCopyPhone}
                                aria-label={`Copy phone number ${rawPhone}`}
                                title="Copy phone number"
                                className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium text-stone-500 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-zinc-100 hover:bg-stone-100 dark:hover:bg-zinc-800 transition-colors shrink-0"
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                        <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-3.5 h-3.5" />
                                        <span>Copy</span>
                                    </>
                                )}
                            </button>
                        )}
                    </div>

                    <div className="flex items-center gap-2.5">
                        <Clock className="w-4 h-4 text-stone-400 dark:text-zinc-500 shrink-0" />
                        <p
                            className={`truncate ${
                                isEmergency
                                    ? "text-emerald-700 dark:text-emerald-400 font-medium"
                                    : ""
                            }`}
                        >
                            {vet.hours || "Hours unavailable"}
                        </p>
                    </div>
                </div>

                {/* Services Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                    {(vet.services || []).slice(0, 4).map((service) => (
                        <span
                            key={service}
                            className="text-[11px] px-2.5 py-0.5 bg-stone-100/80 dark:bg-zinc-800/80 text-stone-600 dark:text-zinc-300 rounded-md border border-stone-200/60 dark:border-zinc-700/60"
                        >
                            {service}
                        </span>
                    ))}
                    {(vet.services || []).length > 4 && (
                        <span className="text-[11px] px-2 py-0.5 bg-stone-50 dark:bg-zinc-800/50 text-stone-500 dark:text-zinc-400 rounded-md border border-stone-200/50 dark:border-zinc-700/50">
                            +{(vet.services || []).length - 4}
                        </span>
                    )}
                </div>
            </div>

            {/* Aligned Footer Actions */}
            <div
                className={`grid ${
                    hasValidWebsite ? "grid-cols-3" : "grid-cols-2"
                } gap-2 pt-3.5 border-t border-stone-100 dark:border-zinc-800/80 mt-auto`}
            >
                <a
                    href={dialablePhone ? `tel:${dialablePhone}` : "#"}
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-stone-200 dark:border-zinc-700 bg-stone-50/70 dark:bg-zinc-800/60 text-stone-800 dark:text-zinc-200 font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-700 dark:hover:text-emerald-300 hover:border-emerald-200 dark:hover:border-emerald-800/60 transition-colors text-xs sm:text-sm"
                >
                    <Phone className="w-3.5 h-3.5 shrink-0" />
                    <span>Call Now</span>
                </a>

                {hasValidWebsite && (
                    <a
                        href={vet.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-stone-200 dark:border-zinc-700 bg-stone-50/70 dark:bg-zinc-800/60 text-stone-700 dark:text-zinc-300 font-semibold hover:bg-stone-100 dark:hover:bg-zinc-800 transition-colors text-xs sm:text-sm"
                    >
                        <Globe className="w-3.5 h-3.5 shrink-0" />
                        <span>Website</span>
                    </a>
                )}

                <a
                    href={isSafeUrl(vet.mapUrl) ? vet.mapUrl : "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-xs transition-colors text-xs sm:text-sm"
                >
                    <span>Directions</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
            </div>
        </motion.article>
    );
}
