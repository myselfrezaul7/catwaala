import { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { cats } from "@/data/cats";
import { MOCK_VET_CLINICS } from "@/data/vets";

export const metadata: Metadata = {
    title: "Admin Dashboard | Catwaala",
    robots: {
        index: false,
        follow: false,
    },
};

export default function AdminPage() {
    return <AdminDashboard initialCats={cats} initialVets={MOCK_VET_CLINICS} />;
}
