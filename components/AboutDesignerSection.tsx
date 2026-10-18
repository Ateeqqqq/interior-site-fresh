"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, ArrowRight, Compass, CheckCircle2, Feather } from "lucide-react";

/**
 * =========================================================================
 * FOUNDER & DESIGN LEAD CONFIGURATION
 * Note: Per project guidelines, no unverified names, fake awards, or fabricated
 * experience figures are invented. When verified founder credentials and a
 * genuine portrait photo are available, update the values below.
 * =========================================================================
 */
export interface DesignerConfig {
  /** Replace with verified founder's name when provided (e.g., "Aarav Sharma") */
  founderName: string;
  roleTitle: string;
  studioName: string;
  /** Replace with genuine founder portrait path e.g. "/team/founder.jpg" */
  portraitImage: string;
  portraitAlt: string;
  eyebrow: string;
  headline: string;
  philosophyStatement: string;
  designPillar: string;
}

export const DESIGNER_CONFIG: DesignerConfig = {
  founderName: "Principal Designer & Architect", // Editable placeholder: replace with genuine founder name
  roleTitle: "Lead Interior Architect & Creative Director",
  studioName: "Atelier Living",
  portraitImage: "/portfolio/living.jpg", // High-resolution architectural atelier reference
  portraitAlt: "Atelier Living Principal Design Studio & Architectural Space",
  eyebrow: "MEET THE DESIGNER",
  headline: "Spaces Designed Around the Way You Live",
  philosophyStatement: "THOUGHTFULLY CONSIDERED SPACES",
  designPillar: "DESIGNED WITH PURPOSE",
};

export default function AboutDesignerSection() {
  const handleConsultationClick = () => {
    const inquiryEl = document.getElementById("inquiry");
    if (inquiryEl) {
      inquiryEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="about"
      className="relative w-full py-28 md:py-36 bg-[#08080a] text-zinc-100 border-t border-zinc-800/80 overflow-hidden"
    >
      {/* Subtle radial ambient warm glow */}
      <div className="absolute top-1/3 right-1/4 w-[650px] h-[450px] bg-amber-600/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="w-full px-6 md:px-12 lg:px-16 2xl:px-24 max-w-7xl mx-auto relative z-10">
        {/* Brand Emblem & Logo Header */}
        <div className="flex items-center gap-3.5 mb-14 md:mb-16">
          <div className="w-10 h-10 rounded-full border border-amber-200/50 flex items-center justify-center text-amber-200 font-serif text-[15px] font-medium tracking-wider">
            AL
          </div>
          <div className="flex flex-col">
            <span className="font-serif tracking-[0.24em] text-sm md:text-base font-medium text-zinc-100">
              ATELIER LIVING
            </span>
            <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-zinc-400">
              Interior Architecture & Design Practice
            </span>
          </div>
        </div>

        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Biography & Philosophy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-5 rounded-full border border-amber-200/40 bg-amber-500/10 text-xs font-mono uppercase tracking-[0.25em] text-amber-200 font-medium self-start">
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              {DESIGNER_CONFIG.eyebrow}
            </div>

            {/* Headline */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-[1.15] mb-6">
              {DESIGNER_CONFIG.headline}
            </h2>

            {/* Editorial Biography */}
            <div className="space-y-4 text-zinc-300 text-base sm:text-lg font-normal leading-relaxed">
              <p>
                At Atelier Living, we believe that exceptional interior architecture begins with a
                profound understanding of how you inhabit space. A residence is not merely an assemblage
                of furnishings; it is an intimate backdrop for everyday rituals, quiet contemplation, and
                shared gatherings where{" "}
                <span className="text-amber-200 font-medium">every millimetre is calibrated with intent</span>.
              </p>

              <p>
                Our studio champions a philosophy of{" "}
                <span className="text-amber-200 font-medium">enduring material honesty</span>. We orchestrate
                natural illumination, tactile surfaces, and proportioned spatial flows to create balanced
                environments where contemporary refinement harmonizes naturally with human warmth and lasting durability.
              </p>

              <p className="text-sm sm:text-base text-zinc-400">
                From initial space planning and bespoke joinery detailing to turnkey coordination, we partner
                closely with each patron to ensure their architectural vision is realized with uncompromising craft.
              </p>
            </div>

            {/* Verified Philosophy Highlights (Replacing unverified experience claims) */}
            <div className="mt-8 pt-8 border-t border-zinc-800/80 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-850">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-zinc-400 mb-1.5">
                  <Compass className="w-3.5 h-3.5 text-amber-200" />
                  <span>Studio Philosophy</span>
                </div>
                <div className="font-serif text-lg sm:text-xl text-amber-200 font-normal">
                  {DESIGNER_CONFIG.philosophyStatement}
                </div>
                <p className="text-xs text-zinc-400 font-sans mt-1">
                  Rooted in architectural clarity, spatial restraint, and natural light.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-850">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-zinc-400 mb-1.5">
                  <Feather className="w-3.5 h-3.5 text-amber-200" />
                  <span>Design Ethos</span>
                </div>
                <div className="font-serif text-lg sm:text-xl text-amber-200 font-normal">
                  {DESIGNER_CONFIG.designPillar}
                </div>
                <p className="text-xs text-zinc-400 font-sans mt-1">
                  Every finish selected for tactile resonance, durability, and quiet elegance.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-10">
              <button
                type="button"
                onClick={handleConsultationClick}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-amber-200 text-zinc-950 hover:bg-amber-100 font-mono text-xs sm:text-sm font-semibold uppercase tracking-widest transition-all duration-300 shadow-[0_0_22px_rgba(217,196,151,0.25)] hover:shadow-[0_0_32px_rgba(217,196,151,0.4)]"
              >
                <span>BOOK A CONSULTATION</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Editorial Portrait / Studio Visual Framing */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative architectural frame */}
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-zinc-800 bg-[#121214] shadow-2xl p-2.5">
                <div className="relative aspect-[4/5] w-full rounded-xl md:rounded-2xl overflow-hidden bg-zinc-900">
                  <Image
                    src={DESIGNER_CONFIG.portraitImage}
                    alt={DESIGNER_CONFIG.portraitAlt}
                    fill
                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                    priority={false}
                  />

                  {/* Gradient overlays for editorial integration */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 border border-amber-200/15 rounded-xl md:rounded-2xl pointer-events-none" />

                  {/* Bottom Portrait Caption Card */}
                  <div className="absolute bottom-4 inset-x-4 p-4 rounded-xl bg-zinc-950/85 backdrop-blur-md border border-zinc-800/80">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-amber-200 animate-pulse" />
                      <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-200 font-medium">
                        CREATIVE LEADERSHIP
                      </span>
                    </div>
                    <p className="font-serif text-lg sm:text-xl text-white font-normal leading-snug">
                      {DESIGNER_CONFIG.founderName}
                    </p>
                    <p className="text-xs font-mono uppercase tracking-widest text-zinc-400 mt-0.5">
                      {DESIGNER_CONFIG.studioName} · {DESIGNER_CONFIG.roleTitle}
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative corner accent badge */}
              <div className="hidden sm:flex absolute -bottom-5 -right-5 items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900/95 border border-amber-200/40 shadow-xl backdrop-blur-md text-zinc-200">
                <CheckCircle2 className="w-4 h-4 text-amber-200" />
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-200 font-medium">
                  Tailored Commission
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
