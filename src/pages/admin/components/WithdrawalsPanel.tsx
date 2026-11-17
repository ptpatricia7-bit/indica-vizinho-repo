import { withdrawals } from "@/mocks/admin";
import AdminTable from "@/pages/admin/components/AdminTable";

export default function WithdrawalsPanel() {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="surface-card p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-500 m-0">Saque mínimo</p>
          <p className="stat-value mt-3 m-0">R$ 10</p>
        </div>
        <div className="surface-card p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-500 m-0">Taxa fixa</p>
          <p className="stat-value mt-3 m-0">R$ 2</p>
        </div>
        <div className="surface-card p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-500 m-0">Solicitações</p>
          <p className="stat-value mt-3 m-0">{withdrawals.length}</p>
        </div>
        <div className="surface-card p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-500 m-0">Pendentes</p>
          <p className="stat-value mt-3 m-0">{withdrawals.filter((w) => w.status === "Pendente").length}</p>
        </div>
      </div>

      <AdminTable
        columns={[
          { key: "id", label: "ID" },
          { key: "vizinho", label: "Vizinho" },
          { key: "bruto", label: "Valor solicitado" },
          { key: "taxa", label: "Taxa" },
          { key: "liquido", label: "Valor líquido" },
          { key: "data", label: "Data" },
          { key: "status", label: "Status" },
        ]}
        rows={withdrawals}
      />
    </div>
  );
}