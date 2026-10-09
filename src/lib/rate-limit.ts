/**
 * Rate limiting and brute-force protection utility.
 * Supports token bucket rate limiting, sliding window failure tracking,
 * and brute-force lockout with sessionStorage fallback caching.
 */

interface RateLimitEntry {
    tokens: number;
    lastRefill: number;
}

interface LockoutEntry {
    failures: number[];
    lockedUntil: number;
}

class RateLimiter {
    private store: Map<string, RateLimitEntry> = new Map();
    private lockoutStore: Map<string, LockoutEntry> = new Map();

    private getSessionItem(key: string): LockoutEntry | null {
        if (typeof window === "undefined" || !window.sessionStorage) return null;
        try {
            const raw = window.sessionStorage.getItem(`rl_${key}`);
            if (!raw) return null;
            return JSON.parse(raw) as LockoutEntry;
        } catch {
            return null;
        }
    }

    private setSessionItem(key: string, entry: LockoutEntry): void {
        if (typeof window === "undefined" || !window.sessionStorage) return;
        try {
            window.sessionStorage.setItem(`rl_${key}`, JSON.stringify(entry));
        } catch {
            // Ignore quota / access errors in private browsing
        }
    }

    private removeSessionItem(key: string): void {
        if (typeof window === "undefined" || !window.sessionStorage) return;
        try {
            window.sessionStorage.removeItem(`rl_${key}`);
        } catch {
            // Ignore
        }
    }

    /**
     * Checks if an action is allowed based on key, max requests, and window duration in ms.
     * Uses a token bucket algorithm.
     */
    public check(key: string, maxRequests: number, windowMs: number): { success: boolean; resetMs: number } {
        const now = Date.now();
        const entry = this.store.get(key) || { tokens: maxRequests, lastRefill: now };

        // Calculate refilled tokens based on time elapsed
        const timePassed = now - entry.lastRefill;
        if (timePassed >= windowMs) {
            entry.tokens = maxRequests;
            entry.lastRefill = now;
        }

        if (entry.tokens > 0) {
            entry.tokens -= 1;
            this.store.set(key, entry);
            return { success: true, resetMs: windowMs - (now - entry.lastRefill) };
        }

        return { success: false, resetMs: windowMs - (now - entry.lastRefill) };
    }

    /**
     * Checks whether an identity / operation is currently locked out.
     */
    public isLocked(key: string): boolean {
        const now = Date.now();
        let entry = this.lockoutStore.get(key);

        if (!entry) {
            const sessionEntry = this.getSessionItem(key);
            if (sessionEntry) {
                entry = sessionEntry;
                this.lockoutStore.set(key, entry);
            }
        }

        if (!entry) return false;

        if (entry.lockedUntil && entry.lockedUntil > now) {
            return true;
        }

        // Lockout expired
        if (entry.lockedUntil && entry.lockedUntil <= now) {
            entry.lockedUntil = 0;
            this.lockoutStore.set(key, entry);
            this.setSessionItem(key, entry);
        }

        return false;
    }

    /**
     * Records a failed attempt for an action key using a sliding window.
     * Defaults: 5 failures within 5 minutes (300,000 ms) triggers a 60-second (60,000 ms) cooldown lockout.
     * Returns true if locked (either newly triggered or currently active).
     */
    public recordFailure(
        key: string,
        maxFailures: number = 5,
        windowMs: number = 5 * 60 * 1000,
        cooldownMs: number = 60 * 1000
    ): boolean {
        const now = Date.now();
        let entry = this.lockoutStore.get(key);

        if (!entry) {
            const sessionEntry = this.getSessionItem(key);
            if (sessionEntry) {
                entry = sessionEntry;
            } else {
                entry = { failures: [], lockedUntil: 0 };
            }
        }

        // If already locked and cooldown is still active
        if (entry.lockedUntil && entry.lockedUntil > now) {
            return true;
        }

        // Clean up expired lockout
        if (entry.lockedUntil && entry.lockedUntil <= now) {
            entry.lockedUntil = 0;
            entry.failures = [];
        }

        // Filter failures to only those within sliding window
        entry.failures = (entry.failures || []).filter(ts => now - ts < windowMs);
        entry.failures.push(now);

        if (entry.failures.length >= maxFailures) {
            entry.lockedUntil = now + cooldownMs;
            entry.failures = []; // Reset window failures once locked
            this.lockoutStore.set(key, entry);
            this.setSessionItem(key, entry);
            return true;
        }

        this.lockoutStore.set(key, entry);
        this.setSessionItem(key, entry);
        return false;
    }

    /**
     * Resets rate limit tokens and lockout state for a key (e.g. after successful auth).
     */
    public reset(key: string): void {
        this.store.delete(key);
        this.lockoutStore.delete(key);
        this.removeSessionItem(key);
    }
}

export const rateLimiter = new RateLimiter();
