import { useState } from "react";
import AdminHeader from "@/pages/admin/components/AdminHeader";
import OverviewPanel from "@/pages/admin/components/OverviewPanel";
import MembersPanel from "@/pages/admin/components/MembersPanel";
import ReferralsPanel from "@/pages/admin/components/ReferralsPanel";
import ChestsPanel from "@/pages/admin/components/ChestsPanel";
import WithdrawalsPanel from "@/pages/admin/components/WithdrawalsPanel";
import PlansAdminPanel from "@/pages/admin/components/PlansAdminPanel";
import NetworkPanel from "@/pages/admin/components/NetworkPanel";
import { adminKpis } from "@/mocks/admin";

const tabs = ["Visão geral", "Vizinhos", "Indicações", "Baús", "Saques", "Planos", "Rede MMN"] as const;
type Tab = (typeof tabs)[number];

export default function Admin() {
  const [tab, setTab] = useState<Tab>("Visão geral");

  return (
    <div className="min-h-screen bg-background-50 text-foreground-950">
      <AdminHeader />

      <main className="px-4 md:px-8 lg:px-12 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {adminKpis.map((k) => (
            <article className="surface-card p-5" key={k.label}>
              <div className="flex items-start justify-between gap-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-500 m-0">{k.label}</p>
                <span className="w-9 h-9 rounded-full bg-primary-500/10 border border-primary-500/30 flex items-center justify-center shrink-0">
                  <i className={`${k.icon} text-primary-500`}></i>
                </span>
              </div>
              <p className="font-heading text-3xl md:text-4xl font-semibold text-foreground-950 mt-4 mb-0">{k.value}</p>
              <p className="text-xs text-foreground-600 mt-2 mb-0">{k.delta}</p>
            </article>
          ))}
        </div>

        <nav className="mt-8 flex flex-wrap items-center gap-1.5 rounded-full bg-background-200/70 border border-foreground-950/10 p-1 w-fit">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors cursor-pointer ${
                tab === t ? "bg-primary-500 text-[#14100a] font-semibold" : "text-foreground-700 hover:text-foreground-950"
              }`}
            >
              {t}
            </button>
          ))}
        </nav>

        <div className="mt-7">
          {tab === "Visão geral" && <OverviewPanel />}
          {tab === "Vizinhos" && <MembersPanel />}
          {tab === "Indicações" && <ReferralsPanel />}
          {tab === "Baús" && <ChestsPanel />}
          {tab === "Saques" && <WithdrawalsPanel />}
          {tab === "Planos" && <PlansAdminPanel />}
          {tab === "Rede MMN" && <NetworkPanel />}
        </div>
      </main>
    </div>
  );
}