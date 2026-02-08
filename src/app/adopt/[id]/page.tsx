import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { cats } from "@/data/cats";
import { Button } from "@/components/ui/button";
import { MapPin, Info, CheckCircle, ArrowLeft, Share2, Heart } from "lucide-react";
import { AdoptionForm } from "@/components/adopt/AdoptionForm";

type Props = {
    params: Promise<{ id: string }>;
};

export default async function CatDetailPage({ params }: Props) {
    const { id } = await params;
    const cat = cats.find(c => c.id === id);

    if (!cat) {
        return notFound();
    }

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 pb-24">
            {/* Back Button */}
            <div className="container mx-auto px-4 py-8">
                <Link href="/adopt">
                    <Button variant="ghost" className="gap-2 text-slate-500 hover:text-rose-600">
                        <ArrowLeft className="w-4 h-4" /> Back to Cats
                    </Button>
                </Link>
            </div>

            <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="relative aspect-[4/5] md:aspect-square rounded-3xl overflow-hidden border border-rose-100 dark:border-zinc-800 shadow-xl shadow-rose-100/50 dark:shadow-none">
                        <Image src={cat.imageUrl} alt={cat.name} fill className="object-cover" priority />
                        <div className="absolute top-4 right-4 flex gap-2">
                            <button className="p-3 bg-white/90 rounded-full shadow-md text-slate-400 hover:text-rose-500 transition-colors">
                                <Heart className="w-5 h-5" />
                            </button>
                            <button className="p-3 bg-white/90 rounded-full shadow-md text-slate-400 hover:text-blue-500 transition-colors">
                                <Share2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Details */}
                <div className="space-y-8">
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <h1 className="text-4xl md:text-6xl font-bold font-heading text-slate-900 dark:text-slate-100">{cat.name}</h1>
                            <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider ${cat.tag === 'Urgent' ? 'bg-rose-500 text-white' :
                                cat.tag === 'New' ? 'bg-indigo-500 text-white' : 'bg-green-100 text-green-700 dark:bg-zinc-800 dark:text-green-400'
                                }`}>
                                {cat.tag || 'Available'}
                            </span>
                        </div>

                        <p className="text-xl text-slate-500 dark:text-slate-400 flex items-center gap-2 mb-6">
                            <MapPin className="w-5 h-5 text-rose-500" /> {cat.location}
                        </p>

                        <div className="grid grid-cols-3 gap-4 border-y border-rose-100 dark:border-zinc-800 py-6">
                            <div className="text-center border-r border-rose-100 dark:border-zinc-800 last:border-0">
                                <span className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Breed</span>
                                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm md:text-base">{cat.breed}</span>
                            </div>
                            <div className="text-center border-r border-rose-100 dark:border-zinc-800 last:border-0">
                                <span className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Age</span>
                                <span className="font-bold text-slate-800 dark:text-slate-200">{cat.age}</span>
                            </div>
                            <div className="text-center">
                                <span className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Gender</span>
                                <span className="font-bold text-slate-800 dark:text-slate-200">{cat.gender}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-rose-600 dark:text-rose-400">
                            <Info className="w-5 h-5" /> About {cat.name}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                            {cat.description}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-2">
                            {cat.temperamentTags.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-slate-100 dark:bg-zinc-800 rounded-lg text-sm text-slate-600 dark:text-slate-300">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-4">Medical Status</h3>
                        <div className="flex flex-wrap gap-3">
                            {cat.vaccinated && <span className="px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg text-sm font-medium flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Vaccinated</span>}
                            {cat.neutered && <span className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg text-sm font-medium flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Spayed/Neutered</span>}
                            {cat.goodWithKids ? (
                                <span className="px-4 py-2 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-lg text-sm font-medium flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Good with Kids</span>
                            ) : (
                                <span className="px-4 py-2 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 rounded-lg text-sm font-medium flex items-center gap-2">Best in quiet home</span>
                            )}
                        </div>
                    </div>

                    <div className="pt-6 border-t border-rose-100 dark:border-zinc-800">
                        <h3 className="text-2xl font-bold mb-6 font-heading text-slate-900 dark:text-white">Adopt {cat.name}</h3>
                        <AdoptionForm catName={cat.name} />
                    </div>
                </div>
            </div>
        </div>
    );
}
