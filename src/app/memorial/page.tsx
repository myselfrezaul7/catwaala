import { Metadata } from "next";
import { MemorialList } from "@/components/memorial/MemorialList";

export const metadata: Metadata = {
    title: "Memorial Wall | In Loving Memory",
    description: "A tribute to the beloved cats who have crossed the rainbow bridge. Always loved, never forgotten.",
};

export default function MemorialPage() {
    return <MemorialList />;
}
