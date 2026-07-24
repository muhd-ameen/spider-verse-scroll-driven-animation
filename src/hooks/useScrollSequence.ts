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
}

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
      ctx.drawImage(img, dx, dy, drawW, drawH);
    };

    // Called on every scrubbed tick; skips work when the frame is unchanged.
    const render = () => {
      const index = Math.min(
        totalFrames - 1,
        Math.max(0, Math.round(playhead.frame)),
      );
      if (index === currentFrame) return;
      currentFrame = index;
      drawFrame(index);
    };

    const forceRedraw = () => {
      currentFrame = -1;
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

    return () => {
      cancelAnimationFrame(resizeRaf);
      observer.disconnect();
      redrawRef.current = null;
      gsapCtx.revert();
    };
    // Refs are stable; primitive options are the only meaningful inputs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalFrames, scrub, fit]);

  // Paint the opening frame the instant the first image finishes decoding.
  useEffect(() => {
    if (isReady) redrawRef.current?.();
  }, [isReady]);
}
