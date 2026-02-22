"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc, addDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Edit, Trash, Activity, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { VetForm } from "@/components/admin/VetForm";
import { MOCK_VET_CLINICS as vets } from "@/data/vets";
import { VetClinic } from "@/services/VetService";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function AdminVetsPage() {
    const { user, userData, loading: authLoading } = useAuth();
    const router = useRouter();

    const [clinics, setClinics] = useState<VetClinic[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingVet, setEditingVet] = useState<VetClinic | null>(null);

    useEffect(() => {
        if (!authLoading) {
            if (!user || (user.email !== "catwaala@gmail.com" && userData?.role !== "admin")) {
                router.push("/");
            }
        }
    }, [user, userData, authLoading, router]);

    const fetchVets = async () => {
        setLoading(true);
        try {
            const vetsRef = collection(db, "vets");
            const snapshot = await getDocs(vetsRef);
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as unknown as VetClinic[];
            setClinics(data);
        } catch (error) {
            console.error("Error fetching vets:", error);
            toast.error("Failed to load veterinarians");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user && (user.email === "catwaala@gmail.com" || userData?.role === "admin")) {
            fetchVets();
        }
    }, [user, userData]);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this clinic?")) return;
        try {
            await deleteDoc(doc(db, "vets", id));
            toast.success("Clinic deleted");
            fetchVets();
        } catch (error) {
            console.error("Error deleting clinic:", error);
            toast.error("Failed to delete clinic");
        }
    };

    const handleOpenForm = (vet: VetClinic | null = null) => {
        setEditingVet(vet);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setEditingVet(null);
    };

    const handleFormSubmit = async (data: Omit<VetClinic, "id">) => {
        try {
            if (editingVet) {
                // Update existing
                // @ts-ignore - The incoming ID object structure is handled safely by doc() implicitly parsing strings mapping to Firestore IDs.
                await updateDoc(doc(db, "vets", editingVet.id.toString()), data as any);
                toast.success("Clinic updated successfully!");
            } else {
                // Add new
                await addDoc(collection(db, "vets"), data);
                toast.success("Clinic added successfully!");
            }
            handleCloseForm();
            fetchVets();
        } catch (error) {
            console.error("Error saving clinic:", error);
            toast.error("Failed to save clinic. Please try again.");
        }
    };

    const handleMockSeed = async () => {
        // Seed the hardcoded initial data to firebase
        try {
            const promises = vets.map((v: any) => addDoc(collection(db, "vets"), { ...v }));
            await Promise.all(promises);
            toast.success("Migrated Test Vets to Firebase!");
            fetchVets();
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
                        <h1 className="text-3xl font-bold font-heading text-stone-800">Veterinarians Directory</h1>
                        <p className="text-stone-500">Manage the public database of verified Vet Clinics.</p>
                    </div>
                </div>

                <div className="glass-card p-8 rounded-[2.5rem] mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-stone-800 flex items-center gap-2">
                            <Activity className="w-5 h-5 text-teal-500" /> Registered Clinics ({clinics.length})
                        </h2>
                        <div className="flex gap-4">
                            {clinics.length === 0 && (
                                <Button variant="outline" className="border-stone-200 text-stone-600 rounded-xl" onClick={handleMockSeed}>Seed Initial Vets</Button>
                            )}
                            <Button onClick={() => handleOpenForm(null)} className="bg-teal-600 hover:bg-teal-700 text-white gap-2 rounded-xl shadow-lg shadow-teal-500/20">
                                <Plus className="w-4 h-4" /> Add Clinic
                            </Button>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center p-12">
                            <Loader2 className="w-8 h-8 animate-spin text-teal-500" />
                        </div>
                    ) : clinics.length > 0 ? (
                        <div className="rounded-2xl border border-stone-200 overflow-hidden bg-white/60 shadow-sm">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-stone-50/80 text-stone-500 font-bold uppercase tracking-wider text-xs border-b border-stone-200">
                                    <tr>
                                        <th className="px-6 py-4">Name & Address</th>
                                        <th className="px-6 py-4">District</th>
                                        <th className="px-6 py-4">Contact</th>
                                        <th className="px-6 py-4">Rating</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-stone-100">
                                    {clinics.map((vet) => (
                                        <tr key={vet.id} className="hover:bg-white/90 transition-colors">
                                            <td className="px-6 py-4 text-stone-700">
                                                <div className="font-bold">{vet.name} {vet.services?.some((s: string) => s.toLowerCase().includes('emergency')) && <span className="ml-2 px-2 py-0.5 bg-rose-100 text-rose-700 text-[10px] rounded-full uppercase shadow-sm">Emergency</span>}</div>
                                                <div className="text-xs text-stone-500 line-clamp-1">{vet.address}</div>
                                            </td>
                                            <td className="px-6 py-4 text-stone-500">{vet.district}</td>
                                            <td className="px-6 py-4 text-stone-600 font-medium">{vet.phone}</td>
                                            <td className="px-6 py-4">
                                                <span className="flex items-center font-bold text-amber-500">
                                                    {vet.rating} ★
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button size="icon" variant="ghost" className="h-9 w-9 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl" onClick={() => handleOpenForm(vet)}>
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <Button size="icon" variant="ghost" onClick={() => handleDelete(vet.id.toString())} className="h-9 w-9 text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl">
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
                        <div className="text-center p-12 border-2 border-dashed border-teal-200/50 rounded-[2rem] bg-teal-50/20">
                            <Activity className="w-12 h-12 text-stone-300 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-stone-700">No clinics found</h3>
                            <p className="text-stone-500 mt-1">There are no veterinarians in the Firebase database.</p>
                        </div>
                    )}
                </div>
                <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold font-heading text-stone-800">
                                {editingVet ? 'Edit Clinic Profile' : 'Register New Clinic'}
                            </DialogTitle>
                        </DialogHeader>
                        {isFormOpen && (
                            <VetForm
                                initialData={editingVet || undefined}
                                onSubmit={handleFormSubmit}
                                onCancel={handleCloseForm}
                            />
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
