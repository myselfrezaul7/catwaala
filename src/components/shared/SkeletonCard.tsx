import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
    return (
        <div className="rounded-[2.5rem] bg-white/40 dark:bg-stone-900/40 border border-stone-200/50 dark:border-stone-800/50 p-4 space-y-4 shadow-sm w-full h-[420px] flex flex-col">
            <Skeleton className="w-full h-48 rounded-[2rem] bg-stone-200/50 dark:bg-stone-800/50" />
            
            <div className="flex justify-between items-start pt-2">
                <div className="space-y-3 flex-1">
                    <Skeleton className="h-6 w-3/4 bg-stone-200/50 dark:bg-stone-800/50" />
                    <Skeleton className="h-4 w-1/2 bg-stone-200/50 dark:bg-stone-800/50" />
                </div>
                <Skeleton className="w-10 h-10 rounded-full bg-stone-200/50 dark:bg-stone-800/50 shrink-0 ml-4" />
            </div>
            
            <div className="flex gap-2 pt-2">
                <Skeleton className="h-8 w-20 rounded-xl bg-stone-200/50 dark:bg-stone-800/50" />
                <Skeleton className="h-8 w-16 rounded-xl bg-stone-200/50 dark:bg-stone-800/50" />
            </div>
            
            <div className="mt-auto pt-4 flex gap-3">
                <Skeleton className="h-12 flex-1 rounded-xl bg-stone-200/50 dark:bg-stone-800/50" />
            </div>
        </div>
    );
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-10 w-full">
            {Array.from({ length: count }).map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
    );
}
