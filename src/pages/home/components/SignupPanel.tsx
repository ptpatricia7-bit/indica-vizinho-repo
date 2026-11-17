import { useState } from "react";
import { plans } from "@/mocks/home";

const SUBMIT_URL = "https://readdy.ai/api/form/daubjkhggrtvtk1bga7g";

type FormResponse = {
  code?: string;
  message?: string;
  meta?: { message?: string; detail?: string };
};

export default function SignupPanel() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [formError, setFormError] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const honeypot = String(formData.get("website_alt") || "").trim();
    if (honeypot) {
      setStatus("ok");
      form.reset();
      return;
    }
    formData.delete("website_alt");

    setStatus("sending");
    setFormError("");

    try {
      const body = new URLSearchParams();
      formData.forEach((value, key) => {
        if (typeof value === "string") body.append(key, value);
      });

      const response = await fetch(SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });

      const responseText = await response.text();
      let parsed: FormResponse | null = null;
      try {
        parsed = JSON.parse(responseText) as FormResponse;
      } catch {
        parsed = null;
      }

      const serverMsg = parsed?.meta?.message || parsed?.message || parsed?.meta?.detail || responseText || "";
      const code = parsed?.code;
      const isSpam = String(serverMsg).toLowerCase().includes("spam");

      if (response.ok && code === "OK" && !isSpam) {
        setStatus("ok");
        form.reset();
        return;
      }

      setStatus("error");
      setFormError(String(serverMsg) || "Não foi possível enviar seu cadastro agora. Tente novamente.");
    } catch {
      setStatus("error");
      setFormError("Falha de conexão ao enviar. Verifique sua internet e tente novamente.");
    }
  };

  return (
    <section className="panel panel-full" id="cadastro" data-side="bottom">
      <img
        className="panel-bg"
        data-parallax="0.32"
        src="https://readdy.ai/api/search-image?query=A%20dark%20wooden%20door%20standing%20slightly%20open%20at%20night%20with%20a%20warm%20amber%20glow%20spilling%20out%20onto%20weathered%20stone%2C%20tropical%20palm%20leaves%20in%20shadow%2C%20deep%20dusk%20blue%20tones%2C%20cinematic%20and%20welcoming%2C%20soft%20haze%2C%20no%20text&width=2400&height=1350&seq=iv-panel-porta&orientation=landscape"
        alt="Porta de madeira escura entreaberta à noite, com uma luz dourada escapando sobre a pedra."
      />
      <div className="panel-veil" />
      <div className="panel-inner">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
          <div className="panel-copy">
            <p className="stamp" data-reveal>
              06 — Cadastro
            </p>
            <h2 data-reveal>
              Abra a porta
              <br />
              da <em className="accent">vizinhança</em>.
            </h2>
            <p className="sub" data-reveal>
              Preencha seus dados e escolha a sua casinha para entrar. Você recebe o baú com o SaaS de Criativos, o
              contador de 30 dias, o seu link de indicação e o aluguel recorrente ativo.
            </p>
            <ul className="points" data-reveal>
              <li>
                <i className="ri-checkbox-circle-line" />
                <span>Indique 2 vizinhos e libere 50% do valor.</span>
              </li>
              <li>
                <i className="ri-checkbox-circle-line" />
                <span>Baú de recompensa a cada indicação confirmada.</span>
              </li>
              <li>
                <i className="ri-checkbox-circle-line" />
                <span>Saques a partir de R$ 10,00 com taxa fixa de R$ 2,00.</span>
              </li>
            </ul>
          </div>

          <form
            id="cadastro-form"
            data-readdy-form
            onSubmit={onSubmit}
            className="surface-card p-5 md:p-7 flex flex-col gap-4 w-full"
            data-reveal
          >
            <div className="flex flex-col gap-1.5">
              <label htmlFor="iv-nome" className="text-sm text-foreground-800">
                Seu nome
              </label>
              <input id="iv-nome" name="nome" type="text" required placeholder="Ex.: Maria Vizinho" className="iv-input" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="iv-usuario" className="text-sm text-foreground-800">
                Nome de usuário
              </label>
              <input
                id="iv-usuario"
                name="usuario"
                type="text"
                required
                placeholder="Ex.: maria.vizinho"
                className="iv-input"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="iv-email" className="text-sm text-foreground-800">
                E-mail
              </label>
              <input id="iv-email" name="email" type="email" required placeholder="voce@email.com" className="iv-input" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="iv-whatsapp" className="text-sm text-foreground-800">
                WhatsApp
              </label>
              <input id="iv-whatsapp" name="whatsapp" type="tel" placeholder="(00) 90000-0000" className="iv-input" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="iv-plano" className="text-sm text-foreground-800">
                Plano de interesse
              </label>
              <select id="iv-plano" name="plano" className="iv-select" defaultValue={plans[0].name}>
                {plans.map((p) => (
                  <option key={p.id} value={`${p.name} — ${p.price}`}>
                    {p.name} — {p.price}
                  </option>
                ))}
                <option value="Ainda não sei qual plano">Ainda não sei qual plano</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="iv-mensagem" className="text-sm text-foreground-800">
                Quer contar algo? (opcional)
              </label>
              <textarea
                id="iv-mensagem"
                name="mensagem"
                maxLength={500}
                rows={3}
                placeholder="Conte como você quer começar na vizinhança."
                className="iv-textarea resize-none"
              />
            </div>

            <input
              className="form-aux"
              type="text"
              name="website_alt"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              readOnly
            />

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-1 whitespace-nowrap rounded-full bg-primary-500 text-[#14100a] text-sm font-semibold px-6 py-3.5 hover:bg-primary-400 transition-colors disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2"
            >
              {status === "sending" ? (
                <>
                  <i className="ri-loader-4-line animate-spin"></i> Enviando...
                </>
              ) : (
                <>
                  Quero entrar na vizinhança <i className="ri-arrow-right-line"></i>
                </>
              )}
            </button>

            {status === "ok" && (
              <p className="text-sm text-primary-500 flex items-center gap-2">
                <i className="ri-checkbox-circle-fill"></i> Cadastro enviado! Assim que confirmarmos, seu link de
                indicação é liberado.
              </p>
            )}
            {status === "error" && <p className="text-sm text-red-400">{formError}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}