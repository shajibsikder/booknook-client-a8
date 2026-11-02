"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { User, Mail, BookOpen, BookMarked, ShieldCheck, Calendar, ArrowRight, LogOut } from "lucide-react";

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
        {/* Profile Header Banner Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/80 dark:border-slate-800 shadow-xl overflow-hidden">
          {/* Header decorative stripe */}
          <div className="h-32 bg-gradient-to-r from-orange-600 via-amber-600 to-amber-700 relative" />

          {/* User Details Section */}
          <div className="px-6 sm:px-10 pb-8 sm:pb-10 relative">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-end gap-5">
                <img
                  src={user?.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"}
                  alt={user?.name || "User Avatar"}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover ring-4 ring-white dark:ring-slate-900 shadow-xl bg-stone-100"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";
                  }}
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
                      {user?.name || "Avid Reader"}
                    </h1>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified Reader
                    </span>
                  </div>
                  <p className="text-sm text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-orange-600" />
                    {user?.email}
                  </p>
                </div>
              </div>

              <button
                onClick={() => logout()}
                className="self-start sm:self-auto px-5 py-2.5 rounded-xl border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-sm font-medium transition-colors flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>

            {/* Account Details Box */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-100 dark:border-slate-800">
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-800/60">
                <span className="text-xs uppercase font-bold text-stone-400 tracking-wider">Membership</span>
                <p className="text-sm font-semibold text-stone-900 dark:text-white mt-1">BookNook Community</p>
              </div>
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-800/60">
                <span className="text-xs uppercase font-bold text-stone-400 tracking-wider">Account Role</span>
                <p className="text-sm font-semibold text-stone-900 dark:text-white mt-1">Library Patron</p>
              </div>
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-800/60">
                <span className="text-xs uppercase font-bold text-stone-400 tracking-wider">Access Status</span>
                <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-1">Active (Unlimited)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Activity & Quick Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Contributed Books Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-stone-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="text-3xl font-extrabold font-serif text-stone-900 dark:text-white">
                {loadingStats ? "..." : myBooksCount}
              </span>
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white">
                Books Contributed
              </h3>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Titles you have shared with the BookNook reading community.
              </p>
            </div>
            <Link
              href="/my-books"
              className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700 pt-2"
            >
              <span>Manage My Books</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Borrowed Books Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-stone-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 flex items-center justify-center">
                <BookMarked className="w-6 h-6" />
              </div>
              <span className="text-3xl font-extrabold font-serif text-stone-900 dark:text-white">
                {loadingStats ? "..." : myBorrowsCount}
              </span>
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white">
                Active Borrowed Loans
              </h3>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Books currently borrowed by you that are awaiting return.
              </p>
            </div>
            <Link
              href="/my-borrows"
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 pt-2"
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
