"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Palette = Record<string, [number, number, number]>;

/** Universe A: red-and-blue ink on newsprint. Mirrors globals.css :root. */
const HOME: Palette = {
  ink: [10, 10, 10],
  paper: [244, 241, 233],
  spider: [229, 18, 31],
  electric: [27, 60, 255],
  web: [245, 217, 10],
};

/**
 * Universe B: neon on black.
 *
 * Ink and paper trade places, so every existing pairing survives the crossing
 * — but the two accents have to inverse their lightness as well, or the pairs
 * that sit *on* them (ink on web, paper on electric) would lose contrast:
 * yellow drops to deep violet, deep blue rises to cyan.
 */
const AWAY: Palette = {
  ink: [238, 233, 255],
  paper: [11, 8, 20],
  spider: [255, 45, 149],
  electric: [126, 236, 255],
  web: [92, 24, 168],
};

const CHANNELS: (keyof Palette)[] = [
  "ink",
  "paper",
  "spider",
  "electric",
  "web",
];

interface MultiverseShiftProps {
  /** Element whose scroll position drives the crossing. */
  triggerSelector: string;
}

/**
 * Retints the entire page mid-scroll by tweening the five palette variables on
 * :root. Because every colour in the app resolves through those variables,
 * this is a full theme change for the cost of five string writes per frame —
 * no class swapping, no re-render, no flash of the wrong palette.
 *
 * The press drifts further out of register at the halfway point, so the
 * crossing reads as a misprint rather than a CSS transition.
 */
export default function MultiverseShift({
  triggerSelector,
}: MultiverseShiftProps) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    const trigger = document.querySelector(triggerSelector);
    if (!trigger) return;

    const crossing = { t: 0 };

    const paint = () => {
      const t = crossing.t;
      for (const channel of CHANNELS) {
        const from = HOME[channel];
        const to = AWAY[channel];
        const rgb = [0, 1, 2].map((i) =>
          Math.round(from[i] + (to[i] - from[i]) * t),
        );
        root.style.setProperty(`--${channel}`, rgb.join(" "));
      }
      // Peaks at t = 0.5 and returns to rest at both ends.
      root.style.setProperty(
        "--misreg",
        `${(1.5 + Math.sin(t * Math.PI) * 4.5).toFixed(2)}px`,
      );
    };

    const ctx = gsap.context(() => {
      gsap.to(crossing, {
        t: 1,
        ease: "none",
        onUpdate: paint,
        scrollTrigger: {
          trigger,
          start: "top 85%",
          end: "top 25%",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => {
      ctx.revert();
      for (const channel of CHANNELS) root.style.removeProperty(`--${channel}`);
      root.style.removeProperty("--misreg");
    };
  }, [triggerSelector]);

  return null;
}
