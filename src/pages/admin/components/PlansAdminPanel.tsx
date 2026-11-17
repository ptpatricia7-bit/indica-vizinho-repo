import { useState } from "react";
import { adminPlans } from "@/mocks/admin";

type PlanRow = {
  id: number;
  nome: string;
  aluguel: number;
  bau: string;
  assinantes: number;
  ativo: boolean;
};

const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function PlansAdminPanel() {
  const [rows, setRows] = useState<PlanRow[]>(() => adminPlans.map((p) => ({ ...p })));
  const [saved, setSaved] = useState(false);

  const update = <K extends keyof PlanRow>(id: number, field: K, value: PlanRow[K]) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)));

  const toggle = (id: number) => setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ativo: !r.ativo } : r)));

  const addPlan = () =>
    setRows((prev) => [
      ...prev,
      {
        id: Math.max(0, ...prev.map((r) => r.id)) + 1,
        nome: "Nova casinha",
        aluguel: 100,
        bau: "Baú + SaaS de Criativos",
        assinantes: 0,
        ativo: false,
      },
    ]);

  const remove = (id: number) => setRows((prev) => prev.filter((r) => r.id !== id));

  const save = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2600);
  };

  const ativos = rows.filter((r) => r.ativo).length;
  const receita = rows.filter((r) => r.ativo).reduce((sum, r) => sum + r.aluguel * r.assinantes, 0);

  return (
    <div className="flex flex-col gap-5">
      <div className="surface-card p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="font-heading text-xl font-semibold text-foreground-950 m-0">Planos (casinhas)</h2>
            <p className="text-sm text-foreground-600 mt-2 m-0 leading-relaxed">
              Cadastre e ajuste as casinhas quando quiser: mude o nome, o valor do aluguel, o prêmio do baú e pause o que
              não está dando certo. O plano de entrada começa em R$ 60,00 e o aluguel é recorrente todo mês.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={addPlan}
              className="whitespace-nowrap rounded-full border border-foreground-950/20 text-foreground-800 text-sm px-4 py-2.5 hover:border-primary-500/60 hover:text-primary-500 transition-colors cursor-pointer flex items-center gap-2"
            >
              <i className="ri-add-line"></i> Adicionar casinha
            </button>
            <button
              type="button"
              onClick={save}
              className="whitespace-nowrap rounded-full bg-primary-500 text-[#14100a] text-sm font-semibold px-5 py-2.5 hover:bg-primary-400 transition-colors cursor-pointer flex items-center gap-2"
            >
              {saved ? <i className="ri-checkbox-circle-line"></i> : <i className="ri-save-line"></i>}
              {saved ? "Alterações salvas" : "Salvar alterações"}
            </button>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-lg bg-background-200/40 border border-foreground-950/10 p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent-500 m-0">Casinhas cadastradas</p>
            <p className="stat-value mt-2 m-0">{rows.length}</p>
          </div>
          <div className="rounded-lg bg-background-200/40 border border-foreground-950/10 p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent-500 m-0">Ativas</p>
            <p className="stat-value mt-2 m-0">{ativos}</p>
          </div>
          <div className="rounded-lg bg-background-200/40 border border-foreground-950/10 p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent-500 m-0">Pausadas</p>
            <p className="stat-value mt-2 m-0">{rows.length - ativos}</p>
          </div>
          <div className="rounded-lg bg-background-200/40 border border-foreground-950/10 p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent-500 m-0">Aluguel recorrente</p>
            <p className="stat-value mt-2 m-0">{brl(receita)}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {rows.map((p, i) => (
          <article className="surface-card p-5 flex flex-col gap-4" key={p.id}>
            <div className="flex items-start justify-between gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-500">
                Casinha {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggle(p.id)}
                  aria-label={`Ativar ou pausar ${p.nome}`}
                  className={`w-11 h-6 rounded-full border transition-colors cursor-pointer relative shrink-0 ${
                    p.ativo ? "bg-primary-500 border-primary-500" : "bg-background-300/50 border-foreground-950/15"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 rounded-full bg-background-50 transition-all ${
                      p.ativo ? "left-6" : "left-1"
                    }`}
                    style={{ width: "18px", height: "18px" }}
                  />
                </button>
                <button
                  type="button"
                  onClick={() => remove(p.id)}
                  aria-label={`Remover ${p.nome}`}
                  className="w-8 h-8 rounded-full border border-foreground-950/15 flex items-center justify-center text-foreground-600 hover:text-red-400 hover:border-red-400/50 transition-colors cursor-pointer"
                >
                  <i className="ri-delete-bin-line"></i>
                </button>
              </div>
            </div>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs text-foreground-600">Nome da casinha</span>
              <input
                value={p.nome}
                onChange={(e) => update(p.id, "nome", e.target.value)}
                className="iv-input text-sm"
              />
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs text-foreground-600">Aluguel / mês (R$)</span>
                <input
                  type="number"
                  min={0}
                  step={10}
                  value={p.aluguel}
                  onChange={(e) => update(p.id, "aluguel", Number(e.target.value))}
                  className="iv-input text-sm"
                />
              </label>
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-foreground-600">Assinantes</span>
                <div className="iv-input text-sm flex items-center text-foreground-800">{p.assinantes}</div>
              </div>
            </div>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs text-foreground-600">Prêmio do baú</span>
              <input
                value={p.bau}
                onChange={(e) => update(p.id, "bau", e.target.value)}
                className="iv-input text-sm"
              />
            </label>

            <div className="flex items-center justify-between border-t border-foreground-950/10 pt-3">
              <span className={`text-xs ${p.ativo ? "text-primary-500" : "text-foreground-600"}`}>
                {p.ativo ? "Disponível para compra" : "Pausada"}
              </span>
              <span className="text-sm text-foreground-950 font-medium">{brl(p.aluguel)}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}