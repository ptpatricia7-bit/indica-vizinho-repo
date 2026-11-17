import { Link } from "react-router-dom";

export default function AdminHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background-50/90 backdrop-blur-md border-b border-foreground-950/10">
      <div className="flex h-16 items-center justify-between gap-4 px-4 md:px-8 lg:px-12">
        <div className="flex items-center gap-3 min-w-0">
          <span className="w-9 h-9 rounded-full bg-primary-500/15 border border-primary-500/40 flex items-center justify-center shrink-0">
            <i className="ri-shield-user-line text-primary-500 text-lg"></i>
          </span>
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground-950 truncate m-0">Painel do administrador</p>
            <p className="text-xs text-foreground-600 truncate m-0">Indica Vizinho · gestão da comunidade</p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/"
            className="hidden sm:inline-flex items-center gap-2 text-sm text-foreground-700 hover:text-foreground-950 transition-colors whitespace-nowrap"
          >
            <i className="ri-arrow-left-line"></i> Ver o site
          </Link>
          <button
            type="button"
            className="w-9 h-9 rounded-full bg-background-200 border border-foreground-950/10 flex items-center justify-center text-foreground-800 hover:text-primary-500 transition-colors cursor-pointer"
            aria-label="Notificações"
          >
            <i className="ri-notification-3-line"></i>
          </button>
          <span className="w-9 h-9 rounded-full bg-primary-500/20 border border-primary-500/40 flex items-center justify-center text-primary-400 text-sm font-semibold">
            AD
          </span>
        </div>
      </div>
    </header>
  );
}