import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      // Optionally verify token and fetch user
      // authService.getCurrentUser().then(setUser).catch(() => {});
    }
    setLoading(false);
  }, []);

  const signup = async (name, email, password) => {
    await authService.signup(name, email, password);
  };

  const verifyOTP = async (email, otp) => {
    const data = await authService.verifyOTP(email, otp);
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem("token", data.token);
  };

  const login = async (email, password) => {
    const data = await authService.login(email, password);
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem("token", data.token);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, signup, verifyOTP, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
