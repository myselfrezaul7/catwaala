import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Cat } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 flex flex-col items-center justify-center p-4 text-center">
            <div className="bg-rose-50 dark:bg-zinc-900 p-8 rounded-full mb-8 animate-bounce">
                <Cat className="w-16 h-16 text-rose-500" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-heading mb-4 text-slate-900 dark:text-white">
                404
            </h1>
            <h2 className="text-2xl font-semibold mb-6 text-slate-700 dark:text-slate-300">
                Oops! This page is playing hide and seek.
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-md mb-8">
                We couldn't find the page you were looking for. It might have been moved or doesn't exist anymore.
            </p>
            <Link href="/">
                <Button size="lg" className="rounded-full bg-rose-600 hover:bg-rose-700">
                    Return Home
                </Button>
            </Link>
        </div>
    );
}
