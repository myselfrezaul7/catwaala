import React from 'react';

const PostCardSkeleton: React.FC = () => {
  return (
    <div className="bg-slate-100/30 dark:bg-slate-800/30 backdrop-blur-lg border border-white/20 dark:border-slate-700/50 rounded-2xl shadow-xl overflow-hidden animate-pulse">
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-slate-300 dark:bg-slate-700 flex-shrink-0"></div>
          <div>
            <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-32 mb-2"></div>
            <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded w-24"></div>
          </div>
        </div>
        <div className="space-y-3">
            <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded"></div>
            <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-5/6"></div>
        </div>
      </div>

      <div className="h-64 bg-slate-300/50 dark:bg-slate-700/50"></div>

      <div className="px-6 py-4 border-t border-white/20 dark:border-slate-700/50 flex justify-around">
        <div className="h-6 bg-slate-300 dark:bg-slate-700 rounded w-24"></div>
        <div className="h-6 bg-slate-300 dark:bg-slate-700 rounded w-24"></div>
      </div>
    </div>
  );
};

export default PostCardSkeleton;