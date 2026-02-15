"use client";

import { resources } from "@/data/resources";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function ResourcePage({ params }: PageProps) {
    const { slug } = await params;
    const resource = resources.find((r) => r.slug === slug);

    if (!resource) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-[#FFFDF8] dark:bg-stone-950 pb-24">
            {/* Header / Cover Image */}
            <div className="relative h-[60vh] md:h-[70vh] w-full">
                <Image
                    src={resource.coverImage}
                    alt={resource.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 container mx-auto">
                    <Link href="/community">
                        <Button variant="outline" className="mb-8 text-white border-white/30 hover:bg-white/20 hover:text-white backdrop-blur-sm rounded-full">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Community
                        </Button>
                    </Link>

                    <h1 className="text-4xl md:text-6xl font-bold text-white font-heading mb-6 leading-tight drop-shadow-lg">
                        {resource.title}
                    </h1>

                    <div className="flex flex-wrap gap-6 text-white/90 font-medium">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-rose-400" />
                            {resource.date}
                        </div>
                        <div className="flex items-center gap-2">
                            <User className="w-5 h-5 text-rose-400" />
                            By {resource.author}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Content */}
            <div className="container mx-auto px-4 -mt-10 relative z-10 max-w-4xl">
                <div className="bg-white dark:bg-stone-900 rounded-[2.5rem] p-8 md:p-16 shadow-xl border border-rose-100/50 dark:border-stone-800">
                    <div className="prose prose-lg md:prose-xl dark:prose-invert prose-rose mx-auto dark:text-stone-300 text-stone-700">
                        <ReactMarkdown>
                            {resource.content}
                        </ReactMarkdown>
                    </div>

                    <div className="mt-16 pt-8 border-t border-stone-100 dark:border-stone-800 flex justify-between items-center">
                        <span className="font-bold text-stone-800 dark:text-stone-200">Share this article</span>
                        <div className="flex gap-2">
                            <Button variant="outline" className="rounded-full w-12 h-12 p-0 border-stone-200 dark:border-stone-700">
                                <Share2 className="w-5 h-5 text-stone-600 dark:text-stone-400" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
