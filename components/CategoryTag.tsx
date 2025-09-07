
import React from 'react';
import { Category } from '../types';

interface CategoryTagProps {
  category: Category;
}

const categoryColors: Record<Category, string> = {
  [Category.LOST_FOUND]: 'bg-yellow-100 text-yellow-800',
  [Category.ACADEMIC_HELP]: 'bg-blue-100 text-blue-800',
  [Category.EVENTS]: 'bg-purple-100 text-purple-800',
  [Category.DONATIONS]: 'bg-green-100 text-green-800',
  [Category.SOS]: 'bg-red-100 text-red-800',
  [Category.RESOURCE_SHARE]: 'bg-indigo-100 text-indigo-800',
  [Category.VOLUNTEERING]: 'bg-pink-100 text-pink-800',
};

export const CategoryTag: React.FC<CategoryTagProps> = ({ category }) => {
  return (
    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${categoryColors[category]}`}>
      {category}
    </span>
  );
};
