"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  Mail,
  BookOpen,
  BookMarked,
  ShieldCheck,
  Calendar,
  ArrowRight,
  LogOut,
  Sparkles,
  Award,
  CheckCircle2,
  Clock,
} from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

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
        {/* Main Profile Header Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/80 dark:border-slate-800 shadow-xl overflow-hidden">
          {/* Header Banner */}
          <div className="h-36 sm:h-44 bg-gradient-to-r from-amber-700 via-orange-600 to-amber-600 relative overflow-hidden">
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute top-4 right-4 sm:top-5 sm:right-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/25 backdrop-blur-md text-white text-xs font-medium border border-white/20 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Reader Profile
              </span>
            </div>
          </div>

          {/* Profile Details Container */}
          <div className="px-6 sm:px-10 pb-8 sm:pb-10">
            {/* Top Row: Avatar overlapping banner on left + Logout action on right */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-14 sm:-mt-16 mb-5">
              {/* Avatar with clear ring border */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl sm:rounded-3xl overflow-hidden ring-4 ring-white dark:ring-slate-900 shadow-2xl bg-stone-100 dark:bg-slate-800 shrink-0">
                <img
                  src={
                    user?.photoURL ||
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                  }
                  alt={user?.name || "User Avatar"}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";
                  }}
                />
              </div>

              {/* Logout Button nicely placed on the right */}
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

            {/* User Identity Section - Fully below banner, crisp text, zero collision */}
            <div className="space-y-2 pb-6 border-b border-stone-200/80 dark:border-slate-800">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white">
                  {user?.name || "Avid Reader"}
                </h1>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-900/60">
                  <ShieldCheck className="w-3.5 h-3.5 text-orange-600" />
                  Verified Reader
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-stone-500 dark:text-stone-400">
                <p className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>{user?.email}</span>
                </p>
                <span className="hidden sm:inline text-stone-300 dark:text-stone-700">•</span>
                <p className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Active Reader Member</span>
                </p>
              </div>
            </div>

            {/* Membership Details Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-800/60 border border-stone-100 dark:border-slate-800">
                <span className="text-[11px] uppercase font-bold text-stone-400 dark:text-stone-500 tracking-wider">
                  Membership Tier
                </span>
                <p className="text-sm font-bold text-stone-900 dark:text-white mt-1">BookNook Community</p>
              </div>
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-800/60 border border-stone-100 dark:border-slate-800">
                <span className="text-[11px] uppercase font-bold text-stone-400 dark:text-stone-500 tracking-wider">
                  Account Role
                </span>
                <p className="text-sm font-bold text-stone-900 dark:text-white mt-1">Active Library Patron</p>
              </div>
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-800/60 border border-stone-100 dark:border-slate-800">
                <span className="text-[11px] uppercase font-bold text-stone-400 dark:text-stone-500 tracking-wider">
                  Circulation Status
                </span>
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Good Standing (Unlimited)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Activity & Quick Action Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Contributed Books Card */}
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
