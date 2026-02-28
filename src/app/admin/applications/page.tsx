"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { Button } from "@/components/ui/button";
import { Loader2, FileText, CheckCircle, XCircle, Trash, ArrowLeft, Mail, Search, Filter } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

type Application = {
    id: string;
    catId: string;
    catName: string;
    applicantName: string;
    applicantEmail: string;
    applicantPhone: string;
    status: "Pending" | "Approved" | "Rejected";
    created_at: number;
    experience: string;
};

export default function AdminApplicationsPage() {
    const { user, userData, loading: authLoading } = useAuth();
    const router = useRouter();

    const [applications, setApplications] = useState<Application[]>([]);
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

    const fetchApplications = async () => {
        setLoading(true);
        try {
            const appRef = collection(db, "adoptions");
            const snapshot = await getDocs(appRef);
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Application[];
            setApplications(data.sort((a, b) => (b.created_at || 0) - (a.created_at || 0)));
        } catch (error) {
            console.error("Error fetching applications:", error);
            toast.error("Failed to load applications");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user && (user.email === "catwaala@gmail.com" || userData?.role === "admin")) {
            fetchApplications();
        }
    }, [user, userData]);

    const handleUpdateStatus = async (id: string, newStatus: string, catId?: string) => {
        try {
            await updateDoc(doc(db, "adoptions", id), { status: newStatus });

            if (newStatus === 'Approved' && catId) {
                try {
                    await updateDoc(doc(db, "cats", catId), { tag: 'Adopted' });
                } catch (e) {
                    console.error("Failed to update cat status", e);
                }
            }

            toast.success(`Application marked as ${newStatus}`);
            fetchApplications();
        } catch (error) {
            console.error("Error updating status:", error);
            toast.error("Failed to update status");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this application log permanently?")) return;
        try {
            await deleteDoc(doc(db, "adoptions", id));
            toast.success("Application deleted");
            setSelectedIds(prev => { const next = new Set(prev); next.delete(id); return next; });
            fetchApplications();
        } catch (error) {
            console.error("Error deleting:", error);
            toast.error("Failed to delete application");
        }
    };

    const handleBulkStatus = async (status: 'Approved' | 'Rejected') => {
        if (!confirm(`${status === 'Approved' ? 'Approve' : 'Reject'} ${selectedIds.size} selected application(s)?`)) return;
        try {
            await Promise.all(Array.from(selectedIds).map(async (id) => {
                await updateDoc(doc(db, "adoptions", id), { status });
                if (status === 'Approved') {
                    const app = applications.find(a => a.id === id);
                    if (app?.catId) {
                        await updateDoc(doc(db, "cats", app.catId), { tag: 'Adopted' }).catch(e => console.error("Failed to update cat", e));
                    }
                }
            }));
            toast.success(`${selectedIds.size} applications ${status.toLowerCase()}`);
            setSelectedIds(new Set());
            fetchApplications();
        } catch {
            toast.error(`Failed to bulk ${status.toLowerCase()}`);
        }
    };

    const handleBulkDelete = async () => {
        if (!confirm(`Permanently delete ${selectedIds.size} selected application(s)?`)) return;
        try {
            await Promise.all(Array.from(selectedIds).map(id => deleteDoc(doc(db, "adoptions", id))));
            toast.success(`${selectedIds.size} applications deleted`);
            setSelectedIds(new Set());
            fetchApplications();
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
                        <h1 className="text-3xl font-bold font-heading text-stone-800">Adoption Applications</h1>
                        <p className="text-stone-500">Review and manage adoption requests from the community.</p>
                    </div>
                </div>

                <div className="glass-card p-8 rounded-[2.5rem] mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <h2 className="text-xl font-bold text-stone-800 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-emerald-600" /> Submitted Applications ({applications.length})
                        </h2>

                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                            <div className="relative">
                                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                                <input
                                    type="text"
                                    placeholder="Search names..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9 pr-4 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 w-full md:w-48"
                                />
                            </div>
                            <div className="flex bg-stone-100/50 p-1 rounded-xl">
                                {["All", "Pending", "Approved", "Rejected"].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setFilterStatus(status as any)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filterStatus === status
                                            ? "bg-white text-stone-800 shadow-sm"
                                            : "text-stone-500 hover:text-stone-700 hover:bg-stone-200/50 cursor-pointer"
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
                            <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
                        </div>
                    ) : (() => {
                        const filteredApps = applications.filter(app => {
                            const matchesSearch = app.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                (app.catName && app.catName.toLowerCase().includes(searchQuery.toLowerCase()));
                            const matchesFilter = filterStatus === "All" || (app.status || "Pending") === filterStatus;
                            return matchesSearch && matchesFilter;
                        });

                        return filteredApps.length > 0 ? (
                            <div className="space-y-4">
                                {/* Select All */}
                                <label className="flex items-center gap-3 text-sm text-stone-500 font-medium cursor-pointer hover:text-stone-700 transition-colors">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 rounded border-stone-300 text-emerald-500 focus:ring-emerald-500/30 cursor-pointer"
                                        checked={filteredApps.length > 0 && filteredApps.every(a => selectedIds.has(a.id))}
                                        onChange={e => {
                                            if (e.target.checked) {
                                                setSelectedIds(new Set(filteredApps.map(a => a.id)));
                                            } else {
                                                setSelectedIds(new Set());
                                            }
                                        }}
                                    />
                                    Select all ({filteredApps.length})
                                </label>

                                {filteredApps.map((app) => (
                                    <div key={app.id} className="p-6 rounded-3xl border border-amber-50 bg-white/60 flex gap-4 items-start hover:bg-white/80 transition-all shadow-sm">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 rounded border-stone-300 text-emerald-500 focus:ring-emerald-500/30 mt-1 cursor-pointer shrink-0"
                                            checked={selectedIds.has(app.id)}
                                            onChange={() => toggleSelect(app.id)}
                                        />
                                        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center flex-1">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-3">
                                                    <h3 className="font-bold text-lg text-stone-800">{app.applicantName}</h3>
                                                    <span className={`text-xs px-2.5 py-1 rounded-lg font-bold shadow-sm ${app.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
                                                        app.status === 'Rejected' ? 'bg-rose-100 text-rose-700' :
                                                            'bg-amber-100 text-amber-700'
                                                        }`}>
                                                        {app.status || 'Pending'}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-stone-500">Applied for: <span className="font-bold text-stone-700">{app.catName || 'Unknown Cat'}</span></p>
                                                <p className="text-xs text-stone-400">
                                                    {app.applicantEmail} • {app.applicantPhone}
                                                </p>
                                                <p className="text-xs text-stone-500 mt-2 bg-stone-50/50 p-2.5 rounded-xl border border-stone-100 inline-block shadow-sm">
                                                    Experience: {app.experience || 'Not provided'}
                                                </p>
                                            </div>
                                            <div className="flex flex-col md:items-end gap-3 w-full md:w-auto">
                                                <p className="text-[11px] text-stone-400 font-medium px-2 py-1 rounded-md bg-white border border-stone-100 shadow-sm self-start md:self-end">
                                                    {app.created_at ? formatDistanceToNow(new Date(app.created_at), { addSuffix: true }) : 'Recently'}
                                                </p>
                                                <div className="flex gap-2 flex-wrap justify-end">
                                                    <a href={`mailto:${app.applicantEmail}?subject=Regarding your adoption application for ${app.catName || 'the cat'}`}>
                                                        <Button size="sm" variant="outline" className="text-blue-600 border-blue-200 hover:text-blue-700 hover:bg-blue-50 rounded-xl">
                                                            <Mail className="w-4 h-4 mr-1.5" /> Email
                                                        </Button>
                                                    </a>
                                                    {app.status !== 'Approved' && (
                                                        <Button size="sm" variant="outline" className="text-emerald-600 border-emerald-200 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl" onClick={() => handleUpdateStatus(app.id, 'Approved', app.catId)}>
                                                            <CheckCircle className="w-4 h-4 mr-1.5" /> Approve
                                                        </Button>
                                                    )}
                                                    {app.status !== 'Rejected' && (
                                                        <Button size="sm" variant="outline" className="text-orange-600 border-orange-200 hover:text-orange-700 hover:bg-orange-50 rounded-xl" onClick={() => handleUpdateStatus(app.id, 'Rejected', app.catId)}>
                                                            <XCircle className="w-4 h-4 mr-1.5" /> Reject
                                                        </Button>
                                                    )}
                                                    <Button size="icon" variant="ghost" className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl h-9 w-9" onClick={() => handleDelete(app.id)}>
                                                        <Trash className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center p-12 border-2 border-dashed border-emerald-200/50 rounded-[2rem] bg-emerald-50/20">
                                <FileText className="w-12 h-12 text-stone-300 mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-stone-700">{applications.length === 0 ? "No applications yet" : "No results found"}</h3>
                                <p className="text-stone-500 mt-1">{applications.length === 0 ? "When users submit adoption forms, they will appear here." : "Try adjusting your search or filters."}</p>
                            </div>
                        );
                    })()}
                </div>

                {/* Batch Action Bar */}
                {selectedIds.size > 0 && (
                    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-stone-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-4 z-50 animate-in slide-in-from-bottom-4 duration-300">
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
