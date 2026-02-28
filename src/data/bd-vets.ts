import { VetClinic } from "@/services/VetService";

export const REAL_BD_VETS: Omit<VetClinic, "id">[] = [
    {
        name: "Central Veterinary Hospital",
        address: "48 Kazi Alauddin Road, Dhaka-1000",
        district: "Dhaka",
        phone: "+880 2-47117391",
        website: "http://dls.gov.bd",
        services: [
            "General Checkup",
            "Surgery",
            "X-Ray",
            "Vaccination",
            "Emergency"
        ],
        hours: "24/7",
        rating: 4.6,
        reviewCount: 156,
        mapUrl: "https://maps.google.com/?q=23.7229536,90.4045904"
    },
    {
        name: "PAW Life Care",
        address: "1/2, Block-G, Lalmatia, Dhaka",
        district: "Dhaka",
        phone: "+880 1909-617994",
        website: "",
        services: [
            "General Consultation",
            "Vaccination",
            "Grooming"
        ],
        hours: "10:00 AM - 9:00 PM",
        rating: 4.7,
        reviewCount: 89,
        mapUrl: "https://maps.google.com/?q=23.7561,90.3722"
    },
    {
        name: "Teaching & Training Pet Hospital and Research Center",
        address: "109 Gulshan Badda Link Rd, Dhaka",
        district: "Dhaka",
        phone: "+880 1960-136749",
        website: "https://cvasu.ac.bd",
        services: [
            "Specialist Care",
            "Surgery",
            "Emergency",
            "Research"
        ],
        hours: "10:00 AM - 8:00 PM",
        rating: 4.9,
        reviewCount: 201,
        mapUrl: "https://maps.google.com/?q=23.7806,90.4187"
    },
    {
        name: "Obhoyaronno - Bangladesh Animal Welfare Foundation",
        address: "Mohakhali DNCC Market, Dhaka",
        district: "Dhaka",
        phone: "+880 1718-643497",
        website: "https://www.obhoyaronno.org",
        services: [
            "Rescue",
            "Spaying/Neutering",
            "Vaccination"
        ],
        hours: "10:00 AM - 6:00 PM",
        rating: 4.8,
        reviewCount: 112,
        mapUrl: "https://maps.google.com/?q=23.7806,90.4187"
    },
    {
        name: "Dhaka Pet Clinic",
        address: "11/2 Abhay Das Lane, Tikatuli, Dhaka-1203",
        district: "Dhaka",
        phone: "+880 1886-921867",
        website: "",
        services: [
            "General Checkup",
            "Vaccination",
            "Treatment"
        ],
        hours: "10:00 AM - 8:00 PM",
        rating: 4.5,
        reviewCount: 45,
        mapUrl: "https://maps.google.com/?q=23.7196,90.4215"
    },
    {
        name: "AniMedCare",
        address: "House 03, Road 08, Block J, Baridhara, Dhaka 1212",
        district: "Dhaka",
        phone: "+880 1894-947411",
        website: "",
        services: [
            "General Checkup",
            "Vaccination",
            "Grooming",
            "Surgery"
        ],
        hours: "10:00 AM - 9:00 PM",
        rating: 4.8,
        reviewCount: 67,
        mapUrl: "https://maps.google.com/?q=23.8052,90.4206"
    },
    {
        name: "Care & Cure Veterinary Clinic",
        address: "House 28, Road 7, Dhanmondi, Dhaka 1205",
        district: "Dhaka",
        phone: "+880 1551-807384",
        website: "",
        services: [
            "Wellness",
            "Nutrition",
            "Consultation"
        ],
        hours: "10:00 AM - 8:00 PM",
        rating: 4.5,
        reviewCount: 38,
        mapUrl: "https://maps.google.com/?q=23.7461,90.3742"
    },
    {
        name: "Gulshan Pet-Animal Clinic",
        address: "Gulshan-2, Dhaka",
        district: "Dhaka",
        phone: "Available upon booking",
        website: "",
        services: [
            "Surgeries",
            "Diagnostics",
            "Grooming"
        ],
        hours: "10:00 AM - 8:00 PM",
        rating: 4.6,
        reviewCount: 52,
        mapUrl: "https://maps.google.com/?q=23.7937,90.4150"
    },
    {
        name: "Chattogram Veterinary and Animal Sciences University Hospital",
        address: "Zakir Hossain Road, Khulshi, Chittagong",
        district: "Chittagong",
        phone: "+880 31-659093",
        website: "https://cvasu.ac.bd",
        services: [
            "Specialist Consultation",
            "Surgery",
            "X-Ray",
            "Pathology",
            "Emergency"
        ],
        hours: "24/7",
        rating: 4.8,
        reviewCount: 245,
        mapUrl: "https://maps.google.com/?q=22.3614,91.8016"
    },
    {
        name: "District Livestock Office, Chittagong",
        address: "Chattogram Sadar, Chittagong",
        district: "Chittagong",
        phone: "+880 2333-379147",
        website: "http://chittagong.gov.bd",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.3,
        reviewCount: 18,
        mapUrl: "https://maps.google.com/?q=22.3382,91.8312"
    },
    {
        name: "Pet and Vet Care Sylhet",
        address: "Deen Central Market, Sylhet 3100",
        district: "Sylhet",
        phone: "+880 1675-014088",
        website: "",
        services: [
            "General Checkup",
            "Surgery",
            "Vaccination"
        ],
        hours: "10:00 AM - 8:00 PM",
        rating: 4.6,
        reviewCount: 42,
        mapUrl: "https://maps.google.com/?q=24.8949,91.8687"
    },
    {
        name: "Sylhet Pet Care",
        address: "Prantik 15, East, Sylhet 3100",
        district: "Sylhet",
        phone: "+880 1776-214373",
        website: "",
        services: [
            "General Consultation",
            "Vaccination"
        ],
        hours: "10:00 AM - 8:00 PM",
        rating: 4.5,
        reviewCount: 29,
        mapUrl: "https://maps.google.com/?q=24.8900,91.8700"
    },
    {
        name: "Panacea Vet and Pet Care",
        address: "Mira Bazar, Sylhet",
        district: "Sylhet",
        phone: "+880 1707-367057",
        website: "",
        services: [
            "Wellness",
            "Nutrition",
            "Consultation"
        ],
        hours: "10:00 AM - 8:00 PM",
        rating: 4.8,
        reviewCount: 15,
        mapUrl: "https://maps.google.com/?q=24.8988,91.8752"
    },
    {
        name: "Sylhet Veterinary Hospital",
        address: "Mirza Jangal Rd, Sylhet",
        district: "Sylhet",
        phone: "+880 1937-794803",
        website: "",
        services: [
            "General Care",
            "Surgery",
            "Emergency"
        ],
        hours: "10:00 AM - 8:00 PM",
        rating: 4.4,
        reviewCount: 56,
        mapUrl: "https://maps.google.com/?q=24.8940,91.8675"
    },
    {
        name: "Pulse Pet & Vet Care",
        address: "Sylhet Sadar, Sylhet",
        district: "Sylhet",
        phone: "+880 1521-403761",
        website: "",
        services: [
            "General Checkup",
            "Vaccination"
        ],
        hours: "10:00 AM - 8:00 PM",
        rating: 4.7,
        reviewCount: 22,
        mapUrl: "https://maps.google.com/?q=24.9000,91.8700"
    },
    {
        name: "Pet Care Point Comilla",
        address: "Police Lines Rd, Comilla",
        district: "Chittagong",
        phone: "+880 1912-595738",
        website: "",
        services: [
            "General Care",
            "Vaccination"
        ],
        hours: "9:00 AM - 8:00 PM",
        rating: 4.6,
        reviewCount: 31,
        mapUrl: "https://maps.google.com/?q=23.4607,91.1809"
    },
    {
        name: "Zilla Veterinary Hospital Comilla",
        address: "Rammala Mor, Kotbari Rd, Comilla 3500",
        district: "Chittagong",
        phone: "+880 1876-354898",
        website: "",
        services: [
            "General Care",
            "Surgery",
            "Emergency"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.2,
        reviewCount: 45,
        mapUrl: "https://maps.google.com/?q=23.4449,91.1666"
    },
    {
        name: "Vet Care Cumilla",
        address: "Jafar Khan Rd, Comilla",
        district: "Chittagong",
        phone: "+880 1797-516591",
        website: "",
        services: [
            "General Checkup",
            "Vaccination"
        ],
        hours: "10:00 AM - 8:00 PM",
        rating: 4.5,
        reviewCount: 19,
        mapUrl: "https://maps.google.com/?q=23.4580,91.1820"
    },
    {
        name: "Lil-PAW Vet Care Cumilla",
        address: "Shop No# 39, Zilla Parishad Super Market, Opposite Diabetic Hospital, Bagichagaon, Cumilla",
        district: "Chittagong",
        phone: "+880 1725-750937",
        website: "",
        services: [
            "Wellness",
            "Nutrition",
            "Consultation"
        ],
        hours: "10:00 AM - 8:00 PM",
        rating: 4.8,
        reviewCount: 27,
        mapUrl: "https://maps.google.com/?q=23.4620,91.1780"
    },
    {
        name: "PetMed Vet Clinic",
        address: "Bramondi, Narsingdi",
        district: "Dhaka",
        phone: "+880 1711-000000",
        website: "https://petclinicnarsingdi.com",
        services: [
            "Vaccination",
            "Deworming",
            "Surgery",
            "Spaying/Neutering",
            "Grooming",
            "Emergency"
        ],
        hours: "10:00 AM - 8:00 PM",
        rating: 4.8,
        reviewCount: 32,
        mapUrl: "https://maps.google.com/?q=23.9193,90.7176"
    },
    {
        name: "District Livestock Officer (Habibur Rahman Khan), Narsingdi",
        address: "Narsingdi Sadar",
        district: "Dhaka",
        phone: "+880 1711-020662",
        website: "http://narsingdi.gov.bd",
        services: [
            "General Consultation",
            "Vaccination",
            "Livestock Services"
        ],
        hours: "9:00 AM - 5:00 PM (Govt Hours)",
        rating: 4.5,
        reviewCount: 15,
        mapUrl: "https://maps.google.com/?q=23.9190,90.7200"
    },
    {
        name: "District Livestock Officer (Dr. Julhash Ahmed), Bandarban",
        address: "Bandarban Sadar, Bandarban",
        district: "Chittagong",
        phone: "+880 1711-967855",
        website: "http://bandarban.gov.bd",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM (Govt Hours)",
        rating: 4.2,
        reviewCount: 8,
        mapUrl: "https://maps.google.com/?q=22.1950,92.2185"
    },
    {
        name: "District Livestock Officer, Munshiganj",
        address: "Munshiganj Sadar, Munshiganj",
        district: "Dhaka",
        phone: "+880 1711-167295",
        website: "http://munshiganj.gov.bd",
        services: [
            "General Care",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM (Govt Hours)",
        rating: 4.4,
        reviewCount: 12,
        mapUrl: "https://maps.google.com/?q=23.5422,90.5305"
    },
    {
        name: "Additional District Livestock Officer, Tangail",
        address: "Tangail Sadar, Tangail",
        district: "Dhaka",
        phone: "+880 1716-365729",
        website: "http://tangail.gov.bd",
        services: [
            "Livestock Services",
            "General Care"
        ],
        hours: "9:00 AM - 5:00 PM (Govt Hours)",
        rating: 4.1,
        reviewCount: 5,
        mapUrl: "https://maps.google.com/?q=24.2498,89.9166"
    },
    {
        name: "District Livestock Officer (Dr. Md. Abdul Mannan Mia), Narayanganj",
        address: "Narayanganj Sadar, Narayanganj",
        district: "Dhaka",
        phone: "+880 1730-976669",
        website: "http://narayanganj.gov.bd",
        services: [
            "Livestock Services",
            "General Care"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.3,
        reviewCount: 11,
        mapUrl: "https://maps.google.com/?q=23.6238,90.5000"
    },
    {
        name: "Friends agrovet",
        address: "Dhaka - Rajshahi Hwy, Baraigram, Natore",
        district: "Rajshahi",
        phone: "Available upon booking",
        website: "",
        services: [
            "Agricultural",
            "Livestock Services",
            "General Care"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.4,
        reviewCount: 9,
        mapUrl: "https://maps.google.com/?q=24.3187928,89.172186"
    },
    {
        name: "Govt Animal Hospital Dinajpur",
        address: "Dinajpur",
        district: "Rangpur",
        phone: "Available upon booking",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.2,
        reviewCount: 12,
        mapUrl: "https://maps.google.com/?q=25.6279666,88.6388969"
    },
    {
        name: "Animal Hospital (Maijdee)",
        address: "School Rd, Noakhali, Maijdee",
        district: "Chittagong",
        phone: "Available upon booking",
        website: "",
        services: [
            "General Care",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.5,
        reviewCount: 16,
        mapUrl: "https://maps.google.com/?q=22.8250,91.1000"
    },
    {
        name: "Modern vet & pet care Noakhali",
        address: "Sea land building, New Jail Rd, Noakhali",
        district: "Chittagong",
        phone: "Available upon booking",
        website: "",
        services: [
            "General Consultation",
            "Vaccination",
            "Checkup"
        ],
        hours: "10:00 AM - 8:00 PM",
        rating: 4.6,
        reviewCount: 22,
        mapUrl: "https://maps.google.com/?q=22.8200,91.1050"
    }
];
