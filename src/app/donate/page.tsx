import { Metadata } from "next";
import { DonatePage } from "@/components/donate/DonatePage";

export const metadata: Metadata = {
    title: "Donate to Catwaala | Save a Street Cat",
    description: "Support our mission to rescue, treat, and feed stray cats in Bangladesh. Your donation provides vaccines, food, and medical care.",
};

export default function Page() {
    return <DonatePage />;
}
