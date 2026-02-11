"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LogOut, User } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
    const { user, loading, signOut } = useAuth();
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

                    <div className="border-t border-amber-100/60 pt-8">
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
