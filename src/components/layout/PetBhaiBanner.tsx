"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X } from "lucide-react";

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
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="relative z-50 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-600 text-white shadow-md overflow-hidden"
                >
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
                    <div className="container mx-auto px-4 py-3 flex items-center justify-center relative">
                        <div className="flex items-center gap-3 text-sm md:text-base font-medium">
                            <span className="flex items-center justify-center bg-white/20 p-1.5 rounded-full backdrop-blur-md">
                                <ShoppingBag className="w-4 h-4 text-white" />
                            </span>
                            <span className="text-center">
                                <span className="hidden sm:inline">Exciting news! </span>
                                <strong className="font-bold">PetBhai.com</strong> is launching soon for all your pet needs!
                            </span>
                            <a 
                                href="https://www.petbhai.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="ml-2 inline-flex items-center justify-center rounded-full bg-white text-purple-700 px-4 py-1 text-xs font-bold shadow-sm hover:bg-stone-100 hover:scale-105 transition-all"
                            >
                                Visit Store
                            </a>
                        </div>
                        <button 
                            onClick={handleDismiss}
                            className="absolute right-4 p-1 rounded-full hover:bg-white/20 transition-colors"
                            aria-label="Dismiss banner"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
