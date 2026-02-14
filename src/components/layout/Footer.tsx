"use client";

import Link from "next/link";
import { Facebook, Instagram, Mail, Cat } from "lucide-react";

function YoutubeIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
    );
}

function TikTokIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.73a8.19 8.19 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.16z" />
        </svg>
    );
}

export function Footer() {
    return (
        <footer className="relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-50/40 to-orange-50/50 dark:from-zinc-900 dark:to-black pointer-events-none" />

            <div className="relative z-10 pt-16 pb-8">
                <div className="container mx-auto px-4">
                    {/* Main footer content with glassmorphism */}
                    <div className="glass-card rounded-3xl p-8 md:p-12 mb-8 bg-white/40 dark:bg-zinc-900/40 border border-white/20 dark:border-white/10 backdrop-blur-md">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                            {/* Brand */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center shadow-lg shadow-rose-500/20">
                                        <Cat className="w-5 h-5 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-stone-800 dark:text-stone-100 tracking-tight">CATWAALA</h3>
                                </div>
                                <p className="text-xs font-semibold text-rose-500 uppercase tracking-wider">
                                    Non-Profit Animal Welfare Organization
                                </p>
                                <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">
                                    Giving every street cat a chance at a warm lap and a full bowl. Join our mission to care for the purring population.
                                </p>
                            </div>

                            {/* Quick Links */}
                            <div>
                                <h4 className="font-bold mb-5 text-stone-800 dark:text-stone-100 text-sm uppercase tracking-wider">Quick Links</h4>
                                <ul className="space-y-3">
                                    {[
                                        { href: "/adopt", label: "Adopt a Cat" },
                                        { href: "/report", label: "Report a Stray" },
                                        { href: "/volunteer", label: "Volunteer" },
                                        { href: "/find-vet", label: "Find a Vet" },
                                    ].map((link) => (
                                        <li key={link.href}>
                                            <Link href={link.href} className="text-sm text-stone-500 dark:text-stone-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors">
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}

                                </ul>
                            </div>

                            {/* Resources */}
                            <div>
                                <h4 className="font-bold mb-5 text-stone-800 dark:text-stone-100 text-sm uppercase tracking-wider">Care Resources</h4>
                                <ul className="space-y-3">
                                    {[
                                        { href: "/faq", label: "FAQ" },
                                        { href: "/quiz", label: "Cat Personality Quiz" },
                                        { href: "/memorial", label: "Memorial Wall" },
                                    ].map((link) => (
                                        <li key={link.href}>
                                            <Link href={link.href} className="text-sm text-stone-500 dark:text-stone-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors">
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Connect */}
                            <div>
                                <h4 className="font-bold mb-5 text-stone-800 dark:text-stone-100 text-sm uppercase tracking-wider">Connect</h4>
                                <div className="flex flex-wrap gap-2.5 mb-5">
                                    <a
                                        href="https://www.facebook.com/groups/catwaala/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2.5 glass-card rounded-xl text-stone-500 dark:text-stone-400 hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
                                        aria-label="Facebook"
                                    >
                                        <Facebook className="w-5 h-5" />
                                    </a>
                                    <a
                                        href="https://www.instagram.com/catwaala/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2.5 glass-card rounded-xl text-stone-500 dark:text-stone-400 hover:text-white hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20"
                                        aria-label="Instagram"
                                    >
                                        <Instagram className="w-5 h-5" />
                                    </a>
                                    <a
                                        href="https://www.youtube.com/@catwaala"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2.5 glass-card rounded-xl text-stone-500 dark:text-stone-400 hover:text-white hover:bg-[#FF0000] hover:border-[#FF0000] transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20"
                                        aria-label="YouTube"
                                    >
                                        <YoutubeIcon className="w-5 h-5" />
                                    </a>
                                    <a
                                        href="https://www.tiktok.com/@catwaala"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2.5 glass-card rounded-xl text-stone-500 dark:text-stone-400 hover:text-white hover:bg-black hover:border-black transition-all duration-300 hover:shadow-lg hover:shadow-stone-500/20"
                                        aria-label="TikTok"
                                    >
                                        <TikTokIcon className="w-5 h-5" />
                                    </a>
                                </div>
                                <div className="space-y-3 text-sm text-stone-500 dark:text-stone-400">
                                    <a href="mailto:catwaala@gmail.com" className="flex items-center gap-3 hover:text-rose-500 dark:hover:text-rose-400 transition-colors">
                                        <Mail className="w-4 h-4 text-rose-400" />
                                        catwaala@gmail.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="text-center text-sm text-stone-400 dark:text-stone-500">
                        <p>&copy; 2025 Catwaala. All rights reserved. Made with ❤️ and lots of tuna.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
