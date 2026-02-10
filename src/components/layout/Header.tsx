"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Heart, User, LogIn, Cat, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [scrolled, setScrolled] = useState(false);
    const { user, loading } = useAuth();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Adopt", href: "/adopt" },
        { name: "Find Vet", href: "/find-vet" },
        { name: "Report", href: "/report" },
        { name: "Dashboard", href: "/dashboard" },
    ];

    return (
        <>
            <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled
                ? "bg-white/70 backdrop-blur-2xl shadow-[0_2px_24px_rgba(180,160,130,0.10)] border-b border-amber-100/60"
                : "bg-white/50 backdrop-blur-xl border-b border-transparent"
                }`}>
                <div className="container mx-auto px-4 py-3.5 flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center shadow-lg shadow-rose-500/20 group-hover:shadow-rose-500/40 transition-all duration-300 group-hover:scale-105">
                            <Cat className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-stone-800 tracking-tight">
                            CATWAALA
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-stone-600 hover:text-rose-600 px-4 py-2 rounded-xl hover:bg-rose-50/60 transition-all duration-200"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="text-sm font-medium text-stone-600 hover:text-rose-600 px-4 py-2 rounded-xl hover:bg-rose-50/60 transition-all duration-200 flex items-center gap-1.5"
                        >
                            <Search className="w-4 h-4" /> Search
                        </button>
                    </nav>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-2">
                        <Link href="/dashboard">
                            <button className="p-2.5 text-stone-500 hover:text-rose-500 hover:bg-rose-50/60 rounded-xl transition-all duration-200">
                                <Heart className="w-5 h-5" />
                            </button>
                        </Link>

                        {!loading && (
                            user ? (
                                <Link href="/profile">
                                    <Button variant="ghost" size="sm" className="gap-2 rounded-xl text-stone-700 hover:bg-rose-50/60 h-10 px-3">
                                        {user.user_metadata.avatar_url ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={user.user_metadata.avatar_url} alt="User" className="w-7 h-7 rounded-lg object-cover" />
                                        ) : (
                                            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-rose-400 to-rose-500 flex items-center justify-center">
                                                <User className="w-4 h-4 text-white" />
                                            </div>
                                        )}
                                        <span className="max-w-[80px] truncate font-medium">{user.user_metadata.full_name?.split(' ')[0] || "User"}</span>
                                    </Button>
                                </Link>
                            ) : (
                                <Link href="/login">
                                    <Button size="sm" className="gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-md shadow-rose-500/20 hover:shadow-lg hover:shadow-rose-500/30 h-10 px-5 font-semibold transition-all duration-300">
                                        <LogIn className="w-4 h-4" /> Login
                                    </Button>
                                </Link>
                            )
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 text-stone-700 hover:bg-rose-50/60 rounded-xl transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-white/90 backdrop-blur-2xl border-b border-amber-100/50 shadow-xl p-5 flex flex-col gap-1.5 animate-fade-in-up">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-base font-medium p-3 hover:bg-rose-50/70 rounded-xl text-stone-700 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <button
                            onClick={() => { setIsSearchOpen(true); setIsMenuOpen(false); }}
                            className="text-base font-medium p-3 hover:bg-rose-50/70 rounded-xl text-left flex items-center gap-2 text-stone-700 transition-colors"
                        >
                            <Search className="w-5 h-5" /> Search
                        </button>
                        <div className="h-px bg-amber-100/60 my-2" />
                        {!loading && !user && (
                            <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                                <Button className="w-full mt-1 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 text-white h-12 font-semibold shadow-lg shadow-rose-500/20">
                                    Login
                                </Button>
                            </Link>
                        )}
                        {!loading && user && (
                            <Link href="/profile" onClick={() => setIsMenuOpen(false)}>
                                <Button variant="outline" className="w-full mt-1 rounded-xl h-12 border-rose-200 text-rose-600">
                                    My Profile
                                </Button>
                            </Link>
                        )}
                    </div>
                )}
            </header>

            {/* Full Screen Search Overlay */}
            {isSearchOpen && (
                <div className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-2xl flex flex-col items-center justify-start pt-32 animate-fade-in-up">
                    <button
                        onClick={() => setIsSearchOpen(false)}
                        className="absolute top-6 right-6 p-2.5 rounded-xl hover:bg-rose-50/60 transition-colors"
                    >
                        <X className="w-7 h-7 text-stone-400" />
                    </button>

                    <div className="w-full max-w-2xl px-4 text-center space-y-8">
                        <h2 className="text-3xl font-bold text-stone-800">What are you looking for?</h2>
                        <div className="relative">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-400 w-6 h-6" />
                            <input
                                type="text"
                                placeholder="Search for cats, vets, or volunteer..."
                                autoFocus
                                className="w-full pl-16 pr-6 py-6 text-xl rounded-2xl bg-amber-50/50 border-2 border-amber-100 focus:border-rose-400 focus:ring-0 outline-none transition-all shadow-xl text-stone-700 placeholder:text-stone-400"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-wrap justify-center gap-3 text-sm text-stone-500">
                            <span>Try searching for:</span>
                            <button className="text-rose-500 hover:underline font-medium">Urgent Adoptions</button>
                            <button className="text-rose-500 hover:underline font-medium">Vet in Dhaka</button>
                            <button className="text-rose-500 hover:underline font-medium">Volunteer</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
