
import React from 'react';
import { PlusIcon } from './icons/PlusIcon';
import { User } from '../types';

interface HeaderProps {
  user: User;
  onNewPostClick: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onNewPostClick, onLogout }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
            <div className="bg-primary p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9m-9 9a9 9 0 00-9-9" /></svg>
            </div>
            <h1 className="text-2xl font-bold text-primary">SolveSphere</h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600 hidden sm:block">Welcome, <span className="font-bold">{user.username}</span>!</span>
          <button
            onClick={onNewPostClick}
            className="bg-primary hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center space-x-2 transition-colors duration-200"
          >
            <PlusIcon />
            <span className="hidden md:inline">New Post</span>
          </button>
           <button
            onClick={onLogout}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
};
