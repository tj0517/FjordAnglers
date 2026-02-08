export interface MockGuide {
  id: string;
  name: string;
  location: string;
  country: string;
  species: string[];
  techniques: string[];
  waterTypes: string[];
  price: number;
  rating: number;
  trips: number;
  tier: "listing" | "bookable";
  languages: string[];
  skillLevel: "Beginner" | "Intermediate" | "Expert";
  image: string;
}

export const mockGuides: MockGuide[] = [
  {
    id: "1",
    name: "Erik Lindstrom",
    location: "Lofoten, Norway",
    country: "Norway",
    species: ["Salmon", "Halibut"],
    techniques: ["Fly Fishing"],
    waterTypes: ["Fjord", "Ocean"],
    price: 320,
    rating: 4.9,
    trips: 42,
    tier: "bookable",
    languages: ["English", "Norwegian"],
    skillLevel: "Expert",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
  },
  {
    id: "2",
    name: "Magnus Bjornsson",
    location: "Reykjavik, Iceland",
    country: "Iceland",
    species: ["Arctic Char", "Brown Trout"],
    techniques: ["Fly Fishing", "Spinning"],
    waterTypes: ["River", "Lake"],
    price: 280,
    rating: 4.8,
    trips: 28,
    tier: "listing",
    languages: ["English"],
    skillLevel: "Intermediate",
    image:
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400&h=300&fit=crop",
  },
  {
    id: "3",
    name: "Olaf Henriksen",
    location: "Gothenburg, Sweden",
    country: "Sweden",
    species: ["Pike", "Perch"],
    techniques: ["Spinning", "Baitcasting"],
    waterTypes: ["Lake"],
    price: 200,
    rating: 4.7,
    trips: 35,
    tier: "bookable",
    languages: ["English", "Swedish"],
    skillLevel: "Beginner",
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
  },
  {
    id: "4",
    name: "Lars Haugen",
    location: "Tromso, Norway",
    country: "Norway",
    species: ["Cod", "Salmon"],
    techniques: ["Trolling"],
    waterTypes: ["Ocean", "Fjord"],
    price: 350,
    rating: 5.0,
    trips: 56,
    tier: "bookable",
    languages: ["English", "Norwegian", "German"],
    skillLevel: "Expert",
    image:
      "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=400&h=300&fit=crop",
  },
  {
    id: "5",
    name: "Sven Karlsson",
    location: "Vanern, Sweden",
    country: "Sweden",
    species: ["Pike", "Zander", "Perch"],
    techniques: ["Spinning", "Trolling"],
    waterTypes: ["Lake"],
    price: 180,
    rating: 4.6,
    trips: 22,
    tier: "listing",
    languages: ["English", "Swedish", "German"],
    skillLevel: "Beginner",
    image:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop",
  },
  {
    id: "6",
    name: "Bjorn Nygard",
    location: "Bergen, Norway",
    country: "Norway",
    species: ["Salmon", "Sea Trout"],
    techniques: ["Fly Fishing"],
    waterTypes: ["River", "Fjord"],
    price: 290,
    rating: 4.9,
    trips: 38,
    tier: "bookable",
    languages: ["English", "Norwegian"],
    skillLevel: "Intermediate",
    image:
      "https://images.unsplash.com/photo-1520769945061-0a448c463865?w=400&h=300&fit=crop",
  },
  {
    id: "7",
    name: "Gunnar Sigurdsson",
    location: "Akureyri, Iceland",
    country: "Iceland",
    species: ["Arctic Char", "Brown Trout", "Salmon"],
    techniques: ["Fly Fishing", "Spinning"],
    waterTypes: ["River", "Stream"],
    price: 310,
    rating: 5.0,
    trips: 19,
    tier: "bookable",
    languages: ["English"],
    skillLevel: "Expert",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
  },
  {
    id: "8",
    name: "Anders Thomsen",
    location: "Stavanger, Norway",
    country: "Norway",
    species: ["Cod", "Halibut"],
    techniques: ["Trolling", "Baitcasting"],
    waterTypes: ["Ocean", "Fjord"],
    price: 260,
    rating: 4.5,
    trips: 31,
    tier: "listing",
    languages: ["English", "Norwegian", "German"],
    skillLevel: "Beginner",
    image:
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400&h=300&fit=crop",
  },
  {
    id: "9",
    name: "Hjalmar Eriksson",
    location: "Storuman, Sweden",
    country: "Sweden",
    species: ["Grayling", "Brown Trout", "Arctic Char"],
    techniques: ["Fly Fishing"],
    waterTypes: ["River", "Stream"],
    price: 170,
    rating: 4.8,
    trips: 15,
    tier: "listing",
    languages: ["English", "Swedish"],
    skillLevel: "Intermediate",
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
  },
  {
    id: "10",
    name: "Ragnar Olsen",
    location: "Geirangerfjord, Norway",
    country: "Norway",
    species: ["Salmon", "Brown Trout", "Cod"],
    techniques: ["Fly Fishing", "Spinning"],
    waterTypes: ["Fjord", "River"],
    price: 340,
    rating: 4.9,
    trips: 44,
    tier: "bookable",
    languages: ["English", "Norwegian"],
    skillLevel: "Expert",
    image:
      "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=400&h=300&fit=crop",
  },
  {
    id: "11",
    name: "Kristjan Petursson",
    location: "Westfjords, Iceland",
    country: "Iceland",
    species: ["Arctic Char"],
    techniques: ["Fly Fishing", "Ice Fishing"],
    waterTypes: ["Lake", "River"],
    price: 250,
    rating: 4.7,
    trips: 12,
    tier: "listing",
    languages: ["English"],
    skillLevel: "Intermediate",
    image:
      "https://images.unsplash.com/photo-1520769945061-0a448c463865?w=400&h=300&fit=crop",
  },
  {
    id: "12",
    name: "Nils Fredriksen",
    location: "Flam, Norway",
    country: "Norway",
    species: ["Salmon", "Sea Trout", "Brown Trout"],
    techniques: ["Fly Fishing", "Spinning"],
    waterTypes: ["River", "Fjord"],
    price: 300,
    rating: 5.0,
    trips: 50,
    tier: "bookable",
    languages: ["English", "Norwegian", "German"],
    skillLevel: "Expert",
    image:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop",
  },
];

export const COUNTRIES = ["Norway", "Sweden", "Iceland"] as const;

export const SPECIES = [
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
] as const;

export const TECHNIQUES = [
  "Fly Fishing",
  "Spinning",
  "Trolling",
  "Baitcasting",
  "Ice Fishing",
] as const;

export const WATER_TYPES = [
  "River",
  "Lake",
  "Fjord",
  "Ocean",
  "Stream",
] as const;

export const LANGUAGES = [
  "English",
  "Norwegian",
  "Swedish",
  "German",
] as const;

export const SKILL_LEVELS = [
  "Beginner",
  "Intermediate",
  "Expert",
] as const;
