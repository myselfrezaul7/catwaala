"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cat } from "@/data/cats";
import { VetClinic } from "@/data/vets";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash, LayoutDashboard, FileText, TrendingUp, AlertTriangle, Shield, MapPin, Users, Loader2, Cat as CatIcon } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { collection, getDocs, query, limit, orderBy } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import Link from "next/link";

// We will calculate chartData dynamically.

type Report = {
    id: string;
    type: string;
    description: string;
    location_text: string;
    created_at: number;
    user_id?: string;
};

export function AdminDashboard() {
    const { user, userData, loading: authLoading } = useAuth();
    const router = useRouter();

    const [stats, setStats] = useState({ cats: 0, reports: 0, users: 0, adoptions: 0 });
    const [recentReports, setRecentReports] = useState<Report[]>([]);
    const [chartDataState, setChartDataState] = useState<{ name: string, reports: number }[]>([]);
    const [dataLoading, setDataLoading] = useState(true);

    useEffect(() => {
        if (!authLoading) {
            if (!user) {
                router.push("/login");
            } else if (user.email !== "catwaala@gmail.com" && userData?.role !== "admin") {
                router.push("/");
            }
        }
    }, [user, userData, authLoading, router]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Fetch All Reports to build graph and list
                const reportsRef = collection(db, "reports");
                const snapshot = await getDocs(reportsRef);

                const reports = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Report[];

                const sortedReports = [...reports].sort((a, b) => (b.created_at || 0) - (a.created_at || 0));
                setRecentReports(sortedReports.slice(0, 5));

                // Process chart data (last 6 months)
                const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                const now = new Date();
                const last6Months = Array.from({ length: 6 }).map((_, i) => {
                    const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
                    return { monthIndex: d.getMonth(), year: d.getFullYear(), name: monthNames[d.getMonth()], reports: 0 };
                });

                reports.forEach(r => {
                    if (r.created_at) {
                        const d = new Date(r.created_at);
                        const match = last6Months.find(m => m.monthIndex === d.getMonth() && m.year === d.getFullYear());
                        if (match) match.reports++;
                    }
                });

                setChartDataState(last6Months.map(m => ({ name: m.name, reports: m.reports })));

                // Fetch other aggregates 
                const catsRef = collection(db, "cats");
                const catsSnap = await getDocs(catsRef);

                const usersRef = collection(db, "users");
                const usersSnap = await getDocs(usersRef);

                const adoptionsRef = collection(db, "adoptions");
                const adoptionsSnap = await getDocs(adoptionsRef);

                setStats({
                    cats: catsSnap.size || 0,
                    reports: snapshot.size || 0,
                    users: usersSnap.size || 0,
                    adoptions: adoptionsSnap.size || 0,
                });

            } catch (error) {
                console.error("Error fetching admin data:", error);
            } finally {
                setDataLoading(false);
            }
        };

        if (user && (user.email === "catwaala@gmail.com" || userData?.role === "admin")) {
            fetchDashboardData();
        }
    }, [user, userData]);

    if (authLoading || dataLoading) return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin mb-4 text-primary" />
            <div className="text-stone-500 font-medium animate-pulse">Loading secure dashboard...</div>
        </div>
    );
    if (!user || (user.email !== "catwaala@gmail.com" && userData?.role !== "admin")) return null;

    return (
        <div className="min-h-screen pt-28 pb-20 bg-stone-50/30 dark:bg-zinc-950">
            <div className="container mx-auto px-4">
                <div className="glass-card p-8 rounded-[2.5rem] mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold font-heading text-stone-800">Admin Dashboard</h1>
                            <p className="text-stone-500">Manage cats, vets, and content.</p>
                        </div>
                        <div className="flex gap-3">
                            <Button onClick={() => alert("Supabase connnection required for adding data.")} className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 rounded-xl shadow-lg shadow-emerald-500/20">
                                <Plus className="w-4 h-4" /> Add New
                            </Button>
                        </div>
                    </div>
                </div>

                {/* --- NEW DYNAMIC ANALYTICS SECTION --- */}
                <div className="mb-12 animate-in fade-in duration-500 slide-in-from-bottom-4">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="glass-card p-6 rounded-3xl border border-amber-100 shadow-sm">
                            <div className="flex flex-row items-center justify-between pb-2">
                                <h3 className="text-sm font-medium text-stone-600">Total Cats</h3>
                                <CatIcon className="h-4 w-4 text-stone-400" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-stone-800">{stats.cats}</div>
                                <p className="text-xs text-stone-500">Registered in system</p>
                            </div>
                        </div>
                        <div className="glass-card p-6 rounded-3xl border border-amber-100 shadow-sm">
                            <div className="flex flex-row items-center justify-between pb-2">
                                <h3 className="text-sm font-medium text-stone-600">Rescue Reports</h3>
                                <AlertTriangle className="h-4 w-4 text-orange-500" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-stone-800">{stats.reports}</div>
                                <p className="text-xs text-stone-500">Total reports filed</p>
                            </div>
                        </div>
                        <div className="glass-card p-6 rounded-3xl border border-amber-100 shadow-sm">
                            <div className="flex flex-row items-center justify-between pb-2">
                                <h3 className="text-sm font-medium text-stone-600">Active Users</h3>
                                <Users className="h-4 w-4 text-stone-400" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-stone-800">{stats.users}</div>
                                <p className="text-xs text-stone-500">Registered users</p>
                            </div>
                        </div>
                        <div className="glass-card p-6 rounded-3xl border border-primary/20 bg-primary/5 shadow-sm">
                            <div className="flex flex-row items-center justify-between pb-2">
                                <h3 className="text-sm font-medium text-primary">Applications</h3>
                                <FileText className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-primary">{stats.adoptions}</div>
                                <p className="text-xs text-primary/80">Pending/Total Adoptions</p>
                            </div>
                        </div>
                    </div>

                    {/* Charts & Recent Activity */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="glass-card p-6 rounded-3xl border border-amber-100 shadow-sm">
                            <h3 className="text-lg font-bold mb-4 text-stone-800">Report Trends</h3>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartDataState}>
                                        <CartesianGrid strokeDasharray="3 3" className="stroke-stone-200" vertical={false} />
                                        <XAxis dataKey="name" className="text-xs text-stone-500" axisLine={false} tickLine={false} />
                                        <YAxis className="text-xs text-stone-500" axisLine={false} tickLine={false} />
                                        <Tooltip
                                            cursor={{ fill: 'rgba(251, 146, 60, 0.1)' }}
                                            contentStyle={{ borderRadius: '12px', border: '1px solid #ffedd5', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                        />
                                        <Bar dataKey="reports" fill="#f97316" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="glass-card p-6 rounded-3xl border border-amber-100 shadow-sm">
                            <h3 className="text-lg font-bold mb-4 text-stone-800">Recent Reports</h3>
                            <div className="space-y-4">
                                {recentReports.length > 0 ? (
                                    recentReports.map((report) => (
                                        <div key={report.id} className="flex items-start justify-between p-4 bg-white/50 rounded-2xl border border-amber-50 transition-colors hover:bg-white/80">
                                            <div className="flex items-start gap-4">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0 ${report.type === 'Injured' ? 'bg-rose-100 text-rose-600' :
                                                    report.type === 'Lost' ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-600'
                                                    }`}>
                                                    <AlertTriangle className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <p className="font-bold text-sm text-stone-800">{report.type} Cat Reported</p>
                                                    </div>
                                                    <p className="text-xs text-stone-500 line-clamp-1 mt-1 max-w-[200px]">{report.description}</p>
                                                    <div className="flex items-center gap-1 mt-2 text-xs text-stone-400 font-medium">
                                                        <MapPin className="w-3 h-3" />
                                                        <span className="truncate max-w-[150px]">{report.location_text}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right flex-shrink-0">
                                                <p className="text-xs text-stone-500 font-medium bg-white px-2 py-1 rounded-lg border border-stone-100 shadow-sm">
                                                    {report.created_at ? formatDistanceToNow(new Date(report.created_at), { addSuffix: true }) : 'Recently'}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center p-8 bg-white/50 rounded-2xl border border-dashed border-stone-200 text-stone-500">
                                        No reports found.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {/* --- END DYNAMIC SECTION --- */}

                <div className="glass-card p-8 rounded-[2.5rem] mb-8">
                    <h2 className="text-2xl font-bold font-heading text-stone-800 mb-6">Database Management Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                        <Link href="/admin/cats" className="group">
                            <div className="glass-card p-6 rounded-3xl border border-amber-100 hover:border-rose-300 transition-all hover:shadow-md cursor-pointer h-full flex flex-col items-center justify-center text-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <CatIcon className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-stone-800">Manage Cats</h3>
                                    <p className="text-sm text-stone-500 mt-1">Add, edit, or remove cats from the system.</p>
                                </div>
                            </div>
                        </Link>

                        <Link href="/admin/applications" className="group">
                            <div className="glass-card p-6 rounded-3xl border border-amber-100 hover:border-emerald-300 transition-all hover:shadow-md cursor-pointer h-full flex flex-col items-center justify-center text-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <FileText className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-stone-800">Adoption Requests</h3>
                                    <p className="text-sm text-stone-500 mt-1">Review and approve incoming adoption forms.</p>
                                </div>
                            </div>
                        </Link>

                        <Link href="/admin/users" className="group">
                            <div className="glass-card p-6 rounded-3xl border border-amber-100 hover:border-blue-300 transition-all hover:shadow-md cursor-pointer h-full flex flex-col items-center justify-center text-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Users className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-stone-800">User Profiles</h3>
                                    <p className="text-sm text-stone-500 mt-1">Manage registered community members.</p>
                                </div>
                            </div>
                        </Link>

                        <Link href="/admin/reports" className="group">
                            <div className="glass-card p-6 rounded-3xl border border-amber-100 hover:border-orange-300 transition-all hover:shadow-md cursor-pointer h-full flex flex-col items-center justify-center text-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <AlertTriangle className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-stone-800">Rescue Reports</h3>
                                    <p className="text-sm text-stone-500 mt-1">Monitor submitted emergency reports.</p>
                                </div>
                            </div>
                        </Link>

                        <Link href="/admin/vets" className="group">
                            <div className="glass-card p-6 rounded-3xl border border-amber-100 hover:border-teal-300 transition-all hover:shadow-md cursor-pointer h-full flex flex-col items-center justify-center text-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-teal-50 text-teal-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <MapPin className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-stone-800">Veterinarians</h3>
                                    <p className="text-sm text-stone-500 mt-1">Update local vet directory listings.</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
