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
        <div className="min-h-screen pb-24">
            {/* Back Button */}
            <div className="container mx-auto px-4 py-8">
                <Link href="/adopt">
                    <Button variant="ghost" className="gap-2 text-stone-500 hover:text-rose-600">
                        <ArrowLeft className="w-4 h-4" /> Back to Cats
                    </Button>
                </Link>
            </div>

            <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="relative aspect-[4/5] md:aspect-square rounded-3xl overflow-hidden glass-card shadow-xl shadow-rose-100/40">
                        <Image src={cat.imageUrl} alt={cat.name} fill className="object-cover" priority />
                        <div className="absolute top-4 right-4 flex gap-2">
                            <button className="p-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-md text-stone-400 hover:text-rose-500 transition-colors">
                                <Heart className="w-5 h-5" />
                            </button>
                            <button className="p-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-md text-stone-400 hover:text-blue-500 transition-colors">
                                <Share2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Details */}
                <div className="space-y-8">
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <h1 className="text-4xl md:text-6xl font-bold text-stone-800">{cat.name}</h1>
                            <span className={`px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-wider ${cat.tag === 'Urgent' ? 'bg-rose-500 text-white' :
                                cat.tag === 'New' ? 'bg-amber-500 text-white' : 'bg-emerald-50 text-emerald-700'
                                }`}>
                                {cat.tag || 'Available'}
                            </span>
                        </div>

                        <p className="text-xl text-stone-400 flex items-center gap-2 mb-6">
                            <MapPin className="w-5 h-5 text-rose-500" /> {cat.location}
                        </p>

                        <div className="grid grid-cols-3 gap-4 border-y border-amber-100/60 py-6">
                            <div className="text-center border-r border-amber-100/60 last:border-0">
                                <span className="block text-xs uppercase tracking-wider text-stone-400 mb-1">Breed</span>
                                <span className="font-bold text-stone-700 text-sm md:text-base">{cat.breed}</span>
                            </div>
                            <div className="text-center border-r border-amber-100/60 last:border-0">
                                <span className="block text-xs uppercase tracking-wider text-stone-400 mb-1">Age</span>
                                <span className="font-bold text-stone-700">{cat.age}</span>
                            </div>
                            <div className="text-center">
                                <span className="block text-xs uppercase tracking-wider text-stone-400 mb-1">Gender</span>
                                <span className="font-bold text-stone-700">{cat.gender}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-rose-600">
                            <Info className="w-5 h-5" /> About {cat.name}
                        </h3>
                        <p className="text-stone-500 leading-relaxed text-lg">
                            {cat.description}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-2">
                            {cat.temperamentTags.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-amber-50/70 rounded-lg text-sm text-stone-600 border border-amber-100/60">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-4 text-stone-800">Medical Status</h3>
                        <div className="flex flex-wrap gap-3">
                            {cat.vaccinated && <span className="px-4 py-2 bg-green-50 text-green-700 rounded-xl text-sm font-medium flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Vaccinated</span>}
                            {cat.neutered && <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-sm font-medium flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Spayed/Neutered</span>}
                            {cat.goodWithKids ? (
                                <span className="px-4 py-2 bg-purple-50 text-purple-700 rounded-xl text-sm font-medium flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Good with Kids</span>
                            ) : (
                                <span className="px-4 py-2 bg-orange-50 text-orange-700 rounded-xl text-sm font-medium flex items-center gap-2">Best in quiet home</span>
                            )}
                        </div>
                    </div>

                    <div className="pt-6 border-t border-amber-100/60">
                        <h3 className="text-2xl font-bold mb-6 text-stone-800">Adopt {cat.name}</h3>
                        <AdoptionForm catName={cat.name} />
                    </div>
                </div>
            </div>
        </div>
    );
}
