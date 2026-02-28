"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { Button } from "@/components/ui/button";
import { Loader2, Heart, Trash, ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

type Memorial = {
    id: string;
    pet_name: string;
    tribute: string;
    image_url?: string;
    user_id?: string;
    status?: 'Pending' | 'Approved' | 'Rejected';
    created_at: string;
};

export default function AdminMemorialsPage() {
    const { user, userData, loading: authLoading } = useAuth();
    const router = useRouter();

    const [memorials, setMemorials] = useState<Memorial[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState<"All" | "Pending" | "Approved" | "Rejected">("All");

    useEffect(() => {
        if (!authLoading) {
            if (!user || (user.email !== "catwaala@gmail.com" && userData?.role !== "admin")) {
                router.push("/");
            }
        }
    }, [user, userData, authLoading, router]);

    const fetchMemorials = async () => {
        setLoading(true);
        try {
            const memorialsRef = collection(db, "memorials");
            const snapshot = await getDocs(memorialsRef);
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Memorial[];
            setMemorials(data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
        } catch (error) {
            console.error("Error fetching memorials:", error);
            toast.error("Failed to load memorials");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user && (user.email === "catwaala@gmail.com" || userData?.role === "admin")) {
            fetchMemorials();
        }
    }, [user, userData]);

    const handleUpdateStatus = async (id: string, newStatus: string) => {
        try {
            await updateDoc(doc(db, "memorials", id), { status: newStatus });
            toast.success(`Memorial marked as ${newStatus}`);
            fetchMemorials();
        } catch (error) {
            console.error("Error updating status:", error);
            toast.error("Failed to update status");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this memorial permanently? This cannot be undone.")) return;
        try {
            await deleteDoc(doc(db, "memorials", id));
            toast.success("Memorial deleted");
            fetchMemorials();
        } catch (error) {
            console.error("Error deleting:", error);
            toast.error("Failed to delete memorial");
        }
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
                        <h1 className="text-3xl font-bold font-heading text-stone-800 dark:text-stone-100">Memorial Wall</h1>
                        <p className="text-stone-500 dark:text-stone-400">Moderate community tributes and memorial submissions.</p>
                    </div>
                </div>

                <div className="glass-card dark:bg-stone-900/60 dark:border-stone-800 p-8 rounded-[2.5rem] mb-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <h2 className="text-xl font-bold text-stone-800 dark:text-stone-100 flex items-center gap-2">
                            <Heart className="w-5 h-5 text-purple-500 fill-purple-500" /> Memorials ({memorials.length})
                        </h2>

                        <div className="flex bg-stone-100/50 dark:bg-stone-800/50 p-1 rounded-xl w-full sm:w-auto">
                            {["All", "Pending", "Approved", "Rejected"].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setFilterStatus(status as any)}
                                    className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filterStatus === status
                                            ? "bg-white dark:bg-stone-700 text-stone-800 dark:text-white shadow-sm"
                                            : "text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200 hover:bg-stone-200/50 dark:hover:bg-stone-700/50 cursor-pointer"
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center p-12">
                            <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
                        </div>
                    ) : (() => {
                        const filteredMemorials = memorials.filter(m => {
                            const status = m.status || 'Approved'; // Legacy memorials without status are considered Approved
                            return filterStatus === "All" || status === filterStatus;
                        });

                        return filteredMemorials.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {filteredMemorials.map((memorial) => (
                                    <div key={memorial.id} className="p-6 rounded-3xl border bg-white/60 dark:bg-stone-800/50 border-stone-100 dark:border-stone-700 shadow-sm flex flex-col sm:flex-row items-start gap-5 hover:bg-white/80 dark:hover:bg-stone-800/70 transition-all group">
                                        <div className="w-20 h-20 rounded-full bg-stone-100 dark:bg-stone-700 overflow-hidden shrink-0 relative border-2 border-white dark:border-stone-600 shadow-sm">
                                            {memorial.image_url ? (
                                                <Image src={memorial.image_url} alt={memorial.pet_name} fill className="object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-stone-300 dark:text-stone-500">
                                                    <Heart className="w-8 h-8" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0 w-full">
                                            <div className="flex justify-between gap-3 mb-2">
                                                <div className="flex flex-col">
                                                    <h3 className="font-bold text-lg text-stone-800 dark:text-stone-100 truncate">{memorial.pet_name}</h3>
                                                    <span className={`text-[10px] w-fit px-2 py-0.5 mt-1 rounded-full font-bold uppercase shadow-sm ${!memorial.status || memorial.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
                                                            memorial.status === 'Rejected' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                                                        }`}>
                                                        {memorial.status || 'Approved'}
                                                    </span>
                                                </div>
                                                <span className="text-[11px] text-stone-400 dark:text-stone-500 font-medium whitespace-nowrap">
                                                    {memorial.created_at ? formatDistanceToNow(new Date(memorial.created_at), { addSuffix: true }) : 'Recently'}
                                                </span>
                                            </div>
                                            <p className="text-stone-500 dark:text-stone-400 text-sm italic line-clamp-3 mb-4 border-l-2 border-stone-200 dark:border-stone-700 pl-3">
                                                &quot;{memorial.tribute}&quot;
                                            </p>
                                            <div className="flex gap-2 justify-end flex-wrap mt-auto">
                                                {(!memorial.status || memorial.status !== 'Approved') && (
                                                    <Button size="sm" variant="outline" className="text-emerald-600 border-emerald-200 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-xl" onClick={() => handleUpdateStatus(memorial.id, 'Approved')}>
                                                        <CheckCircle className="w-4 h-4 mr-1.5" /> Approve
                                                    </Button>
                                                )}
                                                {memorial.status !== 'Rejected' && (
                                                    <Button size="sm" variant="outline" className="text-orange-600 border-orange-200 hover:text-orange-700 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-xl" onClick={() => handleUpdateStatus(memorial.id, 'Rejected')}>
                                                        <XCircle className="w-4 h-4 mr-1.5" /> Reject
                                                    </Button>
                                                )}
                                                <Button size="icon" variant="ghost" className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl h-9 w-9" onClick={() => handleDelete(memorial.id)}>
                                                    <Trash className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center p-12 border-2 border-dashed border-purple-200/50 dark:border-stone-700 rounded-[2rem] bg-purple-50/20 dark:bg-purple-900/5">
                                <Heart className="w-12 h-12 text-stone-300 dark:text-stone-600 mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-stone-700 dark:text-stone-300">{memorials.length === 0 ? "No memorials found" : "No results found"}</h3>
                                <p className="text-stone-500 dark:text-stone-400 mt-1">{memorials.length === 0 ? "There are no memorial submissions in the system yet." : "Try adjusting your filters."}</p>
                            </div>
                        );
                    })()}
                </div>
            </div>
        </div>
    );
}
