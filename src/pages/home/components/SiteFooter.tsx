import { Link } from "react-router-dom";

const columns = [
  {
    title: "Planos",
    links: [
      { label: "Casinha Semente · R$ 60", href: "#planos" },
      { label: "Casinha Vizinho · R$ 100", href: "#planos" },
      { label: "Casa Vizinho · R$ 200", href: "#planos" },
      { label: "Casa Vizinho Master · R$ 500", href: "#planos" },
    ],
  },
  {
    title: "Comunidade",
    links: [
      { label: "Cursos & produtos digitais", href: "/produtos" },
      { label: "A vizinhança", href: "#vizinhança" },
      { label: "Recorrência de 30 dias", href: "#recorrencia" },
      { label: "Baús de recompensa", href: "#baus" },
      { label: "Perguntas frequentes", href: "#faq" },
    ],
  },
  {
    title: "Comece agora",
    links: [
      { label: "Fazer meu cadastro", href: "#cadastro" },
      { label: "Painel do administrador", href: "/admin" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="relative bg-background-100 border-t border-foreground-950/10 pt-14 pb-8">
      <div className="px-4 md:px-10 lg:px-16">
        <h2 className="font-heading text-3xl md:text-5xl font-semibold leading-tight text-foreground-950 max-w-3xl m-0">
          A vizinhança que <em className="accent">rende</em> é melhor com você.
        </h2>
        <p className="mt-5 text-sm md:text-base text-foreground-700 max-w-xl">
          Indique, ganhe e receba a cada ciclo de 30 dias. Entre na vizinhança e comece pelo plano que caiba no seu
          bolso.
        </p>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-primary-500/15 border border-primary-500/40 flex items-center justify-center">
                <i className="ri-community-line text-primary-500 text-xl"></i>
              </span>
              <span className="font-heading text-xl font-semibold text-foreground-950">
                Indica <em className="italic text-primary-500">Vizinho</em>
              </span>
            </div>
            <p className="mt-5 text-sm text-foreground-700 leading-relaxed max-w-xs">
              A comunidade onde cada vizinho indicado vira renda. Quatro casinhas com aluguel mensal recorrente, rede
              de 10 níveis em matriz fechada, baú de boas-vindas com o SaaS de Criativos na entrada.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-mono text-[11px] tracking-[0.18em] uppercase text-accent-500">{col.title}</h3>
              <ul className="mt-5 flex flex-col gap-3 list-none p-0 m-0">
                {col.links.map((l) =>
                  l.href.startsWith("/") ? (
                    <li key={l.label}>
                      <Link
                        to={l.href}
                        className="group inline-flex items-center gap-1.5 text-sm text-foreground-700 hover:text-foreground-950 transition-colors"
                      >
                        <i className="ri-arrow-right-s-line text-primary-500 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"></i>
                        {l.label}
                      </Link>
                    </li>
                  ) : (
                    <li key={l.label}>
                      <a
                        href={`${__BASE_PATH__}${l.href}`}
                        className="group inline-flex items-center gap-1.5 text-sm text-foreground-700 hover:text-foreground-950 transition-colors"
                      >
                        <i className="ri-arrow-right-s-line text-primary-500 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"></i>
                        {l.label}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-foreground-950/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-foreground-600 m-0">
            © 2026 Indica Vizinho. Saque mínimo de R$ 10,00 · Taxa fixa de R$ 2,00 por saque.
          </p>
          <div className="flex items-center gap-2">
            <a
              href={`${__BASE_PATH__}#cadastro`}
              aria-label="Instagram da Indica Vizinho"
              className="w-9 h-9 rounded-full bg-background-200 border border-foreground-950/10 flex items-center justify-center text-foreground-800 hover:text-primary-500 transition-colors"
            >
              <i className="ri-instagram-line"></i>
            </a>
            <a
              href={`${__BASE_PATH__}#cadastro`}
              aria-label="TikTok da Indica Vizinho"
              className="w-9 h-9 rounded-full bg-background-200 border border-foreground-950/10 flex items-center justify-center text-foreground-800 hover:text-primary-500 transition-colors"
            >
              <i className="ri-tiktok-line"></i>
            </a>
            <a
              href={`${__BASE_PATH__}#cadastro`}
              aria-label="YouTube da Indica Vizinho"
              className="w-9 h-9 rounded-full bg-background-200 border border-foreground-950/10 flex items-center justify-center text-foreground-800 hover:text-primary-500 transition-colors"
            >
              <i className="ri-youtube-line"></i>
            </a>
            <a
              href={`${__BASE_PATH__}#cadastro`}
              aria-label="Telegram da Indica Vizinho"
              className="w-9 h-9 rounded-full bg-background-200 border border-foreground-950/10 flex items-center justify-center text-foreground-800 hover:text-primary-500 transition-colors"
            >
              <i className="ri-telegram-line"></i>
            </a>
            <a
              href={`${__BASE_PATH__}#cadastro`}
              aria-label="WhatsApp da Indica Vizinho"
              className="w-9 h-9 rounded-full bg-background-200 border border-foreground-950/10 flex items-center justify-center text-foreground-800 hover:text-primary-500 transition-colors"
            >
              <i className="ri-whatsapp-line"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}