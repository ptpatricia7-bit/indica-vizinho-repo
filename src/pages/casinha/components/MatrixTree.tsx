const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

interface MatrixTreeProps {
  levels: number;
  perNeighbor: number;
  directs: number;
  levelValue: number;
}

const VISIBLE_NODES = 8;

export default function MatrixTree({ levels, perNeighbor, directs, levelValue }: MatrixTreeProps) {
  const rows = Array.from({ length: levels }, (_, index) => {
    const n = index + 1;
    const people = directs * Math.pow(perNeighbor, n - 1);
    return { n, people, payout: people * levelValue };
  });

  return (
    <div className="ch-tree">
      <div className="ch-tree-root">
        <span className="dot">
          <i className="ri-user-star-line"></i>
        </span>
        <span>Você</span>
      </div>
      <div className="ch-tree-trunk" />

      <ul className="ch-tree-levels">
        {rows.map((row) => {
          const shown = Math.min(row.people, VISIBLE_NODES);
          const overflow = row.people - shown;
          return (
            <li className="ch-lvl" key={row.n}>
              <span className="ch-lvl-tag">{row.n}º nível</span>

              <div className="ch-lvl-nodes">
                {Array.from({ length: shown }).map((_, i) => (
                  <span className="ch-node" key={i}>
                    <i className="ri-user-line"></i>
                  </span>
                ))}
                {overflow > 0 && <span className="ch-node more">+{overflow.toLocaleString("pt-BR")}</span>}
              </div>

              <span className="ch-lvl-count">
                {row.people.toLocaleString("pt-BR")} vizinhos
                <small>{brl(row.payout)} neste nível</small>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}