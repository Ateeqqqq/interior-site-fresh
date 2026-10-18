"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp, Mail, MapPin, Award, Compass } from "lucide-react";

export default function Footer() {
  const [zurichTime, setZurichTime] = useState("");
  const [nyTime, setNyTime] = useState("");
  const [tokyoTime, setTokyoTime] = useState("");

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setZurichTime(
        now.toLocaleTimeString("en-GB", {
          timeZone: "Europe/Zurich",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
      setNyTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "America/New_York",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
      setTokyoTime(
        now.toLocaleTimeString("ja-JP", {
          timeZone: "Asia/Tokyo",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#070707] text-zinc-100 border-t border-zinc-800/80 pt-24 pb-16 px-6 md:px-12 lg:px-16 2xl:px-24 overflow-hidden w-full">
      <div className="w-full">
        {/* Top Grand Studio Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-800/80 pb-16 mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full border border-amber-200/50 flex items-center justify-center text-amber-200 font-serif text-base font-medium">
                AL
              </div>
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-300 font-medium">
                Atelier Living Studio · Est. 2018
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-white leading-tight">
              Spaces Designed to <br />
              <span className="italic font-light text-amber-200">Transcend Time.</span>
            </h2>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="self-start md:self-end flex items-center gap-3 px-6 py-3 rounded-full border border-zinc-700 bg-zinc-900/80 hover:border-amber-200 hover:text-amber-200 transition-all text-xs sm:text-sm font-mono tracking-widest text-zinc-300 font-medium"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Global Studios / Timezones Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="p-7 rounded-2xl bg-zinc-950/80 border border-zinc-800 shadow-md">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-3 font-medium">
              <span>HEADQUARTERS</span>
              <span className="text-amber-200 font-semibold">{zurichTime || "14:20"} CET</span>
            </div>
            <h4 className="font-serif text-2xl text-white font-normal mb-1">Zurich</h4>
            <p className="text-sm text-zinc-300 font-normal leading-relaxed">
              Bahnhofstrasse 14, 8001 Zürich
            </p>
            <div className="text-xs sm:text-sm font-mono text-amber-200/90 font-medium mt-3">
              zurich@atelierliving.com
            </div>
          </div>

          <div className="p-7 rounded-2xl bg-zinc-950/80 border border-zinc-800 shadow-md">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-3 font-medium">
              <span>DESIGN ATELIER</span>
              <span className="text-amber-200 font-semibold">{zurichTime || "14:20"} CET</span>
            </div>
            <h4 className="font-serif text-2xl text-white font-normal mb-1">Milan</h4>
            <p className="text-sm text-zinc-300 font-normal leading-relaxed">
              Via Monte Napoleone 8, 20121 Milano
            </p>
            <div className="text-xs sm:text-sm font-mono text-amber-200/90 font-medium mt-3">
              milano@atelierliving.com
            </div>
          </div>

          <div className="p-7 rounded-2xl bg-zinc-950/80 border border-zinc-800 shadow-md">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-3 font-medium">
              <span>AMERICAS PRACTICE</span>
              <span className="text-amber-200 font-semibold">{nyTime || "08:20"} EST</span>
            </div>
            <h4 className="font-serif text-2xl text-white font-normal mb-1">New York</h4>
            <p className="text-sm text-zinc-300 font-normal leading-relaxed">
              68 Franklin Street, Tribeca, NY 10013
            </p>
            <div className="text-xs sm:text-sm font-mono text-amber-200/90 font-medium mt-3">
              newyork@atelierliving.com
            </div>
          </div>

          <div className="p-7 rounded-2xl bg-zinc-950/80 border border-zinc-800 shadow-md">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-3 font-medium">
              <span>ASIA LIASON</span>
              <span className="text-amber-200 font-semibold">{tokyoTime || "22:20"} JST</span>
            </div>
            <h4 className="font-serif text-2xl text-white font-normal mb-1">Tokyo</h4>
            <p className="text-sm text-zinc-300 font-normal leading-relaxed">
              5-7-2 Minami-Aoyama, Minato-ku, Tokyo
            </p>
            <div className="text-xs sm:text-sm font-mono text-amber-200/90 font-medium mt-3">
              tokyo@atelierliving.com
            </div>
          </div>
        </div>

        {/* Accreditations & Press Badges */}
        <div className="p-8 rounded-2xl bg-zinc-950/80 border border-zinc-800 flex flex-wrap items-center justify-between gap-6 mb-16 shadow-lg">
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-amber-200" />
            <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-zinc-200 font-medium">
              International Recognition & Accreditations
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm font-mono text-zinc-300 font-medium">
            <span>AD100 · 2025</span>
            <span className="text-zinc-600">|</span>
            <span>WALLPAPER* DESIGN AWARDS</span>
            <span className="text-zinc-600">|</span>
            <span>WORLD ARCHITECTURE FESTIVAL</span>
            <span className="text-zinc-600">|</span>
            <span>ELLE DÉCOR A-LIST</span>
          </div>
        </div>

        {/* Bottom Legal & Colophon */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm font-mono text-zinc-400 pt-8 border-t border-zinc-900 gap-4">
          <div>
            © 2026 ATELIER LIVING ARCHITECTURAL RESIDENCES. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-amber-200 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-amber-200 transition-colors">
              Terms of Engagement
            </a>
            <a href="#" className="hover:text-amber-200 transition-colors">
              Artisan Colophon
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
