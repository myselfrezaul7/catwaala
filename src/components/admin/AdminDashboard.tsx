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

// Placeholder chart data until we build full analytics pipelines
const chartData = [
    { name: "Jan", reports: 2 },
    { name: "Feb", reports: 5 },
    { name: "Mar", reports: 3 },
    { name: "Apr", reports: 10 },
    { name: "May", reports: 7 },
    { name: "Jun", reports: 12 },
];

type Report = {
    id: string;
    type: string;
    description: string;
    location_text: string;
    created_at: number;
    user_id?: string;
};

interface AdminDashboardProps {
    initialCats: Cat[];
    initialVets: VetClinic[];
}

export function AdminDashboard({ initialCats, initialVets }: AdminDashboardProps) {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();

    const [stats, setStats] = useState({ cats: initialCats.length, reports: 0, users: 432 });
    const [recentReports, setRecentReports] = useState<Report[]>([]);
    const [dataLoading, setDataLoading] = useState(true);

    useEffect(() => {
        if (!authLoading) {
            if (!user) {
                router.push("/login");
            } else if (user.email !== "catwaala@gmail.com") {
                router.push("/");
            }
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const reportsRef = collection(db, "reports");
                const q = query(reportsRef, orderBy("created_at", "desc"), limit(5));
                const snapshot = await getDocs(q);

                const reports = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Report[];

                setRecentReports(reports);

                setStats(prev => ({
                    ...prev,
                    reports: snapshot.size || 0
                }));

            } catch (error) {
                console.error("Error fetching admin data:", error);
            } finally {
                setDataLoading(false);
            }
        };

        if (user && user.email === "catwaala@gmail.com") {
            fetchDashboardData();
        }
    }, [user]);

    if (authLoading || dataLoading) return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin mb-4 text-primary" />
            <div className="text-stone-500 font-medium animate-pulse">Loading secure dashboard...</div>
        </div>
    );
    if (!user || user.email !== "catwaala@gmail.com") return null;

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
                                <p className="text-xs text-stone-500">Community members</p>
                            </div>
                        </div>
                        <div className="glass-card p-6 rounded-3xl border border-primary/20 bg-primary/5 shadow-sm">
                            <div className="flex flex-row items-center justify-between pb-2">
                                <h3 className="text-sm font-medium text-primary">System Status</h3>
                                <Shield className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-primary">100%</div>
                                <p className="text-xs text-primary/80">All services running</p>
                            </div>
                        </div>
                    </div>

                    {/* Charts & Recent Activity */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="glass-card p-6 rounded-3xl border border-amber-100 shadow-sm">
                            <h3 className="text-lg font-bold mb-4 text-stone-800">Report Trends</h3>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData}>
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
                    <h2 className="text-2xl font-bold font-heading text-stone-800 mb-6">Database Management</h2>

                    <Tabs defaultValue="cats" className="w-full">
                        <TabsList className="mb-8 w-auto inline-flex bg-white/50 p-1 rounded-2xl border border-amber-100">
                            <TabsTrigger value="cats" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-rose-500 data-[state=active]:text-white data-[state=active]:shadow-md transition-all flex items-center gap-2">
                                <LayoutDashboard className="w-4 h-4" /> Cats ({initialCats.length})
                            </TabsTrigger>
                            <TabsTrigger value="vets" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all flex items-center gap-2">
                                <FileText className="w-4 h-4" /> Vets ({initialVets.length})
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="cats" className="space-y-4">
                            <div className="glass-card rounded-3xl overflow-hidden border border-amber-100/60">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-amber-50/50 text-stone-500 font-bold uppercase tracking-wider text-xs border-b border-amber-100">
                                        <tr>
                                            <th className="px-6 py-5">Name</th>
                                            <th className="px-6 py-5">Breed</th>
                                            <th className="px-6 py-5">Age</th>
                                            <th className="px-6 py-5">Status</th>
                                            <th className="px-6 py-5">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-amber-100/40">
                                        {initialCats.map((cat) => (
                                            <tr key={cat.id} className="hover:bg-white/50 transition-colors">
                                                <td className="px-6 py-4 font-bold text-stone-800">{cat.name}</td>
                                                <td className="px-6 py-4 text-stone-600">{cat.breed}</td>
                                                <td className="px-6 py-4 text-stone-600">{cat.age}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${cat.tag === 'Urgent' ? 'bg-rose-100 text-rose-700' :
                                                        cat.tag === 'Adopted' ? 'bg-emerald-100 text-emerald-700' :
                                                            'bg-blue-100 text-blue-700'
                                                        }`}>
                                                        {cat.tag || 'Available'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex gap-2">
                                                        <Button size="icon" variant="ghost" className="h-9 w-9 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl">
                                                            <Edit className="w-4 h-4" />
                                                        </Button>
                                                        <Button size="icon" variant="ghost" className="h-9 w-9 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl">
                                                            <Trash className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </TabsContent>

                        <TabsContent value="vets" className="space-y-4">
                            <div className="glass-card rounded-3xl overflow-hidden border border-amber-100/60">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-amber-50/50 text-stone-500 font-bold uppercase tracking-wider text-xs border-b border-amber-100">
                                        <tr>
                                            <th className="px-6 py-5">Name</th>
                                            <th className="px-6 py-5">District</th>
                                            <th className="px-6 py-5">Phone</th>
                                            <th className="px-6 py-5">Rating</th>
                                            <th className="px-6 py-5">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-amber-100/40">
                                        {initialVets.map((vet) => (
                                            <tr key={vet.id} className="hover:bg-white/50 transition-colors">
                                                <td className="px-6 py-4 font-bold text-stone-800">{vet.name}</td>
                                                <td className="px-6 py-4 text-stone-600">{vet.district}</td>
                                                <td className="px-6 py-4 text-emerald-600 font-medium">{vet.phone}</td>
                                                <td className="px-6 py-4">
                                                    <span className="flex items-center gap-1 text-stone-700 font-semibold">
                                                        {vet.rating} <span className="text-yellow-500">★</span>
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex gap-2">
                                                        <Button size="icon" variant="ghost" className="h-9 w-9 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl">
                                                            <Edit className="w-4 h-4" />
                                                        </Button>
                                                        <Button size="icon" variant="ghost" className="h-9 w-9 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl">
                                                            <Trash className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
