import { videoCover, videoDuration, videoUrl } from "@/mocks/home";

/**
 * THE FIRST SCREEN — exactly one screen tall.
 * The film autoplays muted + looped and runs on its own clock; each beat appears at the
 * second its part of the film plays. Scrolling only leaves it for the panels below.
 *
 * Shot list (14 s) → three beats (acts under 4 s merged into a neighbour):
 *  act 1 sign glow     0 – 2 s   (bottom)
 *  act 2 door crossing 2 – 5 s   (left)    ── merged into beat 1: 0 – 5 s
 *  act 3 levels rise   5 – 9 s   (left)    ── beat 2: 5 – 9 s
 *  act 4 chest opens   9 – 11.5 s(left, light)
 *  act 5 dashboard    11.5 – 14 s(right)   ── merged into beat 3: 9 – 14 s
 */
export default function Chapter() {
  return (
    <section
      className="chapter"
      data-video={videoUrl}
      data-duration={videoDuration}
      data-poster={videoCover}
      data-label="Indica Vizinho — a vizinhança que rende"
      id="top"
    >
      <div className="stage">
        <img
          className="plate"
          src={videoCover}
          width={1344}
          height={768}
          fetchPriority="high"
          decoding="async"
          alt="Placa de madeira com os dizeres Indica Vizinho iluminada em dourado sobre o portão da comunidade, ao anoitecer, com palmeiras e casas ao fundo."
        />
        <div className="veil" aria-hidden="true" />
        <div className="veil-light" aria-hidden="true" />

        {/* BEAT 1 — 0 – 5 s (acts 1 + 2 merged): the brand and the belonging */}
        <div
          className="beat"
          data-from="0"
          data-to="0.357"
          data-pos="left"
          data-depth="soft"
          data-tone="dark"
          data-motion="track"
          id="vizinhanca"
        >
          <p className="stamp">01 · Indica Vizinho</p>
          <h1 data-split="lines">
            A vizinhança
            <br />
            que <em className="accent">rende</em>.
          </h1>
          <p className="sub">Oito planos com produto digital e comissão que volta todo mês.</p>
          <a className="cta" href="#planos">
            Ver os planos
          </a>
        </div>

        {/* BEAT 2 — 5 – 9 s (act 3): the eight levels rising */}
        <div
          className="beat"
          data-from="0.357"
          data-to="0.643"
          data-pos="left"
          data-depth="soft"
          data-tone="dark"
          data-motion="rise"
          id="rede"
        >
          <p className="stamp">02 · A rede</p>
          <h2 data-split="lines">
            Oito níveis
            <br />
            acesos por <em className="accent">você</em>.
          </h2>
          <ul className="points">
            <li>Indique 2 vizinhos → libere 50%</li>
            <li>Ganho em cada nível da rede</li>
          </ul>
        </div>

        {/* BEAT 3 — 9 – 14 s (acts 4 + 5 merged): the reward chest and the dashboard */}
        <div
          className="beat"
          data-from="0.643"
          data-to="1"
          data-pos="right"
          data-depth="soft"
          data-tone="light"
          data-motion="drift"
          id="recompensas"
        >
          <p className="stamp">03 · Recompensas</p>
          <h2 data-split="lines">
            Saque a partir
            <br />
            de <em className="accent">R$ 10</em>.
          </h2>
          <ul className="chips" data-side="left">
            <li>Baú por indicação</li>
            <li>Taxa fixa de R$ 2</li>
            <li>30 dias de recorrência</li>
          </ul>
        </div>

        <div className="scroll-cue" aria-hidden="true">
          <span />
        </div>
      </div>
    </section>
  );
}