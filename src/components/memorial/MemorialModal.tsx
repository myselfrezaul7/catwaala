import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, Plus, Heart, Loader2 } from "lucide-react";
import { Memorial } from "@/services/server-data";
import { MemorialService } from "@/services/MemorialService";
import { toast } from "sonner";
import Image from "next/image";

interface MemorialModalProps {
    onAddTribute: (memorial: Memorial) => void;
}

export function MemorialModal({ onAddTribute }: MemorialModalProps) {
    const { user } = useAuth(); // Auth hook
    const router = useRouter(); // For navigation
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        petName: "",
        ownerName: "", // Will auto-fill in useEffect
        tribute: "",
    });

    // Auto-fill owner name when user logs in
    useState(() => {
        if (user?.displayName) {
            setFormData(prev => ({ ...prev, ownerName: user.displayName || "" }));
        }
    });

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = null;
            if (selectedFile) {
                imageUrl = await MemorialService.uploadImage(selectedFile);
            }

            const newMemorial = await MemorialService.create({
                pet_name: formData.petName,
                owner_name: formData.ownerName,
                tribute: formData.tribute,
                image_url: imageUrl,
                user_id: user?.uid, // Link tribute to user
            });

            onAddTribute(newMemorial);
            toast.success("Tribute posted successfully");
            setOpen(false);
            setFormData({
                petName: "",
                ownerName: user?.displayName || "",
                tribute: ""
            });
            setSelectedFile(null);
            setPreviewUrl(null);
        } catch (error) {
            console.error(error);
            toast.error("Failed to post tribute. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="rounded-full bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-200 border-2 border-rose-100 h-14 px-8 text-lg font-bold gap-2 transition-all hover:scale-105">
                    <Plus className="w-5 h-5" /> Add a Tribute
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-white/95 backdrop-blur-xl border-white shadow-2xl rounded-[2rem] p-0 overflow-hidden">
                <div className="bg-gradient-to-r from-rose-50 to-orange-50 p-6 border-b border-rose-100">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold font-heading flex items-center gap-2 text-stone-800">
                            <Heart className="w-6 h-6 text-rose-500 fill-rose-500" /> Remember a Friend
                        </DialogTitle>
                        <DialogDescription className="text-stone-500 font-medium">
                            Share a photo and a few words to honor your beloved cat.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <div className="p-6">
                    {user ? (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="petName" className="text-stone-700 font-bold">Pet&apos;s Name</Label>
                                    <Input
                                        id="petName"
                                        required
                                        value={formData.petName}
                                        onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                                        className="bg-stone-50 border-amber-100 focus:ring-rose-500 rounded-xl"
                                        placeholder="e.g. Luna"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="ownerName" className="text-stone-700 font-bold">Your Name</Label>
                                    <Input
                                        id="ownerName"
                                        required
                                        value={formData.ownerName}
                                        onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                                        className="bg-stone-50 border-amber-100 focus:ring-rose-500 rounded-xl"
                                        placeholder="e.g. Sarah"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="tribute" className="text-stone-700 font-bold">Tribute</Label>
                                <Textarea
                                    id="tribute"
                                    required
                                    value={formData.tribute}
                                    onChange={(e) => setFormData({ ...formData, tribute: e.target.value })}
                                    className="bg-stone-50 border-amber-100 focus:ring-rose-500 min-h-[100px] rounded-xl"
                                    placeholder="Tell us what made them special..."
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-stone-700 font-bold">Photo</Label>
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="border-2 border-dashed border-rose-200 rounded-2xl p-4 text-center hover:bg-rose-50 transition-colors cursor-pointer group bg-rose-50/30 relative overflow-hidden h-32 flex flex-col items-center justify-center"
                                >
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleFileSelect}
                                    />
                                    {previewUrl ? (
                                        <Image
                                            src={previewUrl}
                                            alt="Preview"
                                            fill
                                            className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                        />
                                    ) : (
                                        <>
                                            <div className="bg-white p-2 rounded-full inline-block shadow-sm mb-2 group-hover:scale-110 transition-transform">
                                                <Upload className="w-5 h-5 text-rose-400" />
                                            </div>
                                            <p className="text-sm text-stone-500 font-medium">Click to upload image</p>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end pt-2">
                                <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold h-12 rounded-xl shadow-lg shadow-rose-200">
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Posting...
                                        </>
                                    ) : "Post Tribute"}
                                </Button>
                            </div>
                        </form>
                    ) : (
                        <div className="text-center py-8 space-y-6">
                            <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto text-4xl">
                                🔒
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold text-stone-800">Login Required</h3>
                                <p className="text-stone-500 max-w-xs mx-auto">Please sign in to share your tribute on the Memorial Wall.</p>
                            </div>
                            <Button
                                onClick={() => router.push('/login')}
                                className="w-full bg-rose-500 hover:bg-rose-600 text-white h-12 rounded-xl font-bold"
                            >
                                Sign In / Sign Up
                            </Button>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
