"use client";

import { ChevronDown, CalendarDays, Fish, Star } from "lucide-react";
import Image from "next/image";

const countries = ["Norway", "Sweden", "Iceland"];
const speciesList = [
  "Salmon",
  "Brown Trout",
  "Sea Trout",
  "Arctic Char",
  "Pike",
  "Perch",
  "Zander",
  "Cod",
  "Halibut",
  "Grayling",
];

export default function Hero() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: "70vh" }}>
      {/* Background image */}
      <Image
        src="/home/hero.jpg"
        alt="Norwegian fjord landscape"
        fill
        className="object-cover"
        priority
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,46,77,0.3), rgba(10,46,77,0.6))",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16">
        {/* Trust signal */}

        {/* Eyebrow */}
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80 mb-4 mt-24">
          Discover the Fjords
        </p>

        {/* Headline */}
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-white leading-none tracking-wide">
          Epic Fjord Fishing
          <br />
          Experiences Await
        </h1>

        {/* Subheadline */}
        <p className="mt-6 text-lg sm:text-xl font-medium text-white max-w-2xl mx-auto leading-relaxed">
          Find expert guides in Norway&apos;s legendary fjords and across Scandinavia
        </p>

        {/* Search container */}
        <div className="mt-10 mx-auto max-w-4xl">
          <div
            className="bg-white rounded-2xl p-5 flex flex-col lg:flex-row gap-3"
            style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}
          >
            {/* Destination */}
            <div className="relative flex-1">
              <select
                className="w-full h-12 appearance-none rounded-lg border border-gray-200 bg-white pl-4 pr-10 text-base text-navy focus:outline-none focus:ring-2 focus:ring-copper/40"
                defaultValue=""
              >
                <option value="" disabled>
                  Destination
                </option>
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>

            {/* Dates */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Select dates"
                readOnly
                className="w-full h-12 rounded-lg border border-gray-200 bg-white pl-4 pr-10 text-base text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-copper/40 cursor-default"
              />
              <CalendarDays className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>

            {/* Species */}
            <div className="relative flex-1">
              <select
                className="w-full h-12 appearance-none rounded-lg border border-gray-200 bg-white pl-4 pr-10 text-base text-navy focus:outline-none focus:ring-2 focus:ring-copper/40"
                defaultValue=""
              >
                <option value="" disabled>
                  Species
                </option>
                {speciesList.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <Fish className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>

            {/* Search button */}
            <button className="h-12 flex items-center justify-center gap-2 rounded-lg bg-copper px-8 text-base font-semibold text-white hover:bg-copper-dark hover:-translate-y-0.5 transition-all shrink-0">
              Find Guides
            </button>
          </div>
        </div>

        {/* Secondary text */}
        <p className="mt-6 text-sm text-white/80">
          100+ verified guides &bull; 50+ species &bull; Norway, Sweden, Iceland
        </p>
      </div>
    </section>
  );
}
