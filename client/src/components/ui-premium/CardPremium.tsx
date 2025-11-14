import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function CardPremium({ children, className="" }: Props) {
  return (
    <div className={`bg-white rounded-2xl shadow-soft-2025 p-6 border ${className}`}>
      {children}
    </div>
  );
}
