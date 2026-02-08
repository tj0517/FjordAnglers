"use client";

import { ChevronDown } from "lucide-react";

export type SortOption = "relevance" | "price-asc" | "price-desc" | "rating" | "newest";

const sortLabels: Record<SortOption, string> = {
  relevance: "Relevance",
  "price-asc": "Price (Low-High)",
  "price-desc": "Price (High-Low)",
  rating: "Rating",
  newest: "Newest",
};

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-4 pr-10 text-sm font-medium text-navy focus:outline-none focus:ring-2 focus:ring-copper/40 cursor-pointer"
      >
        {(Object.entries(sortLabels) as [SortOption, string][]).map(
          ([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          )
        )}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
    </div>
  );
}
