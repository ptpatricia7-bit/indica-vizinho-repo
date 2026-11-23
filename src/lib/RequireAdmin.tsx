import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useSession } from "@/lib/useSession";

// Troque pelo e-mail que você usa para entrar no site. Pode ter mais de um.
const ADMIN_EMAILS = ["ptpatricia7@gmail.com"];

function Aviso({ titulo, texto, link }: { titulo: string; texto: string; link?: { to: string; label: string } }) {
  return (
    <div className="min-h-screen bg-background-50 text-foreground-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-background-100/80 border border-foreground-950/10 p-6 md:p-8 flex flex-col gap-4">
        <h1 className="font-heading text-3xl font-semibold m-0">{titulo}</h1>
        <p className="m-0 text-foreground-800">{texto}</p>
        {link && (
          <Link
            to={link.to}
            className="rounded-full bg-primary-500 text-[#14100a] font-semibold px-5 py-3 text-center hover:bg-primary-400 transition-colors"
          >
            {link.label}
          </Link>
        )}
      </div>
    </div>
  );
}

export default function RequireAdmin({ children }: { children: ReactNode }) {
  const { session, loading } = useSession();

  if (loading) return <Aviso titulo="Carregando…" texto="Verificando seu acesso." />;

  const email = session?.user.email?.toLowerCase();
  if (!email) {
    return (
      <Aviso
        titulo="Área restrita"
        texto="Entre com a sua conta para acessar o painel."
        link={{ to: "/entrar", label: "Entrar" }}
      />
    );
  }
  if (!ADMIN_EMAILS.map((e) => e.toLowerCase()).includes(email)) {
    return (
      <Aviso
        titulo="Sem permissão"
        texto="Esta conta não tem acesso ao painel do administrador."
        link={{ to: "/", label: "Voltar ao início" }}
      />
    );
  }
  return <>{children}</>;
}
