"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Star, Download, ChevronRight, Users, Heart, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { resources } from "@/data/resources";

export default function CommunityPage() {
    return (
        <div className="min-h-screen pb-24 bg-[#FFFDF8] dark:bg-stone-950 transition-colors duration-300">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-rose-100/50 dark:from-rose-900/10 to-transparent pointer-events-none" />
                <div className="container mx-auto text-center relative z-10">
                    <div className="inline-block p-3 rounded-full bg-white dark:bg-stone-900 shadow-lg shadow-rose-100/50 dark:shadow-rose-900/20 mb-6 border border-rose-100 dark:border-rose-900/30 animate-bounce-slow">
                        <Users className="w-8 h-8 text-rose-500 fill-rose-500" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold font-heading text-stone-800 dark:text-stone-100 mb-6 leading-tight">
                        Catwaala Community <span className="text-rose-500">Hub</span>
                    </h1>
                    <p className="text-xl text-stone-500 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed mb-8">
                        Join our vibrant community of cat lovers in Dhaka. From adoption drives to kitten yoga, there's always something happening!
                    </p>
                    <Link href="https://www.facebook.com/groups/catwaala" target="_blank" rel="noopener noreferrer">
                        <Button size="lg" className="rounded-full bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all">
                            <Users className="w-5 h-5 mr-2" />
                            Visit Facebook Community
                        </Button>
                    </Link>
                </div>
            </section>

            <div className="container mx-auto px-4 max-w-6xl space-y-24">

                {/* Upcoming Events */}
                <section>
                    <div className="flex items-end justify-between mb-10">
                        <div>
                            <h2 className="text-3xl font-bold text-stone-800 dark:text-stone-100 font-heading mb-2">Upcoming Events 📅</h2>
                            <p className="text-stone-500 dark:text-stone-400">Mark your calendars for these purr-fect gatherings.</p>
                        </div>
                    </div>

                    <div className="bg-stone-100 dark:bg-stone-900/50 rounded-[2rem] p-12 text-center border-2 border-dashed border-stone-200 dark:border-stone-800">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-900/20 text-rose-500 mb-6">
                            <Calendar className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-stone-800 dark:text-stone-100 mb-3"> exciting events coming soon!</h3>
                        <p className="text-stone-500 dark:text-stone-400 max-w-md mx-auto mb-8">
                            We are planning some amazing meetups, adoption drives, and workshops. Stay tuned for updates!
                        </p>
                        <Button disabled className="opacity-50 cursor-not-allowed rounded-full bg-stone-800 dark:bg-stone-700 text-white font-bold px-8 py-6">
                            Coming Soon
                        </Button>
                    </div>
                </section>

                {/* Volunteer Spotlight */}
                <section className="bg-gradient-to-br from-rose-500 to-orange-500 rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden shadow-2xl shadow-rose-200 dark:shadow-rose-900/20 text-center">
                    <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                        <Star className="w-64 h-64 rotate-12" />
                    </div>

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-bold mb-8 border border-white/20">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            Community Moderator
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 !leading-snug text-white">
                            Meet Wasima Mursalin
                        </h2>
                        <p className="text-rose-100 text-xl mb-10 leading-relaxed">
                            She is an moderator of our 450K members community.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <div className="bg-white/10 backdrop-blur px-6 py-4 rounded-xl border border-white/10 text-center min-w-[120px]">
                                <span className="block text-3xl font-bold text-white">450K+</span>
                                <span className="text-xs uppercase opacity-80 text-white tracking-wider">Members</span>
                            </div>
                            <div className="bg-white/10 backdrop-blur px-6 py-4 rounded-xl border border-white/10 text-center min-w-[120px]">
                                <span className="block text-3xl font-bold text-white">24/7</span>
                                <span className="text-xs uppercase opacity-80 text-white tracking-wider">Support</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Resources */}
                <section>
                    <h2 className="text-3xl font-bold text-stone-800 dark:text-stone-100 font-heading mb-10 text-center">Feline Resources 📚</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {resources.map((resource) => (
                            <Link href={`/resources/${resource.slug}`} key={resource.slug} className="group glass-card dark:bg-stone-900/60 dark:border-stone-800 p-8 rounded-[2rem] hover:bg-rose-50 dark:hover:bg-stone-800 transition-all border-2 border-transparent hover:border-rose-100 dark:hover:border-stone-700">
                                <div className="w-14 h-14 bg-rose-100 dark:bg-stone-800 rounded-2xl flex items-center justify-center mb-6 text-rose-500 group-hover:scale-110 transition-transform shadow-sm">
                                    <FileText className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold text-stone-800 dark:text-stone-100 mb-2">{resource.title}</h3>
                                <p className="text-stone-500 dark:text-stone-400 mb-4 text-sm leading-relaxed">{resource.description}</p>
                                <span className="text-rose-500 font-bold text-sm flex items-center gap-1 group-hover:translate-x-2 transition-transform">
                                    Read Article <ChevronRight className="w-4 h-4" />
                                </span>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="text-center py-12">
                    <p className="text-2xl font-bold text-stone-800 dark:text-stone-100 mb-6">Want to make a difference?</p>
                    <Link href="/volunteer">
                        <Button className="h-14 px-8 rounded-full bg-stone-800 dark:bg-stone-700 text-white font-bold text-lg hover:bg-stone-900 dark:hover:bg-stone-600 shadow-xl hover:scale-105 transition-all">
                            Join the Community
                        </Button>
                    </Link>
                </section>
            </div>
        </div>
    );
}
