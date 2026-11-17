export type AdminColumn = { key: string; label: string };
export type AdminRow = Record<string, string | number>;

const POSITIVE = ["Ativo", "Confirmada", "Pago"];
const PENDING = ["Pendente", "Em análise", "Renovando", "Aguardando 2ª indicação"];

function Badge({ value }: { value: string }) {
  const kind = POSITIVE.includes(value) ? "pos" : PENDING.includes(value) ? "pend" : "mute";
  const cls =
    kind === "pos"
      ? "bg-primary-500/15 text-primary-400 border-primary-500/30"
      : kind === "pend"
        ? "bg-secondary-500/20 text-foreground-900 border-secondary-500/40"
        : "bg-background-300/40 text-foreground-600 border-foreground-950/10";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs whitespace-nowrap ${cls}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
      {value}
    </span>
  );
}

export default function AdminTable({
  columns,
  rows,
  emptyLabel = "Nenhum registro encontrado.",
}: {
  columns: AdminColumn[];
  rows: AdminRow[];
  emptyLabel?: string;
}) {
  return (
    <div className="surface-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-background-200/60">
              {columns.map((c) => (
                <th
                  key={c.key}
                  className="text-left px-4 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-foreground-600 whitespace-nowrap"
                >
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-foreground-600">
                  {emptyLabel}
                </td>
              </tr>
            )}
            {rows.map((row, i) => (
              <tr
                key={i}
                className="border-t border-foreground-950/10 hover:bg-background-200/40 transition-colors"
              >
                {columns.map((c) => (
                  <td key={c.key} className="px-4 py-3.5 text-foreground-800 whitespace-nowrap">
                    {c.key === "status" ? <Badge value={String(row[c.key])} /> : String(row[c.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}