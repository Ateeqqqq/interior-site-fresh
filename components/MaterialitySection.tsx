"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Compass, Sparkles, Check, Info } from "lucide-react";

interface Material {
  id: string;
  name: string;
  subtitle: string;
  origin: string;
  finish: string;
  colorHex: string;
  gradient: string;
  texturePattern: string;
  properties: string[];
  description: string;
}

const MATERIALS: Material[] = [
  {
    id: "travertine",
    name: "Roman Navona Travertine",
    subtitle: "Sedimentary porous stone with warm subterranean strata",
    origin: "Tivoli Quarries, Italy",
    finish: "Open-pore honed matte (unfilled)",
    colorHex: "#e3d9cb",
    gradient: "linear-gradient(135deg, #ede4d6 0%, #dbcfbd 50%, #c9bcab 100%)",
    texturePattern: "radial-gradient(ellipse at 30% 40%, rgba(0,0,0,0.06) 0%, transparent 60%)",
    properties: ["High thermal inertia", "Velvety dry tactile touch", "Graceful generational patina"],
    description:
      "Extracted from the same historic beds used by Roman master builders. We deliberately leave the natural pores open to preserve the authentic tactile identity of the stone, hand-honing the surface to a soft cashmere sheen.",
  },
  {
    id: "smoked-oak",
    name: "Smoked European Oak",
    subtitle: "Fumed timber treated through deep cellular reaction",
    origin: "Burgundy, France",
    finish: "Micro-wire brushed & natural hardwax oil",
    colorHex: "#2b2520",
    gradient: "linear-gradient(135deg, #3d342d 0%, #26201b 50%, #171411 100%)",
    texturePattern: "repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.2) 3px, rgba(0,0,0,0.2) 6px)",
    properties: ["Deep cellular color (never fades)", "Resistant to moisture warp", "FSC-certified 180yr heritage stands"],
    description:
      "Unlike stained timber which merely coats the surface, our smoked oak is cured in sealed vacuum chambers with organic ammonia vapor. The natural tannins in the wood react to create deep charcoal undertones through the full thickness of the plank.",
  },
  {
    id: "belgian-linen",
    name: "Belgian Sheer & Bouclé Linen",
    subtitle: "Organic long-staple flax woven on heritage looms",
    origin: "Kortrijk Mills, Flanders",
    finish: "Raw tumbled wash (unbleached)",
    colorHex: "#f0ece3",
    gradient: "linear-gradient(135deg, #f7f4ed 0%, #eae4d8 50%, #ddd5c6 100%)",
    texturePattern: "radial-gradient(circle at 50% 50%, rgba(200,180,150,0.1) 1px, transparent 1px)",
    properties: ["High acoustic absorption", "Naturally hypoallergenic", "Breathes with ambient air humidity"],
    description:
      "Woven from damp flax fibers harvested along the Lys river basin. As daylight traverses the fabric, the organic slubs and slight irregularities scatter light into a soft golden haze, eliminating harsh interior reflections.",
  },
  {
    id: "satin-bronze",
    name: "Aged Patinated Bronze",
    subtitle: "Solid architectural alloy with hand-rubbed wax finish",
    origin: "Florence Foundry, Italy",
    finish: "Chemical hot-patina & beeswax seal",
    colorHex: "#997d4d",
    gradient: "linear-gradient(135deg, #c7aa71 0%, #8c703b 50%, #52401f 100%)",
    texturePattern: "linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)",
    properties: ["Antibacterial surface", "Living finish that deepens with use", "Milled to sub-millimeter tolerances"],
    description:
      "Every switchplate, cabinet pull, and door portal is cast in pure architectural bronze. Over years of human touch, the edges burnish to a brilliant champagne luster while recessed corners remain richly shadowed.",
  },
];

export default function MaterialitySection() {
  const [selectedMat, setSelectedMat] = useState<Material>(MATERIALS[0]);

  return (
    <section id="materials" className="relative py-32 px-6 md:px-12 lg:px-16 2xl:px-24 bg-[#0c0c0c] text-zinc-100 border-t border-zinc-800/60 overflow-hidden w-full">
      <div className="w-full">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-4 rounded-full border border-amber-200/40 bg-amber-500/10 text-xs font-mono uppercase tracking-[0.25em] text-amber-200 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            MATERIAL MASTERY
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white mb-4">
            Tactile Honesty
          </h2>
          <p className="text-zinc-200 text-base sm:text-lg font-normal leading-relaxed">
            We believe architectural depth arises when materials are permitted to speak their authentic geological and botanical language.
          </p>
        </div>

        {/* Interactive Material Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Swatch Selector List (Left 5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {MATERIALS.map((mat) => {
              const isActive = selectedMat.id === mat.id;
              return (
                <button
                  key={mat.id}
                  onClick={() => setSelectedMat(mat)}
                  className={`text-left p-5 rounded-2xl border transition-all duration-300 flex items-center gap-4 ${
                    isActive
                      ? "bg-zinc-900 border-amber-200/70 shadow-[0_4px_24px_rgba(0,0,0,0.7)]"
                      : "bg-zinc-950/60 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50"
                  }`}
                >
                  {/* Swatch Disc */}
                  <div
                    className="w-13 h-13 rounded-xl flex-shrink-0 border border-white/20 shadow-inner relative overflow-hidden"
                    style={{ background: mat.gradient }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{ backgroundImage: mat.texturePattern }}
                    />
                  </div>

                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <h4
                        className={`font-serif text-xl ${
                          isActive ? "text-amber-200 font-semibold" : "text-zinc-100 font-medium"
                        }`}
                      >
                        {mat.name}
                      </h4>
                      {isActive && <Check className="w-5 h-5 text-amber-200" />}
                    </div>
                    <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-medium block mt-1">
                      {mat.origin}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Inspector Card (Right 7 cols) */}
          <div className="lg:col-span-7">
            <motion.div
              key={selectedMat.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="p-8 md:p-12 rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl relative overflow-hidden"
            >
              {/* Large Texture Header Panel */}
              <div
                className="h-48 w-full rounded-2xl mb-8 border border-white/10 relative overflow-hidden shadow-2xl flex items-end p-6"
                style={{ background: selectedMat.gradient }}
              >
                <div
                  className="absolute inset-0"
                  style={{ backgroundImage: selectedMat.texturePattern }}
                />
                <div className="relative z-10 px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs font-mono tracking-widest text-zinc-100 uppercase font-medium">
                  FINISH: {selectedMat.finish}
                </div>
              </div>

              {/* Title & Origin */}
              <div className="mb-6">
                <div className="text-xs font-mono uppercase tracking-widest text-amber-200 font-semibold mb-2">
                  ORIGIN: {selectedMat.origin}
                </div>
                <h3 className="font-serif text-3xl md:text-4xl text-white font-normal">
                  {selectedMat.name}
                </h3>
                <p className="text-zinc-300 text-base font-normal italic mt-1">
                  {selectedMat.subtitle}
                </p>
              </div>

              {/* Long Description */}
              <p className="text-zinc-200 text-base md:text-lg font-normal leading-relaxed mb-8">
                {selectedMat.description}
              </p>

              {/* Properties Grid */}
              <div className="pt-6 border-t border-zinc-900">
                <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-4 font-medium">
                  PERFORMANCE & SENSORY CHARACTERISTICS
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {selectedMat.properties.map((prop) => (
                    <div
                      key={prop}
                      className="px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm font-mono text-zinc-200 flex items-center gap-2.5 font-medium"
                    >
                      <span className="w-2 h-2 rounded-full bg-amber-200 flex-shrink-0" />
                      <span>{prop}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
