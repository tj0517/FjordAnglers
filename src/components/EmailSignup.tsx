"use client";

import { Lock } from "lucide-react";

export default function EmailSignup() {
  return (
    <section
      className="py-24"
      style={{
        background: "linear-gradient(135deg, #E67E50 0%, #D96D3F 100%)",
      }}
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Heading */}
        <h2 className="font-display text-4xl sm:text-5xl text-white leading-tight">
          Ready for Your Fjord
          <br />
          Fishing Adventure?
        </h2>

        {/* Subtext */}
        <p className="mt-6 text-lg text-white/90 max-w-xl mx-auto">
          Join 500+ anglers who&apos;ve discovered their dream catch in
          Norway&apos;s legendary fjords
        </p>

        {/* Email form */}
        <div className="mt-10 mx-auto max-w-[600px]">
          <div className="bg-white rounded-xl p-1.5 flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 border-none bg-transparent px-5 py-3 text-base text-navy placeholder:text-gray-400 focus:outline-none"
            />
            <button className="rounded-lg bg-navy px-8 py-3 text-base font-semibold text-white hover:bg-navy-dark transition-colors shrink-0">
              Join Waitlist
            </button>
          </div>
        </div>

        {/* Privacy note */}
        <p className="mt-4 flex items-center justify-center gap-1.5 text-sm text-white/70">
          <Lock className="h-3.5 w-3.5" />
          We respect your privacy. Unsubscribe anytime. No spam.
        </p>
      </div>
    </section>
  );
}
