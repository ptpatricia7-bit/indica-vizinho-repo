import { networkLevels } from "@/mocks/home";

export default function CyclePanel() {
  return (
    <section className="panel" id="recorrencia" data-side="right">
      <img
        className="panel-bg"
        data-parallax="0.32"
        src="https://readdy.ai/api/search-image?query=Close%20view%20of%20an%20old%20brass%20clock%20mechanism%20and%20a%20wooden%20calendar%20on%20a%20deep%20blue%20weathered%20wall%2C%20warm%20gold%20rim%20light%20catching%20the%20metal%2C%20cinematic%20night%20atmosphere%2C%20soft%20focus%20background%2C%20quiet%20nostalgic%20mood%2C%20dust%20in%20the%20air%2C%20no%20text&width=2400&height=1350&seq=iv-panel-tempo&orientation=landscape"
        alt="Mecanismo de relógio de latão sobre parede azul desgastada, iluminado por uma luz dourada."
      />
      <div className="panel-veil" />
      <div className="panel-copy">
        <p className="stamp" data-reveal>
          03 — A recorrência
        </p>
        <h2 data-reveal>
          Trinta dias
          <br />
          que se <em className="accent">renovam</em>.
        </h2>
        <p className="sub" data-reveal>
          O aluguel da sua casinha é recorrente: pague todo mês e a casa continua ativa rendendo na rede. O contador
          mostra onde você está no ciclo de 30 dias — quando ele fecha, o aluguel se renova automaticamente.
        </p>

        <div className="surface-card p-6 md:p-7" data-reveal>
          <div className="flex items-end gap-3">
            <span className="stat-value" data-cycle-day>
              1
            </span>
            <span className="text-foreground-600 text-sm mb-1.5">de 30 dias do ciclo</span>
          </div>
          <div className="mt-5 h-2 w-full rounded-full bg-foreground-950/10 overflow-hidden">
            <div className="h-full rounded-full bg-primary-500" data-cycle-bar style={{ width: "3%" }} />
          </div>
          <p className="mt-3 text-sm text-foreground-600" data-cycle-msg>
            Faltam 29 dias para renovar a recorrência.
          </p>
        </div>

        <ul className="points" data-reveal>
          {networkLevels.slice(0, 3).map((n) => (
            <li key={n.nivel}>
              <i className="ri-arrow-right-s-line" />
              <span>
                <strong className="font-medium text-foreground-950">{n.nivel}.</strong> {n.descricao}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}