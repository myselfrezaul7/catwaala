"use client";

import { useState } from "react";
import { Cat } from "@/data/cats";
import { db, storage } from "@/utils/firebase";
import { collection, addDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, UploadCloud, X } from "lucide-react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

interface CatFormProps {
    initialData?: Cat | null;
    onSuccess: () => void;
    onCancel: () => void;
}

export function CatForm({ initialData, onSuccess, onCancel }: CatFormProps) {
    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        breed: initialData?.breed || "",
        age: initialData?.age || "",
        gender: initialData?.gender || "Male",
        location: initialData?.location || "",
        description: initialData?.description || "",
        tag: initialData?.tag || "Available",
        temperamentTags: initialData?.temperamentTags?.join(", ") || "",
        vaccinated: initialData?.vaccinated || false,
        neutered: initialData?.neutered || false,
        goodWithKids: initialData?.goodWithKids || false,
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>(initialData?.imageUrl || "");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let finalImageUrl = initialData?.imageUrl || "";

            // 1. Upload new image if selected
            if (imageFile) {
                const storageRef = ref(storage, `cats/${Date.now()}_${imageFile.name}`);
                const uploadTask = uploadBytesResumable(storageRef, imageFile);

                finalImageUrl = await new Promise((resolve, reject) => {
                    uploadTask.on(
                        "state_changed",
                        (snapshot) => {
                            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                            setUploadProgress(progress);
                        },
                        (error) => reject(error),
                        async () => {
                            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                            resolve(downloadURL);
                        }
                    );
                });
            }

            // 2. Prepare data payload
            const catData = {
                name: formData.name,
                breed: formData.breed,
                age: formData.age,
                gender: formData.gender,
                location: formData.location,
                description: formData.description,
                imageUrl: finalImageUrl,
                tag: formData.tag === "Available" ? "" : formData.tag, // Stop firestore from throwing null assignment indexing error
                temperamentTags: formData.temperamentTags.split(",").map(t => t.trim()).filter(Boolean),
                vaccinated: formData.vaccinated,
                neutered: formData.neutered,
                goodWithKids: formData.goodWithKids,
                ...(initialData ? {} : { created_at: serverTimestamp() })
            };

            // 3. Save to Firestore
            if (initialData) {
                await updateDoc(doc(db, "cats", initialData.id), catData);
                toast.success("Cat profile updated!");
            } else {
                await addDoc(collection(db, "cats"), catData);
                toast.success("New cat added successfully!");
            }

            onSuccess();
        } catch (error: any) {
            console.error("Error saving cat:", error);
            toast.error(error.message || "Failed to save cat profile");
        } finally {
            setLoading(false);
            setUploadProgress(0);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload Section */}
            <div className="space-y-2">
                <Label>Cat Photo</Label>
                <div className="flex items-center gap-4">
                    {imagePreview ? (
                        <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-stone-100 flex-shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                            <button
                                type="button"
                                onClick={() => { setImageFile(null); setImagePreview(""); }}
                                className="absolute top-1 right-1 bg-rose-500 text-white p-1 rounded-full hover:bg-rose-600 transition-colors"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    ) : (
                        <label className="w-24 h-24 rounded-2xl border-2 border-dashed border-stone-200 hover:border-primary/50 flex flex-col items-center justify-center text-stone-400 hover:text-primary transition-colors cursor-pointer bg-stone-50 flex-shrink-0">
                            <UploadCloud className="w-8 h-8 mb-1" />
                            <span className="text-[10px] font-medium text-center px-2">Upload Photo</span>
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} required={!initialData} />
                        </label>
                    )}
                    <div className="text-sm text-stone-500">
                        <p>Upload a clear photo of the cat.</p>
                        <p className="text-xs">Recommended: Square crop, max 5MB.</p>
                        {uploadProgress > 0 && uploadProgress < 100 && (
                            <div className="w-full bg-stone-100 rounded-full h-1.5 mt-2">
                                <div className="bg-primary h-1.5 rounded-full transition-all" style={{ width: `${uploadProgress}%` }}></div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Luna" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="breed">Breed</Label>
                    <Input id="breed" required value={formData.breed} onChange={(e) => setFormData({ ...formData, breed: e.target.value })} placeholder="e.g. Domestic Shorthair" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input id="age" required value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} placeholder="e.g. 2 months" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <select
                        id="gender"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" required value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} placeholder="e.g. Dhanmondi, Dhaka" />
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Tell us about the cat's personality and history..."
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="tag">Status Tag</Label>
                    <select
                        id="tag"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={formData.tag}
                        onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    >
                        <option value="Available">Available</option>
                        <option value="Urgent">Urgent</option>
                        <option value="Adopted">Adopted</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="temperament">Temperaments (comma separated)</Label>
                    <Input id="temperament" value={formData.temperamentTags} onChange={(e) => setFormData({ ...formData, temperamentTags: e.target.value })} placeholder="e.g. Playful, Smart, Calm" />
                </div>
            </div>

            <div className="flex flex-col gap-3 p-4 bg-stone-50 rounded-2xl border border-stone-100">
                <Label className="mb-1 font-bold">Health & Traits</Label>
                <label className="flex items-center gap-3 cursor-pointer">
                    <Checkbox checked={formData.vaccinated} onCheckedChange={(c: boolean | string) => setFormData({ ...formData, vaccinated: !!c })} />
                    <span className="text-sm font-medium">Vaccinated</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                    <Checkbox checked={formData.neutered} onCheckedChange={(c: boolean | string) => setFormData({ ...formData, neutered: !!c })} />
                    <span className="text-sm font-medium">Neutered / Spayed</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                    <Checkbox checked={formData.goodWithKids} onCheckedChange={(c: boolean | string) => setFormData({ ...formData, goodWithKids: !!c })} />
                    <span className="text-sm font-medium">Good with Kids</span>
                </label>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-stone-100">
                <Button type="button" variant="ghost" onClick={onCancel} disabled={loading}>
                    Cancel
                </Button>
                <Button type="submit" disabled={loading} className="gap-2 bg-rose-500 hover:bg-rose-600">
                    {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                    {initialData ? "Update Cat" : "Add Cat"}
                </Button>
            </div>
        </form>
    );
}
