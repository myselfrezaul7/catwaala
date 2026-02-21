"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Global Error Caught:", error);
    }, [error]);

    return (
        <html>
            <body>
                <div className="min-h-screen bg-stone-50 text-stone-800 flex flex-col items-center justify-center text-center px-4">
                    <div className="bg-white rounded-[2.5rem] p-12 max-w-md w-full shadow-xl border border-rose-100">
                        <div className="w-16 h-16 rounded-2xl bg-rose-100 flex items-center justify-center mx-auto mb-6">
                            <AlertTriangle className="w-8 h-8 text-rose-500" />
                        </div>
                        <h1 className="text-3xl font-bold mb-3">System Failure</h1>
                        <p className="text-stone-500 mb-8">A critical error occurred. Please refresh or try again later.</p>
                        <div className="flex flex-col gap-3">
                            <Button
                                onClick={reset}
                                className="w-full rounded-2xl h-12 bg-rose-500 hover:bg-rose-600 text-white font-bold"
                            >
                                <RefreshCcw className="w-4 h-4 mr-2" /> Try Again
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => window.location.href = '/'}
                                className="w-full rounded-2xl h-12 text-stone-600 font-bold"
                            >
                                Go Home
                            </Button>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    );
}
