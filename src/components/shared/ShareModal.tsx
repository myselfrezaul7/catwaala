"use client";

import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Check, Share2 } from "lucide-react";
import { FaWhatsapp, FaFacebookF } from "react-icons/fa6";
import { toast } from "sonner";

interface ShareModalProps {
    title: string;
    text: string;
    url: string;
    isOpen: boolean;
    onClose: () => void;
}

export function ShareModal({
    title,
    text,
    url,
    isOpen,
    onClose,
}: ShareModalProps) {
    const [copied, setCopied] = useState(false);
    const [canNativeShare, setCanNativeShare] = useState(false);

    // Resolve URL client-side if relative
    const resolvedUrl = typeof window !== "undefined"
        ? (url.startsWith("http") ? url : `${window.location.origin}${url.startsWith("/") ? "" : "/"}${url}`)
        : url;

    useEffect(() => {
        if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
            setCanNativeShare(true);
        }
    }, []);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(resolvedUrl);
            setCopied(true);
            toast.success("Link copied to clipboard! 🐾");
            setTimeout(() => setCopied(false), 2500);
        } catch {
            toast.error("Failed to copy link.");
        }
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title,
                    text,
                    url: resolvedUrl,
                });
                onClose();
            } catch {
                // User dismissed or aborted share
            }
        }
    };

    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + resolvedUrl)}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(resolvedUrl)}`;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md rounded-3xl p-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl">
                <DialogHeader className="text-left space-y-2">
                    <DialogTitle className="text-2xl font-bold font-heading text-stone-900 dark:text-stone-100 flex items-center gap-2">
                        <span className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-500">
                            <Share2 className="w-5 h-5" />
                        </span>
                        Share Catwaala
                    </DialogTitle>
                    <DialogDescription className="text-stone-500 dark:text-stone-400 text-sm">
                        Spread the word and help this lovely rescue friend find a warm home!
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 pt-2">
                    {/* Social Buttons Grid */}
                    <div className="grid grid-cols-2 gap-3">
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2.5 p-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm transition-all shadow-md shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <FaWhatsapp className="w-5 h-5" />
                            <span>WhatsApp</span>
                        </a>

                        <a
                            href={facebookUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2.5 p-3.5 rounded-2xl bg-[#1877F2] hover:bg-[#166fe5] text-white font-semibold text-sm transition-all shadow-md shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <FaFacebookF className="w-4 h-4" />
                            <span>Facebook</span>
                        </a>
                    </div>

                    {/* Native Share button if supported */}
                    {canNativeShare && (
                        <Button
                            variant="outline"
                            onClick={handleNativeShare}
                            className="w-full h-11 rounded-2xl border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center justify-center gap-2 text-stone-700 dark:text-stone-300 font-medium"
                        >
                            <Share2 className="w-4 h-4 text-rose-500" />
                            <span>More Share Options</span>
                        </Button>
                    )}

                    {/* Copy Link Section */}
                    <div className="pt-2 border-t border-stone-100 dark:border-stone-800 space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                            Or copy link
                        </label>
                        <div className="flex items-center gap-2 bg-stone-50 dark:bg-stone-950 p-2 rounded-2xl border border-stone-200 dark:border-stone-800">
                            <input
                                type="text"
                                readOnly
                                value={resolvedUrl}
                                className="bg-transparent text-xs text-stone-600 dark:text-stone-300 w-full px-2 outline-none font-mono truncate select-all"
                            />
                            <Button
                                size="sm"
                                onClick={handleCopy}
                                className="rounded-xl px-4 h-9 bg-rose-500 hover:bg-rose-600 text-white shrink-0 font-medium shadow-sm transition-all"
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-3.5 h-3.5 mr-1" /> Copied
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-3.5 h-3.5 mr-1" /> Copy
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
