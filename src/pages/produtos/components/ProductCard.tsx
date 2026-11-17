import { formatBRL, kindLabels, type CatalogProduct } from "@/mocks/products";

interface ProductCardProps {
  product: CatalogProduct;
  index: number;
  onOpen: (product: CatalogProduct) => void;
}

export default function ProductCard({ product, index, onOpen }: ProductCardProps) {
  return (
    <article
      className="pv-card surface-card group flex flex-col overflow-hidden"
      style={{ animationDelay: `${Math.min(index, 8) * 55}ms` }}
    >
      <button
        type="button"
        onClick={() => onOpen(product)}
        aria-label={`Ver detalhes de ${product.name}`}
        className="relative block w-full aspect-[4/3] overflow-hidden cursor-pointer"
      >
        <img
          src={product.image}
          alt={`Capa do produto digital ${product.name}`}
          title={`${product.name} — curso e produto digital Indica Vizinho`}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 rounded-full bg-background-50/85 backdrop-blur px-3 py-1 text-[11px] font-mono uppercase tracking-[0.12em] text-primary-300 border border-primary-500/30">
          {kindLabels[product.kind]}
        </span>
        {product.featured && (
          <span className="absolute top-3 right-3 rounded-full bg-primary-500 text-[#14100a] px-3 py-1 text-[11px] font-semibold flex items-center gap-1">
            <i className="ri-star-fill"></i> Destaque
          </span>
        )}
      </button>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="font-heading text-lg font-semibold text-foreground-950 m-0">{product.name}</h3>
        <p className="text-sm text-foreground-700 leading-relaxed m-0 pv-clamp-2">{product.tagline}</p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-foreground-500">
          {product.lessons && (
            <span className="flex items-center gap-1.5">
              <i className="ri-play-circle-line text-primary-400"></i>
              {product.lessons} aulas
            </span>
          )}
          {product.duration && (
            <span className="flex items-center gap-1.5">
              <i className="ri-time-line text-primary-400"></i>
              {product.duration}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <i className="ri-bar-chart-line text-primary-400"></i>
            {product.level}
          </span>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 pt-4 border-t border-foreground-950/10">
          <div>
            {product.oldPrice && (
              <span className="block text-xs text-foreground-600 line-through">{formatBRL(product.oldPrice)}</span>
            )}
            <span className="font-heading text-xl text-primary-400">{formatBRL(product.price)}</span>
          </div>
          <button
            type="button"
            onClick={() => onOpen(product)}
            className="whitespace-nowrap cursor-pointer rounded-full border border-primary-500/40 text-primary-300 text-xs font-semibold px-4 py-2 hover:bg-primary-500 hover:text-[#14100a] transition-colors flex items-center gap-1.5"
          >
            Ver detalhes <i className="ri-arrow-right-line"></i>
          </button>
        </div>
      </div>
    </article>
  );
}