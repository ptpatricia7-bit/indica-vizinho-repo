import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "@/pages/home/home.css";
import "@/pages/casinha/casinha.css";
import SiteNav from "@/pages/home/components/SiteNav";
import SiteFooter from "@/pages/home/components/SiteFooter";
import MatrixTree from "@/pages/casinha/components/MatrixTree";
import EarningsSimulator from "@/pages/casinha/components/EarningsSimulator";
import { useReveal } from "@/pages/casinha/hooks/useReveal";
import { plans, networkRules } from "@/mocks/home";
import { networkConfig } from "@/mocks/admin";

export default function CasinhaDetail() {
  const { id } = useParams<{ id: string }>();
  const plan = plans.find((item) => String(item.id) === id);

  const [aluguel, setAluguel] = useState(plan?.valorMensal ?? 100);
  const [directs, setDirects] = useState(networkConfig.requiredPerNeighbor);

  useReveal([id]);

  if (!plan) {
    return (
      <div className="ch-shell relative min-h-[70vh]">
        <SiteNav />
        <main className="ch-container flex flex-col items-center justify-center text-center gap-5 pt-40 pb-24">
          <span className="w-16 h-16 rounded-full bg-primary-500/15 border border-primary-500/40 flex items-center justify-center">
            <i className="ri-home-smile-line text-3xl text-accent-400"></i>
          </span>
          <h1 className="font-heading text-3xl md:text-4xl font-semibold text-foreground-950 m-0">
            Essa casinha não existe.
          </h1>
          <p className="text-sm text-foreground-600 max-w-md m-0">
            Não encontramos essa casinha na vizinhança. Volte e escolha uma das quatro disponíveis.
          </p>
          <Link
            to="/"
            className="ch-btn"
          >
            <i className="ri-arrow-left-line"></i> Voltar para os planos
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const others = plans.filter((item) => item.id !== plan.id);

  return (
    <div className="ch-shell relative">
      <SiteNav />

      <main>
        {/* HERO */}
        <section className="ch-hero">
          <img className="ch-hero-img" src={plan.image} alt={`${plan.name} — casinha da vizinhança`} title={`${plan.name} — aluguel mensal recorrente Indica Vizinho`} />
          <div className="ch-hero-veil" />
          <div className="ch-container ch-hero-inner">
            <Link to={`${__BASE_PATH__}#planos`} className="ch-back" data-reveal>
              <i className="ri-arrow-left-line"></i> Voltar para as casinhas
            </Link>
            <p className="ch-eyebrow" data-reveal>
              Casinha {String(plan.id).padStart(2, "0")} · {plan.nivel}
            </p>
            <h1 className="ch-title" data-reveal>
              {plan.name}
            </h1>
            <p className="ch-hero-sub" data-reveal>
              {plan.descricao}
            </p>

            <div className="ch-hero-meta" data-reveal>
              <div className="ch-price-box">
                <span className="vl">{plan.price}</span>
                <span className="lb">/mês recorrente</span>
              </div>
              <span className="ch-chip">
                <i className="ri-gift-2-line"></i> {plan.bau}
              </span>
              <span className="ch-chip">
                <i className="ri-user-add-line"></i> {plan.indicacoes}
              </span>
              <span className="ch-chip">
                <i className="ri-node-tree"></i> {plan.nivel}
              </span>
            </div>
          </div>
        </section>

        {/* O QUE VEM NA CASINHA */}
        <section className="ch-section">
          <div className="ch-container">
            <div className="ch-head" data-reveal>
              <p className="ch-eyebrow">O que vem na sua casinha</p>
              <h2>
                Tudo que o vizinho <em className="accent">recebe</em> ao alugar.
              </h2>
              <p>{plan.tagline}</p>
            </div>

            <div className="ch-included-grid">
              {plan.included.map((item) => (
                <div className="ch-included-item" key={item} data-reveal>
                  <i className="ri-checkbox-circle-line"></i>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="ch-bau" data-reveal>
              <span className="ic">
                <i className="ri-gift-2-line"></i>
              </span>
              <div className="tx">
                <h3>Baú de boas-vindas na entrada</h3>
                <p>
                  A partir de R$ 60,00 você recebe um baú para abrir e ganha o{" "}
                  <strong className="font-medium text-foreground-950">SaaS de Criativos para Redes Sociais</strong> — o
                  mesmo em todas as casinhas
                  {plan.id === 4 ? ", junto com a mentoria direta do plano master." : "."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ÁRVORE DA MATRIZ */}
        <section className="ch-section alt">
          <div className="ch-container">
            <div className="ch-head" data-reveal>
              <p className="ch-eyebrow">A árvore da matriz</p>
              <h2>
                Como a rede <em className="accent">fecha</em> em {networkConfig.levels} níveis.
              </h2>
              <p>
                Matriz fechada: cada vizinho indica {networkConfig.requiredPerNeighbor} pessoas e a árvore dobra a cada
                nível, até o 10º. Abaixo, os vizinhos e o valor que cada nível rende nesta casinha com{" "}
                {directs} indicações diretas.
              </p>
            </div>

            <div data-reveal>
              <MatrixTree
                levels={networkConfig.levels}
                perNeighbor={networkConfig.requiredPerNeighbor}
                directs={directs}
                levelValue={networkConfig.levelValue}
              />
            </div>
          </div>
        </section>

        {/* SIMULADOR */}
        <section className="ch-section">
          <div className="ch-container">
            <div className="ch-head" data-reveal>
              <p className="ch-eyebrow">Simulador de ganhos</p>
              <h2>
                Ajuste o aluguel e as indicações, veja o <em className="accent">ganho por nível</em>.
              </h2>
              <p>
                Mexa no aluguel recorrente e nas suas indicações diretas para simular o total por ciclo de recorrência.
                Os valores aparecem na hora, nível por nível.
              </p>
            </div>

            <div data-reveal>
              <EarningsSimulator
                aluguel={aluguel}
                setAluguel={setAluguel}
                directs={directs}
                setDirects={setDirects}
                directPercent={networkConfig.directPercent}
                levelValue={networkConfig.levelValue}
                levels={networkConfig.levels}
                perNeighbor={networkConfig.requiredPerNeighbor}
              />
            </div>
          </div>
        </section>

        {/* REGRAS + OUTRAS CASINHAS + CTA */}
        <section className="ch-section alt">
          <div className="ch-container flex flex-col gap-14">
            <div>
              <div className="ch-head" data-reveal>
                <p className="ch-eyebrow">Regras da rede</p>
                <h2>Como o aluguel é distribuído.</h2>
              </div>
              <div className="network-rules" data-reveal>
                {networkRules.map((rule) => (
                  <div className="network-rule" key={rule.label}>
                    <span className="w-8 h-8 rounded-full bg-primary-500/15 border border-primary-500/30 flex items-center justify-center shrink-0">
                      <i className={`${rule.icon} text-primary-500`}></i>
                    </span>
                    <div>
                      <p className="label">{rule.label}</p>
                      <p className="value">{rule.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="ch-head" data-reveal>
                <p className="ch-eyebrow">Outras casinhas</p>
                <h2>Compare com as outras opções.</h2>
              </div>
              <div className="ch-others">
                {others.map((item) => (
                  <Link to={`/casinha/${item.id}`} className="ch-other" key={item.id} data-reveal>
                    <div>
                      <span className="nm">{item.name}</span>
                      <p className="pr m-0 mt-1">{item.aluguel}</p>
                    </div>
                    <i className="ri-arrow-right-line text-xl"></i>
                  </Link>
                ))}
              </div>
            </div>

            <div className="ch-cta" data-reveal>
              <h2>
                Pronto para alugar a {plan.name} e colocar a rede <em className="accent">pra rodar</em>?
              </h2>
              <div className="flex flex-wrap items-center gap-3">
                <a href={`${__BASE_PATH__}#cadastro`} className="ch-btn">
                  Quero esta casinha <i className="ri-arrow-right-line"></i>
                </a>
                <a href={`${__BASE_PATH__}#planos`} className="ch-btn ghost">
                  Ver todas as casinhas
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}