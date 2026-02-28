"use client";

import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, Save, BarChart3 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

type SiteContent = {
    catsTnr: number;
    adoptions: number;
    volunteers: number;
    missionTitle: string;
    missionDescription: string;
    ctaTitle: string;
    ctaDescription: string;
};

const DEFAULT_CONTENT: SiteContent = {
    catsTnr: 500,
    adoptions: 200,
    volunteers: 50,
    missionTitle: "Our Mission",
    missionDescription: "We are dedicated to improving the lives of street cats in Bangladesh through rescue, rehabilitation, and adoption programs.",
    ctaTitle: "Ready to Make a Difference?",
    ctaDescription: "Join our community of cat lovers and help us create a better world for stray cats in Bangladesh.",
};

export default function AdminContentPage() {
    const { user, userData, loading: authLoading } = useAuth();
    const router = useRouter();

    const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!authLoading) {
            if (!user || (user.email !== "catwaala@gmail.com" && userData?.role !== "admin")) {
                router.push("/");
            }
        }
    }, [user, userData, authLoading, router]);

    useEffect(() => {
        if (user && (user.email === "catwaala@gmail.com" || userData?.role === "admin")) {
            loadContent();
        }
    }, [user, userData]);

    const loadContent = async () => {
        setLoading(true);
        try {
            const docRef = doc(db, "site_config", "homepage");
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setContent({ ...DEFAULT_CONTENT, ...docSnap.data() } as SiteContent);
            }
        } catch (error) {
            console.error("Error loading content:", error);
            toast.error("Failed to load content");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await setDoc(doc(db, "site_config", "homepage"), content);
            toast.success("Homepage content updated successfully!");
        } catch (error) {
            console.error("Error saving content:", error);
            toast.error("Failed to save content");
        } finally {
            setSaving(false);
        }
    };

    const updateField = (field: keyof SiteContent, value: string | number) => {
        setContent(prev => ({ ...prev, [field]: value }));
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
                    <div>
                        <h1 className="text-3xl font-bold font-heading text-stone-800 dark:text-stone-100">Content Management</h1>
                        <p className="text-stone-500 dark:text-stone-400">Update homepage statistics and copy.</p>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center p-20">
                        <Loader2 className="w-8 h-8 animate-spin text-rose-500" />
                    </div>
                ) : (
                    <div className="space-y-8">
                        {/* Stats Section */}
                        <div className="glass-card dark:bg-stone-900/60 dark:border-stone-800 p-8 rounded-[2.5rem]">
                            <h2 className="text-xl font-bold text-stone-800 dark:text-stone-100 flex items-center gap-2 mb-6">
                                <BarChart3 className="w-5 h-5 text-rose-500" /> Homepage Statistics
                            </h2>
                            <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">These numbers are displayed on the homepage as impact counters.</p>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-stone-700 dark:text-stone-300">Cats TNR&apos;d</label>
                                    <input
                                        type="number"
                                        value={content.catsTnr}
                                        onChange={e => updateField("catsTnr", parseInt(e.target.value) || 0)}
                                        className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-lg font-bold"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-stone-700 dark:text-stone-300">Adoptions</label>
                                    <input
                                        type="number"
                                        value={content.adoptions}
                                        onChange={e => updateField("adoptions", parseInt(e.target.value) || 0)}
                                        className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-lg font-bold"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-stone-700 dark:text-stone-300">Volunteers</label>
                                    <input
                                        type="number"
                                        value={content.volunteers}
                                        onChange={e => updateField("volunteers", parseInt(e.target.value) || 0)}
                                        className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-lg font-bold"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Mission Section */}
                        <div className="glass-card dark:bg-stone-900/60 dark:border-stone-800 p-8 rounded-[2.5rem]">
                            <h2 className="text-xl font-bold text-stone-800 dark:text-stone-100 mb-6">Mission Section</h2>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-stone-700 dark:text-stone-300">Title</label>
                                    <input
                                        type="text"
                                        value={content.missionTitle}
                                        onChange={e => updateField("missionTitle", e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-stone-700 dark:text-stone-300">Description</label>
                                    <textarea
                                        value={content.missionDescription}
                                        onChange={e => updateField("missionDescription", e.target.value)}
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className="glass-card dark:bg-stone-900/60 dark:border-stone-800 p-8 rounded-[2.5rem]">
                            <h2 className="text-xl font-bold text-stone-800 dark:text-stone-100 mb-6">Call-to-Action Section</h2>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-stone-700 dark:text-stone-300">Title</label>
                                    <input
                                        type="text"
                                        value={content.ctaTitle}
                                        onChange={e => updateField("ctaTitle", e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-stone-700 dark:text-stone-300">Description</label>
                                    <textarea
                                        value={content.ctaDescription}
                                        onChange={e => updateField("ctaDescription", e.target.value)}
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Save Button */}
                        <div className="flex justify-end">
                            <Button
                                onClick={handleSave}
                                disabled={saving}
                                className="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold h-12 px-8 rounded-2xl shadow-lg shadow-rose-500/20 hover:shadow-xl transition-all"
                            >
                                {saving ? (
                                    <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Saving...</>
                                ) : (
                                    <><Save className="w-5 h-5 mr-2" /> Save Changes</>
                                )}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
