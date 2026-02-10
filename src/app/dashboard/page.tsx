"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { cats } from "@/data/cats";
import { PetCard } from "@/components/shared/PetCard";
import { Button } from "@/components/ui/button";
import { Heart, Gift, LogOut, Stethoscope, MessageCircle, BookHeart, Puzzle, HandHelping } from "lucide-react";

export default function DashboardPage() {
    const { user, signOut, loading } = useAuth();
    const { favoriteIds } = useFavorites();

    const favoriteCats = cats.filter(cat => favoriteIds.includes(cat.id));

    const getInitials = (name: string) => {
        return name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'U';
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="glass-card rounded-2xl px-8 py-4 text-stone-500 font-medium animate-pulse">Loading...</div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
                <div className="glass-card rounded-[2.5rem] p-12 max-w-md w-full">
                    <div className="text-6xl mb-6">🐱</div>
                    <h1 className="text-3xl font-bold mb-4 text-stone-800">Please Log In</h1>
                    <p className="mb-8 text-stone-500">You need to sign in to access your dashboard.</p>
                    <Link href="/login">
                        <Button className="rounded-2xl h-12 px-8 bg-gradient-to-r from-rose-500 to-rose-600 text-white font-semibold shadow-lg shadow-rose-500/20">
                            Go to Login
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-24">
            <div className="container mx-auto px-4 py-12 max-w-6xl">

                {/* Profile Card */}
                <div className="glass-card rounded-[2.5rem] p-8 md:p-12 mb-12">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                        {/* Avatar */}
                        <div className="relative group cursor-pointer shrink-0">
                            {user.user_metadata.avatar_url ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <Image
                                    src={user.user_metadata.avatar_url}
                                    alt={user.user_metadata.full_name || "User"}
                                    width={112}
                                    height={112}
                                    className="rounded-3xl object-cover border-4 border-white shadow-xl shadow-rose-100/50"
                                />
                            ) : (
                                <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center border-4 border-white shadow-xl shadow-rose-100/50 text-white text-3xl font-bold">
                                    {getInitials(user.user_metadata.full_name || "User")}
                                </div>
                            )}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 rounded-3xl">
                                <span className="text-white text-xs font-bold">Edit</span>
                            </div>
                        </div>

                        {/* User Info */}
                        <div className="flex-1 text-center md:text-left space-y-3">
                            <h1 className="text-3xl md:text-4xl font-bold text-stone-800">
                                {user.user_metadata.full_name || "User"}
                            </h1>
                            <p className="text-stone-400">{user.email}</p>

                            <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
                                <div className="glass-card px-5 py-2.5 rounded-2xl flex items-center gap-3">
                                    <Heart className="w-5 h-5 text-rose-500" />
                                    <span className="font-bold text-stone-800">{favoriteIds.length}</span>
                                    <span className="text-stone-400 text-sm">Favorites</span>
                                </div>
                            </div>

                            <div className="pt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                                <Button onClick={() => alert("Coming soon!")} variant="outline" className="rounded-xl border-rose-200 text-rose-600 hover:bg-rose-50/70 h-10">
                                    Edit Profile
                                </Button>
                                <Link href="/adopt">
                                    <Button className="rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 text-white hover:from-rose-600 hover:to-rose-700 shadow-md shadow-rose-500/15 h-10">
                                        Find a Cat
                                    </Button>
                                </Link>
                                <Button onClick={signOut} variant="ghost" className="rounded-xl text-stone-400 hover:text-red-500 h-10">
                                    <LogOut className="w-4 h-4 mr-2" /> Sign Out
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Favorites Section */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-stone-800">
                        <span className="w-10 h-10 bg-rose-100/80 rounded-2xl flex items-center justify-center text-rose-500">
                            <Heart className="w-5 h-5 fill-current" />
                        </span>
                        Your Favorite Cats
                    </h2>

                    {favoriteCats.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {favoriteCats.map(cat => (
                                // @ts-ignore
                                <PetCard key={cat.id} cat={cat} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center glass-card p-12 rounded-[2.5rem] border border-dashed border-amber-200/60">
                            <div className="text-6xl mb-4">😿</div>
                            <h3 className="text-xl font-bold mb-2 text-stone-800">No favorites yet</h3>
                            <p className="text-stone-400 mb-6">Go find some furry friends to add to your list.</p>
                            <Link href="/adopt">
                                <Button className="bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-xl shadow-md shadow-rose-500/15">Browse Cats</Button>
                            </Link>
                        </div>
                    )}
                </section>

                {/* Quick Actions */}
                <section>
                    <h2 className="text-2xl font-bold mb-8 text-stone-800 flex items-center gap-3">
                        <span className="w-1 h-8 bg-gradient-to-b from-rose-500 to-rose-400 rounded-full" />
                        Explore More
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {[
                            { href: "/find-vet", icon: <Stethoscope className="w-6 h-6" />, title: "Find a Vet", desc: "Locate trusted veterinary clinics near you.", color: "bg-blue-50 text-blue-500" },
                            { href: "/community", icon: <MessageCircle className="w-6 h-6" />, title: "Community", desc: "Join discussions and share your cat stories.", color: "bg-indigo-50 text-indigo-500" },
                            { href: "/memorial", icon: <BookHeart className="w-6 h-6" />, title: "Memorial Wall", desc: "Honor the memory of beloved pets.", color: "bg-purple-50 text-purple-500" },
                            { href: "/quiz", icon: <Puzzle className="w-6 h-6" />, title: "Cat Personality Quiz", desc: "Find out which cat matches your lifestyle.", color: "bg-amber-50 text-amber-500" },
                            { href: "/volunteer", icon: <HandHelping className="w-6 h-6" />, title: "Volunteer", desc: "Help us make a difference in the streets.", color: "bg-emerald-50 text-emerald-500" },
                        ].map((item) => (
                            <Link key={item.href} href={item.href} className="group glass-card-hover p-7 rounded-[1.75rem] flex items-start gap-5">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold mb-1.5 text-stone-800 group-hover:text-rose-600 transition-colors">{item.title}</h3>
                                    <p className="text-stone-400 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </Link>
                        ))}

                        <div onClick={() => alert("Donation feature coming soon!")} className="cursor-pointer group glass-card-hover p-7 rounded-[1.75rem] flex items-start gap-5">
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 bg-rose-50 text-rose-500 group-hover:scale-110 transition-transform duration-300">
                                <Gift className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-1.5 text-stone-800 group-hover:text-rose-600 transition-colors">Make a Donation</h3>
                                <p className="text-stone-400 text-sm leading-relaxed">Support our rescue missions.</p>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
