"use client";

import Image from "next/image";
import { Quote, ChevronLeft, ChevronRight, Star, Heart } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";

const successStories = [
    {
        id: 1,
        cat: "Luna",
        adopter: "Sarah & Tom",
        image: "/assets/cat1.png",
        months: 12,
        quote: "Luna has brought so much joy to our home. She's the perfect cuddle buddy!"
    },
    {
        id: 2,
        cat: "Oliver",
        adopter: "The Rahman Family",
        image: "/assets/cat2.png",
        months: 8,
        quote: "We can't imagine life without Oliver now. Thank you Catwaala!"
    },
    {
        id: 3,
        cat: "Mochi",
        adopter: "Anita",
        image: "/assets/cat3.png",
        months: 24,
        quote: "From a shy stray to a confident queen. Watching her transform has been magical."
    },
    {
        id: 4,
        cat: "Simba",
        adopter: "Kamal",
        image: "/assets/cat4.png",
        months: 5,
        quote: "Simba is the king of our castle. Best decision ever."
    },
    {
        id: 5,
        cat: "Nala",
        adopter: "Priya",
        image: "/assets/cat5.png",
        months: 14,
        quote: "She purrs non-stop! Thank you for rescuing this angel."
    }
];

export function SuccessStories() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center", skipSnaps: false }, [Autoplay({ delay: 5000, stopOnInteraction: true })]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
        onSelect(); // Initial call

        return () => {
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
        };
    }, [emblaApi, onSelect]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const scrollTo = useCallback((index: number) => {
        if (emblaApi) emblaApi.scrollTo(index);
    }, [emblaApi]);

    return (
        <section className="py-20 relative overflow-hidden bg-rose-50/30 dark:bg-rose-950/20">
            <div className="container mx-auto px-4 mb-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-stone-800 dark:text-stone-100 mb-4 tracking-tight">
                    Happy Tails 🏠❤️
                </h2>
                <p className="text-lg text-stone-500 dark:text-stone-400 max-w-2xl mx-auto">
                    Nothing makes us happier than seeing our rescues thrive in their forever homes.
                </p>
            </div>

            <div className="container mx-auto px-4 md:px-12 relative">
                {/* Carousel Viewport */}
                <div className="overflow-hidden cursor-grab active:cursor-grabbing rounded-3xl" ref={emblaRef}>
                    <div className="flex touch-pan-y py-4 px-2">
                        {successStories.map((story) => (
                            <div
                                key={story.id}
                                className="flex-[0_0_85%] sm:flex-[0_0_70%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-4 md:pl-6"
                            >
                                <div className="h-full glass-card dark:bg-zinc-900/80 rounded-[2rem] p-6 md:p-8 border border-white/60 dark:border-white/10 hover:border-rose-200 dark:hover:border-rose-800 shadow-sm hover:shadow-xl hover:shadow-rose-100 dark:hover:shadow-rose-900/20 transition-all duration-300 relative group flex flex-col">
                                    <div className="absolute top-6 right-6 flex text-amber-400">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-current" />
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-5 mb-6">
                                        <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white dark:border-zinc-800 shadow-lg group-hover:scale-105 transition-transform duration-300">
                                            <Image
                                                src={story.image}
                                                alt={story.cat}
                                                fill
                                                className="object-cover"
                                                sizes="80px"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-stone-800 dark:text-stone-100">{story.cat}</h4>
                                            <p className="text-xs text-stone-500 dark:text-stone-400 uppercase tracking-widest mt-1">Adopted by {story.adopter}</p>
                                        </div>
                                    </div>

                                    <div className="relative flex-1 flex flex-col justify-center">
                                        <Quote className="absolute -top-3 -left-2 w-10 h-10 text-rose-100 dark:text-rose-900/50 -z-10 rotate-180" />
                                        <p className="text-stone-600 dark:text-stone-300 italic leading-relaxed text-base pl-3 font-medium">
                                            "{story.quote}"
                                        </p>
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-stone-100 dark:border-zinc-800/50 flex justify-between items-center text-xs font-semibold text-rose-600 dark:text-rose-400">
                                        <span>Happy for {story.months} months</span>
                                        <Heart className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Buttons */}
                <button
                    onClick={scrollPrev}
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white dark:bg-zinc-800 rounded-full shadow-lg border border-stone-100 dark:border-zinc-700 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:text-rose-600 dark:hover:text-rose-400 hover:scale-110 transition-all z-10 hidden md:flex"
                    aria-label="Previous story"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    onClick={scrollNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white dark:bg-zinc-800 rounded-full shadow-lg border border-stone-100 dark:border-zinc-700 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:text-rose-600 dark:hover:text-rose-400 hover:scale-110 transition-all z-10 hidden md:flex"
                    aria-label="Next story"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>

            {/* Mobile Swipe Hint */}
            <div className="flex md:hidden items-center justify-center gap-2 mt-2 text-stone-400 dark:text-zinc-600 text-xs font-semibold uppercase tracking-widest relative z-10">
                <ChevronLeft className="w-3 h-3" />
                Swipe to explore
                <ChevronRight className="w-3 h-3" />
            </div>

            {/* Pagination Dots (Mobile & Desktop) */}
            <div className="flex justify-center gap-2 mt-8 z-10 relative">
                {scrollSnaps.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollTo(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === selectedIndex
                            ? "bg-rose-500 w-8"
                            : "bg-rose-200 dark:bg-zinc-700 hover:bg-rose-300 dark:hover:bg-zinc-600"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
