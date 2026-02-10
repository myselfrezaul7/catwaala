import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Cat } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
            <div className="glass-card rounded-[2.5rem] p-12 max-w-md w-full">
                <div className="text-7xl mb-6">🐱</div>
                <h1 className="text-4xl font-bold mb-3 text-stone-800">404</h1>
                <p className="text-xl font-semibold text-stone-600 mb-2">Page Not Found</p>
                <p className="text-stone-400 mb-8">This cat wandered off. Let&apos;s get you back home.</p>
                <Link href="/">
                    <Button className="rounded-2xl h-12 px-8 bg-gradient-to-r from-rose-500 to-rose-600 text-white font-semibold shadow-lg shadow-rose-500/20">
                        <Cat className="w-4 h-4 mr-2" /> Back to Home
                    </Button>
                </Link>
            </div>
        </div>
    );
}
