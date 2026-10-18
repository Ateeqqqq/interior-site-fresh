"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";

// Exact supplied image URLs with verified local assets
const BEFORE_IMAGE = "/renovation/before.png";
const AFTER_IMAGE = "/renovation/after.png";

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage: 0 to 100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const width = rect.width;
    const clampedPercentage = Math.max(0, Math.min(100, (x / width) * 100));
    setSliderPosition(clampedPercentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    handleMove(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignored if already released
    }
  };

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setSliderPosition((prev) => Math.min(100, prev + 5));
    } else if (e.key === "Home") {
      e.preventDefault();
      setSliderPosition(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setSliderPosition(100);
    }
  };

  const handleScrollToInquiry = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("inquiry");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="transformation"
      className="relative w-full py-28 md:py-36 bg-[#0a0a0a] text-zinc-100 border-t border-zinc-800/80 overflow-hidden"
    >
      <div className="w-full px-6 md:px-12 lg:px-16 2xl:px-24">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 md:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-5 rounded-full border border-amber-200/40 bg-amber-500/10 text-xs font-mono uppercase tracking-[0.25em] text-amber-200 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            THE TRANSFORMATION
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white mb-5 leading-[1.15]">
            From Unfinished to Unforgettable
          </h2>
          <p className="text-zinc-300 text-base sm:text-lg md:text-xl font-normal max-w-2xl leading-relaxed">
            See how thoughtful design transforms an unfinished space into a warm, beautifully considered living room.
          </p>
        </div>

        {/* Interactive Before & After Comparison Stage */}
        <div className="max-w-6xl mx-auto">
          {/* Visual Slider Frame */}
          <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="slider"
            aria-valuenow={Math.round(sliderPosition)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Interactive before and after living room renovation comparison slider. Use left and right arrow keys to adjust."
            className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] rounded-3xl overflow-hidden border border-zinc-700/80 shadow-[0_20px_60px_rgba(0,0,0,0.9)] select-none cursor-ew-resize touch-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/80 group"
          >
            {/* Screen Reader Range Input for Accessibility */}
            <input
              type="range"
              min="0"
              max="100"
              value={Math.round(sliderPosition)}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="sr-only"
              aria-label="Renovation comparison slider percentage"
            />

            {/* BASE LAYER: Unfinished Living Room Before Renovation */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={BEFORE_IMAGE}
                alt="Unfinished Living Room Before Renovation"
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1152px"
                className="object-cover object-center pointer-events-none"
              />
            </div>

            {/* OVERLAY LAYER: Luxurious Warm Modern Living Room After Renovation */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
              style={{
                clipPath: `inset(0 0 0 ${sliderPosition}%)`,
              }}
            >
              <Image
                src={AFTER_IMAGE}
                alt="Luxurious Warm Modern Living Room After Renovation"
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1152px"
                className="object-cover object-center pointer-events-none"
              />
            </div>

            {/* FLOATING LABELS (Persistent, high contrast & legible) */}
            <div className="absolute top-5 left-5 z-20 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/25 text-xs sm:text-sm font-mono tracking-widest text-zinc-100 uppercase font-medium shadow-lg pointer-events-none select-none">
              BEFORE · UNFINISHED
            </div>

            <div className="absolute top-5 right-5 z-20 px-3.5 py-1.5 rounded-full bg-amber-500/25 backdrop-blur-md border border-amber-200/50 text-xs sm:text-sm font-mono tracking-widest text-amber-100 uppercase font-semibold shadow-lg pointer-events-none select-none">
              AFTER · RENOVATED
            </div>

            {/* VERTICAL DIVIDER LINE & DRAGGABLE HANDLE */}
            <div
              className="absolute top-0 bottom-0 z-20 w-[3px] bg-white pointer-events-none shadow-[0_0_15px_rgba(255,255,255,0.8)]"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Circular Handle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white text-zinc-950 flex items-center justify-center shadow-[0_4px_25px_rgba(0,0,0,0.7)] border-2 border-zinc-200 transition-transform group-hover:scale-105 active:scale-95">
                <div className="flex items-center gap-1 font-bold text-sm select-none">
                  <span className="text-zinc-600 font-black">‹</span>
                  <span className="text-zinc-600 font-black">›</span>
                </div>
              </div>
            </div>
          </div>

          {/* Slider instruction hint */}
          <div className="flex items-center justify-between text-xs sm:text-sm font-mono text-zinc-400 mt-4 px-2">
            <span>← Drag divider to explore before & after →</span>
            <span className="hidden sm:inline">Arrow keys supported for precision</span>
          </div>

          {/* Prominent CTA directly below the comparison */}
          <div className="flex justify-center mt-12 sm:mt-14">
            <a
              href="#inquiry"
              onClick={handleScrollToInquiry}
              className="group inline-flex items-center gap-3 px-8 py-4 sm:px-11 sm:py-5 rounded-full border border-champagne-300/60 bg-gradient-to-r from-champagne-300/25 to-champagne-300/15 hover:from-champagne-300 hover:to-amber-200 text-champagne-100 hover:text-obsidian text-base sm:text-lg font-sans font-semibold tracking-wide shadow-[0_4px_25px_rgba(217,196,151,0.25)] hover:shadow-[0_8px_35px_rgba(217,196,151,0.45)] transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-300"
            >
              <span>Transform Your Space</span>
              <ArrowUpRight className="w-5 h-5 text-champagne-300 group-hover:text-obsidian group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
