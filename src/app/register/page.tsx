"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { BookOpen, User, Mail, Image as ImageIcon, Lock, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const { user, register, googleLogin } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "BookNook | Register";
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  // Validate password
  const validatePassword = (pass: string): string | null => {
    if (pass.length < 6) {
      return "Password length must be at least 6 characters";
    }
    if (!/[A-Z]/.test(pass)) {
      return "Password must include at least one Uppercase letter (A-Z)";
    }
    if (!/[a-z]/.test(pass)) {
      return "Password must include at least one Lowercase letter (a-z)";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const passError = validatePassword(password);
    if (passError) {
      setPasswordError(passError);
      toast.error(passError);
      return;
    }
    setPasswordError(null);

    setSubmitting(true);
    const success = await register(
      name,
      email,
      photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      password
    );
    setSubmitting(false);

    if (success) {
      router.push("/login");
    }
  };

  const handleGoogleSignIn = async () => {
    const success = await googleLogin();
    if (success) {
      router.push("/");
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl border border-stone-200/80 dark:border-slate-800 shadow-xl">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-1">
            <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center text-white shadow-md">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-stone-900 dark:text-white">
              Book<span className="text-orange-600">Nook</span>
            </span>
          </Link>
          <h2 className="font-serif text-3xl font-bold text-stone-900 dark:text-white">
            Create Reader Account
          </h2>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Join our community library to borrow, add, and circulate books.
          </p>
        </div>

        {passwordError && (
          <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 flex items-start gap-2.5 text-xs text-rose-700 dark:text-rose-400 font-medium">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{passwordError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-orange-600" />
              Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-orange-600" />
              Email Address *
            </label>
            <input
              type="email"
              required
              placeholder="reader@booknook.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-orange-600" />
              Photo URL (Optional)
            </label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/photo-..."
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Password with Live Validation Indicators */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-orange-600" />
              Password *
            </label>
            <input
              type="password"
              required
              placeholder="Min 6 chars with Uppercase & Lowercase"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (passwordError) setPasswordError(null);
              }}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            {/* Validation Checklist */}
            <div className="mt-2 space-y-1 text-[11px] text-stone-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2
                  className={`w-3.5 h-3.5 ${password.length >= 6 ? "text-emerald-500" : "text-stone-300"}`}
                />
                <span className={password.length >= 6 ? "text-emerald-600 font-medium" : ""}>
                  At least 6 characters
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2
                  className={`w-3.5 h-3.5 ${/[A-Z]/.test(password) ? "text-emerald-500" : "text-stone-300"}`}
                />
                <span className={/[A-Z]/.test(password) ? "text-emerald-600 font-medium" : ""}>
                  At least one uppercase letter (A-Z)
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2
                  className={`w-3.5 h-3.5 ${/[a-z]/.test(password) ? "text-emerald-500" : "text-stone-300"}`}
                />
                <span className={/[a-z]/.test(password) ? "text-emerald-600 font-medium" : ""}>
                  At least one lowercase letter (a-z)
                </span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-2xl text-sm font-semibold text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 shadow-md shadow-orange-600/20 transition-all flex items-center justify-center gap-2"
          >
            <span>{submitting ? "Creating Account..." : "Register"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-stone-200 dark:border-slate-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-slate-900 px-3 text-stone-400">Or continue with</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full py-2.5 rounded-2xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-700 dark:text-stone-200 text-sm font-medium hover:bg-stone-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-3 shadow-sm"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <p className="text-center text-xs text-stone-500 dark:text-stone-400">
          Already have a reader account?{" "}
          <Link href="/login" className="font-semibold text-orange-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
