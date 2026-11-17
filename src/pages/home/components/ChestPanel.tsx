export default function ChestPanel() {
  return (
    <section className="panel" id="baus" data-side="left">
      <img
        className="panel-bg"
        data-parallax="0.32"
        src="https://readdy.ai/api/search-image?query=An%20open%20wooden%20treasure%20chest%20on%20a%20dark%20blue%20stone%20floor%20spilling%20soft%20golden%20light%2C%20glowing%20coins%2C%20cinematic%20dusk%20atmosphere%2C%20deep%20shadows%2C%20volumetric%20haze%2C%20tropical%20night%2C%20quiet%20and%20cinematic%2C%20no%20text&width=2400&height=1350&seq=iv-panel-baus&orientation=landscape"
        alt="Baú de madeira aberto no chão de pedra, espalhando uma luz dourada e suave pelo ambiente escuro."
      />
      <div className="panel-veil" />
      <span className="big-num right-[6vw] bottom-[8vh]" aria-hidden="true" data-parallax="0.55">
        04
      </span>
      <div className="panel-copy">
        <p className="stamp" data-reveal>
          04 — Baús de recompensa
        </p>
        <h2 data-reveal>
          Cada indicação
          <br />
          abre um <em className="accent">baú</em>.
        </h2>
        <p className="sub" data-reveal>
          Ao entrar em qualquer casinha, o baú de boas-vindas fica pronto para abrir. Dentro dele vem o SaaS de
          Criativos para Redes Sociais — o prêmio é o mesmo em todos os planos, a partir de R$ 60,00. Cada indicação
          confirmada ainda libera um novo baú.
        </p>
        <ul className="chips" data-reveal>
          <li>Baú de boas-vindas na entrada</li>
          <li>Prêmio: SaaS de Criativos</li>
          <li>Mesmo bônus em todos os planos</li>
        </ul>
        <a className="cta" href="#cadastro" data-reveal>
          Quero meu primeiro baú <i className="ri-arrow-right-line"></i>
        </a>
      </div>
    </section>
  );
}