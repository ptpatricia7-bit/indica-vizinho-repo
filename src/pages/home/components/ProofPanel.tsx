import { panelStats, testimonials } from "@/mocks/home";

export default function ProofPanel() {
  return (
    <section className="panel panel-full" id="vizinhança" data-side="bottom">
      <img
        className="panel-bg"
        data-parallax="0.32"
        src="https://readdy.ai/api/search-image?query=Silhouettes%20of%20neighbours%20gathered%20on%20a%20quiet%20tropical%20street%20at%20dusk%2C%20warm%20lit%20windows%20glowing%20across%20a%20deep%20blue%20evening%20sky%2C%20palm%20shadows%2C%20cinematic%20wide%20composition%2C%20nostalgic%20calm%2C%20soft%20haze%2C%20no%20text&width=2400&height=1350&seq=iv-panel-vizinhos&orientation=landscape"
        alt="Silhuetas de vizinhos reunidos numa rua tranquila ao anoitecer, com janelas acesas ao fundo."
      />
      <div className="panel-veil" />
      <div className="panel-inner">
        <div className="panel-copy">
          <p className="stamp" data-reveal>
            05 — A vizinhança
          </p>
          <h2 data-reveal>
            Não é rede,
            <br />
            é <em className="accent">vizinhança</em>.
          </h2>
          <p className="sub" data-reveal>
            Saque mínimo de R$ 10,00 com taxa fixa de R$ 2,00 por saque. A rede abre até 10 níveis em matriz fechada:
            cada vizinho indica 2 pessoas e o aluguel distribui R$ 25,00 fixos por nível.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {panelStats.map((s) => (
            <div className="surface-card p-5" key={s.label} data-reveal>
              <div className="stat-value" data-count={s.value} data-count-suffix={s.suffix}>
                {s.value.toLocaleString("pt-BR")}
                {s.suffix}
              </div>
              <div className="stat-label mt-2">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4">
          {testimonials.map((t) => (
            <figure className="surface-card p-6 flex flex-col gap-4" key={t.nome} data-reveal>
              <div className="flex gap-1 text-primary-500">
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
              </div>
              <blockquote className="text-sm md:text-base text-foreground-900 leading-relaxed m-0">“{t.texto}”</blockquote>
              <figcaption className="mt-auto text-sm">
                <span className="text-foreground-950 font-medium">{t.nome}</span>
                <span className="text-foreground-600"> · {t.cidade}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}