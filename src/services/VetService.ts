import { createClient } from "@/utils/supabase/client";
import { MOCK_VET_CLINICS, VetClinic } from "@/data/vets";

export const VetService = {
    async getAllVets(): Promise<VetClinic[]> {
        const supabase = createClient();

        // Check if Supabase is configured (rudimentary check)
        const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!isSupabaseConfigured) {
            console.warn("Supabase keys missing, using mock data for Vets.");
            return MOCK_VET_CLINICS;
        }

        const { data, error } = await supabase
            .from('vets')
            .select('*');

        if (error || !data || data.length === 0) {
            // Fallback to mock if table is empty or error
            console.warn("Error fetching from Supabase or empty table, using mock data.", error);
            return MOCK_VET_CLINICS;
        }

        return data as VetClinic[];
    }
};
