import * as React from 'react';
import type { Post } from '../types';
import { UserIcon, ThumbsUpIcon, ChatBubbleIcon } from './icons';
import { useLanguage } from '../contexts/LanguageContext';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { t } = useLanguage();

  const timeSince = (date: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    if (seconds < 5) return t('time.justNow');
    
    let interval = seconds / 31536000;
    if (interval > 1) {
      const count = Math.floor(interval);
      return t(count === 1 ? 'time.yearAgo' : 'time.yearsAgo', { count });
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      const count = Math.floor(interval);
      return t(count === 1 ? 'time.monthAgo' : 'time.monthsAgo', { count });
    }
    interval = seconds / 86400;
    if (interval > 1) {
      const count = Math.floor(interval);
      return t(count === 1 ? 'time.dayAgo' : 'time.daysAgo', { count });
    }
    interval = seconds / 3600;
    if (interval > 1) {
      const count = Math.floor(interval);
      return t(count === 1 ? 'time.hourAgo' : 'time.hoursAgo', { count });
    }
    interval = seconds / 60;
    if (interval > 1) {
      const count = Math.floor(interval);
      return t(count === 1 ? 'time.minuteAgo' : 'time.minutesAgo', { count });
    }
    return t('time.secondsAgo', { count: Math.floor(seconds) });
  }

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden">
      <div className="p-5">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center flex-shrink-0 text-slate-600 dark:text-slate-300">
            <UserIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="font-bold text-slate-900 dark:text-white text-base">{post.author.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{timeSince(post.timestamp)}</p>
          </div>
        </div>
        <p className="text-slate-800 dark:text-slate-200 text-base mb-4 whitespace-pre-wrap leading-relaxed">{post.content}</p>
      </div>

      {post.imageUrl && (
        <div className="bg-slate-100 dark:bg-slate-900">
          <img src={post.imageUrl} alt="Post content" className="w-full max-h-[500px] object-cover" loading="lazy" />
        </div>
      )}

      <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-700 flex justify-around">
        <button className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 font-medium transition-colors rounded-lg px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-sm">
          <ThumbsUpIcon className="w-5 h-5" />
          <span>{t('postCard.like')} ({post.likes})</span>
        </button>
        <button className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 font-medium transition-colors rounded-lg px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-sm">
          <ChatBubbleIcon className="w-5 h-5" />
          <span>{t('postCard.comment')} ({post.comments.length})</span>
        </button>
      </div>
    </div>
  );
};

export default React.memo(PostCard);