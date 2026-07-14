"use client";

import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({
  children,
  className = "",
  hover = false,
}: CardProps) {
  return (
    <div
      className={`bg-white rounded-lg border border-slate-200 ${
        hover ? "hover:shadow-md transition" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
