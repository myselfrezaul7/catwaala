import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Cat, Syringe, Home, Utensils, Heart } from "lucide-react";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cat Care FAQ",
    description: "Answers to common questions about cat adoption, diet, health, and apartment living in Bangladesh Context.",
};

export default function FAQPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 pb-24">
            {/* Header */}
            <div className="bg-rose-500 text-white py-16 text-center px-4 relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-4xl font-bold mb-4 font-heading flex items-center justify-center gap-3">
                        <HelpCircle className="w-10 h-10" /> Cat Care FAQ
                    </h1>
                    <p className="text-rose-100 max-w-xl mx-auto text-lg">
                        Common questions about adopting and caring for cats in Bangladesh.
                    </p>
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,_rgba(255,255,255,0.2)_0%,_transparent_50%)] pointer-events-none" />
            </div>

            <div className="container mx-auto px-4 -mt-8 relative z-20 max-w-3xl">
                <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-slate-100 dark:border-zinc-800 p-8">

                    {/* Adoption & Deshi Cats */}
                    <div className="mb-10">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-slate-800 dark:text-slate-100">
                            <Cat className="w-6 h-6 text-rose-500" /> Adoption & &quot;Deshi&quot; Cats
                        </h2>
                        <Accordion type="single" collapsible className="w-full space-y-4">
                            <AccordionItem value="deshi-cats" className="border border-slate-100 dark:border-zinc-800 rounded-xl px-4">
                                <AccordionTrigger className="hover:no-underline font-semibold text-left">
                                    Why should I adopt a local &quot;Deshi&quot; cat instead of buying a Persian?
                                </AccordionTrigger>
                                <AccordionContent className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Deshi (local) cats are naturally adapted to Bangladesh&apos;s climate. They have stronger immune systems, fewer genetic health issues, and shed less fur compared to long-haired breeds like Persians, which often struggle in our heat and humidity. Plus, by adopting, you are saving a life!
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="adoption-process" className="border border-slate-100 dark:border-zinc-800 rounded-xl px-4">
                                <AccordionTrigger className="hover:no-underline font-semibold text-left">
                                    What is the adoption process at Catwaala?
                                </AccordionTrigger>
                                <AccordionContent className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    1. Browse our available cats on the Adopt page.<br />
                                    2. Submit an application form for the cat you like.<br />
                                    3. We will call you for a short interview.<br />
                                    4. If approved, we may do a quick home check (video call or visit) to ensure safety (like netted windows).
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>

                    {/* Food & Diet */}
                    <div className="mb-10">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-slate-800 dark:text-slate-100">
                            <Utensils className="w-6 h-6 text-orange-500" /> Food & Diet in Bangladesh
                        </h2>
                        <Accordion type="single" collapsible className="w-full space-y-4">
                            <AccordionItem value="fish-rice" className="border border-slate-100 dark:border-zinc-800 rounded-xl px-4">
                                <AccordionTrigger className="hover:no-underline font-semibold text-left">
                                    Can I feed my cat fish and rice?
                                </AccordionTrigger>
                                <AccordionContent className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Yes, but with caution! <strong>Boiled fish (without bones)</strong> is great. Avoid raw fish as it can cause thiamine deficiency. Rice is okay in small amounts, but cats are obligate carnivores and need mostly protein (meat/fish). <strong>Never give milk</strong> to adult cats as most are lactose intolerant.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="cat-food-brands" className="border border-slate-100 dark:border-zinc-800 rounded-xl px-4">
                                <AccordionTrigger className="hover:no-underline font-semibold text-left">
                                    What cat food brands are available in Dhaka?
                                </AccordionTrigger>
                                <AccordionContent className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Popular and available brands include <strong>Lara, Reflex, Bonnie, and Whiskas</strong>. You can find them at pet shops in Katabon, Gulshan, or order online from sites like Chaldal or specialized pet supply shops.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>

                    {/* Health & Safety */}
                    <div className="mb-10">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-slate-800 dark:text-slate-100">
                            <Syringe className="w-6 h-6 text-green-500" /> Health & Vet Care
                        </h2>
                        <Accordion type="single" collapsible className="w-full space-y-4">
                            <AccordionItem value="vaccines" className="border border-slate-100 dark:border-zinc-800 rounded-xl px-4">
                                <AccordionTrigger className="hover:no-underline font-semibold text-left">
                                    What vaccines does a cat need in Bangladesh?
                                </AccordionTrigger>
                                <AccordionContent className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    1. <strong>Tricat / Ducat</strong> (Viral rhinotracheitis, Calicivirus, Panleukopenia): Yearly.<br />
                                    2. <strong>Rabies</strong>: Yearly.<br />
                                    Deworming should be done every 3 months. Check our &quot;Find a Vet&quot; page for clinics near you.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="neutering" className="border border-slate-100 dark:border-zinc-800 rounded-xl px-4">
                                <AccordionTrigger className="hover:no-underline font-semibold text-left">
                                    Why is Spaying/Neutering important?
                                </AccordionTrigger>
                                <AccordionContent className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    It prevents unwanted kittens (reducing the stray population), eliminates spraying/marking in males, and reduces the risk of cancers. It&apos;s a standard procedure available at most vet clinics in Dhaka.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>

                    {/* Apartment Living */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-slate-800 dark:text-slate-100">
                            <Home className="w-6 h-6 text-purple-500" /> Apartment Living
                        </h2>
                        <Accordion type="single" collapsible className="w-full space-y-4">
                            <AccordionItem value="litter-training" className="border border-slate-100 dark:border-zinc-800 rounded-xl px-4">
                                <AccordionTrigger className="hover:no-underline font-semibold text-left">
                                    How do I litter train a street cat?
                                </AccordionTrigger>
                                <AccordionContent className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Most cats instinctively use sand. keep a litter tray in a quiet corner. If you adopt a kitten, place them in the tray after meals. Cat litter (sand/bentonite) is available in pet shops and is better for odor control in apartments.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="netting" className="border border-slate-100 dark:border-zinc-800 rounded-xl px-4">
                                <AccordionTrigger className="hover:no-underline font-semibold text-left">
                                    Do I need to net my windows?
                                </AccordionTrigger>
                                <AccordionContent className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    <strong>Absolutely.</strong> High-rise syndrome is common in Dhaka apartments. Cats can slip and fall from balconies or windows while chasing birds or insects. Please install safety nets (pigeon nets work well) before bringing a cat home.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>

                </div>
            </div>
        </div>
    );
}
