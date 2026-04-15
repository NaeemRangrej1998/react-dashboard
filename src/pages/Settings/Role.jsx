import React from "react";
import { useAuth } from "../../auth/AuthContext.jsx";
import { PERMISSIONS } from "../../auth/rbac";

export default function Role() {
  const { hasPermission } = useAuth();
  const canManageRoles = hasPermission(PERMISSIONS.SETTINGS_ROLE_MANAGE);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Role</h1>
      <p className="text-gray-600 dark:text-gray-300">
        {canManageRoles
          ? "This account can manage roles and permission assignments."
          : "This account can only view role information."}
      </p>
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 max-w-2xl">
        <h2 className="text-lg font-semibold text-slate-900">Role management permission</h2>
        <p className="mt-2 text-sm text-slate-500">
          <span className="font-mono">settings.role.manage</span>:{" "}
          <span className={canManageRoles ? "font-semibold text-green-600" : "font-semibold text-amber-600"}>
            {canManageRoles ? "granted" : "not granted"}
          </span>
        </p>
      </div>
    </div>
  );
}
