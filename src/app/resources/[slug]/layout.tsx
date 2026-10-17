import type { Metadata } from "next";
import { resources } from "@/data/resources";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const resource = resources.find((r) => r.slug === slug);
    if (!resource) {
        return { title: "Guide Not Found" };
    }
    return {
        title: resource.title,
        description: resource.description,
        openGraph: {
            title: `${resource.title} | Catwaala 🐾`,
            description: resource.description,
            images: [resource.coverImage],
        },
    };
}

export default function ResourceLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
