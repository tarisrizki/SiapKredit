import React from 'react';

export function GaugeChart({ score, tier }) {
  // SVG coordinates and setup
  const radius = 80;
  const strokeWidth = 16;
  const cx = 100;
  const cy = 100;
  
  // Semi-circle (Math.PI * r)
  const circumference = Math.PI * radius;
  // Offset for the score (0 to 100 mapped to circumference)
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center relative w-[200px] h-[120px]">
      <svg width="200" height="120" viewBox="0 0 200 120" className="absolute top-0">
        {/* Background Arc */}
        <path
          d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
          fill="none"
          stroke="#E5E7EB" // gray-200
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Foreground Arc */}
        <path
          d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
          fill="none"
          stroke={tier.stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s ease-out, stroke 0.5s ease-out' }}
        />
      </svg>
      
      {/* Center Text */}
      <div className="absolute top-[45px] flex flex-col items-center">
        <span className="text-4xl font-bold text-gray-900 leading-none">{score}</span>
        <span className="text-sm text-gray-500 font-medium">/ 100</span>
      </div>
    </div>
  );
}
