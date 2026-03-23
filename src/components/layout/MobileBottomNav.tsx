"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Cat, AlertTriangle, Heart, Menu } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

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
        { name: "Donate", href: "/donate", icon: Heart },
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
                            className="flex flex-col items-center justify-center w-14 h-12 relative group"
                        >
                            <div className={`absolute inset-0 rounded-xl transition-colors duration-300 ${isActive ? 'bg-primary/10' : 'group-hover:bg-muted/50'}`} />
                            <Icon className={`w-5 h-5 relative z-10 transition-colors duration-300 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                            <span className={`text-[10px] font-bold mt-1 uppercase tracking-wider relative z-10 transition-colors duration-300 ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                                {tab.name}
                            </span>
                        </Link>
                    )
                })}
                
                {/* More / Menu Tab */}
                <button
                    onClick={onMoreTap}
                    className="flex flex-col items-center justify-center w-14 h-12 relative group"
                >
                    <div className={`absolute inset-0 rounded-xl transition-colors duration-300 ${isMenuOpen ? 'bg-primary/10' : 'group-hover:bg-muted/50'}`} />
                    <Menu className={`w-5 h-5 relative z-10 transition-colors duration-300 ${isMenuOpen ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className={`text-[10px] font-bold mt-1 uppercase tracking-wider relative z-10 transition-colors duration-300 ${isMenuOpen ? 'text-primary' : 'text-muted-foreground'}`}>
                        More
                    </span>
                </button>
            </nav>
        </div>
    );
}
