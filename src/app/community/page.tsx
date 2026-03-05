"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Star, Download, ChevronRight, Users, Heart, FileText, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { resources } from "@/data/resources";

export default function CommunityPage() {
    return (
        <div className="min-h-screen pb-24 bg-stone-50/50 dark:bg-stone-950 transition-colors duration-300">
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
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="https://www.facebook.com/catwaalaa" target="_blank" rel="noopener noreferrer">
                            <Button size="lg" className="rounded-2xl h-14 px-8 bg-[#1877F2] hover:bg-[#1877F2]/90 text-white shadow-lg w-full sm:w-auto">
                                Join Facebook Group <ArrowUpRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                    </div>
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

                    <div className="glass-card dark:bg-stone-900/60 rounded-[2.5rem] p-12 text-center border border-rose-100/50 dark:border-stone-800 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-400 via-amber-400 to-rose-400 animate-shimmer" />
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-rose-100/80 dark:bg-rose-900/30 text-rose-500 mb-6 animate-pulse">
                            <Calendar className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-stone-800 dark:text-stone-100 mb-3">Exciting Events Coming Soon!</h3>
                        <p className="text-stone-500 dark:text-stone-400 max-w-md mx-auto mb-8">
                            We are planning some amazing meetups, adoption drives, and workshops. Stay tuned for updates!
                        </p>
                        <Button disabled className="opacity-60 cursor-not-allowed rounded-full bg-stone-800 dark:bg-stone-700 text-white font-bold px-8 py-5 shadow-lg">
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
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-stone-800 dark:text-stone-100 font-heading mb-4">Feline Resources 📚</h2>
                        <p className="text-stone-500 dark:text-stone-400 max-w-2xl mx-auto">Essential reading for new and experienced cat parents alike.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {resources.map((resource) => {
                            const badgeColor = {
                                "rose": "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400 border-rose-200 dark:border-rose-900",
                                "amber": "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-900",
                                "teal": "bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400 border-teal-200 dark:border-teal-900",
                            }[resource.color] || "bg-stone-100 text-stone-600 dark:bg-zinc-800 dark:text-stone-400 border-stone-200";

                            const iconBgColor = {
                                "rose": "bg-rose-100 text-rose-500 dark:bg-rose-900/40 dark:text-rose-400",
                                "amber": "bg-amber-100 text-amber-500 dark:bg-amber-900/40 dark:text-amber-400",
                                "teal": "bg-teal-100 text-teal-500 dark:bg-teal-900/40 dark:text-teal-400",
                            }[resource.color] || "bg-stone-100 text-stone-500";

                            const highlightColor = {
                                "rose": "bg-rose-500",
                                "amber": "bg-amber-500",
                                "teal": "bg-teal-500",
                            }[resource.color] || "bg-stone-500";

                            return (
                                <Link
                                    href={resource.slug === "local-vet-directory" ? "/find-vet" : `/resources/${resource.slug}`}
                                    key={resource.slug}
                                    className="group relative bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md rounded-[2rem] p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 dark:border-zinc-800 overflow-hidden flex flex-col h-full hover:-translate-y-1"
                                >
                                    {/* Accent Top Bar */}
                                    <div className={`absolute top-0 left-0 right-0 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity ${highlightColor}`} />

                                    <div className="flex justify-between items-start mb-8">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner ${iconBgColor}`}>
                                            <FileText className="w-7 h-7" />
                                        </div>
                                        <div className={`text-xs font-bold px-3 py-1 pb-1.5 rounded-full border shadow-sm ${badgeColor}`}>
                                            {resource.badge}
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-stone-800 dark:text-stone-100 mb-3">{resource.title}</h3>
                                    <p className="text-stone-500 dark:text-stone-400 mb-8 text-sm leading-relaxed flex-1">{resource.description}</p>

                                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-stone-100 dark:border-zinc-800/50">
                                        <span className="text-xs font-medium text-stone-400 dark:text-stone-500">
                                            {resource.readTime}
                                        </span>
                                        <span className="text-rose-500 font-bold text-sm flex items-center gap-1 group-hover:translate-x-2 transition-transform">
                                            Read <ChevronRight className="w-4 h-4 ml-1" />
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
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
