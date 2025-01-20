"use client";

import React from "react";

interface CircularProgressProps {
  value: number; // ค่าปัจจุบัน (0-100)
  size?: number; // ขนาดของวงกลม
  strokeWidth?: number; // ความหนาของเส้น
  color?: string; // สีของวงนอก
}

export function CircularProgress({
  value,
  size = 175,
  strokeWidth = 10,
  color = "#3b82f6", // ค่าเริ่มต้นสีฟ้า
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
            {/* เส้นพื้นหลัง */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#e5e7eb" // สีพื้นหลัง (Tailwind Gray-200)
                strokeWidth={strokeWidth}
                fill="transparent"
            />
            {/* เส้นแสดง Progress */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={color} // สีของ Progress (กำหนดได้)
                strokeWidth={strokeWidth}
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={progressOffset}
                strokeLinecap="round" // ทำให้ปลายโค้งมน
            />
        </svg>
      {/* ตัวเลขและข้อความ */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-semibold text-gray-800">
                {Math.round(value)}
            </span>
         </div>
    </div>
  );
}
