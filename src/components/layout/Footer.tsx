"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, ExternalLink } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-white dark:bg-zinc-900 border-t border-rose-100 dark:border-zinc-800 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-rose-600 dark:text-rose-400">🐱 CATWAALA</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                            Giving every street cat a chance at a warm lap and a full bowl. Join our mission to care for the purring population.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-slate-900 dark:text-slate-100">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            <li><Link href="/adopt" className="hover:text-rose-600">Adopt a Cat</Link></li>
                            <li><Link href="/report" className="hover:text-rose-600">Report a Stray</Link></li>
                            <li><Link href="/volunteer" className="hover:text-rose-600">Volunteer</Link></li>
                            <li><Link href="/donate" className="hover:text-rose-600">Donate</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-slate-900 dark:text-slate-100">Care Resources</h4>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            <li><Link href="/blog" className="hover:text-rose-600">Cat Care 101</Link></li>
                            <li><Link href="/tnr" className="hover:text-rose-600">TNR Program</Link></li>
                            <li><Link href="/faq" className="hover:text-rose-600">FAQ</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-slate-900 dark:text-slate-100">Connect</h4>
                        <div className="flex gap-4 mb-4">
                            <a href="#" className="p-2 bg-rose-50 dark:bg-zinc-800 rounded-full text-rose-600 hover:bg-rose-100 transition-colors"><Facebook className="w-5 h-5" /></a>
                            <a href="#" className="p-2 bg-rose-50 dark:bg-zinc-800 rounded-full text-rose-600 hover:bg-rose-100 transition-colors"><Instagram className="w-5 h-5" /></a>
                        </div>
                        <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            <p className="flex items-center gap-2"><Mail className="w-4 h-4" /> meow@catwaala.com</p>
                            <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> +880 1234 567890</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-100 dark:border-zinc-800 pt-8 text-center text-sm text-slate-500">
                    <p>&copy; 2025 Catwaala. All rights reserved. Made with ❤️ and lots of tuna.</p>
                </div>
            </div>
        </footer>
    );
}
