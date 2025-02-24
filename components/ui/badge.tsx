// components/ui/badge.tsx
import React from 'react';
import { AlertTriangle } from 'lucide-react'; // Import the icon from lucide-react

// Define types for the component's props
export interface BadgeProps {
  variant: 'destructive' | 'default' | 'info' | 'success'; // You can add more variants as needed
  className?: string;
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ variant, className, children }) => {
  // Determine the appropriate classes based on the variant
  let badgeClasses = 'flex items-center gap-1 px-3 py-1 rounded-lg text-sm';
  if (variant === 'destructive') {
    badgeClasses += ' bg-red-600 text-white'; // Red background for destructive
  } else if (variant === 'default') {
    badgeClasses += ' bg-gray-200 text-black'; // Default grey background
  } else if (variant === 'info') {
    badgeClasses += ' bg-blue-500 text-white'; // Blue background for info
  } else if (variant === 'success') {
    badgeClasses += ' bg-green-600 text-white'; // Green background for success
  }

  return (
    <div className={`${badgeClasses} ${className}`}>
      <AlertTriangle className="h-3 w-3" /> {/* This is the icon */}
      {children}
    </div>
  );
};

export { Badge }; // Export the component
