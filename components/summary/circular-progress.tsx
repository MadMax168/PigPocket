"use client";

import React from "react";

interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}

export function CircularProgress({
  value,
  size = 175,
  strokeWidth = 10,
  color = "#3b82f6",
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = 1;

  return (
    <div
      className={`relative inline-block`}
      style={{ width: size, height: size }}
    >
        <svg
            className="transform -rotate-90"
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
        >
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#e5e7eb"
                strokeWidth={strokeWidth}
                fill="transparent"
            />
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={color}
                strokeWidth={strokeWidth}
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={progressOffset}
                strokeLinecap="round"
            />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-semibold text-gray-800">
                {Math.round(value)}
            </span>
         </div>
    </div>
  );
}
