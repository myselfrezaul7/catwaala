export type VetClinic = {
    id: number;
    name: string;
    address: string;
    phone: string;
    website?: string;
    mapUrl: string;
    hours: string;
    district: string;
};

export const MOCK_VET_CLINICS: VetClinic[] = [
    // --- DHAKA DIVISION ---
    { id: 1, name: 'Central Veterinary Hospital', address: '48 Kazi Alauddin Road, Dhaka-1000', phone: '+88029665492', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Central+Veterinary+Hospital+Dhaka', hours: '24 Hours', district: 'Dhaka' },
    { id: 2, name: 'Gulshan Pet-Animal Clinic', address: '4-5 DCC Super Market, Gulshan-2, Dhaka-1212', phone: '+8801912345680', website: 'https://gulshanpetclinic.com', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Gulshan+Pet-Animal+Clinic+Dhaka', hours: '11:00 AM - 7:00 PM', district: 'Dhaka' },
    { id: 3, name: 'PAW Life Care (Lalmatia)', address: '1/12, Block-G, Lalmatia, Dhaka', phone: '+8801711234567', website: 'https://pawlifecare.com', mapUrl: 'https://www.google.com/maps/search/?api=1&query=PAW+Life+Care+Lalmatia+Dhaka', hours: '10:00 AM - 8:00 PM', district: 'Dhaka' },
    { id: 4, name: 'Care For Paws (CFP) Dhanmondi', address: 'House no. 68/3C, Shwapno Express Lane, Zigatola, Dhaka', phone: '+8801718123456', website: 'https://careforpaws.com.bd', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Care+For+Paws+Dhanmondi+Dhaka', hours: '10:00 AM - 9:00 PM', district: 'Dhaka' },
    { id: 5, name: 'Vet and Pet Care', address: 'House# 68/10, Zigatola Post Office Road, Dhanmondi, Dhaka', phone: '+8801313303303', website: 'https://thevet.com.bd', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Vet+and+Pet+Care+Dhanmondi+Dhaka', hours: '10:00 AM - 10:00 PM', district: 'Dhaka' },
    { id: 6, name: 'LD Veterinary Hospital', address: 'House #15, Sonargaon Janapath, Sector-07, Uttara, Dhaka-1230', phone: '+8801812345679', mapUrl: 'https://www.google.com/maps/search/?api=1&query=LD+Veterinary+Hospital+Uttara+Dhaka', hours: '24 Hours', district: 'Dhaka' },
    { id: 7, name: 'Obhoyaronno Animal Clinic', address: 'DNCC Market, Mohakhali, Dhaka 1208', phone: '+8801718123456', website: 'http://obhoyaronno.org', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Obhoyaronno+Animal+Clinic+Mohakhali+Dhaka', hours: '10:00 AM - 7:00 PM', district: 'Dhaka' },

    // --- CHATTOGRAM DIVISION ---
    { id: 11, name: 'CVASU Veterinary Hospital', address: 'Zakir Hossain Rd, Khulshi, Chittagong 4202', phone: '01314-300655', mapUrl: 'https://www.google.com/maps/search/?api=1&query=CVASU+Veterinary+Hospital+Chittagong', hours: '9 AM - 5 PM', district: 'Chattogram' },
    { id: 12, name: 'District Animal Hospital', address: 'Abdur Rahman Rd, Chittagong 4000', phone: '01886-377425', mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Animal+Hospital+Chittagong', hours: '9 AM - 5 PM', district: 'Chattogram' },
    { id: 13, name: 'Antidote - Complete Vet Care', address: '402/A Garden City Complex, M M Ali Road, Chittagong', phone: '01670-433184', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Antidote+Veterinary+Care+Chittagong', hours: '10 AM - 9 PM', district: 'Chattogram' },
    { id: 14, name: 'Urban Paws Pet Care', address: '42, Mobarak House, M M Ali Rd, Chittagong', phone: '01812-345678', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Urban+Paws+Pet+Care+Chittagong', hours: '10 AM - 8 PM', district: 'Chattogram' },

    // --- SYLHET DIVISION ---
    { id: 21, name: 'Sylhet District Veterinary Hospital', address: 'Tilagor, Sylhet', phone: '01711-287533', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Sylhet+District+Veterinary+Hospital', hours: '9 AM - 5 PM', district: 'Sylhet' },
    { id: 22, name: 'Pet and Vet Care', address: 'Deen Central Market, Sylhet 3100', phone: '01675-014088', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Pet+and+Vet+Care+Sylhet', hours: '10 AM - 8 PM', district: 'Sylhet' },
    { id: 23, name: 'Panacea Vet and Pet Care', address: 'Mira Bazar, Sylhet', phone: '01712-345678', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Panacea+Vet+and+Pet+Care+Sylhet', hours: '10 AM - 9 PM', district: 'Sylhet' },

    // --- CUMILLA DIVISION ---
    { id: 31, name: 'Zilla Veterinary Hospital', address: 'Rammala Mor, Kotbari Rd, Comilla 3500', phone: '01723-456789', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Zilla+Veterinary+Hospital+Comilla', hours: '9 AM - 5 PM', district: 'Cumilla' },
    { id: 32, name: 'Pet Care Point', address: 'Police Lines Rd, Comilla', phone: '01811-223344', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Pet+Care+Point+Comilla', hours: '10 AM - 8 PM', district: 'Cumilla' },

    // --- KHULNA DIVISION ---
    { id: 41, name: 'Khulna Vet Care', address: 'Sonadanga, Khulna', phone: '01711-122334', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Khulna+Vet+Care', hours: '10 AM - 8 PM', district: 'Khulna' },
    { id: 42, name: 'Priyo Pet and Vet Care', address: 'Boyra, Khulna', phone: '01922-334455', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Priyo+Pet+and+Vet+Care+Khulna', hours: '9 AM - 9 PM', district: 'Khulna' },

    // --- RAJSHAHI DIVISION ---
    { id: 51, name: 'Birds and Pet Animal Clinic', address: 'Darikhorbona moor, Rajshahi', phone: '01733-445566', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Birds+and+Pet+Animal+Clinic+Rajshahi', hours: '10 AM - 8 PM', district: 'Rajshahi' },

    // --- RANGPUR DIVISION ---
    { id: 61, name: 'District Veterinary Hospital', address: 'Grand Hotel Mor, Rangpur', phone: '01744-556677', mapUrl: 'https://www.google.com/maps/search/?api=1&query=District+Veterinary+Hospital+Rangpur', hours: '9 AM - 5 PM', district: 'Rangpur' },
    { id: 62, name: 'BD Vet and Pet Care', address: 'Tajhat Road, Rangpur', phone: '01855-667788', mapUrl: 'https://www.google.com/maps/search/?api=1&query=BD+Vet+and+Pet+Care+Rangpur', hours: '10 AM - 8 PM', district: 'Rangpur' },

    // --- MYMENSINGH DIVISION ---
    { id: 71, name: 'Mymensingh Iron Hide Vet Clinic', address: 'Naumahal, Mymensingh', phone: '01766-778899', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Mymensingh+Iron+Hide+Vet+Clinic', hours: '10 AM - 8 PM', district: 'Mymensingh' },

    // --- BARISHAL DIVISION ---
    { id: 81, name: 'Barishal Pet Care', address: 'Kehya Ghat, Barishal', phone: '01777-889900', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Barishal+Pet+Care', hours: '10 AM - 6 PM', district: 'Barishal' },
];
