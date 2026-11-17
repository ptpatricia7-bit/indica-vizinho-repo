import { members, referrals, weekly } from "@/mocks/admin";

export default function OverviewPanel() {
  const max = Math.max(...weekly.map((w) => w.indicacoes));

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
      <section className="surface-card p-6 xl:col-span-2">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="font-heading text-xl md:text-2xl font-semibold text-foreground-950 m-0">
              Indicações da semana
            </h2>
            <p className="text-sm text-foreground-600 mt-1 m-0">Movimento diário da vizinhança nos últimos 7 dias.</p>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-500">24 – 30 set</span>
        </div>

        <div className="mt-8 flex items-end justify-between gap-2 md:gap-4">
          {weekly.map((w) => (
            <div className="flex-1 flex flex-col items-center gap-3" key={w.dia}>
              <span className="text-xs text-foreground-600 tabular-nums">{w.indicacoes}</span>
              <div
                className="w-full rounded-t-md bg-primary-500/75 hover:bg-primary-400 transition-colors"
                style={{ height: `${Math.round((w.indicacoes / max) * 150)}px` }}
                title={`${w.indicacoes} indicações · R$ ${w.valor.toLocaleString("pt-BR")}`}
              />
              <span className="text-xs text-foreground-600">{w.dia}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="surface-card p-6">
        <h2 className="font-heading text-xl font-semibold text-foreground-950 m-0">Top vizinhos</h2>
        <p className="text-sm text-foreground-600 mt-1 m-0">Quem mais indicou no ciclo atual.</p>
        <ul className="mt-5 flex flex-col gap-4 list-none p-0 m-0">
          {[...members]
            .sort((a, b) => b.indicacoes - a.indicacoes)
            .slice(0, 5)
            .map((m, i) => (
              <li className="flex items-center gap-3" key={m.id}>
                <span className="w-8 h-8 rounded-full bg-background-200 border border-foreground-950/10 flex items-center justify-center text-xs text-foreground-700 font-mono">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-foreground-950 truncate m-0">{m.nome}</p>
                  <p className="text-xs text-foreground-600 truncate m-0">{m.plano}</p>
                </div>
                <span className="text-sm text-primary-500 tabular-nums">{m.indicacoes}</span>
              </li>
            ))}
        </ul>
      </section>

      <section className="surface-card p-6 xl:col-span-3">
        <h2 className="font-heading text-xl font-semibold text-foreground-950 m-0">Últimas indicações</h2>
        <ul className="mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 list-none p-0 m-0">
          {referrals.slice(0, 6).map((r) => (
            <li
              className="flex items-center justify-between gap-3 rounded-lg border border-foreground-950/10 bg-background-200/40 px-4 py-3 hover:border-foreground-950/25 transition-colors"
              key={r.id}
            >
              <div className="min-w-0">
                <p className="text-sm text-foreground-950 truncate m-0">
                  {r.indicador} <i className="ri-arrow-right-line text-primary-500"></i> {r.indicado}
                </p>
                <p className="text-xs text-foreground-600 truncate m-0">
                  {r.plano} · {r.data}
                </p>
              </div>
              <span className="text-sm text-primary-500 whitespace-nowrap">{r.valor}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}