import { supabaseClient } from "@/utils/supabase/client";
import { Memorial } from "./server-data";

export const MemorialService = {
    async getAll() {
        const { data, error } = await supabaseClient
            .from("memorials")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching memorials:", error);
            // Fallback to empty array or MOCK_MEMORIALS if desired during migration
            // For now, return empty to not confuse user with mixed data
            return [];
        }

        return data as Memorial[];
    },

    async getByUserId(userId: string) {
        const { data, error } = await supabaseClient
            .from("memorials")
            .select("*")
            .eq("user_id", userId)
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching user memorials:", error);
            return [];
        }

        return data as Memorial[];
    },

    async create(memorial: Omit<Memorial, "id" | "created_at" | "user_id">) {
        const { data: { user } } = await supabaseClient.auth.getUser();

        if (!user) throw new Error("User must be logged in to create a memorial");

        const { data, error } = await supabaseClient
            .from("memorials")
            .insert([{ ...memorial, user_id: user.id }])
            .select()
            .single();

        if (error) throw error;
        return data as Memorial;
    },

    async uploadImage(file: File) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `memorial-images/${fileName}`;

        const { error: uploadError } = await supabaseClient.storage
            .from("memorials")
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabaseClient.storage
            .from("memorials")
            .getPublicUrl(filePath);

        return data.publicUrl;
    }
};
