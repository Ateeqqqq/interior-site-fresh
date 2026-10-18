"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Shield, Calendar, MapPin, Sparkles, X } from "lucide-react";

export default function InquirySection() {
  const [projectType, setProjectType] = useState<string>("Private Villa / Estate");
  const [budget, setBudget] = useState<string>("$1M – $3M");
  const [timeline, setTimeline] = useState<string>("2026 Commissions");
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handlePackageSelect = (e: Event) => {
      const customEvent = e as CustomEvent<{ packageName: string; tier: string }>;
      if (customEvent.detail?.packageName) {
        const pkgName = customEvent.detail.packageName;
        setSelectedPackage(pkgName);
        setFormData((prev) => ({
          ...prev,
          notes: prev.notes
            ? `${prev.notes}\n\n[Inquiry regarding ${pkgName} package: Requesting customized quotation and floor plan consultation.]`
            : `Inquiry regarding ${pkgName} package: Requesting customized quotation and floor plan consultation.`,
        }));
      }
    };

    window.addEventListener("atelier:select-package", handlePackageSelect);
    return () => window.removeEventListener("atelier:select-package", handlePackageSelect);
  }, []);

  const projectTypes = [
    "Private Villa / Estate",
    "Penthouse Residence",
    "Coastal / Mountain Sanctuary",
    "Boutique Hospitality",
  ];

  const budgetTiers = ["$500k – $1M", "$1M – $3M", "$3M+"];

  const timelines = ["Mid 2026", "Late 2026", "2027 Commissions"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <section id="inquiry" className="relative py-32 px-6 md:px-12 lg:px-16 2xl:px-24 bg-[#0a0a0a] text-zinc-100 border-t border-zinc-800/60 overflow-hidden w-full">
      {/* Warm ambient champagne glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-600/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 rounded-full border border-amber-200/40 bg-amber-500/10 text-xs font-mono uppercase tracking-[0.25em] text-amber-200 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            BESPOKE COMMISSIONS · 2026–2027
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight text-white mb-4">
            Initiate Your Sanctuary
          </h2>
          <p className="text-zinc-200 text-base md:text-lg font-normal max-w-xl mx-auto leading-relaxed">
            We limit our calendar to eight private commissions annually to guarantee uninterrupted architectural immersion and master artisan craftsmanship.
          </p>
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-10 md:p-14 rounded-3xl bg-zinc-950 border border-amber-200/40 text-center shadow-2xl"
          >
            <div className="w-16 h-16 rounded-full bg-amber-200/10 border border-amber-200/40 flex items-center justify-center mx-auto mb-6 text-amber-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-3xl text-white mb-3 font-normal">
              Private Inquiry Received
            </h3>
            <p className="text-zinc-300 text-base font-normal max-w-lg mx-auto mb-6 leading-relaxed">
              Thank you, <span className="text-amber-200 font-medium">{formData.name || "valued patron"}</span>. Our Principal Architect will review your architectural vision and contact your office within 24 business hours.
            </p>

            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">
              <span>REFERENCE:</span>
              <span className="text-amber-200 font-semibold tracking-widest">
                AL-2026-{Math.floor(1000 + Math.random() * 9000)}
              </span>
            </div>

            <div className="mt-8">
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs sm:text-sm font-mono text-zinc-400 hover:text-amber-200 underline tracking-wider uppercase font-medium"
              >
                Submit another inquiry
              </button>
            </div>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="p-8 md:p-12 rounded-3xl bg-zinc-950/90 border border-zinc-800 shadow-2xl backdrop-blur-xl"
          >
            {/* Selected Package Banner */}
            {selectedPackage && (
              <div className="mb-8 p-4 rounded-2xl bg-amber-500/10 border border-amber-200/50 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-200/20 text-amber-200 flex items-center justify-center font-mono text-xs font-semibold">
                    ✓
                  </div>
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-widest text-amber-200/90">
                      SELECTED INTERIOR PACKAGE
                    </div>
                    <div className="font-serif text-lg text-white font-normal">
                      {selectedPackage} · Request a Quote
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedPackage(null)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors"
                  aria-label="Remove selected package"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Step 1: Project Typology */}
            <div className="mb-10">
              <label className="block text-xs sm:text-sm font-mono uppercase tracking-widest text-zinc-300 font-medium mb-3">
                01. Scope of Architecture
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {projectTypes.map((type) => (
                  <button
                    type="button"
                    key={type}
                    onClick={() => setProjectType(type)}
                    className={`py-3.5 px-4 rounded-xl text-xs sm:text-sm font-mono tracking-wide text-left transition-all border ${
                      projectType === type
                        ? "bg-amber-200/15 border-amber-200/90 text-amber-100 font-medium shadow-[0_0_15px_rgba(223,192,139,0.2)]"
                        : "bg-zinc-900 border-zinc-750 text-zinc-300 hover:border-zinc-600 hover:text-white"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Investment & Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
              <div>
                <label className="block text-xs sm:text-sm font-mono uppercase tracking-widest text-zinc-300 font-medium mb-3">
                  02. Investment Allocation
                </label>
                <div className="flex flex-col gap-2.5">
                  {budgetTiers.map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setBudget(b)}
                      className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-mono tracking-wide text-left transition-all border ${
                        budget === b
                          ? "bg-amber-200/15 border-amber-200/90 text-amber-100 font-medium"
                          : "bg-zinc-900 border-zinc-750 text-zinc-300 hover:border-zinc-600 hover:text-white"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-mono uppercase tracking-widest text-zinc-300 font-medium mb-3">
                  03. Desired Completion
                </label>
                <div className="flex flex-col gap-2.5">
                  {timelines.map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setTimeline(t)}
                      className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-mono tracking-wide text-left transition-all border ${
                        timeline === t
                          ? "bg-amber-200/15 border-amber-200/90 text-amber-100 font-medium"
                          : "bg-zinc-900 border-zinc-750 text-zinc-300 hover:border-zinc-600 hover:text-white"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 3: Patron Details */}
            <div className="space-y-6 pt-6 border-t border-zinc-800/80 mb-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-mono uppercase tracking-widest text-zinc-300 font-medium mb-2">
                    Principal Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Eleanor Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-zinc-900 border border-zinc-700/80 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-amber-200 focus:ring-1 focus:ring-amber-200 text-base font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-mono uppercase tracking-widest text-zinc-300 font-medium mb-2">
                    Confidential Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="vance@residence.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-zinc-900 border border-zinc-700/80 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-amber-200 focus:ring-1 focus:ring-amber-200 text-base font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-mono uppercase tracking-widest text-zinc-300 font-medium mb-2">
                  Property Location (City / Region) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zurichberg, Switzerland or Tribeca, NYC"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-zinc-900 border border-zinc-700/80 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-amber-200 focus:ring-1 focus:ring-amber-200 text-base font-sans"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-mono uppercase tracking-widest text-zinc-300 font-medium mb-2">
                  Architectural Aspirations & Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Briefly describe the site, lighting aspirations, or specific materials you envision..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-zinc-900 border border-zinc-700/80 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-amber-200 focus:ring-1 focus:ring-amber-200 text-base font-sans resize-none"
                />
              </div>
            </div>

            {/* Privacy note & Submit CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-zinc-400 font-medium">
                <Shield className="w-4 h-4 text-amber-200" />
                <span>Strict Non-Disclosure Guarantee (NDA)</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4.5 rounded-full bg-zinc-100 hover:bg-amber-100 text-zinc-950 font-semibold text-base tracking-wide transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:shadow-[0_0_35px_rgba(223,192,139,0.35)] disabled:opacity-50"
              >
                <span>{loading ? "Submitting Inquiry..." : "Transmit Consultation Request"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
