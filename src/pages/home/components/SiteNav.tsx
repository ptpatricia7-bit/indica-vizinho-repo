import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type NavLink = { label: string; href?: string; to?: string };

const links: NavLink[] = [
  { href: "#planos", label: "Planos" },
  { href: "#recorrencia", label: "Recorrência" },
  { to: "/produtos", label: "Cursos & Produtos" },
  { href: "#baus", label: "Baús" },
  { href: "#vizinhança", label: "A vizinhança" },
];

export default function SiteNav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.55);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass =
    "group relative text-sm text-foreground-900 hover:text-foreground-950 transition-colors whitespace-nowrap";

  const underline = (
    <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-primary-500 transition-all duration-300 group-hover:w-full" />
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid
          ? "bg-background-50/85 backdrop-blur-md border-b border-foreground-950/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="flex h-16 md:h-20 items-center justify-between gap-6 px-4 md:px-10">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <span className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-primary-500/15 border border-primary-500/40 flex items-center justify-center">
            <i className="ri-community-line text-primary-500 text-lg md:text-xl"></i>
          </span>
          <span className="font-heading text-lg md:text-xl font-semibold text-foreground-950 tracking-tight">
            Indica <em className="italic text-primary-500">Vizinho</em>
          </span>
        </Link>

        <nav className="hidden md:flex flex-1 items-center justify-center gap-8">
          {links.map((l) =>
            l.to ? (
              <Link key={l.to} to={l.to} className={linkClass}>
                {l.label}
                {underline}
              </Link>
            ) : (
              <a key={l.href} href={`${__BASE_PATH__}${l.href}`} className={linkClass}>
                {l.label}
                {underline}
              </a>
            ),
          )}
        </nav>

        <div className="hidden md:flex items-center gap-3 shrink-0">
          <Link
            to="/admin"
            className="text-sm text-foreground-700 hover:text-foreground-950 transition-colors whitespace-nowrap flex items-center gap-1.5"
          >
            <i className="ri-shield-user-line"></i> Admin
          </Link>
          <a
            href={`${__BASE_PATH__}#cadastro`}
            className="whitespace-nowrap rounded-full bg-primary-500 text-[#14100a] text-sm font-semibold px-5 py-2.5 hover:bg-primary-400 transition-colors flex items-center gap-2"
          >
            Quero entrar <i className="ri-arrow-right-line"></i>
          </a>
        </div>

        <button
          type="button"
          aria-label="Abrir menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-md border border-foreground-950/20 text-foreground-950 cursor-pointer"
        >
          <i className={open ? "ri-close-line text-xl" : "ri-menu-line text-xl"}></i>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background-50/95 backdrop-blur-md border-t border-foreground-950/10 px-4 py-4 flex flex-col gap-1">
          {links.map((l) =>
            l.to ? (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-3 text-base text-foreground-900 border-b border-foreground-950/10"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.href}
                href={`${__BASE_PATH__}${l.href}`}
                onClick={() => setOpen(false)}
                className="py-3 text-base text-foreground-900 border-b border-foreground-950/10"
              >
                {l.label}
              </a>
            ),
          )}
          <Link to="/admin" onClick={() => setOpen(false)} className="py-3 text-base text-foreground-700">
            Painel do administrador
          </Link>
          <a
            href={`${__BASE_PATH__}#cadastro`}
            onClick={() => setOpen(false)}
            className="mt-3 whitespace-nowrap rounded-full bg-primary-500 text-[#14100a] text-sm font-semibold px-5 py-3 text-center"
          >
            Quero entrar na vizinhança
          </a>
        </div>
      )}
    </header>
  );
}