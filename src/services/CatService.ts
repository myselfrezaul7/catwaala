import { supabaseClient } from "@/utils/supabase/client";
import { Cat } from "./server-data";

export const CatService = {
    async getAll() {
        const { data, error } = await supabaseClient
            .from("cats")
            .select("*")
            .eq("status", "Available")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching cats:", error);
            return [];
        }

        return data as Cat[];
    },

    async getById(id: number) {
        const { data, error } = await supabaseClient
            .from("cats")
            .select("*")
            .eq("id", id)
            .single();

        if (error) return null;
        return data as Cat;
    },

    async getByIds(ids: number[]) {
        if (ids.length === 0) return [];

        const { data, error } = await supabaseClient
            .from("cats")
            .select("*")
            .in("id", ids);

        if (error) {
            console.error("Error fetching cats by ids:", error);
            return [];
        }
        return data as Cat[];
    }
};
