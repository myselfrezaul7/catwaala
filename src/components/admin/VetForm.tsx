"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { VetClinic } from "@/services/VetService";

type VetFormProps = {
    initialData?: VetClinic;
    onSubmit: (data: Omit<VetClinic, "id">) => Promise<void>;
    onCancel: () => void;
};

export function VetForm({ initialData, onSubmit, onCancel }: VetFormProps) {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<VetClinic>({
        defaultValues: initialData || {
            name: "",
            address: "",
            phone: "",
            website: "",
            mapUrl: "",
            hours: "9 AM - 5 PM",
            district: "Dhaka",
            rating: 5.0,
            reviewCount: 0,
            services: []
        }
    });

    const [servicesInput, setServicesInput] = useState(initialData?.services.join(", ") || "");

    const handleFormSubmit = async (data: any) => {
        const payload = {
            ...data,
            services: servicesInput.split(",").map(s => s.trim()).filter(Boolean),
            rating: Number(data.rating),
            reviewCount: Number(data.reviewCount)
        };
        await onSubmit(payload);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted-foreground">Clinic Name</label>
                    <input
                        {...register("name", { required: "Name is required" })}
                        className="w-full p-3 rounded-xl border border-stone-200 bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                        placeholder="e.g. Central Vet Hospital"
                    />
                    {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                </div>

                {/* District */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted-foreground">District</label>
                    <input
                        {...register("district", { required: "District is required" })}
                        className="w-full p-3 rounded-xl border border-stone-200 bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                        placeholder="e.g. Dhaka"
                    />
                    {errors.district && <p className="text-xs text-red-500">{errors.district.message}</p>}
                </div>

                {/* Address */}
                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-semibold text-muted-foreground">Full Address</label>
                    <input
                        {...register("address", { required: "Address is required" })}
                        className="w-full p-3 rounded-xl border border-stone-200 bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                        placeholder="e.g. 48 Kazi Alauddin Road..."
                    />
                    {errors.address && <p className="text-xs text-red-500">{errors.address.message}</p>}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted-foreground">Phone Number</label>
                    <input
                        {...register("phone", { required: "Phone is required" })}
                        className="w-full p-3 rounded-xl border border-stone-200 bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                        placeholder="e.g. 01745-137090"
                    />
                    {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
                </div>

                {/* Hours */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted-foreground">Operating Hours</label>
                    <input
                        {...register("hours", { required: "Hours are required" })}
                        className="w-full p-3 rounded-xl border border-stone-200 bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                        placeholder="e.g. 9 AM - 5 PM or 24/7"
                    />
                    {errors.hours && <p className="text-xs text-red-500">{errors.hours.message}</p>}
                </div>

                {/* Website */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted-foreground">Website (Optional)</label>
                    <input
                        {...register("website")}
                        className="w-full p-3 rounded-xl border border-stone-200 bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                        placeholder="https://..."
                    />
                </div>

                {/* Map URL */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted-foreground">Google Maps URL</label>
                    <input
                        {...register("mapUrl", { required: "Map URL is required" })}
                        className="w-full p-3 rounded-xl border border-stone-200 bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                        placeholder="https://maps.google.com/..."
                    />
                </div>

                {/* Services */}
                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-semibold text-muted-foreground">Services (Comma Separated)</label>
                    <input
                        value={servicesInput}
                        onChange={(e) => setServicesInput(e.target.value)}
                        className="w-full p-3 rounded-xl border border-stone-200 bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                        placeholder="e.g. Surgery, Vaccination, 24/7 Emergency"
                    />
                </div>

                {/* Rating & Review Count */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted-foreground">Initial Rating</label>
                    <input
                        type="number"
                        step="0.1"
                        {...register("rating", { valueAsNumber: true })}
                        className="w-full p-3 rounded-xl border border-stone-200 bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted-foreground">Review Count</label>
                    <input
                        type="number"
                        {...register("reviewCount", { valueAsNumber: true })}
                        className="w-full p-3 rounded-xl border border-stone-200 bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting} className="rounded-xl">
                    Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting} className="min-w-[120px] bg-teal-600 hover:bg-teal-700 text-white rounded-xl">
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : initialData ? "Save Changes" : "Add Clinic"}
                </Button>
            </div>
        </form>
    );
}
