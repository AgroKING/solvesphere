
import React from 'react';
import { UserStats, User } from '../types';

interface ProfileStatsProps {
  stats: UserStats;
  user: User;
}

const chartData = (stats: UserStats) => [
  { name: 'Solved', value: stats.problemsSolved, color: '#10b981' },
  { name: 'Offered', value: stats.solutionsOffered, color: '#3b82f6' },
];

export const ProfileStats: React.FC<ProfileStatsProps> = ({ stats, user }) => {
  const data = chartData(stats);
  const maxValue = Math.max(...data.map(d => d.value), 1); // Get max value for scaling, ensure it's at least 1 to avoid division by zero

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
      <div className="flex items-center space-x-4">
        <img src={`https://picsum.photos/seed/${user.username}/64/64`} alt="User Avatar" className="w-16 h-16 rounded-full border-4 border-primary" />
        <div>
          <h3 className="text-xl font-bold text-gray-800">{user.username}'s Stats</h3>
          <p className="text-muted">Keep up the great work!</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-2xl font-bold text-secondary">{stats.problemsSolved}</p>
          <p className="text-sm font-medium text-muted">Problems Solved</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-2xl font-bold text-primary">{stats.solutionsOffered}</p>
          <p className="text-sm font-medium text-muted">Solutions Offered</p>
        </div>
      </div>
       <div className="bg-gray-50 p-4 rounded-lg text-center">
          <p className="text-2xl font-bold text-yellow-500">{stats.points} ✨</p>
          <p className="text-sm font-medium text-muted">Community Points</p>
        </div>

      <div>
        <h4 className="font-semibold text-gray-700 mb-2">Contribution Breakdown</h4>
        <div className="h-40 w-full bg-gray-50 rounded-lg p-4 flex items-end justify-center gap-8 text-center">
          {data.map(entry => {
            const barHeight = `${(entry.value / maxValue) * 100}%`;
            return (
              <div key={entry.name} className="flex flex-col items-center w-16" title={`${entry.name}: ${entry.value}`}>
                <div className="text-sm font-bold text-gray-700">{entry.value}</div>
                <div 
                    className="w-full mt-1 rounded-t-md" 
                    style={{ height: barHeight, backgroundColor: entry.color, minHeight: '2px' }}
                >
                </div>
                <div className="mt-2 text-xs text-muted">{entry.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};