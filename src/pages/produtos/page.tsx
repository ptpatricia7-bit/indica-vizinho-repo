import { useMemo, useState } from "react";
import "@/pages/home/home.css";
import "@/pages/produtos/produtos.css";
import SiteNav from "@/pages/home/components/SiteNav";
import SiteFooter from "@/pages/home/components/SiteFooter";
import ProductCard from "@/pages/produtos/components/ProductCard";
import ProductModal from "@/pages/produtos/components/ProductModal";
import { useReveal } from "@/pages/produtos/hooks/useReveal";
import {
  catalogProducts,
  catalogSteps,
  formatBRL,
  heroImage,
  kindLabels,
  type CatalogProduct,
  type ProductKind,
} from "@/mocks/products";

type FilterKey = ProductKind | "todos";

const filters: { key: FilterKey; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "curso", label: "Cursos em vídeo" },
  { key: "ebook", label: "E-books" },
  { key: "kit", label: "Kits digitais" },
  { key: "mentoria", label: "Mentorias" },
  { key: "template", label: "Templates" },
];

export default function Produtos() {
  const [category, setCategory] = useState<FilterKey>("todos");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<CatalogProduct | null>(null);

  useReveal([category, query]);

  const featured = useMemo(
    () => catalogProducts.find((product) => product.featured) ?? catalogProducts[0],
    [],
  );

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    return catalogProducts.filter((product) => {
      const matchCategory = category === "todos" || product.kind === category;
      const matchTerm =
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.tagline.toLowerCase().includes(term) ||
        kindLabels[product.kind].toLowerCase().includes(term);
      return matchCategory && matchTerm;
    });
  }, [category, query]);

  return (
    <div className="relative bg-background-50 text-foreground-950">
      <SiteNav />

      <main>
        {/* HERO */}
        <section className="relative min-h-[78vh] flex items-end pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
          <img
            className="absolute inset-0 w-full h-full object-cover object-center"
            src={heroImage}
            alt="Oficina rústica ao anoitecer com estantes de livros e lanternas douradas acesas."
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background-50 via-background-50/85 to-background-50/40" />

          <div className="relative z-10 w-full px-4 md:px-10 lg:px-16">
            <div className="max-w-3xl">
              <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-accent-400 m-0" data-reveal>
                Catálogo digital
              </p>
              <h1
                className="font-heading text-4xl md:text-6xl font-semibold leading-[1.04] mt-4 text-foreground-950"
                data-reveal
              >
                Cursos e produtos
                <br />
                digitais da <em className="accent">vizinhança</em>.
              </h1>
              <p className="mt-5 text-base md:text-lg text-foreground-700 max-w-xl leading-relaxed" data-reveal>
                Cursos em vídeo, e-books, kits e templates prontos para você assistir, aplicar e vender. Acesso imediato
                depois da confirmação — sem espera e sem frete.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3 max-w-xl" data-reveal>
                <div className="relative flex-1">
                  <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-foreground-500 text-base"></i>
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Buscar curso, e-book ou kit..."
                    aria-label="Buscar produtos digitais"
                    className="iv-input pl-11 text-sm"
                  />
                </div>
                <a
                  href="#catalogo"
                  className="whitespace-nowrap cursor-pointer rounded-full bg-primary-500 text-[#14100a] text-sm font-semibold px-6 py-3.5 hover:bg-primary-400 transition-colors flex items-center justify-center gap-2"
                >
                  Ver catálogo <i className="ri-arrow-down-line"></i>
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-foreground-500" data-reveal>
                <span className="flex items-center gap-2">
                  <i className="ri-play-circle-line text-primary-400 text-base"></i> Aulas em vídeo
                </span>
                <span className="flex items-center gap-2">
                  <i className="ri-download-cloud-line text-primary-400 text-base"></i> Material para baixar
                </span>
                <span className="flex items-center gap-2">
                  <i className="ri-refresh-line text-primary-400 text-base"></i> Atualizações inclusas
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED */}
        <section className="relative px-4 md:px-10 lg:px-16 py-12 md:py-16">
          <article className="surface-card grid grid-cols-1 lg:grid-cols-2 overflow-hidden" data-reveal>
            <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full min-h-[260px] overflow-hidden">
              <img
                src={featured.image}
                alt={`Capa do produto digital ${featured.name}`}
                title={`${featured.name} — curso e produto digital Indica Vizinho`}
                className="w-full h-full object-cover object-top"
              />
              <span className="absolute top-4 left-4 rounded-full bg-primary-500 text-[#14100a] px-3 py-1 text-[11px] font-semibold flex items-center gap-1">
                <i className="ri-star-fill"></i> Mais completo
              </span>
            </div>
            <div className="p-6 md:p-10 flex flex-col gap-4 justify-center">
              <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-accent-400 m-0">
                {kindLabels[featured.kind]} · {featured.level}
              </p>
              <h2 className="font-heading text-2xl md:text-4xl font-semibold text-foreground-950 m-0">
                {featured.name}
              </h2>
              <p className="text-sm md:text-base text-foreground-700 leading-relaxed m-0">{featured.description}</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 list-none p-0 m-0">
                {featured.includes.slice(0, 4).map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-foreground-800">
                    <i className="ri-checkbox-circle-line text-primary-400 mt-0.5"></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <span className="font-heading text-3xl text-primary-400">{formatBRL(featured.price)}</span>
                <button
                  type="button"
                  onClick={() => setSelected(featured)}
                  className="whitespace-nowrap cursor-pointer rounded-full bg-primary-500 text-[#14100a] text-sm font-semibold px-6 py-3.5 hover:bg-primary-400 transition-colors flex items-center gap-2"
                >
                  Ver detalhes <i className="ri-arrow-right-line"></i>
                </button>
              </div>
            </div>
          </article>
        </section>

        {/* CATÁLOGO */}
        <section className="relative bg-background-100 py-14 md:py-20 px-4 md:px-10 lg:px-16" id="catalogo">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between" data-reveal>
            <div className="max-w-xl">
              <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-accent-400 m-0">
                Tudo o que você recebe
              </p>
              <h2 className="font-heading text-3xl md:text-5xl font-semibold mt-4 leading-tight text-foreground-950 m-0">
                Escolha o seu
                <br />
                próximo <em className="accent">aprendizado</em>.
              </h2>
            </div>
            <p className="text-sm text-foreground-600 m-0">
              {visible.length} {visible.length === 1 ? "produto encontrado" : "produtos encontrados"}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2" data-reveal>
            {filters.map((filter) => {
              const active = category === filter.key;
              return (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => setCategory(filter.key)}
                  className={`whitespace-nowrap cursor-pointer rounded-full px-4 py-2 text-sm transition-colors ${
                    active
                      ? "bg-primary-500 text-[#14100a] font-semibold"
                      : "border border-foreground-950/15 text-foreground-700 hover:text-foreground-950 hover:border-foreground-950/35"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          {visible.length > 0 ? (
            <div
              data-product-shop
              className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
            >
              {visible.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} onOpen={setSelected} />
              ))}
            </div>
          ) : (
            <div className="mt-10 surface-card p-10 flex flex-col items-center text-center gap-3" data-reveal>
              <i className="ri-search-eye-line text-3xl text-primary-400"></i>
              <p className="text-base text-foreground-800 m-0">
                Nenhum produto encontrado para essa busca.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setCategory("todos");
                }}
                className="whitespace-nowrap cursor-pointer rounded-full border border-primary-500/40 text-primary-300 text-sm font-semibold px-5 py-2.5 hover:bg-primary-500 hover:text-[#14100a] transition-colors"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </section>

        {/* COMO FUNCIONA */}
        <section className="relative px-4 md:px-10 lg:px-16 py-14 md:py-20">
          <div className="max-w-xl" data-reveal>
            <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-accent-400 m-0">Como funciona</p>
            <h2 className="font-heading text-3xl md:text-5xl font-semibold mt-4 leading-tight text-foreground-950 m-0">
              Comprou, <em className="accent">chegou</em> na hora.
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {catalogSteps.map((step) => (
              <div className="surface-card p-6 flex flex-col gap-3" key={step.title} data-reveal>
                <span className="w-11 h-11 rounded-full bg-primary-500/15 border border-primary-500/40 flex items-center justify-center">
                  <i className={`${step.icon} text-primary-400 text-xl`}></i>
                </span>
                <h3 className="font-heading text-lg font-semibold text-foreground-950 m-0">{step.title}</h3>
                <p className="text-sm text-foreground-700 leading-relaxed m-0">{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="relative px-4 md:px-10 lg:px-16 pb-20">
          <div className="surface-card px-6 md:px-12 py-12 md:py-16 flex flex-col lg:flex-row lg:items-center justify-between gap-8" data-reveal>
            <div className="max-w-2xl">
              <h2 className="font-heading text-3xl md:text-5xl font-semibold leading-tight text-foreground-950 m-0">
                Pronto para aprender
                <br />
                e <em className="accent">render</em> com a vizinhança?
              </h2>
              <p className="mt-4 text-sm md:text-base text-foreground-700 leading-relaxed m-0">
                Escolha o seu plano, receba o produto digital e entre na comunidade. Indique 2 vizinhos e libere 50% do
                valor logo nas primeiras indicações.
              </p>
            </div>
            <a
              href={`${__BASE_PATH__}#cadastro`}
              className="whitespace-nowrap cursor-pointer self-start rounded-full bg-primary-500 text-[#14100a] text-sm font-semibold px-7 py-4 hover:bg-primary-400 transition-colors flex items-center gap-2"
            >
              Quero entrar na vizinhança <i className="ri-arrow-right-line"></i>
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </div>
  );
}