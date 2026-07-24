import ProductCard from "./ProductCard";
import { products } from "@/lib/products";

export default function ProductGrid() {
  const count = String(products.length).padStart(2, "0");

  return (
    <section id="products" className="border-b-4 border-ink bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b-4 border-ink pb-6">
          <h2 className="font-display text-4xl font-bold uppercase leading-none tracking-tighter sm:text-6xl">
            Featured
            <br />
            Gear
          </h2>
          <span className="border-4 border-ink bg-web px-3 py-1 font-mono text-sm font-bold uppercase tracking-widest text-ink">
            [ {count} Items ]
          </span>
        </div>

        {products.length === 0 ? (
          <div className="mt-16 border-4 border-dashed border-ink p-12 text-center">
            <p className="font-mono text-sm font-bold uppercase tracking-widest text-ink">
              The web is empty — no gear in stock yet.
            </p>
            <a
              href="#"
              className="mt-6 inline-flex border-4 border-ink bg-ink px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest text-paper shadow-brutal transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-spider focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              Back to top
            </a>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
