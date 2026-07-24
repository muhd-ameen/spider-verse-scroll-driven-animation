const columns = [
  { title: "Shop", links: ["Tees", "Hoodies", "Replicas", "Figures"] },
  { title: "Support", links: ["Shipping", "Returns", "Size Guide", "FAQ"] },
  { title: "Verse", links: ["Story", "Careers", "Press", "Contact"] },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[2fr_3fr]">
          <div>
            <p className="font-display text-4xl font-bold uppercase tracking-tighter sm:text-5xl">
              Spider<span className="text-spider">//</span>Verse
            </p>
            <p className="mt-4 max-w-sm font-mono text-sm leading-relaxed text-paper/70">
              Premium gear for your friendly neighborhood hero. Suit up.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-web">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-2">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="font-mono text-sm text-paper transition-colors hover:text-spider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-web focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t-4 border-paper/20 pt-6 font-mono text-xs uppercase tracking-widest text-paper/60 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 SpiderVerse Store</span>
          <a
            href="https://linktr.ee/emeenx"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-paper transition-colors hover:text-spider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-web focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            emeenx ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
