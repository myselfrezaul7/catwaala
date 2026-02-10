"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cat } from "@/data/cats";
import { VetClinic } from "@/data/vets";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash, LayoutDashboard, FileText } from "lucide-react";

interface AdminDashboardProps {
    initialCats: Cat[];
    initialVets: VetClinic[];
}

export function AdminDashboard({ initialCats, initialVets }: AdminDashboardProps) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="glass-card rounded-2xl px-8 py-4 text-stone-500 font-medium animate-pulse">Loading...</div>
        </div>
    );
    if (!user) return null;

    return (
        <div className="min-h-screen pt-10 pb-20">
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
    );
}
