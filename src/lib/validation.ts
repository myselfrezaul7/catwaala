import { z } from "zod";

/**
 * Validates whether a given URL is safe against XSS and protocol smuggling.
 * Strictly blocks javascript:, data:, and vbscript: protocols (including obfuscation)
 * and permits ONLY http:// and https:// protocols.
 */
export function isSafeUrl(url: string): boolean {
    if (!url || typeof url !== "string") return false;
    const trimmed = url.trim();
    if (!trimmed) return false;

    // Reject null bytes and non-printable ASCII control characters (0x00-0x1F, 0x7F)
    if (/[\x00-\x1F\x7F]/.test(trimmed)) return false;

    // Check for dangerous protocols in raw and URI-decoded representations
    let decoded = trimmed;
    try {
        decoded = decodeURIComponent(trimmed);
    } catch {
        return false;
    }

    // Normalize: remove all whitespace and control characters
    const normalized = decoded.replace(/[\s\x00-\x1F\x7F]/g, "").toLowerCase();

    const dangerousProtocols = ["javascript:", "data:", "vbscript:"];
    for (const proto of dangerousProtocols) {
        if (normalized.includes(proto)) {
            return false;
        }
    }

    // Block HTML-encoded colons or entity obfuscations for dangerous schemes
    if (
        normalized.includes("javascript&colon;") ||
        normalized.includes("data&colon;") ||
        normalized.includes("vbscript&colon;")
    ) {
        return false;
    }

    // Must be a valid WHATWG URL with only http: or https: protocol
    try {
        const parsed = new URL(trimmed);
        return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
        return false;
    }
}

// ==========================================
// SAFE URL SCHEMAS
// ==========================================

export const SafeUrlSchema = z
    .string()
    .max(500, "URL must be 500 characters or less")
    .refine((val) => isSafeUrl(val), {
        message: "Invalid or unsafe URL. Only http:// and https:// URLs are permitted.",
    });

export const safeUrlSchema = SafeUrlSchema;

export const SafeOptionalUrlSchema = z
    .string()
    .max(500, "URL must be 500 characters or less")
    .refine((val) => !val || isSafeUrl(val), {
        message: "Invalid or unsafe URL. Only http:// and https:// URLs are permitted.",
    })
    .optional()
    .nullable();

/**
 * Strips HTML tags and non-printable control characters while preserving
 * natural punctuation (', ", /, &) to prevent double-escaping in React JSX.
 */
export function sanitizeInput(input: string): string {
    if (!input || typeof input !== "string") return '';
    return input
        .replace(/<[^>]*>?/gm, '') // Strip HTML tags
        .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '') // Strip control chars
        .trim();
}

// ==========================================
// ZOD SCHEMAS
// ==========================================

export const ReportSchema = z.object({
    type: z.enum(["Lost", "Found", "Injured"]),
    description: z.string().max(2000, "Description must be 2000 characters or less").optional().default(""),
    latitude: z.number().nullable().optional(),
    longitude: z.number().nullable().optional(),
    location_text: z.string().max(200, "Location text must be 200 characters or less").optional().default(""),
    contact_info: z.string().max(200, "Contact info must be 200 characters or less").optional().default(""),
    image_url: SafeOptionalUrlSchema,
});

export const MemorialSchema = z.object({
    pet_name: z.string().min(1, "Pet name is required").max(100, "Pet name must be 100 characters or less"),
    owner_name: z.string().min(1, "Owner name is required").max(100, "Owner name must be 100 characters or less"),
    tribute: z.string().min(1, "Tribute is required").max(2000, "Tribute must be 2000 characters or less"),
    image_url: SafeOptionalUrlSchema,
});

export const ProfileUpdateSchema = z.object({
    full_name: z.string().max(100, "Full name must be 100 characters or less").optional(),
    avatar_url: SafeOptionalUrlSchema,
    phone: z.string().max(20, "Phone number must be 20 characters or less").nullable().optional(),
    favorites: z.array(z.string().max(100)).max(100).optional(),
});

export const AdoptionApplicationSchema = z.object({
    pet_id: z.string().min(1, "Pet ID is required"),
    applicant_name: z.string().min(1, "Applicant name is required").max(100),
    applicant_email: z.string().email("Invalid email address").max(100),
    applicant_phone: z.string().min(5, "Valid phone number required").max(20),
    reason: z.string().min(10, "Please provide a reason of at least 10 characters").max(1000),
    experience: z.string().max(1000).optional(),
});

export const VolunteerApplicationSchema = z.object({
    full_name: z.string().min(1, "Full name is required").max(100),
    email: z.string().email("Invalid email address").max(100),
    phone: z.string().min(5, "Valid phone number required").max(20),
    skills: z.string().max(500).optional(),
    availability: z.string().max(200).optional(),
});
