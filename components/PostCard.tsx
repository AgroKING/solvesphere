
import React from 'react';
import { Post } from '../types';
import { CategoryTag } from './CategoryTag';
import { UrgencyPill } from './UrgencyPill';

interface PostCardProps {
  post: Post;
}

const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);

    if (seconds < 60) return `${seconds}s ago`;
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const isProblem = post.type === 'problem';

  return (
    <div className="bg-card border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className={`p-5`}>
        <div className="flex items-start space-x-4">
          <img src={post.avatarUrl} alt={post.author} className="w-12 h-12 rounded-full border-2 border-white shadow" />
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-lg text-gray-800">{post.title}</p>
                <p className="text-sm text-muted">
                  Posted by <span className="font-semibold text-gray-600">{post.author}</span> &middot; {timeAgo(post.timestamp)}
                </p>
              </div>
              <UrgencyPill urgency={post.urgency} />
            </div>

            <p className="mt-3 text-gray-700 leading-relaxed">{post.description}</p>
            
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <CategoryTag category={post.category} />
                    <div className="flex items-center text-sm text-muted">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        <span>{post.location}</span>
                    </div>
                </div>
                <button className={`${isProblem ? 'bg-secondary hover:bg-emerald-600' : 'bg-primary hover:bg-blue-600'} text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200`}>
                    {isProblem ? 'I Can Help' : 'I\'m Interested'}
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
