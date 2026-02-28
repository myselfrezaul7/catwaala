"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock, ExternalLink, Star } from "lucide-react";
import { VetClinic } from "@/services/VetService";

interface VetCardProps {
    vet: VetClinic;
    index?: number;
}

export function VetCard({ vet, index = 0 }: VetCardProps) {
    const isEmergency = vet.hours.toLowerCase().includes("24") || vet.services.some(s => s.toLowerCase().includes("emergency"));

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="group relative bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md rounded-2xl md:rounded-[1.5rem] p-4 md:p-6 border border-white/20 dark:border-white/5 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
        >
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                    <div className="flex-1 min-w-0 pr-2">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 rounded-full">
                                <MapPin className="w-3 h-3" /> {vet.district}
                            </span>
                            {isEmergency && (
                                <span className="inline-flex items-center text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400 rounded-full animate-pulse">
                                    24/7 Emergency
                                </span>
                            )}
                        </div>
                        <h3 className="text-lg font-bold text-foreground dark:text-white leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            {vet.name}
                        </h3>
                    </div>
                    <div className="flex flex-col items-end shrink-0">
                        <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-lg border border-yellow-100 dark:border-yellow-900/30">
                            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                            <span className="font-bold text-sm text-yellow-700 dark:text-yellow-400">{vet.rating}</span>
                        </div>
                        <span className="text-[10px] text-muted-foreground mt-1">({vet.reviewCount} reviews)</span>
                    </div>
                </div>

                {/* Info */}
                <div className="space-y-3 text-sm text-muted-foreground dark:text-muted-foreground/90 mb-6 flex-grow">
                    <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <p className="line-clamp-2 leading-snug">{vet.address}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                        <p className="font-medium">{vet.phone}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
                        <p className={isEmergency ? "text-emerald-600 dark:text-emerald-400 font-bold" : ""}>
                            {vet.hours}
                        </p>
                    </div>
                </div>

                {/* Services */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                    {vet.services.slice(0, 3).map(service => (
                        <span
                            key={service}
                            className="text-[10px] px-2 py-1 bg-secondary/10 dark:bg-zinc-800 text-secondary-foreground/80 dark:text-zinc-400 rounded-md border border-secondary/20 dark:border-zinc-700"
                        >
                            {service}
                        </span>
                    ))}
                    {vet.services.length > 3 && (
                        <span className="text-xs px-2 py-1 bg-muted dark:bg-zinc-800 text-muted-foreground rounded-md">
                            +{vet.services.length - 3}
                        </span>
                    )}
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3 mt-auto">
                    <a
                        href={`tel:${vet.phone.replace(/[^0-9+]/g, '')}`}
                        className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800/50 bg-emerald-50/50 dark:bg-emerald-900/10 text-emerald-700 dark:text-emerald-400 font-semibold hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:border-emerald-300 transition-all"
                    >
                        <Phone className="w-4 h-4" /> Call
                    </a>
                    <a
                        href={vet.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all transform hover:-translate-y-0.5"
                    >
                        Directions <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                </div>
            </div>
        </motion.div>
    );
}
