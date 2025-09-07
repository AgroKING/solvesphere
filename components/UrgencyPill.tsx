
import React from 'react';
import { Urgency } from '../types';

interface UrgencyPillProps {
  urgency: Urgency;
}

const urgencyStyles: Record<Urgency, { pill: string; dot: string }> = {
  [Urgency.LOW]: { pill: 'bg-green-100 text-green-800', dot: 'bg-green-500' },
  [Urgency.MEDIUM]: { pill: 'bg-yellow-100 text-yellow-800', dot: 'bg-yellow-500' },
  [Urgency.HIGH]: { pill: 'bg-red-100 text-red-800', dot: 'bg-red-500' },
};

export const UrgencyPill: React.FC<UrgencyPillProps> = ({ urgency }) => {
  const styles = urgencyStyles[urgency];
  return (
    <div className={`flex items-center space-x-2 px-3 py-1 text-sm font-semibold rounded-full ${styles.pill}`}>
      <span className={`h-2 w-2 rounded-full ${styles.dot}`}></span>
      <span>{urgency}</span>
    </div>
  );
};
