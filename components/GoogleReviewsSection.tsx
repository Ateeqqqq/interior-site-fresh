"use client";

import React, { useRef } from "react";
import { Star, ArrowLeft, ArrowRight, ExternalLink, ShieldCheck, Info } from "lucide-react";
import { googleReviewsConfig } from "@/lib/googleReviewsConfig";

export default function GoogleReviewsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { isConfigured, overallRating, reviewCount, googleMapsUrl, reviews } = googleReviewsConfig;

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }
  };

  return (
    <section
      id="reviews"
      className="relative w-full py-28 md:py-36 bg-white text-zinc-900 border-t border-zinc-200 overflow-hidden"
    >
      <div className="w-full px-6 md:px-12 lg:px-16 2xl:px-24">
        {/* Header with Google Brand Mark */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div>
            {/* Google Brand Mark & Label */}
            <div className="flex items-center gap-2.5 mb-4">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-600 font-medium">
                Verified Google Reviews
              </span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-zinc-950 leading-tight">
              What Our Clients Say
            </h2>

            {/* Rating display only when verified */}
            {isConfigured && overallRating !== null ? (
              <div className="flex items-center gap-3 mt-4">
                <div className="flex items-center text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="text-base font-sans font-semibold text-zinc-900">
                  {overallRating.toFixed(1)} Rating
                </span>
                {reviewCount !== null && (
                  <span className="text-xs sm:text-sm font-mono text-zinc-600 font-medium">
                    ({reviewCount} verified reviews)
                  </span>
                )}
              </div>
            ) : (
              <p className="text-zinc-700 text-base font-normal mt-4 max-w-xl leading-relaxed">
                Transparent client feedback published directly via Google Business Profile.
              </p>
            )}
          </div>

          {/* Action buttons & carousel navigation */}
          <div className="flex items-center gap-4 self-start lg:self-end">
            {googleMapsUrl ? (
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-300 bg-white hover:bg-zinc-900 hover:text-white text-xs sm:text-sm font-mono uppercase tracking-wider text-zinc-900 font-medium transition-all shadow-sm"
              >
                <span>View on Google</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : null}

            <div className="flex items-center gap-2">
              <button
                onClick={scrollLeft}
                aria-label="Scroll reviews left"
                className="p-3.5 rounded-full border border-zinc-300 bg-white hover:bg-zinc-900 hover:text-white transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-800"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={scrollRight}
                aria-label="Scroll reviews right"
                className="p-3.5 rounded-full border border-zinc-300 bg-white hover:bg-zinc-900 hover:text-white transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-800"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Horizontal Container */}
        {isConfigured && reviews.length > 0 ? (
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="flex-shrink-0 w-[300px] sm:w-[350px] md:w-[400px] bg-white border border-zinc-200 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-sm snap-start"
              >
                <div>
                  {/* Reviewer Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center font-serif text-base font-semibold text-zinc-900">
                        {rev.authorName.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-sans font-semibold text-base text-zinc-950">
                          {rev.authorName}
                        </h4>
                        <span className="text-xs font-mono text-zinc-500 block">
                          {rev.relativeTime}
                        </span>
                      </div>
                    </div>
                    {/* Star Rating */}
                    <div className="flex text-amber-500">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-zinc-800 text-base font-normal leading-relaxed">
                    “{rev.reviewText}”
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-zinc-100 flex items-center gap-1.5 text-xs font-mono text-zinc-600 uppercase tracking-widest font-medium">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Google Verified Review</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Honest Data-Driven Integration Prompt: No fabricated fake reviews */
          <div className="p-8 sm:p-12 rounded-2xl bg-zinc-50 border border-zinc-200/90 shadow-sm">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-800 bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-full w-fit mb-4 font-medium">
                <Info className="w-4 h-4" />
                <span>Google Business Profile Integration Ready</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-zinc-950 mb-3 font-normal">
                Authentic Google Reviews Ready for Connection
              </h3>
              <p className="text-zinc-700 text-base font-normal leading-relaxed mb-6">
                To guarantee genuine authenticity and consumer transparency, Atelier Living displays
                only real client reviews sourced directly from an active Google Business Profile.
                Add your verified Google reviews or Place ID in{" "}
                <code className="text-zinc-950 bg-zinc-200/90 border border-zinc-300 px-2 py-0.5 rounded font-mono text-xs">
                  lib/googleReviewsConfig.ts
                </code>{" "}
                to populate this section live.
              </p>
              <div className="flex flex-wrap items-center gap-5 text-xs sm:text-sm font-mono text-zinc-600 font-medium">
                <span>· 0 Fake Testimonials Policy</span>
                <span>· Google Maps Places API Ready</span>
                <span>· Fully Responsive Carousel</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
