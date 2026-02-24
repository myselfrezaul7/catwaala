"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { PetCard } from "@/components/shared/PetCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Heart, Gift, LogOut, MessageCircle, BookHeart, Plus, CheckCircle, Award, Trophy, FileText, FileCheck, FileX, Loader2 } from "lucide-react";
import { Badges } from "@/components/dashboard/Badges";
import { ReportService } from "@/services/ReportService";
import { MemorialService } from "@/services/MemorialService";
import { ProfileService } from "@/services/ProfileService";
import { CatService } from "@/services/CatService";
import { Report, Memorial } from "@/services/server-data";
import { adaptCatToCard } from "@/utils/adapters";
import { updateProfile } from "firebase/auth";
import { seedData } from "@/utils/seed-data";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { formatDistanceToNow } from "date-fns";

export default function DashboardPage() {
    const { user, signOut, loading, userData } = useAuth();
    const { favoriteIds } = useFavorites();
    const router = useRouter();

    const [activeTab, setActiveTab] = useState("favorites");
    const [reports, setReports] = useState<Report[]>([]);
    const [memorials, setMemorials] = useState<Memorial[]>([]);
    const [favoriteCats, setFavoriteCats] = useState<any[]>([]);

    // New States
    const [applications, setApplications] = useState<any[]>([]);
    const [leaderboard, setLeaderboard] = useState<any[]>([]);
    const [isLoadingActivity, setIsLoadingActivity] = useState(false);

    // Profile Editing
    const [isEditing, setIsEditing] = useState(false);
    const [profileForm, setProfileForm] = useState({
        full_name: "",
        phone: ""
    });
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [isSavingProfile, setIsSavingProfile] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    // Seed Data & Load Profile
    useEffect(() => {
        if (user) {
            setProfileForm({
                full_name: user.displayName || "",
                phone: user.phoneNumber || ""
            });
            // Try seeding data quietly
            seedData().catch(e => console.error("Seeding error:", e));
        }
    }, [user]);

    // Load Favorites
    useEffect(() => {
        async function loadFavorites() {
            if (favoriteIds.length === 0) {
                setFavoriteCats([]);
                return;
            }

            if (favoriteIds.length > 0) {
                try {
                    const catsData = await CatService.getByIds(favoriteIds);
                    const adaptedCats = catsData.map(adaptCatToCard);
                    setFavoriteCats(adaptedCats);
                } catch (e) {
                    console.error("Error loading favorite cats", e);
                }
            } else {
                setFavoriteCats([]);
            }
        }
        loadFavorites();
    }, [favoriteIds]);

    // Load Activity Data
    useEffect(() => {
        async function loadActivity() {
            if (!user) return;
            setIsLoadingActivity(true);
            try {
                const [userReports, userMemorials] = await Promise.all([
                    ReportService.getByUserId(user.uid),
                    MemorialService.getByUserId(user.uid)
                ]);
                setReports(userReports);
                setMemorials(userMemorials);

                // Fetch Applications
                const appQ = query(collection(db, "adoptions"), where("userId", "==", user.uid));
                const appSnap = await getDocs(appQ);
                setApplications(appSnap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a: any, b: any) => b.created_at - a.created_at));

                // Fetch Leaderboard
                const leadSnap = await getDocs(collection(db, "users"));
                const usersList = leadSnap.docs.map(d => ({ id: d.id, ...d.data() }));
                usersList.sort((a: any, b: any) => (b.points || 0) - (a.points || 0));
                setLeaderboard(usersList.slice(0, 10));

            } catch (error) {
                console.error("Failed to load activity", error);
                toast.error("Failed to load your activity");
            } finally {
                setIsLoadingActivity(false);
            }
        }

        if (user) {
            loadActivity();
        }
    }, [user]);

    const handleUpdateProfile = async () => {
        if (!user) return;
        setIsSavingProfile(true);
        try {
            let avatarUrl = user.photoURL;

            if (avatarFile) {
                avatarUrl = await ProfileService.uploadAvatar(avatarFile);
            }

            // Update Firebase Auth Profile
            await updateProfile(user, {
                displayName: profileForm.full_name,
                photoURL: avatarUrl
            });

            // Update Firestore Profile
            try {
                await ProfileService.updateProfile(user.uid, {
                    id: user.uid,
                    full_name: profileForm.full_name,
                    phone: profileForm.phone,
                    avatar_url: avatarUrl,
                    role: 'user' // Default to user
                });
            } catch (e) {
                console.error("Failed to update firestore profile", e);
            }

            toast.success("Profile updated successfully!");
            setIsEditing(false);
            window.location.reload();
        } catch (error) {
            console.error("Error updating profile", error);
            toast.error("Failed to update profile");
        } finally {
            setIsSavingProfile(false);
        }
    };

    const getInitials = (name: string) => {
        return name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'U';
    };

    if (loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="glass-card rounded-2xl px-8 py-4 text-stone-500 font-medium animate-pulse">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-24 bg-stone-50 dark:bg-stone-950 transition-colors duration-300">
            <div className="container mx-auto px-4 py-12 max-w-6xl">

                {/* Profile Card */}
                <div className="glass-card dark:bg-stone-900/80 dark:border-stone-800 rounded-[2.5rem] p-8 md:p-12 mb-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                        <Heart className="w-64 h-64 text-rose-500 rotate-12" />
                    </div>

                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
                        {/* Avatar */}
                        <div className="relative group shrink-0">
                            {user.photoURL ? (
                                <div className="relative w-28 h-28 md:w-32 md:h-32">
                                    <Image
                                        src={user.photoURL}
                                        alt={user.displayName || "User"}
                                        fill
                                        className="rounded-full object-cover border-4 border-white dark:border-stone-700 shadow-xl shadow-rose-100/50 dark:shadow-rose-900/20"
                                    />
                                </div>
                            ) : (
                                <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center border-4 border-white dark:border-stone-700 shadow-xl shadow-rose-100/50 dark:shadow-rose-900/20 text-white text-3xl font-bold">
                                    {getInitials(user.displayName || "User")}
                                </div>
                            )}
                        </div>

                        {/* User Info */}
                        <div className="flex-1 text-center md:text-left space-y-3">
                            <h1 className="text-3xl md:text-4xl font-bold text-stone-800 dark:text-stone-100 flex flex-col sm:flex-row items-center sm:items-baseline gap-3">
                                {user.displayName || "Welcome Back"}
                                {userData?.points && <span className="text-xl text-rose-500 bg-rose-100 dark:bg-rose-900/30 px-3 py-1 rounded-full">{userData.points} pts</span>}
                            </h1>
                            <p className="text-stone-400 dark:text-stone-500">{user.email}</p>

                            <div className="pt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                                <Button onClick={() => setIsEditing(true)} variant="outline" className="rounded-xl border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 hover:bg-rose-50/70 dark:hover:bg-rose-900/20 h-10 bg-transparent">
                                    Edit Profile
                                </Button>
                                <Button onClick={signOut} variant="ghost" className="rounded-xl text-stone-400 hover:text-red-500 h-10 hover:bg-red-50 dark:hover:bg-red-900/20">
                                    <LogOut className="w-4 h-4 mr-2" /> Sign Out
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Tabs */}
                <Tabs defaultValue="favorites" className="space-y-8" onValueChange={setActiveTab}>
                    <TabsList className="bg-white/50 dark:bg-stone-800/80 backdrop-blur-md p-1 rounded-2xl border border-white/60 dark:border-stone-700 shadow-sm mx-auto md:mx-0 w-full md:w-fit flex flex-nowrap overflow-x-auto scrollbar-hide h-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        <TabsTrigger value="favorites" className="rounded-xl data-[state=active]:bg-rose-500 data-[state=active]:text-white dark:text-stone-400 dark:data-[state=active]:text-white px-5 transition-all whitespace-nowrap text-sm">
                            Favorites
                        </TabsTrigger>
                        <TabsTrigger value="applications" className="rounded-xl data-[state=active]:bg-rose-500 data-[state=active]:text-white dark:text-stone-400 dark:data-[state=active]:text-white px-5 transition-all whitespace-nowrap text-sm">
                            Applications
                        </TabsTrigger>
                        <TabsTrigger value="reports" className="rounded-xl data-[state=active]:bg-rose-500 data-[state=active]:text-white dark:text-stone-400 px-5 dark:data-[state=active]:text-white transition-all whitespace-nowrap text-sm">
                            Reports
                        </TabsTrigger>
                        <TabsTrigger value="memorials" className="rounded-xl data-[state=active]:bg-rose-500 data-[state=active]:text-white dark:text-stone-400 px-5 dark:data-[state=active]:text-white transition-all whitespace-nowrap text-sm">
                            Tributes
                        </TabsTrigger>
                        <TabsTrigger value="achievements" className="rounded-xl data-[state=active]:bg-rose-500 data-[state=active]:text-white dark:text-stone-400 px-5 dark:data-[state=active]:text-white transition-all whitespace-nowrap text-sm">
                            Awards 🏆
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="favorites" className="space-y-8 animate-fade-in-up">
                        <div className="flex items-center gap-3 mb-6">
                            <Heart className="w-6 h-6 text-rose-500 fill-current" />
                            <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100">Saved Cats ({favoriteCats.length})</h2>
                        </div>

                        {favoriteCats.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {favoriteCats.map(cat => (
                                    <PetCard key={cat.id} cat={cat} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center glass-card dark:bg-stone-900/60 dark:border-stone-800 p-12 rounded-[2.5rem] border border-dashed border-amber-200/60 dark:border-stone-700">
                                <div className="text-6xl mb-4">😿</div>
                                <h3 className="text-xl font-bold mb-2 text-stone-800 dark:text-stone-100">No favorites yet</h3>
                                <p className="text-stone-400 dark:text-stone-500 mb-6">Go find some furry friends to add to your list.</p>
                                <Link href="/adopt">
                                    <Button className="bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-xl shadow-md shadow-rose-500/15">Browse Cats</Button>
                                </Link>
                            </div>
                        )}
                    </TabsContent>

                    {/* Applications Tab */}
                    <TabsContent value="applications" className="space-y-8 animate-fade-in-up">
                        <div className="flex items-center gap-3 mb-6">
                            <FileText className="w-6 h-6 text-rose-500" />
                            <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100">Adoption Applications</h2>
                        </div>
                        {isLoadingActivity ? (
                            <div className="text-center py-12"><Loader2 className="w-8 h-8 animate-spin mx-auto text-rose-500" /></div>
                        ) : applications.length > 0 ? (
                            <div className="grid gap-4">
                                {applications.map((app) => (
                                    <div key={app.id} className="glass-card dark:bg-stone-900/60 dark:border-stone-800 p-6 rounded-3xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <div>
                                            <h3 className="text-lg font-bold text-stone-800 dark:text-stone-100">Application for <span className="text-rose-500">{app.catName || app.dogName}</span></h3>
                                            <p className="text-sm text-stone-500 dark:text-stone-400">Submitted {app.created_at ? formatDistanceToNow(new Date(app.created_at), { addSuffix: true }) : 'recently'}</p>
                                        </div>
                                        <div className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 ${app.status === 'Approved' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : app.status === 'Rejected' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                                            {app.status === 'Approved' ? <FileCheck className="w-5 h-5" /> : app.status === 'Rejected' ? <FileX className="w-5 h-5" /> : <Loader2 className="w-5 h-5 animate-spin" />}
                                            {app.status}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center glass-card dark:bg-stone-900/60 dark:border-stone-800 p-12 rounded-[2.5rem] border border-dashed border-amber-200/60 dark:border-stone-700">
                                <div className="text-6xl mb-4">📝</div>
                                <h3 className="text-xl font-bold mb-2 text-stone-800 dark:text-stone-100">No active applications</h3>
                                <p className="text-stone-500 dark:text-stone-400 mb-6">When you apply to adopt a cat, track the status here.</p>
                                <Link href="/adopt"><Button className="bg-rose-500 hover:bg-rose-600 text-white shadow-xl shadow-rose-500/20 rounded-xl">Find a Cat</Button></Link>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="reports" className="space-y-8 animate-fade-in-up">
                        <div className="flex items-center gap-3 mb-6">
                            <MessageCircle className="w-6 h-6 text-blue-500" />
                            <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100">My Reports ({reports.length})</h2>
                        </div>

                        {isLoadingActivity ? (
                            <p className="text-stone-500 dark:text-stone-400">Loading reports...</p>
                        ) : reports.length > 0 ? (
                            <div className="grid gap-6">
                                {reports.map(report => (
                                    <div key={report.id} className="glass-card dark:bg-stone-900/60 dark:border-stone-800 p-6 rounded-3xl flex gap-6 items-start">
                                        <div className="w-24 h-24 rounded-2xl bg-stone-100 dark:bg-stone-800 overflow-hidden shrink-0 relative">
                                            {report.image_url ? (
                                                <Image src={report.image_url} alt="Report" fill className="object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-stone-300 dark:text-stone-600"><MessageCircle /></div>
                                            )}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${report.type === 'Lost' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
                                                    report.type === 'Found' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
                                                        'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'
                                                    }`}>
                                                    {report.type}
                                                </span>
                                                <span className="text-stone-400 text-xs text-muted-foreground font-medium">
                                                    {report.created_at ? formatDistanceToNow(new Date(report.created_at), { addSuffix: true }) : 'Recently'}
                                                </span>
                                            </div>
                                            <p className="text-stone-700 dark:text-stone-200 font-medium mb-1 pl-1 line-clamp-2">{report.description}</p>
                                            <p className="text-stone-500 dark:text-stone-400 text-xs pl-1 flex items-center gap-1 mt-2">📍 {report.location_text}</p>
                                            <div className="mt-3">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium border ${report.status === 'Resolved' ? 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900' : 'bg-stone-50 text-stone-500 border-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:border-stone-700'
                                                    }`}>
                                                    {report.status === 'Resolved' ? <CheckCircle className="w-3 h-3" /> : <div className="w-2 h-2 rounded-full bg-stone-400" />}
                                                    {report.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center glass-card dark:bg-stone-900/60 dark:border-stone-800 p-12 rounded-[2.5rem] border border-dashed border-amber-200/60 dark:border-stone-700">
                                <div className="text-6xl mb-4 opacity-80">🚨</div>
                                <h3 className="text-xl font-bold mb-2 text-stone-800 dark:text-stone-100">No reports filed</h3>
                                <p className="text-stone-500 dark:text-stone-400 mb-6">If you spot a cat in danger, report it to our volunteer network.</p>
                                <Link href="/report"><Button variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50 font-bold bg-orange-50/50">Report a Rescue</Button></Link>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="memorials" className="space-y-8 animate-fade-in-up">
                        <div className="flex items-center gap-3 mb-6">
                            <BookHeart className="w-6 h-6 text-purple-500" />
                            <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100">My Tributes ({memorials.length})</h2>
                        </div>

                        {isLoadingActivity ? (
                            <p className="text-stone-500 dark:text-stone-400">Loading tributes...</p>
                        ) : memorials.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {memorials.map(memorial => (
                                    <div key={memorial.id} className="glass-card dark:bg-stone-900/60 dark:border-stone-800 p-6 rounded-3xl flex items-center gap-4">
                                        <div className="w-20 h-20 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden shrink-0 relative border-2 border-white dark:border-stone-700 shadow-sm">
                                            {memorial.image_url ? (
                                                <Image src={memorial.image_url} alt={memorial.pet_name} fill className="object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-stone-300 dark:text-stone-600"><Heart /></div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-stone-800 dark:text-stone-100 text-lg">{memorial.pet_name}</h3>
                                            <p className="text-stone-500 dark:text-stone-400 text-sm line-clamp-2 italic">"{memorial.tribute}"</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-stone-400 dark:text-stone-500">You haven't requested any memorials yet.</div>
                        )}
                    </TabsContent>

                    <TabsContent value="achievements" className="space-y-8 animate-fade-in-up">
                        <div className="grid md:grid-cols-[1fr,300px] gap-8">
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <Award className="w-6 h-6 text-amber-500" />
                                    <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100">Your Achievements</h2>
                                </div>
                                <div className="glass-card dark:bg-stone-900/60 dark:border-stone-800 p-8 rounded-[2rem] border border-amber-100/50 dark:border-amber-900/20">
                                    <Badges />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <Trophy className="w-6 h-6 text-rose-500" />
                                    <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100">Leaderboard</h2>
                                </div>
                                <div className="glass-card dark:bg-stone-900/60 dark:border-stone-800 p-6 rounded-[2rem] space-y-4">
                                    {isLoadingActivity ? (
                                        <div className="py-8 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-rose-500" /></div>
                                    ) : leaderboard.length > 0 ? leaderboard.map((u, i) => (
                                        <div key={u.id} className={`flex items-center justify-between p-3 rounded-xl ${u.id === user.uid ? 'bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-900/30' : 'hover:bg-stone-50 dark:hover:bg-stone-800'}`}>
                                            <div className="flex items-center gap-3">
                                                <span className={`w-6 h-6 flex items-center justify-center font-bold text-sm rounded-full ${i <= 2 ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' : 'text-stone-400 dark:text-stone-600 '}`}>
                                                    {i + 1}
                                                </span>
                                                <div className="w-8 h-8 rounded-full overflow-hidden bg-white dark:bg-stone-800 shrink-0 border border-stone-200 dark:border-stone-700 hidden sm:block">
                                                    {u.photoURL ? (
                                                        // eslint-disable-next-line @next/next/no-img-element
                                                        <img src={u.photoURL} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-xs font-bold text-stone-500">{getInitials(u.name || 'U')}</div>
                                                    )}
                                                </div>
                                                <span className={`font-bold ${u.id === user.uid ? 'text-rose-600 dark:text-rose-400' : 'text-stone-700 dark:text-stone-300'}`}>{u.id === user.uid ? 'You' : u.name}</span>
                                            </div>
                                            <span className="font-bold text-stone-500 dark:text-stone-400 text-sm">{u.points || 0} pts</span>
                                        </div>
                                    )) : (
                                        <div className="text-center text-sm text-stone-500 dark:text-stone-400 py-4">No points recorded yet.</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>

                {/* Edit Profile Dialog */}
                <Dialog open={isEditing} onOpenChange={setIsEditing}>
                    <DialogContent className="glass-card bg-white dark:bg-stone-950/90 border-white/50 dark:border-stone-800">
                        <DialogHeader>
                            <DialogTitle className="dark:text-white">Edit Profile</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="flex flex-col items-center gap-4 mb-4">
                                <div className="relative w-24 h-24 rounded-full overflow-hidden bg-stone-100 dark:bg-stone-800 border-2 border-dashed border-stone-300 dark:border-stone-700 hover:border-rose-400 transition-colors cursor-pointer group">
                                    {avatarFile ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={URL.createObjectURL(avatarFile)} alt="Preview" className="w-full h-full object-cover" />
                                    ) : user?.photoURL ? (
                                        <Image src={user.photoURL} alt="Current" fill className="object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-stone-400"><Plus className="w-8 h-8" /></div>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={(e) => {
                                            if (e.target.files?.[0]) setAvatarFile(e.target.files[0]);
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-bold pointer-events-none">
                                        Change
                                    </div>
                                </div>
                                <span className="text-xs text-stone-400">Tap to change avatar</span>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="full_name" className="dark:text-stone-300">Full Name</Label>
                                <Input
                                    id="full_name"
                                    value={profileForm.full_name}
                                    onChange={(e) => setProfileForm({ ...profileForm, full_name: e.target.value })}
                                    className="dark:bg-stone-900 dark:border-stone-700 dark:text-stone-100"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone" className="dark:text-stone-300">Phone Number</Label>
                                <Input
                                    id="phone"
                                    value={profileForm.phone}
                                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                                    placeholder="+880..."
                                    className="dark:bg-stone-900 dark:border-stone-700 dark:text-stone-100"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="ghost" onClick={() => setIsEditing(false)} className="dark:text-stone-400 dark:hover:text-white">Cancel</Button>
                            <Button onClick={handleUpdateProfile} disabled={isSavingProfile} className="bg-rose-500 text-white hover:bg-rose-600">
                                {isSavingProfile ? "Saving..." : "Save Changes"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            </div>
        </div>
    );
}
