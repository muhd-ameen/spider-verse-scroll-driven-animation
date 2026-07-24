import Image from "next/image";

const features = [
  { k: "06", label: "Fresh Drops" },
  { k: "24/7", label: "Web Support" },
  { k: "Free", label: "Shipping" },
  { k: "100%", label: "Official" },
];

export default function Hero() {
  return (
    <section className="border-b-4 border-ink bg-paper">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 sm:py-24 lg:grid-cols-[5fr_6fr] lg:gap-16">
        <div>
          <span className="inline-block border-4 border-ink bg-web px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-ink shadow-brutal-sm">
            New Collection · 2026
          </span>

          <h1 className="mt-8 font-display text-6xl font-bold uppercase leading-[0.9] tracking-tighter sm:text-7xl">
            Suit up
            <br />
            like a{" "}
            <span className="inline-block -rotate-2 border-4 border-ink bg-spider px-3 text-paper shadow-brutal">
              hero
            </span>
          </h1>

          <p className="mt-8 max-w-xl font-mono text-base leading-relaxed text-ink sm:text-lg">
            Premium Spider-Man collectibles and apparel. Gear up with hoodies,
            replicas, and figures worthy of your friendly neighborhood hero.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#products"
              className="inline-flex items-center justify-center border-4 border-ink bg-ink px-8 py-4 font-mono text-sm font-bold uppercase tracking-widest text-paper shadow-brutal transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-spider focus-visible:ring-offset-2 focus-visible:ring-offset-paper active:translate-x-1.5 active:translate-y-1.5 active:shadow-none"
            >
              Shop Collection →
            </a>
            <a
              href="#products"
              className="inline-flex items-center justify-center border-4 border-ink bg-paper px-8 py-4 font-mono text-sm font-bold uppercase tracking-widest text-ink shadow-brutal transition-transform hover:-translate-y-1 hover:bg-web focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-electric focus-visible:ring-offset-2 focus-visible:ring-offset-paper active:translate-x-1.5 active:translate-y-1.5 active:shadow-none"
            >
              Explore Products
            </a>
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-xl lg:max-w-none lg:-mr-6 lg:scale-110">
          <Image
            src="https://static.wikia.nocookie.net/thedailybugle/images/2/2b/Ultimate_Spider_Man_Render.png/revision/latest/scale-to-width-down/1200?cb=20160319202253"
            alt="Ultimate Spider-Man swinging on a web line and shooting a web"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 760px"
            className="object-contain"
          />
          <span className="absolute bottom-0 left-0 -rotate-2 border-4 border-ink bg-ink px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-paper shadow-brutal-sm">
            Amazing · Est. 2026
          </span>
        </div>
      </div>

      {/* Ink background bleeds through the 4px gaps to draw the grid lines. */}
      <div className="border-t-4 border-ink bg-ink">
        <dl className="grid grid-cols-2 gap-1 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.label} className="bg-paper p-6 sm:p-8">
              <dt className="font-display text-3xl font-bold uppercase tracking-tighter text-spider sm:text-4xl">
                {feature.k}
              </dt>
              <dd className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-ink">
                {feature.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
