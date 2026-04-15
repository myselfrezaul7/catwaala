"use client";

import { useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Cat, Syringe, Home, Utensils, ArrowRight, Search, Filter } from "lucide-react";
import { motion } from "framer-motion";

export default function FAQPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("all");

    // Pre-organized FAQ data
    const faqData = [
        {
            category: "adoption",
            icon: Cat,
            color: "rose",
            title: 'Adoption & "Deshi" Cats',
            items: [
                {
                    id: "deshi-cats",
                    q: 'Why adopt a "Deshi" cat?',
                    a: <>Local deshi cats are <strong>built for Bangladesh</strong>. They are healthier, smarter, and need less grooming than foreign breeds like Persians, who often suffer from heatstroke and kidney issues here. Deshi cats are low-maintenance bundles of love!</>
                },
                {
                    id: "adoption-process",
                    q: 'How to adopt from Catwaala?',
                    a: <>It&apos;s simple:<br />1. Browse the <strong>Adopt</strong> page.<br />2. Apply for your favorite furball.<br />3. Quick chat & Home safety check (netted windows are a must!).<br />4. Take them home and start your journey!</>
                },
                {
                    id: "adoption-fee",
                    q: 'Is there an adoption fee?',
                    a: <>Catwaala does <strong>not charge adoption fees</strong>. However, we ask adopters to cover the cost of vaccinations and neutering/spaying if the cat hasn&apos;t been treated yet. This ensures every cat goes home healthy.</>
                },
                {
                    id: "return-policy",
                    q: 'What if the adoption doesn&apos;t work out?',
                    a: <>We have a <strong>no-questions-asked return policy</strong>. If for any reason you cannot keep the cat, please contact us and we will take them back. We never want a cat to end up on the streets again.</>
                }
            ]
        },
        {
            category: "diet",
            icon: Utensils,
            color: "amber",
            title: 'Food & Nutrition',
            items: [
                {
                    id: "fish",
                    q: 'Can I feed my cat milk and fish?',
                    a: <><strong>NO Milk!</strong> Most cats are lactose intolerant and will get an upset stomach. <br /><strong>Boiled Fish</strong> (boneless) is great. Raw fish can destroy vitamins. Dry cat food or wet food pouches are the most balanced option.</>
                },
                {
                    id: "toxic-foods",
                    q: 'What foods are toxic to cats?',
                    a: <><strong>Onions, garlic, chocolate, grapes, and raisins</strong> are all highly toxic to cats. Also avoid giving them raw eggs and caffeine. When in doubt, stick to quality commercial cat food or plain boiled chicken/fish.</>
                },
                {
                    id: "best-food",
                    q: 'What are the best cat food brands available in Bangladesh?',
                    a: <><strong>Royal Canin, Me-O, and Whiskas</strong> are widely available. For premium options, <strong>Orijen and Acana</strong> can be found at specialty pet stores. A mix of dry kibble and occasional wet food pouches provides the best nutrition.</>
                }
            ]
        },
        {
            category: "safety",
            icon: Home,
            color: "teal",
            title: 'Home Safety',
            items: [
                {
                    id: "windows",
                    q: 'Why do I need to net my windows?',
                    a: <><strong>High-Rise Syndrome.</strong> Cats see a bird, jump, and fall. In Dhaka, this is the #1 cause of unnecessary cat injury/death. Simple pigeon netting (available at any hardware store) saves lives. We <strong>require</strong> this for all adoptions.</>
                },
                {
                    id: "vaccines",
                    q: 'What vaccines does my cat need?',
                    a: <>All cats should receive a <strong>Tricat/FVRCP vaccine</strong> (protects against feline distemper, calicivirus, and rhinotracheitis) and a <strong>Rabies vaccine</strong>. Kittens need a series of shots starting at 8 weeks. Boosters are required annually.</>
                },
                {
                    id: "balcony",
                    q: 'Is it safe to let my cat on the balcony?',
                    a: <><strong>Only with a fully enclosed net or mesh.</strong> Even cats who seem cautious can leap after a bird or insect. A simple ৳500 pigeon net from your local hardware store can be the difference between life and death. Never leave a balcony unnetted.</>
                }
            ]
        }
    ];

    // Filter Logic
    const filteredCategories = faqData.map(category => {
        // If searching, ignore tabs
        if (searchQuery.trim() !== "") {
            const query = searchQuery.toLowerCase();
            const matchedItems = category.items.filter(item =>
                item.q.toLowerCase().includes(query) ||
                item.a.toString().toLowerCase().includes(query) // simplistic text match for react nodes
            );
            return { ...category, items: matchedItems };
        }

        // If not searching, use tabs
        if (activeTab === "all" || activeTab === category.category) {
            return category;
        }

        // Tab doesn't match
        return { ...category, items: [] };
    }).filter(category => category.items.length > 0);
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
                {/* Search & Tabs Controls */}
                <div className="sticky top-[16px] transition-[top] duration-300 z-30 glass-card bg-white/80 dark:bg-zinc-900/80 rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-6 shadow-xl border border-rose-100/50 mb-10 backdrop-blur-xl">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        {/* Tabs */}
                        <div className="relative w-full md:w-auto -mx-2 px-2 md:mx-0 md:px-0">
                            {/* Fade Gradients for Mobile Hinting */}
                            <div className="absolute top-0 bottom-0 left-0 w-6 bg-gradient-to-r from-white dark:from-zinc-900 to-transparent z-10 pointer-events-none md:hidden block h-full rounded-l-[1.5rem]" />
                            <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-white dark:from-zinc-900 to-transparent z-10 pointer-events-none md:hidden block h-full rounded-r-[1.5rem]" />
                            
                            <div className="flex bg-rose-50 dark:bg-zinc-800/50 p-1.5 rounded-2xl w-full md:w-auto overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                {[
                                    { id: 'all', label: 'All FAQs' },
                                    { id: 'adoption', label: 'Adoption' },
                                    { id: 'diet', label: 'Diet & Food' },
                                    { id: 'safety', label: 'Safety' },
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => { setActiveTab(tab.id); setSearchQuery(""); }}
                                        className={`px-5 py-2.5 rounded-xl h-11 text-sm font-bold whitespace-nowrap shrink-0 transition-all duration-300 ${activeTab === tab.id && searchQuery === ""
                                            ? "bg-white dark:bg-zinc-700 text-rose-600 dark:text-rose-400 shadow-sm"
                                            : "text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-white/50 dark:hover:bg-zinc-700/50"
                                            }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Search */}
                        <div className="relative w-full md:w-72">
                            <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-stone-400" />
                            <input
                                type="text"
                                placeholder="Search questions..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 md:pl-12 pr-4 h-11 rounded-xl bg-white dark:bg-zinc-950 border border-stone-200 dark:border-zinc-800 focus:border-rose-400 focus:ring-1 focus:ring-rose-400 outline-none transition-all text-sm font-medium placeholder:text-stone-400 shadow-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Filtered Content */}
                {filteredCategories.length > 0 ? (
                    filteredCategories.map((category) => {
                        const Icon = category.icon;
                        const catColor = category.color; // Used to template Tailwind classes dynamically requires safe-list or full names. We will use conditional rendering or standard variables.

                        // We map the color string to actual tailwind classes for the header badge
                        const badgeClasses = {
                            "rose": "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400",
                            "amber": "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
                            "teal": "bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400",
                        }[category.color] || "bg-stone-100 text-stone-600";

                        return (
                            <motion.div
                                key={category.category}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5 }}
                                className="mb-8"
                            >
                                <div className="glass-card bg-white/70 dark:bg-zinc-900/70 rounded-[2rem] p-6 text-stone-300 md:p-8 shadow-md border border-stone-100 dark:border-zinc-800">
                                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-stone-800 dark:text-white pb-4 border-b border-stone-100 dark:border-zinc-800">
                                        <div className={`p-2 rounded-xl ${badgeClasses}`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        {category.title}
                                    </h2>
                                    <Accordion type="single" collapsible className="w-full space-y-4">
                                        {category.items.map((item) => (
                                            <AccordionItem key={item.id} value={item.id} className="border border-stone-100 dark:border-zinc-800 rounded-xl px-2 data-[state=open]:bg-white/80 dark:data-[state=open]:bg-zinc-800/80 data-[state=open]:shadow-sm transition-all overflow-hidden">
                                                <AccordionTrigger className="hover:no-underline font-bold text-left px-4 text-lg py-4 text-stone-800 dark:text-stone-200 hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                                                    {item.q}
                                                </AccordionTrigger>
                                                <AccordionContent className="text-stone-600 dark:text-stone-400 leading-relaxed px-4 pb-4 text-base">
                                                    {item.a}
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </div>
                            </motion.div>
                        );
                    })
                ) : (
                    <div className="text-center py-20 bg-white/50 dark:bg-zinc-900/50 rounded-[2rem] border border-stone-100 dark:border-zinc-800 shadow-inner">
                        <div className="inline-flex w-16 h-16 rounded-full bg-stone-100 dark:bg-zinc-800 items-center justify-center mb-4">
                            <Search className="w-8 h-8 text-stone-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-stone-800 dark:text-white mb-2">No Matching Questions</h3>
                        <p className="text-stone-500 max-w-md mx-auto">We couldn't find any FAQs matching "{searchQuery}". Try using different keywords or browsing the tabs above.</p>
                        <button
                            onClick={() => { setSearchQuery(""); setActiveTab("all"); }}
                            className="mt-6 px-6 py-2.5 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-700 font-bold transition-colors"
                        >
                            Clear Search
                        </button>
                    </div>
                )}

                {/* Contact CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5 }}
                    className="relative glass-card border-none bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950/40 dark:to-emerald-950/40 p-12 overflow-hidden shadow-2xl"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                    <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Join our Facebook group to connect with other rescuers, ask for advice, or share your own success stories!
                    </p>
                    <a href="https://www.facebook.com/catwaalaa" target="_blank" rel="noopener noreferrer" className="relative z-10 inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-105 shadow-lg shadow-rose-900/20">
                        Join the Community <ArrowRight className="w-5 h-5" />
                    </a>
                </motion.div>

            </div>
        </div>
    );
}
