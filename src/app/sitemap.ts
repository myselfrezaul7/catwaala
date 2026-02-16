import { MetadataRoute } from "next";
import { CatService } from "@/services/CatService";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://catwaala.com"; // Replace with actual domain

    // Fetch all available cats for dynamic routes
    const cats = await CatService.getAll();
    const catUrls: MetadataRoute.Sitemap = cats.map((cat) => ({
        url: `${baseUrl}/adopt/${cat.id}`,
        lastModified: new Date(cat.created_at || new Date()),
        changeFrequency: "weekly",
        priority: 0.8,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `${baseUrl}/adopt`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/report`,
            lastModified: new Date(),
            changeFrequency: "never",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/volunteer`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/find-vet`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/faq`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.6,
        },
        {
            url: `${baseUrl}/memorial`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5,
        },
        ...catUrls,
    ];
}
