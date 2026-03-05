export type Resource = {
    slug: string;
    title: string;
    description: string;
    iconName: "FileText" | "MapPin" | "BriefcaseMedical";
    content: string; // Markdown content
    coverImage: string;
    date: string;
    author: string;
    badge: string;
    readTime: string;
    color: "rose" | "amber" | "teal";
};

export const resources: Resource[] = [
    {
        slug: "new-kitten-checklist",
        title: "New Kitten Checklist",
        description: "Everything you need for your deshi furball in Dhaka.",
        iconName: "FileText",
        date: "Feb 15, 2026",
        author: "Catwaala Team",
        badge: "Guide",
        readTime: "6 min",
        color: "rose",
        coverImage: "/assets/kitten-guide.png",
        content: `
# Welcome to Parenthood!

Bringing a new kitten home in Bangladesh is exciting! Here is everything you need to get started.

## Essentials
1.  **High-Quality Kitten Food**: Dry and wet food specifically for kittens. *Me-O* and *Whiskas* are widely available on Chaldal and Daraz, while *Royal Canin* can be found in premium Gulshan/Banani pet shops.
2.  **Litter Box & Litter**: Non-clumping litter is safer for very young kittens. Bentonite sand is available starting at ৳300 everywhere.
3.  **Food & Water Bowls**: Stainless steel or ceramic (easy to clean in our humid climate).
4.  **Bedding**: A soft, warm bed or a simple discarded, clean winter blanket.
5.  **Carrier**: For vet visits and safe travel through Dhaka traffic (CNG rides without a carrier are dangerous).

## Grooming & Health
-   **Brush/Comb**: Get them used to grooming early.
-   **Nail Clippers**: Trim tips to save your furniture!
-   **Boiled Fish Routine**: "Ilish-er kata chara mach" (boneless fish) mixed with rice is a great local staple, but don't add salt. Avoid raw fish.

## Safety First (Crucial in BD!)
-   **Apartment Netting**: High-rise syndrome is deadly. You **must** net your apartment windows and balconies using standard pigeon netting.
-   **Mosquito Coils**: Traditional mosquito coils or aerosol sprays used in many homes are **highly toxic** to kittens. Keep them away from rooms where these are actively burning.
-   **Vet Visit**: Schedule a check-up within the first week. See our Vet Directory to find one near you.

## Weather Prep
-   **Dhaka Summers**: During 40°C heat, ensure they have cool tile floors to sleep on and fresh, chilled water available at all times.
-   **Monsoon**: Keep them indoor-only. Stray cats roaming during monsoon season often pick up fungal infections and ticks.

Enjoy your new furry friend!
        `
    },
    {
        slug: "local-vet-directory",
        title: "Local Vet Directory",
        description: "Find verified vets across Bangladesh",
        iconName: "MapPin",
        date: "Jan 10, 2026",
        author: "Community",
        badge: "Directory",
        readTime: "Always updated",
        color: "teal",
        coverImage: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?q=80&w=2000&auto=format&fit=crop",
        content: `Redirecting to the verified directory...`
    },
    {
        slug: "cat-nutrition-guide",
        title: "Cat Nutrition Guide",
        description: "What to feed and what to avoid in BD",
        iconName: "BriefcaseMedical",
        date: "Dec 05, 2025",
        author: "Dr. Meow",
        badge: "Article",
        readTime: "7 min",
        color: "amber",
        coverImage: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=2000&auto=format&fit=crop",
        content: `
# Feeding Your Cat Right (BD Edition)

Cats are obligate carnivores, meaning they **must** eat meat to survive.

## The Bangladesh Pantry (Local & Budget Friendly)
-   **Chicken Liver (*Murgir Kolija*)**: Incredible source of vitamins and very budget-friendly (around ৳150/kg). Don't overfeed, serve moderately 1-2 times a week.
-   **Small Fish (*Puti Mach*)**: Local small fish boiled and thoroughly deboned (or mashed entirely if bones are soft) are excellent lean proteins.
-   **Boiled Eggs**: Great occasional treat.
-   **Taurine**: Essential for heart and eye health. Dark chicken meat (thighs) contains higher taurine than breast meat.

## Commercial Availability
If depending on dry kibble, *Me-O*, *Whiskas*, and *Lara* are the most commonly found mid-tier brands on Daraz or local supershops like Shwapno. Premium options like *Royal Canin* or *Reflex* are best sourced from dedicated pet supply stores in areas like Dhanmondi, Uttara, or Gulshan.

## Foods to Avoid (Highly Toxic!)
-   🚫 **Onions & Garlic**: Common in our local curries (*bhuna*), they are highly toxic and cause severe anemia.
-   🚫 **Chocolate**: Contains theobromine (poisonous).
-   🚫 **Hilsha Bones (*Ilish-er kata*)**: The tiny sharp bones can easily puncture their throat and digestive tract. Only serve strictly deboned portions.
-   🚫 **Milk**: The classic "milk for cats" myth! Most adult cats are lactose intolerant and will get severe diarrhea. Stick to water.
-   🚫 **Lilies & Daffodils**: Extremely poisonous plants. If you buy fresh flowers from Shahbagh, ensure lilies are kept away. Safe alternatives include local *kolmi shak* or cat grass.

## Hydration Warning
Dhaka heat can cause rapid dehydration. Always leave out multiple bowls of fresh water.

Stay healthy!
        `
    }
];
