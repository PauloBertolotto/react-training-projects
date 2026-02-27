// src/Context/AuthProvider.jsx
import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("auth_user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem("auth_token"));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (token && user) {
      localStorage.setItem("auth_token", token);
      localStorage.setItem("auth_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
    }
  }, [token, user]);

  const login = async (email, cpf) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL || "http://localhost:3333"}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, cpf }),
        },
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Erro no login");
      setToken(json.token);
      setUser(json.user);
      setIsLoading(false);
      return json.user;
    } catch (err) {
      setIsLoading(false);
      throw err;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
  };

  const isAuthenticated = () => !!token && !!user;
  const hasRole = (...roles) => user && roles.includes(user.acesso);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        logout,
        isAuthenticated,
        hasRole,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
