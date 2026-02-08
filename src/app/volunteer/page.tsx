import { Metadata } from "next";
import { VolunteerForm } from "@/components/volunteer/VolunteerForm";

export const metadata: Metadata = {
    title: "Volunteer for Cat Rescue",
    description: "Join the Catwaala volunteer team. Help with rescues, fostering, or transport to make a difference for street cats.",
};

export default function VolunteerPage() {
    return <VolunteerForm />;
}
