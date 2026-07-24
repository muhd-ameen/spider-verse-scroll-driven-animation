"use client";

import { useRef } from "react";
import { useImageSequence } from "@/hooks/useImageSequence";
import { useScrollSequence } from "@/hooks/useScrollSequence";

interface HeroSequenceProps {
  /** Number of frames in the sequence, e.g. 241. */
  totalFrames: number;
  /** ffmpeg-style path pattern, e.g. "/frames/frame_%04d.webp". */
  imagePathPattern: string;
  /** Intro scroll length as a multiple of viewport height. Default 4. */
  scrollDistanceFactor?: number;
}

/**
 * A scroll-scrubbed canvas image sequence that plays as a cinematic intro.
 *
 * The frames render onto a single fixed, full-viewport <canvas> that overlays
 * the entire page, so the ticker and nav stay hidden while the animation runs.
 * When the sequence ends the overlay fades out, revealing the ticker, nav and
 * hero together. No <video>, no swapped <img> elements, just one canvas.
 *
 * Render this immediately before the normal page content; its spacer provides
 * the scroll distance the intro scrubs across.
 */
export default function HeroSequence({
  totalFrames,
  imagePathPattern,
  scrollDistanceFactor = 4,
}: HeroSequenceProps) {
  const spacerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasLayerRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const { images, isReady, progress } = useImageSequence(
    totalFrames,
    imagePathPattern,
  );

  useScrollSequence({
    spacerRef,
    canvasRef,
    canvasLayerRef,
    overlayRef,
    images,
    totalFrames,
    isReady,
  });

  const loadPercent = Math.round(progress * 100);

  return (
    <>
      {/* Fixed, full-viewport overlay. Sits above the ticker + nav (z-50)
          during the intro, then fades out to reveal the whole page. */}
      <div
        ref={canvasLayerRef}
        className="fixed inset-0 z-[60] overflow-hidden bg-ink"
      >
        <canvas
          ref={canvasRef}
          className="block h-full w-full"
          aria-hidden="true"
        />

        {/* Scroll hint, fades out as soon as the user starts scrubbing. */}
        <div
          ref={overlayRef}
          className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2"
        >
          <span className="border-4 border-paper bg-ink px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-paper">
            Scroll to swing in
          </span>
          <span aria-hidden="true" className="animate-bounce text-2xl text-web">
            ↓
          </span>
        </div>

        {/* Preloader sits above the canvas until the first frame decodes. */}
        <div
          className={`absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-ink transition-opacity duration-500 ${
            isReady ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <span className="font-display text-5xl font-bold uppercase tracking-tighter text-paper">
            Spider<span className="text-spider">//</span>Verse
          </span>
          <div className="h-2 w-56 overflow-hidden border-2 border-paper">
            <div
              className="h-full bg-web transition-[width] duration-200 ease-out"
              style={{ width: `${loadPercent}%` }}
            />
          </div>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-paper/70">
            Loading sequence · {loadPercent}%
          </span>
        </div>
      </div>

      {/* Empty spacer that gives the intro its scroll distance. */}
      <div
        ref={spacerRef}
        aria-hidden="true"
        className="w-full"
        style={{ height: `${scrollDistanceFactor * 100}svh` }}
      />
    </>
  );
}
