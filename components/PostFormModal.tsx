
import React, { useState, useCallback, useEffect } from 'react';
import { Post, Category, Urgency } from '../types';
import { CATEGORY_OPTIONS, URGENCY_OPTIONS } from '../constants';
import { getPostSuggestion } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';

interface PostFormModalProps {
  onClose: () => void;
  onSubmit: (post: Omit<Post, 'id' | 'timestamp' | 'author' | 'avatarUrl'>) => void;
}

export const PostFormModal: React.FC<PostFormModalProps> = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Category>(Category.RESOURCE_SHARE);
  const [urgency, setUrgency] = useState<Urgency>(Urgency.LOW);
  const [location, setLocation] = useState('');
  const [type, setType] = useState<'problem' | 'solution'>('problem');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [error, setError] = useState('');

  const handleAISuggestion = useCallback(async () => {
    if (!description) {
      setError('Please enter a description first.');
      return;
    }
    setError('');
    setIsSuggesting(true);
    try {
      const suggestion = await getPostSuggestion(description);
      setCategory(suggestion.category);
      setUrgency(suggestion.urgency);
    } catch (e: any) {
      setError(e.message || 'Failed to get AI suggestions.');
    } finally {
      setIsSuggesting(false);
    }
  }, [description]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !location) {
      setError('Please fill out all required fields.');
      return;
    }
    setIsSubmitting(true);
    onSubmit({ title, description, category, urgency, location, type });
    // In a real app, you'd handle loading states until submission is confirmed.
    // For this hackathon version, we assume instant success.
    setIsSubmitting(false);
  };
  
  // Close modal on escape key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Create a New Post</h2>
            <p className="text-muted mt-1">Share a problem or resource with your community.</p>
          </div>
          <div className="p-6 space-y-5">
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">{error}</div>}

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" placeholder="e.g., Lost Keys" required />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" placeholder="Provide more details here..." required></textarea>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <SparklesIcon className="h-5 w-5 text-blue-500"/>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-blue-700">
                        Use our AI to automatically suggest a category and urgency for your post.
                        </p>
                        <div className="mt-2">
                             <button type="button" onClick={handleAISuggestion} disabled={isSuggesting} className="bg-white text-blue-700 font-semibold py-2 px-4 border border-blue-300 rounded-md hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
                                {isSuggesting ? (
                                <>
                                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  <span>Analyzing...</span>
                                </>
                                ) : (
                                  'Auto-categorize with AI'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select id="category" value={category} onChange={e => setCategory(e.target.value as Category)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary">
                  {CATEGORY_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-1">Urgency</label>
                <select id="urgency" value={urgency} onChange={e => setUrgency(e.target.value as Urgency)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary">
                  {URGENCY_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input type="text" id="location" value={location} onChange={e => setLocation(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" placeholder="e.g., Campus Library" required />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Post Type</label>
                <div className="flex space-x-4">
                    <label className="flex items-center">
                        <input type="radio" name="type" value="problem" checked={type === 'problem'} onChange={() => setType('problem')} className="focus:ring-primary h-4 w-4 text-primary border-gray-300"/>
                        <span className="ml-2 text-sm text-gray-700">I need help (Problem)</span>
                    </label>
                    <label className="flex items-center">
                        <input type="radio" name="type" value="solution" checked={type === 'solution'} onChange={() => setType('solution')} className="focus:ring-primary h-4 w-4 text-primary border-gray-300"/>
                        <span className="ml-2 text-sm text-gray-700">I can help (Solution)</span>
                    </label>
                </div>
            </div>
          </div>
          <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3 rounded-b-xl">
            <button type="button" onClick={onClose} className="bg-white hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded-lg transition-colors duration-200">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50">
              {isSubmitting ? 'Posting...' : 'Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
