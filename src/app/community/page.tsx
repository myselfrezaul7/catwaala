"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Star, Download, ChevronRight, Users, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CommunityPage() {
    return (
        <div className="min-h-screen pb-24 bg-[#FFFDF8]">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-rose-100/50 to-transparent pointer-events-none" />
                <div className="container mx-auto text-center relative z-10">
                    <div className="inline-block p-3 rounded-full bg-white shadow-lg shadow-rose-100/50 mb-6 border border-rose-100 animate-bounce-slow">
                        <Users className="w-8 h-8 text-rose-500 fill-rose-500" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold font-heading text-stone-800 mb-6 leading-tight">
                        Catwaala Community <span className="text-rose-500">Hub</span>
                    </h1>
                    <p className="text-xl text-stone-500 max-w-2xl mx-auto leading-relaxed">
                        Join our vibrant community of cat lovers in Dhaka. From adoption drives to kitten yoga, there's always something happening!
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 max-w-6xl space-y-24">

                {/* Upcoming Events */}
                <section>
                    <div className="flex items-end justify-between mb-10">
                        <div>
                            <h2 className="text-3xl font-bold text-stone-800 font-heading mb-2">Upcoming Events 📅</h2>
                            <p className="text-stone-500">Mark your calendars for these purr-fect gatherings.</p>
                        </div>
                        <Button variant="ghost" className="text-rose-500 hover:text-rose-600 hover:bg-rose-50">View All <ChevronRight className="w-4 h-4 ml-1" /></Button>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Event 1 */}
                        <div className="group glass-card rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                            <div className="relative h-48 bg-stone-200">
                                <Image
                                    src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1000&auto=format&fit=crop"
                                    alt="Kitten Yoga"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-xl text-center shadow-lg">
                                    <span className="block text-xs font-bold text-rose-500 uppercase">Feb</span>
                                    <span className="block text-xl font-bold text-stone-800">24</span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-stone-800 mb-2 group-hover:text-rose-600 transition-colors">Kitten Yoga Charity Class</h3>
                                <div className="space-y-2 text-stone-500 text-sm mb-6">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-rose-400" /> 10:00 AM - 11:30 AM
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-rose-400" /> Gulshan 2 Park
                                    </div>
                                </div>
                                <Button className="w-full rounded-xl bg-stone-100 text-stone-600 hover:bg-rose-500 hover:text-white font-bold transition-all">
                                    RSVP Now
                                </Button>
                            </div>
                        </div>

                        {/* Event 2 */}
                        <div className="group glass-card rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                            <div className="relative h-48 bg-stone-200">
                                <Image
                                    src="https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80&w=1000&auto=format&fit=crop"
                                    alt="Adoption Drive"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-xl text-center shadow-lg">
                                    <span className="block text-xs font-bold text-rose-500 uppercase">Mar</span>
                                    <span className="block text-xl font-bold text-stone-800">02</span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-stone-800 mb-2 group-hover:text-rose-600 transition-colors">Mega Adoption Drive</h3>
                                <div className="space-y-2 text-stone-500 text-sm mb-6">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-rose-400" /> 2:00 PM - 6:00 PM
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-rose-400" /> Dhanmondi Lake
                                    </div>
                                </div>
                                <Button className="w-full rounded-xl bg-stone-100 text-stone-600 hover:bg-rose-500 hover:text-white font-bold transition-all">
                                    Learn More
                                </Button>
                            </div>
                        </div>

                        {/* Event 3 */}
                        <div className="group glass-card rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                            <div className="relative h-48 bg-stone-200">
                                <Image
                                    src="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=1000&auto=format&fit=crop"
                                    alt="Vet Q&A"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-xl text-center shadow-lg">
                                    <span className="block text-xs font-bold text-rose-500 uppercase">Mar</span>
                                    <span className="block text-xl font-bold text-stone-800">15</span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-stone-800 mb-2 group-hover:text-rose-600 transition-colors">Vet Q&A Session</h3>
                                <div className="space-y-2 text-stone-500 text-sm mb-6">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-rose-400" /> 8:00 PM - 9:00 PM
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-rose-400" /> Online (Zoom)
                                    </div>
                                </div>
                                <Button className="w-full rounded-xl bg-stone-100 text-stone-600 hover:bg-rose-500 hover:text-white font-bold transition-all">
                                    Register Free
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Volunteer Spotlight */}
                <section className="bg-gradient-to-br from-rose-500 to-orange-500 rounded-[3rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-rose-200">
                    <div className="absolute top-0 right-0 p-12 opacity-10">
                        <Star className="w-64 h-64 rotate-12" />
                    </div>

                    <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-bold mb-6 border border-white/20">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                Volunteer of the Month
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 !leading-snug">
                                Meet Sarah, the "Kitten Whisperer"
                            </h2>
                            <p className="text-rose-100 text-lg mb-8 leading-relaxed">
                                Sarah has fostered over 20 litters of neonatal kittens this year alone. Her dedication to bottle-feeding round the clock has saved countless lives.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <div className="bg-white/10 backdrop-blur px-4 py-3 rounded-xl border border-white/10 text-center min-w-[100px]">
                                    <span className="block text-2xl font-bold">50+</span>
                                    <span className="text-xs uppercase opacity-80">Rescues</span>
                                </div>
                                <div className="bg-white/10 backdrop-blur px-4 py-3 rounded-xl border border-white/10 text-center min-w-[100px]">
                                    <span className="block text-2xl font-bold">2yr</span>
                                    <span className="text-xs uppercase opacity-80">Service</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-square rounded-[2.5rem] overflow-hidden border-8 border-white/20 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                                <Image
                                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop" // Placeholder portrait
                                    alt="Sarah"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Resources */}
                <section>
                    <h2 className="text-3xl font-bold text-stone-800 font-heading mb-10 text-center">Feline Resources 📚</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { title: "New Kitten Checklist", desc: "Everything you need for your new furball." },
                            { title: "Local Vet Directory", desc: "Trusted vets across Dhaka." },
                            { title: "Cat Nutrition Guide", desc: "What to feed and what to avoid." },
                        ].map((resource, i) => (
                            <Link href="#" key={i} className="group glass-card p-8 rounded-[2rem] hover:bg-rose-50 transition-colors border-2 border-transparent hover:border-rose-100">
                                <div className="w-14 h-14 bg-rose-100 rounded-2xl flex items-center justify-center mb-6 text-rose-500 group-hover:scale-110 transition-transform">
                                    <Download className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold text-stone-800 mb-2">{resource.title}</h3>
                                <p className="text-stone-500 mb-4">{resource.desc}</p>
                                <span className="text-rose-500 font-bold text-sm flex items-center gap-1 group-hover:translate-x-2 transition-transform">
                                    Download PDF <ChevronRight className="w-4 h-4" />
                                </span>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="text-center py-12">
                    <p className="text-2xl font-bold text-stone-800 mb-6">Want to make a difference?</p>
                    <Link href="/volunteer">
                        <Button className="h-14 px-8 rounded-full bg-stone-800 text-white font-bold text-lg hover:bg-stone-900 shadow-xl hover:scale-105 transition-all">
                            Join the Community
                        </Button>
                    </Link>
                </section>
            </div>
        </div>
    );
}
