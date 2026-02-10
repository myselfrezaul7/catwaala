"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
            <div className="glass-card rounded-[2.5rem] p-12 max-w-md w-full">
                <div className="w-16 h-16 rounded-2xl bg-rose-100/80 flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle className="w-8 h-8 text-rose-500" />
                </div>
                <h1 className="text-3xl font-bold mb-3 text-stone-800">Something went wrong</h1>
                <p className="text-stone-400 mb-8">An unexpected error occurred. Please try again.</p>
                <Button
                    onClick={reset}
                    className="rounded-2xl h-12 px-8 bg-gradient-to-r from-rose-500 to-rose-600 text-white font-semibold shadow-lg shadow-rose-500/20"
                >
                    Try Again
                </Button>
            </div>
        </div>
    );
}
