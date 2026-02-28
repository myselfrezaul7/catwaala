"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { Button } from "@/components/ui/button";
import { Loader2, Users as UsersIcon, Trash, Info, ArrowLeft, ShieldCheck, ShieldAlert, Search } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

type UserData = {
    id: string;
    email: string;
    displayName?: string;
    role?: string;
    created_at?: number;
};

export default function AdminUsersPage() {
    const { user, userData, loading: authLoading } = useAuth();
    const router = useRouter();

    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (!authLoading) {
            if (!user || (user.email !== "catwaala@gmail.com" && userData?.role !== "admin")) {
                router.push("/");
            }
        }
    }, [user, userData, authLoading, router]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const usersRef = collection(db, "users");
            const snapshot = await getDocs(usersRef);
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as UserData[];
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user && (user.email === "catwaala@gmail.com" || userData?.role === "admin")) {
            fetchUsers();
        }
    }, [user, userData]);

    const handleRoleChange = async (id: string, newRole: string) => {
        try {
            await updateDoc(doc(db, "users", id), { role: newRole });
            toast.success(`User role updated to ${newRole}`);
            fetchUsers();
        } catch (error) {
            console.error("Error updating role:", error);
            toast.error("Failed to update user role");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure? This deletes their profile data (Auth must be managed via Firebase Console).")) return;
        try {
            await deleteDoc(doc(db, "users", id));
            toast.success("User profile deleted");
            fetchUsers();
        } catch (error) {
            console.error("Error deleting:", error);
            toast.error("Failed to delete user");
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
                        <h1 className="text-3xl font-bold font-heading text-stone-800">Manage Users</h1>
                        <p className="text-stone-500">View community members registered in the database.</p>
                    </div>
                </div>

                <div className="glass-card p-8 rounded-[2.5rem] mb-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <h2 className="text-xl font-bold text-stone-800 flex items-center gap-2">
                            <UsersIcon className="w-5 h-5 text-blue-500" /> Registered Users ({users.length})
                        </h2>

                        <div className="relative w-full sm:w-auto">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                            <input
                                type="text"
                                placeholder="Search users by name or email..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 pr-4 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-full sm:w-64"
                            />
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center p-12">
                            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                        </div>
                    ) : (() => {
                        const filteredUsers = users.filter(u => {
                            const term = searchQuery.toLowerCase();
                            const matchName = u.displayName?.toLowerCase().includes(term);
                            const matchEmail = u.email.toLowerCase().includes(term);
                            return matchName || matchEmail;
                        });

                        return filteredUsers.length > 0 ? (
                            <div className="rounded-3xl border border-blue-100/60 overflow-hidden bg-white/50">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-blue-50/50 text-stone-500 font-bold uppercase tracking-wider text-xs border-b border-blue-100">
                                        <tr>
                                            <th className="px-6 py-5">Name</th>
                                            <th className="px-6 py-5">Email</th>
                                            <th className="px-6 py-5">Role</th>
                                            <th className="px-6 py-5 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-blue-50/50">
                                        {filteredUsers.map((u) => (
                                            <tr key={u.id} className="hover:bg-white/80 transition-colors">
                                                <td className="px-6 py-4 font-bold text-stone-800">
                                                    {u.displayName || "Anonymous User"}
                                                </td>
                                                <td className="px-6 py-4 text-stone-500">{u.email}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold shadow-sm ${u.role === 'admin' ? 'bg-primary/20 text-primary border-primary/20 border' :
                                                        'bg-white text-stone-600 border border-stone-100'
                                                        }`}>
                                                        {u.role || 'Member'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        {u.role === 'admin' ? (
                                                            <Button size="sm" variant="outline" onClick={() => handleRoleChange(u.id, "user")} className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-xl border-orange-200">
                                                                <ShieldAlert className="w-4 h-4 mr-1.5" /> Revoke Admin
                                                            </Button>
                                                        ) : (
                                                            <Button size="sm" variant="outline" onClick={() => handleRoleChange(u.id, "admin")} className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl border-emerald-200">
                                                                <ShieldCheck className="w-4 h-4 mr-1.5" /> Make Admin
                                                            </Button>
                                                        )}
                                                        <Button size="icon" variant="ghost" onClick={() => handleDelete(u.id)} className="h-9 w-9 text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl">
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
                            <div className="text-center p-12 border-2 border-dashed border-blue-200/50 rounded-[2rem] bg-blue-50/20">
                                <Info className="w-12 h-12 text-stone-300 mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-stone-700">{users.length === 0 ? "No user profiles found" : "No results found"}</h3>
                                <p className="text-stone-500 mt-1 max-w-sm mx-auto">
                                    {users.length === 0 ? "If users sign in via Google Authentication but this is empty, it means their profiles aren't being synced to the Firestore `users` collection yet." : "Try adjusting your search query."}
                                </p>
                            </div>
                        );
                    })()}
                </div>
            </div>
        </div>
    );
}
