"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { MapPin, Users, Fish, Anchor, ChevronDown } from "lucide-react";

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(
    () => import("react-leaflet").then((mod) => mod.MapContainer),
    { ssr: false }
);
const TileLayer = dynamic(
    () => import("react-leaflet").then((mod) => mod.TileLayer),
    { ssr: false }
);
const CircleMarker = dynamic(
    () => import("react-leaflet").then((mod) => mod.CircleMarker),
    { ssr: false }
);

const locations = [
    {
        id: "lofoten",
        name: "Lofoten Islands",
        country: "Norway",
        guides: 48,
        types: ["Deep Sea", "Cod Fishing"],
        lat: 68.15,
        lng: 14.0,
        popular: true,
    },
    {
        id: "tromso",
        name: "Tromsø",
        country: "Norway",
        guides: 35,
        types: ["Arctic Fishing", "Halibut"],
        lat: 69.65,
        lng: 18.96,
        popular: false,
    },
    {
        id: "geiranger",
        name: "Geirangerfjord",
        country: "Norway",
        guides: 32,
        types: ["Fjord Fishing", "Salmon"],
        lat: 62.1,
        lng: 7.2,
        popular: true,
    },
    {
        id: "bergen",
        name: "Bergen",
        country: "Norway",
        guides: 56,
        types: ["Coastal", "Mackerel"],
        lat: 60.39,
        lng: 5.32,
        popular: true,
    },
    {
        id: "lapland",
        name: "Swedish Lapland",
        country: "Sweden",
        guides: 27,
        types: ["Fly Fishing", "Arctic Char"],
        lat: 67.85,
        lng: 20.22,
        popular: false,
    },
    {
        id: "gothenburg",
        name: "Gothenburg",
        country: "Sweden",
        guides: 41,
        types: ["Sea Trout", "Lobster"],
        lat: 57.71,
        lng: 11.97,
        popular: false,
    },
];

export default function MapSection() {
    const [activeLocation, setActiveLocation] = useState(locations[0]);
    const [isClient, setIsClient] = useState(false);
    const [showAllLocations, setShowAllLocations] = useState(false);

    useEffect(() => {
        setIsClient(true);
        import("leaflet/dist/leaflet.css");
    }, []);

    const popularLocations = locations.filter((loc) => loc.popular);
    const displayedLocations = showAllLocations ? locations : popularLocations;

    return (
        <section id="explore-map" className="relative z-0 py-16 md:py-28 bg-navy-dark overflow-hidden">
            {/* Hide Leaflet attribution and style zoom controls */}
            <style jsx global>{`
                .leaflet-control-attribution {
                    display: none !important;
                }
                .leaflet-container {
                    z-index: 0 !important;
                }
                .leaflet-pane {
                    z-index: 0 !important;
                }
                .leaflet-top, .leaflet-bottom {
                    z-index: 10 !important;
                }
                .leaflet-control-zoom {
                    border: none !important;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.3) !important;
                    border-radius: 12px !important;
                    overflow: hidden !important;
                }
                .leaflet-control-zoom a {
                    background: #0A2E4D !important;
                    color: #F8FAFB !important;
                    border: none !important;
                    width: 36px !important;
                    height: 36px !important;
                    line-height: 36px !important;
                    font-size: 18px !important;
                }
                .leaflet-control-zoom a:first-child {
                    border-radius: 12px 12px 0 0 !important;
                }
                .leaflet-control-zoom a:last-child {
                    border-radius: 0 0 12px 12px !important;
                }
                .leaflet-control-zoom a:hover {
                    background: #0F3D66 !important;
                }
            `}</style>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="text-center mb-12">
                    <h2 className="font-display text-4xl md:text-5xl text-ice leading-tight">
                        EXPLORE LOCATIONS
                    </h2>
                    <p className="text-ice/60 mt-3 max-w-lg mx-auto">
                        Discover where our expert guides operate across Scandinavia's most pristine fishing waters.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-8 items-stretch">
                    {/* Map Container */}
                    <div className="lg:col-span-3 relative bg-navy rounded-xl md:rounded-2xl overflow-hidden h-[300px] sm:h-[350px] md:h-[450px] lg:h-[500px]">
                        {isClient ? (
                            <MapContainer
                                center={[65.0, 14.0]}
                                zoom={4}
                                style={{ height: "100%", width: "100%" }}
                                scrollWheelZoom={false}
                                attributionControl={false}
                            >
                                <TileLayer
                                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                                />
                                {locations.map((loc) => (
                                    <CircleMarker
                                        key={loc.id}
                                        center={[loc.lat, loc.lng]}
                                        radius={activeLocation.id === loc.id ? 12 : 8}
                                        pathOptions={{
                                            fillColor: activeLocation.id === loc.id ? "#E67E50" : "#F09A73",
                                            fillOpacity: 1,
                                            color: activeLocation.id === loc.id ? "#E67E50" : "rgba(230,126,80,0.4)",
                                            weight: activeLocation.id === loc.id ? 3 : 2,
                                        }}
                                        eventHandlers={{
                                            click: () => setActiveLocation(loc),
                                        }}
                                    />
                                ))}
                            </MapContainer>
                        ) : (
                            <div className="flex items-center justify-center h-full text-ice/50">
                                Loading map...
                            </div>
                        )}

                        {/* Legend */}
                        <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 z-10 flex items-center gap-2 text-ice/50 text-xs bg-navy/80 backdrop-blur-sm px-2 py-1.5 md:px-3 md:py-2 rounded-lg">
                            <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-copper"></span>
                            <span>Click to explore</span>
                        </div>
                    </div>

                    {/* Details Panel */}
                    <div className="lg:col-span-2 bg-navy rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 h-auto lg:h-[500px] flex flex-col">
                        <div className="flex items-center gap-2 text-copper text-sm font-medium mb-2">
                            <MapPin size={16} />
                            <span>{activeLocation.country}</span>
                        </div>

                        <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-ice mb-3 md:mb-4">
                            {activeLocation.name}
                        </h3>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center gap-2 text-ice/70">
                                <Users size={18} />
                                <span className="text-lg font-semibold text-ice">{activeLocation.guides}</span>
                                <span className="text-sm">guides</span>
                            </div>
                        </div>

                        {/* Fishing Types */}
                        <div className="mb-6">
                            <p className="text-ice/50 text-sm mb-3">Popular fishing types:</p>
                            <div className="flex flex-wrap gap-2">
                                {activeLocation.types.map((type) => (
                                    <span
                                        key={type}
                                        className="inline-flex items-center gap-1.5 bg-copper/15 text-copper text-sm px-3 py-1.5 rounded-full"
                                    >
                                        <Fish size={14} />
                                        {type}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* CTA */}
                        <button className="w-full bg-copper hover:bg-copper-dark text-white font-semibold py-2.5 md:py-3 px-4 md:px-6 rounded-lg md:rounded-xl transition-colors flex items-center justify-center gap-2 text-sm md:text-base">
                            <Anchor size={16} className="md:w-[18px] md:h-[18px]" />
                            Explore {activeLocation.name} Guides
                        </button>

                        {/* Location List */}
                        <div className="mt-auto pt-6 border-t border-ice/10">
                            <p className="text-ice/50 text-xs uppercase tracking-wider mb-3">
                                {showAllLocations ? "All Locations" : "Popular Destinations"}
                            </p>
                            <div className="grid grid-cols-2 gap-2 mb-3">
                                {displayedLocations.map((loc) => (
                                    <button
                                        key={loc.id}
                                        onClick={() => setActiveLocation(loc)}
                                        className={`text-left text-sm px-3 py-2 rounded-lg transition-colors ${activeLocation.id === loc.id
                                            ? "bg-copper/20 text-copper"
                                            : "text-ice/60 hover:text-ice hover:bg-ice/5"
                                            }`}
                                    >
                                        {loc.name}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => setShowAllLocations(!showAllLocations)}
                                className="w-full text-ice/50 hover:text-ice text-sm flex items-center justify-center gap-1 py-2 transition-colors"
                            >
                                {showAllLocations ? "Show Less" : "Show All Locations"}
                                <ChevronDown size={16} className={`transition-transform ${showAllLocations ? "rotate-180" : ""}`} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
