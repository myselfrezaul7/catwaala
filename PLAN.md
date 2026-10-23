# Catwaala Polish & Improvement Plan (`PLAN.md`)

This document contains the complete, prioritized audit and execution plan for **Catwaala**. Every task is small, self-contained, and written with exact file paths, line references, and literal code replacements so it can be executed in a single edit session without making design decisions.

---

## Rules

1. **Keep the existing design style**: Warm cream/stone light mode (`#FFFDF8` / `stone-*`), warm zinc/stone dark mode (`dark:bg-zinc-950`, `dark:text-stone-100`), rose/amber/teal accents (`primary`, `amber-500`, `emerald-500`), `rounded-2xl` / `rounded-[2.5rem]` cards, and `.glass` / `.glass-card` utilities.
2. **No new libraries unless explicitly listed**: Do not run `npm install` or add external packages unless a task specifically instructs you to.
3. **No refactors outside the task**: Touch only the exact files and lines specified in the task. Do not rename exports, move files, or reformat unrelated code.
4. **Verify before finishing**: Run the "Done when" check at the end of each task before marking it complete.

---

## Do Not Touch

Keep these files, configurations, and styles exactly as they are unless a specific task ID explicitly targets a line inside them:

- `src/app/globals.css` — Custom CSS variables, `.glass`, `.glass-card`, `.glass-pill`, `.glass-btn`, and keyframe animations.
- `tailwind.config.ts` — Theme colors, font family variables (`--font-outfit`, `--font-jakarta`), and border-radius tokens.
- `src/utils/firebase.ts` — Firebase initialization, IndexedDB persistence fallback, and Auth/Storage/Firestore exports.
- `src/contexts/AuthContext.tsx`, `src/contexts/FavoritesContext.tsx`, `src/contexts/LanguageContext.tsx`, `src/contexts/RemoteConfigContext.tsx` — Core React context providers and state hooks.
- `src/components/ui/*` — Base Radix/shadcn UI primitives (`button.tsx`, `dialog.tsx`, `accordion.tsx`, `tabs.tsx`, `input.tsx`, `textarea.tsx`, `label.tsx`, `checkbox.tsx`, `skeleton.tsx`, `AnimatedCounter.tsx`).
- `src/components/3d/DynamicRainbowBridge.tsx` & `src/components/3d/RainbowBridgeCanvas.tsx` — 3D Rainbow Bridge canvas used on the `/memorial` page.
- `src/data/bd-vets.ts`, `src/data/cats.ts`, `src/data/memorials.ts`, `src/data/posts.ts`, `src/data/quiz.ts`, `src/data/resources.ts` — Static fallback and seed data arrays (except the single duplicate ID fix in `src/data/vets.ts`).

---

## High Priority Tasks

### Task `HERO-01` [DONE]: Replace 3D Hero Canvas with a Subtle, Clean Stray Newborn Kitten Hero Design
- **Category**: User Request / Design & Performance
- **Files**:
  - `public/assets/hero-newborn-kitten.webp` (new image asset)
  - `src/components/home/Hero.tsx`
- **What to change**:
  1. Place a clean, high-resolution WebP photo (`< 150 KB`, 1000×1000px) of a tiny stray newborn tabby kitten resting in soft natural morning light on a warm textured stone/cloth surface at `public/assets/hero-newborn-kitten.webp` (if generating or converting from an existing asset, ensure it is saved at `public/assets/hero-newborn-kitten.webp`; use `/assets/cat2.png` as temporary fallback only if image generation is unavailable).
  2. In `src/components/home/Hero.tsx`:
     - Remove the `dynamic` import of `HeroCatCanvas` (lines 7–21).
     - Fix the mobile alignment of the floating companion pill on line 85 by changing:
       ```tsx
       <div className="mb-8 flex justify-start">
       ```
       to:
       ```tsx
       <div className="mb-8 flex justify-center lg:justify-start">
       ```
     - Replace the right-column 3D wrapper (lines 137–156) with a subtle, clean newborn stray kitten portrait card with soft framing and a minimal caption badge:
       ```tsx
       {/* Right Column — Subtle & Clean Stray Newborn Kitten Portrait */}
       <motion.div
           initial={{ opacity: 0, y: 16 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
           className="lg:col-span-5 relative"
       >
           <div className="relative mx-auto max-w-md lg:max-w-none">
               {/* Subtle warm ambient halo */}
               <div className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-tr from-amber-500/10 via-rose-500/5 to-transparent blur-2xl pointer-events-none" />

               {/* Clean framed image container */}
               <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-stone-100 dark:bg-zinc-900 border border-stone-200/80 dark:border-zinc-800/80 shadow-[0_20px_50px_rgba(28,25,23,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
                   <Image
                       src="/assets/hero-newborn-kitten.webp"
                       alt="Tiny stray newborn kitten rescued in Dhaka"
                       fill
                       priority
                       sizes="(max-width: 768px) 100vw, (max-width: 1280px) 45vw, 520px"
                       className="object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />

                   {/* Minimal, clean bottom caption pill */}
                   <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-2xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-4 py-3 border border-white/60 dark:border-zinc-800 shadow-sm">
                       <div className="flex items-center gap-3 min-w-0">
                           <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shrink-0" />
                           <div className="truncate">
                               <p className="text-xs font-bold text-stone-800 dark:text-stone-100 truncate">Every fragile life matters</p>
                               <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate">Newborn street rescue • Dhaka, BD</p>
                           </div>
                       </div>
                       <Link
                           href="/adopt"
                           className="text-xs font-bold text-primary hover:underline shrink-0"
                       >
                           Foster / Adopt →
                       </Link>
                   </div>
               </div>
           </div>
       </motion.div>
       ```
- **Done when**: The homepage hero displays the static newborn stray kitten portrait with the subtle glass caption pill, `HeroCatCanvas` is no longer imported in `Hero.tsx`, and the top badge is centered on `<1024px` screens and left-aligned on `lg:` screens.

---

### Task `BUG-01` [DONE]: Fix HTML Entity Double-Escaping (`&#039;`, `&#x2F;`, `&amp;`) in User Submissions
- **Category**: Bugs & Broken Things
- **Files**: `src/lib/validation.ts`
- **What to change**:
  - `sanitizeInput` currently replaces `&`, `<`, `>`, `"`, `'`, and `/` with HTML entities (`&amp;`, `&#039;`, `&#x2F;`) before saving to Firestore. Because React automatically escapes all text rendered in JSX, users see literal `&#039;` and `&#x2F;` in Memorial tributes, Rescue Reports, and Adoption Forms.
  - In `src/lib/validation.ts` (lines 7–16), replace `sanitizeInput` with a function that strips dangerous HTML tags and control characters while preserving normal punctuation (`'`, `"`, `/`, `&`):
    ```ts
    export function sanitizeInput(input: string): string {
        if (!input) return '';
        return input
            .replace(/<[^>]*>?/gm, '') // Strip HTML tags
            .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '') // Strip control chars
            .trim();
    }
    ```
- **Done when**: Submitting text containing apostrophes (e.g., `Don't` or `Dhanmondi 9/A`) through `sanitizeInput` returns `"Don't"` and `"Dhanmondi 9/A"` without `&#039;` or `&#x2F;`, while `<script>alert(1)</script>` is stripped to `alert(1)`.

---

### Task `BUG-02` [DONE]: Fix Broken Cat Matchmaker Quiz Scoring Logic
- **Category**: Bugs & Broken Things
- **Files**: `src/app/quiz/page.tsx`
- **What to change**:
  - In `src/app/quiz/page.tsx` (lines 42–55), `matchedCats` builds `selectedTags` and `catTags` (`cat.goodWithKids ? 'Good with Kids' : 'Quiet Home'`, etc.) and then ignores both, sorting cats using `const score = Math.random();`.
  - Replace lines 42–55 with deterministic tag-matching against `cat.temperamentTags`, `cat.goodWithKids`, and age keywords:
    ```tsx
    const matchedCats = useMemo(() => {
        if (!showResults) return [];
        const selectedTags = Object.values(answers).flat();
        return cats
            .map((cat) => {
                const catTags = [
                    ...(cat.temperamentTags || []),
                    cat.goodWithKids ? 'Good with Kids' : 'Quiet Home',
                    cat.age.toLowerCase().includes('month') ? 'Kitten' : 'Adult',
                ];
                const matchCount = selectedTags.filter((tag) =>
                    catTags.some((ct) => ct.toLowerCase() === tag.toLowerCase())
                ).length;
                return { ...cat, score: matchCount };
            })
            .sort((a, b) => b.score - a.score)
            .slice(0, 3);
    }, [showResults, answers]);
    ```
- **Done when**: `Math.random()` is completely removed from `src/app/quiz/page.tsx` and selecting quiz options deterministically ranks the top 3 cats by matching tag count.

---

### Task `BUG-03` [DONE]: Fix Header Search Overlay Not Rendering Filtered Routes & Broken `/adopt?query=` Redirect
- **Category**: Bugs & Broken Things
- **Files**: `src/components/layout/Header.tsx`
- **What to change**:
  - Currently, `filteredRoutes` is computed on lines 41–45 of `src/components/layout/Header.tsx`, but never rendered in the Search Overlay modal; instead, only 4 hardcoded tags are shown, and pressing Enter falls back to `/adopt?query=...` (which does nothing because `/adopt` has no query filter).
  - In `src/components/layout/Header.tsx`:
    1. On line 53, change the fallback when `filteredRoutes.length === 0` from:
       ```tsx
       router.push(`/adopt?query=${encodeURIComponent(searchQuery.trim())}`);
       ```
       to:
       ```tsx
       router.push(`/find-vet`);
       ```
    2. Inside the Search Overlay (lines 364–385), replace the static `"Popular Searches"` block so it renders `filteredRoutes` dynamically when the user types, or shows all `SEARCH_ROUTES` when `searchQuery` is empty:
       ```tsx
       <div className="mt-8">
           <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
               {searchQuery.trim() ? "Matching Pages" : "Quick Navigation"}
           </p>
           <div className="flex flex-wrap gap-2">
               {(searchQuery.trim() ? filteredRoutes : SEARCH_ROUTES).map((route) => (
                   <button
                       key={route.href}
                       type="button"
                       onClick={() => {
                           router.push(route.href);
                           setIsSearchOpen(false);
                           setSearchQuery("");
                       }}
                       className="px-4 py-2 rounded-full bg-secondary hover:bg-primary/10 hover:text-primary border border-border text-sm font-medium transition-colors"
                   >
                       {route.label}
                   </button>
               ))}
               {searchQuery.trim() && filteredRoutes.length === 0 && (
                   <p className="text-sm text-muted-foreground">
                       No matching page found. Press Enter to browse our Vet Directory.
                   </p>
               )}
           </div>
       </div>
       ```
- **Done when**: Opening the search overlay and typing `"vet"` or `"quiz"` filters the clickable route pills live, and clicking any pill navigates to its route and closes the modal.

---

### Task `BUG-04` [DONE]: Fix Missing `tag` Field in `adaptCatToCard` Adapter
- **Category**: Bugs & Broken Things
- **Files**: `src/utils/adapters.ts`
- **What to change**:
  - `PetCard` checks `cat.tag` (lines 72–80 of `src/components/shared/PetCard.tsx`) to render the `"Urgent"` / `"New"` / `"Adopted"` badge, and `CatDetailClient` checks `cat.tag`. However, `adaptCatToCard` in `src/utils/adapters.ts` omits `tag` from its returned object.
  - In `src/utils/adapters.ts` (lines 20–36), add `tag: cat.tag || (cat.status !== "Available" ? cat.status : undefined),` to the object returned by `adaptCatToCard`:
    ```ts
    return {
        id: cat.id,
        name: cat.name,
        breed: cat.breed || "Deshi Mix",
        age: ageString,
        gender: cat.gender,
        imageUrl: primaryImage,
        location: cat.location,
        description: cat.description,
        tag: (cat as any).tag || (cat.status && cat.status !== "Available" ? cat.status : undefined),
        temperamentTags: cat.temperament || (cat as any).temperamentTags || [],
        vaccinated: cat.attributes?.vaccinated ?? (cat as any).vaccinated ?? false,
        neutered: cat.attributes?.neutered ?? (cat as any).neutered ?? false,
        goodWithKids: cat.attributes?.goodWithKids ?? (cat as any).goodWithKids ?? false,
        medicalNotes: (cat as any).medical_history || undefined,
    };
    ```
- **Done when**: Cats adapted via `adaptCatToCard` preserve their `tag`, `temperamentTags`, and boolean health attributes whether loaded from `src/data/cats.ts` or Firestore.

---

### Task `BUG-05` [DONE]: Fix Duplicate vet Clinic ID `203` in `src/data/vets.ts`
- **Category**: Bugs & Broken Things
- **Files**: `src/data/vets.ts`
- **What to change**:
  - In `src/data/vets.ts`, both `"Dr. Bibek Chandra (Private)"` (line 139) and `"District Veterinary Hospital, Cumilla"` (line 146) have `id: 203`, which causes React duplicate key warnings when rendering `MOCK_VET_CLINICS` in `VetFinder.tsx`.
  - Change line 139 in `src/data/vets.ts` from:
    ```ts
    id: 203, name: 'Dr. Bibek Chandra (Private)',
    ```
    to:
    ```ts
    id: 213, name: 'Dr. Bibek Chandra (Private)',
    ```
- **Done when**: Every entry in `MOCK_VET_CLINICS` in `src/data/vets.ts` has a unique numeric `id`.

---

### Task `BUG-06` [DONE]: Remove Duplicate Page Transition Wrapper (`src/app/template.tsx`)
- **Category**: Bugs & Broken Things / Performance
- **Files**: `src/app/template.tsx`
- **What to change**:
  - `src/app/layout.tsx` (line 123) already wraps `{children}` inside `<PageTransition>`, which animates page changes with `framer-motion` keyed by `usePathname()`. Having `src/app/template.tsx` ALSO wrap `{children}` in a second `motion.div` causes double animations and layout jitter on every route change.
  - Replace the contents of `src/app/template.tsx` with a pass-through component (or remove the `framer-motion` wrapper):
    ```tsx
    export default function Template({ children }: { children: React.ReactNode }) {
        return <>{children}</>;
    }
    ```
- **Done when**: `src/app/template.tsx` no longer imports `framer-motion` or nests a second `motion.div` inside `PageTransition`.

---

### Task `BUG-07` [DONE]: Fix Broken "Edit Profile" Alert on `/profile` and Blank Leaderboard Names on `/dashboard`
- **Category**: Bugs & Broken Things
- **Files**:
  - `src/app/profile/page.tsx`
  - `src/app/dashboard/page.tsx`
- **What to change**:
  1. In `src/app/profile/page.tsx` (lines 59–62), the `"Edit Profile"` button calls `onClick={() => alert("Coming soon!")}`, whereas `/dashboard` has the full working profile editor. Replace lines 59–62 in `src/app/profile/page.tsx`:
     ```tsx
     <Button variant="outline" size="sm" onClick={() => alert("Coming soon!")}>
         <Settings className="w-4 h-4 mr-2" /> Edit Profile
     </Button>
     ```
     with:
     ```tsx
     <Link href="/dashboard">
         <Button variant="outline" size="sm">
             <Settings className="w-4 h-4 mr-2" /> Go to Dashboard & Edit Profile
         </Button>
     </Link>
     ```
  2. In `src/app/dashboard/page.tsx` (lines 454–457), the Community Leaderboard renders `u.name` (`alt={u.name}` and `{u.name}`), which is `undefined` for users whose Firestore document stores `full_name` or `displayName`. Change lines 452–458 from:
     ```tsx
     <img
         src={u.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.id}`}
         alt={u.name}
         className="w-10 h-10 rounded-full bg-stone-100 object-cover border border-white shadow-sm"
     />
     <div className="flex-1">
         <p className="font-bold text-stone-800 dark:text-stone-200 text-sm flex items-center gap-2">
             {u.name}
     ```
     to:
     ```tsx
     <img
         src={u.avatar || u.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.id}`}
         alt={u.full_name || u.displayName || u.name || "Community Member"}
         className="w-10 h-10 rounded-full bg-stone-100 object-cover border border-white shadow-sm"
     />
     <div className="flex-1">
         <p className="font-bold text-stone-800 dark:text-stone-200 text-sm flex items-center gap-2">
             {u.full_name || u.displayName || u.name || "Community Member"}
     ```
- **Done when**: Clicking "Go to Dashboard & Edit Profile" on `/profile` navigates to `/dashboard` without a browser `alert()`, and all Leaderboard entries on `/dashboard` display a valid name.

---

### Task `BUG-08` [DONE]: Make Resource Guide "In this Guide" Table of Contents Links Scroll to Sections
- **Category**: Bugs & Broken Things
- **Files**: `src/app/resources/[slug]/page.tsx`
- **What to change**:
  - In `src/app/resources/[slug]/page.tsx`:
    1. On line 82, add a slugified `id` and `scroll-mt-28` to the `h2` renderer in `ReactMarkdown`:
       ```tsx
       h2: ({ node, children, ...props }) => {
           const text = String(children);
           const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
           return (
               <h2
                   id={id}
                   className="scroll-mt-28 text-xl md:text-2xl font-bold text-stone-800 dark:text-stone-200 mt-10 mb-4 flex items-center gap-2 border-b border-stone-200/60 dark:border-zinc-800 pb-2"
                   {...props}
               >
                   {children}
               </h2>
           );
       },
       ```
    2. On lines 133–138, wrap each TOC item in an `<a href={...}>` so clicking it scrolls smoothly to the corresponding `<h2>`:
       ```tsx
       {headings.map((heading, i) => {
           const id = heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
           return (
               <li key={i}>
                   <a
                       href={`#${id}`}
                       className="text-stone-500 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-500 transition-colors flex items-start gap-2.5 leading-snug"
                   >
                       <div className="w-1.5 h-1.5 rounded-full bg-stone-300 dark:bg-zinc-700 mt-2 shrink-0" />
                       <span>{heading}</span>
                   </a>
               </li>
           );
       })}
       ```
- **Done when**: Clicking any item under "In this Guide" on `/resources/new-kitten-checklist` or `/resources/cat-nutrition-guide` scrolls smoothly to that `<h2>` section without being hidden behind the sticky header.

---

### Task `BUG-09` [DONE]: Remove CSP-Blocked External Noise SVG and Broken Admin "Add New" Supabase Alert
- **Category**: Bugs & Broken Things
- **Files**:
  - `src/components/report/ReportForm.tsx`
  - `src/components/admin/AdminDashboard.tsx`
- **What to change**:
  1. In `src/components/report/ReportForm.tsx` (line 225), remove `<div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>` because `https://grainy-gradients.vercel.app` is blocked by `img-src` in `src/middleware.ts` CSP and triggers a console CSP violation error.
  2. In `src/components/admin/AdminDashboard.tsx` (lines 156–158), replace the broken button that alerts `"Supabase connnection required for adding data."` with a working link to `/admin/cats`:
     ```tsx
     <Link href="/admin/cats">
         <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 rounded-xl shadow-lg shadow-emerald-500/20">
             <Plus className="w-4 h-4" /> Manage Cats
         </Button>
     </Link>
     ```
- **Done when**: Opening `/report` produces zero Content-Security-Policy console errors for `grainy-gradients.vercel.app`, and the top-right button on `/admin` navigates to `/admin/cats`.

---

### Task `RESP-01` [DONE]: Fix 360px Mobile Overflow & Cramped 2-Column Grids in Forms and Modals
- **Category**: Mobile Responsiveness (360px, 768px, 1280px)
- **Files**:
  - `src/app/adoption-form/page.tsx`
  - `src/components/adopt/AdoptionForm.tsx`
  - `src/components/memorial/MemorialModal.tsx`
- **What to change**:
  1. In `src/app/adoption-form/page.tsx`:
     - Line 36: Change `className="glass-card p-8 rounded-3xl space-y-8 border border-amber-100/60 shadow-xl"` to `className="glass-card p-5 sm:p-8 rounded-3xl space-y-8 border border-amber-100/60 shadow-xl"`.
     - Line 40: Change `className="grid grid-cols-2 gap-4"` to `className="grid grid-cols-1 sm:grid-cols-2 gap-4"`.
     - Line 81: Change `className="grid grid-cols-2 gap-4 pt-2"` to `className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2"`.
     - Line 170: Change `className="grid grid-cols-2 gap-4"` to `className="grid grid-cols-1 sm:grid-cols-2 gap-4"`.
  2. In `src/components/adopt/AdoptionForm.tsx`:
     - Line 76: Change `className="grid grid-cols-2 gap-4"` to `className="grid grid-cols-1 sm:grid-cols-2 gap-4"`.
  3. In `src/components/memorial/MemorialModal.tsx`:
     - Line 94: Change `className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 max-w-lg w-full shadow-2xl border border-amber-100 relative overflow-hidden"` to `className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-8 md:p-10 max-w-lg w-full shadow-2xl border border-amber-100 dark:border-zinc-800 relative overflow-hidden"`.
     - Line 111: Change `className="grid grid-cols-2 gap-4"` to `className="grid grid-cols-1 sm:grid-cols-2 gap-4"`.
- **Done when**: At `360px` viewport width, `/adoption-form`, the `AdoptionForm` modal, and `MemorialModal` stack their paired inputs into 1 column with comfortable padding and zero horizontal scroll.

---

### Task `RESP-02` [DONE]: Fix Mobile Sticky Bottom Bar Collision on Cat Detail Page (`/adopt/[id]`)
- **Category**: Mobile Responsiveness (360px, 768px)
- **Files**: `src/components/adopt/CatDetailClient.tsx`
- **What to change**:
  - In `src/components/adopt/CatDetailClient.tsx`, the root container has `pb-24` (line 45) and the mobile sticky action bar is `fixed bottom-0 left-0 w-full bg-white border-t border-stone-200 p-4 pb-6 md:hidden z-50` (line 286). Because `MobileBottomNav` is `fixed bottom-4 left-4 right-4 z-50 md:hidden`, the two bars overlap directly at the bottom of the screen on 360px/768px viewports!
  - In `src/components/adopt/CatDetailClient.tsx`:
    1. Change line 45 from:
       ```tsx
       <div className="min-h-screen pt-24 pb-24 bg-[#FFFDF8] text-stone-800">
       ```
       to:
       ```tsx
       <div className="min-h-screen pt-24 pb-44 md:pb-24 bg-[#FFFDF8] dark:bg-zinc-950 text-stone-800 dark:text-stone-100">
       ```
    2. Change line 286 from:
       ```tsx
       <div className="fixed bottom-0 left-0 w-full bg-white border-t border-stone-200 p-4 pb-6 md:hidden z-50 flex gap-3 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
       ```
       to:
       ```tsx
       <div className="fixed bottom-20 left-4 right-4 rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-stone-200 dark:border-zinc-800 p-3 md:hidden z-40 flex gap-3 shadow-xl">
       ```
- **Done when**: On a 360px mobile viewport on `/adopt/1`, the `"Adopt [Cat]"` and `"Sponsor"` bar sits cleanly above the `MobileBottomNav` dock without overlapping it.

---

## Medium Priority Tasks

### Task `PERF-01` [DONE]: Compress 1 MB Favicon (`src/app/icon.jpg`) and Remove Unused Root `"use client"` on Homepage
- **Category**: Performance
- **Files**:
  - `src/app/icon.jpg` (or replace with optimized `src/app/icon.png` `< 32 KB`)
  - `src/app/page.tsx`
- **What to change**:
  1. `src/app/icon.jpg` is currently **1,012,122 bytes (~1 MB)**, which Next.js serves as the site icon in `<head>`. Resize/compress `src/app/icon.jpg` in-place to `192x192` JPEG at quality 85 (`< 25 KB`) using Node/sharp or PowerShell `System.Drawing` so the filename `src/app/icon.jpg` stays identical but its byte size drops below `30 KB`.
  2. In `src/app/page.tsx`:
     - Remove `"use client";` from line 1. (`Hero`, `HomepageStats`, `SuccessStories`, and `PromoPetBhai` already declare `"use client"` in their own files, so `src/app/page.tsx` can be a fast Server Component).
- **Done when**: `src/app/icon.jpg` is under `30 KB` and `src/app/page.tsx` does not have `"use client"` at the top, allowing Next.js to server-render the homepage shell.

---

### Task `PERF-02` [DONE]: Replace Raw `<img>` Tags with Optimized `next/image` Across Public Pages
- **Category**: Performance
- **Files**:
  - `src/components/memorial/MemorialList.tsx`
  - `src/app/adoption-form/page.tsx`
  - `src/app/login/page.tsx`
- **What to change**:
  1. In `src/components/memorial/MemorialList.tsx`:
     - Add `import Image from "next/image";` at the top.
     - Replace lines 122–127 (`<img src={memorial.imageUrl} alt={memorial.petName} ... />`) with:
       ```tsx
       <Image
           src={memorial.imageUrl}
           alt={memorial.petName}
           fill
           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
           className="object-cover transition-all duration-700 filter grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105"
       />
       ```
  2. In `src/app/adoption-form/page.tsx`:
     - Add `import Image from "next/image";` at the top.
     - Replace line 27 (`<img src={cat.imageUrl} alt={cat.name} className="w-16 h-16 rounded-full object-cover border-2 border-amber-200" />`) with:
       ```tsx
       <Image src={cat.imageUrl} alt={cat.name} width={64} height={64} className="w-16 h-16 rounded-full object-cover border-2 border-amber-200" />
       ```
  3. In `src/app/login/page.tsx`:
     - Add `import Image from "next/image";` at the top.
     - Replace line 81 (`<img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />`) with an inline Google SVG or `<Image src="https://www.svgrepo.com/show/475656/google-color.svg" width={20} height={20} className="w-5 h-5" alt="Google logo" unoptimized />`.
- **Done when**: `MemorialList.tsx`, `adoption-form/page.tsx`, and `login/page.tsx` have zero raw `<img>` tags.

---

### Task `SEO-01` [DONE]: Add Unique Page Titles, Meta Descriptions, and Open Graph Metadata to Client Routes
- **Category**: SEO
- **Files**:
  - `src/app/community/layout.tsx` (new file)
  - `src/app/faq/layout.tsx` (new file)
  - `src/app/quiz/layout.tsx` (new file)
  - `src/app/adoption-form/layout.tsx` (new file)
  - `src/app/login/layout.tsx` (new file)
  - `src/app/signup/layout.tsx` (new file)
- **What to change**:
  - Because `page.tsx` in `/community`, `/faq`, `/quiz`, `/adoption-form`, `/login`, and `/signup` are `"use client"` components, they cannot export `metadata` directly. Create a minimal Server Component `layout.tsx` in each of those 6 route folders that exports `metadata: Metadata` and returns `children`:
    1. `src/app/community/layout.tsx`:
       - `title: "Cat Care Resources & Community Hub"`
       - `description: "Read Bangladesh-specific cat nutrition guides, new kitten checklists, and connect with cat lovers in Dhaka."`
    2. `src/app/faq/layout.tsx`:
       - `title: "Frequently Asked Questions"`
       - `description: "Answers to common questions about adopting stray cats, TNR programs, vaccinations, and volunteering with Catwaala in Bangladesh."`
    3. `src/app/quiz/layout.tsx`:
       - `title: "Purrfect Matchmaker Quiz"`
       - `description: "Take our 1-minute personality quiz to find which rescued desi cat matches your home and lifestyle."`
    4. `src/app/adoption-form/layout.tsx`:
       - `title: "Adoption Application Form"`
       - `description: "Apply to adopt or foster a rescued stray cat from Catwaala in Bangladesh."`
    5. `src/app/login/layout.tsx`:
       - `title: "Sign In"`
       - `description: "Sign in to your Catwaala account to track adoption applications, saved cats, and rescue reports."`
       - `robots: { index: false, follow: true }`
    6. `src/app/signup/layout.tsx`:
       - `title: "Create an Account"`
       - `description: "Join the Catwaala community to adopt, foster, and help street cats across Bangladesh."`
       - `robots: { index: false, follow: true }`
- **Done when**: Navigating to `/community`, `/faq`, `/quiz`, `/adoption-form`, `/login`, and `/signup` renders a unique `<title>` (`... | Catwaala 🐾`) and `<meta name="description">` in the document head.

---

### Task `SEO-02` [DONE]: Add Dynamic `generateMetadata` and Proper `<h1>` Semantics to `/resources/[slug]`
- **Category**: SEO
- **Files**:
  - `src/app/resources/[slug]/layout.tsx` (new file)
  - `src/app/resources/[slug]/page.tsx`
- **What to change**:
  1. Create `src/app/resources/[slug]/layout.tsx` exporting `generateMetadata`:
     ```tsx
     import type { Metadata } from "next";
     import { resources } from "@/data/resources";

     export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
         const { slug } = await params;
         const resource = resources.find((r) => r.slug === slug);
         if (!resource) {
             return { title: "Guide Not Found" };
         }
         return {
             title: resource.title,
             description: resource.description,
             openGraph: {
                 title: `${resource.title} | Catwaala 🐾`,
                 description: resource.description,
                 images: [resource.coverImage],
             },
         };
     }

     export default function ResourceLayout({ children }: { children: React.ReactNode }) {
         return <>{children}</>;
     }
     ```
  2. In `src/app/resources/[slug]/page.tsx` (line 81), the Markdown content starts with `# Welcome to Parenthood!`, which renders a second `<h1>` on the page in addition to the hero `<h1>` on line 57. Change line 81 from:
     ```tsx
     h1: ({ node, ...props }) => <h1 className="text-2xl md:text-3xl font-bold font-heading text-stone-900 dark:text-stone-100 mt-8 mb-4" {...props} />,
     ```
     to render as an `<h2>` so there is only one `<h1>` per page:
     ```tsx
     h1: ({ node, ...props }) => <h2 className="text-2xl md:text-3xl font-bold font-heading text-stone-900 dark:text-stone-100 mt-8 mb-4" {...props} />,
     ```
- **Done when**: `/resources/new-kitten-checklist` and `/resources/cat-nutrition-guide` have unique page titles/OG tags and contain exactly one `<h1>` element in the DOM.

---

### Task `SEO-03` [DONE]: Fix Sitemap Entries and Placeholder Phone Number in Root JSON-LD
- **Category**: SEO
- **Files**:
  - `src/app/sitemap.ts`
  - `src/app/layout.tsx`
- **What to change**:
  1. In `src/app/sitemap.ts`:
     - Line 29: Change `changeFrequency: 'never' as const` on `/report` to `changeFrequency: 'monthly' as const` (search engines ignore or de-prioritize `"never"` on active pages).
     - Add `'/quiz'` to the static routes list (lines 12–21) with `changeFrequency: 'monthly' as const, priority: 0.7`.
     - Filter out `/resources/local-vet-directory` from `resourceUrls` (line 36) because `/resources/local-vet-directory` immediately client-side redirects to `/find-vet`:
       ```ts
       const resourceUrls = resources
           .filter((r) => r.slug !== 'local-vet-directory')
           .map((resource) => ({
               url: `${baseUrl}/resources/${resource.slug}`,
               lastModified: new Date(),
               changeFrequency: 'monthly' as const,
               priority: 0.6,
           }));
       ```
  2. In `src/app/layout.tsx` (lines 100–106):
     - Replace the fake placeholder telephone `"+880-123-456789"` in `jsonLd.contactPoint` with `email: "hello@catwaala.com"` and `url: "https://catwaala.com/report"`:
       ```ts
       contactPoint: {
         "@type": "ContactPoint",
         email: "hello@catwaala.com",
         contactType: "customer service",
         areaServed: "BD",
         availableLanguage: ["en", "bn"]
       }
       ```
- **Done when**: `sitemap.ts` excludes the redirecting `/resources/local-vet-directory` slug, includes `/quiz`, uses `'monthly'` for `/report`, and `src/app/layout.tsx` no longer contains `+880-123-456789`.

---

### Task `A11Y-01` [DONE]: Add Missing `aria-label` Attributes to All Icon-Only Interactive Buttons
- **Category**: Accessibility
- **Files**:
  - `src/components/layout/Header.tsx`
  - `src/components/layout/MobileBottomNav.tsx`
  - `src/components/adopt/CatDetailClient.tsx`
  - `src/components/shared/EmergencyFAB.tsx`
  - `src/components/shared/LanguageToggle.tsx`
  - `src/components/vet/VetFinder.tsx`
- **What to change**:
  1. `src/components/layout/Header.tsx`:
     - Line 200 (Mobile search icon button): Add `aria-label="Open search"`.
     - Line 323 (Close search overlay button): Add `aria-label="Close search"`.
  2. `src/components/layout/MobileBottomNav.tsx`:
     - Line 57 (`More` menu toggle button): Add `aria-label="More navigation options"` and `aria-expanded={showMore}`.
  3. `src/components/adopt/CatDetailClient.tsx`:
     - Line 62 (Share button): Add `aria-label={`Share ${cat.name}`}`.
     - Line 65 (Favorite button): Add `aria-label={isFavorited ? `Remove ${cat.name} from favorites` : `Save ${cat.name} to favorites`}`.
  4. `src/components/shared/EmergencyFAB.tsx`:
     - Line 77 (Main floating action button): Add `aria-label={isOpen ? "Close emergency menu" : "Open emergency menu"}` and `aria-expanded={isOpen}`.
  5. `src/components/shared/LanguageToggle.tsx`:
     - Line 10: Add `aria-label={lang === "en" ? "Switch language to Bengali" : "Switch language to English"}`.
  6. `src/components/vet/VetFinder.tsx`:
     - Line 154 (Clear search input `X` button): Add `aria-label="Clear search query"`.
- **Done when**: Every icon-only button in those 6 files has a descriptive `aria-label` attribute.

---

### Task `A11Y-02` [DONE]: Associate Form `<label>` Elements with Inputs Using `htmlFor` and `id`
- **Category**: Accessibility
- **Files**:
  - `src/components/volunteer/VolunteerForm.tsx`
  - `src/components/adopt/AdoptionForm.tsx`
  - `src/components/vet/VetFinder.tsx`
- **What to change**:
  1. In `src/components/volunteer/VolunteerForm.tsx`:
     - Line 113–114: Add `htmlFor="vol-name"` to `<label>` and `id="vol-name"` to `<input>`.
     - Line 122–123: Add `htmlFor="vol-email"` to `<label>` and `id="vol-email"` to `<input>`.
     - Line 132–133: Add `htmlFor="vol-phone"` to `<label>` and `id="vol-phone"` to `<input>`.
     - Line 143–144: Add `htmlFor="vol-city"` to `<label>` and `id="vol-city"` to `<input>`.
     - Line 154–156: Add `htmlFor="vol-role"` to `<label>` and `id="vol-role"` to `<select>`.
     - Line 171–172: Add `htmlFor="vol-experience"` to `<label>` and `id="vol-experience"` to `<textarea>`.
  2. In `src/components/adopt/AdoptionForm.tsx`:
     - Line 78–79: Add `htmlFor="adopt-name"` to `<label>` and `id="adopt-name"` to `<input>`.
     - Line 85–86: Add `htmlFor="adopt-phone"` to `<label>` and `id="adopt-phone"` to `<input>`.
     - Line 94–95: Add `htmlFor="adopt-email"` to `<label>` and `id="adopt-email"` to `<input>`.
     - Line 102–103: Add `htmlFor="adopt-address"` to `<label>` and `id="adopt-address"` to `<textarea>`.
     - Line 111–112: Add `htmlFor="adopt-home-type"` to `<label>` and `id="adopt-home-type"` to `<select>`.
     - Line 146–147: Add `htmlFor="adopt-reason"` to `<label>` and `id="adopt-reason"` to `<textarea>`.
  3. In `src/components/vet/VetFinder.tsx`:
     - Line 145: Add `aria-label="Search clinics by name, area, or service"` to the search `<input>`.
     - Line 170: Add `aria-label="Filter clinics by district"` to the district `<select>`.
- **Done when**: Clicking any field label in `VolunteerForm` or `AdoptionForm` focuses its corresponding input, and the `VetFinder` search/select controls have accessible labels.

---

### Task `DESIGN-01` [DONE]: Fix Missing Dark Mode Styles on `/quiz`, `/memorial`, and `/adopt/[id]`
- **Category**: Design Consistency
- **Files**:
  - `src/app/quiz/page.tsx`
  - `src/components/memorial/MemorialList.tsx`
  - `src/components/adopt/CatDetailClient.tsx`
- **What to change**:
  1. In `src/app/quiz/page.tsx`:
     - Line 61: Change `className="min-h-screen pt-28 pb-20 bg-[#FFFDF8] flex items-center justify-center relative overflow-hidden"` to `className="min-h-screen pt-28 pb-20 bg-[#FFFDF8] dark:bg-zinc-950 flex items-center justify-center relative overflow-hidden"`.
     - Line 82: Change `className="text-4xl md:text-5xl font-bold text-stone-800 mb-3 font-heading"` to `className="text-4xl md:text-5xl font-bold text-stone-800 dark:text-stone-100 mb-3 font-heading"`.
     - Line 83: Change `className="text-lg text-stone-600"` to `className="text-lg text-stone-600 dark:text-stone-400"`.
     - Line 99: Change `className="glass-card p-8 md:p-12 rounded-[2.5rem] border border-amber-100/80 shadow-xl bg-white/80 relative overflow-hidden"` to `className="glass-card p-6 sm:p-8 md:p-12 rounded-[2.5rem] border border-amber-100/80 dark:border-zinc-800 shadow-xl bg-white/80 dark:bg-zinc-900/80 relative overflow-hidden"`.
     - Line 113: Change `className="text-2xl md:text-3xl font-bold text-stone-800 mb-8 text-center leading-snug"` to `className="text-2xl md:text-3xl font-bold text-stone-800 dark:text-stone-100 mb-8 text-center leading-snug"`.
     - Line 121: Change `className="w-full text-left p-5 rounded-2xl border-2 border-stone-100 bg-white hover:border-amber-400 hover:bg-amber-50/40 transition-all duration-200 flex items-center justify-between group shadow-sm hover:shadow-md"` to `className="w-full text-left p-5 rounded-2xl border-2 border-stone-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-amber-400 dark:hover:border-amber-500 hover:bg-amber-50/40 dark:hover:bg-amber-950/30 transition-all duration-200 flex items-center justify-between group shadow-sm hover:shadow-md"`.
     - Line 123: Change `className="text-lg font-medium text-stone-700 group-hover:text-stone-900"` to `className="text-lg font-medium text-stone-700 dark:text-stone-200 group-hover:text-stone-900 dark:group-hover:text-white"`.
     - Line 147: Change `className="text-3xl md:text-5xl font-bold text-stone-800 mb-4 font-heading"` to `className="text-3xl md:text-5xl font-bold text-stone-800 dark:text-stone-100 mb-4 font-heading"`.
  2. In `src/components/memorial/MemorialList.tsx`:
     - Line 61: Change `className="min-h-screen pt-28 pb-20 bg-[#FFFDF8]"` to `className="min-h-screen pt-28 pb-20 bg-[#FFFDF8] dark:bg-zinc-950"`.
     - Line 77: Change `className="text-4xl md:text-6xl font-bold text-stone-800 mb-6 font-heading tracking-tight"` to `className="text-4xl md:text-6xl font-bold text-stone-800 dark:text-stone-100 mb-6 font-heading tracking-tight"`.
     - Line 80: Change `className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto mb-10 leading-relaxed font-light"` to `className="text-lg md:text-xl text-stone-600 dark:text-stone-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light"`.
     - Line 119: Change `className="glass-card rounded-[2rem] overflow-hidden border border-amber-100/60 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col group bg-white/60 hover:bg-white"` to `className="glass-card rounded-[2rem] overflow-hidden border border-amber-100/60 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col group bg-white/60 dark:bg-zinc-900/60 hover:bg-white dark:hover:bg-zinc-900"`.
     - Line 136: Change `className="text-stone-600 italic mb-6 leading-relaxed flex-grow text-sm md:text-base font-serif"` to `className="text-stone-600 dark:text-stone-300 italic mb-6 leading-relaxed flex-grow text-sm md:text-base font-serif"`.
     - Line 141: Change `className="font-bold text-stone-800 text-sm"` to `className="font-bold text-stone-800 dark:text-stone-200 text-sm"`.
  3. In `src/components/adopt/CatDetailClient.tsx`:
     - Line 99: Change `className="text-4xl md:text-5xl font-bold text-stone-800 mb-2 font-heading"` to `className="text-4xl md:text-5xl font-bold text-stone-800 dark:text-stone-100 mb-2 font-heading"`.
     - Line 134: Change `className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm space-y-3"` to `className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-stone-100 dark:border-zinc-800 shadow-sm space-y-3"`.
     - Line 175: Change `className="text-stone-600 leading-relaxed whitespace-pre-line text-lg"` to `className="text-stone-600 dark:text-stone-300 leading-relaxed whitespace-pre-line text-lg"`.
- **Done when**: Switching the theme toggle to Dark Mode on `/quiz`, `/memorial`, and `/adopt/[id]` renders dark backgrounds (`zinc-950`/`zinc-900`) and legible light text (`stone-100`/`stone-300`) instead of blinding white cards with unreadable text.

---

## Low Priority Tasks

### Task `CLEAN-01` [DONE]: Remove Duplicate Utility and ThemeProvider Files
- **Category**: Code Quality
- **Files**:
  - `src/lib/utils.tsx`
  - `src/components/theme-provider.tsx`
- **What to change**:
  - `src/lib/utils.ts` and `src/lib/utils.tsx` are 100% identical copies of the `cn()` helper, and having both in `src/lib/` causes module resolution ambiguity.
  - `src/components/theme-provider.tsx` is an unused duplicate of `src/components/theme/theme-provider.tsx` (`src/app/layout.tsx` imports `@/components/theme/theme-provider`).
  - Delete `src/lib/utils.tsx` and `src/components/theme-provider.tsx` (or run `Remove-Item src/lib/utils.tsx, src/components/theme-provider.tsx`).
- **Done when**: Only `src/lib/utils.ts` and `src/components/theme/theme-provider.tsx` exist, and `npx tsc --noEmit` passes with zero import errors.

---

### Task `CLEAN-02` [DONE]: Clean Up Unused Packages & Misplaced `@types/*` in `package.json`
- **Category**: Code Quality / Performance
- **Files**: `package.json`
- **What to change**:
  - In `package.json`:
    1. Remove unused dependencies `"axios"`, `"cheerio"`, and `"react-hot-toast"` (the app uses `sonner` everywhere and native `fetch`).
    2. Move `"@types/canvas-confetti"`, `"@types/react-google-recaptcha"`, and `"@types/three"` from `"dependencies"` to `"devDependencies"`.
- **Done when**: `package.json` no longer lists `axios`, `cheerio`, or `react-hot-toast` in `"dependencies"`, and all `@types/*` packages reside in `"devDependencies"`.

---

### Task `I18N-01` [DONE]: Wire Up Existing English/Bengali Translations in `Footer.tsx` and Fix Outdated Copyright Year
- **Category**: Design Consistency / Code Quality
- **Files**:
  - `src/i18n/translations.ts`
  - `src/components/layout/Footer.tsx`
- **What to change**:
  1. In `src/i18n/translations.ts`:
     - Line 34: Change `rights: "© 2025 Catwaala. All rights reserved.",` to `rights: "© 2026 Catwaala. All rights reserved.",`.
     - Line 67: Change `rights: "© ২০২৫ ক্যাটওয়ালা। সর্বস্বত্ব সংরক্ষিত।",` to `rights: "© ২০২৬ ক্যাটওয়ালা। সর্বস্বত্ব সংরক্ষিত।",`.
  2. In `src/components/layout/Footer.tsx`:
     - Import `useLanguage` from `@/contexts/LanguageContext`: `import { useLanguage } from "@/contexts/LanguageContext";`
     - Inside `Footer()`, call `const { t } = useLanguage();`.
     - Replace the hardcoded tagline on line 30 with `{t.footer.tagline}`, column headings `"Platform"` (line 45) with `{t.footer.quickLinks}`, `"Community"` (line 69) with `{t.footer.support}`, `"Stay in the loop"` (line 95) with `{t.footer.newsletter}`, and `"Made with"` (line 138) with `{t.footer.madeWith}`.
- **Done when**: Clicking the `EN / বাং` language toggle in the header updates the Footer tagline, section headings, and copyright text between English and Bengali.

---

## Follow-up Polish Tasks

### Task `FIX-01` [DONE]: Fix Google Sign-In CSP, Popup/Redirect Handling, and UI Feedback
- **Category**: Bugs & Authentication
- **Files**:
  - `src/middleware.ts`
  - `src/contexts/AuthContext.tsx`
  - `src/utils/friendlyErrors.ts`
  - `src/app/login/page.tsx`
- **What to change**:
  1. In `src/middleware.ts`:
     - Fix `frame-src` typo: change `https://catwaala-animal-welfare.firebaseapp.com` to `https://catwaal-animal-welfare.firebaseapp.com https://*.firebaseapp.com https://accounts.google.com`.
     - In `script-src`: add `https://apis.google.com https://accounts.google.com`.
  2. In `src/contexts/AuthContext.tsx`:
     - Set custom parameter `{ prompt: 'select_account' }` on `GoogleAuthProvider`.
     - Handle `auth/popup-blocked` on mobile web by catching and falling back to `signInWithRedirect(auth, provider)` and checking `getRedirectResult(auth)` on mount.
     - In `createUserProfileDocument`, ensure `avatar_url: user.photoURL || null` is saved.
  3. In `src/utils/friendlyErrors.ts`:
     - Add friendly error mappings for `'auth/popup-blocked'`, `'auth/cancelled-popup-request'`, `'auth/unauthorized-domain'`, and `'auth/operation-not-allowed'`.
  4. In `src/app/login/page.tsx`:
     - Add loading state, disable button, and show welcome toast on successful Google Sign-In.
- **Done when**: `npx tsc --noEmit` passes, CSP allows Firebase Auth iframes/scripts, and Google login triggers with proper loading/feedback.

---

### Task `FIX-02` [DONE]: Fix Mobile Card & Button Misalignments (Homepage, Adopt, Community, VetFinder)
- **Category**: Mobile Responsiveness & UI Consistency
- **Files**:
  - `src/components/home/Hero.tsx`
  - `src/components/home/SuccessStories.tsx`
  - `src/components/shared/PetCard.tsx`
  - `src/components/adopt/AdoptPageContent.tsx`
  - `src/app/community/page.tsx`
  - `src/components/vet/VetFinder.tsx`
  - `src/components/vet/VetCard.tsx`
- **What to change**:
  1. In `src/components/home/Hero.tsx`:
     - Align `"Become a Volunteer"` button height and outline border on mobile to match `"Adopt a Cat"` (`h-14 rounded-2xl border-2 border-stone-200 dark:border-zinc-800 text-rose-600 dark:text-rose-400 no-underline hover:bg-stone-100 dark:hover:bg-zinc-800`).
  2. In `src/components/home/SuccessStories.tsx`:
     - Fix 5-star rating badge overlap on mobile by reducing avatar size (`w-14 h-14 sm:w-20 sm:h-20`), adding `pr-16 sm:pr-20` on the title block, and balancing slide padding (`px-2 md:px-3` on slides).
  3. In `src/components/shared/PetCard.tsx`:
     - Add `flex flex-col h-full` to the card wrapper and `mt-auto` to the `"Meet {cat.name}"` button link, with `shrink-0` on age text.
  4. In `src/components/adopt/AdoptPageContent.tsx`:
     - Make Facebook group buttons responsive (`w-full sm:w-auto px-6 sm:px-10 h-12 sm:h-14 text-sm sm:text-base`) and adjust card padding on mobile (`p-6 sm:p-8 md:p-14`).
  5. In `src/app/community/page.tsx`:
     - Add `w-full sm:w-auto` to the hero button `<Link>` wrappers.
  6. In `src/components/vet/VetFinder.tsx` & `src/components/vet/VetCard.tsx`:
     - In `VetCard.tsx`, add `flex-wrap` to clinic badge headers so 24/7 Emergency and district badges don't squeeze rating stars on `360px` screens. Tighten button padding (`px-2 text-xs sm:text-sm`).
- **Done when**: Responsive layout tests at `360px`, `768px`, and `1280px` show no overlapping elements or uneven button sizes.

---

### Task `FIX-03` [DONE]: Fix Mobile Card & Button Alignment on Login, Report, Profile & Dashboard Pages
- **Category**: Mobile Responsiveness & Form Consistency
- **Files**:
  - `src/app/login/page.tsx`
  - `src/components/report/ReportForm.tsx`
  - `src/app/profile/page.tsx`
  - `src/app/dashboard/page.tsx`
- **What to change**:
  1. In `src/app/login/page.tsx`:
     - Change card padding from `p-8 md:p-10` to `p-5 sm:p-8 md:p-10`.
     - Wrap the ReCAPTCHA widget in a container that scales down slightly on narrow mobile viewports (`scale-[0.88] sm:scale-100 origin-center`).
  2. In `src/components/report/ReportForm.tsx`:
     - Wrap ReCAPTCHA with the same scaling container (`scale-[0.88] sm:scale-100 origin-center`).
  3. In `src/app/profile/page.tsx`:
     - Add `pt-24 pb-20 px-4` to the page container for navbar clearance.
     - Add `w-full sm:w-auto` to the action buttons (`Go to Dashboard`, `Admin Dashboard`, `Find a Cat`).
  4. In `src/app/dashboard/page.tsx`:
     - Add `pt-24` top padding to prevent floating header collision.
     - Adjust report cards in the reports tab to wrap cleanly on mobile.
- **Done when**: On `360px` screens, ReCAPTCHA does not clip horizontally, all action buttons are aligned, and the floating header does not obscure card headers.

---

## Phase 3: Subtle, Modern & Intuitive UI/UX Polish

### Task `UI-01` [DONE]: Restrict `PWAInstallPrompt` & Floating Banners to Appear Only Once on Homepage
- **Category**: Floating Overlay Hygiene & UX
- **Files**:
  - `src/components/layout/PWAInstallPrompt.tsx`
  - `src/components/layout/PetBhaiBanner.tsx`
  - `src/components/shared/EmergencyFAB.tsx`
- **What to change**:
  1. In `src/components/layout/PWAInstallPrompt.tsx`:
     - Import `usePathname` from `next/navigation`.
     - Check `const pathname = usePathname();`. If `pathname !== "/"`, do not render the prompt (`if (pathname !== "/" || !isVisible) return null;`).
     - Ensure the prompt only appears **once** on the homepage: when `isVisible` becomes `true` on `/`, immediately mark `localStorage.setItem("catwaala-pwa-dismissed", "true")` (or mark it on route change / after 12 seconds auto-hide) so navigating away from `/` or reloading never shows the prompt again on any page.
  2. In `src/components/layout/PetBhaiBanner.tsx`:
     - Import `usePathname` from `next/navigation` and only allow the floating pill on `"/"` so inner pages (`/adopt`, `/find-vet`, `/report`, etc.) are completely free of bottom-left promotional popups.
     - Set `localStorage.setItem("petbhai-banner-dismissed", "true")` once shown on `/` or dismissed so it doesn't follow users across sessions/pages.
  3. In `src/components/shared/EmergencyFAB.tsx`:
     - Import `usePathname` from `next/navigation`. Hide the floating button when already on `/report`, `/login`, `/signup`, or `/admin`.
     - Refine button size from oversized `w-16 h-16` to a sleeker, less intrusive `w-13 h-13 md:w-14 md:h-14` (`w-12 h-12 sm:w-14 sm:h-14`) with a subtle border (`border border-white/20`).
- **Done when**: The "Install Catwaala App" notification preview only ever appears once on the homepage (`/`) and never appears on `/adopt`, `/find-vet`, `/report`, or any other route.

---

### Task `UI-02` [DONE]: Declutter Homepage Redundancies & Refine Section Visual Hierarchy
- **Category**: Modern & Subtle Visual Design
- **Files**:
  - `src/app/page.tsx`
  - `src/components/home/Hero.tsx`
  - `src/components/home/PromoPetBhai.tsx`
  - `src/components/home/SuccessStories.tsx`
- **What to change**:
  1. In `src/app/page.tsx`:
     - Remove the duplicate middle `<section>` containing the second `"Also love dogs? Visit Kuttawaala"` banner (lines 19–39), since `Hero.tsx` and `Footer.tsx` already link to Kuttawaala.
     - In the bottom CTA section (lines 78–83), replace the rainbow RGB blur glow (`from-rose-400 via-teal-400 to-amber-400 animate-gradient-xy`) with a clean, subtle architectural card (`bg-white/90 dark:bg-zinc-900/90 border border-stone-200/80 dark:border-zinc-800 shadow-[0_20px_50px_rgba(28,25,23,0.06)]`).
  2. In `src/components/home/Hero.tsx`:
     - Simplify the `"Also love dogs? Visit Kuttawaala"` companion link (lines 66–100) by replacing the spinning 180-degree split emoji circle with a clean, understated pill badge (`inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-stone-100/80 dark:bg-zinc-900/80 border border-stone-200/70 dark:border-zinc-800 text-xs font-medium text-muted-foreground hover:text-foreground`).
  3. In `src/components/home/PromoPetBhai.tsx`:
     - Remove the two bouncing floating decorative boxes (`ShoppingBag` and `Gift` with infinite `y`/`rotate` keyframe loops at the corners) that clutter the card edges.
     - Refine the card into a clean, modern dark editorial partner banner with crisp typography and balanced spacing.
  4. In `src/components/home/SuccessStories.tsx`:
     - Replace `Happy Tails 🏠❤️` with a clean eyebrow badge (`ADOPTION STORIES`) and refined heading (`Happy Tails, Forever Homes`).
- **Done when**: The homepage has no duplicate Kuttawaala banners, no infinitely bouncing corner icons, and no rainbow neon border glows.

---

### Task `UI-03` [DONE]: Make Header Navigation & Spotlight Search More Intuitive
- **Category**: Intuitive Navigation & UX
- **Files**:
  - `src/components/layout/Header.tsx`
- **What to change**:
  1. In `src/components/layout/Header.tsx`:
     - Import `usePathname` from `next/navigation`.
     - Add active-route styling to desktop navigation links (`isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href))`) so the current page shows `text-foreground font-semibold bg-muted/60` instead of every link looking inactive.
     - Replace the loud purple `NEW` pill on the `PetBhai Shop` nav item with a subtle external-link icon (`ArrowUpRight className="w-3.5 h-3.5 opacity-60"`).
     - Upgrade the full-screen Search overlay into a centered, clean Spotlight-style command dialog (`max-w-xl mx-4 mt-24 bg-background border border-border rounded-3xl p-6 shadow-2xl`) with an `ESC` badge and click-outside backdrop dismissal, and remove the confusing fallback that redirects unmatched Enter keystrokes to `/find-vet`.
- **Done when**: Desktop nav clearly highlights the active page, external links use a subtle arrow icon, and Search opens as an intuitive spotlight modal that closes on backdrop click or `ESC`.

---

### Task `UI-04` [DONE]: Harmonize `/adopt` Page Design with the Subtle Editorial Style
- **Category**: Design Consistency
- **Files**:
  - `src/components/adopt/AdoptPageContent.tsx`
- **What to change**:
  1. In `src/components/adopt/AdoptPageContent.tsx`:
     - Replace the harsh full-bleed solid red hero wall (`bg-gradient-to-br from-rose-500 to-rose-600 text-white`) with a subtle, warm editorial header matching the rest of the site (`bg-stone-50/70 dark:bg-zinc-950 border-b border-stone-200/60 dark:border-zinc-800/60`), clean typography, and a refined `"Adopt, Don't Shop — Zero buying or selling"` badge.
     - Replace the raw `text-5xl` emojis (`🐾`, `💬`, `❤️`) in the 3 info cards with clean Lucide icon badges (`Sparkles`, `MessageCircle`, `Heart`) inside soft tinted containers.
     - Soften the bottom CTA card so it uses a cohesive, calm card surface instead of a second loud red-orange gradient block.
- **Done when**: `/adopt` matches the clean, warm, high-trust aesthetic of the homepage in both Light and Dark mode.

---

### Task `UI-05` [DONE]: Snappier Page Transitions & Subtle Micro-Interactions
- **Category**: Performance & Feel
- **Files**:
  - `src/components/layout/PageTransition.tsx`
  - `src/app/globals.css`
- **What to change**:
  1. In `src/components/layout/PageTransition.tsx`:
     - Remove `AnimatePresence mode="wait"` exit delay and large `y: 12` vertical shift; use a crisp, fast `duration: 0.18` subtle fade (`initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}`) so route transitions feel instantaneous and don't delay page rendering by 300ms.
  2. In `src/app/globals.css`:
     - Refine `.glass-card-hover:hover` from `transform: translateY(-4px) scale(1.01)` to a subtler `transform: translateY(-2px)` with softer elevation shadows.
- **Done when**: Navigating between pages feels instant and hover elevations across cards feel calm and understated.
