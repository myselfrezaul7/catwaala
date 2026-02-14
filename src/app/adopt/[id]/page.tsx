"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MapPin, Info, CheckCircle, ArrowLeft, Share2, Heart, Calendar, PawPrint, Sparkles, ChevronDown, Gift } from "lucide-react";
import { AdoptionForm } from "@/components/adopt/AdoptionForm";
import { SponsorshipModal } from "@/components/adopt/SponsorshipModal";
import { CatService, Cat } from "@/services/CatService";
import { motion, AnimatePresence } from "framer-motion";

export default function CatDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const [cat, setCat] = useState<any>(null); // Using any for UI adapted object
    const [loading, setLoading] = useState(true);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const fetchCat = async () => {
            try {
                const dbCat = await CatService.getById(id);
                if (dbCat) {
                    // Adapting DB data to UI format
                    const fallbackId = (id.charCodeAt(0) % 3) + 1;
                    const adaptedCat = {
                        ...dbCat,
                        tag: dbCat.status === 'Adopted' ? 'Adopted' : dbCat.status === 'Available' ? 'Ready for Love' : dbCat.status,
                        // Enhanced location text
                        location: dbCat.location,
                        breed: dbCat.breed || "Domestic Short Hair",
                        age: formatAge(dbCat.age),
                        imageUrl: dbCat.images?.[0] || `/assets/cat${fallbackId}.jpg`,
                        temperamentTags: [
                            dbCat.attributes.goodWithKids ? "Good with Kids" : "Quiet Home",
                            dbCat.attributes.vaccinated ? "Health Checked" : null,
                            dbCat.attributes.neutered ? "Sterilized" : null,
                            dbCat.gender === 'Female' ? "Sweet Soul" : "Playful Spirit",
                            "Cuddle Bug" // Adding a cute default tag
                        ].filter(Boolean) as string[]
                    };
                    setCat(adaptedCat);
                }
            } catch (error) {
                console.error("Failed to fetch cat", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCat();

        const handleScroll = () => setScrolled(window.scrollY > 100);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-50">
                <div className="w-16 h-16 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin" />
            </div>
        );
    }

    if (!cat) {
        return notFound();
    }

    return (
        <div className="min-h-screen bg-[#FFFDF8] pb-32">
            {/* Top Navigation Overlay */}
            <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-2" : "bg-transparent py-4"}`}>
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <Link href="/adopt">
                        <Button variant="ghost" className={`gap-2 rounded-full ${scrolled ? "bg-white hover:bg-rose-50 text-stone-600" : "bg-black/20 hover:bg-black/30 text-white backdrop-blur-md"}`}>
                            <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Back to Cats</span>
                        </Button>
                    </Link>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className={`rounded-full ${scrolled ? "bg-white hover:bg-rose-50 text-stone-600" : "bg-black/20 hover:bg-black/30 text-white backdrop-blur-md"}`}>
                            <Share2 className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className={`rounded-full ${scrolled ? "bg-white hover:bg-rose-50 text-rose-500" : "bg-black/20 hover:bg-black/30 text-white backdrop-blur-md"}`}>
                            <Heart className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Immersive Hero Section */}
            <div className="relative h-[85vh] w-full overflow-hidden">
                <Image
                    src={cat.imageUrl}
                    alt={cat.name}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

                {/* Floating Content Card */}
                <div className="absolute bottom-0 left-0 w-full p-4 md:p-8 flex justify-center">
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="w-full max-w-4xl glass-card rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden backdrop-blur-xl bg-white/70 border border-white/40 shadow-2xl shadow-stone-900/10"
                    >
                        {/* Decorative background blob */}
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-rose-200/40 rounded-full blur-3xl pointer-events-none" />

                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${cat.tag === 'Adopted' ? 'bg-stone-100 text-stone-500' : 'bg-gradient-to-r from-rose-500 to-rose-600 text-white'
                                        }`}>
                                        {cat.tag}
                                    </span>
                                    <span className="flex items-center gap-1 text-stone-500 font-medium text-sm">
                                        <MapPin className="w-4 h-4 text-emerald-500" /> {cat.location}
                                    </span>
                                </div>
                                <h1 className="text-5xl md:text-7xl font-bold text-stone-800 tracking-tight leading-none mb-2">
                                    {cat.name}
                                </h1>
                                <p className="text-lg md:text-xl text-stone-500 font-medium">{cat.breed} • {cat.gender}</p>
                            </div>

                            {/* Key Stats Buttons */}
                            <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                                <div className="flex flex-col items-center justify-center bg-white/60 rounded-2xl p-4 min-w-[90px] backdrop-blur-sm border border-white/50">
                                    <Calendar className="w-6 h-6 text-rose-500 mb-1" />
                                    <span className="text-xs font-bold text-stone-400 uppercase">Age</span>
                                    <span className="font-bold text-stone-700">{cat.age}</span>
                                </div>
                                <div className="flex flex-col items-center justify-center bg-white/60 rounded-2xl p-4 min-w-[90px] backdrop-blur-sm border border-white/50">
                                    <PawPrint className="w-6 h-6 text-amber-500 mb-1" />
                                    <span className="text-xs font-bold text-stone-400 uppercase">Size</span>
                                    <span className="font-bold text-stone-700">Medium</span>
                                </div>
                                <div className="flex flex-col items-center justify-center bg-white/60 rounded-2xl p-4 min-w-[90px] backdrop-blur-sm border border-white/50">
                                    <Sparkles className="w-6 h-6 text-emerald-500 mb-1" />
                                    <span className="text-xs font-bold text-stone-400 uppercase">Health</span>
                                    <span className="font-bold text-stone-700">Good</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ delay: 1, duration: 2, repeat: Infinity }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 hidden md:flex flex-col items-center gap-1"
                >
                    <span className="text-xs uppercase tracking-widest font-light">Scroll for more</span>
                    <ChevronDown className="w-5 h-5" />
                </motion.div>
            </div>

            <div className="container mx-auto px-4 mt-12 max-w-5xl">
                <div className="grid md:grid-cols-[1.5fr,1fr] gap-12">
                    {/* Left Column: Story & Info */}
                    <div className="space-y-12">
                        {/* Personality Profile */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-[100px] -z-0" />
                            <h2 className="text-3xl font-bold text-stone-800 mb-6 flex items-center gap-3 relative z-10">
                                <span className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
                                    <Info className="w-6 h-6" />
                                </span>
                                Meet {cat.name}
                            </h2>
                            <div className="prose prose-stone prose-lg text-stone-600 leading-relaxed relative z-10">
                                <p className="mb-4 first-letter:text-5xl first-letter:font-bold first-letter:text-rose-500 first-letter:mr-3 first-letter:float-left">
                                    {cat.description}
                                </p>
                                <p>
                                    I am looking for a forever home where I can get lots of cuddles and treats.
                                    If you think we could be best friends, please come meet me!
                                </p>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-3 mt-8">
                                {cat.temperamentTags.map((tag: string) => (
                                    <span key={tag} className="px-4 py-2 bg-stone-50 rounded-xl text-sm font-semibold text-stone-600 border border-stone-200 flex items-center gap-2">
                                        # {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.section>

                        {/* Medical History */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <h3 className="text-2xl font-bold text-stone-800 mb-6">Medical History</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <MedicalCard
                                    active={cat.attributes.vaccinated}
                                    label="Vaccinated"
                                    icon={<CheckCircle className="w-5 h-5" />}
                                    color="text-emerald-600"
                                    bg="bg-emerald-50"
                                />
                                <MedicalCard
                                    active={cat.attributes.neutered}
                                    label="Spayed/Neutered"
                                    icon={<CheckCircle className="w-5 h-5" />}
                                    color="text-emerald-600"
                                    bg="bg-emerald-50"
                                />
                                <MedicalCard
                                    active={true}
                                    label="Dewormed"
                                    icon={<CheckCircle className="w-5 h-5" />}
                                    color="text-emerald-600"
                                    bg="bg-emerald-50"
                                />
                                <MedicalCard
                                    active={!cat.attributes.goodWithKids}
                                    label="Special Needs"
                                    icon={<Info className="w-5 h-5" />}
                                    color="text-amber-600"
                                    bg="bg-amber-50"
                                    text={cat.attributes.goodWithKids ? "None" : "Prefers quiet home"}
                                />
                            </div>
                        </motion.section>
                    </div>

                    {/* Right Column: Sticky Adoption Form (Desktop) */}
                    <div className="md:sticky md:top-24 h-fit">
                        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-rose-100/50 border border-rose-100 mb-6">
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
                                </div>
                                <h3 className="text-2xl font-bold text-stone-800 mb-2">Ready to Adopt?</h3>
                                <p className="text-stone-500">
                                    Fill out the form below to start your journey with {cat.name}.
                                </p>
                            </div>
                            <AdoptionForm catName={cat.name} />
                        </div>

                        {/* Sponsorship CTA */}
                        <div className="bg-gradient-to-br from-indigo-900 to-stone-900 rounded-3xl p-8 text-white text-center relative overflow-hidden shadow-xl">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Gift className="w-32 h-32 rotate-12" />
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-2">Can't Adopt Right Now?</h3>
                                <p className="text-indigo-200 text-sm mb-6">
                                    You can still be a hero! Sponsor {cat.name}'s meals or vaccines today.
                                </p>
                                <SponsorshipModal catName={cat.name} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Sticky CTA */}
            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-stone-200 p-4 md:hidden z-50 flex items-center gap-4 safe-area-pb">
                <div className="flex-1">
                    <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">Adopting</p>
                    <p className="font-bold text-lg text-stone-800 leading-none">{cat.name}</p>
                </div>
                <Button size="lg" className="rounded-xl bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-500/30 px-8" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
                    Adopt Me <Heart className="w-4 h-4 ml-2 fill-white" />
                </Button>
            </div>
        </div>
    );
}

function MedicalCard({ active, label, icon, color, bg, text }: any) {
    if (!active && !text) return null;
    return (
        <div className={`flex items-center gap-4 p-4 rounded-2xl border transition-all hover:scale-[1.02] ${active ? `border-transparent ${bg}` : 'border-stone-100 bg-stone-50'
            }`}>
            <div className={`p-2 rounded-xl ${active ? 'bg-white/60' : 'bg-stone-200/50'} ${color}`}>
                {icon}
            </div>
            <div>
                <p className={`font-bold text-sm ${active ? 'text-stone-800' : 'text-stone-500'}`}>{label}</p>
                {text && <p className="text-xs text-stone-500 mt-0.5">{text}</p>}
            </div>
        </div>
    );
}

function formatAge(ageInMonths: number): string {
    if (ageInMonths < 12) return `${ageInMonths} mo`;
    const years = Math.floor(ageInMonths / 12);
    return `${years} yr${years > 1 ? 's' : ''}`;
}
