import { chests } from "@/mocks/admin";
import AdminTable from "@/pages/admin/components/AdminTable";

export default function ChestsPanel() {
  return (
    <div className="flex flex-col gap-5">
      <div className="surface-card p-6">
        <h2 className="font-heading text-xl font-semibold text-foreground-950 m-0">Baús de recompensa</h2>
        <p className="text-sm text-foreground-600 mt-2 m-0 max-w-2xl leading-relaxed">
          Ao entrar em qualquer casinha, o vizinho recebe um baú de boas-vindas para abrir e ganha o SaaS de Criativos
          para Redes Sociais — o mesmo em todos os planos. Cada indicação confirmada também libera um novo baú.
        </p>
      </div>

      <AdminTable
        columns={[
          { key: "id", label: "Baú" },
          { key: "vizinho", label: "Vizinho" },
          { key: "plano", label: "Plano da casinha" },
          { key: "premio", label: "Prêmio" },
          { key: "data", label: "Aberto em" },
        ]}
        rows={chests}
      />
    </div>
  );
}