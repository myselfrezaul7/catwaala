export type Resource = {
    slug: string;
    title: string;
    description: string;
    iconName: "FileText" | "MapPin" | "BriefcaseMedical";
    content: string; // Markdown content
    coverImage: string;
    date: string;
    author: string;
};

export const resources: Resource[] = [
    {
        slug: "new-kitten-checklist",
        title: "New Kitten Checklist",
        description: "Everything you need for your new furball",
        iconName: "FileText",
        date: "Feb 15, 2026",
        author: "Catwaala Team",
        coverImage: "https://images.unsplash.com/photo-1560807707-8cc77767d783?q=80&w=2000&auto=format&fit=crop",
        content: `
# Welcome to Parenthood!

Bringing a new kitten home is exciting! Here is everything you need to get started.

## Essentials
1.  **High-Quality Kitten Food**: Wet and dry food specifically for kittens.
2.  **Litter Box & Litter**: Open or covered, depending on preference. Non-clumping litter is safer for very young kittens.
3.  **Food & Water Bowls**: Stainless steel or ceramic (easy to clean).
4.  **Bedding**: A soft, warm bed or blanket.
5.  **Carrier**: For vet visits and safe travel.

## Grooming & Health
-   **Brush/Comb**: Get them used to grooming early.
-   **Nail Clippers**: Trim tips to save your furniture!
-   **Toys**: Wand toys, balls, and scratchers are must-haves.

## Safety First
-   **Kitten-proof your home**: Hide cords, secure windows (netting is crucial in Dhaka apartments!), and remove toxic plants.
-   **Vet Visit**: Schedule a check-up within the first week.

Enjoy your new furry friend!
        `
    },
    {
        slug: "local-vet-directory",
        title: "Local Vet Directory",
        description: "Trusted vets across Dhaka",
        iconName: "MapPin",
        date: "Jan 10, 2026",
        author: "Community",
        coverImage: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?q=80&w=2000&auto=format&fit=crop",
        content: `
# Trusted Veterinarians in Dhaka

Finding a good vet is crucial. Here are some highly recommended clinics by our community.

## Gulshan & Banani
*   **Pet Care Hospital**: Road 11, Banani. Known for 24/7 service.
*   **Gulshan Pet Clinic**: Road 34, Gulshan 1. Specialist in feline care.

## Dhanmondi & Lalmatia
*   **Paws & Claws**: Satmasjid Road. Great for general checkups and vaccinations.
*   **Lalmatia Vet Care**: Block D. Experienced surgeons.

## Uttara
*   **Uttara Animal Hospital**: Sector 7. Affordable and reliable.
*   **Care for Paws**: Sector 13.

> **Note**: Always call ahead for emergencies. Keep your vet's number saved!
        `
    },
    {
        slug: "cat-nutrition-guide",
        title: "Cat Nutrition Guide",
        description: "What to feed and what to avoid",
        iconName: "BriefcaseMedical",
        date: "Dec 05, 2025",
        author: "Dr. Meow",
        coverImage: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=2000&auto=format&fit=crop",
        content: `
# Feeding Your Cat Right

Cats are obligate carnivores, meaning they **must** eat meat to survive.

## The Good Stuff
-   **Protein**: Chicken, fish, beef, turkey.
-   **Taurine**: Essential for heart and eye health (found in meat).
-   **Water**: Cats have a low thirst drive. Wet food helps hydration.

## Foods to Avoid (Toxic!)
-   🚫 **Onions & Garlic**: Highly toxic to cats (causes anemia).
-   🚫 **Chocolate**: Contains theobromine (poisonous).
-   🚫 **Grapes & Raisins**: Can cause kidney failure.
-   🚫 **Milk**: Most adult cats are lactose intolerant! Stick to water.
-   🚫 **Lilies**: Extremely poisonous plants.

## Homemade vs. Commercial
Commercial food (Royal Canin, Whiskas, Lara) is formulated to be balanced. If cooking at home (boiled chicken/fish), ensure you add necessary supplements or mix with kibble.

Stay healthy!
        `
    }
];
