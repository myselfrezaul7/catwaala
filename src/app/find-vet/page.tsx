import { Metadata } from "next";
import { VetFinder } from "@/components/vet/VetFinder";

export const metadata: Metadata = {
    title: "Find Verified Vets in Dhaka",
    description: "Locate trusted veterinary clinics and hospitals in Bangladesh. Verified ratings, contact info, and expertise details.",
};

export default function FindVetPage() {
    return <VetFinder />;
}
