"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Heart, User, LogIn, Cat, Search, MapPin, Users, HelpCircle, LayoutDashboard, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { LanguageToggle } from "@/components/shared/LanguageToggle";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { MobileBottomNav } from "./MobileBottomNav";

import { useRouter } from "next/navigation";

const SEARCH_ROUTES = [
    { title: "Adopt a Cat", keywords: ["adopt", "foster", "get a cat", "kitten"], href: "/adopt" },
    { title: "Find a Vet", keywords: ["vet", "doctor", "hospital", "clinic", "medical"], href: "/find-vet" },
    { title: "Report a Stray", keywords: ["report", "injured", "stray", "found", "emergency"], href: "/report" },
    { title: "Volunteer with Us", keywords: ["volunteer", "help", "join"], href: "/volunteer" },
    { title: "Make a Donation", keywords: ["donate", "money", "bkash", "nagad", "payment"], href: "/donate" },
    { title: "Community Resources", keywords: ["community", "resources", "events"], href: "/community" },
    { title: "Cat Care FAQ", keywords: ["faq", "help", "questions", "answers"], href: "/faq" },
    { title: "Memorial Wall", passedWords: false, keywords: ["memorial", "rainbow bridge", "died", "passed"], href: "/memorial" },
];

export function Header() {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [scrolled, setScrolled] = useState(false);
    const { user, userData, loading } = useAuth();
    const { t } = useLanguage();

    // Derived filtered routes
    const filteredRoutes = SEARCH_ROUTES.filter(route => {
        if (!searchQuery.trim()) return false;
        const query = searchQuery.toLowerCase();
        return route.title.toLowerCase().includes(query) || route.keywords.some(k => k.includes(query));
    }).slice(0, 4); // Show top 4 max

    // Handle Enter Key
    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (filteredRoutes.length > 0) {
                handleRouteSelection(filteredRoutes[0].href);
            } else {
                // Default fallback if no match
                handleRouteSelection(`/adopt`);
            }
        }
        if (e.key === 'Escape') {
            setIsSearchOpen(false);
            setSearchQuery("");
        }
    };

    const handleRouteSelection = (href: string) => {
        setIsSearchOpen(false);
        setSearchQuery("");
        router.push(href);
    };

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
    if (user?.email === "catwaala@gmail.com" || userData?.role === "admin") {
        navLinks.push({ name: "Admin", href: "/admin" });
    }


    return (
        <>
            <header className={`fixed top-4 left-0 right-0 z-50 mx-auto max-w-6xl w-[calc(100%-2rem)] transition-all duration-500 ease-out print:hidden ${scrolled
                ? "bg-white/50 dark:bg-zinc-900/50 shadow-[0_8px_32px_rgba(0,0,0,0.08)] border-border/40 translate-y-0"
                : "bg-white/40 dark:bg-zinc-900/40 border-transparent translate-y-0 shadow-lg"
                } backdrop-blur-2xl border rounded-[100px]`}>
                <div className="px-4 md:px-6 py-2.5 flex justify-between items-center">
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
                    <div className="hidden md:flex items-center gap-2 ml-auto">


                        <LanguageToggle />
                        <ModeToggle />
                        <Link href="/dashboard" className="hidden lg:flex">
                            <button className="p-2 text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-full transition-colors">
                                <Heart className="w-[18px] h-[18px]" />
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

                    {/* Mobile Menu & Icons */}
                    <div className="md:hidden flex items-center gap-1 ml-auto">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="p-2 text-foreground/80 hover:bg-muted/50 rounded-full transition-colors"
                        >
                            <Search className="w-5 h-5" />
                        </button>
                        <ModeToggle />
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden absolute bottom-[calc(100%+12px)] left-0 w-full bg-background/95 backdrop-blur-2xl border border-border/50 shadow-2xl rounded-3xl p-5 flex flex-col gap-4 animate-in slide-in-from-bottom-4 fade-in duration-300 overflow-hidden origin-bottom">
                        
                        {/* Search Bar Trigger */}
                        <button
                            onClick={() => { setIsSearchOpen(true); setIsMenuOpen(false); }}
                            className="w-full bg-muted/50 hover:bg-muted text-foreground/80 p-3 rounded-xl flex items-center justify-between transition-colors border border-border/50"
                        >
                            <span className="font-medium">Search anything...</span>
                            <Search className="w-5 h-5 text-muted-foreground" />
                        </button>

                        <div className="space-y-4 overflow-y-auto max-h-[60vh] pb-2">
                            {/* Explore Group */}
                            <div>
                                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-2">Explore</h4>
                                <div className="space-y-1">
                                    <Link href="/find-vet" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors text-foreground font-medium">
                                        <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center"><MapPin className="w-4 h-4" /></div>
                                        Find a Vet
                                    </Link>
                                    <Link href="/community" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors text-foreground font-medium">
                                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center"><Users className="w-4 h-4" /></div>
                                        Community
                                    </Link>
                                    <Link href="/faq" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors text-foreground font-medium">
                                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center"><HelpCircle className="w-4 h-4" /></div>
                                        FAQ & Guides
                                    </Link>
                                </div>
                            </div>

                            <div className="h-px bg-border/50 w-full" />

                            {/* Account Group */}
                            <div>
                                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-2">Account</h4>
                                <div className="space-y-1">
                                    {!loading && user && (
                                        <>
                                            <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors text-foreground font-medium">
                                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center"><LayoutDashboard className="w-4 h-4" /></div>
                                                Dashboard
                                            </Link>
                                            <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors text-foreground font-medium">
                                                <div className="w-8 h-8 rounded-lg bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 flex items-center justify-center"><User className="w-4 h-4" /></div>
                                                My Profile
                                            </Link>
                                            {(user?.email === "catwaala@gmail.com" || userData?.role === "admin") && (
                                                <Link href="/admin" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors text-foreground font-medium">
                                                    <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center"><Settings className="w-4 h-4" /></div>
                                                    Admin Panel
                                                </Link>
                                            )}
                                        </>
                                    )}
                                    {!loading && !user && (
                                        <Link href="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors text-foreground font-medium">
                                            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center"><LogIn className="w-4 h-4" /></div>
                                            Login / Register
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Settings Bar */}
                        <div className="flex items-center justify-between px-3 pt-4 border-t border-border/50">
                            <span className="text-muted-foreground font-bold text-xs uppercase tracking-wider">{t.nav.theme}</span>
                            <div className="flex items-center gap-2">
                                <LanguageToggle />
                                <ModeToggle />
                            </div>
                        </div>
                    </div>
                )}
            </header>

            <MobileBottomNav 
                isMenuOpen={isMenuOpen} 
                onMoreTap={() => setIsMenuOpen(!isMenuOpen)} 
            />

            {/* Full Screen Search Overlay */}
            {
                isSearchOpen && (
                    <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-2xl flex flex-col items-center justify-start pt-32 animate-fade-in-up">
                        <button
                            onClick={() => { setIsSearchOpen(false); setSearchQuery("") }}
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
                                    onKeyDown={handleSearchKeyDown}
                                />
                            </div>

                            {/* Search Results / Suggestions */}
                            <div className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground w-full">
                                {searchQuery ? (
                                    <div className="flex flex-col sm:flex-row gap-4 w-full">
                                        <button
                                            onClick={() => {
                                                setIsSearchOpen(false);
                                                router.push(`/adopt?query=${encodeURIComponent(searchQuery)}`);
                                            }}
                                            className="flex-1 p-6 rounded-2xl bg-primary/10 hover:bg-primary/20 border border-primary/20 transition-all text-left flex items-start gap-4 group"
                                        >
                                            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                                🐈
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-foreground text-lg mb-1">Search Adoptions</h3>
                                                <p className="text-muted-foreground line-clamp-1">Find cats matching "{searchQuery}"</p>
                                            </div>
                                        </button>

                                        <button
                                            onClick={() => {
                                                setIsSearchOpen(false);
                                                router.push(`/find-vet?query=${encodeURIComponent(searchQuery)}`);
                                            }}
                                            className="flex-1 p-6 rounded-2xl bg-muted/40 hover:bg-muted/80 border border-border transition-all text-left flex items-start gap-4 group"
                                        >
                                            <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                                🏥
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-foreground text-lg mb-1">Search Vets</h3>
                                                <p className="text-muted-foreground line-clamp-1">Find clinics matching "{searchQuery}"</p>
                                            </div>
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <span>Try searching for:</span>
                                        <button onClick={() => { setIsSearchOpen(false); router.push('/adopt'); }} className="text-primary hover:underline font-medium">Urgent Adoptions</button>
                                        <button onClick={() => { setIsSearchOpen(false); router.push('/find-vet'); }} className="text-primary hover:underline font-medium">Vet in Dhaka</button>
                                        <button onClick={() => { setIsSearchOpen(false); router.push('/volunteer'); }} className="text-primary hover:underline font-medium">Volunteer</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
}
