import Image from "next/image";
import { Anchor } from "lucide-react";

export default function HeroSimple() {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: "70vh" }}
    >
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
            "linear-gradient(to bottom, rgba(10,46,77,0.4), rgba(10,46,77,0.75))",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16">
        {/* Icon badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm px-4 py-2 mb-6">
          <Anchor className="h-4 w-4 text-copper" />
          <span className="text-sm font-medium text-white">
            We&apos;re building something special
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-white leading-none tracking-wide">
          Connecting Anglers
          <br />
          With Nordic Guides
        </h1>

        {/* Subheadline */}
        <p className="mt-6 text-lg sm:text-xl font-medium text-white/90 max-w-2xl mx-auto leading-relaxed">
          We&apos;re creating the first dedicated platform for discovering fishing
          guides across Nordic countries. And we need your help.
        </p>

        {/* CTA arrow */}
        <a
          href="#guide-form"
          className="mt-10 inline-flex items-center justify-center gap-2 rounded-lg bg-copper px-8 h-12 text-base font-semibold text-white hover:bg-copper-dark hover:-translate-y-0.5 transition-all"
        >
          Join as a Guide
        </a>
      </div>
    </section>
  );
}
