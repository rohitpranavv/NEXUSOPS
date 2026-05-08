import { FormEvent, useEffect, useState } from "react";

import { api } from "../services/api";

type Incident = {
  id: number;
  title: string;
  summary: string;
  severity: string;
  service: string;
  status: string;
  ai_summary?: string | null;
};

export function IncidentsPage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    summary: "",
    severity: "medium",
    service: "",
    status: "open"
  });

  async function loadIncidents() {
    setLoading(true);
    const response = await api.get("/incidents");
    setIncidents(response.data);
    setLoading(false);
  }

  useEffect(() => {
    void loadIncidents();
  }, []);

  async function createIncident(event: FormEvent) {
    event.preventDefault();
    await api.post("/incidents", form);
    setForm({
      title: "",
      summary: "",
      severity: "medium",
      service: "",
      status: "open"
    });
    await loadIncidents();
  }

  async function generateSummary(id: number) {
    await api.post(`/ai/incidents/${id}/summarize`);
    await loadIncidents();
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Incident Desk</p>
          <h2 className="mt-2 text-2xl font-semibold">Active incidents</h2>
        </div>

        <div className="space-y-4">
          {loading ? (
            <p className="text-slate-300">Loading incidents...</p>
          ) : (
            incidents.map((incident) => (
              <article
                key={incident.id}
                className="rounded-2xl border border-white/10 bg-slate-900/60 p-4"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-lg font-medium">{incident.title}</h3>
                    <p className="text-sm text-slate-400">
                      {incident.service} · {incident.status}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-sm text-gold">
                      {incident.severity}
                    </span>
                    <button
                      onClick={() => generateSummary(incident.id)}
                      className="rounded-full border border-cyan/40 bg-cyan/10 px-3 py-1 text-sm text-cyan"
                    >
                      AI Summary
                    </button>
                  </div>
                </div>
                <p className="mt-3 text-sm text-slate-300">{incident.summary}</p>
                {incident.ai_summary ? (
                  <div className="mt-4 rounded-2xl border border-cyan/20 bg-cyan/10 p-3 text-sm text-cyan">
                    {incident.ai_summary}
                  </div>
                ) : null}
              </article>
            ))
          )}
        </div>
      </div>

      <form onSubmit={createIncident} className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Create Incident</p>
        <div className="mt-5 space-y-4">
          <input
            value={form.title}
            onChange={(event) => setForm({ ...form, title: event.target.value })}
            placeholder="Incident title"
            className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-mist outline-none"
          />
          <input
            value={form.service}
            onChange={(event) => setForm({ ...form, service: event.target.value })}
            placeholder="Service name"
            className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-mist outline-none"
          />
          <textarea
            value={form.summary}
            onChange={(event) => setForm({ ...form, summary: event.target.value })}
            placeholder="What happened?"
            rows={5}
            className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-mist outline-none"
          />
          <div className="grid gap-4 md:grid-cols-2">
            <select
              value={form.severity}
              onChange={(event) => setForm({ ...form, severity: event.target.value })}
              className="rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-mist outline-none"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
            <select
              value={form.status}
              onChange={(event) => setForm({ ...form, status: event.target.value })}
              className="rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-mist outline-none"
            >
              <option value="open">Open</option>
              <option value="investigating">Investigating</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
          <button className="w-full rounded-full bg-cyan px-4 py-3 text-sm font-medium text-slate-950">
            Save incident
          </button>
        </div>
      </form>
    </section>
  );
}

