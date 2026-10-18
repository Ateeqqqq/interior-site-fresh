"use client";

import React from "react";
import { Check, Sparkles, ArrowRight, ShieldCheck, Layers } from "lucide-react";

/**
 * =========================================================================
 * INTERIOR DESIGN PACKAGES CONFIGURATION
 * Easily update package details, descriptions, and verified pricing here.
 * If genuine prices become available, replace "Request a Quote" below.
 * =========================================================================
 */
export interface InteriorPackage {
  id: string;
  name: string;
  tier: "gold" | "platinum" | "titanium";
  badge?: string;
  isFeatured?: boolean;
  tagline: string;
  description: string;
  priceDisplay: string;
  priceSubtext: string;
  features: string[];
  ctaLabel: string;
}

export const INTERIOR_PACKAGES: InteriorPackage[] = [
  {
    id: "gold-3bhk",
    name: "Gold 3BHK",
    tier: "gold",
    tagline: "Essential Architectural Balance",
    description:
      "A complete full-home interior solution focusing on intelligent space planning, durable modular joinery, refined ambient cove lighting, and premium quartz surfaces for harmonious modern living.",
    priceDisplay: "Request a Quote",
    priceSubtext: "Tailored to your specific architectural floor plan",
    features: [
      "Full 3BHK spatial planning & 3D visualization preview",
      "Modular kitchen with anti-scratch quartz countertops",
      "Master & guest bedroom floor-to-ceiling custom wardrobes",
      "Living & dining false ceiling with warm ambient lighting",
      "Premium soft-close hinges & architectural matte switches",
      "Dedicated project coordinator & milestone quality audits",
    ],
    ctaLabel: "ENQUIRE ABOUT GOLD",
  },
  {
    id: "platinum-3bhk",
    name: "Platinum 3BHK",
    tier: "platinum",
    isFeatured: true,
    badge: "POPULAR CHOICE",
    tagline: "Elevated Turnkey Living",
    description:
      "Our most requested comprehensive transformation featuring bespoke veneer millwork, imported designer sanitaryware, layered architectural lighting, a walk-in master wardrobe, and seamless turnkey execution.",
    priceDisplay: "Request a Quote",
    priceSubtext: "Comprehensive bespoke turnkey quotation",
    features: [
      "Everything in Gold, plus elevated architectural specifications",
      "Large-format porcelain & Italian marble feature surfaces",
      "Master suite walk-in wardrobe with tinted glass & integrated LEDs",
      "Designer modular kitchen with built-in appliance provisions",
      "Layered architectural lighting (2700K warm magnetic tracks & coves)",
      "Turnkey project execution with dedicated full-time site supervisor",
    ],
    ctaLabel: "ENQUIRE ABOUT PLATINUM",
  },
  {
    id: "titanium-3bhk",
    name: "Titanium 3BHK",
    tier: "titanium",
    tagline: "The Pinnacle of Bespoke Craft",
    description:
      "An uncompromising architectural commission featuring handcrafted fluted wall paneling, motorized home automation, exotic stone slabs, custom acoustic zoning, and artisan finishes tailored for discerning homeowners.",
    priceDisplay: "Request a Quote",
    priceSubtext: "Private architectural commission & white-glove delivery",
    features: [
      "Complete end-to-end bespoke interior architecture & styling",
      "Exotic natural stone & bookmatched marble installations",
      "Smart home lighting automation & motorized curtain integration",
      "Custom artisan-crafted loose furniture & bespoke headboards",
      "Acoustic ceiling treatments & concealed linear HVAC diffusers",
      "White-glove turnkey handover with lifetime structural assurance",
    ],
    ctaLabel: "ENQUIRE ABOUT TITANIUM",
  },
];

export default function InteriorPackagesSection() {
  const handleEnquire = (pkg: InteriorPackage) => {
    // Dispatch custom event so the consultation form automatically pre-fills the selected package
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("atelier:select-package", {
          detail: {
            packageName: pkg.name,
            tier: pkg.tier,
          },
        })
      );
    }

    // Smoothly scroll to the inquiry section
    const inquiryEl = document.getElementById("inquiry");
    if (inquiryEl) {
      inquiryEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="packages"
      className="relative w-full py-28 md:py-36 bg-[#0a0a0c] text-zinc-100 border-t border-zinc-800/80 overflow-hidden"
    >
      {/* Subtle ambient warm glow behind featured package */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-amber-500/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="w-full px-6 md:px-12 lg:px-16 2xl:px-24 max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-5 rounded-full border border-amber-200/40 bg-amber-500/10 text-xs font-mono uppercase tracking-[0.25em] text-amber-200 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            DESIGNED AROUND YOUR HOME
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-5">
            Interior Packages
          </h2>

          <p className="text-zinc-300 text-base sm:text-lg md:text-xl font-normal leading-relaxed">
            Thoughtfully considered interior solutions for different spaces, styles, and budgets.
          </p>
        </div>

        {/* 3 Package Cards Horizontal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {INTERIOR_PACKAGES.map((pkg) => {
            const isFeatured = pkg.isFeatured;

            return (
              <div
                key={pkg.id}
                className={`relative flex flex-col justify-between h-full rounded-2xl md:rounded-3xl transition-all duration-300 ${
                  isFeatured
                    ? "bg-[#141418] border-2 border-amber-200/60 shadow-[0_0_35px_rgba(217,196,151,0.12)] md:-translate-y-2 hover:border-amber-200 hover:shadow-[0_0_45px_rgba(217,196,151,0.2)]"
                    : "bg-[#111114] border border-zinc-800/80 hover:border-zinc-700 hover:bg-[#131317] hover:-translate-y-1"
                } p-7 sm:p-8 lg:p-9`}
              >
                {/* Popular Choice Badge for Featured Card */}
                {pkg.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-200 text-zinc-950 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] shadow-md">
                      <Sparkles className="w-3 h-3 text-zinc-950" />
                      {pkg.badge}
                    </span>
                  </div>
                )}

                <div>
                  {/* Package Top Meta */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono uppercase tracking-[0.22em] text-zinc-400">
                      {pkg.tagline}
                    </span>
                    <span
                      className={`text-[11px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded ${
                        isFeatured
                          ? "bg-amber-200/20 text-amber-200 border border-amber-200/40"
                          : "bg-zinc-800/60 text-zinc-400 border border-zinc-750"
                      }`}
                    >
                      3BHK RESIDENCE
                    </span>
                  </div>

                  {/* Package Name */}
                  <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-4">
                    {pkg.name}
                  </h3>

                  {/* Description */}
                  <p className="text-zinc-300 text-sm sm:text-base font-normal leading-relaxed mb-6">
                    {pkg.description}
                  </p>

                  {/* Clearly Displayed Price Field */}
                  <div className="pt-5 pb-6 border-y border-zinc-800/80 mb-6">
                    <div className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 mb-1">
                      ESTIMATED INVESTMENT
                    </div>
                    <div className="font-serif text-3xl sm:text-4xl text-amber-200 font-normal tracking-tight">
                      {pkg.priceDisplay}
                    </div>
                    <p className="text-xs text-zinc-400 font-sans mt-1.5">
                      {pkg.priceSubtext}
                    </p>
                  </div>

                  {/* Deliverables / Scope List */}
                  <div className="mb-8">
                    <div className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-300 font-medium mb-3.5">
                      Included In This Scope:
                    </div>
                    <ul className="space-y-3">
                      {pkg.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-200 font-normal">
                          <div
                            className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                              isFeatured
                                ? "bg-amber-200/20 text-amber-200"
                                : "bg-zinc-800 text-zinc-300"
                            }`}
                          >
                            <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                          </div>
                          <span className="leading-snug">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => handleEnquire(pkg)}
                    className={`w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl text-xs sm:text-sm font-mono uppercase tracking-widest font-semibold transition-all duration-300 ${
                      isFeatured
                        ? "bg-amber-200 text-zinc-950 hover:bg-amber-100 shadow-[0_0_20px_rgba(217,196,151,0.25)] hover:shadow-[0_0_28px_rgba(217,196,151,0.4)]"
                        : "bg-zinc-900 border border-zinc-700 text-zinc-100 hover:border-amber-200/70 hover:text-amber-200 hover:bg-zinc-850"
                    }`}
                  >
                    <span>{pkg.ctaLabel}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Trust & Assurance Note */}
        <div className="mt-14 pt-8 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-200" />
            <span>Turnkey Execution · Transparent Bill of Quantities (BOQ) · Zero Hidden Costs</span>
          </div>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-200" />
            <span>Custom floor plans & architectural variations available upon request</span>
          </div>
        </div>
      </div>
    </section>
  );
}
