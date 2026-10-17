import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Purrfect Matchmaker Quiz",
    description: "Take our 1-minute personality quiz to find which rescued desi cat matches your home and lifestyle.",
    openGraph: {
        title: "Purrfect Matchmaker Quiz | Catwaala 🐾",
        description: "Take our 1-minute personality quiz to find which rescued desi cat matches your home and lifestyle.",
    },
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
