import React from "react";
import Navbar from "@/components/Navbar";
import InteriorCanvasScroll from "@/components/InteriorCanvasScroll";
import PhilosophySection from "@/components/PhilosophySection";
import CollectionsSection from "@/components/CollectionsSection";
import PortfolioSection from "@/components/PortfolioSection";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ServicesSection from "@/components/ServicesSection";
import MaterialitySection from "@/components/MaterialitySection";
import ApproachSection from "@/components/ApproachSection";
import AboutDesignerSection from "@/components/AboutDesignerSection";
import InteriorPackagesSection from "@/components/InteriorPackagesSection";
import InquirySection from "@/components/InquirySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import GoogleReviewsSection from "@/components/GoogleReviewsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-zinc-100 selection:bg-amber-200/20 selection:text-amber-100">
      {/* Editorial Floating Navbar */}
      <Navbar />

      {/* Main Feature: 400vh Scroll-Linked Canvas Scrollytelling Experience */}
      <section id="sequence" className="relative w-full">
        <InteriorCanvasScroll />
      </section>

      {/* Philosophy & Architectural Ethos */}
      <PhilosophySection />

      {/* 1. Reference 1: Collections Section (Large outlined COLLECTIONS, 5 staggered categories, dotted motif) */}
      <CollectionsSection />

      {/* Selected Portfolio of Complementary Spaces */}
      <PortfolioSection />

      {/* Before & After Renovation Transformation Comparison */}
      <BeforeAfterSlider />

      {/* 4. Reference 3: Services Showcase (Your One-Stop Destination for Interior Design, 4 service cards) */}
      <ServicesSection />

      {/* Interactive Tactile Materiality & Finishes Explorer */}
      <MaterialitySection />

      {/* 2. Reference 2: Approach / Process Section (Our Approach, 3 offset rectangular panels 01, 02, 03) */}
      <ApproachSection />

      {/* About the Founder & Design Professional (Spaces Designed Around the Way You Live) */}
      <AboutDesignerSection />

      {/* Premium Interior Packages (Gold, Platinum, Titanium 3BHK) */}
      <InteriorPackagesSection />

      {/* Private Commission Inquiry & Consultation */}
      <InquirySection />

      {/* 5. Reference 4: Client Testimonials Section (3 horizontal cards with video support) */}
      <TestimonialsSection />

      {/* 3. Dedicated Genuine Google Reviews Section (Immediately before existing footer) */}
      <GoogleReviewsSection />

      {/* Editorial Consultation Footer */}
      <Footer />
    </main>
  );
}
