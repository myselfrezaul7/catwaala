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
        breed: 'Desi Kitten (Bangladeshi Stray)',
        age: '3 weeks',
        gender: 'Female',
        location: "Dhanmondi, Dhaka",
        description: 'Mimi is a tiny newborn kitten found near a tea stall. She is just opening her bright blue eyes, loves warm milk, and purrs softly whenever she is held in warm hands.',
        imageUrl: '/assets/cat1.jpg',
        tag: 'Urgent',
        temperamentTags: ['Newborn', 'Cute', 'Cuddly', 'Needs Milk'],
        vaccinated: false,
        neutered: false,
        goodWithKids: true,
    },
    {
        id: "2",
        name: 'Billu',
        breed: 'Local Tabby Newborn',
        age: '4 weeks',
        gender: 'Male',
        location: "Uttara, Dhaka",
        description: 'Billu is an adorable 4-week-old baby kitten. He loves sleeping in warm fleece blankets and taking tiny catnaps after bottle feeding.',
        imageUrl: '/assets/cat2.jpg',
        tag: 'New',
        temperamentTags: ['Newborn', 'Gentle', 'Sleepyhead', 'Loving'],
        vaccinated: false,
        neutered: false,
        goodWithKids: true,
    },
    {
        id: "3",
        name: 'Motu',
        breed: 'Bangladeshi Desi Kitten',
        age: '2 weeks',
        gender: 'Male',
        location: "Gulshan 1, Dhaka",
        description: 'Motu is a chubby little newborn baby cat! He meows softly for milk and loves snuggling with his siblings under a warm lamp. Pure cuteness.',
        imageUrl: '/assets/cat3.jpg',
        tag: null,
        temperamentTags: ['Newborn', 'Chubby', 'Curious', 'Tiny'],
        vaccinated: false,
        neutered: false,
        goodWithKids: true,
    },
    {
        id: "4",
        name: 'Mishti',
        breed: 'Desi Baby Kitten',
        age: '5 weeks',
        gender: 'Female',
        location: "Mirpur, Dhaka",
        description: 'Mishti is a sweet 5-week-old kitten learning to pounce on yarn balls! She melts into a puddle of purrs as soon as you scratch behind her ears.',
        imageUrl: '/assets/cat1.jpg',
        tag: 'Adopted',
        temperamentTags: ['Kitten', 'Playful', 'Tiny Purrs', 'Apartment Friendly'],
        vaccinated: false,
        neutered: false,
        goodWithKids: true,
    },
    {
        id: "5",
        name: 'Bagha',
        breed: 'Desi Tabby Baby',
        age: '3 weeks',
        gender: 'Male',
        location: "Banani, Dhaka",
        description: 'Named for his tiger-like stripes, Bagha is a tiny newborn kitten. He is very affectionate and falls asleep instantly on a warm lap.',
        imageUrl: '/assets/cat2.jpg',
        tag: null,
        temperamentTags: ['Newborn', 'Unique Coat', 'Sweet', 'Cuddly'],
        vaccinated: false,
        neutered: false,
        goodWithKids: true,
    },
    {
        id: "6",
        name: 'Tuni',
        breed: 'Orphaned Newborn Kitten',
        age: '2 weeks',
        gender: 'Female',
        location: "Bashundhara R/A, Dhaka",
        description: 'Tuni was a tiny orphan rescued from the street. She is a bundle of joy who needs formula milk and a gentle loving home to grow up in.',
        imageUrl: '/assets/cat3.jpg',
        tag: 'Urgent',
        temperamentTags: ['Newborn', 'Orphan', 'Cuddly', 'Needs Warmth'],
        vaccinated: false,
        neutered: false,
        goodWithKids: true,
    },
] as const;

export type AgeCategory = 'Kitten' | 'Adult' | 'Senior';

export function getAgeCategory(age: string): AgeCategory {
    const lowerAge = age.toLowerCase();
    if (lowerAge.includes('week') || lowerAge.includes('month') || lowerAge.includes('day') || (lowerAge.includes('year') && parseInt(age) < 1)) {
        return 'Kitten';
    }
    const years = parseInt(age);
    if (!isNaN(years)) {
        if (years >= 7) return 'Senior';
        return 'Adult';
    }
    return 'Kitten'; // Default for newborn/baby pets
}
