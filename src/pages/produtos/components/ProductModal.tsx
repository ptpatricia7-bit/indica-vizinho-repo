import { useEffect } from "react";
import { formatBRL, kindLabels, type CatalogProduct } from "@/mocks/products";

interface ProductModalProps {
  product: CatalogProduct | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  useEffect(() => {
    if (!product) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end md:items-center justify-center p-0 md:p-6">
      <button
        type="button"
        aria-label="Fechar detalhes"
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-default"
      />

      <div className="relative z-10 w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-t-2xl md:rounded-2xl bg-background-100 border border-foreground-950/10">
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <img
            src={product.image}
            alt={`Capa ampliada do produto ${product.name}`}
            title={`${product.name} — curso e produto digital Indica Vizinho`}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background-100 via-background-100/30 to-transparent" />
          <span className="absolute top-4 left-4 rounded-full bg-background-50/85 backdrop-blur px-3 py-1 text-[11px] font-mono uppercase tracking-[0.12em] text-primary-300 border border-primary-500/30">
            {kindLabels[product.kind]}
          </span>
          <button
            type="button"
            aria-label="Fechar"
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background-50/85 backdrop-blur border border-foreground-950/15 flex items-center justify-center text-foreground-900 hover:text-primary-400 transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <div className="p-6 md:p-8 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h3 className="font-heading text-2xl md:text-3xl font-semibold text-foreground-950 m-0">{product.name}</h3>
            <p className="text-sm md:text-base text-foreground-700 leading-relaxed m-0">{product.description}</p>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-foreground-500">
            {product.lessons && (
              <span className="flex items-center gap-2">
                <i className="ri-play-circle-line text-primary-400 text-lg"></i>
                {product.lessons} aulas em vídeo
              </span>
            )}
            {product.duration && (
              <span className="flex items-center gap-2">
                <i className="ri-time-line text-primary-400 text-lg"></i>
                {product.duration}
              </span>
            )}
            <span className="flex items-center gap-2">
              <i className="ri-bar-chart-line text-primary-400 text-lg"></i>
              {product.level}
            </span>
          </div>

          <div>
            <h4 className="font-mono text-[11px] tracking-[0.18em] uppercase text-accent-400 m-0">
              O que está incluso
            </h4>
            <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5 list-none p-0 m-0">
              {product.includes.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-foreground-800">
                  <i className="ri-checkbox-circle-line text-primary-400 mt-0.5"></i>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-foreground-950/10">
            <div>
              {product.oldPrice && (
                <span className="block text-sm text-foreground-600 line-through">{formatBRL(product.oldPrice)}</span>
              )}
              <span className="font-heading text-3xl text-primary-400">{formatBRL(product.price)}</span>
            </div>
            <a
              href={`${__BASE_PATH__}#cadastro`}
              className="whitespace-nowrap cursor-pointer rounded-full bg-primary-500 text-[#14100a] text-sm font-semibold px-6 py-3.5 hover:bg-primary-400 transition-colors flex items-center justify-center gap-2"
            >
              Quero este produto <i className="ri-arrow-right-line"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}