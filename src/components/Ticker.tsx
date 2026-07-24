const ITEMS = [
  "New Drop · 2026",
  "Free Web-Shooters",
  "Swing Into Savings",
  "Limited Stock",
  "Suit Up",
];

function Row() {
  return (
    <ul className="flex shrink-0 items-center">
      {ITEMS.map((item, i) => (
        <li
          key={i}
          className="flex items-center font-mono text-sm font-bold uppercase tracking-widest text-paper"
        >
          <span className="px-6">{item}</span>
          <span aria-hidden="true" className="text-spider">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function Ticker() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-b-4 border-ink bg-ink py-2.5"
    >
      <div className="marquee flex w-max whitespace-nowrap">
        <Row />
        <Row />
      </div>
    </div>
  );
}
