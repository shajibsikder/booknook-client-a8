"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  Mail,
  BookOpen,
  BookMarked,
  ArrowRight,
  LogOut,
  ShieldCheck,
  Award,
  Clock,
} from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://booknook-server-a8.vercel.app";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [myBooksCount, setMyBooksCount] = useState(0);
  const [myBorrowsCount, setMyBorrowsCount] = useState(0);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    document.title = "BookNook | My Profile";

    async function fetchStats() {
      if (!user?.email) return;
      try {
        const [booksRes, borrowsRes] = await Promise.all([
          fetch(`${API_BASE}/books?email=${encodeURIComponent(user.email)}`),
          fetch(`${API_BASE}/borrows?email=${encodeURIComponent(user.email)}`),
        ]);

        if (booksRes.ok) {
          const books = await booksRes.json();
          setMyBooksCount(books.length || 0);
        }
        if (borrowsRes.ok) {
          const borrows = await borrowsRes.json();
          setMyBorrowsCount(borrows.length || 0);
        }
      } catch (e) {
        console.error("Failed to load user stats", e);
      } finally {
        setLoadingStats(false);
      }
    }

    fetchStats();
  }, [user]);

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/80 dark:border-slate-800 shadow-xl overflow-hidden">
          <div className="h-36 sm:h-44 bg-gradient-to-r from-amber-700 via-orange-600 to-amber-600 relative overflow-hidden" />

          <div className="px-6 sm:px-10 pb-8 sm:pb-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-14 sm:-mt-16 mb-5">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl sm:rounded-3xl overflow-hidden ring-4 ring-white dark:ring-slate-900 shadow-2xl bg-stone-100 dark:bg-slate-800 shrink-0">
                <img
                  src={user?.photoURL && !user.photoURL.includes("/avatar.jpg") ? user.photoURL : `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "Reader")}&background=ea580c&color=fff&size=256&bold=true`}
                  alt={user?.name || "User Avatar"}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "Reader")}&background=ea580c&color=fff&size=256&bold=true`;
                  }}
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => logout()}
                  className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/70 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-600 hover:text-white dark:hover:bg-rose-600 dark:hover:text-white text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shadow-sm hover:shadow"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white">
                  {user?.name || "Avid Reader"}
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-stone-500 dark:text-stone-400">
                <p className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>{user?.email}</span>
                </p>
                <span className="hidden sm:inline text-stone-300 dark:text-stone-700">•</span>
                <p className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-orange-600 shrink-0" />
                  <span className="font-semibold text-stone-700 dark:text-stone-200 capitalize">
                    Role: {user?.role || "Reader"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-stone-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-5 hover:border-amber-300 dark:hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center">
                <BookOpen className="w-7 h-7" />
              </div>
              <span className="text-4xl font-extrabold font-serif text-stone-900 dark:text-white">
                {loadingStats ? "..." : myBooksCount}
              </span>
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-white">
                Books Contributed
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1.5 leading-relaxed">
                Titles you have personally added to BookNook shelves for other readers to discover.
              </p>
            </div>
            <Link
              href="/my-books"
              className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 pt-2"
            >
              <span>Manage My Books</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Borrowed Books Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-stone-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-5 hover:border-emerald-300 dark:hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
                <BookMarked className="w-7 h-7" />
              </div>
              <span className="text-4xl font-extrabold font-serif text-stone-900 dark:text-white">
                {loadingStats ? "..." : myBorrowsCount}
              </span>
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-white">
                Active Borrowed Loans
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1.5 leading-relaxed">
                Books currently checked out in your reading list. Remember to return them once finished!
              </p>
            </div>
            <Link
              href="/my-borrows"
              className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 pt-2"
            >
              <span>View Borrowed Books</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
