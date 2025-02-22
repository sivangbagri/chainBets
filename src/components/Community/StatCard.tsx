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
    <div className="bg-[#0B0F13] border border-[#1C2127] rounded-xl p-6 hover:border-[#2A2D2F] hover:shadow-[0_0_20px_rgba(0,0,0,0.2)] transition-all duration-200">
    <div className="flex items-start justify-between">
      <div>
        <h3 className="text-sm font-medium text-[#A1A1A6]">{title}</h3>
        <div className="mt-2">
          <p className="text-2xl font-bold text-[#C5FF32]">{value} </p> 
        </div>
        <p className="mt-2 text-sm text-[#808080]">{description}</p>
      </div>
      {icon && (
        <div className="text-[#2A2D2F]">
          {icon}
        </div>
      )}
    </div>
  </div>
  
  );
}