"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
    LayoutDashboard, 
    Cat, 
    FileText, 
    Users, 
    AlertTriangle, 
    MapPin, 
    Heart, 
    Hand, 
    BarChart3, 
    DollarSign, 
    Bell, 
    ScrollText,
    ArrowLeft,
    Menu,
    X,
    Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";

const ADMIN_NAV_ITEMS = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Manage Cats", href: "/admin/cats", icon: Cat },
    { label: "Adoption Requests", href: "/admin/applications", icon: FileText },
    { label: "User Profiles", href: "/admin/users", icon: Users },
    { label: "Rescue Reports", href: "/admin/reports", icon: AlertTriangle },
    { label: "Veterinarians", href: "/admin/vets", icon: MapPin },
    { label: "Memorial Wall", href: "/admin/memorials", icon: Heart },
    { label: "Volunteers", href: "/admin/volunteers", icon: Hand },
    { label: "Site Content", href: "/admin/content", icon: BarChart3 },
    { label: "Donations", href: "/admin/donations", icon: DollarSign },
    { label: "Notifications", href: "/admin/notifications", icon: Bell },
    { label: "Audit Logs", href: "/admin/logs", icon: ScrollText },
];

export function AdminSidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // Close on route change
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Prevent body scrolling when mobile drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <>
            {/* Mobile Menu Toggle Button */}
            <div className="md:hidden fixed top-20 right-4 z-40 print:hidden">
                <Button
                    onClick={() => setIsOpen(!isOpen)}
                    size="sm"
                    className="bg-zinc-900/90 dark:bg-zinc-800/90 hover:bg-zinc-800 text-white rounded-full shadow-lg border border-zinc-700/50 flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold backdrop-blur-md transition-all active:scale-95"
                    aria-label="Toggle admin navigation menu"
                >
                    {isOpen ? <X className="w-4 h-4 text-rose-400" /> : <Menu className="w-4 h-4 text-amber-400" />}
                    <span>Admin Menu</span>
                </Button>
            </div>

            {/* Mobile Backdrop & Slide-out Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Slide-out Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
                            aria-hidden="true"
                        />

                        {/* Slide-out Drawer */}
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 26, stiffness: 280 }}
                            className="fixed top-0 bottom-0 left-0 z-50 w-72 max-w-[85vw] bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col md:hidden overflow-hidden"
                            aria-label="Admin navigation drawer"
                        >
                            {/* Drawer Header */}
                            <div className="p-5 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                        <Shield className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h2 className="font-bold text-sm text-foreground">Catwaala Admin</h2>
                                        <p className="text-[11px] text-muted-foreground">Management Panel</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-8 h-8 rounded-full hover:bg-muted/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                                    aria-label="Close admin menu"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Drawer Navigation Links */}
                            <nav className="flex-1 overflow-y-auto p-3 space-y-1">
                                {ADMIN_NAV_ITEMS.map((item) => {
                                    const isActive = pathname === item.href;
                                    const Icon = item.icon;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                                                isActive
                                                    ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20 font-semibold"
                                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                                            }`}
                                        >
                                            <Icon className={`w-4 h-4 ${isActive ? "text-primary-foreground" : "text-muted-foreground"}`} />
                                            <span>{item.label}</span>
                                        </Link>
                                    );
                                })}
                            </nav>

                            {/* Drawer Footer */}
                            <div className="p-3 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
                                <Link
                                    href="/"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    <span>Back to Main Site</span>
                                </Link>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
