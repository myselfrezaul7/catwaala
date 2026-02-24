import { Hero } from "@/components/home/Hero";
import { SuccessStories } from "@/components/home/SuccessStories";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
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

            <SuccessStories />

            {/* Visit Kuttawaala Banner */}
            <section className="py-12 md:py-20 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="glass-card dark:bg-stone-900/60 rounded-[3rem] p-8 md:p-16 text-center border border-amber-100/50 dark:border-stone-800 shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400" />
                        <div className="absolute top-10 right-10 opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none">
                            <span className="text-[120px]">🐕</span>
                        </div>
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100/80 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-sm font-bold mb-6 border border-amber-200 dark:border-amber-800/30">
                                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                                Sister Project
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 dark:text-white mb-4">
                                More of a <span className="text-amber-500">Dog Person</span>?
                            </h2>
                            <p className="text-lg text-stone-500 dark:text-stone-400 mb-8 max-w-xl mx-auto">
                                Visit Kuttawaala — our sister platform dedicated to rescuing and rehoming street dogs in Bangladesh.
                            </p>
                            <a
                                href="https://kuttawaala.vercel.app"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button size="lg" className="h-14 px-8 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/40 transition-all duration-300 gap-2">
                                    Visit Kuttawaala <ArrowRight className="w-5 h-5" />
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Cats Section */}
            <section className="py-12 md:py-24 relative overflow-hidden">
                {/* Warm decorative elements */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-rose-200/15 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-200/15 rounded-full blur-3xl" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-5xl font-bold text-stone-800 dark:text-stone-100 leading-tight">
                                Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-rose-600">Stars</span>
                            </h2>
                            <p className="text-lg text-stone-500 dark:text-stone-400 max-w-md">
                                These adorable cats are looking for their forever homes. Give them a chance at happiness.
                            </p>
                        </div>
                        <Link href="/adopt">
                            <Button variant="ghost" className="gap-2 text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 hover:bg-rose-50/70 dark:hover:bg-rose-900/30 text-base font-semibold rounded-full px-6">
                                View All Cats <ArrowRight className="w-5 h-5" />
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                        {featuredCats.map((cat) => (
                            // @ts-ignore
                            <PetCard key={cat.id} cat={cat} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Section with Glass Stats */}
            <section className="py-16 md:py-28 relative overflow-hidden">
                <div className="absolute inset-0 gradient-bg dark:bg-stone-950" />
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-300/15 dark:bg-rose-900/10 rounded-full blur-3xl animate-float" />
                    <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-300/15 dark:bg-amber-900/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-rose-100/80 dark:bg-rose-900/30 mb-8">
                        <Sparkles className="w-8 h-8 text-rose-500" />
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-stone-800 dark:text-white leading-tight">
                        Our Mission
                    </h2>
                    <p className="text-xl text-stone-500 dark:text-stone-400 mb-16 leading-relaxed max-w-2xl mx-auto">
                        We are dedicated to improving the lives of street cats in Bangladesh through rescue, rehabilitation, and adoption programs.
                    </p>

                    {/* Stats Cards with Interactive Glassmorphism */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="glass-card dark:bg-stone-900/60 rounded-3xl p-6 md:p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group cursor-default relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-700">
                                <Heart className="w-24 h-24 text-rose-500" />
                            </div>
                            <div className="w-14 h-14 rounded-2xl bg-rose-100/80 dark:bg-rose-900/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10">
                                <Heart className="w-7 h-7 text-rose-500" />
                            </div>
                            <span className="block text-4xl font-bold text-rose-600 dark:text-rose-400 mb-2 relative z-10">
                                <AnimatedCounter value={500} />+
                            </span>
                            <span className="text-sm font-semibold text-stone-400 uppercase tracking-wider relative z-10">Cats TNR'd</span>
                        </div>

                        <div className="glass-card dark:bg-stone-900/60 rounded-3xl p-6 md:p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group cursor-default relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-700">
                                <Users className="w-24 h-24 text-amber-600 dark:text-amber-500" />
                            </div>
                            <div className="w-14 h-14 rounded-2xl bg-amber-100/80 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10">
                                <Users className="w-7 h-7 text-amber-600 dark:text-amber-500" />
                            </div>
                            <span className="block text-4xl font-bold text-amber-600 dark:text-amber-500 mb-2 relative z-10">
                                <AnimatedCounter value={200} />+
                            </span>
                            <span className="text-sm font-semibold text-stone-400 uppercase tracking-wider relative z-10">Adoptions</span>
                        </div>

                        <div className="glass-card dark:bg-stone-900/60 rounded-3xl p-6 md:p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group cursor-default relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-700">
                                <Stethoscope className="w-24 h-24 text-emerald-600 dark:text-emerald-500" />
                            </div>
                            <div className="w-14 h-14 rounded-2xl bg-emerald-100/80 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10">
                                <Stethoscope className="w-7 h-7 text-emerald-600 dark:text-emerald-500" />
                            </div>
                            <span className="block text-4xl font-bold text-emerald-600 dark:text-emerald-500 mb-2 relative z-10">
                                <AnimatedCounter value={50} />+
                            </span>
                            <span className="text-sm font-semibold text-stone-400 uppercase tracking-wider relative z-10">Volunteers</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 md:py-20 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-200/20 dark:bg-rose-900/10 rounded-full blur-3xl" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="glass-card dark:bg-stone-900/60 rounded-[32px] p-8 md:p-16 text-center max-w-3xl mx-auto border dark:border-white/10">
                        <h2 className="text-3xl md:text-4xl font-bold text-stone-800 dark:text-white mb-6">
                            Ready to Make a Difference?
                        </h2>
                        <p className="text-lg text-stone-500 dark:text-stone-300 mb-10 max-w-xl mx-auto">
                            Join our community of cat lovers and help us create a better world for stray cats in Bangladesh.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/adopt">
                                <Button size="lg" className="h-14 px-8 rounded-2xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold shadow-lg shadow-rose-500/25 hover:shadow-xl hover:shadow-rose-500/40 transition-all duration-300">
                                    Adopt a Cat
                                </Button>
                            </Link>
                            <Link href="/volunteer">
                                <Button size="lg" variant="outline" className="h-14 px-8 rounded-2xl border-2 border-stone-200 dark:border-stone-700 hover:border-rose-300 dark:hover:border-rose-700 text-stone-700 dark:text-stone-300 hover:text-rose-600 dark:hover:text-rose-400 font-semibold transition-all duration-300 bg-transparent">
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
