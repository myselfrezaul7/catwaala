"use client";

import Link from "next/link";
import { Facebook, Instagram, Mail, Phone, Cat } from "lucide-react";

export function Footer() {
    return (
        <footer className="relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-50/50 to-rose-100/50 dark:from-transparent dark:via-zinc-900 dark:to-zinc-950" />

            <div className="relative z-10 pt-16 pb-8">
                <div className="container mx-auto px-4">
                    {/* Main footer content with glassmorphism */}
                    <div className="glass-card rounded-3xl p-8 md:p-12 mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                            {/* Brand */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Cat className="w-8 h-8 text-rose-500" />
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">CATWAALA</h3>
                                </div>
                                <p className="text-xs font-semibold text-rose-500 dark:text-rose-400">
                                    Non-Profit Animal Welfare Organization
                                </p>
                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                    Giving every street cat a chance at a warm lap and a full bowl. Join our mission to care for the purring population.
                                </p>
                            </div>

                            {/* Quick Links */}
                            <div>
                                <h4 className="font-bold mb-5 text-slate-900 dark:text-white text-sm uppercase tracking-wider">Quick Links</h4>
                                <ul className="space-y-3">
                                    {[
                                        { href: "/adopt", label: "Adopt a Cat" },
                                        { href: "/report", label: "Report a Stray" },
                                        { href: "/volunteer", label: "Volunteer" },
                                        { href: "/donate", label: "Donate" },
                                    ].map((link) => (
                                        <li key={link.href}>
                                            <Link href={link.href} className="text-sm text-slate-600 dark:text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors">
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                    <li>
                                        <Link
                                            href="https://www.kuttawaala.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors inline-flex items-center gap-1"
                                        >
                                            Visit Kuttawaala (Dogs) 🐕
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Resources */}
                            <div>
                                <h4 className="font-bold mb-5 text-slate-900 dark:text-white text-sm uppercase tracking-wider">Care Resources</h4>
                                <ul className="space-y-3">
                                    {[
                                        { href: "/faq", label: "FAQ" },
                                    ].map((link) => (
                                        <li key={link.href}>
                                            <Link href={link.href} className="text-sm text-slate-600 dark:text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors">
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Connect */}
                            <div>
                                <h4 className="font-bold mb-5 text-slate-900 dark:text-white text-sm uppercase tracking-wider">Connect</h4>
                                <div className="flex gap-3 mb-5">
                                    <a
                                        href="https://www.facebook.com/groups/catwaala/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 glass-card rounded-xl text-rose-500 hover:text-white hover:bg-[#1877F2] transition-all duration-300"
                                    >
                                        <Facebook className="w-5 h-5" />
                                    </a>
                                    <a
                                        href="https://www.instagram.com/catwaala/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 glass-card rounded-xl text-rose-500 hover:text-white hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
                                    >
                                        <Instagram className="w-5 h-5" />
                                    </a>
                                </div>
                                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                                    <a href="mailto:catwaala@gmail.com" className="flex items-center gap-3 hover:text-rose-500 transition-colors">
                                        <Mail className="w-4 h-4 text-rose-500" />
                                        catwaala@gmail.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="text-center text-sm text-slate-500 dark:text-slate-500">
                        <p>&copy; 2025 Catwaala. All rights reserved. Made with ❤️ and lots of tuna.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
