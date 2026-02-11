"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Cat, Shield, Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import ReCAPTCHA from "react-google-recaptcha";

export default function LoginPage() {
    const { signInWithGoogle, signInWithEmail, signUpWithEmail, user, loading } = useAuth();
    const router = useRouter();

    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [captchaValue, setCaptchaValue] = useState<string | null>(null);

    useEffect(() => {
        if (user && !loading) {
            router.push("/profile");
        }
    }, [user, loading, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!captchaValue) {
            toast.error("Please verify you are not a robot");
            return;
        }

        setIsLoading(true);
        try {
            if (isSignUp) {
                await signUpWithEmail(email, password);
                toast.success("Account created successfully!");
            } else {
                await signInWithEmail(email, password);
                toast.success("Welcome back!");
            }
        } catch (error: any) {
            console.error(error);
            let message = "Something went wrong";
            if (error.code === 'auth/invalid-credential') message = "Invalid email or password";
            if (error.code === 'auth/email-already-in-use') message = "Email already in use";
            if (error.code === 'auth/weak-password') message = "Password should be at least 6 characters";
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithGoogle();
        } catch (error) {
            console.error(error);
            toast.error("Failed to sign in with Google");
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center px-4 relative overflow-hidden bg-stone-50">
            {/* Decorative blobs */}
            <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-rose-200/20 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-[10%] right-[5%] w-[350px] h-[350px] bg-amber-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />

            <div className="relative z-10 max-w-md w-full">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4 transform hover:scale-105 transition-transform duration-300 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/logo.png" alt="Catwaala Logo" className="w-full h-full object-contain drop-shadow-xl" />
                    </div>
                </div>

                {/* Login Card */}
                <div className="glass-card rounded-[2.5rem] p-8 md:p-10 border border-white/60 shadow-2xl shadow-rose-100/50 backdrop-blur-xl bg-white/60">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold mb-2 text-stone-800 tracking-tight">
                            {isSignUp ? "Create Account" : "Welcome Back"}
                        </h1>
                        <p className="text-stone-500 text-sm">
                            {isSignUp
                                ? "Join our community of cat lovers today"
                                : "Sign in to manage your profile and favorites"}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-stone-600 ml-1">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="hello@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-12 h-12 rounded-xl border-stone-200 bg-white/50 focus:bg-white focus:border-rose-300 transition-all shadow-sm"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-stone-600 ml-1">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-12 h-12 rounded-xl border-stone-200 bg-white/50 focus:bg-white focus:border-rose-300 transition-all shadow-sm"
                                        required
                                        minLength={6}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center my-4">
                            <ReCAPTCHA
                                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                                onChange={setCaptchaValue}
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 text-base bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white rounded-xl shadow-lg shadow-rose-500/25 transition-all duration-300 font-medium mt-2 group"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <span className="flex items-center justify-center gap-2">
                                    {isSignUp ? "Sign Up" : "Sign In"}
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            )}
                        </Button>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-stone-200"></span>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-stone-50/0 px-2 text-stone-400 backdrop-blur-sm bg-white/50 rounded-full">Or continue with</span>
                        </div>
                    </div>

                    <Button
                        onClick={handleGoogleLogin}
                        variant="outline"
                        className="w-full h-12 text-base bg-white hover:bg-stone-50 text-stone-700 border-stone-200 flex items-center justify-center gap-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 font-medium"
                    >
                        <FcGoogle className="w-5 h-5" />
                        Google
                    </Button>

                    <div className="mt-8 text-center">
                        <p className="text-stone-500 text-sm">
                            {isSignUp ? "Already have an account?" : "Don't have an account?"}
                            <button
                                onClick={() => setIsSignUp(!isSignUp)}
                                className="ml-2 font-semibold text-rose-600 hover:text-rose-700 hover:underline transition-colors"
                            >
                                {isSignUp ? "Sign In" : "Sign Up"}
                            </button>
                        </p>
                    </div>

                    <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-stone-400 opacity-70">
                        <Shield className="w-3 h-3" />
                        <p>
                            Protected by Firebase Auth
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
