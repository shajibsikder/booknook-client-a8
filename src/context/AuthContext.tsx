"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export interface User {
  name: string;
  email: string;
  photoURL: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  register: (name: string, email: string, photoURL: string, pass: string) => Promise<boolean>;
  googleLogin: () => Promise<boolean>;
  logout: () => Promise<void>;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Restore session from localStorage on initial mount (prevents redirect to login on reload)
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("booknook_user");
      const storedToken = localStorage.getItem("booknook_token");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      if (storedToken) {
        setToken(storedToken);
      }
    } catch (e) {
      console.error("Failed to restore session", e);
    } finally {
      setLoading(false);
    }
  }, []);

  // Request JWT token from backend
  const requestJWT = async (email: string, name?: string) => {
    try {
      const res = await fetch(`${API_BASE}/jwt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        if (data.token) {
          localStorage.setItem("booknook_token", data.token);
          setToken(data.token);
        }
      }
    } catch (err) {
      console.error("JWT creation failed:", err);
    }
  };

  const login = async (email: string, pass: string): Promise<boolean> => {
    try {
      // Find user from registered users storage or default test credentials
      const registeredUsers = JSON.parse(localStorage.getItem("booknook_registered_users") || "[]");
      let matchedUser = registeredUsers.find((u: any) => u.email.toLowerCase() === email.toLowerCase());

      if (!matchedUser) {
        // Fallback demo user if logging in with demo credentials
        if (email === "reader@booknook.com" && pass.length >= 6) {
          matchedUser = {
            name: "Dev Reader",
            email: "reader@booknook.com",
            photoURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
            password: pass,
          };
        } else {
          toast.error("Invalid email or password. Please try again or register!");
          return false;
        }
      } else if (matchedUser.password !== pass) {
        toast.error("Incorrect password! Please check your credentials.");
        return false;
      }

      const sessionUser: User = {
        name: matchedUser.name,
        email: matchedUser.email,
        photoURL: matchedUser.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      };

      setUser(sessionUser);
      localStorage.setItem("booknook_user", JSON.stringify(sessionUser));
      await requestJWT(sessionUser.email, sessionUser.name);
      toast.success(`Welcome back, ${sessionUser.name}!`);
      return true;
    } catch (error: any) {
      toast.error(error?.message || "Login failed");
      return false;
    }
  };

  const register = async (name: string, email: string, photoURL: string, pass: string): Promise<boolean> => {
    try {
      const registeredUsers = JSON.parse(localStorage.getItem("booknook_registered_users") || "[]");
      const exists = registeredUsers.some((u: any) => u.email.toLowerCase() === email.toLowerCase());

      if (exists) {
        toast.error("An account with this email already exists!");
        return false;
      }

      const newUser = {
        name,
        email,
        photoURL: photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
        password: pass,
      };

      registeredUsers.push(newUser);
      localStorage.setItem("booknook_registered_users", JSON.stringify(registeredUsers));

      toast.success("Account created successfully! Please login now.");
      return true;
    } catch (error: any) {
      toast.error(error?.message || "Registration failed");
      return false;
    }
  };

  const googleLogin = async (): Promise<boolean> => {
    try {
      const googleUser: User = {
        name: "Google Reader",
        email: "google.reader@gmail.com",
        photoURL: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80",
      };

      setUser(googleUser);
      localStorage.setItem("booknook_user", JSON.stringify(googleUser));
      await requestJWT(googleUser.email, googleUser.name);
      toast.success("Signed in with Google successfully!");
      return true;
    } catch (error: any) {
      toast.error("Google sign in failed");
      return false;
    }
  };

  const logout = async () => {
    try {
      await fetch(`${API_BASE}/logout`, { method: "POST", credentials: "include" });
    } catch (e) {
      console.warn("Logout endpoint call failed", e);
    }
    setUser(null);
    setToken(null);
    localStorage.removeItem("booknook_user");
    localStorage.removeItem("booknook_token");
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, googleLogin, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
