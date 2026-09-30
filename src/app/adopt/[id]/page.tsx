import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatService } from "@/services/CatService";
import { CatDetailClient } from "@/components/adopt/CatDetailClient";

// Revalidate page data every 60 seconds (ISR)
export const revalidate = 60;

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

    const title = `Adopt ${cat.name} | Catwaala`;
    const description = `Meet ${cat.name}, a ${cat.breed || 'Rescue'} cat looking for a home in ${cat.location}. ${cat.description ? cat.description.slice(0, 120) + '...' : ''}`;
    const rawImage = cat.images?.[0] || '/assets/cat1.png';
    const imageUrl = rawImage.startsWith('http')
        ? rawImage
        : `https://www.catwaala.com${rawImage.startsWith('/') ? '' : '/'}${rawImage}`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `https://www.catwaala.com/adopt/${cat.id}`,
            siteName: "Catwaala",
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: `Adopt ${cat.name}`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [imageUrl],
            creator: "@catwaala",
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
        imageUrl: dbCat.images?.[0] || `/assets/cat1.png`,
        temperamentTags: [
            dbCat.attributes?.goodWithKids ? "Good with Kids" : "Quiet Home",
            dbCat.attributes?.vaccinated ? "Health Checked" : null,
            dbCat.attributes?.neutered ? "Sterilized" : null,
            dbCat.gender === 'Female' ? "Sweet Soul" : "Playful Spirit",
            "Cuddle Bug"
        ].filter(Boolean) as string[],
        attributes: dbCat.attributes || { vaccinated: false, neutered: false, goodWithKids: false }
    };

    return <CatDetailClient cat={adaptedCat} />;
}
