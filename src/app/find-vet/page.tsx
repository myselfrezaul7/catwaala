import { Suspense } from "react";
import { Metadata } from "next";
import { VetFinder } from "@/components/vet/VetFinder";

export const metadata: Metadata = {
    title: "Find Verified Vets Across Bangladesh | 64 Districts Directory",
    description:
        "Locate trusted private veterinary clinics, university teaching hospitals, and district veterinary hospitals across all 8 divisions and 64 districts of Bangladesh.",
};

export default function FindVetPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center text-muted-foreground">
                    Loading veterinary directory...
                </div>
            }
        >
            <VetFinder />
        </Suspense>
    );
}
