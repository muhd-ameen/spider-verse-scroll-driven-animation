import Image from "next/image";
import type { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col border-4 border-ink bg-paper shadow-brutal transition-transform hover:-translate-y-1.5">
      <div className="relative aspect-square overflow-hidden border-b-4 border-ink bg-paper">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
        <span className="absolute left-0 top-0 border-b-4 border-r-4 border-ink bg-web px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-ink">
          {product.tag}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold uppercase tracking-tight text-ink">
          {product.name}
        </h3>
        <p className="mt-1 font-mono text-2xl font-bold text-spider">
          {product.price}
        </p>
        <button
          type="button"
          className="mt-5 border-4 border-ink bg-ink px-4 py-3 font-mono text-sm font-bold uppercase tracking-widest text-paper transition-colors hover:bg-electric focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-spider focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}
