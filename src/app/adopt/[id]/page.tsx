import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatService } from "@/services/CatService";
import { CatDetailClient } from "@/components/adopt/CatDetailClient";

// Force dynamic rendering since we are fetching from Firestore
export const dynamic = "force-dynamic";

interface Props {
    params: Promise<{ id: string }>;
}

function formatAge(ageInMonths: number): string {
    if (ageInMonths < 12) return `${ageInMonths} mo`;
    const years = Math.floor(ageInMonths / 12);
    return `${years} yr${years > 1 ? 's' : ''}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const cat = await CatService.getById(id);

    if (!cat) {
        return {
            title: "Cat Not Found",
        };
    }

    return {
        title: `Adopt ${cat.name} | Catwaala`,
        description: `Meet ${cat.name}, a ${cat.breed || 'Rescue'} cat in ${cat.location}. ${cat.description?.slice(0, 100)}...`,
        openGraph: {
            title: `Adopt ${cat.name} | Catwaala`,
            description: `Meet ${cat.name}, a ${cat.breed || 'Rescue'} cat looking for a home in ${cat.location}.`,
            images: cat.images?.[0] ? [cat.images[0]] : [],
        },
    };
}

export default async function CatPage({ params }: Props) {
    const { id } = await params;
    const dbCat = await CatService.getById(id);

    if (!dbCat) {
        notFound();
    }

    // Adapt DB data to UI format (same logic as before)
    const adaptedCat = {
        ...dbCat,
        tag: dbCat.status === 'Adopted' ? 'Adopted' : dbCat.status === 'Available' ? 'Ready for Love' : dbCat.status,
        location: dbCat.location,
        breed: dbCat.breed || "Domestic Short Hair",
        age: formatAge(dbCat.age),
        imageUrl: dbCat.images?.[0] || `/assets/cat1.jpg`,
        temperamentTags: [
            dbCat.attributes.goodWithKids ? "Good with Kids" : "Quiet Home",
            dbCat.attributes.vaccinated ? "Health Checked" : null,
            dbCat.attributes.neutered ? "Sterilized" : null,
            dbCat.gender === 'Female' ? "Sweet Soul" : "Playful Spirit",
            "Cuddle Bug"
        ].filter(Boolean) as string[],
        attributes: dbCat.attributes // Ensure attributes are passed through
    };

    return <CatDetailClient cat={adaptedCat} />;
}
