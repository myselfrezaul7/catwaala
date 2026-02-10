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

export const adaptCatToCard = (cat: Cat) => {
    // Check if attributes is a string (JSON string from DB?) or object
    // Supabase returns JSON columns as objects usually, but sometimes it depends.
    // Assuming typed as object in Cat type.

    const attributesList = cat.attributes
        ? Object.entries(cat.attributes)
            .filter(([_, value]) => value)
            .map(([key, _]) => key.replace(/([A-Z])/g, ' $1').trim()) // camelCase to Normal Text
        : [];

    return {
        id: cat.id,
        name: cat.name,
        age: formatAge(cat.age),
        gender: cat.gender,
        breed: cat.breed || "Mixed Breed",
        location: cat.location,
        imageUrl: cat.images && cat.images.length > 0 ? cat.images[0] : "/cats/placeholder.jpg",
        description: cat.description || "No description available",
        attributes: attributesList,
        status: cat.status // Keep status for checking availability
    };
};
