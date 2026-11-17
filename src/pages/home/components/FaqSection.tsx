import { useState } from "react";
import { faqItems } from "@/mocks/home";

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative bg-background-100 py-16 md:py-24" id="faq">
      <div className="px-4 md:px-10 lg:px-16">
        <div className="max-w-3xl">
          <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-accent-500" data-reveal>
            Perguntas frequentes
          </p>
          <h2
            className="font-heading text-3xl md:text-5xl font-semibold mt-4 leading-tight text-foreground-950"
            data-reveal
          >
            O que a vizinhança
            <br />
            costuma <em className="accent">perguntar</em>.
          </h2>
        </div>

        <div className="mt-10 grid gap-3 max-w-4xl">
          {faqItems.map((item, i) => {
            const isOpen = open === i;
            return (
              <div className="faq-row" key={item.q} data-reveal>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-6 text-left px-5 md:px-6 py-5 cursor-pointer"
                >
                  <span className="text-base md:text-lg text-foreground-950 font-medium">{item.q}</span>
                  <i
                    className={`shrink-0 text-xl text-accent-500 ${isOpen ? "ri-subtract-line" : "ri-add-line"}`}
                  ></i>
                </button>
                <div className={`faq-body ${isOpen ? "is-open" : ""}`}>
                  <div>
                    <p className="px-5 md:px-6 pb-5 text-sm md:text-base text-foreground-700 leading-relaxed m-0">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}