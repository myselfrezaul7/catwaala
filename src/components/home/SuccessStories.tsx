"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const successStories = [
    {
        id: 1,
        cat: "Luna",
        adopter: "Sarah & Tom",
        image: "/assets/cat1.jpg",
        quote: "Luna has brought so much joy to our home. She's the perfect cuddle buddy!"
    },
    {
        id: 2,
        cat: "Oliver",
        adopter: "The Rahman Family",
        image: "/assets/cat2.jpg",
        quote: "We can't imagine life without Oliver now. Thank you Catwaala!"
    },
    {
        id: 3,
        cat: "Mochi",
        adopter: "Anita",
        image: "/assets/cat3.jpg",
        quote: "From a shy stray to a confident queen. Watching her transform has been magical."
    },
    {
        id: 4,
        cat: "Simba",
        adopter: "Kamal",
        image: "/assets/cat1.jpg", // Reusing for demo
        quote: "Simba is the king of our castle. Best decision ever."
    },
    {
        id: 5,
        cat: "Nala",
        adopter: "Priya",
        image: "/assets/cat2.jpg", // Reusing for demo
        quote: "She purrs non-stop! Thank you for rescuing this angel."
    }
];

export function SuccessStories() {
    return (
        <section className="py-20 relative overflow-hidden bg-rose-50/30">
            <div className="container mx-auto px-4 mb-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">
                    Happy Tails 🏠❤️
                </h2>
                <p className="text-lg text-stone-500 max-w-2xl mx-auto">
                    Nothing makes us happier than seeing our rescues thrive in their forever homes.
                </p>
            </div>

            {/* Marquee Container */}
            <div className="flex overflow-hidden relative">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#FFFDF8] to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#FFFDF8] to-transparent z-10" />

                {/* Animated Track */}
                <motion.div
                    className="flex gap-6 pl-6"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        ease: "linear",
                        duration: 40,
                        repeat: Infinity,
                    }}
                >
                    {/* Double the array to create seamless loop */}
                    {[...successStories, ...successStories].map((story, index) => (
                        <div
                            key={`${story.id}-${index}`}
                            className="flex-shrink-0 w-[300px] md:w-[450px] glass-card rounded-2xl md:rounded-3xl p-4 md:p-6 border border-white/60 hover:border-rose-200 hover:shadow-rose-100 transition-all duration-500"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md">
                                    <Image
                                        src={story.image}
                                        alt={story.cat}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-stone-800">{story.cat}</h4>
                                    <p className="text-xs text-stone-500 uppercase tracking-wide">Adopted by {story.adopter}</p>
                                </div>
                            </div>
                            <div className="relative">
                                <Quote className="absolute -top-2 -left-1 w-8 h-8 text-rose-100 -z-10 rotate-180" />
                                <p className="text-stone-600 italic leading-relaxed text-sm pl-2">
                                    "{story.quote}"
                                </p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
