"use client";

import { useState } from "react";
import {
  Send,
  CheckCircle,
  BadgePercent,
  Megaphone,
  HeartHandshake,
  Sparkles,
  Clock,
  Loader2,
  Lock,
  Users,
} from "lucide-react";
import { submitGuideForm } from "@/app/actions/guide-form";

const perks = [
  {
    icon: BadgePercent,
    title: "0% Commission for 2 Months",
    description:
      "Beta guides pay zero platform fees for the first 2 months after launch.",
  },
  {
    icon: Clock,
    title: "Priority Placement",
    description:
      "Founding guides get boosted visibility in search results during the first year.",
  },
  {
    icon: Megaphone,
    title: "Shape the Product",
    description:
      "Direct input on features, UI, and policies. We build what you actually need.",
  },
  {
    icon: Sparkles,
    title: "Free Profile Setup",
    description:
      "We'll help you create a polished profile with optimised copy and photo layout.",
  },
];

export default function GuideForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await submitGuideForm(formData);

    setLoading(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      setError(result.error || "Something went wrong.");
    }
  }

  return (
    <section id="guide-form" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-copper mb-3">
            Beta Program
          </p>
          <h2 className="font-display text-3xl sm:text-4xl text-navy">
            Join early. Get rewarded.
          </h2>
          <p className="mt-4 text-base text-stone-500 leading-relaxed">
            Be one of the first 50 guides on the platform and unlock exclusive
            perks that won&apos;t be available after launch.
          </p>

          {/* Spots counter */}
        </div>

        {/* 2-col grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Perks */}
          <div className="space-y-5  md:mx-auto lg:mx-0">
            {perks.map((perk) => (
              <div key={perk.title} className="px-4 sm:px-0 flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy">
                  <perk.icon className="h-5 w-5 text-copper" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-navy">
                    {perk.title}
                  </h3>
                  <p className="mt-1 text-sm text-stone-500 leading-relaxed">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Form */}
          {submitted ? (
            <div
              className="rounded-2xl bg-ice p-10 text-center"
              style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}
            >
              <CheckCircle className="mx-auto h-12 w-12 text-copper" />
              <h3 className="mt-4 text-xl font-semibold text-navy">
                You&apos;re in!
              </h3>
              <p className="mt-2 text-base text-stone-500">
                We&apos;ll be in touch soon to inform you about the launch.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl bg-ice p-6 sm:p-8 space-y-5"
              style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}
            >
              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-navy mb-1.5"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Olav Henriksen"
                    className="w-full h-12 rounded-lg border border-gray-200 bg-white pl-4 pr-4 text-base text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-copper/40"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-navy mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="olav@example.com"
                    className="w-full h-12 rounded-lg border border-gray-200 bg-white pl-4 pr-4 text-base text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-copper/40"
                  />
                </div>
              </div>

              {/* Location + Experience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-navy mb-1.5"
                  >
                    Location / Region
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    required
                    placeholder="e.g. Lofoten, Norway"
                    className="w-full h-12 rounded-lg border border-gray-200 bg-white pl-4 pr-4 text-base text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-copper/40"
                  />
                </div>
                <div>
                  <label
                    htmlFor="experience"
                    className="block text-sm font-medium text-navy mb-1.5"
                  >
                    Years of Experience
                  </label>
                  <input
                    id="experience"
                    name="experience"
                    type="number"
                    min="0"
                    max="60"
                    required
                    placeholder="e.g. 12"
                    className="w-full h-12 rounded-lg border border-gray-200 bg-white pl-4 pr-4 text-base text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-copper/40"
                  />
                </div>
              </div>

              {/* Pain points */}
              <div>
                <label
                  htmlFor="painPoints"
                  className="block text-sm font-medium text-navy mb-1.5"
                >
                  What are your biggest pain points as a guide?
                </label>
                <textarea
                  id="painPoints"
                  name="painPoints"
                  rows={3}
                  placeholder="Finding new clients, managing bookings, getting visible online..."
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-base text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-copper/40 resize-none"
                />
              </div>

              {/* Features */}
              <div>
                <label
                  htmlFor="features"
                  className="block text-sm font-medium text-navy mb-1.5"
                >
                  What features would you like to see?
                </label>
                <textarea
                  id="features"
                  name="features"
                  rows={3}
                  placeholder="Calendar sync, instant booking, customer reviews, trip reports..."
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-base text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-copper/40 resize-none"
                />
              </div>

              {/* Error */}
              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-copper px-8 h-12 text-base font-semibold text-white hover:bg-copper-dark hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:pointer-events-none"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                {loading ? "Sending..." : "Join the Beta"}
              </button>

              {/* Privacy note */}
              <p className="flex items-center justify-center gap-1.5 text-xs text-stone-500">
                <Lock className="h-3 w-3" />
                Your information is private and will never be shared.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
