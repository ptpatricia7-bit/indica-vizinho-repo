import { referrals } from "@/mocks/admin";
import AdminTable from "@/pages/admin/components/AdminTable";

export default function ReferralsPanel() {
  const total = referrals.reduce((sum, r) => sum + Number(r.valor.replace(/[^\d,]/g, "").replace(",", ".")), 0);

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="surface-card p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-500 m-0">Indicações listadas</p>
          <p className="stat-value mt-3 m-0">{referrals.length}</p>
        </div>
        <div className="surface-card p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-500 m-0">Valor confirmado</p>
          <p className="stat-value mt-3 m-0">R$ {total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="surface-card p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-500 m-0">Regra de liberação</p>
          <p className="mt-3 text-sm text-foreground-800 m-0 leading-relaxed">
            O valor fica disponível quando a tarefa de indicar 2 vizinhos em qualquer plano é concluída — recompensa de
            50%.
          </p>
        </div>
      </div>

      <AdminTable
        columns={[
          { key: "id", label: "ID" },
          { key: "indicador", label: "Quem indicou" },
          { key: "indicado", label: "Vizinho indicado" },
          { key: "plano", label: "Plano" },
          { key: "valor", label: "Valor" },
          { key: "data", label: "Data" },
          { key: "status", label: "Status" },
        ]}
        rows={referrals}
      />
    </div>
  );
}