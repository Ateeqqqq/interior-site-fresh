"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  tag: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: "residential",
    title: "Residential Interiors",
    description: "Thoughtfully designed living spaces tailored to your everyday life.",
    image: "/portfolio/living.jpg",
    tag: "PRIVATE HOMES",
  },
  {
    id: "renovation",
    title: "Renovation",
    description: "Refresh existing spaces with considered layouts, finishes, and detailing.",
    image: "/portfolio/accent.jpg",
    tag: "SPATIAL RENEWAL",
  },
  {
    id: "commercial",
    title: "Commercial Interiors",
    description: "Functional, well-designed environments for offices and commercial spaces.",
    image: "/portfolio/commercial.jpg",
    tag: "STUDIOS & OFFICES",
  },
  {
    id: "furniture-styling",
    title: "Furniture & Styling",
    description: "Complete your interiors with carefully selected furniture and finishing touches.",
    image: "/portfolio/lounge.jpg",
    tag: "CURATED ARTISAN",
  },
];

export default function ServicesSection() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -380, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 380, behavior: "smooth" });
    }
  };

  const handleConsultClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("inquiry");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="services"
      className="relative w-full py-28 md:py-36 bg-[#F6F4EF] text-zinc-900 border-t border-zinc-200/80 overflow-hidden"
    >
      <div className="w-full px-6 md:px-12 lg:px-16 2xl:px-24">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-4 rounded-full border border-zinc-300 bg-white text-xs font-mono uppercase tracking-[0.25em] text-zinc-800 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              FULL-SPECTRUM PRACTICE
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-zinc-950 max-w-3xl leading-[1.15]">
              Your One-Stop Destination for Interior Design
            </h2>
            <p className="text-zinc-700 text-base sm:text-lg font-normal mt-5 max-w-2xl leading-relaxed">
              Explore interior design, renovation, and styling solutions tailored to your space,
              lifestyle, and budget.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 self-start lg:self-end">
            <button
              onClick={scrollLeft}
              aria-label="Scroll services left"
              className="p-3.5 rounded-full border border-zinc-300 bg-white hover:bg-zinc-900 hover:text-white transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-800"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={scrollRight}
              aria-label="Scroll services right"
              className="p-3.5 rounded-full border border-zinc-300 bg-white hover:bg-zinc-900 hover:text-white transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-800"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Large Horizontal Service Cards */}
        <div
          ref={carouselRef}
          className="flex gap-6 lg:gap-8 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              className="flex-shrink-0 w-[300px] sm:w-[340px] md:w-[380px] xl:w-[calc(25%-1.5rem)] snap-start group"
            >
              <div className="bg-white rounded-2xl border border-zinc-200/90 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
                {/* Large Photograph at Top */}
                <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-zinc-100">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 340px, (max-width: 1200px) 380px, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-mono tracking-widest text-zinc-100 uppercase font-medium">
                    {service.tag}
                  </div>
                </div>

                {/* Card Content Beneath Image */}
                <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-zinc-600 font-medium block mb-2">
                      0{index + 1} · DISCIPLINE
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-zinc-950 font-normal mb-3 group-hover:text-amber-800 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-zinc-700 text-base font-normal leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Navigation Arrow linking to consultation */}
                  <div className="pt-6 mt-6 border-t border-zinc-100 flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-mono tracking-wider text-zinc-700 uppercase font-semibold">
                      Inquire Practice
                    </span>
                    <a
                      href="#inquiry"
                      onClick={handleConsultClick}
                      aria-label={`Inquire about ${service.title}`}
                      className="w-10 h-10 rounded-full bg-zinc-100 group-hover:bg-zinc-900 group-hover:text-white flex items-center justify-center transition-all shadow-sm"
                    >
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
