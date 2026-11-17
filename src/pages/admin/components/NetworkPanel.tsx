import { useState } from "react";
import { matrixLevels, networkConfig } from "@/mocks/admin";

type LevelRow = { level: number; vizinhos: number; valor: string };

const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function NetworkPanel() {
  const [config, setConfig] = useState({ ...networkConfig });
  const [levels, setLevels] = useState<LevelRow[]>(() => matrixLevels.map((l) => ({ ...l })));
  const [saved, setSaved] = useState(false);

  const updateConfig = (field: keyof typeof config, value: number) =>
    setConfig((prev) => ({ ...prev, [field]: value }));

  const updateLevel = (level: number, valor: string) =>
    setLevels((prev) => prev.map((l) => (l.level === level ? { ...l, valor } : l)));

  const save = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2600);
  };

  const totalPosicoes = levels.reduce((sum, l) => sum + l.vizinhos, 0);
  const totalRede = totalPosicoes * config.levelValue;
  const maxVizinhos = Math.max(...levels.map((l) => l.vizinhos));

  return (
    <div className="flex flex-col gap-5">
      <div className="surface-card p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="font-heading text-xl font-semibold text-foreground-950 m-0">
              Rede MMN — matriz fechada de 10 níveis
            </h2>
            <p className="text-sm text-foreground-600 mt-2 m-0 leading-relaxed">
              Aqui você tem o controle total da rede: define o percentual da indicação direta, o valor fixo por nível, a
              profundidade e quantas indicações cada vizinho precisa fazer. A matriz é fechada — cada posição recebe 2
              vizinhos e a rede fecha em 10 níveis de profundidade.
            </p>
          </div>
          <button
            type="button"
            onClick={save}
            className="whitespace-nowrap rounded-full bg-primary-500 text-[#14100a] text-sm font-semibold px-5 py-2.5 hover:bg-primary-400 transition-colors cursor-pointer flex items-center gap-2"
          >
            {saved ? <i className="ri-checkbox-circle-line"></i> : <i className="ri-save-line"></i>}
            {saved ? "Regras salvas" : "Salvar regras"}
          </button>
        </div>

        <div className="mt-6 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs text-foreground-600">Indicação direta (%)</span>
            <input
              type="number"
              min={0}
              max={100}
              value={config.directPercent}
              onChange={(e) => updateConfig("directPercent", Number(e.target.value))}
              className="iv-input text-sm"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs text-foreground-600">Valor por nível (R$)</span>
            <input
              type="number"
              min={0}
              value={config.levelValue}
              onChange={(e) => updateConfig("levelValue", Number(e.target.value))}
              className="iv-input text-sm"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs text-foreground-600">Profundidade (níveis)</span>
            <input
              type="number"
              min={1}
              value={config.levels}
              onChange={(e) => updateConfig("levels", Number(e.target.value))}
              className="iv-input text-sm"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs text-foreground-600">Indicações por vizinho</span>
            <input
              type="number"
              min={1}
              value={config.requiredPerNeighbor}
              onChange={(e) => updateConfig("requiredPerNeighbor", Number(e.target.value))}
              className="iv-input text-sm"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs text-foreground-600">Ciclo do aluguel (dias)</span>
            <input
              type="number"
              min={1}
              value={config.cycleDays}
              onChange={(e) => updateConfig("cycleDays", Number(e.target.value))}
              className="iv-input text-sm"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs text-foreground-600">Taxa de saque (R$)</span>
            <input
              type="number"
              min={0}
              value={config.withdrawFee}
              onChange={(e) => updateConfig("withdrawFee", Number(e.target.value))}
              className="iv-input text-sm"
            />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="surface-card p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-500 m-0">Posições na matriz</p>
          <p className="stat-value mt-3 m-0">{totalPosicoes.toLocaleString("pt-BR")}</p>
          <p className="text-xs text-foreground-600 mt-1 m-0">da 1ª à {config.levels}ª profundidade</p>
        </div>
        <div className="surface-card p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-500 m-0">Volume por ciclo cheio</p>
          <p className="stat-value mt-3 m-0">{brl(totalRede)}</p>
          <p className="text-xs text-foreground-600 mt-1 m-0">{brl(config.levelValue)} por posição</p>
        </div>
        <div className="surface-card p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-500 m-0">Indicação direta</p>
          <p className="stat-value mt-3 m-0">{config.directPercent}%</p>
          <p className="text-xs text-foreground-600 mt-1 m-0">do aluguel de quem entra</p>
        </div>
      </div>

      <div className="surface-card p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h3 className="font-heading text-lg font-semibold text-foreground-950 m-0">
            Matriz fechada — 2 vizinhos por posição
          </h3>
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-500">
            {config.matrixType} · {config.levels} níveis
          </span>
        </div>

        <ul className="mt-5 flex flex-col gap-2.5 list-none p-0 m-0">
          {levels.map((l) => (
            <li key={l.level} className="flex items-center gap-3 md:gap-4">
              <span className="w-20 shrink-0 font-mono text-[11px] uppercase tracking-[0.12em] text-foreground-600">
                {l.level}º nível
              </span>
              <div className="flex-1 h-6 rounded-full bg-background-200/50 overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary-500/70"
                  style={{ width: `${Math.max(6, Math.round((l.vizinhos / maxVizinhos) * 100))}%` }}
                />
              </div>
              <span className="w-24 shrink-0 text-right text-sm text-foreground-800 tabular-nums">
                {l.vizinhos.toLocaleString("pt-BR")} viz.
              </span>
              <input
                value={l.valor}
                onChange={(e) => updateLevel(l.level, e.target.value)}
                aria-label={`Valor do ${l.level}º nível`}
                className="iv-input text-sm w-28 shrink-0 text-center"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}