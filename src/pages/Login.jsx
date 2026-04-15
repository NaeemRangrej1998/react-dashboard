import React, { useMemo, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";
import { DEMO_USERS } from "../auth/rbac";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, login } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const redirectTo = useMemo(() => location.state?.from?.pathname || "/dashboard", [location.state]);

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = login(form);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    navigate(redirectTo, { replace: true });
  };

  const fillDemoUser = (user) => {
    setForm({ username: user.username, password: user.password });
    setError("");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl grid lg:grid-cols-[1.1fr_0.9fr] bg-white rounded-3xl overflow-hidden shadow-2xl">
        <section className="bg-slate-900 text-white p-10 flex flex-col justify-between">
          <div>
            <p className="uppercase tracking-[0.35em] text-xs text-sky-300">RBAC</p>
            <h1 className="text-4xl font-bold mt-4 leading-tight">Learning &amp; Development Dashboard</h1>
            <p className="mt-4 text-slate-300 max-w-md">
              Sign in with a role-based account to unlock routes, sidebar items, and page actions based on permissions.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-slate-200">Demo accounts</p>
            {DEMO_USERS.map((user) => (
              <button
                key={user.id}
                type="button"
                onClick={() => fillDemoUser(user)}
                className="w-full text-left rounded-2xl border border-slate-700 bg-slate-800/80 px-4 py-3 hover:border-sky-400 hover:bg-slate-800 transition-colors"
              >
                <div className="font-semibold">{user.name}</div>
                <div className="text-sm text-slate-300">
                  {user.username} / {user.password}
                </div>
                <div className="text-xs uppercase tracking-[0.25em] text-sky-300 mt-1">{user.role}</div>
              </button>
            ))}
          </div>
        </section>

        <section className="p-10">
          <div className="max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-slate-900">Login</h2>
            <p className="text-slate-500 mt-2">Use any demo username and password to enter the dashboard.</p>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Username</span>
                <input
                  type="text"
                  value={form.username}
                  onChange={(event) => setForm((prev) => ({ ...prev, username: event.target.value }))}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
                  placeholder="Enter username"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">Password</span>
                <input
                  type="password"
                  value={form.password}
                  onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
                  placeholder="Enter password"
                />
              </label>

              {error ? <p className="text-sm text-red-600">{error}</p> : null}

              <button
                type="submit"
                className="w-full rounded-xl bg-sky-600 text-white py-3 font-semibold hover:bg-sky-700 transition-colors"
              >
                Sign in
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
