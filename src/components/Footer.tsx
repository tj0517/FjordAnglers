import { Instagram, Facebook, Linkedin } from "lucide-react";
import Image from "next/image";

const explore = [
  { label: "Norway", href: "#" },
  { label: "Sweden", href: "#" },
  { label: "Iceland", href: "#" },
];

const company = [
  { label: "About", href: "#" },
  { label: "Guides", href: "#guides" },
  { label: "Contact", href: "#" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Terms", href: "#" },
  { label: "Privacy", href: "#" },
];

const socials = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-navy py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <a href="#" className="inline-block">
              <Image
                src="/logo/white logo.png"
                alt="FjordAnglers"
                width={160}
                height={40}
                className="h-8 w-auto"
              />
            </a>
            <p className="mt-4 text-sm text-white/70 max-w-xs leading-relaxed">
              Epic Fjord Fishing Experiences
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider">
              Explore
            </h4>
            <ul className="mt-4 space-y-3">
              {explore.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/70 hover:text-copper transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider">
              Company
            </h4>
            <ul className="mt-4 space-y-3">
              {company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/70 hover:text-copper transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider">
              Connect
            </h4>
            <div className="mt-4 flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:text-copper hover:bg-white/20 transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 text-center">
          <p className="text-sm text-white/40">
            &copy; 2026 FjordAnglers &bull; Made in Norway
          </p>
        </div>
      </div>
    </footer>
  );
}
