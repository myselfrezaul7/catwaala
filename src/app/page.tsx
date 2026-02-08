import { Hero } from "@/components/home/Hero";
import { PetCard } from "@/components/shared/PetCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles, Heart, Users, Stethoscope } from "lucide-react";
import { cats } from "@/data/cats";

export default function Home() {
    const featuredCats = cats.slice(0, 3);

    return (
        <div className="flex flex-col min-h-screen">
            <Hero />

            {/* Featured Cats Section */}
            <section className="py-24 gradient-bg relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-rose-300/20 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
                                Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-rose-600">Stars</span>
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md">
                                These adorable cats are looking for their forever homes. Give them a chance at happiness.
                            </p>
                        </div>
                        <Link href="/adopt">
                            <Button variant="ghost" className="gap-2 text-rose-600 hover:text-rose-700 hover:bg-rose-100/50 dark:hover:bg-rose-500/10 text-base font-semibold rounded-full px-6">
                                View All Cats <ArrowRight className="w-5 h-5" />
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredCats.map((cat, index) => (
                            // @ts-ignore
                            <PetCard key={cat.id} cat={cat} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Section with Glassmorphism Stats */}
            <section className="py-28 relative overflow-hidden">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-white to-indigo-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900" />
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-400/20 rounded-full blur-3xl animate-float" />
                    <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-rose-100 dark:bg-rose-500/20 mb-8">
                        <Sparkles className="w-8 h-8 text-rose-500" />
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white leading-tight">
                        Our Mission
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-slate-300 mb-16 leading-relaxed max-w-2xl mx-auto">
                        We are dedicated to improving the lives of street cats in Bangladesh through rescue, rehabilitation, and adoption programs.
                    </p>

                    {/* Stats Cards with iOS 26 Glassmorphism */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="glass-card rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group">
                            <div className="w-14 h-14 rounded-2xl bg-rose-100 dark:bg-rose-500/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                <Heart className="w-7 h-7 text-rose-500" />
                            </div>
                            <span className="block text-4xl font-bold text-rose-600 dark:text-rose-400 mb-2">500+</span>
                            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Cats TNR&apos;d</span>
                        </div>

                        <div className="glass-card rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group">
                            <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                <Users className="w-7 h-7 text-indigo-500" />
                            </div>
                            <span className="block text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">200+</span>
                            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Adoptions</span>
                        </div>

                        <div className="glass-card rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group">
                            <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                <Stethoscope className="w-7 h-7 text-emerald-500" />
                            </div>
                            <span className="block text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">50+</span>
                            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Volunteers</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 gradient-bg relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-300/30 dark:bg-rose-500/10 rounded-full blur-3xl" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="glass-card rounded-[32px] p-12 md:p-16 text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                            Ready to Make a Difference?
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-300 mb-10 max-w-xl mx-auto">
                            Join our community of cat lovers and help us create a better world for stray cats in Bangladesh.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/adopt">
                                <Button size="lg" className="h-14 px-8 rounded-2xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold shadow-lg shadow-rose-500/25 hover:shadow-xl hover:shadow-rose-500/40 transition-all duration-300">
                                    Adopt a Cat
                                </Button>
                            </Link>
                            <Link href="/volunteer">
                                <Button size="lg" variant="outline" className="h-14 px-8 rounded-2xl border-2 border-slate-300 dark:border-slate-600 hover:border-rose-400 dark:hover:border-rose-400 font-semibold transition-all duration-300">
                                    Become a Volunteer
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
