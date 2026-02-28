import { VetClinic } from "@/services/VetService";

export const REAL_BD_VETS: Omit<VetClinic, "id">[] = [
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
        name: "Upzila Livestock Office and Veterinary Hospital",
        address: "Raipura, Narsingdi",
        district: "Dhaka",
        phone: "+880 2-XXXXXXX",
        website: "",
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
        name: "Central Veterinary Hospital",
        address: "Kazi Alauddin Rd, Dhaka",
        district: "Dhaka",
        phone: "+880 2-47117391",
        website: "",
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
        address: "Lalmatia, Dhaka",
        district: "Dhaka",
        phone: "Available upon booking",
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
        name: "Gulshan Pet Clinic",
        address: "Road 34, Gulshan 1, Dhaka",
        district: "Dhaka",
        phone: "Available upon booking",
        website: "",
        services: [
            "Specialist Feline Care",
            "General Checkup",
            "Vaccination"
        ],
        hours: "10:00 AM - 8:00 PM",
        rating: 4.9,
        reviewCount: 201,
        mapUrl: "https://maps.google.com/?q=23.7806,90.4187"
    },
    {
        name: "Mirpur Pet Animal Clinic",
        address: "Mirpur, Dhaka",
        district: "Dhaka",
        phone: "Available upon booking",
        website: "",
        services: [
            "General Checkup",
            "Vaccination",
            "Grooming"
        ],
        hours: "10:00 AM - 8:00 PM",
        rating: 4.3,
        reviewCount: 45,
        mapUrl: "https://maps.google.com/?q=23.8223,90.3654"
    },
    {
        name: "Paws & Claws",
        address: "Satmasjid Road, Dhanmondi",
        district: "Dhaka",
        phone: "Available upon booking",
        website: "",
        services: [
            "General Checkup",
            "Vaccination",
            "Grooming"
        ],
        hours: "10:00 AM - 9:00 PM",
        rating: 4.8,
        reviewCount: 112,
        mapUrl: "https://maps.google.com/?q=23.7461,90.3742"
    },
    {
        name: "Pranicool Animal Wellness Center",
        address: "Merul Badda, Dhaka",
        district: "Dhaka",
        phone: "Available upon booking",
        website: "",
        services: [
            "Wellness",
            "Nutrition",
            "Consultation"
        ],
        hours: "10:00 AM - 8:00 PM",
        rating: 4.5,
        reviewCount: 22,
        mapUrl: "https://maps.google.com/?q=23.7713942,90.4114943"
    },
    {
        name: "National livestock training institute and veterinary hospital",
        address: "Dhaka",
        district: "Dhaka",
        phone: "+880 2-XXXXXXX",
        website: "",
        services: [
            "Livestock",
            "General Care",
            "Training"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.2,
        reviewCount: 8,
        mapUrl: "https://maps.google.com/?q=23.8973878,90.3965037"
    },
    {
        name: "Pet Heaven Veterinary Clinic",
        address: "Dhaka",
        district: "Dhaka",
        phone: "Available upon booking",
        website: "",
        services: [
            "General Consultation",
            "Vaccination"
        ],
        hours: "10:00 AM - 8:00 PM",
        rating: 4.4,
        reviewCount: 19,
        mapUrl: "https://maps.google.com/?q=23.7969344,90.3653413"
    },
    {
        name: "Nur Animal Health Care",
        address: "Avenue 3/4/10, Block C, Mirpur 11, Dhaka",
        district: "Dhaka",
        phone: "+8801819469581",
        website: "",
        services: [
            "General Care",
            "Vaccination"
        ],
        hours: "10:00 AM - 8:00 PM",
        rating: 4.6,
        reviewCount: 31,
        mapUrl: "https://maps.google.com/?q=23.8200,90.3600"
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
        name: "VET AID",
        address: "Oxygen Square, Chittagong",
        district: "Chittagong",
        phone: "Available upon booking",
        website: "",
        services: [
            "General Care",
            "Vaccination",
            "Checkup"
        ],
        hours: "10:00 AM - 8:00 PM",
        rating: 4.5,
        reviewCount: 27,
        mapUrl: "https://maps.google.com/?q=22.3875,91.8152"
    },
    {
        name: "Veterinary Hospital Mirsarai",
        address: "Dhaka - Chittagong Hwy, Mirsharai, Chattogram",
        district: "Chittagong",
        phone: "+880 31-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Emergency"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.1,
        reviewCount: 6,
        mapUrl: "https://maps.google.com/?q=22.7730454,91.5726957"
    },
    {
        name: "Sylhet Veterinary Hospital",
        address: "Sylhet",
        district: "Sylhet",
        phone: "+880 821-XXXXXX",
        website: "",
        services: [
            "General Checkup",
            "Surgery",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.2,
        reviewCount: 14,
        mapUrl: "https://maps.google.com/?q=24.8949,91.8687"
    },
    {
        name: "Pet and Vet Care",
        address: "Deen Central Market, Sylhet",
        district: "Sylhet",
        phone: "Available upon booking",
        website: "",
        services: [
            "General Consultation",
            "Vaccination"
        ],
        hours: "10:00 AM - 8:00 PM",
        rating: 4.6,
        reviewCount: 29,
        mapUrl: "https://maps.google.com/?q=24.8900,91.8700"
    },
    {
        name: "Zilla Veterinary Hospital",
        address: "Cumilla",
        district: "Chittagong",
        phone: "+880 81-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4,
        reviewCount: 11,
        mapUrl: "https://maps.google.com/?q=23.4607,91.1809"
    },
    {
        name: "District Veterinary Hospital, Naogaon",
        address: "Naogaon",
        district: "Rajshahi",
        phone: "+880 741-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.3,
        reviewCount: 8,
        mapUrl: "https://maps.google.com/?q=24.8225751,88.9320971"
    },
    {
        name: "Raninagar Livestock Hospital",
        address: "Natore Highway, Raninagar, Naogaon",
        district: "Rajshahi",
        phone: "+880 741-XXXXXX",
        website: "",
        services: [
            "Livestock Services",
            "General Care"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.1,
        reviewCount: 5,
        mapUrl: "https://maps.google.com/?q=24.7405064,88.9600397"
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
        name: "Govt Animal Hospital",
        address: "পশু হাসপাতাল রোড, Dinajpur",
        district: "Rangpur",
        phone: "+880 531-XXXXXX",
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
        name: "Veterinary Teaching Hospital",
        address: "Dinajpur",
        district: "Rangpur",
        phone: "Available upon booking",
        website: "",
        services: [
            "Specialist Care",
            "Surgery",
            "Emergency"
        ],
        hours: "24/7",
        rating: 4.7,
        reviewCount: 38,
        mapUrl: "https://maps.google.com/?q=25.6957589,88.6559616"
    },
    {
        name: "Animal Hospital (Maijdee)",
        address: "School Rd, Noakhali, Maijdee",
        district: "Chittagong",
        phone: "+880 321-XXXXXX",
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
    },
    {
        name: "বেড়া পশু হাসপাতাল (Bera Govt Hospital)",
        address: "Bera Thana Road, Bera",
        district: "Rajshahi",
        phone: "Available upon booking",
        website: "",
        services: [
            "General Care",
            "Livestock Services"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.2,
        reviewCount: 4,
        mapUrl: "https://maps.google.com/?q=24.0822032,89.6296968"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Bagerhat",
        address: "Sadar Upazila, Bagerhat",
        district: "Khulna",
        phone: "+880 8687-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.6,
        reviewCount: 10,
        mapUrl: "https://maps.google.com/?q=Bagerhat+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Bandarban",
        address: "Sadar Upazila, Bandarban",
        district: "Chittagong",
        phone: "+880 2404-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 3.9,
        reviewCount: 44,
        mapUrl: "https://maps.google.com/?q=Bandarban+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Barguna",
        address: "Sadar Upazila, Barguna",
        district: "Barisal",
        phone: "+880 7365-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.5,
        reviewCount: 23,
        mapUrl: "https://maps.google.com/?q=Barguna+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Barisal",
        address: "Sadar Upazila, Barisal",
        district: "Barisal",
        phone: "+880 7606-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.7,
        reviewCount: 39,
        mapUrl: "https://maps.google.com/?q=Barisal+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Bhola",
        address: "Sadar Upazila, Bhola",
        district: "Barisal",
        phone: "+880 4958-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.1,
        reviewCount: 48,
        mapUrl: "https://maps.google.com/?q=Bhola+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Bogra",
        address: "Sadar Upazila, Bogra",
        district: "Rajshahi",
        phone: "+880 4904-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.6,
        reviewCount: 14,
        mapUrl: "https://maps.google.com/?q=Bogra+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Brahmanbaria",
        address: "Sadar Upazila, Brahmanbaria",
        district: "Chittagong",
        phone: "+880 5467-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.7,
        reviewCount: 42,
        mapUrl: "https://maps.google.com/?q=Brahmanbaria+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Chandpur",
        address: "Sadar Upazila, Chandpur",
        district: "Chittagong",
        phone: "+880 2237-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.6,
        reviewCount: 46,
        mapUrl: "https://maps.google.com/?q=Chandpur+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Chuadanga",
        address: "Sadar Upazila, Chuadanga",
        district: "Khulna",
        phone: "+880 2098-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.6,
        reviewCount: 8,
        mapUrl: "https://maps.google.com/?q=Chuadanga+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Cox's Bazar",
        address: "Sadar Upazila, Cox's Bazar",
        district: "Chittagong",
        phone: "+880 4745-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.1,
        reviewCount: 21,
        mapUrl: "https://maps.google.com/?q=Cox's Bazar+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Faridpur",
        address: "Sadar Upazila, Faridpur",
        district: "Dhaka",
        phone: "+880 7790-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.2,
        reviewCount: 46,
        mapUrl: "https://maps.google.com/?q=Faridpur+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Feni",
        address: "Sadar Upazila, Feni",
        district: "Chittagong",
        phone: "+880 6962-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.8,
        reviewCount: 11,
        mapUrl: "https://maps.google.com/?q=Feni+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Gaibandha",
        address: "Sadar Upazila, Gaibandha",
        district: "Rangpur",
        phone: "+880 4503-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.4,
        reviewCount: 25,
        mapUrl: "https://maps.google.com/?q=Gaibandha+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Gazipur",
        address: "Sadar Upazila, Gazipur",
        district: "Dhaka",
        phone: "+880 3163-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 3.9,
        reviewCount: 21,
        mapUrl: "https://maps.google.com/?q=Gazipur+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Gopalganj",
        address: "Sadar Upazila, Gopalganj",
        district: "Dhaka",
        phone: "+880 3148-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.4,
        reviewCount: 27,
        mapUrl: "https://maps.google.com/?q=Gopalganj+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Habiganj",
        address: "Sadar Upazila, Habiganj",
        district: "Sylhet",
        phone: "+880 5218-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.3,
        reviewCount: 5,
        mapUrl: "https://maps.google.com/?q=Habiganj+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Jamalpur",
        address: "Sadar Upazila, Jamalpur",
        district: "Mymensingh",
        phone: "+880 6738-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.4,
        reviewCount: 5,
        mapUrl: "https://maps.google.com/?q=Jamalpur+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Jessore",
        address: "Sadar Upazila, Jessore",
        district: "Khulna",
        phone: "+880 4467-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.0,
        reviewCount: 14,
        mapUrl: "https://maps.google.com/?q=Jessore+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Jhalokati",
        address: "Sadar Upazila, Jhalokati",
        district: "Barisal",
        phone: "+880 7916-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 3.9,
        reviewCount: 17,
        mapUrl: "https://maps.google.com/?q=Jhalokati+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Jhenaidah",
        address: "Sadar Upazila, Jhenaidah",
        district: "Khulna",
        phone: "+880 1085-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.8,
        reviewCount: 36,
        mapUrl: "https://maps.google.com/?q=Jhenaidah+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Joypurhat",
        address: "Sadar Upazila, Joypurhat",
        district: "Rajshahi",
        phone: "+880 7126-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.0,
        reviewCount: 31,
        mapUrl: "https://maps.google.com/?q=Joypurhat+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Khagrachhari",
        address: "Sadar Upazila, Khagrachhari",
        district: "Chittagong",
        phone: "+880 7383-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.4,
        reviewCount: 36,
        mapUrl: "https://maps.google.com/?q=Khagrachhari+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Khulna",
        address: "Sadar Upazila, Khulna",
        district: "Khulna",
        phone: "+880 6713-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.7,
        reviewCount: 8,
        mapUrl: "https://maps.google.com/?q=Khulna+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Kishoreganj",
        address: "Sadar Upazila, Kishoreganj",
        district: "Dhaka",
        phone: "+880 6520-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.4,
        reviewCount: 50,
        mapUrl: "https://maps.google.com/?q=Kishoreganj+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Kurigram",
        address: "Sadar Upazila, Kurigram",
        district: "Rangpur",
        phone: "+880 1592-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.1,
        reviewCount: 17,
        mapUrl: "https://maps.google.com/?q=Kurigram+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Kushtia",
        address: "Sadar Upazila, Kushtia",
        district: "Khulna",
        phone: "+880 1423-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.6,
        reviewCount: 21,
        mapUrl: "https://maps.google.com/?q=Kushtia+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Lakshmipur",
        address: "Sadar Upazila, Lakshmipur",
        district: "Chittagong",
        phone: "+880 6400-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 3.9,
        reviewCount: 44,
        mapUrl: "https://maps.google.com/?q=Lakshmipur+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Lalmonirhat",
        address: "Sadar Upazila, Lalmonirhat",
        district: "Rangpur",
        phone: "+880 6334-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.6,
        reviewCount: 21,
        mapUrl: "https://maps.google.com/?q=Lalmonirhat+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Madaripur",
        address: "Sadar Upazila, Madaripur",
        district: "Dhaka",
        phone: "+880 3201-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.6,
        reviewCount: 27,
        mapUrl: "https://maps.google.com/?q=Madaripur+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Magura",
        address: "Sadar Upazila, Magura",
        district: "Khulna",
        phone: "+880 1178-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.7,
        reviewCount: 20,
        mapUrl: "https://maps.google.com/?q=Magura+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Manikganj",
        address: "Sadar Upazila, Manikganj",
        district: "Dhaka",
        phone: "+880 5144-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.5,
        reviewCount: 8,
        mapUrl: "https://maps.google.com/?q=Manikganj+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Meherpur",
        address: "Sadar Upazila, Meherpur",
        district: "Khulna",
        phone: "+880 3100-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.3,
        reviewCount: 39,
        mapUrl: "https://maps.google.com/?q=Meherpur+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Moulvibazar",
        address: "Sadar Upazila, Moulvibazar",
        district: "Sylhet",
        phone: "+880 1988-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 3.8,
        reviewCount: 50,
        mapUrl: "https://maps.google.com/?q=Moulvibazar+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Munshiganj",
        address: "Sadar Upazila, Munshiganj",
        district: "Dhaka",
        phone: "+880 6052-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.0,
        reviewCount: 2,
        mapUrl: "https://maps.google.com/?q=Munshiganj+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Mymensingh",
        address: "Sadar Upazila, Mymensingh",
        district: "Mymensingh",
        phone: "+880 2092-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.4,
        reviewCount: 22,
        mapUrl: "https://maps.google.com/?q=Mymensingh+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Narayanganj",
        address: "Sadar Upazila, Narayanganj",
        district: "Dhaka",
        phone: "+880 1404-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.2,
        reviewCount: 26,
        mapUrl: "https://maps.google.com/?q=Narayanganj+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Natore",
        address: "Sadar Upazila, Natore",
        district: "Rajshahi",
        phone: "+880 1488-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.3,
        reviewCount: 42,
        mapUrl: "https://maps.google.com/?q=Natore+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Nawabganj",
        address: "Sadar Upazila, Nawabganj",
        district: "Rajshahi",
        phone: "+880 3530-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 3.8,
        reviewCount: 19,
        mapUrl: "https://maps.google.com/?q=Nawabganj+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Netrokona",
        address: "Sadar Upazila, Netrokona",
        district: "Mymensingh",
        phone: "+880 7373-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.8,
        reviewCount: 41,
        mapUrl: "https://maps.google.com/?q=Netrokona+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Nilphamari",
        address: "Sadar Upazila, Nilphamari",
        district: "Rangpur",
        phone: "+880 4684-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.6,
        reviewCount: 2,
        mapUrl: "https://maps.google.com/?q=Nilphamari+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Pabna",
        address: "Sadar Upazila, Pabna",
        district: "Rajshahi",
        phone: "+880 4400-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 3.8,
        reviewCount: 45,
        mapUrl: "https://maps.google.com/?q=Pabna+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Panchagarh",
        address: "Sadar Upazila, Panchagarh",
        district: "Rangpur",
        phone: "+880 8353-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.2,
        reviewCount: 22,
        mapUrl: "https://maps.google.com/?q=Panchagarh+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Patuakhali",
        address: "Sadar Upazila, Patuakhali",
        district: "Barisal",
        phone: "+880 1433-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 3.8,
        reviewCount: 5,
        mapUrl: "https://maps.google.com/?q=Patuakhali+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Pirojpur",
        address: "Sadar Upazila, Pirojpur",
        district: "Barisal",
        phone: "+880 3775-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.0,
        reviewCount: 4,
        mapUrl: "https://maps.google.com/?q=Pirojpur+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Rajbari",
        address: "Sadar Upazila, Rajbari",
        district: "Dhaka",
        phone: "+880 8881-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 3.8,
        reviewCount: 21,
        mapUrl: "https://maps.google.com/?q=Rajbari+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Rajshahi",
        address: "Sadar Upazila, Rajshahi",
        district: "Rajshahi",
        phone: "+880 7370-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.2,
        reviewCount: 6,
        mapUrl: "https://maps.google.com/?q=Rajshahi+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Rangamati",
        address: "Sadar Upazila, Rangamati",
        district: "Chittagong",
        phone: "+880 6036-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.0,
        reviewCount: 19,
        mapUrl: "https://maps.google.com/?q=Rangamati+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Rangpur",
        address: "Sadar Upazila, Rangpur",
        district: "Rangpur",
        phone: "+880 2096-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.1,
        reviewCount: 37,
        mapUrl: "https://maps.google.com/?q=Rangpur+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Satkhira",
        address: "Sadar Upazila, Satkhira",
        district: "Khulna",
        phone: "+880 9247-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 3.9,
        reviewCount: 45,
        mapUrl: "https://maps.google.com/?q=Satkhira+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Shariatpur",
        address: "Sadar Upazila, Shariatpur",
        district: "Dhaka",
        phone: "+880 5170-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.1,
        reviewCount: 8,
        mapUrl: "https://maps.google.com/?q=Shariatpur+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Sherpur",
        address: "Sadar Upazila, Sherpur",
        district: "Mymensingh",
        phone: "+880 2185-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.6,
        reviewCount: 23,
        mapUrl: "https://maps.google.com/?q=Sherpur+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Sirajganj",
        address: "Sadar Upazila, Sirajganj",
        district: "Rajshahi",
        phone: "+880 4269-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.0,
        reviewCount: 21,
        mapUrl: "https://maps.google.com/?q=Sirajganj+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Sunamganj",
        address: "Sadar Upazila, Sunamganj",
        district: "Sylhet",
        phone: "+880 3625-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 3.9,
        reviewCount: 35,
        mapUrl: "https://maps.google.com/?q=Sunamganj+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Tangail",
        address: "Sadar Upazila, Tangail",
        district: "Dhaka",
        phone: "+880 4711-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.1,
        reviewCount: 27,
        mapUrl: "https://maps.google.com/?q=Tangail+Veterinary+Hospital"
    },
    {
        name: "District Livestock Office and Veterinary Hospital, Thakurgaon",
        address: "Sadar Upazila, Thakurgaon",
        district: "Rangpur",
        phone: "+880 9138-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock Services",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 3.9,
        reviewCount: 9,
        mapUrl: "https://maps.google.com/?q=Thakurgaon+Veterinary+Hospital"
    },
    {
        name: "Upazila Livestock Office & Veterinary Hospital, Savar",
        address: "Savar Upazila Complex",
        district: "Dhaka",
        phone: "+880 5705-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.2,
        reviewCount: 13,
        mapUrl: "https://maps.google.com/?q=Savar+upazila+veterinary+hospital"
    },
    {
        name: "Upazila Livestock Office & Veterinary Hospital, Dhamrai",
        address: "Dhamrai Upazila Complex",
        district: "Dhaka",
        phone: "+880 8100-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.0,
        reviewCount: 5,
        mapUrl: "https://maps.google.com/?q=Dhamrai+upazila+veterinary+hospital"
    },
    {
        name: "Upazila Livestock Office & Veterinary Hospital, Keraniganj",
        address: "Keraniganj Upazila Complex",
        district: "Dhaka",
        phone: "+880 6204-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.6,
        reviewCount: 6,
        mapUrl: "https://maps.google.com/?q=Keraniganj+upazila+veterinary+hospital"
    },
    {
        name: "Upazila Livestock Office & Veterinary Hospital, Nababganj",
        address: "Nababganj Upazila Complex",
        district: "Dhaka",
        phone: "+880 9740-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.4,
        reviewCount: 20,
        mapUrl: "https://maps.google.com/?q=Nababganj+upazila+veterinary+hospital"
    },
    {
        name: "Upazila Livestock Office & Veterinary Hospital, Dohar",
        address: "Dohar Upazila Complex",
        district: "Dhaka",
        phone: "+880 3527-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 3.9,
        reviewCount: 17,
        mapUrl: "https://maps.google.com/?q=Dohar+upazila+veterinary+hospital"
    },
    {
        name: "Upazila Livestock Office & Veterinary Hospital, Tongi",
        address: "Tongi Upazila Complex",
        district: "Dhaka",
        phone: "+880 3923-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.8,
        reviewCount: 6,
        mapUrl: "https://maps.google.com/?q=Tongi+upazila+veterinary+hospital"
    },
    {
        name: "Upazila Livestock Office & Veterinary Hospital, Kaliakair",
        address: "Kaliakair Upazila Complex",
        district: "Dhaka",
        phone: "+880 8131-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.1,
        reviewCount: 18,
        mapUrl: "https://maps.google.com/?q=Kaliakair+upazila+veterinary+hospital"
    },
    {
        name: "Upazila Livestock Office & Veterinary Hospital, Kapasia",
        address: "Kapasia Upazila Complex",
        district: "Dhaka",
        phone: "+880 2790-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.2,
        reviewCount: 1,
        mapUrl: "https://maps.google.com/?q=Kapasia+upazila+veterinary+hospital"
    },
    {
        name: "Upazila Livestock Office & Veterinary Hospital, Sreepur",
        address: "Sreepur Upazila Complex",
        district: "Dhaka",
        phone: "+880 4505-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 3.9,
        reviewCount: 15,
        mapUrl: "https://maps.google.com/?q=Sreepur+upazila+veterinary+hospital"
    },
    {
        name: "Upazila Livestock Office & Veterinary Hospital, Kaliganj",
        address: "Kaliganj Upazila Complex",
        district: "Dhaka",
        phone: "+880 9959-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 3.9,
        reviewCount: 10,
        mapUrl: "https://maps.google.com/?q=Kaliganj+upazila+veterinary+hospital"
    },
    {
        name: "Upazila Livestock Office & Veterinary Hospital, Mirzapur",
        address: "Mirzapur Upazila Complex",
        district: "Dhaka",
        phone: "+880 3075-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.0,
        reviewCount: 19,
        mapUrl: "https://maps.google.com/?q=Mirzapur+upazila+veterinary+hospital"
    },
    {
        name: "Upazila Livestock Office & Veterinary Hospital, Gopalpur",
        address: "Gopalpur Upazila Complex",
        district: "Dhaka",
        phone: "+880 7351-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.0,
        reviewCount: 18,
        mapUrl: "https://maps.google.com/?q=Gopalpur+upazila+veterinary+hospital"
    },
    {
        name: "Upazila Livestock Office & Veterinary Hospital, Madhupur",
        address: "Madhupur Upazila Complex",
        district: "Dhaka",
        phone: "+880 5934-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.1,
        reviewCount: 9,
        mapUrl: "https://maps.google.com/?q=Madhupur+upazila+veterinary+hospital"
    },
    {
        name: "Upazila Livestock Office & Veterinary Hospital, Bhuapur",
        address: "Bhuapur Upazila Complex",
        district: "Dhaka",
        phone: "+880 9514-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.5,
        reviewCount: 4,
        mapUrl: "https://maps.google.com/?q=Bhuapur+upazila+veterinary+hospital"
    },
    {
        name: "Upazila Livestock Office & Veterinary Hospital, Nagarpur",
        address: "Nagarpur Upazila Complex",
        district: "Dhaka",
        phone: "+880 6960-XXXXXX",
        website: "",
        services: [
            "General Care",
            "Livestock",
            "Vaccination"
        ],
        hours: "9:00 AM - 5:00 PM",
        rating: 4.6,
        reviewCount: 7,
        mapUrl: "https://maps.google.com/?q=Nagarpur+upazila+veterinary+hospital"
    }
];
