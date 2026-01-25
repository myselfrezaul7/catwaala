"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon, Heart, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Adopt", href: "/adopt" },
        { name: "Find Vet", href: "/find-vet" },
        { name: "Report", href: "/report" },
        { name: "Dashboard", href: "/dashboard" },
        { name: "Resources", href: "/resources" },
    ];

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-rose-100 dark:border-zinc-800 transition-all duration-300">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <span className="text-2xl font-bold font-sans text-rose-600 dark:text-rose-400 group-hover:scale-105 transition-transform">
                        🐱 CATWAALA
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
    );
}
