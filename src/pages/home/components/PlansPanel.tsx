import { Link } from "react-router-dom";
import { networkLevelTiers, networkRules, plans } from "@/mocks/home";

export default function PlansPanel() {
  return (
    <section className="panel panel-full" id="planos" data-side="bottom">
      <img
        className="panel-bg"
        data-parallax="0.32"
        src="https://readdy.ai/api/search-image?query=Interior%20of%20a%20dark%20rustic%20community%20hall%20at%20dusk%20with%20weathered%20wooden%20walls%2C%20rows%20of%20warm%20amber%20lanterns%20glowing%2C%20deep%20teal%20blue%20shadows%2C%20cinematic%20wide%20shot%2C%20atmospheric%20haze%2C%20gold%20light%20pooling%20on%20an%20empty%20floor%2C%20no%20people%2C%20moody%20and%20quiet&width=2400&height=1350&seq=iv-panel-planos&orientation=landscape"
        alt="Salão comunitário de madeira ao anoitecer, iluminado por lanternas douradas que refletem no piso."
      />
      <div className="panel-veil" />
      <div className="panel-inner">
        <div className="panel-copy">
          <p className="stamp" data-reveal>
            02 — As casinhas
          </p>
          <h2 data-reveal>
            Quatro casinhas,
            <br />
            um <em className="accent">aluguel</em> que rende.
          </h2>
          <p className="sub" data-reveal>
            Escolha a sua casinha a partir de R$ 60,00. O aluguel é recorrente todo mês e mantém a casa ativa dentro da
            rede de multinível (MMN) de <strong className="font-medium text-foreground-950">10 níveis</strong> em matriz
            fechada. Cada vizinho precisa indicar <strong className="font-medium text-foreground-950">2 pessoas</strong>{" "}
            para liberar os ganhos — e na entrada você recebe um baú para abrir e ganha o SaaS de Criativos para Redes
            Sociais.
          </p>
        </div>

        <div className="plan-grid">
          {plans.map((p) => (
            <Link to={`/casinha/${p.id}`} className="plan-card" key={p.id} data-reveal>
              <span className="num">CASINHA {String(p.id).padStart(2, "0")}</span>
              <h4>{p.name}</h4>
              <span className="price">{p.price}</span>
              <span className="prod">{p.aluguel} · recorrente</span>
              <div className="row">
                <span>Inclui</span>
                <span>{p.produto}</span>
              </div>
              <div className="row">
                <span>Baú de entrada</span>
                <span>{p.bau}</span>
              </div>
              <div className="row">
                <span>Rede</span>
                <span>{p.nivel}</span>
              </div>
              <div className="row">
                <span>Indicações</span>
                <span>{p.indicacoes}</span>
              </div>
              <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-primary-300">
                Ver casinha, árvore e simulador <i className="ri-arrow-right-line"></i>
              </span>
            </Link>
          ))}
        </div>

        <div data-reveal>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground-950 m-0">
              Regras da rede MMN
            </h3>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-500">
              Matriz fechada · 10 níveis · R$ 25,00 por nível
            </span>
          </div>
          <div className="network-rules mt-4">
            {networkRules.map((r) => (
              <div className="network-rule" key={r.label}>
                <span className="w-8 h-8 rounded-full bg-primary-500/15 border border-primary-500/30 flex items-center justify-center shrink-0">
                  <i className={`${r.icon} text-primary-500`}></i>
                </span>
                <div>
                  <p className="label">{r.label}</p>
                  <p className="value">{r.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div data-reveal>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground-950 m-0">
              Distribuição do aluguel por nível
            </h3>
            <span className="text-xs text-foreground-600">Do 1º ao 10º nível, o mesmo valor fixo em cada indicação.</span>
          </div>
          <div className="level-grid mt-4">
            {networkLevelTiers.map((t) => (
              <div className="level-chip" key={t.nivel}>
                <span className="lv">{t.nivel}º nível</span>
                <span className="vl">{t.valor}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}