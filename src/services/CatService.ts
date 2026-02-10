import { createClient } from "@/utils/supabase/client";
import { cats, Cat } from "@/data/cats";

export const CatService = {
    async getAllCats(): Promise<Cat[]> {
        const supabase = createClient();

        const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!isSupabaseConfigured) {
            return cats;
        }

        const { data, error } = await supabase
            .from('cats')
            .select('*');

        if (error || !data || data.length === 0) {
            return cats;
        }

        return data as Cat[];
    },

    async getCatById(id: string): Promise<Cat | undefined> {
        const supabase = createClient();
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return cats.find(c => c.id === id);

        const { data, error } = await supabase
            .from('cats')
            .select('*')
            .eq('id', id)
            .single();

        if (error || !data) return cats.find(c => c.id === id);

        return data as Cat;
    }
};
