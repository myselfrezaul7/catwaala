"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
    Menu,
    X,
    Heart,
    User,
    LogIn,
    Search,
    MapPin,
    Users,
    HelpCircle,
    LayoutDashboard,
    Settings,
    ArrowUpRight,
    Cat,
    HandHeart,
    BookOpen,
    HelpCircle as QuestionIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { LanguageToggle } from "@/components/shared/LanguageToggle";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { MobileBottomNav } from "./MobileBottomNav";

const SEARCH_ROUTES = [
    { title: "Adopt a Cat", keywords: ["adopt", "foster", "get a cat", "kitten"], href: "/adopt", category: "Adoption", icon: Cat },
    { title: "Find a Vet", keywords: ["vet", "doctor", "hospital", "clinic", "medical"], href: "/find-vet", category: "Medical", icon: MapPin },
    { title: "Report a Stray", keywords: ["report", "injured", "stray", "found", "emergency"], href: "/report", category: "Rescue", icon: HandHeart },
    { title: "Volunteer with Us", keywords: ["volunteer", "help", "join"], href: "/volunteer", category: "Community", icon: Users },
    { title: "Make a Donation", keywords: ["donate", "money", "bkash", "nagad", "payment"], href: "/donate", category: "Support", icon: Heart },
    { title: "Cat Care Quiz", keywords: ["quiz", "match", "matchmaker", "personality", "test"], href: "/quiz", category: "Resources", icon: QuestionIcon },
    { title: "Community Resources", keywords: ["community", "resources", "events", "guide"], href: "/community", category: "Resources", icon: BookOpen },
    { title: "Cat Care FAQ", keywords: ["faq", "help", "questions", "answers"], href: "/faq", category: "Resources", icon: HelpCircle },
    { title: "Memorial Wall", keywords: ["memorial", "rainbow bridge", "died", "passed"], href: "/memorial", category: "Community", icon: Heart },
];

export function Header() {
    const router = useRouter();
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [scrolled, setScrolled] = useState(false);
    const [navVisible, setNavVisible] = useState(true);
    const lastScrollY = useRef(0);
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
    const searchInputRef = useRef<HTMLInputElement | null>(null);
    const { user, userData, loading } = useAuth();
    const { t } = useLanguage();

    // Derived filtered routes
    const filteredRoutes = SEARCH_ROUTES.filter(route => {
        if (!searchQuery.trim()) return false;
        const query = searchQuery.toLowerCase();
        return route.title.toLowerCase().includes(query) || route.keywords.some(k => k.includes(query));
    }).slice(0, 6);

    const handleRouteSelection = (href: string) => {
        setIsSearchOpen(false);
        setSearchQuery("");
        router.push(href);
    };

    // Handle Enter Key
    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (filteredRoutes.length > 0) {
                handleRouteSelection(filteredRoutes[0].href);
            }
        }
        if (e.key === 'Escape') {
            setIsSearchOpen(false);
            setSearchQuery("");
        }
    };

    // Global keyboard shortcut: Cmd+K / Ctrl+K
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                setIsSearchOpen(prev => !prev);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Focus input on search modal open
    useEffect(() => {
        if (isSearchOpen) {
            setTimeout(() => {
                searchInputRef.current?.focus();
            }, 100);
        }
    }, [isSearchOpen]);

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;
                    setScrolled(currentScrollY > 10);
        
                    // Auto-hide logic
                    if (currentScrollY <= 20) {
                        setNavVisible(true);
                    } else if (currentScrollY > lastScrollY.current && currentScrollY > 60) {
                        setNavVisible(false); // scrolling down
                    } else if (currentScrollY < lastScrollY.current) {
                        setNavVisible(true); // scrolling up
                    }
                    lastScrollY.current = currentScrollY;
        
                    // Show after scroll stops
                    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
                    scrollTimeout.current = setTimeout(() => {
                        setNavVisible(true);
                    }, 150);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        };
    }, []);

    const navLinks: { name: string, href: string, external?: boolean }[] = [
        { name: t.nav.home, href: "/" },
        { name: t.nav.adopt, href: "/adopt" },
        { name: t.nav.findVet, href: "/find-vet" },
        { name: t.nav.report, href: "/report" },
        { name: t.nav.community || "Community", href: "/community" },
        { name: "PetBhai Shop", href: "https://www.petbhai.com", external: true },
    ];

    // Conditionally add Admin link
    if (user?.email === "catwaala@gmail.com" || userData?.role === "admin") {
        navLinks.push({ name: "Admin", href: "/admin" });
    }

    return (
        <>
            <header className={`fixed top-4 left-0 right-0 z-50 mx-auto max-w-6xl w-[calc(100%-2rem)] transition-all duration-300 ease-out print:hidden ${scrolled
                ? "bg-white/80 dark:bg-zinc-900/80 shadow-[0_8px_32px_rgba(0,0,0,0.08)] border-border/60"
                : "bg-white/70 dark:bg-zinc-900/70 border-white/40 dark:border-zinc-800/60 shadow-lg"
                } ${navVisible ? "translate-y-0 opacity-100" : "-translate-y-[120%] opacity-0"} backdrop-blur-2xl border rounded-full`}>
                <div className="px-4 md:px-5 lg:px-6 py-2 flex justify-between items-center gap-2">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group shrink-0">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 overflow-hidden bg-background">
                            <Image src="/logo.png" alt="Catwaala Logo" width={36} height={36} className="object-contain" />
                        </div>
                        <span className="text-lg lg:text-xl font-bold text-foreground tracking-tight">
                            CATWAALA
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-0.5 lg:gap-1.5 shrink">
                        {navLinks.map((link) => {
                            const isActive = !link.external && (pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href)));
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                    className={`text-xs lg:text-sm px-2.5 lg:px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 shrink-0 ${
                                        isActive
                                            ? "font-semibold text-foreground bg-muted/80 shadow-sm"
                                            : "font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40"
                                    }`}
                                >
                                    <span>{link.name}</span>
                                    {link.external && <ArrowUpRight className="w-3.5 h-3.5 opacity-60 ml-0.5" />}
                                </Link>
                            );
                        })}
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="text-xs lg:text-sm font-medium text-muted-foreground hover:text-foreground px-2.5 lg:px-3 py-1.5 rounded-xl hover:bg-muted/40 transition-colors flex items-center gap-1.5 shrink-0"
                            aria-label="Search pages"
                        >
                            <Search className="w-3.5 h-3.5" />
                            <span>Search</span>
                            <kbd className="hidden lg:inline-flex items-center text-[10px] text-muted-foreground/80 bg-muted/60 px-1.5 py-0.5 rounded border border-border/50">⌘K</kbd>
                        </button>
                    </nav>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-1 lg:gap-2 shrink-0">
                        <LanguageToggle />
                        <ModeToggle />
                        <Link href="/dashboard" className="flex items-center">
                            <button className="w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-full transition-colors" aria-label="Favorites">
                                <Heart className="w-[18px] h-[18px]" />
                            </button>
                        </Link>

                        {!loading && (
                            user ? (
                                <Link href="/profile" className="flex items-center">
                                    <Button variant="ghost" size="sm" className="gap-1.5 rounded-full text-foreground hover:bg-muted/50 h-9 px-3">
                                        {user.photoURL ? (
                                            <Image
                                                src={user.photoURL}
                                                alt="User"
                                                width={24}
                                                height={24}
                                                className="rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                                                <User className="w-3.5 h-3.5 text-primary" />
                                            </div>
                                        )}
                                        <span className="max-w-[70px] lg:max-w-[90px] truncate text-xs font-medium">{user.displayName?.split(' ')[0] || "User"}</span>
                                    </Button>
                                </Link>
                            ) : (
                                <Link href="/login" className="flex items-center">
                                    <Button size="sm" className="gap-1.5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm h-9 px-3.5 text-xs font-semibold transition-all">
                                        <LogIn className="w-3.5 h-3.5" /> Login
                                    </Button>
                                </Link>
                            )
                        )}
                    </div>

                    {/* Mobile Menu & Icons */}
                    <div className="md:hidden flex items-center gap-1 ml-auto">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            aria-label="Open search"
                            className="p-2 text-foreground/80 hover:bg-muted/50 rounded-full transition-colors"
                        >
                            <Search className="w-5 h-5" />
                        </button>
                        <ModeToggle />
                    </div>
                </div>
            </header>

            <MobileBottomNav 
                isMenuOpen={isMenuOpen} 
                onMoreTap={() => setIsMenuOpen(!isMenuOpen)} 
            />

            {/* Mobile Menu Panel */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="md:hidden fixed inset-0 z-[55] bg-black/20 dark:bg-black/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 50, scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="md:hidden fixed bottom-24 pb-4 left-4 right-4 z-[60] bg-white/95 dark:bg-zinc-900/95 backdrop-blur-3xl border border-border/50 shadow-[0_0_40px_rgba(0,0,0,0.2)] rounded-[2rem] p-5 flex flex-col gap-4 overflow-hidden"
                        >
                            <button
                                onClick={() => { setIsSearchOpen(true); setIsMenuOpen(false); }}
                                className="w-full bg-muted/80 hover:bg-muted text-foreground/80 p-4 rounded-2xl flex items-center justify-between transition-colors border border-border/50"
                            >
                                <span className="font-medium">Search anything...</span>
                                <Search className="w-5 h-5 text-muted-foreground" />
                            </button>

                            <div className="space-y-4 overflow-y-auto max-h-[60vh] pb-2">
                                <div>
                                    <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 px-2">Explore</h4>
                                    <div className="space-y-1">
                                        {[
                                            { href: "/find-vet", icon: MapPin, label: "Find a Vet", color: "bg-teal-500/10 text-teal-600 dark:text-teal-400" },
                                            { href: "/community", icon: Users, label: "Community", color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400" },
                                            { href: "/faq", icon: HelpCircle, label: "FAQ & Guides", color: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
                                        ].map((item, idx) => (
                                            <motion.div
                                                key={item.href}
                                                initial={{ opacity: 0, x: -12 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.05 + idx * 0.05 }}
                                            >
                                                <Link href={item.href} onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-muted/50 transition-colors text-foreground font-medium">
                                                    <div className={`w-8 h-8 rounded-xl ${item.color} flex items-center justify-center`}><item.icon className="w-4 h-4" /></div>
                                                    {item.label}
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                <div className="h-px bg-border/50 w-full" />

                                <div>
                                    <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 px-2">Account</h4>
                                    <div className="space-y-1">
                                        {!loading && user && (
                                            <>
                                                <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-muted/50 transition-colors text-foreground font-medium">
                                                    <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center"><LayoutDashboard className="w-4 h-4" /></div>
                                                    Dashboard
                                                </Link>
                                                <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-muted/50 transition-colors text-foreground font-medium">
                                                    <div className="w-8 h-8 rounded-xl bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 flex items-center justify-center"><User className="w-4 h-4" /></div>
                                                    My Profile
                                                </Link>
                                                {(user?.email === "catwaala@gmail.com" || userData?.role === "admin") && (
                                                    <Link href="/admin" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-muted/50 transition-colors text-foreground font-medium">
                                                        <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center"><Settings className="w-4 h-4" /></div>
                                                        Admin Panel
                                                    </Link>
                                                )}
                                            </>
                                        )}
                                        {!loading && !user && (
                                            <Link href="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-muted/50 transition-colors text-foreground font-medium">
                                                <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center"><LogIn className="w-4 h-4" /></div>
                                                Login / Register
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between px-3 pt-4 border-t border-border/50">
                                <span className="text-muted-foreground font-bold text-[10px] uppercase tracking-widest">{t.nav.theme}</span>
                                <div className="flex items-center gap-2">
                                    <LanguageToggle />
                                    <ModeToggle />
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Spotlight Command Modal */}
            <AnimatePresence>
                {isSearchOpen && (
                    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 md:pt-28 px-4 overflow-y-auto">
                        {/* Backdrop with click to dismiss */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
                            className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-md"
                        />

                        {/* Centered Modal Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96, y: -8 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: -8 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                            className="relative w-full max-w-xl bg-background/95 dark:bg-zinc-900/95 backdrop-blur-2xl border border-border shadow-2xl rounded-3xl p-5 md:p-6 z-10"
                        >
                            {/* Search Input Bar */}
                            <div className="relative flex items-center">
                                <Search className="absolute left-4 w-5 h-5 text-muted-foreground pointer-events-none" />
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder="Search pages, cats, vets, or volunteer..."
                                    className="w-full pl-12 pr-20 py-3.5 text-base sm:text-lg rounded-2xl bg-muted/40 border border-border focus:border-primary/60 focus:bg-background outline-none transition-all shadow-inner text-foreground placeholder:text-muted-foreground"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={handleSearchKeyDown}
                                />
                                <div className="absolute right-3 flex items-center gap-1.5">
                                    <kbd className="hidden sm:inline-flex text-[10px] text-muted-foreground bg-muted px-2 py-1 rounded border border-border font-mono">ESC</kbd>
                                    <button
                                        onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
                                        aria-label="Close search"
                                        className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Results & Quick Actions */}
                            <div className="mt-5">
                                <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-3 px-1">
                                    {searchQuery.trim() ? "Matching Results" : "Quick Navigation"}
                                </p>

                                <div className="space-y-1 max-h-[50vh] overflow-y-auto">
                                    {(searchQuery.trim() ? filteredRoutes : SEARCH_ROUTES.slice(0, 5)).map((route) => {
                                        const Icon = route.icon;
                                        return (
                                            <button
                                                key={route.href}
                                                type="button"
                                                onClick={() => handleRouteSelection(route.href)}
                                                className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-muted/60 transition-colors flex items-center justify-between group cursor-pointer"
                                            >
                                                <div className="flex items-center gap-3 min-w-0">
                                                    <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                                        <Icon className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                                                        {route.title}
                                                    </span>
                                                </div>
                                                <span className="text-[11px] text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-md shrink-0">
                                                    {route.category}
                                                </span>
                                            </button>
                                        );
                                    })}

                                    {searchQuery.trim() && filteredRoutes.length === 0 && (
                                        <div className="text-center py-8 text-sm text-muted-foreground">
                                            No matching pages found for &ldquo;{searchQuery}&rdquo;.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
