
// FIX: Added imports for new types used in mock data.
import type { Animal, User, SuccessStory, VetClinic, Post, QuizQuestion, VolunteerOpportunity, Memorial, Donation, Application, Vet } from './types';

export const MOCK_ANIMALS: Animal[] = [
  {
    id: 1,
    name: 'Mimi',
    breed: 'Desi Cat (Bangladeshi Stray)',
    age: '2 years',
    gender: 'Female',
    description: 'Mimi is the queen of her neighborhood. She was found charming locals for fish at a tea stall. She has that classic Desi cat intelligence—she knows exactly how to look adorable when she wants treats.',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1000&auto=format&fit=crop',
    temperamentTags: ['Smart', 'Affectionate', 'Street-Smart', 'Good Hunter'],
  },
  {
    id: 2,
    name: 'Billu',
    breed: 'Local Tabby Mix',
    age: '4 years',
    gender: 'Male',
    description: 'Billu is an old soul in a young body. Life on the streets was tough, and now he just wants a warm corner and zero drama. He's the perfect companion: quiet, grateful, and an excellent listener.',
    imageUrl: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=1000&auto=format&fit=crop',
    temperamentTags: ['Calm', 'Gentle', 'Low Energy', 'Loving'],
  },
  {
    id: 3,
    name: 'Motu',
    breed: 'Bangladeshi Desi Cat',
    age: '1 year',
    gender: 'Male',
    description: 'Motu thinks he is a tiger. He's got that signature Desi cat energy and loves to play and explore.If you want an adventure buddy who will keep you entertained, Motu is your guy.',
    imageUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80&w=1000&auto=format&fit=crop',
    temperamentTags: ['High Energy', 'Playful', 'Curious', 'Needs Space'],
  },
  {
    id: 4,
    name: 'Mishti',
    breed: 'Desi Cat',
    age: '8 months',
    gender: 'Female',
    description: 'Mishti has a lot of opinions and she will tell you all of them. A classic Desi stray cat—independent, sassy, but melts into a puddle of purrs once she trusts you. Excellent bug hunter.',
    imageUrl: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?q=80&w=1000&auto=format&fit=crop',
    temperamentTags: ['Chatty', 'Sassy', 'Bug Hunter', 'Apartment Friendly'],
  },
  {
    id: 5,
    name: 'Bagha',
    breed: 'Desi Tabby Mix',
    age: '3 years',
    gender: 'Male',
    description: 'Named for his tiger-like stripes, Bagha is a handsome and distinctive cat. He is very trainable and eager to please with his playful yet gentle nature.',
    imageUrl: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?q=80&w=1000&auto=format&fit=crop',
    temperamentTags: ['Intelligent', 'Trainable', 'Loyal', 'Unique Coat'],
  },
  {
    id: 6,
    name: 'Tuni',
    breed: 'Rescue Kitten',
    age: '3 months',
    gender: 'Female',
    description: 'Tuni was a tiny orphan but is now a bundle of joy. She loves climbing and chasing toy mice. Needs a loving home to grow up in.',
    imageUrl: 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?q=80&w=1000&auto=format&fit=crop',
    temperamentTags: ['Playful', 'Kitten', 'Cuddly', 'Needs Attention'],
  },
  {
    id: 7,
    name: 'Kalu',
    breed: 'Black Desi Cat',
    age: '2 years',
    gender: 'Male',
    description: 'Kalu is a stunning all-black cat with golden eyes. Despite superstitions, he's brought nothing but good luck to everyone who meets him.Super affectionate and loves to cuddle.',
    imageUrl: 'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?q=80&w=1000&auto=format&fit=crop',
    temperamentTags: ['Affectionate', 'Calm', 'Lucky Charm', 'Indoor Cat'],
  },
  {
    id: 8,
    name: 'Shona',
    breed: 'Orange Tabby Desi',
    age: '1.5 years',
    gender: 'Female',
    description: 'Shona lives up to her name meaning "gold"—she has a heart of pure gold. Found near Old Dhaka, she's now ready for a forever home where she can be the princess she deserves to be.',
    imageUrl: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=1000&auto=format&fit=crop',
    temperamentTags: ['Sweet', 'Gentle', 'Lap Cat', 'Good with Kids'],
  },
];

// FIX: Added mock user data for authentication.
export const MOCK_USERS: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password123' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', password: 'password123' },
];

export const BANGLADESH_DISTRICTS: string[] = [
  "Bagerhat", "Bandarban", "Barguna", "Barishal", "Bhola", "Bogura",
  "Brahmanbaria", "Chandpur", "Chattogram", "Chuadanga", "Comilla",
  "Cox's Bazar", "Dhaka", "Dinajpur", "Faridpur", "Feni", "Gaibandha",
  "Gazipur", "Gopalganj", "Habiganj", "Jamalpur", "Jashore", "Jhalokati",
  "Jhenaidah", "Joypurhat", "Khagrachari", "Khulna", "Kishoreganj",
  "Kurigram", "Kushtia", "Lakshmipur", "Lalmonirhat", "Madaripur",
  "Magura", "Manikganj", "Meherpur", "Moulvibazar", "Munshiganj",
  "Mymensingh", "Naogaon", "Narail", "Narayanganj", "Narsingdi", "Natore",
  "Nawabganj", "Netrokona", "Nilphamari", "Noakhali", "Pabna",
  "Panchagarh", "Patuakhali", "Pirojpur", "Rajbari", "Rajshahi",
  "Rangamati", "Rangpur", "Satkhira", "Shariatpur", "Sherpur", "Sirajganj",
  "Sunamganj", "Sylhet", "Tangail", "Thakurgaon"
];


// FIX: Vastly expanded mock vet clinic data for the "Find a Vet" page.
// MAP URLS UPDATED to be functional Google Maps search queries.
export const MOCK_VET_CLINICS: VetClinic[] = [
  // --- DHAKA DIVISION ---
  { id: 1, name: 'PAW Life Care', address: 'House 1/2, Road 2, Block A, Section 10, Mirpur, Dhaka', phone: '+8801712345678', website: 'https://pawlifecare.com', mapUrl: 'https://www.google.com/maps/search/?api=1&query=PAW+Life+Care+Mirpur+Dhaka', hours: '10:00 AM - 8:00 PM', district: 'Dhaka' },
  { id: 2, name: 'PetVet Care', address: 'House 34, Road 12, Block E, Banani, Dhaka', phone: '+8801812345679', website: 'https://petvetcare.com', mapUrl: 'https://www.google.com/maps/search/?api=1&query=PetVet+Care+Banani+Dhaka', hours: '9:00 AM - 9:00 PM', district: 'Dhaka' },
  { id: 3, name: 'Central Veterinary Hospital', address: '42, Kazi Nazrul Islam Ave, Dhaka 1215', phone: '+88029665492', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Central+Veterinary+Hospital+Dhaka', hours: '24 Hours', district: 'Dhaka' },
  { id: 4, name: 'Gulshan Pet Animal Clinic', address: 'House 20, Road 55, Gulshan 2, Dhaka', phone: '+8801912345680', website: 'https://gulshanpetclinic.com', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Gulshan+Pet+Animal+Clinic+Dhaka', hours: '11:00 AM - 7:00 PM', district: 'Dhaka' },
  { id: 5, name: 'Obhoyaronno Vet Clinic', address: 'House-3, Road-1, Sector-1, Uttara, Dhaka 1230', phone: '+8801718123456', website: 'http://obhoyaronno.org', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Obhoyaronno+Vet+Clinic+Uttara+Dhaka', hours: '10:00 AM - 7:00 PM', district: 'Dhaka' },
  { id: 6, name: 'The VET', address: 'House 7, Road 2/A, Sector 4, Uttara, Dhaka', phone: '+8801313303303', website: 'https://thevet.com.bd', mapUrl: 'https://www.google.com/maps/search/?api=1&query=The+VET+Uttara+Dhaka', hours: '10:00 AM - 10:00 PM', district: 'Dhaka' },
  { id: 7, name: 'Care & Cure Vet Chamber', address: '5/4, Block-F, Lalmatia, Dhaka', phone: '+8801711234567', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Care+and+Cure+Vet+Chamber+Lalmatia', hours: '5:00 PM - 9:00 PM', district: 'Dhaka' },
  { id: 8, name: 'Central Veterinary Hospital', address: '48 Kazi Alauddin Road, Dhaka-1000', phone: '01745-137090', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Central+Veterinary+Hospital+Dhaka', hours: '9 AM - 5 PM', district: 'Dhaka' },
  { id: 9, name: 'Gulshan Pet-Animal Clinic', address: '4-5 DCC Super Market, Gulshan-2, Dhaka-1212', phone: '01715-078434', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Gulshan+Pet-Animal+Clinic', hours: '10 AM - 9 PM', district: 'Dhaka' },
  { id: 10, name: 'PAW Life Care', address: '1/12, Block-G, Lalmatia, Dhaka 1207', phone: '01909-617994', mapUrl: 'https://www.google.com/maps/search/?api=1&query=PAW+Life+Care+Lalmatia', hours: '10 AM - 10 PM', district: 'Dhaka' },

  // --- CHITTAGONG DIVISION ---
  { id: 11, name: 'Chattogram Veterinary and Animal Sciences University (CVASU)', address: 'Zakir Hossain Rd, Khulshi, Chittagong 4202', phone: '01314-300655', mapUrl: 'https://www.google.com/maps/search/?api=1&query=CVASU+Chittagong', hours: '9 AM - 5 PM', district: 'Chattogram' },
  { id: 12, name: 'VET AID', address: 'Oxygen Square, Chittagong', phone: '01886-377425', mapUrl: 'https://www.google.com/maps/search/?api=1&query=VET+AID+Chittagong', hours: '10 AM - 8 PM', district: 'Chattogram' },
  { id: 13, name: 'Antidote - Complete Veterinary Care', address: '402/A Garden City Complex, M M Ali Road, Chittagong', phone: '01670-433184', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Antidote+Veterinary+Care', hours: '10 AM - 9 PM', district: 'Chattogram' },
  { id: 14, name: 'Pawspital Veterinary Care', address: 'Metro Plaza, Sadarghat Rd, Chittagong', phone: '01703-835553', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Pawspital+Veterinary+Care', hours: '10 AM - 8 PM', district: 'Chattogram' },
  { id: 15, name: 'District Animal Hospital', address: 'Abdur Rahman Rd, Chittagong 4000', phone: '031-617949', mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Animal+Hospital+Chittagong', hours: '9 AM - 5 PM', district: 'Chattogram' },
  { id: 16, name: 'Pet Care Point', address: 'F58F+4F5, Police Lines Rd, Comilla', phone: '01912-595738', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Pet+Care+Point+Comilla', hours: '10 AM - 8 PM', district: 'Comilla' },
  { id: 17, name: 'Zilla Veterinary Hospital', address: 'Kandirpar, Comilla 3500', phone: '01876-354898', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Zilla+Veterinary+Hospital+Comilla', hours: '9 AM - 5 PM', district: 'Comilla' },

  // --- SYLHET DIVISION ---
  { id: 30, name: 'Sylhet District Veterinary Hospital', address: 'Tilagor, Sylhet', phone: '01711-287533', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Sylhet+District+Veterinary+Hospital', hours: '9 AM - 5 PM', district: 'Sylhet' },
  { id: 31, name: 'Pet and Vet Care', address: 'Deen Central Market, Sylhet 3100', phone: '01675-014088', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Pet+and+Vet+Care+Sylhet', hours: '10 AM - 8 PM', district: 'Sylhet' },
  { id: 115, name: 'SAU Veterinary Clinic', address: 'Sylhet Agricultural University, Sylhet', phone: '+880821761623', mapUrl: 'https://www.google.com/maps/search/?api=1&query=SAU+Veterinary+Clinic+Sylhet', hours: '9 AM - 5 PM', district: 'Sylhet' },
  { id: 116, name: 'Habiganj District Veterinary Hospital', address: 'Sadar, Habiganj', phone: '+88083162120', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Habiganj+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Habiganj' },

  // --- RAJSHAHI DIVISION ---
  { id: 39, name: 'Raninagar Veterinary Hospital', address: 'Monnafer Mor, Bir Sreshtho Shaheed Captain Mohiuddin Jahangir Smarani, Rajshahi', phone: '01712-441252', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Raninagar+Veterinary+Hospital', hours: '9 AM - 5 PM', district: 'Rajshahi' },
  { id: 40, name: 'Birds and Pet Animal Clinic', address: 'Dorikhorbona, Uposhohor, Rajshahi', phone: '01780-790526', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Birds+and+Pet+Animal+Clinic+Rajshahi', hours: '10 AM - 8 PM', district: 'Rajshahi' },
  { id: 33, name: 'Dinajpur District Veterinary Hospital', address: 'Balubari, Dinajpur', phone: '+88053165430', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Dinajpur+District+Veterinary+Hospital', hours: '9 AM - 5 PM', district: 'Dinajpur' },

  // --- KHULNA DIVISION ---
  { id: 139, name: 'Birds and Pet Animal Clinic (BPAC), Khulna', address: '52 Hazi Mohshin Road, Khulna-9100', phone: '01890-724874', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Birds+and+Pet+Animal+Clinic+Khulna', hours: '9 AM - 9 PM', district: 'Khulna' },
  { id: 140, name: 'Priyo Pet & Vet Care', address: 'House 105/A, Road 02, Nirala, Khulna', phone: '01973-968669', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Priyo+Pet+Vet+Care+Khulna', hours: '10 AM - 8 PM', district: 'Khulna' },
  { id: 141, name: 'Khulna Pet Clinic', address: '5 Choto Boyra Bazar Rd, Khulna 9000', phone: '01777-889994', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Khulna+Pet+Clinic', hours: '10 AM - 8 PM', district: 'Khulna' },
  { id: 142, name: 'District Veterinary Hospital', address: 'Sadar, Khulna', phone: 'N/A', mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Veterinary+Hospital+Khulna', hours: '9 AM - 5 PM', district: 'Khulna' },

  // --- BARISHAL DIVISION ---
  { id: 28, name: 'Animal Hospital Barishal', address: 'Poshu Hospital Road, Barishal', phone: '+88043164870', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Animal+Hospital+Barishal', hours: '9 AM - 5 PM', district: 'Barishal' },
  { id: 29, name: 'Patuakhali District Veterinary Hospital', address: 'Patuakhali Sadar, Patuakhali', phone: '+88044162120', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Patuakhali+District+Veterinary+Hospital', hours: '9 AM - 5 PM', district: 'Patuakhali' },

  // --- MYMENSINGH DIVISION ---
  { id: 34, name: 'BAU Veterinary Teaching Hospital', address: 'Bangladesh Agricultural University, Mymensingh', phone: '01717-610621', mapUrl: 'https://www.google.com/maps/search/?api=1&query=BAU+Veterinary+Teaching+Hospital', hours: '9 AM - 5 PM', district: 'Mymensingh' },
  { id: 35, name: 'Mymensingh Iron Hide Vet. Clinic', address: 'Sadar, Mymensingh', phone: '01774-477688', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Mymensingh+Iron+Hide+Vet+Clinic', hours: '10 AM - 8 PM', district: 'Mymensingh' },

  // --- RANGPUR DIVISION ---
  { id: 32, name: 'Rangpur District Veterinary Hospital', address: 'Sadar, Rangpur', phone: '+88052162340', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Rangpur+District+Veterinary+Hospital', hours: '9 AM - 5 PM', district: 'Rangpur' },
];


// FIX: Added mock vet data for the deprecated Online Vet page.
export const MOCK_VETS: Vet[] = [
  {
    id: 1,
    name: 'Dr. Ayesha Khan',
    specialization: 'Feline Specialist',
    imageUrl: 'https://picsum.photos/seed/vet1/200/200',
    isOnline: true,
  },
  {
    id: 2,
    name: 'Dr. Barun Sobti',
    specialization: 'Cat Dermatology',
    imageUrl: 'https://picsum.photos/seed/vet2/200/200',
    isOnline: false,
  },
  {
    id: 3,
    name: 'Dr. Chandni Chowdhury',
    specialization: 'General Practitioner',
    imageUrl: 'https://picsum.photos/seed/vet3/200/200',
    isOnline: true,
  },
  {
    id: 4,
    name: 'Dr. Danish Ahmed',
    specialization: 'Cat Nutrition Expert',
    imageUrl: 'https://picsum.photos/seed/vet4/200/200',
    isOnline: false,
  },
];


// FIX: Added mock success stories for the homepage.
export const MOCK_SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 1,
    name: 'Meow',
    imageUrl: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=500&auto=format&fit=crop',
    story: '"I wasn\'t looking for a cat, but then I saw Meow hiding behind a flower pot in Dhanmondi. Now? She owns the house. She steals my hair ties and sleeps on my pillow, and I wouldn\'t have it any other way." - The Rahman Family',
  },
  {
    id: 2,
    name: 'Chhotu',
    imageUrl: 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?q=80&w=500&auto=format&fit=crop',
    story: '"Chhotu was so scared at first, but with a little patience, he blossomed into the most affectionate cat. His purrs are the best therapy. Thank you, CATWAALA!" - Ms. Anika',
  },
  {
    id: 3,
    name: 'Ginger',
    imageUrl: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=500&auto=format&fit=crop',
    story: '"Typical Desi cat—smart effectively. She learned her name in two days but pretends she can\'t hear me when it\'s bath time. Ginger has brought so much joy into our lives." - The Hossain Couple',
  },
];

// FIX: Added mock posts for the community page.
export const MOCK_POSTS: Post[] = [
  {
    id: 1,
    author: { id: 1, name: 'John Doe' },
    content: 'Just adopted this little guy! Everyone, meet Whiskers. He\'s a bit shy but so full of love. Any tips for helping a rescue cat settle into a new home?',
    imageUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80&w=600&auto=format&fit=crop',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    likes: 15,
    comments: [
      { id: 1, author: { id: 2, name: 'Jane Smith' }, content: 'Congratulations! So cute! Give him a quiet space and let him come to you.', timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString() },
      { id: 2, author: { id: 1, name: 'John Doe' }, content: 'Thanks, Jane! We\'re taking it slow.', timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString() },
    ],
  },
  {
    id: 2,
    author: { id: 2, name: 'Jane Smith' },
    content: 'Does anyone have recommendations for a good, sturdy scratching post? My cat destroys everything!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
    likes: 8,
    comments: [],
  },
  {
    id: 3,
    author: { id: 1, name: 'John Doe' },
    content: 'Beautiful sunny spot for my cat today! #catlife #adoptdontshop',
    imageUrl: 'https://images.unsplash.com/photo-1511044568932-338cba0ad803?q=80&w=600&auto=format&fit=crop',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    likes: 22,
    comments: [
      { id: 3, author: { id: 2, name: 'Jane Smith' }, content: 'So cozy!', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString() },
    ],
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionText: 'What is your ideal energy level in a cat?',
    options: [
      { text: 'A chill companion for movie marathons 🛋️', tags: ['Calm', 'Low Energy', 'Apartment Friendly'] },
      { text: 'A playful buddy for daily fun 🎾', tags: ['Playful', 'Friendly', 'Curious'] },
      { text: 'An active explorer who loves to climb 🧗', tags: ['High Energy', 'Curious', 'Needs Space'] },
    ],
  },
  {
    id: 2,
    questionText: 'What describes your living situation?',
    options: [
      { text: 'Apartment / Small Space 🏢', tags: ['Apartment Friendly', 'Calm'] },
      { text: 'House with some outdoor access 🏡', tags: ['Playful', 'Indoor-Outdoor'] },
      { text: 'Large home with garden 🌳', tags: ['Needs Space', 'High Energy', 'Independent'] },
    ],
  },
  {
    id: 3,
    questionText: 'Who lives in your home?',
    options: [
      { text: 'Just me (and maybe a partner) 🧍', tags: ['Loyal', 'Independent', 'Needs Attention'] },
      { text: 'Family with young kids 👨‍👩‍👧‍👦', tags: ['Good with Kids', 'Gentle', 'Playful'] },
      { text: 'Multi-pet household 🐱🐱', tags: ['Friendly', 'Social', 'Non-Aggressive'] },
    ],
  },
  {
    id: 4,
    questionText: 'How much grooming time can you dedicate?',
    options: [
      { text: 'Daily brushing sessions! (High effort) 🎓', tags: ['Long Hair', 'High Maintenance'] },
      { text: 'Weekly grooming (Medium effort) 🐱', tags: ['Medium Coat', 'Smart'] },
      { text: 'I prefer low-maintenance cats (Low effort) 😌', tags: ['Short Hair', 'Low Energy', 'Easy Care'] },
    ],
  },
];

export const MOCK_VOLUNTEER_OPPORTUNITIES: VolunteerOpportunity[] = [
  {
    id: 1,
    title: 'Adoption Event Assistant',
    description: 'Help set up, manage, and tear down our weekend adoption events. Assist with handling cats and talking to potential adopters.',
    date: 'Every Saturday',
    location: 'Dhaka North Community Center',
    requiredSkills: ['Good with cats', 'Friendly personality', 'Customer service'],
  },
  {
    id: 2,
    title: 'Rescue Transport Driver',
    description: 'Use your own vehicle to help transport cats from rescue locations to our shelter or to veterinary appointments.',
    date: 'As needed',
    location: 'Various locations in Dhaka',
    requiredSkills: ['Valid driver\'s license', 'Reliable vehicle', 'Calm under pressure'],
  },
  {
    id: 3,
    title: 'Fundraising Gala Volunteer',
    description: 'Assist with our annual fundraising gala. Roles include guest check-in, auction assistance, and general event support.',
    date: 'November 15, 2024',
    location: 'Gulshan Club',
    requiredSkills: ['Event experience', 'Organized', 'Professional demeanor'],
  },
];

export const MOCK_MEMORIALS: Memorial[] = [
  {
    id: 1,
    petName: 'Rani',
    ownerName: 'The Karim Family',
    imageUrl: 'https://images.unsplash.com/photo-1571566882372-1598d88abd90?q=80&w=500&auto=format&fit=crop',
    tribute: 'Rani was more than a pet; she was our family. For 14 wonderful years, she gave us unconditional love and joy. We miss her gentle purrs every single day. Run free, our dear friend.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(), // 10 days ago
  },
  {
    id: 2,
    petName: 'Mini',
    ownerName: 'Sadia',
    imageUrl: 'https://images.unsplash.com/photo-1494256997604-768d1f608cac?q=80&w=500&auto=format&fit=crop',
    tribute: 'My little Mini, the bravest cat I ever knew. You fought so hard. The house is too quiet without your meows. Thank you for choosing me.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
  },
  {
    id: 3,
    petName: 'Tiger',
    ownerName: 'Imran & Faria',
    imageUrl: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=500&auto=format&fit=crop',
    tribute: 'To our beloved Tiger, the neighborhood king. You brought so much laughter with your silly antics. We\'ll never forget you. Thank you for all the memories.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
  },
];

export const MOCK_DONATIONS: Donation[] = [
  { id: 1, amount: 500, date: '2024-07-15', method: 'bKash' },
  { id: 2, amount: 2000, date: '2024-06-28', method: 'Bank Transfer' },
  { id: 3, amount: 1000, date: '2024-05-10', method: 'Nagad' },
];

export const MOCK_APPLICATIONS: Application[] = [
  { id: 1, animalName: 'Mimi', animalId: 1, date: '2024-07-20', status: 'In Review' },
  { id: 2, animalName: 'Billu', animalId: 2, date: '2024-06-12', status: 'Approved' },
];
