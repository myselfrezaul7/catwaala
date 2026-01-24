import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CreatePostForm from '../components/CreatePostForm';
import PostCard from '../components/PostCard';
import { useAuth } from '../contexts/AuthContext';
import { useCookieConsent } from '../contexts/CookieConsentContext';
import { MOCK_POSTS } from '../constants';
import type { Post } from '../types';

const POSTS_STORAGE_KEY = 'catwaala_posts';

const CommunityPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { hasConsent } = useCookieConsent();

  const [posts, setPosts] = useState<Post[]>(() => {
    if (hasConsent('functional')) {
      try {
        const storedPosts = window.localStorage.getItem(POSTS_STORAGE_KEY);
        if (storedPosts) {
          return JSON.parse(storedPosts);
        }
      } catch (error) {
        console.error("Error reading posts from localStorage", error);
      }
    }
    return MOCK_POSTS;
  });

  useEffect(() => {
    if (hasConsent('functional')) {
      try {
        window.localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
      } catch (error) {
        console.error("Error writing posts to localStorage", error);
      }
    }
  }, [posts, hasConsent]);

  const handleAddPost = (newPost: Post) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-3xl">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50">Community Hub</h1>
        <p className="text-lg text-slate-800 dark:text-slate-200 mt-2">
          Share stories, ask questions, and connect with fellow animal lovers.
        </p>
      </div>

      {isAuthenticated ? (
        <CreatePostForm onAddPost={handleAddPost} />
      ) : (
        <div className="bg-orange-500/20 backdrop-blur-lg border border-orange-500/30 text-orange-900 dark:text-orange-100 p-6 rounded-2xl mb-8 text-center">
          <p className="font-bold text-lg">Want to join the conversation?</p>
          <p className="mt-2">
            <Link to="/login" className="font-bold text-orange-600 dark:text-orange-400 hover:underline">Log in</Link> or <Link to="/signup" className="font-bold text-orange-600 dark:text-orange-400 hover:underline">sign up</Link> to create your own posts.
          </p>
        </div>
      )}

      <div className="space-y-8">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;