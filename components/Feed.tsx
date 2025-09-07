
import React from 'react';
import { Post } from '../types';
import { PostCard } from './PostCard';

interface FeedProps {
  posts: Post[];
}

export const Feed: React.FC<FeedProps> = ({ posts }) => {
  return (
    <div className="space-y-4">
      {posts.length > 0 ? (
        posts.map(post => <PostCard key={post.id} post={post} />)
      ) : (
        <div className="text-center py-12 bg-card rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-700">The feed is empty!</h3>
            <p className="text-muted mt-2">Be the first to post a problem or an offer.</p>
        </div>
      )}
    </div>
  );
};
