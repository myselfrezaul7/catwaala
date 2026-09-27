"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{
        outcome: "accepted" | "dismissed";
        platform: string;
    }>;
    prompt(): Promise<void>;
}

export function PWAInstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [hasPetBhai, setHasPetBhai] = useState(false);

    useEffect(() => {
        // Check if banner or prompt already dismissed
        const isDismissed = localStorage.getItem("catwaala-pwa-dismissed");
        if (isDismissed) return;

        // Check if already in standalone mode
        const isStandalone =
            window.matchMedia("(display-mode: standalone)").matches ||
            (window.navigator as unknown as { standalone?: boolean }).standalone === true;
        if (isStandalone) return;

        // Check if PetBhai banner is currently present to stack gracefully
        const checkPetBhai = () => {
            setHasPetBhai(!localStorage.getItem("petbhai-banner-dismissed"));
        };
        checkPetBhai();
        window.addEventListener("petbhai-dismissed", checkPetBhai);

        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
            setIsVisible(true);
        };

        const handleAppInstalled = () => {
            setIsVisible(false);
            setDeferredPrompt(null);
            localStorage.setItem("catwaala-pwa-dismissed", "true");
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        window.addEventListener("appinstalled", handleAppInstalled);

        return () => {
            window.removeEventListener("petbhai-dismissed", checkPetBhai);
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
            window.removeEventListener("appinstalled", handleAppInstalled);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;
        try {
            await deferredPrompt.prompt();
            const choiceResult = await deferredPrompt.userChoice;
            if (choiceResult.outcome === "accepted") {
                setIsVisible(false);
            }
            setDeferredPrompt(null);
        } catch (err) {
            console.error("Error invoking PWA install prompt:", err);
        }
    };

    const handleDismiss = () => {
        setIsVisible(false);
        localStorage.setItem("catwaala-pwa-dismissed", "true");
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.aside
                    initial={{ y: 20, opacity: 0, scale: 0.95 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 20, opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 350, damping: 26 }}
                    className={`fixed ${hasPetBhai ? "bottom-[148px] md:bottom-20" : "bottom-24 md:bottom-6"} left-4 md:left-6 right-20 md:right-auto max-w-[calc(100vw-6rem)] md:max-w-sm z-40 print:hidden transition-all duration-300`}
                    aria-label="Install Catwaala App"
                >
                    <div className="bg-zinc-900/90 dark:bg-zinc-800/90 backdrop-blur-xl border border-white/10 text-white rounded-full px-4 py-2.5 shadow-2xl flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-background/20 p-0.5 shrink-0 flex items-center justify-center shadow-md">
                            <Image
                                src="/logo.png"
                                alt="Catwaala App"
                                width={28}
                                height={28}
                                className="w-7 h-7 object-contain"
                            />
                        </div>
                        <div className="flex flex-col leading-tight min-w-0 pr-1">
                            <span className="font-bold text-xs text-white truncate">Catwaala App</span>
                            <span className="text-[11px] text-zinc-400 truncate">Install for fast access</span>
                        </div>
                        <button
                            onClick={handleInstallClick}
                            className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white px-3.5 py-1 text-xs font-semibold shadow-sm transition-all hover:scale-105 active:scale-95"
                        >
                            <Download className="w-3.5 h-3.5" />
                            <span>Install</span>
                        </button>
                        <button
                            onClick={handleDismiss}
                            className="shrink-0 w-6 h-6 rounded-full hover:bg-white/15 flex items-center justify-center text-zinc-400 hover:text-white transition-colors ml-0.5"
                            aria-label="Dismiss install prompt"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </motion.aside>
            )}
        </AnimatePresence>
    );
}
