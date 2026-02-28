export type Profile = {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
    phone: string | null;
    role: 'user' | 'admin';
    created_at: string;
};

export type Cat = {
    id: string | number;
    name: string;
    age: number;
    gender: 'Male' | 'Female';
    breed: string | null;
    location: string;
    description: string | null;
    attributes: {
        vaccinated: boolean;
        neutered: boolean;
        goodWithKids: boolean;
        houseTrained: boolean;
    };
    images: string[];
    status: 'Available' | 'Adopted' | 'Pending';
    created_at: string;
};

export type Memorial = {
    id: string | number;
    pet_name: string;
    owner_name: string;
    tribute: string;
    image_url: string | null;
    user_id: string | null;
    status?: 'Pending' | 'Approved' | 'Rejected';
    created_at: string;
};

export type Report = {
    id: string | number;
    type: 'Lost' | 'Found' | 'Injured';
    description: string | null;
    latitude: number | null;
    longitude: number | null;
    location_text: string | null;
    contact_info: string | null;
    image_url: string | null;
    user_id: string | null;
    status: 'Open' | 'Resolved';
    created_at: string;
};

export type Vet = {
    id: number;
    name: string;
    address: string;
    phone: string | null;
    latitude: number | null;
    longitude: number | null;
    rating: number;
    services: string[];
    website: string | null;
    image_url: string | null;
    created_at: string;
};
