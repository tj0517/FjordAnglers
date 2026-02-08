"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-navy shadow-md"
        : "bg-transparent"
        }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <Image
              src={"/logo/white logo.png"}
              alt="FjordAnglers"
              width={160}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </a>

          {/* Desktop nav */}
          <div className={`hidden md:flex items-center gap-8 ${scrolled
            ? "text-ice hover:text-copper"
            : "text-white hover:text-white/80"
            }`}>
            <a
              href="#destinations"
              className="text-sm font-medium transition-colors"
            >
              Destinations
            </a>
            <a
              href="#guides"
              className="text-sm font-medium transition-colors"
            >
              Guides
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium transition-colors"
            >
              How It Works
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-lg bg-copper px-5 py-2.5 text-sm font-semibold text-white hover:bg-copper-dark hover:-translate-y-0.5 transition-all"
            >
              Find Guides
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className={`md:hidden ${scrolled ? "text-navy" : "text-white"}`}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="flex flex-col gap-1 px-4 py-4">
            <a
              href="#destinations"
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2.5 text-sm font-medium text-navy hover:bg-ice transition-colors"
            >
              Destinations
            </a>
            <a
              href="#guides"
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2.5 text-sm font-medium text-navy hover:bg-ice transition-colors"
            >
              Guides
            </a>
            <a
              href="#how-it-works"
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2.5 text-sm font-medium text-navy hover:bg-ice transition-colors"
            >
              How It Works
            </a>
            <a
              href="#"
              className="mt-2 inline-flex items-center justify-center rounded-lg bg-copper px-5 py-2.5 text-sm font-semibold text-white hover:bg-copper-dark transition-colors"
            >
              Find Guides
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
