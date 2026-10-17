import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Frequently Asked Questions",
    description: "Answers to common questions about adopting stray cats, TNR programs, vaccinations, and volunteering with Catwaala in Bangladesh.",
    openGraph: {
        title: "Frequently Asked Questions | Catwaala 🐾",
        description: "Answers to common questions about adopting stray cats, TNR programs, vaccinations, and volunteering with Catwaala in Bangladesh.",
    },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
