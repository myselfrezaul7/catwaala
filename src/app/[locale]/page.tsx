import { Hero } from "@/components/home/Hero";
import { PetCard } from "@/components/shared/PetCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { cats } from "@/data/cats";

export default function Home() {
    const featuredCats = cats.slice(0, 3);

    return (
        <div className="flex flex-col min-h-screen">
            <Hero />

            {/* Featured Cats */}
            <section className="py-24 bg-white dark:bg-zinc-950">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                        <div className="space-y-2">
                            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 font-heading">
                                Meet the <span className="text-rose-600">Stars</span>
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 max-w-md">
                                These purr-fect companions are vaccinated, health-checked, and ready to take over your sofa.
                            </p>
                        </div>
                        <Link href="/adopt">
                            <Button variant="ghost" className="gap-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 text-base">
                                View All Cats <ArrowRight className="w-5 h-5" />
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredCats.map(cat => (
                            // @ts-ignore
                            <PetCard key={cat.id} cat={cat} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className="py-24 bg-rose-50 dark:bg-zinc-900 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
                    <Sparkles className="w-12 h-12 text-rose-500 mx-auto mb-6" />
                    <h2 className="text-3xl md:text-5xl font-bold mb-8 text-slate-900 dark:text-slate-100 font-heading">
                        More Than Just Adoption
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 leading-relaxed">
                        We run a comprehensive Trap-Neuter-Return (TNR) program to manage the stray population humanely. Every adoption fee supports the sterilization of street cats in Dhaka.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <div className="bg-white dark:bg-zinc-800 px-8 py-4 rounded-2xl shadow-sm">
                            <span className="block text-3xl font-bold text-rose-600 mb-1">500+</span>
                            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">TNR Surgeries</span>
                        </div>
                        <div className="bg-white dark:bg-zinc-800 px-8 py-4 rounded-2xl shadow-sm">
                            <span className="block text-3xl font-bold text-indigo-600 mb-1">350+</span>
                            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Adoptions</span>
                        </div>
                        <div className="bg-white dark:bg-zinc-800 px-8 py-4 rounded-2xl shadow-sm">
                            <span className="block text-3xl font-bold text-green-600 mb-1">50+</span>
                            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Volunteers</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
