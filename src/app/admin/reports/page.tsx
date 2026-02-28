"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle, CheckCircle, Trash, MapPin, ArrowLeft, Filter } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

type Report = {
    id: string;
    type: string;
    description: string;
    location_text: string;
    created_at: number;
    status: string;
};

export default function AdminReportsPage() {
    const { user, userData, loading: authLoading } = useAuth();
    const router = useRouter();

    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState<"All" | "Pending" | "Resolved">("All");
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    useEffect(() => {
        if (!authLoading) {
            if (!user || (user.email !== "catwaala@gmail.com" && userData?.role !== "admin")) {
                router.push("/");
            }
        }
    }, [user, userData, authLoading, router]);

    const fetchReports = async () => {
        setLoading(true);
        try {
            const reportsRef = collection(db, "reports");
            const snapshot = await getDocs(reportsRef);
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Report[];
            setReports(data.sort((a, b) => (b.created_at || 0) - (a.created_at || 0)));
        } catch (error) {
            console.error("Error fetching reports:", error);
            toast.error("Failed to load reports");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user && (user.email === "catwaala@gmail.com" || userData?.role === "admin")) {
            fetchReports();
        }
    }, [user, userData]);

    const handleUpdateStatus = async (id: string, newStatus: string) => {
        try {
            await updateDoc(doc(db, "reports", id), { status: newStatus });
            toast.success(`Report marked as ${newStatus}`);
            fetchReports();
        } catch (error) {
            console.error("Error updating status:", error);
            toast.error("Failed to update status");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this report permanently?")) return;
        try {
            await deleteDoc(doc(db, "reports", id));
            toast.success("Report deleted");
            setSelectedIds(prev => { const next = new Set(prev); next.delete(id); return next; });
            fetchReports();
        } catch (error) {
            console.error("Error deleting:", error);
            toast.error("Failed to delete report");
        }
    };

    const handleBulkResolve = async () => {
        if (!confirm(`Resolve ${selectedIds.size} selected report(s)?`)) return;
        try {
            await Promise.all(Array.from(selectedIds).map(id => updateDoc(doc(db, "reports", id), { status: "Resolved" })));
            toast.success(`${selectedIds.size} reports resolved`);
            setSelectedIds(new Set());
            fetchReports();
        } catch {
            toast.error("Failed to bulk resolve");
        }
    };

    const handleBulkDelete = async () => {
        if (!confirm(`Permanently delete ${selectedIds.size} selected report(s)?`)) return;
        try {
            await Promise.all(Array.from(selectedIds).map(id => deleteDoc(doc(db, "reports", id))));
            toast.success(`${selectedIds.size} reports deleted`);
            setSelectedIds(new Set());
            fetchReports();
        } catch {
            toast.error("Failed to bulk delete");
        }
    };

    const toggleSelect = (id: string) => {
        setSelectedIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id); else next.add(id);
            return next;
        });
    };

    if (authLoading || !user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen pt-28 pb-20 bg-stone-50/30 dark:bg-zinc-950">
            <div className="container mx-auto px-4">
                <div className="mb-6 flex items-center gap-4">
                    <Link href="/admin">
                        <Button variant="ghost" size="icon" className="rounded-full bg-white shadow-sm border border-stone-100 hover:bg-stone-50">
                            <ArrowLeft className="w-5 h-5 text-stone-600" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold font-heading text-stone-800">Rescue Reports</h1>
                        <p className="text-stone-500">Monitor and manage incoming emergency reports from the community.</p>
                    </div>
                </div>

                <div className="glass-card p-8 rounded-[2.5rem] mb-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <h2 className="text-xl font-bold text-stone-800 flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-amber-500" /> Rescue Reports ({reports.length})
                        </h2>

                        <div className="flex bg-stone-100/50 p-1 rounded-xl w-full sm:w-auto">
                            {["All", "Pending", "Resolved"].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setFilterStatus(status as any)}
                                    className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${filterStatus === status
                                        ? "bg-white text-stone-800 shadow-sm"
                                        : "text-stone-500 hover:text-stone-700 hover:bg-stone-200/50 cursor-pointer"
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center p-12">
                            <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
                        </div>
                    ) : (() => {
                        const filteredReports = reports.filter(r => {
                            const isResolved = r.status === "Resolved";
                            if (filterStatus === "All") return true;
                            if (filterStatus === "Resolved") return isResolved;
                            if (filterStatus === "Pending") return !isResolved;
                            return true;
                        });

                        return filteredReports.length > 0 ? (
                            <div className="space-y-4">
                                {/* Select All */}
                                <label className="flex items-center gap-3 text-sm text-stone-500 font-medium cursor-pointer hover:text-stone-700 transition-colors">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 rounded border-stone-300 text-amber-500 focus:ring-amber-500/30 cursor-pointer"
                                        checked={filteredReports.every(r => selectedIds.has(r.id))}
                                        onChange={e => {
                                            if (e.target.checked) {
                                                setSelectedIds(new Set(filteredReports.map(r => r.id)));
                                            } else {
                                                setSelectedIds(new Set());
                                            }
                                        }}
                                    />
                                    Select all ({filteredReports.length})
                                </label>

                                {filteredReports.map((report) => (
                                    <div key={report.id} className={`p-6 rounded-3xl border ${report.status === 'Resolved' ? 'bg-white/40 border-stone-200 opacity-70' : 'bg-white/60 border-amber-50 shadow-sm'} flex gap-4 items-start hover:bg-white/80 transition-all`}>
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 rounded border-stone-300 text-amber-500 focus:ring-amber-500/30 mt-1 cursor-pointer shrink-0"
                                            checked={selectedIds.has(report.id)}
                                            onChange={() => toggleSelect(report.id)}
                                        />
                                        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center flex-1">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0 ${report.type === 'Injured' ? 'bg-rose-100 text-rose-600' :
                                                        report.type === 'Lost' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
                                                        }`}>
                                                        <AlertTriangle className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <h3 className="font-bold text-lg text-stone-800">{report.type} Cat</h3>
                                                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase shadow-sm ${report.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                                                                }`}>
                                                                {report.status || 'Pending'}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-1 text-xs text-stone-500 mt-0.5">
                                                            <MapPin className="w-3 h-3" />
                                                            <span>{report.location_text}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="text-sm bg-white/80 p-3 rounded-xl border border-stone-100 shadow-sm text-stone-700">
                                                    {report.description}
                                                </p>
                                            </div>
                                            <div className="flex flex-col md:items-end gap-3 w-full md:w-auto">
                                                <p className="text-[11px] text-stone-400 font-medium px-2 py-1 rounded-md bg-white border border-stone-100 shadow-sm self-start md:self-end">
                                                    {report.created_at ? formatDistanceToNow(new Date(report.created_at), { addSuffix: true }) : 'Recently'}
                                                </p>
                                                <div className="flex gap-2 justify-end">
                                                    {report.status !== 'Resolved' && (
                                                        <Button size="sm" variant="outline" className="text-emerald-600 border-emerald-200 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl" onClick={() => handleUpdateStatus(report.id, 'Resolved')}>
                                                            <CheckCircle className="w-4 h-4 mr-1.5" /> Mark Resolved
                                                        </Button>
                                                    )}
                                                    <Button size="icon" variant="ghost" className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl h-9 w-9" onClick={() => handleDelete(report.id)}>
                                                        <Trash className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center p-12 border-2 border-dashed border-amber-200/50 rounded-[2rem] bg-amber-50/20">
                                <AlertTriangle className="w-12 h-12 text-stone-300 mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-stone-700">{reports.length === 0 ? "No reports found" : "No results found"}</h3>
                                <p className="text-stone-500 mt-1">{reports.length === 0 ? "There are no rescue reports in the system." : "Try adjusting your filters."}</p>
                            </div>
                        );
                    })()}
                </div>

                {/* Batch Action Bar */}
                {selectedIds.size > 0 && (
                    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-stone-900 dark:bg-stone-800 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-4 z-50 animate-in slide-in-from-bottom-4 duration-300">
                        <span className="text-sm font-bold">{selectedIds.size} selected</span>
                        <div className="w-px h-6 bg-stone-700" />
                        <Button size="sm" variant="ghost" className="text-emerald-400 hover:text-emerald-300 hover:bg-stone-800 rounded-xl" onClick={handleBulkResolve}>
                            <CheckCircle className="w-4 h-4 mr-1.5" /> Resolve All
                        </Button>
                        <Button size="sm" variant="ghost" className="text-rose-400 hover:text-rose-300 hover:bg-stone-800 rounded-xl" onClick={handleBulkDelete}>
                            <Trash className="w-4 h-4 mr-1.5" /> Delete All
                        </Button>
                        <Button size="sm" variant="ghost" className="text-stone-400 hover:text-white hover:bg-stone-800 rounded-xl" onClick={() => setSelectedIds(new Set())}>
                            Cancel
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

