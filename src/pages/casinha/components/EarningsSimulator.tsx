import { useMemo } from "react";

interface EarningsSimulatorProps {
  aluguel: number;
  setAluguel: (value: number) => void;
  directs: number;
  setDirects: (value: number) => void;
  directPercent: number;
  levelValue: number;
  levels: number;
  perNeighbor: number;
}

const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 2 });

const ALUGUEL_PRESETS = [100, 200, 500, 1000];

export default function EarningsSimulator({
  aluguel,
  setAluguel,
  directs,
  setDirects,
  directPercent,
  levelValue,
  levels,
  perNeighbor,
}: EarningsSimulatorProps) {
  const { rows, directBonus, levelTotal, total, maxRow } = useMemo(() => {
    const built = Array.from({ length: levels }, (_, index) => {
      const n = index + 1;
      const people = directs * Math.pow(perNeighbor, n - 1);
      const commission = people * levelValue;
      return { n, people, commission };
    });
    const direct = directs * ((aluguel * directPercent) / 100);
    const level = built.reduce((sum, row) => sum + row.commission, 0);
    const maximum = Math.max(1, ...built.map((row) => row.commission));
    return { rows: built, directBonus: direct, levelTotal: level, total: direct + level, maxRow: maximum };
  }, [aluguel, directs, directPercent, levelValue, levels, perNeighbor]);

  return (
    <div className="ch-sim-grid">
      <div className="ch-card">
        <div className="ch-field">
          <div className="ch-field-head">
            <label htmlFor="ch-aluguel">Aluguel mensal recorrente</label>
            <span className="val">{brl(aluguel)}</span>
          </div>
          <input
            id="ch-aluguel"
            type="range"
            min={50}
            max={1000}
            step={50}
            value={aluguel}
            onChange={(event) => setAluguel(Number(event.target.value))}
            className="ch-range"
            aria-label="Valor do aluguel mensal"
          />
          <div className="ch-quick">
            {ALUGUEL_PRESETS.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setAluguel(preset)}
                className={aluguel === preset ? "on" : ""}
              >
                R$ {preset}
              </button>
            ))}
          </div>
        </div>

        <div className="ch-field">
          <div className="ch-field-head">
            <label htmlFor="ch-directs">Suas indicações diretas</label>
            <span className="val">{directs} vizinhos</span>
          </div>
          <input
            id="ch-directs"
            type="range"
            min={2}
            max={8}
            step={1}
            value={directs}
            onChange={(event) => setDirects(Number(event.target.value))}
            className="ch-range"
            aria-label="Número de indicações diretas"
          />
          <div className="ch-quick">
            {[2, 3, 4, 5, 6].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setDirects(preset)}
                className={directs === preset ? "on" : ""}
              >
                {preset} pessoas
              </button>
            ))}
          </div>
        </div>

        <p className="ch-note">
          <i className="ri-information-line"></i>
          <span>
            Cada vizinho precisa indicar {perNeighbor} pessoas para a matriz fechar. A indicação direta paga{" "}
            {directPercent}% do aluguel e cada um dos {levels} níveis recebe {brl(levelValue)} por vizinho.
          </span>
        </p>
      </div>

      <div className="ch-card">
        <div className="ch-result-total">
          <span className="lb">Ganho por ciclo de recorrência</span>
          <span className="vl">{brl(total)}</span>
          <span className="sb">
            Somando a indicação direta com os {levels} níveis da matriz, com {directs} indicações diretas.
          </span>
        </div>

        <div className="ch-result-cards">
          <div className="ch-result-mini">
            <span className="lb">
              <i className="ri-share-forward-line"></i> Indicação direta ({directPercent}%)
            </span>
            <p className="vl">{brl(directBonus)}</p>
          </div>
          <div className="ch-result-mini">
            <span className="lb">
              <i className="ri-node-tree"></i> Rede em {levels} níveis
            </span>
            <p className="vl">{brl(levelTotal)}</p>
          </div>
        </div>

        <div className="ch-level-table">
          {rows.map((row) => (
            <div className="ch-lrow" key={row.n}>
              <span className="nm">{row.n}º nível</span>
              <div className="ch-lbar">
                <span style={{ width: `${Math.max(4, Math.round((row.commission / maxRow) * 100))}%` }} />
              </div>
              <span className="vl">
                {row.people.toLocaleString("pt-BR")} viz · {brl(row.commission)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}