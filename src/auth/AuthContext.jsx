import React, { createContext, useContext, useMemo, useState } from "react";

const AUTH_COOKIE_NAME = "learning_auth_user";
const AUTH_STORAGE_KEY = "learning-rbac-auth-user";
const AuthContext = createContext(null);

function clearStoredUser() {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch {
    // Ignore storage cleanup errors and continue with cookie auth.
  }
}

function setCookie(name, value, days = 7) {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function getCookie(name) {
  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${name}=`));

  if (!cookie) {
    return null;
  }

  return decodeURIComponent(cookie.split("=")[1]);
}

function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
}

function getStoredUser() {
  let rawUser = null;

  try {
    rawUser = localStorage.getItem(AUTH_STORAGE_KEY);
  } catch {
    rawUser = null;
  }

  rawUser = rawUser ?? getCookie(AUTH_COOKIE_NAME);

  if (!rawUser) {
    return null;
  }

  try {
    const parsedUser = JSON.parse(rawUser);
    const isValidRoleShape =
      parsedUser &&
      typeof parsedUser.username === "string" &&
      parsedUser.role &&
      typeof parsedUser.role.role === "string" &&
      Array.isArray(parsedUser.role.permission);

    if (!isValidRoleShape) {
      deleteCookie(AUTH_COOKIE_NAME);
      return null;
    }

    return parsedUser;
  } catch {
    clearStoredUser();
    deleteCookie(AUTH_COOKIE_NAME);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser());

  const value = useMemo(() => ({
    user,
    isAuthenticated: Boolean(user),
    login: (sessionUser) => {
      const isValidSessionUser =
        sessionUser &&
        typeof sessionUser.username === "string" &&
        sessionUser.role &&
        typeof sessionUser.role.role === "string" &&
        Array.isArray(sessionUser.role.permission);

      if (!isValidSessionUser) {
        return {
          ok: false,
          message: "Invalid login payload.",
        };
      }

      setUser(sessionUser);
      setCookie(AUTH_COOKIE_NAME, JSON.stringify(sessionUser));

      return { ok: true, user: sessionUser };
    },
    logout: () => {
      setUser(null);
      clearStoredUser();
      deleteCookie(AUTH_COOKIE_NAME);
    },
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
