import { Metadata } from "next";
import { AdoptPageContent } from "@/components/adopt/AdoptPageContent";
import { cats } from "@/data/cats";

export const metadata: Metadata = {
    title: "Adopt a Rescued Cat",
    description: "Browse verified rescued cats in Bangladesh waiting for a loving home. Kittens, adults, and seniors available for adoption.",
};

export default function AdoptPage() {
    return <AdoptPageContent initialCats={cats} />;
}
