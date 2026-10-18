"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

interface CollectionItem {
  category: "LIVING" | "BEDROOM" | "DINING" | "KITCHEN" | "ACCENT";
  title: string;
  subtext: string;
  image: string;
  heightClass: string;
  offsetClass: string;
}

const COLLECTIONS: CollectionItem[] = [
  {
    category: "LIVING",
    title: "The Solarium Pavilion",
    subtext: "Smoked oak & Belgian linen",
    image: "/portfolio/living.jpg",
    heightClass: "h-[380px] md:h-[440px] xl:h-[480px]",
    offsetClass: "lg:translate-y-0",
  },
  {
    category: "BEDROOM",
    title: "Alpine Master Suite",
    subtext: "Acoustic plaster & travertine",
    image: "/portfolio/bedroom.jpg",
    heightClass: "h-[420px] md:h-[490px] xl:h-[540px]",
    offsetClass: "lg:translate-y-8",
  },
  {
    category: "DINING",
    title: "Villa Solarium Table",
    subtext: "Monolithic Roman travertine",
    image: "/portfolio/dining.jpg",
    heightClass: "h-[360px] md:h-[410px] xl:h-[450px]",
    offsetClass: "lg:-translate-y-3",
  },
  {
    category: "KITCHEN",
    title: "Tivoli Culinary Atelier",
    subtext: "Honed stone & brass detailing",
    image: "/portfolio/kitchen.jpg",
    heightClass: "h-[440px] md:h-[510px] xl:h-[560px]",
    offsetClass: "lg:translate-y-12",
  },
  {
    category: "ACCENT",
    title: "Sculpted Transition Portal",
    subtext: "Curved lime wash & bronze",
    image: "/portfolio/accent.jpg",
    heightClass: "h-[390px] md:h-[450px] xl:h-[490px]",
    offsetClass: "lg:translate-y-4",
  },
];

export default function CollectionsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }
  };

  return (
    <section
      id="collections"
      className="relative w-full py-28 md:py-36 bg-[#F9F7F4] text-zinc-900 border-t border-zinc-200/80 overflow-hidden"
    >
      {/* Subtle dotted decorative pattern inspired by Reference 1 */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: "radial-gradient(#C4BEB5 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Decorative Dotted Matrix Block */}
      <div className="absolute top-12 right-12 w-32 h-32 opacity-25 pointer-events-none hidden lg:grid grid-cols-6 gap-2">
        {Array.from({ length: 36 }).map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
        ))}
      </div>

      <div className="w-full px-6 md:px-12 lg:px-16 2xl:px-24 relative z-10">
        {/* Header Area */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-4 rounded-full border border-zinc-300 bg-white/90 text-xs font-mono uppercase tracking-[0.25em] text-zinc-800 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              ARCHITECTURAL COMPOSITIONS
            </div>

            {/* Large Outlined Uppercase Heading "COLLECTIONS" */}
            <h2
              className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.06em] font-light uppercase select-none leading-none"
              style={{
                WebkitTextStroke: "2px #18181b",
                color: "transparent",
              }}
            >
              COLLECTIONS
            </h2>

            <p className="text-zinc-700 text-base sm:text-lg font-normal mt-5 max-w-xl leading-relaxed">
              Five signature interior archetypes created for private commissions worldwide,
              distinguished by daylight calibration and honest geological materiality.
            </p>
          </div>

          {/* Navigation Controls for Carousel on tablet/desktop */}
          <div className="flex items-center gap-3 self-start lg:self-end">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-600 font-medium mr-2 hidden sm:inline">
              Scroll Category
            </span>
            <button
              onClick={scrollLeft}
              aria-label="Scroll Collections Left"
              className="p-3.5 rounded-full border border-zinc-300 bg-white hover:bg-zinc-900 hover:text-white transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-800"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={scrollRight}
              aria-label="Scroll Collections Right"
              className="p-3.5 rounded-full border border-zinc-300 bg-white hover:bg-zinc-900 hover:text-white transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-800"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Five Staggered Vertical Interior Photographs */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 lg:gap-8 overflow-x-auto pb-10 pt-4 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {COLLECTIONS.map((item, index) => (
            <div
              key={item.category}
              className={`flex-shrink-0 w-[270px] sm:w-[300px] md:w-[320px] xl:w-[calc(20%-1.6rem)] snap-start transition-transform duration-500 ${item.offsetClass}`}
            >
              {/* Image Frame with Asymmetrical Height */}
              <div
                className={`relative w-full ${item.heightClass} rounded-2xl overflow-hidden bg-zinc-200 border border-zinc-300/80 shadow-md group`}
              >
                <Image
                  src={item.image}
                  alt={`${item.category} Collection - ${item.title}`}
                  fill
                  sizes="(max-width: 768px) 300px, (max-width: 1200px) 320px, 20vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-30 group-hover:opacity-50 transition-opacity" />

                {/* Index Pill in Top Right */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-mono tracking-widest text-zinc-100 font-medium">
                  0{index + 1}
                </div>
              </div>

              {/* Small Uppercase Label Beneath Each Image */}
              <div className="mt-4 px-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-xs sm:text-sm uppercase tracking-[0.25em] text-zinc-950 font-bold">
                    {item.category}
                  </h3>
                  <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest font-medium">
                    ATELIER
                  </span>
                </div>
                <p className="font-serif text-xl sm:text-2xl text-zinc-900 font-medium mt-1 leading-snug">
                  {item.title}
                </p>
                <p className="text-sm text-zinc-600 font-normal mt-1">
                  {item.subtext}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
