import { db } from "@/utils/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import {
    MOCK_VET_CLINICS,
    VetDivision,
    VetClinicType,
    BANGLADESH_DIVISIONS,
} from "@/data/vets";

export type { VetDivision, VetClinicType };
export { BANGLADESH_DIVISIONS };

export type VetClinic = {
    id: string; // Firestore ID or stringified mock ID
    legacy_id?: number; // From mock data
    name: string;
    address: string;
    phone: string;
    website?: string;
    mapUrl: string;
    hours: string;
    district: string;
    division?: VetDivision;
    type?: VetClinicType;
    emergency24h?: boolean;
    rating: number;
    reviewCount: number;
    services: string[];
};

const COLLECTION_NAME = "vets";

const DISTRICT_TO_DIVISION: Record<string, VetDivision> = MOCK_VET_CLINICS.reduce(
    (acc, vet) => {
        if (vet.district && vet.division && !acc[vet.district]) {
            acc[vet.district] = vet.division;
        }
        return acc;
    },
    {} as Record<string, VetDivision>
);

function normalizeClinicName(name: string): string {
    return (name || "")
        .toLowerCase()
        .replace(/dr\.\s*/g, "")
        .replace(/[^a-z0-9]/g, "");
}

function inferClinicType(vet: Partial<VetClinic>): VetClinicType {
    if (vet.type) return vet.type;
    const nameLower = (vet.name || "").toLowerCase();
    const servicesLower = (vet.services || []).join(" ").toLowerCase();
    if (
        nameLower.includes("university") ||
        nameLower.includes("cvasu") ||
        nameLower.includes("teaching hospital") ||
        nameLower.includes("bau ") ||
        nameLower.includes("sau ") ||
        nameLower.includes("pstu ") ||
        nameLower.includes("hstu ")
    ) {
        return "University";
    }
    if (nameLower.includes("obhoyaronno") || nameLower.includes("welfare") || servicesLower.includes("ngo")) {
        return "NGO";
    }
    if (
        nameLower.includes("government") ||
        nameLower.includes("govt") ||
        nameLower.includes("district veterinary") ||
        nameLower.includes("central veterinary hospital") ||
        servicesLower.includes("government")
    ) {
        return "Government";
    }
    return "Private";
}

function isPlaceholderPhone(phone?: string): boolean {
    if (!phone) return true;
    const lower = phone.toLowerCase().trim();
    return (
        lower.includes("available upon booking") ||
        lower.includes("01711-000000") ||
        lower.includes("123456") ||
        lower === "n/a"
    );
}

function enrichClinic(vet: VetClinic): VetClinic {
    const normalizedDistrict =
        vet.district === "Chittagong" ? "Chattogram" : vet.district === "Comilla" ? "Cumilla" : vet.district === "Barisal" ? "Barishal" : vet.district === "Bogra" ? "Bogura" : vet.district === "Jessore" ? "Jashore" : vet.district || "Dhaka";
    const division = vet.division || DISTRICT_TO_DIVISION[normalizedDistrict] || "Dhaka";
    const type = inferClinicType(vet);
    const emergency24h =
        typeof vet.emergency24h === "boolean"
            ? vet.emergency24h
            : (vet.hours || "").toLowerCase().includes("24") ||
              (vet.services || []).some((s) => s?.toLowerCase().includes("24/7") || s?.toLowerCase().includes("24h"));

    return {
        ...vet,
        district: normalizedDistrict,
        division,
        type,
        emergency24h,
    };
}

function getBaseMockClinics(): VetClinic[] {
    return MOCK_VET_CLINICS.map((vet) =>
        enrichClinic({
            ...vet,
            id: vet.id.toString(),
            legacy_id: vet.id,
        })
    );
}

function mergeWithMockClinics(firestoreVets: VetClinic[], baseClinics: VetClinic[]): VetClinic[] {
    const seenNames = new Set(baseClinics.map((v) => normalizeClinicName(v.name)));
    const customClinics: VetClinic[] = [];

    for (const raw of firestoreVets) {
        if (!raw.name || isPlaceholderPhone(raw.phone)) continue;
        const normName = normalizeClinicName(raw.name);
        if (!normName || seenNames.has(normName)) continue;

        seenNames.add(normName);
        customClinics.push(enrichClinic(raw));
    }

    return [...customClinics, ...baseClinics];
}

export const VetService = {
    async getAll(): Promise<VetClinic[]> {
        const baseClinics = getBaseMockClinics();

        try {
            const snapshot = await getDocs(collection(db, COLLECTION_NAME));
            if (!snapshot.empty) {
                const rawVets = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as VetClinic[];

                return mergeWithMockClinics(rawVets, baseClinics);
            }
        } catch (error) {
            console.error("Firebase fetch failed, using verified local directory.", error);
        }

        return baseClinics;
    },

    async getByDistrict(district: string): Promise<VetClinic[]> {
        const allClinics = await this.getAll();
        return allClinics.filter((vet) => vet.district.toLowerCase() === district.toLowerCase());
    },
};
