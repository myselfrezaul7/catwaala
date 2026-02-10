"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PawPrint, Upload, Plus, Heart } from "lucide-react";
import { Memorial } from "@/data/memorials";

interface MemorialModalProps {
    onAddTribute: (memorial: Memorial) => void;
}

export function MemorialModal({ onAddTribute }: MemorialModalProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        petName: "",
        ownerName: "",
        tribute: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Mock upload delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        const newMemorial: Memorial = {
            id: Date.now(),
            petName: formData.petName,
            ownerName: formData.ownerName,
            tribute: formData.tribute,
            imageUrl: `/assets/cat${Math.floor(Math.random() * 3) + 1}.jpg`,
            timestamp: new Date().toISOString(),
        };

        onAddTribute(newMemorial);
        setLoading(false);
        setOpen(false);
        setFormData({ petName: "", ownerName: "", tribute: "" });
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
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="petName" className="text-stone-700 font-bold">Pet's Name</Label>
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
                            <div className="border-2 border-dashed border-rose-200 rounded-2xl p-6 text-center hover:bg-rose-50 transition-colors cursor-pointer group bg-rose-50/30">
                                <div className="bg-white p-3 rounded-full inline-block shadow-sm mb-2 group-hover:scale-110 transition-transform">
                                    <Upload className="w-6 h-6 text-rose-400" />
                                </div>
                                <p className="text-sm text-stone-500 font-medium">Click to upload image</p>
                            </div>
                        </div>

                        <div className="flex justify-end pt-2">
                            <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold h-12 rounded-xl shadow-lg shadow-rose-200">
                                {loading ? "Posting..." : "Post Tribute"}
                            </Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
