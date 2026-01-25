export type Memorial = {
    id: number;
    petName: string;
    ownerName: string;
    imageUrl: string;
    tribute: string;
    timestamp: string;
};

export const MOCK_MEMORIALS: Memorial[] = [
    {
        id: 1,
        petName: 'Mini',
        ownerName: 'Sadia',
        imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1000&auto=format&fit=crop',
        tribute: 'My little Mini, the bravest cat I ever knew. You fought so hard. The house is too quiet without your purrs. Thank you for choosing me.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
    },
    {
        id: 2,
        petName: 'Tiger',
        ownerName: 'Imran & Faria',
        imageUrl: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=1000&auto=format&fit=crop',
        tribute: 'To our beloved Tiger, the neighborhood king. You brought so much laughter with your silly antics. We\'ll never forget you. Thank you for all the memories.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    },
    {
        id: 3,
        petName: 'Snowball',
        ownerName: 'The Rahman Family',
        imageUrl: 'https://images.unsplash.com/photo-1495360019602-e001921678fe?q=80&w=1000&auto=format&fit=crop',
        tribute: 'Pure white and pure heart. Snowball was our first rescue and changed our lives forever. Run free, sweet angel.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    }
];
