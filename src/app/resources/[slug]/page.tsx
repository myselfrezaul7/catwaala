"use client";

import { use, useEffect, useState } from "react";
import { resources } from "@/data/resources";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, Share2, Printer, FileText, ChevronRight } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default function ResourcePage({ params }: PageProps) {
    const { slug } = use(params);

    if (slug === "local-vet-directory") {
        redirect("/find-vet");
    }

    const resource = resources.find((r) => r.slug === slug);

    if (!resource) {
        notFound();
    }

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollProgress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
            setProgress(scrollProgress);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Extract headings for TOC
    const headings = resource.content
        .split('\n')
        .filter(line => line.startsWith('## '))
        .map(line => line.replace('##', '').trim());

    // Get other resources
    const otherResources = resources.filter(r => r.slug !== slug && r.slug !== "local-vet-directory").slice(0, 2);

    return (
        <div className="min-h-screen bg-[#FFFDF8] dark:bg-stone-950 pb-24 relative">
            {/* Reading Progress Bar */}
            <div
                className="fixed top-0 left-0 h-1.5 bg-rose-500 z-50 transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
            />
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

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-16 container mx-auto">
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

            {/* Content & Sidebar Layout */}
            <div className="container mx-auto px-4 -mt-10 relative z-10 max-w-6xl flex flex-col lg:flex-row gap-8 items-start">

                {/* Main Content Area */}
                <div className="bg-white dark:bg-stone-900 rounded-[2.5rem] p-6 md:p-16 shadow-xl border border-rose-100/50 dark:border-stone-800 flex-1 w-full lg:max-w-4xl">
                    <div className="prose prose-lg md:prose-xl dark:prose-invert prose-rose mx-auto dark:text-stone-300 text-stone-700 max-w-none">
                        <ReactMarkdown>
                            {resource.content}
                        </ReactMarkdown>
                    </div>

                    <div className="mt-16 pt-8 border-t border-stone-100 dark:border-stone-800 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <span className="font-bold text-stone-800 dark:text-stone-200">Share or Save this Guide</span>
                        <div className="flex gap-3">
                            <Button variant="outline" onClick={() => window.print()} className="rounded-full gap-2 border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800">
                                <Printer className="w-4 h-4" /> Print
                            </Button>
                            <Button variant="outline" className="rounded-full w-12 h-12 p-0 border-stone-200 dark:border-stone-700 hover:bg-rose-50 dark:hover:bg-stone-800 hover:text-rose-500 hover:border-rose-200 dark:hover:border-rose-900/50 transition-colors">
                                <Share2 className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Sticky Sidebar */}
                <div className="hidden lg:block w-72 sticky top-32 space-y-8">
                    {/* TOC */}
                    {headings.length > 0 && (
                        <div className="glass-card bg-white/60 dark:bg-stone-900/60 p-6 rounded-3xl border border-rose-100/50 dark:border-stone-800 shadow-sm">
                            <h3 className="font-bold text-stone-800 dark:text-stone-200 mb-4 text-sm uppercase tracking-wider">In this Guide</h3>
                            <ul className="space-y-3 text-sm">
                                {headings.map((heading, i) => (
                                    <li key={i} className="text-stone-500 dark:text-stone-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors cursor-pointer flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-rose-200 dark:bg-stone-700" />
                                        {heading}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Related */}
                    {otherResources.length > 0 && (
                        <div className="glass-card bg-white/60 dark:bg-stone-900/60 p-6 rounded-3xl border border-rose-100/50 dark:border-stone-800 shadow-sm">
                            <h3 className="font-bold text-stone-800 dark:text-stone-200 mb-4 text-sm uppercase tracking-wider">Related Reads</h3>
                            <div className="space-y-4">
                                {otherResources.map(other => (
                                    <Link key={other.slug} href={`/resources/${other.slug}`} className="group block border-l-2 border-stone-200 hover:border-rose-400 dark:border-stone-700 dark:hover:border-rose-500 pl-4 py-1 transition-colors">
                                        <p className="font-bold text-stone-800 dark:text-stone-300 group-hover:text-rose-600 dark:group-hover:text-rose-400 text-sm mb-1 line-clamp-2">{other.title}</p>
                                        <p className="text-xs text-stone-500 dark:text-stone-500">{other.readTime}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
}
