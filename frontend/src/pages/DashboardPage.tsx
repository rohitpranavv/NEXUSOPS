import { useEffect, useState } from "react";

import { api } from "../services/api";

type DashboardSummary = {
  open_incidents: number;
  critical_services: number;
  active_alerts: number;
  knowledge_nodes: number;
};

export function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);

  useEffect(() => {
    api.get("/dashboard/summary").then((response) => setSummary(response.data));
  }, []);

  const metrics = [
    { label: "Open Incidents", value: summary?.open_incidents ?? "-" },
    { label: "Critical Services", value: summary?.critical_services ?? "-" },
    { label: "Active Alerts", value: summary?.active_alerts ?? "-" },
    { label: "Knowledge Nodes", value: summary?.knowledge_nodes ?? "-" }
  ];

  return (
    <section className="space-y-8">
      <div className="grid gap-4 md:grid-cols-4">
        {metrics.map((metric) => (
          <article key={metric.label} className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-slate-300">{metric.label}</p>
            <p className="mt-4 text-4xl font-semibold text-cyan">{metric.value}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        <article className="rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(62,231,216,0.22),_transparent_45%),linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">AI Readout</p>
          <h2 className="mt-3 text-2xl font-semibold">Incident posture is stable, but search ingestion is lagging.</h2>
          <p className="mt-4 max-w-2xl text-slate-300">
            This starter page is wired for dashboard summaries, graph widgets, and AI-generated incident narratives.
          </p>
        </article>
        <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Priority Queue</p>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li>Payments edge latency investigation</li>
            <li>Search ingestion backlog recovery</li>
            <li>Dependency graph enrichment for core services</li>
          </ul>
        </article>
      </div>
    </section>
  );
}
