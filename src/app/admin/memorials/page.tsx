"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { Button } from "@/components/ui/button";
import { Loader2, Heart, Trash, ArrowLeft } from "lucide-react";
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
    created_at: string;
};

export default function AdminMemorialsPage() {
    const { user, userData, loading: authLoading } = useAuth();
    const router = useRouter();

    const [memorials, setMemorials] = useState<Memorial[]>([]);
    const [loading, setLoading] = useState(true);

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
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-stone-800 dark:text-stone-100 flex items-center gap-2">
                            <Heart className="w-5 h-5 text-purple-500 fill-purple-500" /> All Memorials ({memorials.length})
                        </h2>
                    </div>

                    {loading ? (
                        <div className="flex justify-center p-12">
                            <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
                        </div>
                    ) : memorials.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {memorials.map((memorial) => (
                                <div key={memorial.id} className="p-6 rounded-3xl border bg-white/60 dark:bg-stone-800/50 border-stone-100 dark:border-stone-700 shadow-sm flex items-start gap-5 hover:bg-white/80 dark:hover:bg-stone-800/70 transition-all group">
                                    <div className="w-20 h-20 rounded-full bg-stone-100 dark:bg-stone-700 overflow-hidden shrink-0 relative border-2 border-white dark:border-stone-600 shadow-sm">
                                        {memorial.image_url ? (
                                            <Image src={memorial.image_url} alt={memorial.pet_name} fill className="object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-stone-300 dark:text-stone-500">
                                                <Heart className="w-8 h-8" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-3 mb-2">
                                            <h3 className="font-bold text-lg text-stone-800 dark:text-stone-100 truncate">{memorial.pet_name}</h3>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl h-9 w-9 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                                                onClick={() => handleDelete(memorial.id)}
                                            >
                                                <Trash className="w-4 h-4" />
                                            </Button>
                                        </div>
                                        <p className="text-stone-500 dark:text-stone-400 text-sm italic line-clamp-3 mb-2">
                                            &quot;{memorial.tribute}&quot;
                                        </p>
                                        <span className="text-[11px] text-stone-400 dark:text-stone-500 font-medium">
                                            {memorial.created_at ? formatDistanceToNow(new Date(memorial.created_at), { addSuffix: true }) : 'Recently'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center p-12 border-2 border-dashed border-purple-200/50 dark:border-stone-700 rounded-[2rem] bg-purple-50/20 dark:bg-purple-900/5">
                            <Heart className="w-12 h-12 text-stone-300 dark:text-stone-600 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-stone-700 dark:text-stone-300">No memorials found</h3>
                            <p className="text-stone-500 dark:text-stone-400 mt-1">There are no memorial submissions in the system yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
