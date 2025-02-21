// components/StatCard.tsx
import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  // Optional icon component from lucide-react
  icon?: React.ReactNode;
}

export function StatCard({ title, value, description, icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className="mt-1">
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
          </div>
          <p className="mt-1 text-sm text-gray-600">{description}</p>
        </div>
        {icon && (
          <div className="text-gray-400">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}