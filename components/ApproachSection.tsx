"use client";

import React from "react";
import { Sparkles } from "lucide-react";

interface StepItem {
  number: string;
  title: string;
  description: string;
  offsetClass: string;
}

const STEPS: StepItem[] = [
  {
    number: "01",
    title: "Initial Consultation",
    description:
      "We begin by understanding your vision, lifestyle, functional needs, preferred style, and budget. This helps establish a clear direction for your project.",
    offsetClass: "lg:translate-y-0",
  },
  {
    number: "02",
    title: "Planning and Design",
    description:
      "We develop a considered design plan, including layouts, materials, finishes, color palettes, and practical solutions suited to your space and requirements.",
    offsetClass: "lg:translate-y-10",
  },
  {
    number: "03",
    title: "Execution and Handover",
    description:
      "The approved design moves into execution, with attention to materials, detailing, and coordination through to the final handover.",
    offsetClass: "lg:translate-y-20",
  },
];

export default function ApproachSection() {
  return (
    <section
      id="approach"
      className="relative w-full py-28 md:py-36 bg-[#F8F6F2] text-zinc-900 border-t border-zinc-200/80 overflow-hidden"
    >
      <div className="w-full px-6 md:px-12 lg:px-16 2xl:px-24">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-4 rounded-full border border-zinc-300 bg-white text-xs font-mono uppercase tracking-[0.25em] text-zinc-800 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              OUR APPROACH
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-zinc-950">
              How We Create Sanctuary
            </h2>
          </div>
          <p className="text-zinc-700 text-base sm:text-lg font-normal max-w-md leading-relaxed">
            Every residence unfolds across a rigorous three-phase architectural methodology
            crafted to ensure quiet longevity and artisan precision.
          </p>
        </div>

        {/* Small Dark Label reading "APPROACH" above the first panel as specified */}
        <div className="mb-4">
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-zinc-950 text-zinc-100 text-xs font-mono uppercase tracking-[0.25em] font-medium shadow-sm">
            APPROACH
          </span>
        </div>

        {/* Three Offset Rectangular Text Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 pb-16 lg:pb-24">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className={`relative bg-[#ECE8E1] border border-zinc-300 p-8 sm:p-10 lg:p-12 rounded-2xl transition-all duration-300 hover:border-zinc-400 flex flex-col justify-between min-h-[340px] md:min-h-[380px] shadow-sm hover:shadow-md ${step.offsetClass}`}
            >
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-600 font-medium block mb-4">
                  Phase {step.number}
                </span>

                <h3 className="font-serif text-2xl sm:text-3xl text-zinc-950 font-medium mb-4 leading-tight">
                  {step.title}
                </h3>

                <p className="text-zinc-800 text-base sm:text-lg font-normal leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Large Orange / Muted-Bronze Step Number in Lower-Right Corner */}
              <div className="flex justify-end pt-8">
                <span className="font-serif text-6xl sm:text-7xl font-normal text-[#C86D3B] select-none leading-none tracking-tighter">
                  {step.number}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
