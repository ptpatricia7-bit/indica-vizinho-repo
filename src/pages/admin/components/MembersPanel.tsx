import { useMemo, useState } from "react";
import { members } from "@/mocks/admin";
import AdminTable from "@/pages/admin/components/AdminTable";

const filters = ["Todos", "Ativos", "Pendentes"] as const;

export default function MembersPanel() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("Todos");
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    return members
      .filter((m) => {
        if (filter === "Ativos") return m.status === "Ativo";
        if (filter === "Pendentes") return m.status !== "Ativo";
        return true;
      })
      .filter((m) => {
        const q = query.trim().toLowerCase();
        if (!q) return true;
        return m.nome.toLowerCase().includes(q) || m.email.toLowerCase().includes(q) || m.id.toLowerCase().includes(q);
      })
      .map((m) => ({
        id: m.id,
        nome: m.nome,
        email: m.email,
        plano: m.plano,
        nivel: `Nível ${m.nivel}`,
        indicacoes: m.indicacoes,
        ciclo: `Dia ${m.ciclo}/30`,
        status: m.status,
      }));
  }, [filter, query]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex items-center gap-1 rounded-full bg-background-200/70 border border-foreground-950/10 p-1">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors cursor-pointer ${
                filter === f ? "bg-primary-500 text-[#14100a] font-semibold" : "text-foreground-700 hover:text-foreground-950"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-foreground-600 text-sm"></i>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nome, e-mail ou ID"
            className="iv-input pl-9 text-sm"
          />
        </div>
      </div>

      <AdminTable
        columns={[
          { key: "id", label: "ID" },
          { key: "nome", label: "Vizinho" },
          { key: "email", label: "E-mail" },
          { key: "plano", label: "Plano" },
          { key: "nivel", label: "Nível na rede" },
          { key: "indicacoes", label: "Indicações" },
          { key: "ciclo", label: "Ciclo" },
          { key: "status", label: "Status" },
        ]}
        rows={rows}
      />
    </div>
  );
}