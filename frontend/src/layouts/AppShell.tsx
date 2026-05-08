import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import { api, clearStoredToken, getStoredToken } from "../services/api";

const navItems = [
  { to: "/", label: "Dashboard" },
  { to: "/incidents", label: "Incidents" }
];

export function AppShell() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string>("Loading...");

  useEffect(() => {
    if (!getStoredToken()) {
      navigate("/login");
      return;
    }

    api
      .get("/auth/me")
      .then((response) => setUserEmail(response.data.email))
      .catch(() => {
        clearStoredToken();
        navigate("/login");
      });
  }, [navigate]);

  function logout() {
    clearStoredToken();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-mist">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8">
        <header className="mb-8 flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan">NexusOps AI</p>
            <h1 className="text-3xl font-semibold">Operational Intelligence Platform</h1>
          </div>
          <div className="flex items-center gap-4">
            <nav className="flex gap-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `rounded-full px-4 py-2 text-sm transition ${
                      isActive ? "bg-cyan text-slate-950" : "bg-white/5 text-mist hover:bg-white/10"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="hidden rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 md:block">
              {userEmail}
            </div>
            <button
              onClick={logout}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-mist hover:bg-white/10"
            >
              Logout
            </button>
          </div>
        </header>
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
