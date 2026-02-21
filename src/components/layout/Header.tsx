"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Heart, User, LogIn, Cat, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { LanguageToggle } from "@/components/shared/LanguageToggle";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

import { useRouter } from "next/navigation";

export function Header() {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [scrolled, setScrolled] = useState(false);
    const { user, loading } = useAuth();
    const { t } = useLanguage();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: t.nav.home, href: "/" },
        { name: t.nav.adopt, href: "/adopt" },
        { name: t.nav.findVet, href: "/find-vet" },
        { name: t.nav.report, href: "/report" },
        { name: "Community", href: "/community" },
        { name: t.nav.dashboard, href: "/dashboard" },
    ];

    // Conditionally add Admin link
    if (user?.email === "catwaala@gmail.com") {
        navLinks.push({ name: "Admin", href: "/admin" });
    }


    return (
        <>
            <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
                ? "bg-background/80 backdrop-blur-2xl shadow-sm border-b border-border/40"
                : "bg-background/40 backdrop-blur-xl border-b border-transparent"
                }`}>
                <div className="container mx-auto px-4 py-3.5 flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 overflow-hidden bg-background">
                            <Image src="/logo.png" alt="Catwaala Logo" width={36} height={36} className="object-contain" />
                        </div>
                        <span className="text-xl font-bold text-foreground tracking-tight">
                            CATWAALA
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-muted-foreground hover:text-primary px-4 py-2 rounded-xl hover:bg-muted/50 transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="text-sm font-medium text-muted-foreground hover:text-primary px-4 py-2 rounded-xl hover:bg-muted/50 transition-colors flex items-center gap-1.5"
                        >
                            <Search className="w-4 h-4" /> Search
                        </button>
                    </nav>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-2">
                        <LanguageToggle />
                        <ModeToggle />
                        <Link href="/dashboard">
                            <button className="p-2.5 text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-xl transition-colors">
                                <Heart className="w-5 h-5" />
                            </button>
                        </Link>

                        {!loading && (
                            user ? (
                                <Link href="/profile">
                                    <Button variant="ghost" size="sm" className="gap-2 rounded-xl text-foreground hover:bg-muted/50 h-10 px-3">
                                        {user.photoURL ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <Image
                                                src={user.photoURL}
                                                alt="User"
                                                width={28}
                                                height={28}
                                                className="rounded-lg object-cover"
                                            />
                                        ) : (
                                            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                                                <User className="w-4 h-4 text-primary" />
                                            </div>
                                        )}
                                        <span className="max-w-[80px] truncate font-medium">{user.displayName?.split(' ')[0] || "User"}</span>
                                    </Button>
                                </Link>
                            ) : (
                                <Link href="/login">
                                    <Button size="sm" className="gap-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm h-10 px-5 font-semibold transition-all">
                                        <LogIn className="w-4 h-4" /> Login
                                    </Button>
                                </Link>
                            )
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 text-foreground/80 hover:bg-muted/50 rounded-xl transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-2xl border-b border-border shadow-xl p-5 flex flex-col gap-1.5 animate-fade-in-up">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-base font-medium p-3 hover:bg-muted/50 rounded-xl text-foreground/90 hover:text-primary transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <button
                            onClick={() => { setIsSearchOpen(true); setIsMenuOpen(false); }}
                            className="text-base font-medium p-3 hover:bg-muted/50 rounded-xl text-left flex items-center gap-2 text-foreground/90 hover:text-primary transition-colors"
                        >
                            <Search className="w-5 h-5" /> Search
                        </button>
                        <div className="h-px bg-border my-2" />
                        {!loading && !user && (
                            <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                                <Button className="w-full mt-1 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground h-12 font-semibold shadow-sm">
                                    Login
                                </Button>
                            </Link>
                        )}
                        {!loading && user && (
                            <Link href="/profile" onClick={() => setIsMenuOpen(false)}>
                                <Button variant="outline" className="w-full mt-1 rounded-xl h-12 border-border text-foreground hover:bg-muted/50">
                                    My Profile
                                </Button>
                            </Link>

                        )}
                        <div className="flex items-center justify-between px-3 py-2 mt-2 border-t border-border">
                            <span className="text-muted-foreground font-medium">{t.nav.theme}</span>
                            <div className="flex items-center gap-2">
                                <LanguageToggle />
                                <ModeToggle />
                            </div>
                        </div>
                    </div>
                )}
            </header >

            {/* Full Screen Search Overlay */}
            {
                isSearchOpen && (
                    <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-2xl flex flex-col items-center justify-start pt-32 animate-fade-in-up">
                        <button
                            onClick={() => setIsSearchOpen(false)}
                            className="absolute top-6 right-6 p-2.5 rounded-xl hover:bg-muted transition-colors"
                        >
                            <X className="w-7 h-7 text-muted-foreground" />
                        </button>

                        <div className="w-full max-w-2xl px-4 text-center space-y-8">
                            <h2 className="text-3xl font-bold text-foreground">What are you looking for?</h2>
                            <div className="relative">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground w-6 h-6" />
                                <input
                                    type="text"
                                    placeholder="Search for cats, vets, or volunteer..."
                                    autoFocus
                                    className="w-full pl-16 pr-6 py-6 text-xl rounded-2xl bg-muted/30 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm text-foreground placeholder:text-muted-foreground"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground">
                                <span>Try searching for:</span>
                                <button className="text-primary hover:underline font-medium">Urgent Adoptions</button>
                                <button className="text-primary hover:underline font-medium">Vet in Dhaka</button>
                                <button className="text-primary hover:underline font-medium">Volunteer</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
}
