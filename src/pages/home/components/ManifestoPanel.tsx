export default function ManifestoPanel() {
  return (
    <section className="panel manifesto" id="manifesto" data-side="center">
      <span className="big-num left-[5vw] top-[14vh]" aria-hidden="true" data-parallax="0.55">
        IV
      </span>
      <p className="manifesto-text" data-words>
        Ninguém cresce <em className="accent">sozinho</em> aqui: cada vizinho que entra acende o{" "}
        <em className="accent">próximo</em> e devolve o ganho para quem indicou.
      </p>
    </section>
  );
}