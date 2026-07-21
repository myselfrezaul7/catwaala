import { Cat } from "@/services/server-data";

export const formatAge = (months: number): string => {
    if (months < 12) {
        return `${months} Month${months !== 1 ? 's' : ''}`;
    }
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (remainingMonths === 0) {
        return `${years} Year${years !== 1 ? 's' : ''}`;
    }
    return `${years} Yr ${remainingMonths} Mo`;
};

export const adaptCatToCard = (cat: any) => {
    // Support nested attributes OR flat boolean flags
    const attrs = cat.attributes || {
        vaccinated: cat.vaccinated,
        neutered: cat.neutered,
        goodWithKids: cat.goodWithKids
    };

    const attributesList = attrs
        ? Object.entries(attrs)
            .filter(([_, value]) => Boolean(value))
            .map(([key, _]) => key.replace(/([A-Z])/g, ' $1').trim())
        : [];

    const ageDisplay = typeof cat.age === 'number' ? formatAge(cat.age) : (cat.ageDisplay || cat.age || "Unknown");
    const image = (cat.images && cat.images.length > 0) ? cat.images[0] : (cat.imageUrl || "/assets/cat1.png");

    return {
        id: cat.id,
        name: cat.name,
        age: ageDisplay,
        gender: cat.gender,
        breed: cat.breed || "Mixed Breed",
        location: cat.location,
        imageUrl: image,
        description: cat.description || "No description available",
        attributes: attributesList,
        status: cat.status || "Available"
    };
};
