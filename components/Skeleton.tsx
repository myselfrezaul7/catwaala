import * as React from 'react';

interface SkeletonProps {
    className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => (
    <div
        className={`animate-pulse bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 bg-[length:200%_100%] rounded-lg ${className}`}
    />
);

export const AnimalCardSkeleton: React.FC = () => (
    <div className="bg-white/30 dark:bg-black/30 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-3xl shadow-lg overflow-hidden flex flex-col h-full">
        <Skeleton className="h-36 sm:h-64 rounded-none" />
        <div className="p-3 sm:p-6 flex flex-col flex-grow space-y-3">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <Skeleton className="h-12 w-full" />
        </div>
        <div className="p-3 sm:p-4 bg-white/10 dark:bg-black/10 border-t border-white/20 dark:border-white/5 mt-auto">
            <Skeleton className="h-10 w-full rounded-xl" />
        </div>
    </div>
);

export default Skeleton;
