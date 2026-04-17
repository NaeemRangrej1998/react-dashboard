import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { useAuth } from "../auth/AuthContext.jsx";
import { menu } from "../menu";

const AUTH_STORAGE_KEY = "learning-rbac-auth-user";

const roleOptions = [
  { value: "superadmin", label: "superadmin" },
  { value: "user", label: "user" },
];

const permissionOptions = [
  { value: "view", label: "view" },
  { value: "add", label: "add" },
  { value: "edit", label: "edit" },
  { value: "delete", label: "delete" },
];

const pageOptions = menu.flatMap((item) => {
  if (item.children) {
    return item.children.map((child) => ({
      value: child.to,
      label: child.label,
    }));
  }

  return item.to
    ? [{
        value: item.to,
        label: item.label,
      }]
    : [];
});

const selectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "48px",
    borderRadius: "0.5rem",
    borderColor: state.isFocused ? "#3b82f6" : "#cbd5e1",
    boxShadow: "none",
    "&:hover": {
      borderColor: "#3b82f6",
    },
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? "#2563eb" : state.isFocused ? "#dbeafe" : "#fff",
    color: state.isSelected ? "#fff" : "#0f172a",
  }),
};

export default function Login() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: null,
    pages: [],
    pagePermissions: {},
  });
  const [error, setError] = useState("");

  const redirectPath = location.state?.from?.pathname || "/dashboard";

  if (isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = login(form);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(result.user));
    } catch {
      // Ignore localStorage errors and continue login flow.
    }

    navigate(redirectPath, { replace: true });
  };

  const handlePagesChange = (selectedPages) => {
    const nextPages = selectedPages ?? [];

    setForm((prev) => {
      const nextPagePermissions = Object.fromEntries(
        nextPages.map((page) => [page.value, prev.pagePermissions[page.value] ?? []]),
      );

      return {
        ...prev,
        pages: nextPages,
        pagePermissions: nextPagePermissions,
      };
    });
  };

  const handlePagePermissionChange = (pageValue, permissions) => {
    setForm((prev) => ({
      ...prev,
      pagePermissions: {
        ...prev.pagePermissions,
        [pageValue]: permissions ?? [],
      },
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-lg p-8">
        <h1 className="text-3xl font-bold text-slate-900">Login</h1>
        <p className="mt-2 text-sm text-slate-500">Enter any username and password to continue.</p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-slate-700">Username</label>
            <input
              type="text"
              value={form.username}
              onChange={(event) => setForm((prev) => ({ ...prev, username: event.target.value }))}
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              placeholder="Enter password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Role</label>
            <div className="mt-2">
              <Select
                options={roleOptions}
                value={form.role}
                onChange={(value) => setForm((prev) => ({ ...prev, role: value }))}
                placeholder="Select role"
                styles={selectStyles}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Pages</label>
            <div className="mt-2">
              <Select
                options={pageOptions}
                value={form.pages}
                onChange={handlePagesChange}
                placeholder="Select pages"
                isMulti
                styles={selectStyles}
              />
            </div>
          </div>

          {form.pages.length > 0 ? (
            <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div>
                <h2 className="text-sm font-semibold text-slate-800">Page Permissions</h2>
                <p className="text-xs text-slate-500 mt-1">Assign one or more permissions for each selected page.</p>
              </div>

              {form.pages.map((page) => (
                <div key={page.value}>
                  <label className="block text-sm font-medium text-slate-700">{page.label}</label>
                  <div className="mt-2">
                    <Select
                      options={permissionOptions}
                      value={form.pagePermissions[page.value] ?? []}
                      onChange={(value) => handlePagePermissionChange(page.value, value)}
                      placeholder={`Select permissions for ${page.label}`}
                      isMulti
                      styles={selectStyles}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
