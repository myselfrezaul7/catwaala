"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, ArrowRight } from "lucide-react";

export function PetBhaiBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user previously dismissed the banner
        const isDismissed = localStorage.getItem("petbhai-banner-dismissed");
        if (!isDismissed) {
            // Small delay for smooth entrance
            const timer = setTimeout(() => setIsVisible(true), 500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleDismiss = () => {
        setIsVisible(false);
        localStorage.setItem("petbhai-banner-dismissed", "true");
        window.dispatchEvent(new Event("petbhai-dismissed"));
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.aside
                    initial={{ y: 20, opacity: 0, scale: 0.95 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 20, opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 350, damping: 26 }}
                    className="fixed bottom-24 md:bottom-6 left-4 md:left-6 right-20 md:right-auto max-w-[calc(100vw-6rem)] md:max-w-sm z-40 print:hidden"
                    aria-label="PetBhai Shop Announcement"
                >
                    <div className="bg-zinc-900/90 dark:bg-zinc-800/90 backdrop-blur-xl border border-white/10 text-white rounded-full px-4 py-2.5 shadow-2xl flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-fuchsia-500 flex items-center justify-center shrink-0 shadow-md">
                            <ShoppingBag className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex flex-col leading-tight min-w-0 pr-1">
                            <span className="font-bold text-xs text-white truncate">PetBhai Shop</span>
                            <span className="text-[11px] text-zinc-400 truncate">Pet food & accessories</span>
                        </div>
                        <a
                            href="https://www.petbhai.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 inline-flex items-center gap-1 rounded-full bg-white text-zinc-900 hover:bg-zinc-100 px-3 py-1 text-xs font-semibold shadow-sm transition-all hover:scale-105 active:scale-95"
                        >
                            <span>Visit Store</span>
                            <ArrowRight className="w-3 h-3" />
                        </a>
                        <button
                            onClick={handleDismiss}
                            className="shrink-0 w-6 h-6 rounded-full hover:bg-white/15 flex items-center justify-center text-zinc-400 hover:text-white transition-colors ml-0.5"
                            aria-label="Dismiss banner"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </motion.aside>
            )}
        </AnimatePresence>
    );
}
