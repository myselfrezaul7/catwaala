import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Adoption Application Form",
    description: "Apply to adopt or foster a rescued stray cat from Catwaala in Bangladesh.",
    openGraph: {
        title: "Adoption Application Form | Catwaala 🐾",
        description: "Apply to adopt or foster a rescued stray cat from Catwaala in Bangladesh.",
    },
};

export default function AdoptionFormLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
