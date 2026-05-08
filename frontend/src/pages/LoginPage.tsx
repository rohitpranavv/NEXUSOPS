import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { api, setStoredToken } from "../services/api";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@nexusops.app");
  const [password, setPassword] = useState("admin12345");
  const [error, setError] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");

    try {
      const response = await api.post("/auth/login", { email, password });
      setStoredToken(response.data.access_token);
      navigate("/");
    } catch {
      setError("Login failed. Check credentials or backend status.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-mist">
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-cyan">NexusOps AI</p>
        <h1 className="mt-3 text-3xl font-semibold">Operator Login</h1>
        <p className="mt-3 text-sm text-slate-300">
          Default seeded credentials are prefilled for the local environment.
        </p>

        <div className="mt-6 space-y-4">
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-mist outline-none"
          />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-mist outline-none"
          />
          {error ? <p className="text-sm text-rose-300">{error}</p> : null}
          <button className="w-full rounded-full bg-cyan px-4 py-3 text-sm font-medium text-slate-950">
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}
