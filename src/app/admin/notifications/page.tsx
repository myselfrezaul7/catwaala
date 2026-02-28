"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, Bell, Trash, Send } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

type Notification = {
    id: string;
    title: string;
    message: string;
    type: "info" | "warning" | "success";
    created_at: string;
    created_by: string;
};

export default function AdminNotificationsPage() {
    const { user, userData, loading: authLoading } = useAuth();
    const router = useRouter();

    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ title: "", message: "", type: "info" as "info" | "warning" | "success" });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (!authLoading) {
            if (!user || (user.email !== "catwaala@gmail.com" && userData?.role !== "admin")) {
                router.push("/");
            }
        }
    }, [user, userData, authLoading, router]);

    const fetchNotifications = async () => {
        setLoading(true);
        try {
            const snap = await getDocs(collection(db, "notifications"));
            const data = snap.docs.map(d => ({ id: d.id, ...d.data() })) as Notification[];
            setNotifications(data.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()));
        } catch (error) {
            console.error("Error fetching notifications:", error);
            toast.error("Failed to load notifications");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user && (user.email === "catwaala@gmail.com" || userData?.role === "admin")) {
            fetchNotifications();
        }
    }, [user, userData]);

    const handleSend = async () => {
        if (!formData.title || !formData.message) {
            toast.error("Title and message are required");
            return;
        }
        setSubmitting(true);
        try {
            await addDoc(collection(db, "notifications"), {
                ...formData,
                created_at: new Date().toISOString(),
                created_by: user?.email || "admin",
            });
            toast.success("Notification broadcast sent!");
            setFormData({ title: "", message: "", type: "info" });
            setShowForm(false);
            fetchNotifications();
        } catch (error) {
            console.error("Error sending notification:", error);
            toast.error("Failed to send notification");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this notification?")) return;
        try {
            await deleteDoc(doc(db, "notifications", id));
            toast.success("Notification deleted");
            fetchNotifications();
        } catch {
            toast.error("Failed to delete");
        }
    };

    const typeStyles = {
        info: { bg: "bg-blue-100", text: "text-blue-700", dot: "bg-blue-500" },
        warning: { bg: "bg-amber-100", text: "text-amber-700", dot: "bg-amber-500" },
        success: { bg: "bg-emerald-100", text: "text-emerald-700", dot: "bg-emerald-500" },
    };

    if (authLoading || !user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen pt-28 pb-20 bg-stone-50/30 dark:bg-zinc-950">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="mb-6 flex items-center gap-4">
                    <Link href="/admin">
                        <Button variant="ghost" size="icon" className="rounded-full bg-white dark:bg-stone-900 shadow-sm border border-stone-100 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800">
                            <ArrowLeft className="w-5 h-5 text-stone-600 dark:text-stone-400" />
                        </Button>
                    </Link>
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold font-heading text-stone-800 dark:text-stone-100">Notifications</h1>
                        <p className="text-stone-500 dark:text-stone-400">Broadcast messages visible to all users.</p>
                    </div>
                    <Button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20"
                    >
                        <Send className="w-4 h-4 mr-2" /> New Broadcast
                    </Button>
                </div>

                {/* Compose Form */}
                {showForm && (
                    <div className="glass-card dark:bg-stone-900/60 dark:border-stone-800 p-8 rounded-[2.5rem] mb-6 animate-in slide-in-from-top-2 duration-300">
                        <h3 className="text-lg font-bold text-stone-800 dark:text-stone-100 mb-6">Compose Notification</h3>
                        <div className="space-y-4 mb-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-stone-700 dark:text-stone-300">Title *</label>
                                <input type="text" value={formData.title} onChange={e => setFormData(p => ({ ...p, title: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="e.g., Adoption Event This Saturday!" />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-stone-700 dark:text-stone-300">Message *</label>
                                <textarea value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} rows={3} className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none" placeholder="Write the notification body..." />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-stone-700 dark:text-stone-300">Type</label>
                                <div className="flex gap-3">
                                    {(["info", "warning", "success"] as const).map(t => (
                                        <button
                                            key={t}
                                            onClick={() => setFormData(p => ({ ...p, type: t }))}
                                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all capitalize ${formData.type === t
                                                ? `${typeStyles[t].bg} ${typeStyles[t].text} ring-2 ring-offset-1 ring-current`
                                                : "bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700"
                                                }`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3">
                            <Button variant="outline" onClick={() => setShowForm(false)} className="rounded-xl">Cancel</Button>
                            <Button onClick={handleSend} disabled={submitting} className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl">
                                {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />} Send Broadcast
                            </Button>
                        </div>
                    </div>
                )}

                {/* Notification List */}
                <div className="glass-card dark:bg-stone-900/60 dark:border-stone-800 p-8 rounded-[2.5rem]">
                    <h2 className="text-xl font-bold text-stone-800 dark:text-stone-100 flex items-center gap-2 mb-6">
                        <Bell className="w-5 h-5 text-blue-500" /> Sent Notifications ({notifications.length})
                    </h2>

                    {loading ? (
                        <div className="flex justify-center p-12">
                            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                        </div>
                    ) : notifications.length > 0 ? (
                        <div className="space-y-3">
                            {notifications.map(n => {
                                const style = typeStyles[n.type] || typeStyles.info;
                                return (
                                    <div key={n.id} className="p-5 rounded-2xl border border-blue-100/50 dark:border-stone-700 bg-white/60 dark:bg-stone-800/50 flex items-start gap-4 hover:bg-white/80 dark:hover:bg-stone-800/70 transition-all shadow-sm group">
                                        <div className={`w-3 h-3 rounded-full ${style.dot} shrink-0 mt-2`} />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-3 mb-1">
                                                <h3 className="font-bold text-stone-800 dark:text-stone-100">{n.title}</h3>
                                                <div className="flex items-center gap-2 shrink-0">
                                                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${style.bg} ${style.text}`}>{n.type}</span>
                                                    <Button size="icon" variant="ghost" className="text-rose-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleDelete(n.id)}>
                                                        <Trash className="w-3.5 h-3.5" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <p className="text-sm text-stone-500 dark:text-stone-400 mb-2">{n.message}</p>
                                            <p className="text-[11px] text-stone-400 dark:text-stone-500">
                                                {n.created_at ? formatDistanceToNow(new Date(n.created_at), { addSuffix: true }) : 'Recently'} · by {n.created_by}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center p-12 border-2 border-dashed border-blue-200/50 dark:border-stone-700 rounded-[2rem] bg-blue-50/20 dark:bg-blue-900/5">
                            <Bell className="w-12 h-12 text-stone-300 dark:text-stone-600 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-stone-700 dark:text-stone-300">No notifications sent yet</h3>
                            <p className="text-stone-500 dark:text-stone-400 mt-1">Click &quot;New Broadcast&quot; to send your first announcement.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
