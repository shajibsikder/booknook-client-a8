"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { User, Mail, Image as ImageIcon, Lock, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const { user, register, googleLogin } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"Reader" | "Librarian">("Reader");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = "BookNook | Register";
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setSubmitting(true);
    const initialAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name || "Reader"
    )}&background=ea580c&color=fff&size=256&bold=true`;

    const success = await register(
      name,
      email,
      photoURL.trim() || initialAvatar,
      password,
      role
    );
    setSubmitting(false);

    if (success) {
      router.push("/login");
    }
  };

  const handleGoogleSignIn = () => {
    googleLogin("/");
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl border border-stone-200/80 dark:border-slate-800 shadow-xl">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center justify-center mb-1">
            <img
              src="/logo.png"
              alt="BookNook"
              className="h-10 w-auto object-contain dark:hidden"
            />
            <img
              src="/logo-dark.png"
              alt="BookNook"
              className="h-10 w-auto object-contain hidden dark:block"
            />
          </Link>
          <h2 className="font-serif text-3xl font-bold text-stone-900 dark:text-white">
            Create Reader Account
          </h2>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Join our community library to borrow, add, and circulate books.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-orange-600" />
              Photo URL (Optional)
            </label>
            <input
              type="url"
              placeholder="Leave empty to use initial avatar"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-orange-600" />
              Password *
            </label>
            <input
              type="password"
              required
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-orange-600" />
              Confirm Password *
            </label>
            <input
              type="password"
              required
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-2">
              Select Your Role
            </label>
            <div className="flex items-center gap-6 pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-stone-700 dark:text-stone-200">
                <input
                  type="radio"
                  name="role"
                  value="Reader"
                  checked={role === "Reader"}
                  onChange={() => setRole("Reader")}
                  className="w-4 h-4 text-orange-600 focus:ring-orange-500 border-stone-300 cursor-pointer"
                />
                <span>Reader</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-stone-700 dark:text-stone-200">
                <input
                  type="radio"
                  name="role"
                  value="Librarian"
                  checked={role === "Librarian"}
                  onChange={() => setRole("Librarian")}
                  className="w-4 h-4 text-orange-600 focus:ring-orange-500 border-stone-300 cursor-pointer"
                />
                <span>Librarian</span>
              </label>
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

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-stone-200 dark:border-slate-700" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-slate-900 px-3 text-stone-400 font-medium">
              Or continue with
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full py-3 rounded-2xl text-sm font-semibold text-stone-700 dark:text-stone-200 bg-stone-50 dark:bg-slate-800 hover:bg-stone-100 dark:hover:bg-slate-700/80 border border-stone-200 dark:border-slate-700 transition-all flex items-center justify-center gap-3"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
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
          <Link
            href="/login"
            className="font-semibold text-orange-600 hover:text-orange-700 transition-colors"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
