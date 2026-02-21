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
        <footer className="relative overflow-hidden bg-secondary border-t border-border mt-16">
            <div className="relative z-10 pt-16 pb-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
                        {/* Brand */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                                    <Cat className="w-5 h-5 text-primary-foreground" />
                                </div>
                                <h3 className="text-2xl font-bold text-foreground tracking-tight">CATWAALA</h3>
                            </div>
                            <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                                Non-Profit Animal Welfare Organization
                            </p>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Giving every street cat a chance at a warm lap and a full bowl. Join our mission to care for the purring population.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="font-bold mb-5 text-foreground text-sm uppercase tracking-wider">Quick Links</h4>
                            <ul className="space-y-3">
                                {[
                                    { href: "/adopt", label: "Adopt a Cat" },
                                    { href: "/report", label: "Report a Stray" },
                                    { href: "/volunteer", label: "Volunteer" },
                                    { href: "/find-vet", label: "Find a Vet" },
                                ].map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}

                            </ul>
                        </div>

                        {/* Resources */}
                        <div>
                            <h4 className="font-bold mb-5 text-foreground text-sm uppercase tracking-wider">Care Resources</h4>
                            <ul className="space-y-3">
                                {[
                                    { href: "/faq", label: "FAQ" },
                                    { href: "/quiz", label: "Cat Personality Quiz" },
                                    { href: "/memorial", label: "Memorial Wall" },
                                ].map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Connect */}
                        <div>
                            <h4 className="font-bold mb-5 text-foreground text-sm uppercase tracking-wider">Connect</h4>
                            <div className="flex flex-wrap gap-2.5 mb-5">
                                <a
                                    href="https://www.facebook.com/groups/catwaala/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2.5 bg-background border border-border rounded-xl text-muted-foreground hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] transition-all duration-300 shadow-sm"
                                    aria-label="Facebook"
                                >
                                    <Facebook className="w-5 h-5" />
                                </a>
                                <a
                                    href="https://www.instagram.com/catwaala/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2.5 bg-background border border-border rounded-xl text-muted-foreground hover:text-white hover:bg-[#E1306C] hover:border-[#E1306C] transition-all duration-300 shadow-sm"
                                    aria-label="Instagram"
                                >
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a
                                    href="https://www.youtube.com/@catwaala"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2.5 bg-background border border-border rounded-xl text-muted-foreground hover:text-white hover:bg-[#FF0000] hover:border-[#FF0000] transition-all duration-300 shadow-sm"
                                    aria-label="YouTube"
                                >
                                    <YoutubeIcon className="w-5 h-5" />
                                </a>
                                <a
                                    href="https://www.tiktok.com/@catwaala"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2.5 bg-background border border-border rounded-xl text-muted-foreground hover:text-white hover:bg-black dark:hover:bg-zinc-800 hover:border-black dark:hover:border-zinc-800 transition-all duration-300 shadow-sm"
                                    aria-label="TikTok"
                                >
                                    <TikTokIcon className="w-5 h-5" />
                                </a>
                            </div>
                            <div className="space-y-3 text-sm text-muted-foreground">
                                <a href="mailto:catwaala@gmail.com" className="flex items-center gap-3 hover:text-primary transition-colors">
                                    <Mail className="w-4 h-4 text-primary" />
                                    catwaala@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="pt-8 border-t border-border flex justify-center text-center text-sm text-muted-foreground">
                        <p>&copy; 2025 Catwaala. All rights reserved. Made with ❤️ and lots of tuna.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
