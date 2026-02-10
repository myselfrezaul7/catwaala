import { supabaseClient } from "@/utils/supabase/client";

export type ProfileData = {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
    phone: string | null;
    role: 'user' | 'admin';
};

export const ProfileService = {
    async getProfile(userId: string): Promise<ProfileData | null> {
        const { data, error } = await supabaseClient
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) {
            console.error('Error fetching profile:', error);
            return null;
        }

        return data;
    },

    async updateProfile(userId: string, updates: Partial<ProfileData>): Promise<ProfileData | null> {
        const { data, error } = await supabaseClient
            .from('profiles')
            .update(updates)
            .eq('id', userId)
            .select()
            .single();

        if (error) {
            console.error('Error updating profile:', error);
            throw error;
        }

        return data;
    },

    async uploadAvatar(file: File): Promise<string | null> {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabaseClient.storage
                .from('avatars')
                .upload(filePath, file);

            if (uploadError) {
                console.error('Error uploading avatar:', uploadError);
                throw uploadError;
            }

            const { data } = supabaseClient.storage.from('avatars').getPublicUrl(filePath);
            return data.publicUrl;
        } catch (error) {
            console.error("Avatar upload failed:", error);
            throw error;
        }
    }
};
