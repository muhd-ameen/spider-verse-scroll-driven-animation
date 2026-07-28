export default function CTA() {
  return (
    <section
      id="crossing"
      className="benday relative overflow-hidden border-b-4 border-ink bg-electric"
    >
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center">
        <h2 className="misprint font-display text-4xl font-bold uppercase leading-[0.95] tracking-tighter text-paper sm:text-6xl">
          Become your friendly
          <br />
          neighborhood hero
        </h2>
        <p className="mx-auto mt-6 max-w-xl font-mono text-base leading-relaxed text-paper sm:text-lg">
          Explore the full collection of premium apparel, replicas, and
          collectibles. Your next adventure starts with the perfect suit.
        </p>
        <a
          href="#products"
          className="mt-10 inline-flex items-center justify-center border-4 border-ink bg-web px-10 py-4 font-mono text-base font-bold uppercase tracking-widest text-ink shadow-brutal transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-paper focus-visible:ring-offset-2 focus-visible:ring-offset-electric active:translate-x-1.5 active:translate-y-1.5 active:shadow-none"
        >
          Shop Now →
        </a>
      </div>
    </section>
  );
}
