
import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './Header';
import { Feed } from './Feed';
import { PostFormModal } from './PostFormModal';
import { ProfileStats } from './ProfileStats';
import { Post, UserStats, User } from '../types';
import { MOCK_POSTS, MOCK_USER_STATS } from '../constants';

const POSTS_STORAGE_KEY = 'solvesphere-posts';

interface MainAppProps {
  user: User;
  onLogout: () => void;
}

const getInitialPosts = (): Post[] => {
  try {
    const storedPosts = localStorage.getItem(POSTS_STORAGE_KEY);
    if (storedPosts) {
      return JSON.parse(storedPosts);
    }
  } catch (e) {
    console.error("Failed to parse posts from localStorage", e);
  }
  // If nothing in storage, seed with mock data
  localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(MOCK_POSTS));
  return MOCK_POSTS;
};


export const MainApp: React.FC<MainAppProps> = ({ user, onLogout }) => {
  const [posts, setPosts] = useState<Post[]>(getInitialPosts());
  const [userStats] = useState<UserStats>(MOCK_USER_STATS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    try {
        localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
    } catch(e) {
        console.error("Failed to save posts to localStorage", e);
    }
  }, [posts]);

  const handleAddPost = useCallback((newPost: Omit<Post, 'id' | 'timestamp' | 'author' | 'avatarUrl'>) => {
    const postToAdd: Post = {
      ...newPost,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      author: user.username,
      avatarUrl: `https://picsum.photos/seed/${user.username}/40/40`
    };
    setPosts(prevPosts => [postToAdd, ...prevPosts]);
    setIsModalOpen(false);
  }, [user.username]);

  return (
    <div className="min-h-screen bg-gray-50 text-text">
      <Header user={user} onLogout={onLogout} onNewPostClick={() => setIsModalOpen(true)} />
      <main className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Community Feed</h2>
            <Feed posts={posts} />
          </div>
          <div className="lg:col-span-1">
             <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Impact</h2>
            <ProfileStats user={user} stats={userStats} />
          </div>
        </div>
      </main>
      {isModalOpen && (
        <PostFormModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddPost}
        />
      )}
    </div>
  );
};
