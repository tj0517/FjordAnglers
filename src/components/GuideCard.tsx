import { Star, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface Guide {
  id?: string;
  name: string;
  location: string;
  species: string[];
  price: number;
  rating: number;
  trips?: number;
  tier?: "listing" | "bookable";
  image: string;
}

export default function GuideCard({ guide }: { guide: Guide }) {
  const content = (
    <div className="group rounded-2xl bg-white overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.2)]">
      {/* Image */}
      <div className="relative h-[280px] overflow-hidden">
        <Image
          src={guide.image}
          alt={guide.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Tier badge */}
        {guide.tier && (
          <span
            className={`absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
              guide.tier === "bookable"
                ? "bg-copper text-white"
                : "bg-white/90 text-navy"
            }`}
          >
            {guide.tier}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Rating */}
        <div className="flex items-center gap-1 text-sm text-stone-500">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          <span className="font-medium">
            {guide.rating}
            {guide.trips != null && ` (${guide.trips} trips)`}
          </span>
        </div>

        {/* Name */}
        <h3 className="mt-2 font-display text-2xl text-navy">{guide.name}</h3>

        {/* Location */}
        <p className="mt-1 flex items-center gap-1.5 text-sm text-stone-500">
          <MapPin className="h-3.5 w-3.5" />
          {guide.location}
        </p>

        {/* Species tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {guide.species.slice(0, 3).map((s) => (
            <span
              key={s}
              className="rounded-full px-3 py-1 text-[13px] font-medium"
              style={{ backgroundColor: "#FFD4B8", color: "#C44D1C" }}
            >
              {s}
            </span>
          ))}
        </div>

        {/* Price */}
        <p className="mt-4 text-lg font-semibold text-navy">
          From &euro;{guide.price}/day
        </p>

        {/* Button */}
        <span className="mt-4 w-full h-11 rounded-lg border-2 border-copper text-copper font-semibold text-sm hover:bg-copper hover:text-white transition-colors flex items-center justify-center">
          View Profile
        </span>
      </div>
    </div>
  );

  if (guide.id) {
    return <Link href={`/guides/${guide.id}`}>{content}</Link>;
  }

  return content;
}
