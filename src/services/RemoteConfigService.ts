import { remoteConfig } from '@/utils/firebase';
import { fetchAndActivate, getBoolean, getString } from 'firebase/remote-config';

export class RemoteConfigService {
    static async initialize() {
        if (typeof window === 'undefined' || !remoteConfig) return;
        
        try {
            await fetchAndActivate(remoteConfig);
            console.log('Remote Config initialized and activated');
        } catch (error) {
            console.error('Failed to fetch and activate remote config:', error);
        }
    }

    static get isMaintenanceMode(): boolean {
        if (typeof window === 'undefined' || !remoteConfig) return false;
        return getBoolean(remoteConfig, 'maintenance_mode');
    }

    static get isHeroAnnouncementEnabled(): boolean {
        if (typeof window === 'undefined' || !remoteConfig) return false;
        return getBoolean(remoteConfig, 'hero_announcement_enabled');
    }

    static get heroAnnouncementText(): string {
        if (typeof window === 'undefined' || !remoteConfig) return '';
        return getString(remoteConfig, 'hero_announcement_text');
    }

    static get areDonationsEnabled(): boolean {
        if (typeof window === 'undefined' || !remoteConfig) return true; // Default true
        return getBoolean(remoteConfig, 'donations_enabled');
    }
}
