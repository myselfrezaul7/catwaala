"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PawPrint, Upload, Plus } from "lucide-react";
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
            id: Date.now(), // Changed to number to match interface if needed, or cast
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
                <Button className="rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm h-12 px-8">
                    <Plus className="w-4 h-4 mr-2" /> Add a Tribute
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-zinc-900 border-zinc-800 text-slate-100">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold font-heading flex items-center gap-2">
                        <PawPrint className="w-6 h-6 text-rose-500" /> Remember a Friend
                    </DialogTitle>
                    <DialogDescription className="text-slate-400">
                        Share a photo and a few words to honor your beloved cat.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="petName">Pet's Name</Label>
                            <Input
                                id="petName"
                                required
                                value={formData.petName}
                                onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                                className="bg-black/20 border-zinc-700 focus:ring-rose-500"
                                placeholder="e.g. Luna"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="ownerName">Your Name</Label>
                            <Input
                                id="ownerName"
                                required
                                value={formData.ownerName}
                                onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                                className="bg-black/20 border-zinc-700 focus:ring-rose-500"
                                placeholder="e.g. Sarah"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="tribute">Tribute</Label>
                        <Textarea
                            id="tribute"
                            required
                            value={formData.tribute}
                            onChange={(e) => setFormData({ ...formData, tribute: e.target.value })}
                            className="bg-black/20 border-zinc-700 focus:ring-rose-500 min-h-[100px]"
                            placeholder="Tell us what made them special..."
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Photo</Label>
                        <div className="border-2 border-dashed border-zinc-700 rounded-xl p-8 text-center hover:bg-white/5 transition-colors cursor-pointer group">
                            <Upload className="w-8 h-8 mx-auto text-slate-500 group-hover:text-rose-400 mb-2 transition-colors" />
                            <p className="text-sm text-slate-500">Click to upload image</p>
                        </div>
                    </div>

                    <div className="flex justify-end pt-2">
                        <Button type="submit" disabled={loading} className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold">
                            {loading ? "Posting..." : "Post Tribute"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
