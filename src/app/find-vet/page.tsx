import { Metadata } from "next";
import { VetFinder } from "@/components/vet/VetFinder";
import { MOCK_VET_CLINICS } from "@/data/vets";

export const metadata: Metadata = {
    title: "Find Verified Vets in Dhaka",
    description: "Locate trusted veterinary clinics and hospitals in Bangladesh. Verified ratings to help you choose the best care for your cat.",
};

export default function FindVetPage() {
    return <VetFinder initialVets={MOCK_VET_CLINICS} />;
}
