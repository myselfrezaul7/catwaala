"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Cat, Shield } from "lucide-react";

export default function LoginPage() {
    const { signInWithGoogle, user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user && !loading) {
            router.push("/profile");
        }
    }, [user, loading, router]);

    return (
        <div className="min-h-screen flex flex-col justify-center items-center px-4 relative overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-rose-200/20 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-[10%] right-[5%] w-[350px] h-[350px] bg-amber-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />

            <div className="relative z-10 max-w-md w-full">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-600 shadow-xl shadow-rose-500/20 mb-4">
                        <Cat className="w-8 h-8 text-white" />
                    </div>
                </div>

                {/* Login Card */}
                <div className="glass-card rounded-[2rem] p-10 text-center">
                    <h1 className="text-3xl font-bold mb-2 text-stone-800">Welcome Back</h1>
                    <p className="text-stone-400 mb-10">Sign in to save your favorite cats and manage your profile.</p>

                    <Button
                        onClick={signInWithGoogle}
                        className="w-full h-14 text-lg bg-white hover:bg-stone-50 text-stone-700 border-2 border-stone-100 hover:border-stone-200 flex items-center justify-center gap-3 rounded-2xl shadow-lg shadow-stone-100/50 hover:shadow-xl transition-all duration-300 font-medium"
                    >
                        <FcGoogle className="w-6 h-6" />
                        Continue with Google
                    </Button>

                    <div className="mt-8 flex items-center justify-center gap-2 text-xs text-stone-400">
                        <Shield className="w-3.5 h-3.5" />
                        <p>
                            By signing in, you agree to our Terms of Service and Privacy Policy.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
