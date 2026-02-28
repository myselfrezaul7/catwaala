"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, ScrollText, Search } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";

type AuditLog = {
    id: string;
    action: string;
    entity: string;
    entity_id?: string;
    performed_by: string;
    details?: string;
    created_at: string;
};

export default function AdminLogsPage() {
    const { user, userData, loading: authLoading } = useAuth();
    const router = useRouter();

    const [logs, setLogs] = useState<AuditLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (!authLoading) {
            if (!user || (user.email !== "catwaala@gmail.com" && userData?.role !== "admin")) {
                router.push("/");
            }
        }
    }, [user, userData, authLoading, router]);

    useEffect(() => {
        if (user && (user.email === "catwaala@gmail.com" || userData?.role === "admin")) {
            fetchLogs();
        }
    }, [user, userData]);

    const fetchLogs = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, "audit_logs"), orderBy("created_at", "desc"), limit(200));
            const snap = await getDocs(q);
            const data = snap.docs.map(d => ({ id: d.id, ...d.data() })) as AuditLog[];
            setLogs(data);
        } catch (error) {
            console.error("Error fetching logs:", error);
        } finally {
            setLoading(false);
        }
    };

    const actionColors: Record<string, string> = {
        create: "bg-emerald-100 text-emerald-700",
        update: "bg-blue-100 text-blue-700",
        delete: "bg-rose-100 text-rose-700",
        approve: "bg-emerald-100 text-emerald-700",
        reject: "bg-orange-100 text-orange-700",
    };

    if (authLoading || !user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen pt-28 pb-20 bg-stone-50/30 dark:bg-zinc-950">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="mb-6 flex items-center gap-4">
                    <Link href="/admin">
                        <Button variant="ghost" size="icon" className="rounded-full bg-white dark:bg-stone-900 shadow-sm border border-stone-100 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800">
                            <ArrowLeft className="w-5 h-5 text-stone-600 dark:text-stone-400" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold font-heading text-stone-800 dark:text-stone-100">Audit Logs</h1>
                        <p className="text-stone-500 dark:text-stone-400">Track admin actions across the system.</p>
                    </div>
                </div>

                <div className="glass-card dark:bg-stone-900/60 dark:border-stone-800 p-8 rounded-[2.5rem]">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <h2 className="text-xl font-bold text-stone-800 dark:text-stone-100 flex items-center gap-2">
                            <ScrollText className="w-5 h-5 text-violet-500" /> Recent Activity ({logs.length})
                        </h2>
                        <div className="relative w-full sm:w-auto">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                            <input
                                type="text"
                                placeholder="Filter logs..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="pl-9 pr-4 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 w-full sm:w-56"
                            />
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center p-12">
                            <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
                        </div>
                    ) : (() => {
                        const filtered = logs.filter(l => {
                            const q = searchQuery.toLowerCase();
                            return l.action.toLowerCase().includes(q) ||
                                l.entity.toLowerCase().includes(q) ||
                                l.performed_by.toLowerCase().includes(q) ||
                                (l.details || "").toLowerCase().includes(q);
                        });

                        return filtered.length > 0 ? (
                            <div className="space-y-2">
                                {filtered.map(log => {
                                    const colorClass = actionColors[log.action.toLowerCase()] || "bg-stone-100 text-stone-700";
                                    return (
                                        <div key={log.id} className="p-4 rounded-xl border border-stone-100 dark:border-stone-700 bg-white/60 dark:bg-stone-800/50 flex flex-col sm:flex-row items-start sm:items-center gap-3 hover:bg-white/80 dark:hover:bg-stone-800/70 transition-all text-sm">
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase shrink-0 ${colorClass}`}>
                                                {log.action}
                                            </span>
                                            <div className="flex-1 min-w-0">
                                                <span className="text-stone-600 dark:text-stone-300">
                                                    <span className="font-bold text-stone-800 dark:text-stone-100">{log.performed_by}</span>
                                                    {" "}{log.action.toLowerCase()}d{" "}
                                                    <span className="font-bold">{log.entity}</span>
                                                    {log.entity_id && <span className="text-stone-400"> ({log.entity_id.slice(0, 8)}...)</span>}
                                                </span>
                                                {log.details && <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">{log.details}</p>}
                                            </div>
                                            <span className="text-[11px] text-stone-400 dark:text-stone-500 font-medium whitespace-nowrap shrink-0">
                                                {log.created_at ? formatDistanceToNow(new Date(log.created_at), { addSuffix: true }) : "Recently"}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center p-12 border-2 border-dashed border-violet-200/50 dark:border-stone-700 rounded-[2rem] bg-violet-50/20 dark:bg-violet-900/5">
                                <ScrollText className="w-12 h-12 text-stone-300 dark:text-stone-600 mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-stone-700 dark:text-stone-300">{logs.length === 0 ? "No audit logs yet" : "No results found"}</h3>
                                <p className="text-stone-500 dark:text-stone-400 mt-1">
                                    {logs.length === 0 ? "Admin actions will be automatically logged here as they happen." : "Try adjusting your search."}
                                </p>
                            </div>
                        );
                    })()}
                </div>
            </div>
        </div>
    );
}
