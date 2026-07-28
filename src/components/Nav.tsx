export default function Nav() {
  const links = [
    { label: "Shop", href: "#products" },
    { label: "Story", href: "#" },
    { label: "Contact", href: "#" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b-4 border-ink bg-paper">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <a
          href="#"
          className="misprint font-display text-2xl font-bold uppercase tracking-tighter focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-spider focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        >
          Spider<span className="text-spider">//</span>Verse
        </a>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 sm:flex"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-mono text-sm font-bold uppercase tracking-widest text-ink underline-offset-8 hover:underline hover:decoration-spider hover:decoration-4 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-spider focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="border-4 border-ink bg-web px-4 py-2 font-mono text-sm font-bold uppercase tracking-widest text-ink shadow-brutal-sm transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-electric focus-visible:ring-offset-2 focus-visible:ring-offset-paper active:translate-x-1 active:translate-y-1 active:shadow-none"
        >
          Cart · 0
        </button>
      </div>
    </header>
  );
}
