import { supabaseClient } from "@/utils/supabase/client";
import { Report } from "./server-data";

export const ReportService = {
    async getByUserId(userId: string) {
        const { data, error } = await supabaseClient
            .from("reports")
            .select("*")
            .eq("user_id", userId)
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching user reports:", error);
            return [];
        }

        return data as Report[];
    },

    async create(report: Omit<Report, "id" | "created_at" | "user_id" | "status">) {
        const { data: { user } } = await supabaseClient.auth.getUser();

        if (!user) throw new Error("User must be logged in to submit a report");

        const { data, error } = await supabaseClient
            .from("reports")
            .insert([{ ...report, user_id: user.id }])
            .select()
            .single();

        if (error) throw error;
        return data as Report;
    },

    async uploadImage(file: File) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `report-images/${fileName}`;

        const { error: uploadError } = await supabaseClient.storage
            .from("reports")
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabaseClient.storage
            .from("reports")
            .getPublicUrl(filePath);

        return data.publicUrl;
    }
};
