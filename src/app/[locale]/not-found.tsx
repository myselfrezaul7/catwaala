"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PawPrint } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-rose-50/20 dark:bg-zinc-950">
            <div className="w-32 h-32 bg-rose-100 dark:bg-rose-900/20 rounded-full flex items-center justify-center mb-8 rotate-12 animate-pulse-slow">
                <PawPrint className="w-16 h-16 text-rose-500 opacity-60" />
            </div>
            <h1 className="text-6xl font-black text-rose-600 dark:text-rose-500 mb-4 font-heading">404</h1>
            <h2 className="text-2xl font-bold mb-6 text-slate-700 dark:text-slate-300">Cat Not Found!</h2>
            <p className="text-slate-500 max-w-md mb-8">
                We checked under the sofa, in the box, and behind the fridge. This page is definitely gone.
            </p>
            <div className="flex gap-4">
                <Button asChild className="bg-rose-600 hover:bg-rose-700">
                    <Link href="/">Back Home</Link>
                </Button>
                <Button variant="outline" asChild className="border-rose-200 text-rose-600 hover:bg-rose-50">
                    <Link href="/adopt">Adopt instead?</Link>
                </Button>
            </div>
        </div>
    );
}
