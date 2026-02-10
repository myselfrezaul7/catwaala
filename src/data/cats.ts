export type Cat = {
    id: string;
    name: string;
    breed: string;
    age: string;
    gender: string;
    location: string;
    description: string;
    imageUrl: string;
    tag: string | null;
    temperamentTags: string[];
    vaccinated: boolean;
    neutered: boolean;
    goodWithKids: boolean;
};

export const cats: Cat[] = [
    {
        id: "1",
        name: 'Mimi',
        breed: 'Desi Cat (Bangladeshi Stray)',
        age: '2 years',
        gender: 'Female',
        location: "Dhanmondi, Dhaka",
        description: 'Mimi is the queen of her neighborhood. She was found charming locals for fish at a tea stall. She has that classic Desi cat intelligence; she knows exactly how to look adorable when she wants treats.',
        imageUrl: '/assets/cat1.jpg', // Placeholder, in real app would use ported assets
        tag: 'Urgent',
        temperamentTags: ['Smart', 'Affectionate', 'Street-Smart', 'Good Hunter'],
        vaccinated: true,
        neutered: true,
        goodWithKids: true,
    },
    {
        id: "2",
        name: 'Billu',
        breed: 'Local Tabby Mix',
        age: '4 years',
        gender: 'Male',
        location: "Uttara, Dhaka",
        description: 'Billu is an old soul in a young body. Life on the streets was tough, and now he just wants a warm corner and zero drama. He\'s the perfect companion: quiet, grateful, and an excellent listener.',
        imageUrl: '/assets/cat2.jpg',
        tag: 'New',
        temperamentTags: ['Calm', 'Gentle', 'Low Energy', 'Loving'],
        vaccinated: true,
        neutered: true,
        goodWithKids: true,
    },
    {
        id: "3",
        name: 'Motu',
        breed: 'Bangladeshi Desi Cat',
        age: '1 year',
        gender: 'Male',
        location: "Gulshan 1, Dhaka",
        description: 'Motu thinks he is a tiger. He\'s got that signature Desi cat energy and loves to play and explore. If you want an adventure buddy who will keep you entertained, Motu is your guy.',
        imageUrl: '/assets/cat3.jpg',
        tag: null,
        temperamentTags: ['High Energy', 'Playful', 'Curious', 'Needs Space'],
        vaccinated: true,
        neutered: false,
        goodWithKids: false,
    },
    {
        id: "4",
        name: 'Mishti',
        breed: 'Desi Cat',
        age: '8 months',
        gender: 'Female',
        location: "Mirpur, Dhaka",
        description: 'Mishti has a lot of opinions and she will tell you all of them. A classic Desi stray cat: independent, sassy, but melts into a puddle of purrs once she trusts you. Excellent bug hunter.',
        imageUrl: '/assets/cat1.jpg',
        tag: 'Adopted',
        temperamentTags: ['Chatty', 'Sassy', 'Bug Hunter', 'Apartment Friendly'],
        vaccinated: true,
        neutered: true,
        goodWithKids: true,
    },
    {
        id: "5",
        name: 'Bagha',
        breed: 'Desi Tabby Mix',
        age: '3 years',
        gender: 'Male',
        location: "Banani, Dhaka",
        description: 'Named for his tiger-like stripes, Bagha is a handsome and distinctive cat. He is very trainable and eager to please with his playful yet gentle nature.',
        imageUrl: '/assets/cat2.jpg',
        tag: null,
        temperamentTags: ['Intelligent', 'Trainable', 'Loyal', 'Unique Coat'],
        vaccinated: true,
        neutered: true,
        goodWithKids: true,
    },
    {
        id: "6",
        name: 'Tuni',
        breed: 'Rescue Kitten',
        age: '3 months',
        gender: 'Female',
        location: "Bashundhara R/A, Dhaka",
        description: 'Tuni was a tiny orphan but is now a bundle of joy. She loves climbing and chasing toy mice. Needs a loving home to grow up in.',
        imageUrl: '/assets/cat3.jpg',
        tag: 'Urgent',
        temperamentTags: ['Playful', 'Kitten', 'Cuddly', 'Needs Attention'],
        vaccinated: false,
        neutered: false,
        goodWithKids: true,
    },
] as const;

export type AgeCategory = 'Kitten' | 'Adult' | 'Senior';

export function getAgeCategory(age: string): AgeCategory {
    const lowerAge = age.toLowerCase();
    if (lowerAge.includes('month') || (lowerAge.includes('year') && parseInt(age) < 1)) {
        return 'Kitten';
    }
    const years = parseInt(age);
    if (!isNaN(years)) {
        if (years >= 7) return 'Senior';
        return 'Adult';
    }
    return 'Adult'; // Default
}
