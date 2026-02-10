import { MOCK_VET_CLINICS, VetClinic } from "@/data/vets";
import { cats, Cat } from "@/data/cats";
// import { createClient } from "@/utils/supabase/server"; // TODO: Uncomment when Supabase is set up

export async function getVets(): Promise<VetClinic[]> {
    // TODO: Uncomment this block to enable Supabase data fetching
    /*
    try {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
          return [...MOCK_VET_CLINICS];
      }
      
      const { createClient } = await import("@/utils/supabase/server");
      const supabase = await createClient();
  
      const { data, error } = await supabase.from('vets').select('*');
      if (error || !data) {
          console.warn("Supabase Fetch Error (Vets):", error);
          return [...MOCK_VET_CLINICS];
      }
      return data as VetClinic[];
    } catch (e) {
        console.warn("Supabase Client Init Error:", e);
        return [...MOCK_VET_CLINICS];
    }
    */
    return [...MOCK_VET_CLINICS];
}

export async function getCats(): Promise<Cat[]> {
    // TODO: Uncomment this block to enable Supabase data fetching
    /*
    try {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
          return [...cats];
      }
  
      const { createClient } = await import("@/utils/supabase/server");
      const supabase = await createClient();
  
      const { data, error } = await supabase.from('cats').select('*');
      if (error || !data) {
           console.warn("Supabase Fetch Error (Cats):", error);
          return [...cats];
      }
      return data as Cat[];
    } catch (e) {
        return [...cats];
    }
    */
    return [...cats];
}
