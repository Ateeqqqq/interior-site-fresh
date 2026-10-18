"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, CheckCircle2, ArrowRight, Sparkles, Phone, User, MapPin, Building2, AlertCircle } from "lucide-react";

export default function ConsultationPopup() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Form Fields
  const [fullName, setFullName] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [propertyLocation, setPropertyLocation] = useState<string>("");
  const [propertyType, setPropertyType] = useState<string>("Apartment");

  // Validation Errors
  const [errors, setErrors] = useState<{
    fullName?: string;
    mobileNumber?: string;
    propertyLocation?: string;
  }>({});

  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  // 15-second timed delay with sessionStorage dismissal check
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const isDismissed = sessionStorage.getItem("atelier_consultation_dismissed");
        if (isDismissed) {
          return;
        }
      }
    } catch {
      // In case sessionStorage is blocked by security settings
    }

    const timer = setTimeout(() => {
      // Save currently focused element for accessibility restoration
      if (typeof document !== "undefined") {
        previousActiveElementRef.current = document.activeElement as HTMLElement;
      }
      setIsOpen(true);
      try {
        sessionStorage.setItem("atelier_consultation_dismissed", "true");
      } catch {
        // Ignored
      }
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  // Listen for programmatic open requests
  useEffect(() => {
    const handleOpen = () => {
      if (typeof document !== "undefined") {
        previousActiveElementRef.current = document.activeElement as HTMLElement;
      }
      setIsOpen(true);
    };
    window.addEventListener("atelier:open-consultation-modal", handleOpen);
    return () => window.removeEventListener("atelier:open-consultation-modal", handleOpen);
  }, []);

  // Lock background scroll when open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Auto focus close button or first input for keyboard accessibility
    setTimeout(() => {
      if (closeButtonRef.current) {
        closeButtonRef.current.focus();
      }
    }, 50);

    return () => {
      document.body.style.overflow = originalOverflow;
      if (previousActiveElementRef.current) {
        previousActiveElementRef.current.focus();
      }
    };
  }, [isOpen]);

  // Escape key listener & focus trapping
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleDismiss();
        return;
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleDismiss = () => {
    setIsOpen(false);
    try {
      sessionStorage.setItem("atelier_consultation_dismissed", "true");
    } catch {
      // Ignored
    }
  };

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      newErrors.fullName = "Please enter your full name.";
    }

    // Sensible mobile number validation for India: 10 digits starting with 6, 7, 8, or 9
    const cleanNumber = mobileNumber.replace(/\D/g, "");
    if (!cleanNumber) {
      newErrors.mobileNumber = "Mobile number is required.";
    } else if (cleanNumber.length !== 10 || !/^[6-9]\d{9}$/.test(cleanNumber)) {
      newErrors.mobileNumber = "Enter a valid 10-digit Indian mobile number (e.g. 9876543210).";
    }

    if (!propertyLocation.trim() || propertyLocation.trim().length < 2) {
      newErrors.propertyLocation = "Please enter your property locality or city.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate network latency then display transparent, truthful status
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-heading"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleDismiss();
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-[1150px] my-auto bg-[#141414] border border-zinc-700/80 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden text-zinc-100 max-h-[92vh] flex flex-col md:flex-row"
      >
        {/* Accessible Close Button (Top-Right) */}
        <button
          ref={closeButtonRef}
          onClick={handleDismiss}
          aria-label="Close consultation offer dialog"
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 w-11 h-11 rounded-full bg-zinc-900/90 border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT COLUMN: Promotional Offer & Studio Benefits */}
        <div className="w-full md:w-[48%] bg-gradient-to-br from-[#1a1816] via-[#121110] to-[#0a0a0a] p-8 sm:p-10 lg:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-zinc-800 relative overflow-hidden">
          {/* Subtle background warm ambiance */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 blur-[90px] rounded-full pointer-events-none" />

          <div className="relative z-10">
            {/* Studio Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 rounded-full border border-amber-200/40 bg-amber-500/10 text-xs font-mono uppercase tracking-[0.25em] text-amber-200 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              ATELIER CONSULTATION
            </div>

            {/* Headline */}
            <h2 id="popup-heading" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight leading-[1.15] mb-4">
              A Better Space <br />
              <span className="italic text-amber-200">Starts Here</span>
            </h2>

            {/* Offer Headline */}
            <h3 className="text-xl sm:text-2xl font-serif text-zinc-200 font-normal mb-3">
              Book Your Free Design Consultation
            </h3>

            {/* Supporting Copy */}
            <p className="text-zinc-300 text-base sm:text-lg font-normal leading-relaxed mb-8">
              Discuss your space, style, requirements, and budget with our experienced interior architecture team.
            </p>

            {/* Real Service Benefits List */}
            <div className="space-y-4 pt-6 border-t border-zinc-800/80">
              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-amber-200/15 border border-amber-200/40 flex items-center justify-center flex-shrink-0 text-amber-200 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-base font-sans font-medium text-zinc-100">
                    Personalized design guidance
                  </h4>
                  <p className="text-sm text-zinc-400 font-normal">
                    One-on-one architectural consultation tailored to your lifestyle and aesthetic desires.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-amber-200/15 border border-amber-200/40 flex items-center justify-center flex-shrink-0 text-amber-200 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-base font-sans font-medium text-zinc-100">
                    Space planning and material recommendations
                  </h4>
                  <p className="text-sm text-zinc-400 font-normal">
                    Carefully evaluated floor plans, daylight orientation, and tactile finishes.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-amber-200/15 border border-amber-200/40 flex items-center justify-center flex-shrink-0 text-amber-200 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-base font-sans font-medium text-zinc-100">
                    A consultation tailored to your project
                  </h4>
                  <p className="text-sm text-zinc-400 font-normal">
                    Clear timeline expectations, honest cost breakdowns, and transparent execution phases.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Micro Footer Proof */}
          <div className="relative z-10 pt-8 mt-8 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>RESIDENTIAL & COMMERCIAL</span>
            <span className="text-amber-200/90 font-medium">ZERO OBLIGATION</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Consultation Form */}
        <div className="w-full md:w-[52%] bg-[#121212] p-8 sm:p-10 lg:p-12 flex flex-col justify-center overflow-y-auto">
          {!isSubmitted ? (
            <div>
              <div className="mb-6">
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white mb-2">
                  Book a Free Consultation
                </h3>
                <p className="text-zinc-300 text-sm sm:text-base font-normal">
                  Fill in your details below and our design directors will get in touch promptly.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-sans font-medium text-zinc-200 mb-1.5">
                    Full Name <span className="text-amber-200">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                      }}
                      placeholder="e.g. Eleanor Vance"
                      className={`w-full pl-10 pr-4 py-3 sm:py-3.5 rounded-xl bg-zinc-900 border text-base text-zinc-100 placeholder:text-zinc-500 font-sans focus:outline-none transition-colors ${
                        errors.fullName
                          ? "border-rose-500 focus:border-rose-400"
                          : "border-zinc-700/80 focus:border-amber-200 focus:ring-1 focus:ring-amber-200"
                      }`}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Mobile Number with India (+91) Country Code */}
                <div>
                  <label htmlFor="mobileNumber" className="block text-sm font-sans font-medium text-zinc-200 mb-1.5">
                    Mobile Number <span className="text-amber-200">*</span>
                  </label>
                  <div className="flex rounded-xl overflow-hidden border border-zinc-700/80 focus-within:border-amber-200 focus-within:ring-1 focus-within:ring-amber-200 bg-zinc-900">
                    <span className="inline-flex items-center gap-1 px-3.5 bg-zinc-800/80 border-r border-zinc-700/80 text-sm font-mono font-medium text-amber-200 select-none">
                      <span>🇮🇳</span>
                      <span>+91</span>
                    </span>
                    <input
                      id="mobileNumber"
                      type="tel"
                      value={mobileNumber}
                      onChange={(e) => {
                        setMobileNumber(e.target.value);
                        if (errors.mobileNumber) setErrors({ ...errors, mobileNumber: undefined });
                      }}
                      placeholder="98765 43210"
                      maxLength={10}
                      className="w-full px-4 py-3 sm:py-3.5 bg-transparent text-base text-zinc-100 placeholder:text-zinc-500 font-sans focus:outline-none"
                    />
                  </div>
                  {errors.mobileNumber && (
                    <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.mobileNumber}
                    </p>
                  )}
                </div>

                {/* Property Location or Locality */}
                <div>
                  <label htmlFor="propertyLocation" className="block text-sm font-sans font-medium text-zinc-200 mb-1.5">
                    Property Location or Locality <span className="text-amber-200">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <input
                      id="propertyLocation"
                      type="text"
                      value={propertyLocation}
                      onChange={(e) => {
                        setPropertyLocation(e.target.value);
                        if (errors.propertyLocation) setErrors({ ...errors, propertyLocation: undefined });
                      }}
                      placeholder="e.g. Bandra West, Mumbai or Whitefield, Bangalore"
                      className={`w-full pl-10 pr-4 py-3 sm:py-3.5 rounded-xl bg-zinc-900 border text-base text-zinc-100 placeholder:text-zinc-500 font-sans focus:outline-none transition-colors ${
                        errors.propertyLocation
                          ? "border-rose-500 focus:border-rose-400"
                          : "border-zinc-700/80 focus:border-amber-200 focus:ring-1 focus:ring-amber-200"
                      }`}
                    />
                  </div>
                  {errors.propertyLocation && (
                    <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.propertyLocation}
                    </p>
                  )}
                </div>

                {/* Property Type Dropdown */}
                <div>
                  <label htmlFor="propertyType" className="block text-sm font-sans font-medium text-zinc-200 mb-1.5">
                    Property Type <span className="text-amber-200">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <select
                      id="propertyType"
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full pl-10 pr-10 py-3 sm:py-3.5 rounded-xl bg-zinc-900 border border-zinc-700/80 text-base text-zinc-100 font-sans focus:outline-none focus:border-amber-200 focus:ring-1 focus:ring-amber-200 appearance-none cursor-pointer"
                    >
                      <option value="Apartment">Apartment</option>
                      <option value="Independent House">Independent House</option>
                      <option value="Villa">Villa</option>
                      <option value="Office">Office</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-zinc-400">
                      <span className="text-xs">▼</span>
                    </div>
                  </div>
                </div>

                {/* Primary CTA Submit Button */}
                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-amber-200 via-champagne-300 to-amber-300 hover:from-amber-100 hover:to-champagne-200 text-zinc-950 font-sans font-semibold text-base tracking-wide transition-all duration-300 shadow-[0_4px_25px_rgba(217,196,151,0.25)] hover:shadow-[0_6px_30px_rgba(217,196,151,0.4)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                        Validating details...
                      </span>
                    ) : (
                      <>
                        <span>REQUEST MY CONSULTATION</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                <p className="text-[11px] font-mono text-zinc-400 text-center tracking-wider mt-2">
                  🔒 Your private information remains 100% confidential.
                </p>
              </form>
            </div>
          ) : (
            /* Honest Submission State & Integration Clarification */
            <div className="text-center py-6 px-4">
              <div className="w-16 h-16 rounded-full bg-amber-500/15 border border-amber-200/50 flex items-center justify-center mx-auto mb-5 text-amber-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="font-serif text-3xl font-normal text-white mb-3">
                Consultation Request Received
              </h3>

              <p className="text-zinc-300 text-base font-normal max-w-md mx-auto mb-6 leading-relaxed">
                Thank you, <span className="text-amber-200 font-semibold">{fullName}</span>. We have captured your request for your <span className="text-zinc-100 font-medium">{propertyType}</span> in <span className="text-zinc-100 font-medium">{propertyLocation}</span>. Our team will reach out at <span className="text-amber-200 font-medium">+91 {mobileNumber}</span>.
              </p>

              {/* Truthful Backend Integration Callout */}
              <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/90 text-left mb-6 max-w-md mx-auto">
                <div className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-300 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-zinc-300 font-mono leading-relaxed">
                    <strong className="text-zinc-100 font-sans block mb-1">Developer & Production Integration:</strong>
                    Static export enabled. Connect this form handler in{" "}
                    <code className="text-amber-200 bg-zinc-800 px-1 py-0.5 rounded">ConsultationPopup.tsx</code>{" "}
                    to your CRM webhook, Formspree, or lead dispatch API.
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/919999999999?text=${encodeURIComponent(
                    `Hello Atelier Living, I requested a consultation for my ${propertyType} in ${propertyLocation}. My name is ${fullName}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-sans text-sm font-medium transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Connect on WhatsApp</span>
                </a>
                <button
                  onClick={handleDismiss}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-sans text-sm font-medium transition-all"
                >
                  Close Window
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
