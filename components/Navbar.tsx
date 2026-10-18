"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("sequence");

  useEffect(() => {
    const sectionIds = ["sequence", "philosophy", "portfolio", "materials", "inquiry"];

    const handleScroll = () => {
      // Active section detection based on scroll offset
      const scrollPosition = window.scrollY + 240;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionIds[i]);
            return;
          }
        }
      }
      setActiveSection("sequence");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Residences", href: "#sequence", id: "sequence" },
    { name: "Philosophy", href: "#philosophy", id: "philosophy" },
    { name: "Selected Works", href: "#portfolio", id: "portfolio" },
    { name: "Materiality", href: "#materials", id: "materials" },
    { name: "Inquire", href: "#inquiry", id: "inquiry" },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setActiveSection(id);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className="fixed top-0 inset-x-0 z-40 bg-gradient-to-b from-black/80 via-black/35 to-transparent py-5 md:py-6 transition-all duration-300 ease-out"
      >
        <div className="w-full px-6 md:px-10 lg:px-12 xl:px-16 flex items-center justify-between">
          {/* Studio Brand / Enlarged Logo (Far Left) */}
          <a
            href="#"
            className="group flex items-center gap-3.5 md:gap-4 text-zinc-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-champagne-300/80 rounded-sm py-1 transition-opacity flex-shrink-0"
            aria-label="Atelier Living - Return to Top"
          >
            {/* Emblem Circle enlarged ~25-30% from 32px to 40px/44px */}
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-full border border-amber-200/50 flex items-center justify-center text-amber-200 font-serif text-[15px] md:text-[17px] font-medium tracking-wider group-hover:border-amber-200 group-hover:shadow-[0_0_16px_rgba(217,196,151,0.25)] transition-all duration-300 flex-shrink-0">
              AL
            </div>
            {/* Brand Title enlarged ~25% from 14-16px to 17-20px */}
            <div className="flex flex-col justify-center">
              <span className="font-serif tracking-[0.22em] text-[16px] sm:text-[18px] md:text-[20px] font-medium text-zinc-100 group-hover:text-amber-100 transition-colors leading-none">
                ATELIER LIVING
              </span>
              <span className="text-[10px] sm:text-[10.5px] md:text-[11.5px] font-mono uppercase tracking-[0.28em] text-zinc-400 group-hover:text-zinc-300 transition-colors mt-1 leading-none">
                Interior Architecture
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (Increased spacing between items, generous gap from logo, aligned neatly without overlapping CTA) */}
          <nav
            className="hidden lg:flex items-center gap-7 xl:gap-11 2xl:gap-14 ml-10 xl:ml-16 2xl:ml-24 mr-auto"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href, link.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`group relative py-2 px-1 text-[15px] xl:text-[16px] font-sans transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-champagne-300/80 rounded-sm whitespace-nowrap ${
                    isActive
                      ? "text-champagne-300 font-semibold"
                      : "text-zinc-200 hover:text-champagne-300 font-medium"
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>

                  {/* Refined Underline Accent: warm champagne hover & persistent active indicator */}
                  <span
                    className={`absolute bottom-0.5 left-0 right-0 h-[2px] rounded-full transition-all duration-300 ease-out ${
                      isActive
                        ? "bg-gradient-to-r from-champagne-400 via-champagne-300 to-champagne-200 opacity-100 scale-x-100 shadow-[0_0_8px_rgba(217,196,151,0.5)]"
                        : "bg-champagne-300/80 opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Action / CTA Button (Far Right) */}
          <div className="hidden sm:flex items-center flex-shrink-0">
            <a
              href="#inquiry"
              onClick={(e) => handleSmoothScroll(e, "#inquiry", "inquiry")}
              className="group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-champagne-300/50 bg-champagne-300/15 hover:bg-champagne-300 text-champagne-100 hover:text-obsidian text-[15px] xl:text-[16px] font-sans font-semibold tracking-wide shadow-[0_2px_15px_rgba(217,196,151,0.12)] hover:shadow-[0_4px_25px_rgba(217,196,151,0.3)] transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
            >
              <span>Private Consultation</span>
              <ArrowUpRight className="w-4 h-4 text-champagne-300 group-hover:text-obsidian group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 ease-out" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
            aria-expanded={mobileMenuOpen}
            className="lg:hidden p-2 text-zinc-200 hover:text-champagne-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-champagne-300/80 rounded-md transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-30 pt-28 px-8 bg-[#0a0a0a]/95 backdrop-blur-2xl flex flex-col justify-between pb-12 lg:hidden border-b border-zinc-800"
          >
            <div className="flex flex-col gap-6">
              <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-zinc-400">
                Studio Directory
              </span>
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href, link.id)}
                    className={`font-serif text-3xl font-light tracking-wide transition-colors flex items-center justify-between py-1 ${
                      isActive
                        ? "text-champagne-300 font-normal"
                        : "text-zinc-200 hover:text-champagne-300"
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-champagne-300 shadow-[0_0_8px_rgba(217,196,151,0.8)]" />
                    )}
                  </a>
                );
              })}
            </div>

            <div className="pt-8 border-t border-zinc-800 flex flex-col gap-4">
              <a
                href="#inquiry"
                onClick={(e) => handleSmoothScroll(e, "#inquiry", "inquiry")}
                className="w-full text-center py-4 rounded-full bg-champagne-300 hover:bg-champagne-200 text-obsidian font-sans font-medium text-sm tracking-wide shadow-md transition-colors"
              >
                Schedule Consultation
              </a>
              <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-zinc-500">
                <span>ZURICH · MILAN · NEW YORK</span>
                <span>© 2026</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
