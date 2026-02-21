"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Edit, Trash, Cat as CatIcon, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Cat } from "@/data/cats";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function AdminCatsPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();

    const [cats, setCats] = useState<Cat[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading) {
            if (!user || user.email !== "catwaala@gmail.com") {
                router.push("/");
            }
        }
    }, [user, authLoading, router]);

    const fetchCats = async () => {
        setLoading(true);
        try {
            const catsRef = collection(db, "cats");
            const snapshot = await getDocs(catsRef);
            const catsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Cat[];
            setCats(catsData);
        } catch (error) {
            console.error("Error fetching cats:", error);
            toast.error("Failed to load cats");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user && user.email === "catwaala@gmail.com") {
            fetchCats();
        }
    }, [user]);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this cat? This action cannot be undone.")) return;

        try {
            await deleteDoc(doc(db, "cats", id));
            toast.success("Cat removed from system");
            fetchCats(); // Refresh list
        } catch (error) {
            console.error("Error deleting cat:", error);
            toast.error("Failed to delete cat");
        }
    };

    const handleMockSeed = async () => {
        // Quick seed function to move mock data to firebase if collection is empty
        const mockCats: Omit<Cat, "id">[] = [
            {
                name: 'Luna',
                breed: 'Domestic Shorthair',
                age: '1 year',
                gender: 'Female',
                location: "Mirpur, Dhaka",
                description: 'Playful and independent.',
                imageUrl: '/assets/cat1.jpg',
                tag: 'Urgent',
                temperamentTags: ['Playful', 'Independent'],
                vaccinated: true,
                neutered: true,
                goodWithKids: true,
            }
        ];

        try {
            const promises = mockCats.map(c => addDoc(collection(db, "cats"), { ...c, created_at: serverTimestamp() }));
            await Promise.all(promises);
            toast.success("Test Cats added to Firebase!");
            fetchCats();
        } catch (error) {
            console.error(error);
            toast.error("Failed to seed database.");
        }
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
                        <h1 className="text-3xl font-bold font-heading text-stone-800">Manage Cats</h1>
                        <p className="text-stone-500">View and edit adoption records.</p>
                    </div>
                </div>

                <div className="glass-card p-8 rounded-[2.5rem] mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-stone-800 flex items-center gap-2">
                            <CatIcon className="w-5 h-5 text-rose-500" /> Registered Cats ({cats.length})
                        </h2>
                        <div className="flex gap-4">
                            {cats.length === 0 && (
                                <Button variant="outline" className="border-stone-200 text-stone-600 rounded-xl" onClick={handleMockSeed}>Seed Test Data</Button>
                            )}
                            <Button onClick={() => alert("Add Cat Form coming soon!")} className="bg-rose-500 hover:bg-rose-600 text-white gap-2 rounded-xl">
                                <Plus className="w-4 h-4" /> Add New Cat
                            </Button>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center p-12">
                            <Loader2 className="w-8 h-8 animate-spin text-rose-500" />
                        </div>
                    ) : cats.length > 0 ? (
                        <div className="rounded-3xl border border-amber-100/60 overflow-hidden bg-white/50">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-amber-50/50 text-stone-500 font-bold uppercase tracking-wider text-xs border-b border-amber-100">
                                    <tr>
                                        <th className="px-6 py-5">Name</th>
                                        <th className="px-6 py-5 hidden md:table-cell">Breed</th>
                                        <th className="px-6 py-5">Age/Gender</th>
                                        <th className="px-6 py-5">Status</th>
                                        <th className="px-6 py-5 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-amber-100/40">
                                    {cats.map((cat) => (
                                        <tr key={cat.id} className="hover:bg-white/80 transition-colors">
                                            <td className="px-6 py-4 font-bold text-stone-800">
                                                <div className="flex items-center gap-3">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img src={cat.imageUrl || "/logo.png"} alt={cat.name} className="w-10 h-10 rounded-full object-cover shadow-sm bg-white" />
                                                    {cat.name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-stone-500 hidden md:table-cell">{cat.breed}</td>
                                            <td className="px-6 py-4 text-stone-500">{cat.age} • {cat.gender}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold shadow-sm ${cat.tag === 'Urgent' ? 'bg-rose-100 text-rose-700' :
                                                        cat.tag === 'Adopted' ? 'bg-emerald-100 text-emerald-700' :
                                                            'bg-blue-100 text-blue-700'
                                                    }`}>
                                                    {cat.tag || 'Available'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button size="icon" variant="ghost" className="h-9 w-9 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl">
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <Button size="icon" variant="ghost" onClick={() => handleDelete(cat.id)} className="h-9 w-9 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl">
                                                        <Trash className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center p-12 border-2 border-dashed border-amber-200/50 rounded-[2rem] bg-amber-50/20">
                            <CatIcon className="w-12 h-12 text-stone-300 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-stone-700">No cats found</h3>
                            <p className="text-stone-500 mt-1">There are no cats loaded in the Firebase database.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
