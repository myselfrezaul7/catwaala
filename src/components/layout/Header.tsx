"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon, Heart, User, LogIn, Cat, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Adopt", href: "/adopt" },
        { name: "Find Vet", href: "/find-vet" },
        { name: "Report", href: "/report" },
        { name: "Dashboard", href: "/dashboard" },
    ];

    return (
        <>
            <header className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-rose-100 dark:border-zinc-800 transition-all duration-300">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <Cat className="w-8 h-8 text-rose-600 dark:text-rose-400 transition-transform group-hover:rotate-12" />
                        <span className="text-2xl font-bold font-sans text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                            CATWAALA
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-rose-600 dark:hover:text-rose-400 transition-colors flex items-center gap-2"
                        >
                            <Search className="w-4 h-4" /> Search
                        </button>
                    </nav>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <button className="p-2 text-slate-600 dark:text-slate-300 hover:text-rose-500 transition-colors">
                            <Heart className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 text-slate-600 dark:text-slate-300 hover:text-rose-500 transition-colors"
                        >
                            {mounted && theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                        <Link href="/login">
                            <Button variant="outline" size="sm" className="gap-2 rounded-full border-rose-200 text-rose-600 hover:text-rose-700 hover:bg-rose-50">
                                <LogIn className="w-4 h-4" /> Login
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 text-slate-700 dark:text-slate-200"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-zinc-900 border-b border-border shadow-lg p-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-lg font-medium p-2 hover:bg-rose-50 dark:hover:bg-zinc-800 rounded-lg"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <button
                            onClick={() => { setIsSearchOpen(true); setIsMenuOpen(false); }}
                            className="text-lg font-medium p-2 hover:bg-rose-50 dark:hover:bg-zinc-800 rounded-lg text-left flex items-center gap-2"
                        >
                            <Search className="w-5 h-5" /> Search
                        </button>
                        <div className="h-px bg-border my-2" />
                        <div className="flex justify-between items-center px-2">
                            <span className="text-sm font-medium">Theme</span>
                            <button
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="p-2 bg-slate-100 dark:bg-zinc-800 rounded-full"
                            >
                                {mounted && theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                            </button>
                        </div>
                        <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                            <Button className="w-full mt-2">Login</Button>
                        </Link>
                    </div>
                )}
            </header>

            {/* Full Screen Search Overlay */}
            {isSearchOpen && (
                <div className="fixed inset-0 z-[100] bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl flex flex-col items-center justify-start pt-32 animate-in fade-in duration-200">
                    <button
                        onClick={() => setIsSearchOpen(false)}
                        className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                        <X className="w-8 h-8 text-slate-500" />
                    </button>

                    <div className="w-full max-w-2xl px-4 text-center space-y-8">
                        <h2 className="text-3xl font-bold font-heading text-slate-900 dark:text-white">What are you looking for?</h2>
                        <div className="relative">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6" />
                            <input
                                type="text"
                                placeholder="Search for cats, vets, or volunteer..."
                                autoFocus
                                className="w-full pl-16 pr-6 py-6 text-xl rounded-2xl bg-slate-50 dark:bg-zinc-900 border-2 border-slate-100 dark:border-zinc-800 focus:border-rose-500 focus:ring-0 outline-none transition-all shadow-xl"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-wrap justify-center gap-3 text-sm text-slate-500">
                            <span>Try searching for:</span>
                            <button className="text-rose-600 hover:underline">Urgent Adoptions</button>
                            <button className="text-rose-600 hover:underline">Vet in Dhaka</button>
                            <button className="text-rose-600 hover:underline">Volunteer</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
