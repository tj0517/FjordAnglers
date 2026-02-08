"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";
import {
  COUNTRIES,
  SPECIES,
  TECHNIQUES,
  WATER_TYPES,
  LANGUAGES,
  SKILL_LEVELS,
} from "@/lib/mock-guides";

export interface Filters {
  countries: string[];
  species: string[];
  techniques: string[];
  waterTypes: string[];
  priceRange: [number, number];
  languages: string[];
  skillLevel: string;
  region: string;
}

export const defaultFilters: Filters = {
  countries: [],
  species: [],
  techniques: [],
  waterTypes: [],
  priceRange: [0, 500],
  languages: [],
  skillLevel: "",
  region: "",
};

interface FiltersSidebarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  onClose?: () => void;
  isMobile?: boolean;
}

function CheckboxGroup({
  label,
  options,
  selected,
  onChange,
  searchable = false,
}: {
  label: string;
  options: readonly string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  searchable?: boolean;
}) {
  const [search, setSearch] = useState("");

  const filtered = searchable
    ? options.filter((o) => o.toLowerCase().includes(search.toLowerCase()))
    : options;

  const toggle = (value: string) => {
    onChange(
      selected.includes(value)
        ? selected.filter((s) => s !== value)
        : [...selected, value]
    );
  };

  return (
    <div>
      <h3 className="font-semibold text-navy mb-3 text-sm">{label}</h3>
      {searchable && (
        <div className="relative mb-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${label.toLowerCase()}...`}
            className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-8 pr-3 text-sm text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-copper/40"
          />
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
        </div>
      )}
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {filtered.map((option) => (
          <label
            key={option}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => toggle(option)}
              className="h-4 w-4 rounded border-gray-300 text-copper focus:ring-copper/40"
            />
            <span className="text-sm text-stone-500 group-hover:text-navy transition-colors">
              {option}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default function FiltersSidebar({
  filters,
  onChange,
  onClose,
  isMobile = false,
}: FiltersSidebarProps) {
  const update = (partial: Partial<Filters>) => {
    onChange({ ...filters, ...partial });
  };

  const activeCount =
    filters.countries.length +
    filters.species.length +
    filters.techniques.length +
    filters.waterTypes.length +
    filters.languages.length +
    (filters.skillLevel ? 1 : 0) +
    (filters.region ? 1 : 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 500 ? 1 : 0);

  return (
    <div className={isMobile ? "flex flex-col h-full" : ""}>
      {/* Mobile header */}
      {isMobile && (
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="font-display text-2xl text-navy">Filters</h2>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-ice transition-colors"
            aria-label="Close filters"
          >
            <X className="h-5 w-5 text-navy" />
          </button>
        </div>
      )}

      <div
        className={`space-y-6 ${
          isMobile ? "flex-1 overflow-y-auto p-4" : ""
        }`}
      >
        {/* Country */}
        <CheckboxGroup
          label="Country"
          options={COUNTRIES}
          selected={filters.countries}
          onChange={(countries) => update({ countries })}
        />

        {/* Species */}
        <CheckboxGroup
          label="Species"
          options={SPECIES}
          selected={filters.species}
          onChange={(species) => update({ species })}
          searchable
        />

        {/* Technique */}
        <CheckboxGroup
          label="Technique"
          options={TECHNIQUES}
          selected={filters.techniques}
          onChange={(techniques) => update({ techniques })}
        />

        {/* Water Type */}
        <CheckboxGroup
          label="Water Type"
          options={WATER_TYPES}
          selected={filters.waterTypes}
          onChange={(waterTypes) => update({ waterTypes })}
        />

        {/* Price Range */}
        <div>
          <h3 className="font-semibold text-navy mb-3 text-sm">Price Range</h3>
          <div className="space-y-3">
            <input
              type="range"
              min={0}
              max={500}
              step={10}
              value={filters.priceRange[1]}
              onChange={(e) =>
                update({
                  priceRange: [filters.priceRange[0], Number(e.target.value)],
                })
              }
              className="w-full accent-copper"
            />
            <div className="flex items-center justify-between text-sm text-stone-500">
              <span>&euro;{filters.priceRange[0]}</span>
              <span>&euro;{filters.priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Language */}
        <CheckboxGroup
          label="Language"
          options={LANGUAGES}
          selected={filters.languages}
          onChange={(languages) => update({ languages })}
        />

        {/* Skill Level */}
        <div>
          <h3 className="font-semibold text-navy mb-3 text-sm">Skill Level</h3>
          <div className="space-y-2">
            {SKILL_LEVELS.map((level) => (
              <label
                key={level}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="skillLevel"
                  checked={filters.skillLevel === level}
                  onChange={() => update({ skillLevel: level })}
                  className="h-4 w-4 border-gray-300 text-copper focus:ring-copper/40"
                />
                <span className="text-sm text-stone-500 group-hover:text-navy transition-colors">
                  {level}
                </span>
              </label>
            ))}
            {filters.skillLevel && (
              <button
                onClick={() => update({ skillLevel: "" })}
                className="text-xs text-copper hover:underline"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Region */}
        <div>
          <h3 className="font-semibold text-navy mb-3 text-sm">Region</h3>
          <input
            type="text"
            value={filters.region}
            onChange={(e) => update({ region: e.target.value })}
            placeholder="Search region..."
            className="w-full rounded-lg border border-gray-200 bg-white py-2 px-3 text-sm text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-copper/40"
          />
        </div>
      </div>

      {/* Mobile footer */}
      {isMobile && (
        <div className="p-4 border-t border-gray-100">
          <div className="flex gap-3">
            <button
              onClick={() => onChange(defaultFilters)}
              className="flex-1 rounded-lg border-2 border-gray-200 py-3 text-sm font-semibold text-navy hover:bg-ice transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={onClose}
              className="flex-1 rounded-lg bg-copper py-3 text-sm font-semibold text-white hover:bg-copper-dark transition-colors"
            >
              Apply Filters{activeCount > 0 && ` (${activeCount})`}
            </button>
          </div>
        </div>
      )}

      {/* Desktop clear */}
      {!isMobile && activeCount > 0 && (
        <button
          onClick={() => onChange(defaultFilters)}
          className="mt-6 text-sm text-copper hover:underline font-medium"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}
