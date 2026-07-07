import { createContext, useContext, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("bbdms_admin_token"));
  const [username, setUsername] = useState(localStorage.getItem("bbdms_admin_username"));

  const login = async (usernameInput, password) => {
    const res = await api.post("/admin/login", { username: usernameInput, password });
    localStorage.setItem("bbdms_admin_token", res.data.token);
    localStorage.setItem("bbdms_admin_username", res.data.username);
    setToken(res.data.token);
    setUsername(res.data.username);
  };

  const logout = async () => {
    try {
      await api.post("/admin/logout");
    } catch {
      // ignore network errors on logout
    }
    localStorage.removeItem("bbdms_admin_token");
    localStorage.removeItem("bbdms_admin_username");
    setToken(null);
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ token, username, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
