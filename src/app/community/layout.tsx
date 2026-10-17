import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cat Care Resources & Community Hub",
    description: "Read Bangladesh-specific cat nutrition guides, new kitten checklists, and connect with cat lovers in Dhaka.",
    openGraph: {
        title: "Cat Care Resources & Community Hub | Catwaala 🐾",
        description: "Read Bangladesh-specific cat nutrition guides, new kitten checklists, and connect with cat lovers in Dhaka.",
    },
};

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
