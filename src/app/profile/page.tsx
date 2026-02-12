"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LogOut, User, Heart, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MemorialService } from "@/services/MemorialService";
import { ReportService } from "@/services/ReportService";
import { Memorial, Report } from "@/services/server-data";

export default function ProfilePage() {
    const { user, loading, signOut } = useAuth();
    const router = useRouter();
    const [tributes, setTributes] = useState<Memorial[]>([]);
    const [reports, setReports] = useState<Report[]>([]);

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        } else if (user) {
            // Fetch user data
            MemorialService.getByUserId(user.uid).then(setTributes);
            ReportService.getByUserId(user.uid).then(setReports);
        }
    }, [user, loading, router]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="glass-card rounded-2xl px-8 py-4 text-stone-500 font-medium animate-pulse">Loading...</div>
        </div>
    );
    if (!user) return null;

    return (
        <div className="min-h-screen pt-10 pb-20 px-4">
            <div className="container mx-auto max-w-2xl">
                <div className="glass-card rounded-[2rem] p-8 md:p-10">
                    <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                        {user.photoURL ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={user.photoURL}
                                alt={user.displayName || "User"}
                                className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-lg shadow-rose-100/40"
                            />
                        ) : (
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center border-4 border-white shadow-lg shadow-rose-100/40">
                                <User className="w-8 h-8 text-white" />
                            </div>
                        )}
                        <div className="text-center sm:text-left">
                            <h1 className="text-2xl font-bold text-stone-800">
                                {user.displayName || "Catwaala User"}
                            </h1>
                            <p className="text-stone-400">{user.email}</p>
                            <div className="mt-4 flex flex-col sm:flex-row gap-2">
                                <Button onClick={() => alert("Coming soon!")} variant="outline" className="rounded-xl border-rose-200 text-rose-600 hover:bg-rose-50/70">
                                    Edit Profile
                                </Button>
                                <Link href="/admin">
                                    <Button variant="outline" className="rounded-xl border-emerald-200 text-emerald-600 hover:bg-emerald-50/70">
                                        Admin Dashboard
                                    </Button>
                                </Link>
                                <Link href="/adopt">
                                    <Button className="rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 text-white hover:from-rose-600 hover:to-rose-700 shadow-md shadow-rose-500/15">
                                        Find a Cat
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 border-t border-amber-100/60 pt-8">
                        <Tabs defaultValue="tributes" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 rounded-xl bg-rose-50/50 p-1 mb-6">
                                <TabsTrigger value="tributes" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-rose-600 data-[state=active]:shadow-sm font-bold text-stone-500">
                                    My Tributes
                                </TabsTrigger>
                                <TabsTrigger value="reports" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-rose-600 data-[state=active]:shadow-sm font-bold text-stone-500">
                                    My Reports
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="tributes" className="space-y-4">
                                {tributes.length > 0 ? (
                                    <div className="grid gap-4">
                                        {tributes.map((t) => (
                                            <div key={t.id} className="bg-white/50 hover:bg-white transition-colors p-4 rounded-2xl flex items-center gap-4 border border-rose-100">
                                                {t.image_url ? (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img src={t.image_url} alt={t.pet_name} className="w-16 h-16 rounded-xl object-cover" />
                                                ) : (
                                                    <div className="w-16 h-16 rounded-xl bg-rose-100 flex items-center justify-center text-rose-400">
                                                        <Heart className="w-8 h-8" />
                                                    </div>
                                                )}
                                                <div>
                                                    <h3 className="font-bold text-stone-800">{t.pet_name}</h3>
                                                    <p className="text-sm text-stone-500 line-clamp-1">{t.tribute}</p>
                                                    <span className="text-xs text-rose-400 font-medium">{new Date(t.created_at).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-10 text-stone-400 bg-stone-50/50 rounded-2xl border-2 border-dashed border-stone-200">
                                        <p>No tributes added yet.</p>
                                    </div>
                                )}
                            </TabsContent>

                            <TabsContent value="reports" className="space-y-4">
                                {reports.length > 0 ? (
                                    <div className="grid gap-4">
                                        {reports.map((r) => (
                                            <div key={r.id} className="bg-white/50 hover:bg-white transition-colors p-4 rounded-2xl flex items-center gap-4 border border-amber-100">
                                                {r.image_url ? (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img src={r.image_url} alt={r.type} className="w-16 h-16 rounded-xl object-cover" />
                                                ) : (
                                                    <div className="w-16 h-16 rounded-xl bg-amber-100 flex items-center justify-center text-amber-500">
                                                        <AlertTriangle className="w-8 h-8" />
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${r.type === 'Injured' ? 'bg-red-100 text-red-600' :
                                                            r.type === 'Found' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                                                            }`}>
                                                            {r.type}
                                                        </span>
                                                        <span className="text-xs text-stone-400">{new Date(r.created_at).toLocaleDateString()}</span>
                                                    </div>
                                                    <h3 className="font-bold text-stone-800 mt-1 line-clamp-1">{r.location_text}</h3>
                                                    <p className="text-xs text-stone-500">Status: <span className="font-medium text-stone-700">{r.status || 'Open'}</span></p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-10 text-stone-400 bg-stone-50/50 rounded-2xl border-2 border-dashed border-stone-200">
                                        <p>No reports submitted yet.</p>
                                    </div>
                                )}
                            </TabsContent>
                        </Tabs>
                    </div>

                    <div className="border-t border-amber-100/60 pt-8 mt-8">
                        <h2 className="text-lg font-bold mb-4 text-stone-800">Account Settings</h2>
                        <Button
                            variant="destructive"
                            onClick={signOut}
                            className="flex items-center gap-2 rounded-xl"
                        >
                            <LogOut className="w-4 h-4" /> Sign Out
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
