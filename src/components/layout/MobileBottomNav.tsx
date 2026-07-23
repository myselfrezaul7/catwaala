"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Cat, AlertTriangle, Heart, Menu, X, ShoppingBag } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

interface MobileBottomNavProps {
    onMoreTap: () => void;
    isMenuOpen: boolean;
}

export function MobileBottomNav({ onMoreTap, isMenuOpen }: MobileBottomNavProps) {
    const pathname = usePathname();
    const { t } = useLanguage();

    const TABS = [
        { name: t.nav.home, href: "/", icon: Home },
        { name: t.nav.adopt, href: "/adopt", icon: Cat },
        { name: t.nav.report, href: "/report", icon: AlertTriangle },
        { name: "Shop", href: "https://www.petbhai.com", icon: ShoppingBag, external: true },
    ];

    return (
        <div className="md:hidden fixed bottom-4 left-4 right-4 z-50 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-2xl border border-border/30 rounded-[2rem] shadow-xl pb-safe print:hidden transition-all duration-300 transform translate-y-0">
            <nav className="flex justify-between items-center px-4 py-2.5">
                {TABS.map((tab) => {
                    const isActive = pathname === tab.href || (tab.href !== "/" && pathname?.startsWith(tab.href));
                    const Icon = tab.icon;
                    return (
                        <Link
                            key={tab.name}
                            href={tab.href}
                            {...(tab.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            className="flex flex-col items-center justify-center flex-1 h-12 relative group"
                        >
                            <div className={`absolute inset-0 rounded-xl transition-colors duration-300 ${isActive ? 'bg-primary/10' : 'group-hover:bg-muted/50'}`} />
                            <motion.div whileTap={{ scale: 0.85 }} className="flex flex-col items-center relative z-10 w-full h-full justify-center">
                                <Icon className={`w-5 h-5 transition-all duration-300 ${isActive ? 'text-primary scale-110' : 'text-muted-foreground'}`} />
                                <span className={`text-[10px] font-bold mt-1 uppercase tracking-wider transition-colors duration-300 ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                                    {tab.name}
                                </span>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTabCatwaala"
                                        className="absolute -bottom-0.5 w-5 h-1 rounded-full bg-primary"
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                            </motion.div>
                        </Link>
                    )
                })}
                
                {/* More / Menu Tab */}
                <button
                    onClick={onMoreTap}
                    className="flex flex-col items-center justify-center flex-1 h-12 relative group"
                >
                    <div className={`absolute inset-0 rounded-xl transition-colors duration-300 ${isMenuOpen ? 'bg-primary/20' : 'group-hover:bg-muted/50'}`} />
                    <motion.div whileTap={{ scale: 0.85 }} className="flex flex-col items-center relative z-10 w-full h-full justify-center">
                        {isMenuOpen ? (
                            <X className={`w-5 h-5 transition-colors duration-300 ${isMenuOpen ? 'text-primary' : 'text-muted-foreground'}`} />
                        ) : (
                            <Menu className={`w-5 h-5 transition-colors duration-300 ${isMenuOpen ? 'text-primary' : 'text-muted-foreground'}`} />
                        )}
                        <span className={`text-[10px] font-bold mt-1 uppercase tracking-wider transition-colors duration-300 ${isMenuOpen ? 'text-primary' : 'text-muted-foreground'}`}>
                            More
                        </span>
                    </motion.div>
                </button>
            </nav>
        </div>
    );
}
