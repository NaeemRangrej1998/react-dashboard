import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { DEMO_USERS, ROLE_PERMISSIONS } from "./rbac";

const AUTH_STORAGE_KEY = "learning-rbac-auth-user";
const AuthContext = createContext(null);

function getStoredUser() {
  const rawUser = localStorage.getItem(AUTH_STORAGE_KEY);

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser);
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser());

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      return;
    }

    localStorage.removeItem(AUTH_STORAGE_KEY);
  }, [user]);

  const value = useMemo(() => {
    const permissions = user ? ROLE_PERMISSIONS[user.role] ?? [] : [];

    return {
      user,
      permissions,
      isAuthenticated: Boolean(user),
      login: ({ username, password }) => {
        const matchedUser = DEMO_USERS.find(
          (item) => item.username === username.trim() && item.password === password.trim(),
        );

        if (!matchedUser) {
          return {
            ok: false,
            message: "Invalid username or password. Try one of the demo accounts below.",
          };
        }

        const sessionUser = {
          id: matchedUser.id,
          name: matchedUser.name,
          username: matchedUser.username,
          role: matchedUser.role,
        };

        setUser(sessionUser);

        return { ok: true, user: sessionUser };
      },
      logout: () => setUser(null),
      hasPermission: (permission) => {
        if (!permission) {
          return true;
        }

        return permissions.includes(permission);
      },
    };
  }, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
