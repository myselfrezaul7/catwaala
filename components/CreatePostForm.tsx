import * as React from 'react';
import { useState, useRef } from 'react';
import type { Post } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { UserIcon, ImageIcon } from './icons';

interface CreatePostFormProps {
  onAddPost: (post: Post) => void;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onAddPost }) => {
  const { currentUser } = useAuth();
  const [content, setContent] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !currentUser) return;

    const newPost: Post = {
      id: Date.now(),
      author: { id: currentUser.id, name: currentUser.name },
      content,
      imageUrl: image || undefined,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: [],
    };

    onAddPost(newPost);
    setContent('');
    setImage(null);
    if(fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-xl shadow-sm mb-8">
      <form onSubmit={handleSubmit}>
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center flex-shrink-0 text-slate-600 dark:text-slate-300">
            <UserIcon className="w-6 h-6" />
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`What's on your mind, ${currentUser?.name.split(' ')[0]}?`}
            className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
            rows={3}
          ></textarea>
        </div>
        {image && (
            <div className="mt-4 pl-14 relative">
                <img src={image} alt="Preview" className="max-h-60 w-full rounded-lg object-cover border border-slate-200 dark:border-slate-700" />
                <button onClick={() => setImage(null)} className="absolute top-2 right-2 bg-black/70 text-white rounded-full h-6 w-6 flex items-center justify-center font-bold text-sm hover:bg-black">&times;</button>
            </div>
        )}
        <div className="flex justify-between items-center mt-4 pl-14">
            <button type="button" onClick={() => fileInputRef.current?.click()} className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 font-medium transition-colors">
                <ImageIcon className="w-5 h-5" />
                <span className="text-sm">Photo</span>
            </button>
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" />
            <button type="submit" disabled={!content.trim()} className="bg-orange-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-orange-600 transition-colors disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed text-sm">
                Post
            </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;