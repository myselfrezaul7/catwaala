"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MOCK_POSTS, Post } from "@/data/posts";
import { useAuth } from "@/contexts/AuthContext";
import { Heart, MessageCircle, Share2, Send } from "lucide-react";

export default function CommunityPage() {
    const { currentUser } = useAuth();
    const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
    const [newPostContent, setNewPostContent] = useState("");

    const handlePostSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPostContent.trim() || !currentUser) return;

        const newPost: Post = {
            id: Date.now(),
            author: { id: 999, name: currentUser.displayName || "Anonymous" },
            content: newPostContent,
            timestamp: new Date().toISOString(),
            likes: 0,
            comments: []
        };

        setPosts([newPost, ...posts]);
        setNewPostContent("");
    };

    return (
        <div className="min-h-screen bg-rose-50/20 dark:bg-zinc-950 py-12">
            <div className="container mx-auto px-4 max-w-2xl">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2 font-heading">Community Hub</h1>
                    <p className="text-slate-600 dark:text-slate-400">Share stories, ask advice, and connect with cat lovers.</p>
                </div>

                {/* Create Post */}
                {currentUser ? (
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-rose-100 dark:border-zinc-800 mb-8">
                        <form onSubmit={handlePostSubmit}>
                            <textarea
                                className="w-full p-4 bg-slate-50 dark:bg-black/20 rounded-xl border-none resize-none focus:ring-2 focus:ring-rose-500 outline-none min-h-[100px]"
                                placeholder={`What's on your mind, ${currentUser.displayName}?`}
                                value={newPostContent}
                                onChange={(e) => setNewPostContent(e.target.value)}
                            />
                            <div className="flex justify-end mt-4">
                                <Button type="submit" disabled={!newPostContent.trim()} className="rounded-full bg-rose-600 hover:bg-rose-700">
                                    Post <Send className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="bg-rose-100 dark:bg-rose-900/20 p-6 rounded-2xl mb-8 text-center text-rose-800 dark:text-rose-200">
                        <p className="font-medium">
                            <Link href="/login" className="underline font-bold">Log in</Link> to join the conversation!
                        </p>
                    </div>
                )}

                {/* Feed */}
                <div className="space-y-6">
                    {posts.map(post => (
                        <div key={post.id} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-rose-50 dark:border-zinc-800">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                                    {post.author.name[0]}
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-slate-100">{post.author.name}</h3>
                                    <p className="text-xs text-slate-500">{new Date(post.timestamp).toLocaleDateString()}</p>
                                </div>
                            </div>

                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap mb-4">
                                {post.content}
                            </p>

                            {post.imageUrl && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={post.imageUrl} alt="Post content" className="w-full h-64 object-cover rounded-xl mb-4" />
                            )}

                            <div className="flex items-center gap-6 pt-4 border-t border-slate-100 dark:border-zinc-800 text-slate-500">
                                <button className="flex items-center gap-2 hover:text-rose-500 transition-colors">
                                    <Heart className="w-5 h-5" /> <span className="text-sm font-medium">{post.likes}</span>
                                </button>
                                <button className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                                    <MessageCircle className="w-5 h-5" /> <span className="text-sm font-medium">{post.comments.length}</span>
                                </button>
                                <button className="flex items-center gap-2 hover:text-indigo-500 transition-colors ml-auto">
                                    <Share2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
