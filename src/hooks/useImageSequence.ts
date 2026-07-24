"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Expands an ffmpeg-style path pattern into a concrete frame URL.
 *
 *   formatFramePath("/frames/frame_%04d.webp", 7) -> "/frames/frame_0007.webp"
 */
export function formatFramePath(pattern: string, frameNumber: number): string {
  return pattern.replace(/%0(\d+)d/, (_, width: string) =>
    String(frameNumber).padStart(Number(width), "0"),
  );
}

export interface ImageSequence {
  /** Stable ref holding every decoded frame, indexed 0..totalFrames-1. */
  images: React.RefObject<HTMLImageElement[]>;
  /** How many frames have finished loading (or errored). */
  loadedCount: number;
  totalFrames: number;
  /** True once the first frame is decoded and something can be drawn. */
  isReady: boolean;
  /** 0..1 preload progress across the whole sequence. */
  progress: number;
}

/**
 * Eagerly preloads a numbered image sequence into memory so it can be scrubbed
 * frame-by-frame on a canvas without any per-frame network requests.
 *
 * The elements live in a ref (never state) so redrawing a frame does not
 * trigger a React render. The scroll handler reads straight from `images`.
 */
export function useImageSequence(
  totalFrames: number,
  imagePathPattern: string,
): ImageSequence {
  const images = useRef<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let loaded = 0;
    const frames: HTMLImageElement[] = new Array(totalFrames);

    const onSettle = (index: number) => {
      if (cancelled) return;
      loaded += 1;
      if (index === 0) setIsReady(true);
      // Throttle re-renders: the first, the last, and every 4th frame is
      // enough to drive a smooth loading indicator.
      if (loaded === 1 || loaded === totalFrames || loaded % 4 === 0) {
        setLoadedCount(loaded);
      }
    };

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = formatFramePath(imagePathPattern, i + 1);
      img.onload = () => onSettle(i);
      img.onerror = () => onSettle(i);
      frames[i] = img;
    }
    images.current = frames;

    return () => {
      cancelled = true;
      for (const img of frames) {
        img.onload = null;
        img.onerror = null;
      }
    };
  }, [totalFrames, imagePathPattern]);

  return {
    images,
    loadedCount,
    totalFrames,
    isReady,
    progress: totalFrames > 0 ? loadedCount / totalFrames : 0,
  };
}
