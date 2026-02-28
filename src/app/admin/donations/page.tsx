"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, Plus, Trash, DollarSign, Search } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

type Donation = {
    id: string;
    donor_name: string;
    amount: number;
    method: string;
    transaction_id?: string;
    note?: string;
    status: "Confirmed" | "Pending";
    created_at: string;
};

export default function AdminDonationsPage() {
    const { user, userData, loading: authLoading } = useAuth();
    const router = useRouter();

    const [donations, setDonations] = useState<Donation[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [showForm, setShowForm] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        donor_name: "",
        amount: "",
        method: "bKash",
        transaction_id: "",
        note: "",
        status: "Confirmed" as "Confirmed" | "Pending",
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (!authLoading) {
            if (!user || (user.email !== "catwaala@gmail.com" && userData?.role !== "admin")) {
                router.push("/");
            }
        }
    }, [user, userData, authLoading, router]);

    const fetchDonations = async () => {
        setLoading(true);
        try {
            const snap = await getDocs(collection(db, "donations"));
            const data = snap.docs.map(d => ({ id: d.id, ...d.data() })) as Donation[];
            setDonations(data.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()));
        } catch (error) {
            console.error("Error fetching donations:", error);
            toast.error("Failed to load donations");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user && (user.email === "catwaala@gmail.com" || userData?.role === "admin")) {
            fetchDonations();
        }
    }, [user, userData]);

    const handleAdd = async () => {
        if (!formData.donor_name || !formData.amount) {
            toast.error("Donor name and amount are required");
            return;
        }
        setSubmitting(true);
        try {
            await addDoc(collection(db, "donations"), {
                donor_name: formData.donor_name,
                amount: parseFloat(formData.amount),
                method: formData.method,
                transaction_id: formData.transaction_id || null,
                note: formData.note || null,
                status: formData.status,
                created_at: new Date().toISOString(),
            });
            toast.success("Donation recorded!");
            setFormData({ donor_name: "", amount: "", method: "bKash", transaction_id: "", note: "", status: "Confirmed" });
            setShowForm(false);
            fetchDonations();
        } catch (error) {
            console.error("Error adding donation:", error);
            toast.error("Failed to record donation");
        } finally {
            setSubmitting(false);
        }
    };

    const toggleStatus = async (d: Donation) => {
        const newStatus = d.status === "Confirmed" ? "Pending" : "Confirmed";
        try {
            await updateDoc(doc(db, "donations", d.id), { status: newStatus });
            toast.success(`Marked as ${newStatus}`);
            fetchDonations();
        } catch {
            toast.error("Failed to update status");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this donation record?")) return;
        try {
            await deleteDoc(doc(db, "donations", id));
            toast.success("Donation deleted");
            fetchDonations();
        } catch {
            toast.error("Failed to delete");
        }
    };

    const totalConfirmed = donations
        .filter(d => d.status === "Confirmed")
        .reduce((sum, d) => sum + (d.amount || 0), 0);

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
                        <h1 className="text-3xl font-bold font-heading text-stone-800 dark:text-stone-100">Donation Tracking</h1>
                        <p className="text-stone-500 dark:text-stone-400">Record and manage incoming donations.</p>
                    </div>
                </div>

                {/* Summary Card */}
                <div className="glass-card dark:bg-stone-900/60 dark:border-stone-800 p-6 rounded-[2rem] mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                            <DollarSign className="w-7 h-7 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Total Confirmed</p>
                            <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">৳{totalConfirmed.toLocaleString()}</p>
                        </div>
                    </div>
                    <Button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20"
                    >
                        <Plus className="w-5 h-5 mr-2" /> Record Donation
                    </Button>
                </div>

                {/* Add Form */}
                {showForm && (
                    <div className="glass-card dark:bg-stone-900/60 dark:border-stone-800 p-8 rounded-[2.5rem] mb-6 animate-in slide-in-from-top-2 duration-300">
                        <h3 className="text-lg font-bold text-stone-800 dark:text-stone-100 mb-6">New Donation Entry</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-stone-700 dark:text-stone-300">Donor Name *</label>
                                <input type="text" value={formData.donor_name} onChange={e => setFormData(p => ({ ...p, donor_name: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" placeholder="Anonymous" />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-stone-700 dark:text-stone-300">Amount (৳) *</label>
                                <input type="number" value={formData.amount} onChange={e => setFormData(p => ({ ...p, amount: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" placeholder="500" />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-stone-700 dark:text-stone-300">Method</label>
                                <select value={formData.method} onChange={e => setFormData(p => ({ ...p, method: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 appearance-none cursor-pointer">
                                    <option value="bKash">bKash</option>
                                    <option value="Nagad">Nagad</option>
                                    <option value="Bank Transfer">Bank Transfer</option>
                                    <option value="Cash">Cash</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-stone-700 dark:text-stone-300">Transaction ID</label>
                                <input type="text" value={formData.transaction_id} onChange={e => setFormData(p => ({ ...p, transaction_id: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" placeholder="Optional" />
                            </div>
                        </div>
                        <div className="space-y-2 mb-6">
                            <label className="block text-sm font-bold text-stone-700 dark:text-stone-300">Note</label>
                            <input type="text" value={formData.note} onChange={e => setFormData(p => ({ ...p, note: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" placeholder="e.g., Medical fund" />
                        </div>
                        <div className="flex justify-end gap-3">
                            <Button variant="outline" onClick={() => setShowForm(false)} className="rounded-xl">Cancel</Button>
                            <Button onClick={handleAdd} disabled={submitting} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl">
                                {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null} Save
                            </Button>
                        </div>
                    </div>
                )}

                {/* Donations List */}
                <div className="glass-card dark:bg-stone-900/60 dark:border-stone-800 p-8 rounded-[2.5rem]">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <h2 className="text-xl font-bold text-stone-800 dark:text-stone-100 flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-emerald-500" /> All Donations ({donations.length})
                        </h2>
                        <div className="relative w-full sm:w-auto">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                            <input
                                type="text"
                                placeholder="Search donors..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="pl-9 pr-4 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 w-full sm:w-56"
                            />
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center p-12">
                            <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
                        </div>
                    ) : (() => {
                        const filtered = donations.filter(d =>
                            d.donor_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (d.transaction_id || "").toLowerCase().includes(searchQuery.toLowerCase())
                        );
                        return filtered.length > 0 ? (
                            <div className="space-y-3">
                                {filtered.map(d => (
                                    <div key={d.id} className="p-5 rounded-2xl border border-emerald-100/50 dark:border-stone-700 bg-white/60 dark:bg-stone-800/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-white/80 dark:hover:bg-stone-800/70 transition-all shadow-sm">
                                        <div className="space-y-1.5">
                                            <div className="flex items-center gap-3">
                                                <h3 className="font-bold text-stone-800 dark:text-stone-100 text-lg">{d.donor_name}</h3>
                                                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${d.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                                    {d.status}
                                                </span>
                                            </div>
                                            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">৳{d.amount?.toLocaleString()}</p>
                                            <p className="text-xs text-stone-400 dark:text-stone-500">
                                                {d.method}{d.transaction_id ? ` · ${d.transaction_id}` : ''}{d.note ? ` · ${d.note}` : ''}
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <span className="text-[11px] text-stone-400 dark:text-stone-500 font-medium">
                                                {d.created_at ? formatDistanceToNow(new Date(d.created_at), { addSuffix: true }) : 'Recently'}
                                            </span>
                                            <div className="flex gap-2">
                                                <Button size="sm" variant="outline" onClick={() => toggleStatus(d)} className="rounded-xl text-xs">
                                                    {d.status === 'Confirmed' ? 'Mark Pending' : 'Confirm'}
                                                </Button>
                                                <Button size="icon" variant="ghost" className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl h-8 w-8" onClick={() => handleDelete(d.id)}>
                                                    <Trash className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center p-12 border-2 border-dashed border-emerald-200/50 dark:border-stone-700 rounded-[2rem] bg-emerald-50/20 dark:bg-emerald-900/5">
                                <DollarSign className="w-12 h-12 text-stone-300 dark:text-stone-600 mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-stone-700 dark:text-stone-300">{donations.length === 0 ? "No donations recorded" : "No results found"}</h3>
                                <p className="text-stone-500 dark:text-stone-400 mt-1">{donations.length === 0 ? "Click 'Record Donation' to add the first entry." : "Try adjusting your search."}</p>
                            </div>
                        );
                    })()}
                </div>
            </div>
        </div>
    );
}
