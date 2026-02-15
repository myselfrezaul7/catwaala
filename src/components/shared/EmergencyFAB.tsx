"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, AlertTriangle, MapPin, Heart, Cat } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function EmergencyFAB() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    const menuItems = [
        {
            label: "Report Rescue",
            icon: AlertTriangle,
            href: "/report",
            color: "bg-rose-600 text-white",
            delay: 0.1
        },
        {
            label: "Find Vet",
            icon: MapPin,
            href: "/find-vet",
            color: "bg-teal-500 text-white",
            delay: 0.05
        },
        {
            label: "Donate",
            icon: Heart,
            href: "/donate",
            color: "bg-amber-500 text-white",
            delay: 0
        }
    ];

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Overlay to close on click outside */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/20 backdrop-blur-[1px] z-40"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Menu Items */}
                        <div className="flex flex-col gap-3 items-end z-50 mb-2">
                            {menuItems.map((item, index) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.8 }}
                                    transition={{ duration: 0.2, delay: item.delay }}
                                >
                                    <Link href={item.href} onClick={() => setIsOpen(false)} className="flex items-center gap-3 group">
                                        <span className="bg-white dark:bg-zinc-900 text-stone-700 dark:text-stone-200 text-sm font-bold px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                            {item.label}
                                        </span>
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${item.color} transform group-hover:scale-110 transition-transform`}>
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </>
                )}
            </AnimatePresence>

            {/* Main Toggle Button */}
            <motion.button
                onClick={toggleOpen}
                className={`relative z-50 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-colors duration-300 ${isOpen ? "bg-zinc-800 text-white rotate-45" : "bg-rose-600 text-white animate-pulse-slow hover:bg-rose-700"
                    }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                {isOpen ? (
                    <Plus className="w-8 h-8" />
                ) : (
                    <Cat className="w-8 h-8" />
                )}

                {/* Ping effect when closed */}
                {!isOpen && (
                    <span className="absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75 animate-ping -z-10"></span>
                )}
            </motion.button>
        </div>
    );
}
