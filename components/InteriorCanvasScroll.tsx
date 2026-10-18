"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, Compass, Sparkles, Volume2, VolumeX } from "lucide-react";

const TOTAL_FRAMES = 174;

interface InteriorCanvasScrollProps {
  onPreloadComplete?: () => void;
}

export default function InteriorCanvasScroll({ onPreloadComplete }: InteriorCanvasScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);

  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isPreloaded, setIsPreloaded] = useState<boolean>(false);
  const [currentFrameDisplay, setCurrentFrameDisplay] = useState<number>(0);
  const [ambientAudio, setAmbientAudio] = useState<boolean>(false);

  // Generous 400vh scroll travel container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth weighted physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.0001,
  });

  // Beat 1: 0% – 20%
  const beat1Opacity = useTransform(smoothProgress, [0, 0.02, 0.16, 0.22], [1, 1, 0.9, 0]);
  const beat1Y = useTransform(smoothProgress, [0, 0.22], [0, -30]);
  const scrollCueOpacity = useTransform(smoothProgress, [0, 0.06, 0.10], [1, 0.8, 0]);

  // Beat 2: 25% – 45% (Left aligned)
  const beat2Opacity = useTransform(smoothProgress, [0.22, 0.26, 0.42, 0.48], [0, 1, 1, 0]);
  const beat2Y = useTransform(smoothProgress, [0.22, 0.26, 0.42, 0.48], [30, 0, 0, -25]);

  // Beat 3: 50% – 70% (Right aligned)
  const beat3Opacity = useTransform(smoothProgress, [0.48, 0.52, 0.68, 0.73], [0, 1, 1, 0]);
  const beat3Y = useTransform(smoothProgress, [0.48, 0.52, 0.68, 0.73], [30, 0, 0, -25]);

  // Beat 4: 75% – 95% (Full Atmospheric Reveal)
  const beat4Opacity = useTransform(smoothProgress, [0.73, 0.77, 0.95, 1.0], [0, 1, 1, 0.7]);
  const beat4Y = useTransform(smoothProgress, [0.73, 0.77, 0.95], [30, 0, 0]);

  // Draw frame with aspect ratio cover logic and Retina DPR scaling
  const renderFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    const targetWidth = Math.floor(displayWidth * dpr);
    const targetHeight = Math.floor(displayHeight * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, displayWidth, displayHeight);

    // Cover math
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = displayWidth / displayHeight;
    let drawWidth = displayWidth;
    let drawHeight = displayHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawWidth = displayWidth;
      drawHeight = displayWidth / imgRatio;
      offsetY = (displayHeight - drawHeight) / 2;
    } else {
      drawHeight = displayHeight;
      drawWidth = displayHeight * imgRatio;
      offsetX = (displayWidth - drawWidth) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    ctx.restore();
  }, []);

  // Preload images sequentially from /sequence/frame_0.jpg to frame_173.jpg
  useEffect(() => {
    let isCancelled = false;
    const imgs: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/sequence/frame_${i}.jpg`;

      img.onload = () => {
        if (isCancelled) return;
        loaded++;
        setLoadedCount(loaded);

        // Render first frame as soon as it's ready
        if (i === 0) {
          renderFrame(0);
        }

        if (loaded >= TOTAL_FRAMES) {
          setIsPreloaded(true);
          if (onPreloadComplete) onPreloadComplete();
        }
      };

      img.onerror = () => {
        if (isCancelled) return;
        // Fallback or retry
        loaded++;
        setLoadedCount(loaded);
        if (loaded >= TOTAL_FRAMES) {
          setIsPreloaded(true);
          if (onPreloadComplete) onPreloadComplete();
        }
      };

      imgs.push(img);
    }

    imagesRef.current = imgs;

    // Safety timeout: if any frame stalls on slow connections, reveal after 5 seconds anyway
    const safetyTimer = setTimeout(() => {
      setIsPreloaded(true);
      if (onPreloadComplete) onPreloadComplete();
    }, 6000);

    return () => {
      isCancelled = true;
      clearTimeout(safetyTimer);
    };
  }, [renderFrame, onPreloadComplete]);

  // Subscribe to smooth scroll updates to update canvas frame
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      const clamped = Math.max(0, Math.min(1, latest));
      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(clamped * (TOTAL_FRAMES - 1)))
      );

      if (currentFrameRef.current !== frameIndex) {
        currentFrameRef.current = frameIndex;
        setCurrentFrameDisplay(frameIndex);
        requestAnimationFrame(() => renderFrame(frameIndex));
      }
    });

    return () => unsubscribe();
  }, [smoothProgress, renderFrame]);

  // Handle window resizing
  useEffect(() => {
    const handleResize = () => {
      renderFrame(currentFrameRef.current);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [renderFrame]);

  const preloadPercent = Math.min(100, Math.round((loadedCount / TOTAL_FRAMES) * 100));

  // Determine current active beat label for the HUD
  const getBeatLabel = () => {
    if (currentFrameDisplay < 35) return "I · SPACES SHAPED BY LIGHT";
    if (currentFrameDisplay < 85) return "II · TACTILE SIMPLICITY";
    if (currentFrameDisplay < 130) return "III · LIVING ARCHITECTURE";
    return "IV · SANCTUARY REVEAL";
  };

  const scrollToInquiry = () => {
    const el = document.getElementById("inquiry");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Editorial Preloader */}
      <AnimatePresence>
        {!isPreloaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a] text-zinc-100"
          >
            <div className="relative flex flex-col items-center max-w-md px-6 text-center">
              {/* Monogram emblem */}
              <div className="w-16 h-16 mb-8 rounded-full border border-amber-200/30 flex items-center justify-center">
                <span className="font-serif text-2xl tracking-widest text-amber-200">AL</span>
              </div>

              <div className="font-serif text-xs uppercase tracking-[0.3em] text-zinc-400 mb-2">
                Atelier Living · Architectural Sequence
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-light tracking-wide text-zinc-100 mb-8">
                Spaces Shaped by Light
              </h2>

              {/* Progress Bar & Percentage */}
              <div className="w-64 h-[2px] bg-zinc-800 rounded-full overflow-hidden mb-4 relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-300 via-amber-200 to-amber-100"
                  style={{ width: `${preloadPercent}%` }}
                  transition={{ ease: "linear", duration: 0.1 }}
                />
              </div>

              <div className="flex items-center justify-between w-64 text-[11px] font-mono tracking-widest text-zinc-400">
                <span>CACHING FRAMES</span>
                <span className="text-amber-200/90">{preloadPercent}%</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 400vh Scroll Container */}
      <div ref={containerRef} className="relative w-full h-[400vh] bg-[#0a0a0a]">
        {/* Sticky Viewport */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* HTML5 Canvas with device pixel ratio scaling */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full block object-cover"
          />

          {/* Deep Architectural Obsidian Edge Gradients (Blends room canvas into #0a0a0a) */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-transparent opacity-60 h-32" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent h-40" />
          <div className="pointer-events-none absolute inset-y-0 left-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent opacity-40 w-24 md:w-40" />
          <div className="pointer-events-none absolute inset-y-0 right-0 bg-gradient-to-l from-[#0a0a0a] via-transparent to-transparent opacity-40 w-24 md:w-40" />

          {/* Minimal Editorial HUD / Telemetry (Top right & bottom right) */}
          <div className="absolute top-24 right-6 md:right-12 z-20 hidden md:flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-400/80">
            <div className="px-3 py-1.5 rounded-full border border-zinc-800/80 bg-black/40 backdrop-blur-md">
              <span className="text-amber-200/90 font-medium">FRAME</span>{" "}
              {String(currentFrameDisplay + 1).padStart(3, "0")} / {TOTAL_FRAMES}
            </div>
            <div className="px-3 py-1.5 rounded-full border border-zinc-800/80 bg-black/40 backdrop-blur-md text-zinc-300">
              {getBeatLabel()}
            </div>
          </div>

          {/* Audio toggle button for ambient atmosphere */}
          <button
            onClick={() => setAmbientAudio(!ambientAudio)}
            aria-label="Toggle atmospheric sound"
            className="absolute bottom-6 right-6 md:right-12 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-800/80 bg-black/40 backdrop-blur-md text-[10px] uppercase font-mono tracking-widest text-zinc-400 hover:text-amber-200 hover:border-amber-200/40 transition-all duration-300"
          >
            {ambientAudio ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-amber-200" />
                <span>Atmosphere: On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
                <span>Atmosphere: Mute</span>
              </>
            )}
          </button>

          {/* ======================================================== */}
          {/* STORYTELLING BEATS SYNCHRONIZED WITH THE ANIMATION      */}
          {/* ======================================================== */}

          {/* BEAT 1 (0% – 20% Scroll | Still Room State) */}
          <motion.div
            style={{ opacity: beat1Opacity, y: beat1Y }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-6 text-center select-none"
          >
            <div className="max-w-4xl mx-auto flex flex-col items-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-amber-200/40 bg-black/60 backdrop-blur-md text-xs font-mono uppercase tracking-[0.25em] text-amber-200 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
                ARCHITECTURAL RESIDENCES · 2026
              </div>

              {/* Headline */}
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-white leading-[1.05] mb-6">
                SPACES SHAPED <br className="hidden sm:inline" />
                <span className="italic font-light text-amber-100">BY LIGHT</span>
              </h1>

              {/* Subtitle */}
              <p className="max-w-2xl text-base sm:text-lg md:text-xl text-zinc-200 font-normal leading-relaxed tracking-wide">
                Bespoke interior architecture crafted around natural daylight, organic harmony, and quiet luxury.
              </p>
            </div>

            {/* Scroll to Explore cue (fades past 10% scroll) */}
            <motion.div
              style={{ opacity: scrollCueOpacity }}
              className="absolute bottom-10 inset-x-0 flex flex-col items-center justify-center gap-3 text-zinc-300"
            >
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-zinc-300 font-medium">
                <span>SCROLL TO EXPLORE</span>
              </div>
              <div className="w-5 h-9 rounded-full border border-zinc-500/80 flex items-start justify-center p-1">
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                  className="w-1.5 h-1.5 rounded-full bg-amber-200"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* BEAT 2 (25% – 45% Scroll | Sunlight Penetrates & Air Enters) - Left Aligned */}
          <motion.div
            style={{ opacity: beat2Opacity, y: beat2Y }}
            className="absolute inset-y-0 left-0 z-10 flex items-center pointer-events-none p-6 md:p-16 lg:p-24 select-none max-w-2xl"
          >
            <div className="editorial-glass rounded-2xl p-8 md:p-10 pointer-events-auto border border-zinc-600/60 shadow-2xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-4 rounded-full border border-amber-200/40 bg-amber-500/15 text-xs font-mono uppercase tracking-[0.2em] text-amber-200 font-medium">
                THE CRAFT
              </div>

              {/* Headline */}
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white leading-tight mb-4">
                TACTILE <br />
                <span className="italic font-light text-zinc-200">SIMPLICITY</span>
              </h2>

              {/* Subtitle */}
              <p className="text-base md:text-lg text-zinc-200 font-normal leading-relaxed mb-6">
                Custom textured linen, solid smoked oak, and natural travertine surfaces selected to age gracefully with time.
              </p>

              {/* Detail specs */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-700/80 text-xs sm:text-sm font-mono tracking-wider text-zinc-200">
                <div>
                  <span className="text-zinc-400 block text-[10px] font-semibold tracking-widest uppercase">SURFACE</span>
                  Smoked Oak & Travertine
                </div>
                <div>
                  <span className="text-zinc-400 block text-[10px] font-semibold tracking-widest uppercase">LIGHT ORIENTATION</span>
                  South-East Golden Hour
                </div>
              </div>
            </div>
          </motion.div>

          {/* BEAT 3 (50% – 70% Scroll | Curtains Billow & Dust Motes Drift) - Right Aligned */}
          <motion.div
            style={{ opacity: beat3Opacity, y: beat3Y }}
            className="absolute inset-y-0 right-0 z-10 flex items-center justify-end pointer-events-none p-6 md:p-16 lg:p-24 select-none max-w-2xl ml-auto"
          >
            <div className="editorial-glass rounded-2xl p-8 md:p-10 pointer-events-auto border border-zinc-600/60 shadow-2xl text-right">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-4 rounded-full border border-amber-200/40 bg-amber-500/15 text-xs font-mono uppercase tracking-[0.2em] text-amber-200 font-medium">
                LIVING ARCHITECTURE
              </div>

              {/* Headline */}
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white leading-tight mb-4">
                IN HARMONY <br />
                <span className="italic font-light text-zinc-200">WITH NATURE</span>
              </h2>

              {/* Subtitle */}
              <p className="text-base md:text-lg text-zinc-200 font-normal leading-relaxed mb-6">
                Floor-to-ceiling glass and flowing sheer textiles designed to breathe with the morning breeze.
              </p>

              {/* Detail specs */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-700/80 text-xs sm:text-sm font-mono tracking-wider text-zinc-200 text-left">
                <div>
                  <span className="text-zinc-400 block text-[10px] font-semibold tracking-widest uppercase">TEXTILES</span>
                  Belgian Sheer Linen
                </div>
                <div>
                  <span className="text-zinc-400 block text-[10px] font-semibold tracking-widest uppercase">ACOUSTIC RATING</span>
                  -34dB Pure Sanctuary
                </div>
              </div>
            </div>
          </motion.div>

          {/* BEAT 4 (75% – 95% Scroll | Full Atmospheric Reveal) - Centered Grand Finish */}
          <motion.div
            style={{ opacity: beat4Opacity, y: beat4Y }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center select-none"
          >
            <div className="max-w-3xl mx-auto flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 rounded-full border border-amber-200/40 bg-amber-500/15 text-xs font-mono uppercase tracking-[0.25em] text-amber-200 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                THE FINAL REVEAL
              </div>

              {/* Headline */}
              <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight text-white leading-[1.1] mb-6">
                CRAFT YOUR <br />
                <span className="italic font-light text-amber-200">SANCTUARY</span>
              </h2>

              {/* Subtitle */}
              <p className="max-w-2xl text-base sm:text-lg md:text-xl text-zinc-200 font-normal leading-relaxed mb-8">
                Currently accepting bespoke residential and hospitality commissions for 2026–2027.
              </p>

              {/* Sleek pill CTA button */}
              <button
                onClick={scrollToInquiry}
                className="group relative inline-flex items-center gap-3 px-9 py-4.5 rounded-full bg-zinc-100 hover:bg-amber-100 text-zinc-950 font-semibold text-base tracking-wide transition-all duration-300 shadow-[0_0_35px_rgba(255,255,255,0.2)] hover:shadow-[0_0_45px_rgba(223,192,139,0.35)] hover:scale-105"
              >
                <span>Schedule a Private Consultation</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
