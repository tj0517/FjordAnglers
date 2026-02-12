import { Mail } from "lucide-react";
import Image from "next/image";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const socials = [
  { icon: InstagramIcon, label: "Instagram", href: "#" },
  { icon: FacebookIcon, label: "Facebook", href: "#" },
  { icon: Mail, label: "Mail", href: "mailto:hello@fjordanglers.com" },
];

export default function FooterLanding() {
  return (
    <footer className="bg-navy py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center gap-6">
          {/* Logo */}
          <a href="/" className="inline-block">
            <Image
              src="/logo/white logo.png"
              alt="FjordAnglers"
              width={160}
              height={40}
              className="h-8 w-auto"
            />
          </a>

          {/* Tagline */}
          <p className="text-sm text-white/70 max-w-md leading-relaxed">
            The first platform dedicated to connecting anglers with fishing
            guides across Scandinavia.
          </p>

          {/* Contact */}
          <a
            href="mailto:hello@fjordanglers.com"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-copper transition-colors"
          >
            <Mail className="h-4 w-4" />
            hello@fjordanglers.com
          </a>

          {/* Socials */}
          <div className="flex gap-3">
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

          {/* Divider + Copyright */}
          <div className="w-full pt-6 border-t border-white/10">
            <p className="text-sm text-white/40">
              &copy; 2026 FjordAnglers &bull; Made in Norway
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
