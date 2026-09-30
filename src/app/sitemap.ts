import { MetadataRoute } from "next";
import { CatService } from "@/services/CatService";
import { resources } from "@/data/resources";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://www.catwaala.com";

    // Fetch all available cats for dynamic routes
    const cats = await CatService.getAll();
    const catUrls: MetadataRoute.Sitemap = cats.map((cat) => ({
        url: `${baseUrl}/adopt/${cat.id}`,
        lastModified: new Date(cat.created_at || new Date()),
        changeFrequency: "weekly",
        priority: 0.8,
    }));

    // Dynamic resources routes
    const resourceUrls: MetadataRoute.Sitemap = resources.map((resource) => ({
        url: `${baseUrl}/resources/${resource.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
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
        {
            url: `${baseUrl}/donate`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/community`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/quiz`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        ...resourceUrls,
        ...catUrls,
    ];
}
