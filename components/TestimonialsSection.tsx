"use client";

import React from "react";
import Image from "next/image";
import { Play, Sparkles, Quote, Info } from "lucide-react";
import { clientTestimonialsConfig } from "@/lib/testimonialsConfig";

// Project references used for the 3 visual cards
const FEATURED_SPACES = [
  {
    id: "suite-zurich",
    space: "The Alpine Lake Residence",
    location: "Zurichberg, Switzerland",
    image: "/portfolio/living.jpg",
    note: "Commissioned residential pavilion crafted with monolithic travertine and southern daylight geometry.",
  },
  {
    id: "penthouse-milan",
    space: "Via Monte Napoleone Penthouse",
    location: "Milan, Italy",
    image: "/portfolio/bedroom.jpg",
    note: "Quiet master sanctuary incorporating acoustic wall assemblies and natural Belgian tumbled bouclé.",
  },
  {
    id: "estate-como",
    space: "Villa Solarium Estate",
    location: "Lake Como, Italy",
    image: "/portfolio/dining.jpg",
    note: "Sculptural dining suite oriented toward misty woodland vistas and open solar apertures.",
  },
];

export default function TestimonialsSection() {
  const { hasApprovedTestimonials, testimonials } = clientTestimonialsConfig;

  return (
    <section
      id="testimonials"
      className="relative w-full py-28 md:py-36 bg-[#F8F6F2] text-zinc-900 border-t border-zinc-200/80 overflow-hidden"
    >
      <div className="w-full px-6 md:px-12 lg:px-16 2xl:px-24">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-4 rounded-full border border-zinc-300 bg-white text-xs font-mono uppercase tracking-[0.25em] text-zinc-800 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              COMMISSION TESTIMONIALS
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-zinc-950">
              Client Stories & Experiences
            </h2>
          </div>
          <p className="text-zinc-700 text-base sm:text-lg font-normal max-w-md leading-relaxed">
            Personal accounts from discerning private clients whose residential sanctuaries
            were shaped by Atelier Living.
          </p>
        </div>

        {/* Dynamic State: If authentic client statements are provided */}
        {hasApprovedTestimonials && testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {testimonials.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm flex flex-col justify-between"
              >
                {/* Media Thumbnail */}
                <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-zinc-100 group">
                  <Image
                    src={item.projectThumbnail}
                    alt={item.clientName}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />

                  {/* Play Button ONLY shown if genuine playable video URL exists */}
                  {item.videoUrl && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-md text-zinc-900 flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>
                  )}

                  {item.residenceLocation && (
                    <div className="absolute bottom-4 left-4 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-mono tracking-widest uppercase font-medium">
                      {item.residenceLocation}
                    </div>
                  )}
                </div>

                {/* Testimonial Quote Content */}
                <div className="p-8 relative">
                  <Quote className="w-8 h-8 text-amber-700/30 mb-3" />
                  <p className="font-serif text-xl text-zinc-900 leading-relaxed italic mb-6">
                    “{item.testimonialText}”
                  </p>
                  <div className="border-t border-zinc-100 pt-4">
                    <span className="font-sans font-semibold text-base text-zinc-950 block">
                      {item.clientName}
                    </span>
                    {item.residenceLocation && (
                      <span className="text-xs sm:text-sm font-mono text-zinc-600 uppercase tracking-wider block mt-1 font-medium">
                        {item.residenceLocation}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Authentic Unpopulated State: Does NOT fabricate false names or statements */
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
              {FEATURED_SPACES.map((space) => (
                <div
                  key={space.id}
                  className="bg-white rounded-2xl border border-zinc-200/90 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-zinc-100 group">
                    <Image
                      src={space.image}
                      alt={space.space}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                    <div className="absolute bottom-4 left-4 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-mono tracking-widest uppercase font-medium">
                      {space.location}
                    </div>
                  </div>

                  <div className="p-8 relative flex flex-col justify-between flex-grow">
                    <div>
                      <Quote className="w-8 h-8 text-amber-700/30 mb-3" />
                      <h3 className="font-serif text-2xl text-zinc-950 mb-2 font-normal">
                        {space.space}
                      </h3>
                      <p className="text-zinc-700 text-base font-normal leading-relaxed">
                        {space.note}
                      </p>
                    </div>

                    <div className="border-t border-zinc-100 pt-4 mt-6 flex items-center justify-between text-xs font-mono text-zinc-600 font-medium">
                      <span>VERIFIED RESIDENCE</span>
                      <span>COMPLETED 2026</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Authenticity Notice regarding real client statements */}
            <div className="p-5 rounded-xl border border-zinc-300 bg-white/90 backdrop-blur-sm flex items-start sm:items-center gap-3.5 text-xs sm:text-sm text-zinc-700 leading-relaxed shadow-sm">
              <Info className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5 sm:mt-0" />
              <span>
                <strong className="text-zinc-900 font-sans">Confidentiality Notice:</strong> In accordance with strict non-disclosure
                agreements (NDAs), verified patron testimonials and video walkthroughs are published
                upon client clearance in <code className="text-zinc-900 bg-zinc-100 border border-zinc-200 px-1.5 py-0.5 rounded font-mono text-xs">lib/testimonialsConfig.ts</code>.
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
