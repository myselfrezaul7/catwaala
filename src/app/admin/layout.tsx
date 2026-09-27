"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, userData, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push("/login");
            } else if (userData?.role !== "admin" && user.email !== "catwaala@gmail.com") {
                router.push("/");
            }
        }
    }, [user, userData, loading, router]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!user || (userData?.role !== "admin" && user.email !== "catwaala@gmail.com")) return null;

    return (
        <div className="min-h-screen bg-slate-50/50 dark:bg-zinc-950 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />
            
            <AdminSidebar />
            <main className="p-4 md:p-8 relative z-10">
                {children}
            </main>
        </div>
    );
}
