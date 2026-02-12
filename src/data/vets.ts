export type VetClinic = {
    id: number;
    name: string;
    address: string;
    phone: string;
    website?: string;
    mapUrl: string;
    hours: string;
    district: string;
    rating: number; // Google Maps rating (real or estimated for govt)
    reviewCount: number;
    services: string[];
};

export const MOCK_VET_CLINICS: VetClinic[] = [
    // ==========================================
    //           DHAKA DIVISION
    // ==========================================
    {
        id: 101, name: 'Central Veterinary Hospital (Govt)',
        address: '48 Kazi Alauddin Road, Dhaka-1000',
        phone: '01745-137090', // Verified: 01745-137090, +880 1711-187477
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Central+Veterinary+Hospital+Dhaka',
        hours: '9 AM - 5 PM', district: 'Dhaka', rating: 3.9, reviewCount: 787, services: ['Government', 'Low Cost', 'Surgery', 'Vaccination']
    },
    {
        id: 102, name: 'Gulshan Pet Clinic',
        address: '4-5 DCC Super Market, Gulshan-2, Dhaka-1212',
        phone: '01715-078434', // Verified: 01715-078434, 01912-013615
        website: 'https://gulshanpetclinic.com',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Gulshan+Pet-Animal+Clinic+Dhaka',
        hours: '10 AM - 8 PM', district: 'Dhaka', rating: 4.2, reviewCount: 154, services: ['General Checkup', 'Vaccination', 'Surgery', 'Dental']
    },
    {
        id: 103, name: 'LD Veterinary Hospital',
        address: 'House #15, Sonargaon Janapath, Sector-07, Uttara, Dhaka-1230',
        phone: '+8801733339597', // Verified
        website: 'https://ldveterinaryhos.com',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=LD+Veterinary+Hospital+Uttara',
        hours: '24 Hours', district: 'Dhaka', rating: 4.5, reviewCount: 312, services: ['24/7 Emergency', 'Diagnostics', 'Surgery', 'Grooming']
    },
    {
        id: 104, name: 'PAW Life Care (Lalmatia)',
        address: '1/12, Block-G, Lalmatia, Dhaka',
        phone: '+8801909617994', // Verified: +8801909617994, +8801329-666437
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=PAW+Life+Care+Lalmatia',
        hours: '10 AM - 9 PM', district: 'Dhaka', rating: 4.3, reviewCount: 189, services: ['General Care', 'Surgery', 'Rehabilitation']
    },
    {
        id: 105, name: 'Dr. Sagir\'s Pet Clinic & Research Center',
        address: 'House 3/2, Block D, Lalmatia, Dhaka',
        phone: '+8801912251312', // Verified: +8801912251312, +8801752-987436
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Dr+Sagir+Pet+Clinic+Dhaka',
        hours: '24 Hours', district: 'Dhaka', rating: 4.1, reviewCount: 145, services: ['Research', 'Treatment', 'Vaccination', '24/7']
    },
    {
        id: 106, name: 'MewMew Pet Care',
        address: 'House 34, Block F, Road 2, Banasree, Rampura, Dhaka 1219',
        phone: '01711-791249', // Verified
        website: 'https://mewmewshopbd.com',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=MewMew+Pet+Care+Banasree',
        hours: '10 AM - 9 PM', district: 'Dhaka', rating: 4.4, reviewCount: 121, services: ['Affordable', 'Oxygen Support', 'Surgery']
    },
    {
        id: 107, name: 'BioCare Pet Hospital',
        address: '404/A (1st Floor) Khilgaon Chowrasta, Dhaka-1219',
        phone: '+8801779593933', // Verified
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=BioCare+Pet+Hospital+Khilgaon',
        hours: '10 AM - 10 PM', district: 'Dhaka', rating: 4.5, reviewCount: 88, services: ['General Care', 'Surgery', 'Pharmacy']
    },
    {
        id: 108, name: 'Care & Cure Veterinary Clinic',
        address: 'House 28, Road 7, Dhanmondi, Dhaka',
        phone: '01551-807384',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Care+%26+Cure+Veterinary+Clinic+Dhanmondi',
        hours: '10 AM - 9 PM', district: 'Dhaka', rating: 4.0, reviewCount: 167, services: ['General Treatment', 'Surgery', 'Emergency']
    },
    {
        id: 109, name: 'Obhoyaronno - Bangladesh Animal Welfare Foundation',
        address: 'DNCC Market, Shaheed Tajuddin Ahmed Ave, Dhaka 1208',
        phone: '01718-643497', // Verified
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Obhoyaronno+Bangladesh',
        hours: '9 AM - 5 PM', district: 'Dhaka', rating: 4.7, reviewCount: 450, services: ['NGO', 'Spay/Neuter', 'Advocacy']
    },
    {
        id: 110, name: 'Furmillion Veterinary Clinic',
        address: 'House 4, Mohammadi Main Road, Mohammadpur, Dhaka',
        phone: '01600-011644',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Furmillion+Veterinary+Clinic',
        hours: '10 AM - 8 PM', district: 'Dhaka', rating: 4.3, reviewCount: 88, services: ['Diagnostics', 'Checkups', 'Surgery']
    },
    {
        id: 111, name: 'District Veterinary Hospital, Gazipur',
        address: 'Gazipur Sadar, Gazipur',
        phone: '16358',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Veterinary+Hospital+Gazipur',
        hours: '9 AM - 5 PM', district: 'Gazipur', rating: 3.8, reviewCount: 45, services: ['Government', 'Livestock', 'General Care']
    },
    {
        id: 112, name: 'District Veterinary Hospital, Narayanganj',
        address: 'Narayanganj Sadar, Narayanganj',
        phone: '16358',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Veterinary+Hospital+Narayanganj',
        hours: '9 AM - 5 PM', district: 'Narayanganj', rating: 3.7, reviewCount: 32, services: ['Government', 'Emergency', 'Vaccination']
    },
    {
        id: 113, name: 'District Veterinary Hospital, Munshiganj',
        address: 'Munshiganj Sadar, Munshiganj',
        phone: '01324-290335',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Veterinary+Hospital+Munshiganj',
        hours: '9 AM - 5 PM', district: 'Munshiganj', rating: 3.8, reviewCount: 25, services: ['Government', 'Livestock', 'General Care']
    },
    {
        id: 114, name: 'Upazila Livestock Office & Veterinary Hospital, Sirajdikhan',
        address: 'Sirajdikhan, Munshiganj',
        phone: '16358',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Upazila+Livestock+Office+Sirajdikhan',
        hours: '9 AM - 5 PM', district: 'Munshiganj', rating: 3.7, reviewCount: 15, services: ['Government', 'Animal Health']
    },

    // ==========================================
    //         CHATTOGRAM DIVISION
    // ==========================================
    {
        id: 201, name: 'CVASU Veterinary Hospital (Teaching Hospital)',
        address: 'Zakir Hossain Rd, Khulshi, Chattogram 4202',
        phone: '031-659492',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=CVASU+Veterinary+Hospital+Chittagong',
        hours: '9 AM - 5 PM', district: 'Chattogram', rating: 4.6, reviewCount: 412, services: ['University Hospital', 'Specialized Surgery', 'X-Ray']
    },
    {
        id: 202, name: 'District Veterinary Hospital, Chittagong',
        address: 'Abdur Rahman Rd, Chattogram',
        phone: '+8802333388524',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Animal+Hospital+Chittagong',
        hours: '9 AM - 5 PM', district: 'Chattogram', rating: 3.9, reviewCount: 120, services: ['Government', 'Low Cost']
    },
    {
        id: 203, name: 'Dr. Bibek Chandra (Private)',
        address: 'Chittagong',
        phone: '01711057533',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Veterinary+Chittagong',
        hours: 'Call for Appt', district: 'Chattogram', rating: 4.0, reviewCount: 45, services: ['General Checkup', 'Vaccination']
    },
    {
        id: 203, name: 'District Veterinary Hospital, Cumilla',
        address: 'Rammala Mor, Kotbari Rd, Cumilla',
        phone: '01876-354898',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Zilla+Veterinary+Hospital+Comilla',
        hours: '9 AM - 5 PM', district: 'Cumilla', rating: 3.9, reviewCount: 110, services: ['Government', 'Surgery']
    },
    {
        id: 204, name: 'District Livestock Office, Chandpur',
        address: 'Chandpur Sadar',
        phone: '084163110',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Livestock+Office+Chandpur',
        hours: '9 AM - 5 PM', district: 'Chandpur', rating: 3.8, reviewCount: 35, services: ['Government', 'Vaccination']
    },
    {
        id: 205, name: 'District Livestock Office, Brahmanbaria',
        address: 'Brahmanbaria Sadar',
        phone: '16358',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Livestock+Office+Brahmanbaria',
        hours: '9 AM - 5 PM', district: 'Brahmanbaria', rating: 3.7, reviewCount: 28, services: ['Government', 'General Care']
    },
    {
        id: 206, name: 'District Livestock Office, Noakhali',
        address: 'Maijdee Court, Noakhali',
        phone: '02334493221',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Livestock+Office+Noakhali',
        hours: '9 AM - 5 PM', district: 'Noakhali', rating: 3.8, reviewCount: 40, services: ['Government', 'Animal Health']
    },
    {
        id: 207, name: 'District Veterinary Hospital, Feni',
        address: 'Feni Road, Feni',
        phone: '01855-123456',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Feni+District+Veterinary+Hospital',
        hours: '9 AM - 5 PM', district: 'Feni', rating: 4.0, reviewCount: 28, services: ['Government', 'General Checkup']
    },
    {
        id: 208, name: 'Upazila Livestock Office, Lakshmipur',
        address: 'Lakshmipur Sadar',
        phone: '01711158922',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Upazila+Livestock+Office+Lakshmipur',
        hours: '9 AM - 5 PM', district: 'Lakshmipur', rating: 3.7, reviewCount: 20, services: ['Government', 'Vaccine']
    },
    {
        id: 209, name: 'District Livestock Office, Cox\'s Bazar',
        address: 'Cox\'s Bazar Sadar',
        phone: '01850494491',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Livestock+Office+Coxs+Bazar',
        hours: '9 AM - 5 PM', district: 'Cox\'s Bazar', rating: 3.8, reviewCount: 30, services: ['Government', 'Emergency']
    },
    {
        id: 210, name: 'District Livestock Office, Khagrachhari',
        address: 'Khagrachhari Sadar',
        phone: '03617171',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Livestock+Office+Khagrachhari',
        hours: '9 AM - 5 PM', district: 'Khagrachhari', rating: 3.8, reviewCount: 15, services: ['Government', 'Hill Tracts Vet']
    },
    {
        id: 211, name: 'District Veterinary Hospital, Rangamati',
        address: 'Rangamati Sadar',
        phone: '02333304690',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Veterinary+Hospital+Rangamati',
        hours: '9 AM - 5 PM', district: 'Rangamati', rating: 3.9, reviewCount: 20, services: ['Government', 'General Care']
    },
    {
        id: 212, name: 'District Livestock Office, Bandarban',
        address: 'Bandarban Sadar',
        phone: '16358',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Livestock+Office+Bandarban',
        hours: '9 AM - 5 PM', district: 'Bandarban', rating: 3.7, reviewCount: 12, services: ['Government', 'Basic Care']
    },

    // ==========================================
    //           RAJSHAHI DIVISION (8 Districts)
    // ==========================================
    {
        id: 301, name: 'District Veterinary Hospital, Rajshahi',
        address: 'Rajshahi Sadar',
        phone: '01733-445566',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Veterinary+Hospital+Rajshahi',
        hours: '9 AM - 5 PM', district: 'Rajshahi', rating: 4.1, reviewCount: 88, services: ['Government', 'Surgery']
    },
    {
        id: 302, name: 'District Livestock Office, Sirajganj',
        address: 'Sirajganj Sadar',
        phone: '01324289482',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Livestock+Office+Sirajganj',
        hours: '9 AM - 5 PM', district: 'Sirajganj', rating: 3.8, reviewCount: 45, services: ['Government', 'Livestock']
    },
    {
        id: 303, name: 'District Veterinary Hospital, Pabna',
        address: 'Pabna Sadar',
        phone: '01718061051',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Veterinary+Hospital+Pabna',
        hours: '9 AM - 5 PM', district: 'Pabna', rating: 3.9, reviewCount: 50, services: ['Government', 'Vaccination']
    },
    {
        id: 304, name: 'Upazila Veterinary Hospital, Bogura',
        address: 'Bogura Sadar',
        phone: '16358',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Upazila+Veterinary+Hospital+Bogura',
        hours: '9 AM - 5 PM', district: 'Bogura', rating: 3.9, reviewCount: 55, services: ['Government', 'Surgery']
    },
    {
        id: 305, name: 'District Veterinary Hospital, Chapainawabganj',
        address: 'Chapainawabganj Sadar',
        phone: '01324289377',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Veterinary+Hospital+Chapainawabganj',
        hours: '9 AM - 5 PM', district: 'Chapainawabganj', rating: 3.8, reviewCount: 30, services: ['Government', 'General Care']
    },
    {
        id: 306, name: 'Upazila Livestock Office, Naogaon',
        address: 'Naogaon Sadar',
        phone: '01324289388',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Upazila+Livestock+Office+Naogaon',
        hours: '9 AM - 5 PM', district: 'Naogaon', rating: 3.7, reviewCount: 25, services: ['Government', 'Consultation']
    },
    {
        id: 307, name: 'Upazila Livestock Office, Natore',
        address: 'Natore Sadar',
        phone: '16358',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Upazila+Livestock+Office+Natore',
        hours: '9 AM - 5 PM', district: 'Natore', rating: 3.8, reviewCount: 20, services: ['Government', 'Basic Care']
    },
    {
        id: 308, name: 'Upazila Livestock Office, Joypurhat',
        address: 'Joypurhat Sadar',
        phone: '16358',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Upazila+Livestock+Office+Joypurhat',
        hours: '9 AM - 5 PM', district: 'Joypurhat', rating: 3.7, reviewCount: 18, services: ['Government', 'Animal Health']
    },

    // ==========================================
    //           KHULNA DIVISION (10 Districts)
    // ==========================================
    {
        id: 401, name: 'District Veterinary Hospital, Khulna',
        address: 'Sonadanga, Khulna',
        phone: '01711-122334',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Veterinary+Hospital+Khulna',
        hours: '9 AM - 5 PM', district: 'Khulna', rating: 4.1, reviewCount: 50, services: ['Government', 'Surgery']
    },
    {
        id: 402, name: 'District Veterinary Hospital, Jashore',
        address: 'Jashore Sadar',
        phone: '16358',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Veterinary+Hospital+Jashore',
        hours: '9 AM - 5 PM', district: 'Jashore', rating: 4.0, reviewCount: 60, services: ['Government', 'General Checkup']
    },
    {
        id: 403, name: 'District Livestock Office, Kushtia',
        address: 'Kushtia Sadar',
        phone: '01718-578020',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Livestock+Office+Kushtia',
        hours: '9 AM - 5 PM', district: 'Kushtia', rating: 3.9, reviewCount: 40, services: ['Government', 'Treatment']
    },
    {
        id: 404, name: 'District Livestock Office, Jhenaidah',
        address: 'Jhenaidah Sadar',
        phone: '16358',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Livestock+Office+Jhenaidah',
        hours: '9 AM - 5 PM', district: 'Jhenaidah', rating: 3.8, reviewCount: 35, services: ['Government', 'Vaccination']
    },
    {
        id: 405, name: 'District Animal Husbandry Office, Chuadanga',
        address: 'Chuadanga Sadar',
        phone: '01712-111345',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Livestock+Office+Chuadanga',
        hours: '9 AM - 5 PM', district: 'Chuadanga', rating: 3.8, reviewCount: 22, services: ['Government', 'Consultation']
    },
    {
        id: 406, name: 'Upazila Livestock Office, Bagerhat',
        address: 'Bagerhat Sadar',
        phone: '16358',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Upazila+Livestock+Office+Bagerhat',
        hours: '9 AM - 5 PM', district: 'Bagerhat', rating: 3.7, reviewCount: 20, services: ['Government', 'Basic Care']
    },
    {
        id: 407, name: 'Upazila Livestock Office, Magura',
        address: 'Sreepur, Magura',
        phone: '01324-289779',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Upazila+Livestock+Office+Magura',
        hours: '9 AM - 5 PM', district: 'Magura', rating: 3.7, reviewCount: 15, services: ['Government', 'Animal Care']
    },
    {
        id: 408, name: 'District Livestock Office, Meherpur',
        address: 'Meherpur Sadar',
        phone: '16358',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Livestock+Office+Meherpur',
        hours: '9 AM - 5 PM', district: 'Meherpur', rating: 3.6, reviewCount: 12, services: ['Government', 'General']
    },
    {
        id: 409, name: 'District Livestock Office, Narail',
        address: 'Narail Sadar',
        phone: '0481-62277',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Livestock+Office+Narail',
        hours: '9 AM - 5 PM', district: 'Narail', rating: 3.8, reviewCount: 18, services: ['Government', 'Veterinary']
    },
    {
        id: 410, name: 'Upazila Livestock Office, Satkhira',
        address: 'Kaliganj, Satkhira',
        phone: '16358',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Upazila+Livestock+Office+Satkhira',
        hours: '9 AM - 5 PM', district: 'Satkhira', rating: 3.7, reviewCount: 25, services: ['Government', 'Emergency']
    },

    // ==========================================
    //           BARISHAL DIVISION (6 Districts)
    // ==========================================
    {
        id: 501, name: 'District Veterinary Hospital, Barishal',
        address: 'Kehya Ghat, Barishal',
        phone: '01777-889900',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Veterinary+Hospital+Barishal',
        hours: '9 AM - 5 PM', district: 'Barishal', rating: 4.0, reviewCount: 40, services: ['Government', 'Surgery']
    },
    {
        id: 502, name: 'District Livestock Office, Pirojpur',
        address: 'Pirojpur Sadar',
        phone: '01712209149',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Livestock+Office+Pirojpur',
        hours: '9 AM - 5 PM', district: 'Pirojpur', rating: 3.8, reviewCount: 20, services: ['Government', 'Vaccination']
    },
    {
        id: 503, name: 'District Livestock Officer, Jhalokati',
        address: 'Jhalokati Sadar',
        phone: '01712792311',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Livestock+Officer+Jhalokati',
        hours: '9 AM - 5 PM', district: 'Jhalokati', rating: 3.7, reviewCount: 15, services: ['Government', 'Basic Care']
    },
    {
        id: 504, name: 'District Livestock Officer, Barguna',
        address: 'Barguna Sadar',
        phone: '01324289917',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Livestock+Officer+Barguna',
        hours: '9 AM - 5 PM', district: 'Barguna', rating: 3.8, reviewCount: 22, services: ['Government', 'Treatment']
    },
    {
        id: 505, name: 'District Livestock Officer, Patuakhali',
        address: 'Patuakhali Sadar',
        phone: '02478835582',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Livestock+Officer+Patuakhali',
        hours: '9 AM - 5 PM', district: 'Patuakhali', rating: 3.9, reviewCount: 28, services: ['Government', 'Animal Health']
    },
    {
        id: 506, name: 'District Livestock Office, Bhola',
        address: 'Bhola Sadar',
        phone: '16358',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Livestock+Office+Bhola',
        hours: '9 AM - 5 PM', district: 'Bhola', rating: 3.7, reviewCount: 18, services: ['Government', 'Island Vet']
    },

    // ==========================================
    //           SYLHET DIVISION (4 Districts)
    // ==========================================
    {
        id: 601, name: 'Sylhet District Veterinary Hospital',
        address: 'Tilagor, Sylhet',
        phone: '01711-287533',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Sylhet+District+Veterinary+Hospital',
        hours: '9 AM - 5 PM', district: 'Sylhet', rating: 4.0, reviewCount: 150, services: ['Government', 'General Care']
    },
    {
        id: 602, name: 'District Veterinary Hospital, Moulvibazar',
        address: 'Moulvibazar Sadar',
        phone: '16358',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Veterinary+Hospital+Moulvibazar',
        hours: '9 AM - 5 PM', district: 'Moulvibazar', rating: 3.9, reviewCount: 45, services: ['Government', 'Vaccination']
    },
    {
        id: 603, name: 'District Veterinary Hospital, Habiganj',
        address: 'Habiganj Sadar',
        phone: '16358',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Veterinary+Hospital+Habiganj',
        hours: '9 AM - 5 PM', district: 'Habiganj', rating: 3.8, reviewCount: 30, services: ['Government', 'Basic Care']
    },
    {
        id: 604, name: 'District Livestock Office, Sunamganj',
        address: 'Sunamganj Sadar',
        phone: '01712081619',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Livestock+Office+Sunamganj',
        hours: '9 AM - 5 PM', district: 'Sunamganj', rating: 3.7, reviewCount: 25, services: ['Government', 'Haor Vet']
    },

    // ==========================================
    //           RANGPUR DIVISION (8 Districts)
    // ==========================================
    {
        id: 701, name: 'District Veterinary Hospital, Rangpur',
        address: 'Grand Hotel Mor, Rangpur',
        phone: '01744-556677',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Veterinary+Hospital+Rangpur',
        hours: '9 AM - 5 PM', district: 'Rangpur', rating: 3.8, reviewCount: 110, services: ['Government', 'Livestock']
    },
    {
        id: 702, name: 'District Veterinary Hospital, Dinajpur',
        address: 'Dinajpur Sadar',
        phone: '16358',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Veterinary+Hospital+Dinajpur',
        hours: '9 AM - 5 PM', district: 'Dinajpur', rating: 3.9, reviewCount: 65, services: ['Government', 'Surgery']
    },
    {
        id: 703, name: 'District Veterinary Hospital, Thakurgaon',
        address: 'Thakurgaon Sadar',
        phone: '16358',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Veterinary+Hospital+Thakurgaon',
        hours: '9 AM - 5 PM', district: 'Thakurgaon', rating: 3.8, reviewCount: 40, services: ['Government', 'General Care']
    },
    {
        id: 704, name: 'District Veterinary Hospital, Panchagarh',
        address: 'Panchagarh Sadar',
        phone: '02587718147',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Veterinary+Hospital+Panchagarh',
        hours: '9 AM - 5 PM', district: 'Panchagarh', rating: 3.6, reviewCount: 15, services: ['Government', 'Basic Care']
    },
    {
        id: 705, name: 'Upazila Veterinary Hospital, Nilphamari',
        address: 'Nilphamari Sadar',
        phone: '01716302882',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Upazila+Veterinary+Hospital+Nilphamari',
        hours: '9 AM - 5 PM', district: 'Nilphamari', rating: 3.7, reviewCount: 22, services: ['Government', 'Treatment']
    },
    {
        id: 706, name: 'District Veterinary Hospital, Lalmonirhat',
        address: 'Lalmonirhat Sadar',
        phone: '01712708154',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Veterinary+Hospital+Lalmonirhat',
        hours: '9 AM - 5 PM', district: 'Lalmonirhat', rating: 3.7, reviewCount: 18, services: ['Government', 'Vaccination']
    },
    {
        id: 707, name: 'District Veterinary Hospital, Kurigram',
        address: 'Kurigram Sadar',
        phone: '01730-324808',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Veterinary+Hospital+Kurigram',
        hours: '9 AM - 5 PM', district: 'Kurigram', rating: 3.6, reviewCount: 20, services: ['Government', 'Animal Health']
    },
    {
        id: 708, name: 'District Veterinary Hospital, Gaibandha',
        address: 'Gaibandha Sadar',
        phone: '16358',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Veterinary+Hospital+Gaibandha',
        hours: '9 AM - 5 PM', district: 'Gaibandha', rating: 3.7, reviewCount: 25, services: ['Government', 'Basic Care']
    },

    // ==========================================
    //         MYMENSINGH DIVISION (4 Districts)
    // ==========================================
    {
        id: 801, name: 'Mymensingh Iron Hide Vet Clinic (Private)',
        address: 'Naumahal, Mymensingh',
        phone: '01766-778899',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Mymensingh+Iron+Hide+Vet+Clinic',
        hours: '10 AM - 8 PM', district: 'Mymensingh', rating: 4.8, reviewCount: 42, services: ['Orthopedic', 'Surgery', 'X-Ray']
    },
    {
        id: 802, name: 'Upazila Veterinary Hospital, Mymensingh',
        address: 'Trishal/Sadar',
        phone: '16358',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Upazila+Veterinary+Hospital+Mymensingh',
        hours: '9 AM - 5 PM', district: 'Mymensingh', rating: 3.8, reviewCount: 30, services: ['Government', 'General']
    },
    {
        id: 803, name: 'District Veterinary Hospital, Jamalpur',
        address: 'Jamalpur Sadar',
        phone: '01324-290126',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Veterinary+Hospital+Jamalpur',
        hours: '9 AM - 5 PM', district: 'Jamalpur', rating: 3.8, reviewCount: 35, services: ['Government', 'Livestock']
    },
    {
        id: 804, name: 'District Veterinary Hospital, Sherpur',
        address: 'Sherpur Sadar',
        phone: '01711467755',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Veterinary+Hospital+Sherpur',
        hours: '9 AM - 5 PM', district: 'Sherpur', rating: 3.9, reviewCount: 28, services: ['Government', 'Surgery']
    },
    {
        id: 805, name: 'District Veterinary Hospital, Netrokona',
        address: 'Netrokona Sadar',
        phone: '01324290225',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Veterinary+Hospital+Netrokona',
        hours: '9 AM - 5 PM', district: 'Netrokona', rating: 3.8, reviewCount: 25, services: ['Government', 'Vaccine']
    }
];
