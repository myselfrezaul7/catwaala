import { Metadata } from "next";
import { ReportForm } from "@/components/report/ReportForm";

export const metadata: Metadata = {
    title: "Report a Stray or Injured Cat",
    description: "Found a cat in distress? Report location and details to notify the Catwaala volunteer network immediately.",
};

export default function ReportPage() {
    return <ReportForm />;
}
