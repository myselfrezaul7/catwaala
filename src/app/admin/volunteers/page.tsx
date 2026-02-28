"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { Button } from "@/components/ui/button";
import { Loader2, Hand, CheckCircle, XCircle, Trash, ArrowLeft, Mail, Search } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

type Volunteer = {
    id: string;
    name: string;
    email: string;
    phone?: string;
    interest: string;
    message?: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    created_at: string;
};

export default function AdminVolunteersPage() {
    const { user, userData, loading: authLoading } = useAuth();
    const router = useRouter();

    const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState<"All" | "Pending" | "Approved" | "Rejected">("All");
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    useEffect(() => {
        if (!authLoading) {
            if (!user || (user.email !== "catwaala@gmail.com" && userData?.role !== "admin")) {
                router.push("/");
            }
        }
    }, [user, userData, authLoading, router]);

    const fetchVolunteers = async () => {
        setLoading(true);
        try {
            const volunteersRef = collection(db, "volunteers");
            const snapshot = await getDocs(volunteersRef);
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Volunteer[];
            setVolunteers(data.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()));
        } catch (error) {
            console.error("Error fetching volunteers:", error);
            toast.error("Failed to load volunteers");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user && (user.email === "catwaala@gmail.com" || userData?.role === "admin")) {
            fetchVolunteers();
        }
    }, [user, userData]);

    const handleUpdateStatus = async (id: string, newStatus: string) => {
        try {
            await updateDoc(doc(db, "volunteers", id), { status: newStatus });
            toast.success(`Volunteer marked as ${newStatus}`);
            fetchVolunteers();
        } catch (error) {
            console.error("Error updating status:", error);
            toast.error("Failed to update status");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this volunteer application permanently?")) return;
        try {
            await deleteDoc(doc(db, "volunteers", id));
            toast.success("Application deleted");
            setSelectedIds(prev => { const next = new Set(prev); next.delete(id); return next; });
            fetchVolunteers();
        } catch (error) {
            console.error("Error deleting:", error);
            toast.error("Failed to delete application");
        }
    };

    const handleBulkStatus = async (status: 'Approved' | 'Rejected') => {
        if (!confirm(`${status === 'Approved' ? 'Approve' : 'Reject'} ${selectedIds.size} selected application(s)?`)) return;
        try {
            await Promise.all(Array.from(selectedIds).map(id => updateDoc(doc(db, "volunteers", id), { status })));
            toast.success(`${selectedIds.size} applications ${status.toLowerCase()}`);
            setSelectedIds(new Set());
            fetchVolunteers();
        } catch {
            toast.error(`Failed to bulk ${status.toLowerCase()}`);
        }
    };

    const handleBulkDelete = async () => {
        if (!confirm(`Permanently delete ${selectedIds.size} selected application(s)?`)) return;
        try {
            await Promise.all(Array.from(selectedIds).map(id => deleteDoc(doc(db, "volunteers", id))));
            toast.success(`${selectedIds.size} applications deleted`);
            setSelectedIds(new Set());
            fetchVolunteers();
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
                        <Button variant="ghost" size="icon" className="rounded-full bg-white dark:bg-stone-900 shadow-sm border border-stone-100 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800">
                            <ArrowLeft className="w-5 h-5 text-stone-600 dark:text-stone-400" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold font-heading text-stone-800 dark:text-stone-100">Volunteer Management</h1>
                        <p className="text-stone-500 dark:text-stone-400">Review people who want to join the Rescue Squad.</p>
                    </div>
                </div>

                <div className="glass-card dark:bg-stone-900/60 dark:border-stone-800 p-8 rounded-[2.5rem] mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <h2 className="text-xl font-bold text-stone-800 dark:text-stone-100 flex items-center gap-2">
                            <Hand className="w-5 h-5 text-orange-500" /> Volunteer Applications ({volunteers.length})
                        </h2>

                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                            <div className="relative">
                                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                                <input
                                    type="text"
                                    placeholder="Search names or emails..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9 pr-4 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 w-full md:w-56"
                                />
                            </div>
                            <div className="flex bg-stone-100/50 dark:bg-stone-800/50 p-1 rounded-xl">
                                {["All", "Pending", "Approved", "Rejected"].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setFilterStatus(status as any)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filterStatus === status
                                            ? "bg-white dark:bg-stone-700 text-stone-800 dark:text-white shadow-sm"
                                            : "text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200 hover:bg-stone-200/50 dark:hover:bg-stone-700/50 cursor-pointer"
                                            }`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center p-12">
                            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
                        </div>
                    ) : (() => {
                        const filteredVols = volunteers.filter(v => {
                            const term = searchQuery.toLowerCase();
                            const matchSearch = v.name.toLowerCase().includes(term) || v.email.toLowerCase().includes(term);
                            const matchFilter = filterStatus === "All" || (v.status || "Pending") === filterStatus;
                            return matchSearch && matchFilter;
                        });

                        return filteredVols.length > 0 ? (
                            <div className="space-y-4">
                                {/* Select All */}
                                <label className="flex items-center gap-3 text-sm text-stone-500 font-medium cursor-pointer hover:text-stone-700 dark:hover:text-stone-300 transition-colors">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 rounded border-stone-300 dark:border-stone-600 text-orange-500 focus:ring-orange-500/30 cursor-pointer dark:bg-stone-800"
                                        checked={filteredVols.length > 0 && filteredVols.every(v => selectedIds.has(v.id))}
                                        onChange={e => {
                                            if (e.target.checked) {
                                                setSelectedIds(new Set(filteredVols.map(v => v.id)));
                                            } else {
                                                setSelectedIds(new Set());
                                            }
                                        }}
                                    />
                                    Select all ({filteredVols.length})
                                </label>

                                {filteredVols.map((v) => (
                                    <div key={v.id} className="p-6 rounded-3xl border border-orange-100/50 dark:border-stone-700 bg-white/60 dark:bg-stone-800/50 flex gap-4 items-start hover:bg-white/80 dark:hover:bg-stone-800/70 transition-all shadow-sm">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 rounded border-stone-300 dark:border-stone-600 text-orange-500 focus:ring-orange-500/30 mt-1 cursor-pointer shrink-0 dark:bg-stone-800"
                                            checked={selectedIds.has(v.id)}
                                            onChange={() => toggleSelect(v.id)}
                                        />
                                        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center flex-1">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-3">
                                                    <h3 className="font-bold text-lg text-stone-800 dark:text-stone-100">{v.name}</h3>
                                                    <span className={`text-xs px-2.5 py-1 rounded-lg font-bold shadow-sm ${v.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
                                                        v.status === 'Rejected' ? 'bg-rose-100 text-rose-700' :
                                                            'bg-orange-100 text-orange-700'
                                                        }`}>
                                                        {v.status || 'Pending'}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-stone-500 dark:text-stone-400">
                                                    Interest: <span className="font-bold text-stone-700 dark:text-stone-200">{v.interest}</span>
                                                </p>
                                                <p className="text-xs text-stone-400 dark:text-stone-500">
                                                    {v.email} {v.phone ? `• ${v.phone}` : ''}
                                                </p>
                                                {v.message && (
                                                    <div className="mt-2 bg-stone-50/50 dark:bg-stone-900/50 p-3 rounded-xl border border-stone-100 dark:border-stone-700 shadow-sm max-w-xl">
                                                        <p className="text-xs text-stone-600 dark:text-stone-400 italic">"{v.message}"</p>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex flex-col md:items-end gap-3 w-full md:w-auto h-full justify-between">
                                                <p className="text-[11px] text-stone-400 font-medium px-2 py-1 rounded-md bg-white border border-stone-100 dark:bg-stone-800 dark:border-stone-700 shadow-sm self-start md:self-end">
                                                    {v.created_at ? formatDistanceToNow(new Date(v.created_at), { addSuffix: true }) : 'Recently'}
                                                </p>
                                                <div className="flex gap-2 flex-wrap justify-end mt-auto">
                                                    <a href={`mailto:${v.email}?subject=Catwaala Rescue Squad Application`}>
                                                        <Button size="sm" variant="outline" className="text-blue-600 border-blue-200 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl">
                                                            <Mail className="w-4 h-4 mr-1.5" /> Email
                                                        </Button>
                                                    </a>
                                                    {v.status !== 'Approved' && (
                                                        <Button size="sm" variant="outline" className="text-emerald-600 border-emerald-200 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-xl" onClick={() => handleUpdateStatus(v.id, 'Approved')}>
                                                            <CheckCircle className="w-4 h-4 mr-1.5" /> Approve
                                                        </Button>
                                                    )}
                                                    {v.status !== 'Rejected' && (
                                                        <Button size="sm" variant="outline" className="text-orange-600 border-orange-200 hover:text-orange-700 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-xl" onClick={() => handleUpdateStatus(v.id, 'Rejected')}>
                                                            <XCircle className="w-4 h-4 mr-1.5" /> Reject
                                                        </Button>
                                                    )}
                                                    <Button size="icon" variant="ghost" className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl h-9 w-9" onClick={() => handleDelete(v.id)}>
                                                        <Trash className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center p-12 border-2 border-dashed border-orange-200/50 dark:border-stone-700 rounded-[2rem] bg-orange-50/20 dark:bg-orange-900/5">
                                <Hand className="w-12 h-12 text-stone-300 dark:text-stone-600 mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-stone-700 dark:text-stone-300">{volunteers.length === 0 ? "No volunteers yet" : "No results found"}</h3>
                                <p className="text-stone-500 dark:text-stone-400 mt-1">{volunteers.length === 0 ? "When users submit volunteer forms, they will appear here." : "Try adjusting your search or filters."}</p>
                            </div>
                        );
                    })()}
                </div>

                {/* Batch Action Bar */}
                {selectedIds.size > 0 && (
                    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-stone-900 dark:bg-stone-800 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-4 z-50 animate-in slide-in-from-bottom-4 duration-300">
                        <span className="text-sm font-bold">{selectedIds.size} selected</span>
                        <div className="w-px h-6 bg-stone-700" />
                        <Button size="sm" variant="ghost" className="text-emerald-400 hover:text-emerald-300 hover:bg-stone-800 rounded-xl" onClick={() => handleBulkStatus('Approved')}>
                            <CheckCircle className="w-4 h-4 mr-1.5" /> Approve
                        </Button>
                        <Button size="sm" variant="ghost" className="text-orange-400 hover:text-orange-300 hover:bg-stone-800 rounded-xl" onClick={() => handleBulkStatus('Rejected')}>
                            <XCircle className="w-4 h-4 mr-1.5" /> Reject
                        </Button>
                        <Button size="sm" variant="ghost" className="text-rose-400 hover:text-rose-300 hover:bg-stone-800 rounded-xl" onClick={handleBulkDelete}>
                            <Trash className="w-4 h-4 mr-1.5" /> Delete
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
