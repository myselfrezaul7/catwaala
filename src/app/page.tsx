import { Hero } from "@/components/home/Hero";
import { SuccessStories } from "@/components/home/SuccessStories";
import { HomepageStats } from "@/components/home/HomepageStats";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles, PawPrint } from "lucide-react";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <Hero />

            <SuccessStories />

            {/* Split Soul Interactive Redirect Banner */}
            <section className="py-12 md:py-20 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">

                    <div className="mb-8 text-center max-w-2xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100/80 dark:bg-zinc-900/50 text-muted-foreground text-sm font-bold mb-4 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                            <Sparkles className="w-4 h-4 text-amber-500" />
                            Same Mission, Different Paws
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold font-heading text-foreground mb-4">
                            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-amber-500">Companion</span>
                        </h2>
                    </div>

                    <div className="group/split relative h-[500px] md:h-[450px] w-full max-w-5xl mx-auto bg-zinc-100 dark:bg-zinc-900 rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-2xl border border-zinc-200 dark:border-zinc-800">
                        {/* Divider Paw Trail */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-row md:flex-col gap-4 pointer-events-none opacity-20">
                            <PawPrint className="w-5 h-5 md:w-6 md:h-6 -rotate-12 text-zinc-800 dark:text-white" />
                            <PawPrint className="w-5 h-5 md:w-6 md:h-6 rotate-12 text-zinc-800 dark:text-white translate-y-2 md:translate-x-3 md:translate-y-0" />
                            <PawPrint className="w-5 h-5 md:w-6 md:h-6 -rotate-12 text-zinc-800 dark:text-white" />
                            <PawPrint className="w-5 h-5 md:w-6 md:h-6 rotate-12 text-zinc-800 dark:text-white translate-y-2 md:translate-x-3 md:translate-y-0" />
                        </div>

                        {/* Catwaala Side (Left) */}
                        <div className="flex-1 relative flex flex-col justify-center items-center p-8 transition-all duration-700 ease-out hover:flex-[1.5] bg-teal-50/50 dark:bg-teal-950/20 border-b md:border-r md:border-b-0 border-zinc-200 dark:border-zinc-800 overflow-hidden group/cat">
                            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent opacity-0 group-hover/cat:opacity-100 transition-opacity duration-700" />
                            <div className="absolute -left-8 -top-8 text-[120px] md:text-[200px] opacity-5 text-teal-900 dark:text-teal-100 rotate-12 transition-transform duration-700 group-hover/cat:scale-110">🐈</div>

                            <div className="relative z-10 text-center flex flex-col items-center h-full justify-center">
                                <h3 className="text-2xl md:text-3xl font-bold font-heading text-teal-800 dark:text-teal-400 mb-3">The Feline Side</h3>
                                <p className="text-sm md:text-base text-muted-foreground mb-6 max-w-[250px] mx-auto opacity-80 group-hover/cat:opacity-100 transition-opacity">You're currently exploring Catwaala. Independent, graceful, and purrfect.</p>
                                <Button disabled variant="outline" className="rounded-2xl border-teal-200 dark:border-teal-900 bg-white/50 dark:bg-zinc-900/50 text-teal-600 dark:text-teal-500 pointer-events-none mt-auto md:mt-0">
                                    You are here 📍
                                </Button>
                            </div>
                        </div>

                        {/* Kuttawaala Side (Right) */}
                        <div className="flex-1 relative flex flex-col justify-center items-center p-8 transition-all duration-700 ease-out hover:flex-[1.5] bg-amber-50/50 dark:bg-amber-950/20 overflow-hidden group/dog shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.1)] md:shadow-[-20px_0_30px_-15px_rgba(0,0,0,0.1)]">
                            <div className="absolute inset-0 bg-gradient-to-bl from-amber-500/10 to-transparent opacity-0 group-hover/dog:opacity-100 transition-opacity duration-700" />
                            <div className="absolute -right-8 -bottom-8 text-[120px] md:text-[200px] opacity-5 text-amber-900 dark:text-amber-100 -rotate-12 transition-transform duration-700 group-hover/dog:scale-110">🐕</div>

                            <div className="relative z-10 text-center flex flex-col items-center h-full justify-center">
                                <h3 className="text-2xl md:text-3xl font-bold font-heading text-amber-600 dark:text-amber-500 mb-3">The Canine Side</h3>
                                <p className="text-sm md:text-base text-muted-foreground mb-6 max-w-[250px] mx-auto opacity-80 group-hover/dog:opacity-100 transition-opacity">Discover our sister platform dedicated to rescuing street dogs across Bangladesh.</p>
                                <a href="https://kuttawaala.vercel.app" target="_blank" rel="noopener noreferrer" className="mt-auto md:mt-0">
                                    <Button className="h-12 md:h-14 px-6 md:px-8 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/40 transition-all duration-300 group-hover/dog:-translate-y-1">
                                        Visit Kuttawaala <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover/dog:translate-x-1 transition-transform" />
                                    </Button>
                                </a>
                            </div>
                        </div>
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

                    {/* Stats Cards - Dynamic from Firestore */}
                    <HomepageStats />
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
