import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Cat, Syringe, Home, Utensils } from "lucide-react";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cat Care FAQ",
    description: "Answers to common questions about cat adoption, diet, health, and apartment living in Bangladesh Context.",
};

export default function FAQPage() {
    return (
        <div className="min-h-screen bg-[#FFFDF8] dark:bg-zinc-950 pb-24">
            {/* Header */}
            <div className="bg-rose-50 dark:bg-zinc-900/50 py-20 text-center px-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
                <div className="container mx-auto relative z-10 max-w-2xl">
                    <div className="inline-block p-3 rounded-2xl bg-white dark:bg-zinc-800 shadow-sm border border-rose-100 dark:border-zinc-800 mb-6">
                        <HelpCircle className="w-8 h-8 text-rose-500" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 font-heading text-rose-950 dark:text-rose-50">
                        Cat Care <span className="text-rose-500">FAQ</span>
                    </h1>
                    <p className="text-xl text-stone-600 dark:text-stone-400 leading-relaxed">
                        Expert answers for your feline queries. Adopting, feeding, and keeping them purrfectly happy.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-20 max-w-4xl">

                {/* Adoption & Deshi Cats */}
                <div className="mb-8">
                    <div className="glass-card bg-white/60 dark:bg-zinc-900/60 rounded-[2rem] p-8 shadow-xl border border-rose-100/50">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-stone-800 dark:text-white pb-4 border-b border-rose-100 dark:border-zinc-800">
                            <div className="p-2 bg-rose-100 dark:bg-rose-900/30 rounded-xl text-rose-600 dark:text-rose-400">
                                <Cat className="w-6 h-6" />
                            </div>
                            Adoption & &quot;Deshi&quot; Cats
                        </h2>
                        <Accordion type="single" collapsible className="w-full space-y-4">
                            <AccordionItem value="deshi-cats" className="border border-rose-100/60 dark:border-zinc-800 rounded-xl px-2 data-[state=open]:bg-white/50 dark:data-[state=open]:bg-zinc-800/50 transition-colors">
                                <AccordionTrigger className="hover:no-underline font-bold text-left px-4 text-lg py-4 text-stone-800 dark:text-stone-200">
                                    Why adopt a &quot;Deshi&quot; cat?
                                </AccordionTrigger>
                                <AccordionContent className="text-stone-600 dark:text-stone-400 leading-relaxed px-4 pb-4 text-base">
                                    Local deshi cats are <strong>built for Bangladesh</strong>. They are healthier, smarter, and need less grooming than foreign breeds like Persians, who often suffer from heatstroke and kidney issues here. Deshi cats are low-maintenance bundles of love!
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="adoption-process" className="border border-rose-100/60 dark:border-zinc-800 rounded-xl px-2 data-[state=open]:bg-white/50 dark:data-[state=open]:bg-zinc-800/50 transition-colors">
                                <AccordionTrigger className="hover:no-underline font-bold text-left px-4 text-lg py-4 text-stone-800 dark:text-stone-200">
                                    How to adopt from Catwaala?
                                </AccordionTrigger>
                                <AccordionContent className="text-stone-600 dark:text-stone-400 leading-relaxed px-4 pb-4 text-base">
                                    It&apos;s simple:
                                    1. Browse the <strong>Adopt</strong> page.
                                    2. Apply for your favorite furball.
                                    3. Quick chat & Home safety check (netted windows are a must!).
                                    4. Take them home and start your journey!
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="adoption-fee" className="border border-rose-100/60 dark:border-zinc-800 rounded-xl px-2 data-[state=open]:bg-white/50 dark:data-[state=open]:bg-zinc-800/50 transition-colors">
                                <AccordionTrigger className="hover:no-underline font-bold text-left px-4 text-lg py-4 text-stone-800 dark:text-stone-200">
                                    Is there an adoption fee?
                                </AccordionTrigger>
                                <AccordionContent className="text-stone-600 dark:text-stone-400 leading-relaxed px-4 pb-4 text-base">
                                    Catwaala does <strong>not charge adoption fees</strong>. However, we ask adopters to cover the cost of vaccinations and neutering/spaying if the cat hasn&apos;t been treated yet. This ensures every cat goes home healthy.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="return-policy" className="border border-rose-100/60 dark:border-zinc-800 rounded-xl px-2 data-[state=open]:bg-white/50 dark:data-[state=open]:bg-zinc-800/50 transition-colors">
                                <AccordionTrigger className="hover:no-underline font-bold text-left px-4 text-lg py-4 text-stone-800 dark:text-stone-200">
                                    What if the adoption doesn&apos;t work out?
                                </AccordionTrigger>
                                <AccordionContent className="text-stone-600 dark:text-stone-400 leading-relaxed px-4 pb-4 text-base">
                                    We have a <strong>no-questions-asked return policy</strong>. If for any reason you cannot keep the cat, please contact us and we will take them back. We never want a cat to end up on the streets again.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>

                {/* Diet */}
                <div className="mb-8">
                    <div className="glass-card bg-white/60 dark:bg-zinc-900/60 rounded-[2rem] p-8 shadow-xl border border-rose-100/50">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-stone-800 dark:text-white pb-4 border-b border-rose-100 dark:border-zinc-800">
                            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-xl text-amber-600 dark:text-amber-400">
                                <Utensils className="w-6 h-6" />
                            </div>
                            Food & Nutrition
                        </h2>
                        <Accordion type="single" collapsible className="w-full space-y-4">
                            <AccordionItem value="fish" className="border border-rose-100/60 dark:border-zinc-800 rounded-xl px-2 data-[state=open]:bg-white/50 dark:data-[state=open]:bg-zinc-800/50 transition-colors">
                                <AccordionTrigger className="hover:no-underline font-bold text-left px-4 text-lg py-4 text-stone-800 dark:text-stone-200">
                                    Can I feed my cat milk and fish?
                                </AccordionTrigger>
                                <AccordionContent className="text-stone-600 dark:text-stone-400 leading-relaxed px-4 pb-4 text-base">
                                    <strong>NO Milk!</strong> Most cats are lactose intolerant and will get an upset stomach. <br />
                                    <strong>Boiled Fish</strong> (boneless) is great. Raw fish can destroy vitamins. Dry cat food or wet food pouches are the most balanced option.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="toxic-foods" className="border border-rose-100/60 dark:border-zinc-800 rounded-xl px-2 data-[state=open]:bg-white/50 dark:data-[state=open]:bg-zinc-800/50 transition-colors">
                                <AccordionTrigger className="hover:no-underline font-bold text-left px-4 text-lg py-4 text-stone-800 dark:text-stone-200">
                                    What foods are toxic to cats?
                                </AccordionTrigger>
                                <AccordionContent className="text-stone-600 dark:text-stone-400 leading-relaxed px-4 pb-4 text-base">
                                    <strong>Onions, garlic, chocolate, grapes, and raisins</strong> are all highly toxic to cats. Also avoid giving them raw eggs and caffeine. When in doubt, stick to quality commercial cat food or plain boiled chicken/fish.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="best-food" className="border border-rose-100/60 dark:border-zinc-800 rounded-xl px-2 data-[state=open]:bg-white/50 dark:data-[state=open]:bg-zinc-800/50 transition-colors">
                                <AccordionTrigger className="hover:no-underline font-bold text-left px-4 text-lg py-4 text-stone-800 dark:text-stone-200">
                                    What are the best cat food brands available in Bangladesh?
                                </AccordionTrigger>
                                <AccordionContent className="text-stone-600 dark:text-stone-400 leading-relaxed px-4 pb-4 text-base">
                                    <strong>Royal Canin, Me-O, and Whiskas</strong> are widely available. For premium options, <strong>Orijen and Acana</strong> can be found at specialty pet stores. A mix of dry kibble and occasional wet food pouches provides the best nutrition.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>

                {/* Safety */}
                <div className="mb-12">
                    <div className="glass-card bg-white/60 dark:bg-zinc-900/60 rounded-[2rem] p-8 shadow-xl border border-rose-100/50">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-stone-800 dark:text-white pb-4 border-b border-rose-100 dark:border-zinc-800">
                            <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-xl text-teal-600 dark:text-teal-400">
                                <Home className="w-6 h-6" />
                            </div>
                            Home Safety
                        </h2>
                        <Accordion type="single" collapsible className="w-full space-y-4">
                            <AccordionItem value="windows" className="border border-rose-100/60 dark:border-zinc-800 rounded-xl px-2 data-[state=open]:bg-white/50 dark:data-[state=open]:bg-zinc-800/50 transition-colors">
                                <AccordionTrigger className="hover:no-underline font-bold text-left px-4 text-lg py-4 text-stone-800 dark:text-stone-200">
                                    Why do I need to net my windows?
                                </AccordionTrigger>
                                <AccordionContent className="text-stone-600 dark:text-stone-400 leading-relaxed px-4 pb-4 text-base">
                                    <strong>High-Rise Syndrome.</strong> Cats see a bird, jump, and fall. In Dhaka, this is the #1 cause of unnecessary cat injury/death. Simple pigeon netting (available at any hardware store) saves lives. We <strong>require</strong> this for all adoptions.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="vaccines" className="border border-rose-100/60 dark:border-zinc-800 rounded-xl px-2 data-[state=open]:bg-white/50 dark:data-[state=open]:bg-zinc-800/50 transition-colors">
                                <AccordionTrigger className="hover:no-underline font-bold text-left px-4 text-lg py-4 text-stone-800 dark:text-stone-200">
                                    What vaccines does my cat need?
                                </AccordionTrigger>
                                <AccordionContent className="text-stone-600 dark:text-stone-400 leading-relaxed px-4 pb-4 text-base">
                                    All cats should receive a <strong>Tricat/FVRCP vaccine</strong> (protects against feline distemper, calicivirus, and rhinotracheitis) and a <strong>Rabies vaccine</strong>. Kittens need a series of shots starting at 8 weeks. Boosters are required annually.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="balcony" className="border border-rose-100/60 dark:border-zinc-800 rounded-xl px-2 data-[state=open]:bg-white/50 dark:data-[state=open]:bg-zinc-800/50 transition-colors">
                                <AccordionTrigger className="hover:no-underline font-bold text-left px-4 text-lg py-4 text-stone-800 dark:text-stone-200">
                                    Is it safe to let my cat on the balcony?
                                </AccordionTrigger>
                                <AccordionContent className="text-stone-600 dark:text-stone-400 leading-relaxed px-4 pb-4 text-base">
                                    <strong>Only with a fully enclosed net or mesh.</strong> Even cats who seem cautious can leap after a bird or insect. A simple ৳500 pigeon net from your local hardware store can be the difference between life and death. Never leave a balcony unnetted.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>

                {/* Contact CTA */}
                <div className="text-center bg-gradient-to-br from-stone-800 to-stone-950 rounded-[2rem] p-12 relative overflow-hidden text-white shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                    <h3 className="text-2xl font-bold mb-4 relative z-10">Have specialized questions?</h3>
                    <p className="text-stone-400 mb-8 relative z-10">Join our community and ask our vet experts.</p>
                    <a href="https://www.facebook.com/groups/catwaala" target="_blank" rel="noopener noreferrer" className="relative z-10 inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-105 shadow-lg shadow-rose-900/20">
                        Ask in Facebook Group
                    </a>
                </div>

            </div>
        </div>
    );
}
