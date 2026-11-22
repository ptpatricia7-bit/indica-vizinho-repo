import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase, supabaseReady } from "@/lib/supabase";
import { useSession } from "@/lib/useSession";

type Mode = "entrar" | "criar";

function traduzErro(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("invalid login credentials")) return "E-mail ou senha incorretos.";
  if (m.includes("email not confirmed")) return "Confirme seu e-mail antes de entrar. Procure a mensagem na caixa de entrada.";
  if (m.includes("already registered")) return "Este e-mail já tem cadastro. Use a aba Entrar.";
  if (m.includes("rate limit") || m.includes("too many")) return "Muitas tentativas. Aguarde alguns minutos e tente de novo.";
  if (m.includes("password")) return "A senha precisa ter pelo menos 8 caracteres.";
  return "Não foi possível concluir agora. Tente novamente.";
}

const inputClass =
  "w-full rounded-lg bg-background-100 border border-foreground-950/15 px-4 py-3 text-foreground-950 placeholder:text-foreground-600 focus:outline-none focus:border-primary-500";

export default function Entrar() {
  const navigate = useNavigate();
  const { session, loading } = useSession();
  const [mode, setMode] = useState<Mode>("entrar");
  const [busy, setBusy] = useState(false);
  const [erro, setErro] = useState("");
  const [aviso, setAviso] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase) return;
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "").trim();
    const senha = String(form.get("senha") || "");
    const nome = String(form.get("nome") || "").trim();

    setBusy(true);
    setErro("");
    setAviso("");

    if (mode === "entrar") {
      const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
      setBusy(false);
      if (error) return setErro(traduzErro(error.message));
      navigate("/");
      return;
    }

    if (senha.length < 8) {
      setBusy(false);
      return setErro("A senha precisa ter pelo menos 8 caracteres.");
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password: senha,
      options: {
        data: { nome },
        emailRedirectTo: `${window.location.origin}${__BASE_PATH__}entrar`,
      },
    });
    setBusy(false);
    if (error) return setErro(traduzErro(error.message));
    if (data.session) {
      navigate("/");
    } else {
      setAviso("Cadastro criado. Enviamos um link de confirmação para o seu e-mail. Abra-o e depois volte para entrar.");
    }
  };

  const sair = async () => {
    await supabase?.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-background-50 text-foreground-950 flex flex-col">
      <header className="px-4 md:px-10 h-16 md:h-20 flex items-center">
        <Link to="/" className="font-heading text-lg md:text-xl font-semibold tracking-tight">
          Indica <em className="italic text-primary-500">Vizinho</em>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 pb-16">
        <div className="w-full max-w-md rounded-2xl bg-background-100/80 border border-foreground-950/10 p-6 md:p-8">
          {!supabaseReady ? (
            <p className="m-0 text-foreground-800">
              O cadastro ainda não está disponível neste endereço. Tente novamente em alguns minutos.
            </p>
          ) : loading ? (
            <p className="m-0 text-foreground-700">Carregando…</p>
          ) : session ? (
            <div className="flex flex-col gap-4">
              <h1 className="font-heading text-3xl font-semibold m-0">Você já está dentro</h1>
              <p className="m-0 text-foreground-800">
                Conectada como <strong>{session.user.email}</strong>.
              </p>
              <Link
                to="/"
                className="rounded-full bg-primary-500 text-[#14100a] font-semibold px-5 py-3 text-center hover:bg-primary-400 transition-colors"
              >
                Ir para o início
              </Link>
              <button
                type="button"
                onClick={sair}
                className="rounded-full border border-foreground-950/20 px-5 py-3 text-foreground-900 hover:bg-background-200 transition-colors cursor-pointer"
              >
                Sair
              </button>
            </div>
          ) : (
            <>
              <h1 className="font-heading text-3xl font-semibold m-0">
                {mode === "entrar" ? "Entrar na vizinhança" : "Criar minha conta"}
              </h1>

              <div className="mt-5 flex rounded-full bg-background-200/70 border border-foreground-950/10 p-1">
                {(["entrar", "criar"] as Mode[]).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => {
                      setMode(m);
                      setErro("");
                      setAviso("");
                    }}
                    className={`flex-1 rounded-full py-2 text-sm font-medium cursor-pointer transition-colors ${
                      mode === m ? "bg-primary-500 text-[#14100a]" : "text-foreground-800 hover:text-foreground-950"
                    }`}
                  >
                    {m === "entrar" ? "Entrar" : "Criar conta"}
                  </button>
                ))}
              </div>

              <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
                {mode === "criar" && (
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="nome" className="text-sm text-foreground-800">Nome</label>
                    <input id="nome" name="nome" type="text" required autoComplete="name" className={inputClass} />
                  </div>
                )}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-sm text-foreground-800">E-mail</label>
                  <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="senha" className="text-sm text-foreground-800">
                    Senha{mode === "criar" ? " (mínimo 8 caracteres)" : ""}
                  </label>
                  <input
                    id="senha"
                    name="senha"
                    type="password"
                    required
                    minLength={mode === "criar" ? 8 : undefined}
                    autoComplete={mode === "criar" ? "new-password" : "current-password"}
                    className={inputClass}
                  />
                </div>

                {erro && <p role="alert" className="m-0 text-sm text-red-300">{erro}</p>}
                {aviso && <p role="status" className="m-0 text-sm text-primary-400">{aviso}</p>}

                <button
                  type="submit"
                  disabled={busy}
                  className="rounded-full bg-primary-500 text-[#14100a] font-semibold px-5 py-3 hover:bg-primary-400 transition-colors disabled:opacity-60 cursor-pointer"
                >
                  {busy ? "Aguarde…" : mode === "entrar" ? "Entrar" : "Criar conta"}
                </button>
              </form>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
