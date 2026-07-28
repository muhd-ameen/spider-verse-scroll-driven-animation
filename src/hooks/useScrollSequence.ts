"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ScrollSequenceOptions {
  /** Tall, empty element that provides the scroll distance for the intro. */
  spacerRef: React.RefObject<HTMLDivElement | null>;
  /** The <canvas> the frames are painted onto. */
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  /** Fixed, full-viewport layer holding the canvas; fades out at the end. */
  canvasLayerRef: React.RefObject<HTMLDivElement | null>;
  /** Optional scroll-hint overlay; fades out as soon as scrubbing begins. */
  overlayRef?: React.RefObject<HTMLDivElement | null>;
  /** Preloaded frames from useImageSequence. */
  images: React.RefObject<HTMLImageElement[]>;
  totalFrames: number;
  /** Flips true once the first frame is decoded, so it can be drawn. */
  isReady: boolean;
  /** ScrollTrigger scrub smoothing (seconds), or true for 1:1. Default 0.6. */
  scrub?: number | boolean;
  /** How the frame fills the canvas. Default "cover". */
  fit?: "cover" | "contain";
  /** Scroll speed (px/s) at which the RGB split maxes out. Default 2600. */
  aberrationVelocity?: number;
}

/** Isolates one channel when multiplied over the frame. R, G, B in order. */
const CHANNEL_PLATES = ["#ff0000", "#00ff00", "#0000ff"];

/** Below this the split is invisible, so take the cheap single-draw path. */
const MIN_VISIBLE_SHIFT = 0.6;

/**
 * Drives a scroll-scrubbed canvas image sequence with GSAP ScrollTrigger.
 *
 * The canvas lives in a fixed, full-viewport layer that sits *above* the rest
 * of the page (nav included) during the intro, so nothing but the animation is
 * visible. Scroll maps to a frame index; only integer frame changes repaint.
 * Near the end the whole layer fades out, revealing the real page beneath, a
 * clean crossfade from the final frame to the hero.
 *
 *   - reads scroll progress from an empty spacer (no pinning needed)
 *   - respects prefers-reduced-motion (no scroll hijack, page shown normally)
 *   - all GSAP work lives in a gsap.context for one-call revert() cleanup
 */
export function useScrollSequence({
  spacerRef,
  canvasRef,
  canvasLayerRef,
  overlayRef,
  images,
  totalFrames,
  isReady,
  scrub = 0.6,
  fit = "cover",
  aberrationVelocity = 2600,
}: ScrollSequenceOptions): void {
  // Lets the "draw the first frame once it's ready" effect reach into the
  // live drawing closure created by the setup effect below.
  const redrawRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const spacer = spacerRef.current;
    const canvas = canvasRef.current;
    const canvasLayer = canvasLayerRef.current;
    const overlay = overlayRef?.current ?? null;
    if (!spacer || !canvas || !canvasLayer) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Playhead is a plain object GSAP tweens; `frame` is fractional and gets
    // rounded to the nearest real frame on draw.
    const playhead = { frame: 0 };
    let currentFrame = -1;
    let cssWidth = 0;
    let cssHeight = 0;
    let resizeRaf = 0;

    // Scroll speed, normalised 0..1, eased toward the target and decaying to
    // rest so the split settles the moment you stop scrubbing.
    let aberration = 0;
    let aberrationTarget = 0;
    let drawnAberration = -1;

    // Scratch buffer for the channel-separation pass. Allocated once and
    // resized with the canvas; only touched while the split is visible.
    const buffer = document.createElement("canvas");
    const bufferCtx = buffer.getContext("2d", { alpha: false });

    const drawFrame = (index: number) => {
      const img = images.current[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const scale =
        fit === "contain"
          ? Math.min(cssWidth / iw, cssHeight / ih)
          : Math.max(cssWidth / iw, cssHeight / ih);
      const drawW = iw * scale;
      const drawH = ih * scale;
      const dx = (cssWidth - drawW) / 2;
      const dy = (cssHeight - drawH) / 2;

      ctx.clearRect(0, 0, cssWidth, cssHeight);

      // Split scales with the viewport so it reads the same on any screen.
      const shift = aberration * Math.min(cssWidth * 0.014, 20);
      if (shift < MIN_VISIBLE_SHIFT || !bufferCtx) {
        ctx.globalCompositeOperation = "source-over";
        ctx.drawImage(img, dx, dy, drawW, drawH);
        return;
      }

      // Separate the frame into R/G/B plates, then re-register them additively
      // a few pixels apart. `lighter` sums to the original when shift is 0, so
      // the effect fades out cleanly instead of popping.
      ctx.globalCompositeOperation = "lighter";
      for (let plate = 0; plate < 3; plate++) {
        // `copy` wipes the buffer and redraws in one op, so no clearRect.
        bufferCtx.globalCompositeOperation = "copy";
        bufferCtx.drawImage(img, dx, dy, drawW, drawH);
        bufferCtx.globalCompositeOperation = "multiply";
        bufferCtx.fillStyle = CHANNEL_PLATES[plate];
        bufferCtx.fillRect(0, 0, cssWidth, cssHeight);

        // Red drifts one way, blue the other, green holds the centre. The
        // slight vertical skew keeps it from looking like a clean CSS offset.
        const offset = (1 - plate) * shift;
        ctx.drawImage(buffer, offset, offset * -0.18, cssWidth, cssHeight);
      }
      ctx.globalCompositeOperation = "source-over";
    };

    // Called on every scrubbed tick; skips work when nothing visible changed.
    const render = () => {
      const index = Math.min(
        totalFrames - 1,
        Math.max(0, Math.round(playhead.frame)),
      );
      if (index === currentFrame && aberration === drawnAberration) return;
      currentFrame = index;
      drawnAberration = aberration;
      drawFrame(index);
    };

    const forceRedraw = () => {
      currentFrame = -1;
      drawnAberration = -1;
      render();
    };
    redrawRef.current = forceRedraw;

    const resize = () => {
      const rect = canvasLayer.getBoundingClientRect();
      cssWidth = rect.width;
      cssHeight = rect.height;
      // Cap DPR at 2. Beyond that the extra pixels cost more than they show.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(cssWidth * dpr);
      canvas.height = Math.round(cssHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buffer.width = canvas.width;
      buffer.height = canvas.height;
      bufferCtx?.setTransform(dpr, 0, 0, dpr, 0, 0);
      forceRedraw();
    };

    // Coalesce resize bursts into a single rAF-aligned repaint.
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(resize);
    });
    observer.observe(canvasLayer);
    resize();

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const gsapCtx = gsap.context(() => {
      if (prefersReducedMotion) {
        // Accessibility path: no scroll hijack. Drop the intro overlay and
        // collapse the spacer so the real page shows immediately.
        gsap.set(canvasLayer, { display: "none" });
        spacer.style.height = "0px";
        return;
      }

      gsap.set(canvasLayer, { autoAlpha: 1 });
      if (overlay) gsap.set(overlay, { autoAlpha: 1 });

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: spacer,
          start: "top top",
          end: "bottom top",
          scrub,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            aberrationTarget = Math.min(
              1,
              Math.abs(self.getVelocity()) / aberrationVelocity,
            );
          },
        },
      });

      // 0 -> 0.82 : scrub through the frames.
      timeline.to(
        playhead,
        { frame: totalFrames - 1, duration: 0.82, onUpdate: render },
        0,
      );

      // The scroll hint disappears the moment the user starts scrubbing.
      if (overlay) {
        timeline.to(overlay, { autoAlpha: 0, duration: 0.1 }, 0);
      }

      // 0.85 -> 1 : hold the final frame, then fade the whole layer out to
      // reveal the page (nav, hero, everything) beneath.
      timeline.to(
        canvasLayer,
        { autoAlpha: 0, duration: 0.15, ease: "power1.inOut" },
        0.85,
      );
    }, canvasLayer);

    // ScrollTrigger only reports velocity while the scroll position changes,
    // so the split has to be relaxed on its own clock — otherwise it freezes
    // at whatever value it held when the user stopped.
    const relax = () => {
      aberrationTarget *= 0.9;
      aberration += (aberrationTarget - aberration) * 0.18;
      if (aberration < 0.004) aberration = 0;
      if (Math.abs(aberration - drawnAberration) > 0.008) render();
    };
    if (!prefersReducedMotion) gsap.ticker.add(relax);

    return () => {
      cancelAnimationFrame(resizeRaf);
      observer.disconnect();
      gsap.ticker.remove(relax);
      redrawRef.current = null;
      gsapCtx.revert();
    };
    // Refs are stable; primitive options are the only meaningful inputs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalFrames, scrub, fit, aberrationVelocity]);

  // Paint the opening frame the instant the first image finishes decoding.
  useEffect(() => {
    if (isReady) redrawRef.current?.();
  }, [isReady]);
}
