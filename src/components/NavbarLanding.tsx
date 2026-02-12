"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function NavbarLanding() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-navy shadow-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <Image
              src="/logo/white logo.png"
              alt="FjordAnglers"
              width={160}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </a>

          {/* Single CTA */}
          <a
            href="#guide-form"
            className="inline-flex items-center justify-center rounded-lg bg-copper px-5 py-2.5 text-sm font-semibold text-white hover:bg-copper-dark hover:-translate-y-0.5 transition-all"
          >
            Join as a Guide
          </a>
        </div>
      </div>
    </nav>
  );
}
