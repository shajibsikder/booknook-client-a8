"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { BookMarked, Calendar, CheckCircle2, RotateCcw, BookOpen } from "lucide-react";
import toast from "react-hot-toast";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function MyBorrowsPage() {
  const { user, token } = useAuth();
  const [borrows, setBorrows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState<string | null>(null);

  useEffect(() => {
    document.title = "BookNook | My Borrows";
  }, []);

  const fetchBorrows = useCallback(async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/borrows?email=${encodeURIComponent(user.email)}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "x-user-email": user.email,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setBorrows(data);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch borrowed books");
    } finally {
      setLoading(false);
    }
  }, [user?.email, token]);

  useEffect(() => {
    fetchBorrows();
  }, [fetchBorrows]);

  // Handle Returning a Book
  const handleReturn = async (borrow: any) => {
    setReturningId(borrow._id);
    try {
      const res = await fetch(`${API_BASE}/borrows/${borrow._id}`, {
        method: "DELETE",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "x-user-email": user?.email || "",
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Return failed");

      toast.success(`"${borrow.bookTitle}" returned successfully! Thanks for reading.`);
      setBorrows((prev) => prev.filter((b) => b._id !== borrow._id));
    } catch (err: any) {
      toast.error(err.message || "Failed to return book");
    } finally {
      setReturningId(null);
    }
  };

  return (
    <ProtectedRoute>
      <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white">
              My Borrowed Books
            </h1>
            <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
              Keep track of your active reading loans and return books when you are finished.
            </p>
          </div>

          <Link
            href="/books"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-medium text-sm shadow-md transition-all self-start sm:self-auto hover:bg-orange-600 dark:hover:bg-orange-500 dark:hover:text-white"
          >
            <BookOpen className="w-4 h-4" />
            <span>Borrow More Books</span>
          </Link>
        </div>

        {/* Borrows Table */}
        {loading ? (
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-white dark:bg-slate-900 rounded-2xl" />
            ))}
          </div>
        ) : borrows.length > 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-stone-100 dark:border-slate-800 bg-stone-50/50 dark:bg-slate-800/30 text-stone-500 dark:text-stone-400 text-xs uppercase tracking-wider">
                    <th className="py-4 px-6">Book Title</th>
                    <th className="py-4 px-6">Borrow Date</th>
                    <th className="py-4 px-6">Return Deadline</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-slate-800 text-sm">
                  {borrows.map((b) => (
                    <tr key={b._id} className="hover:bg-stone-50/70 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={b.bookImage}
                            alt={b.bookTitle}
                            className="w-12 h-16 object-cover rounded-lg shadow-sm"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80";
                            }}
                          />
                          <div>
                            <Link
                              href={`/books/${b.bookId}`}
                              className="font-semibold text-stone-900 dark:text-white hover:text-orange-600 line-clamp-1"
                            >
                              {b.bookTitle}
                            </Link>
                            <span className="text-xs text-stone-400">ID: {b.bookId.slice(-6)}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-stone-600 dark:text-stone-300">
                        <div className="flex items-center gap-1.5 text-xs">
                          <Calendar className="w-3.5 h-3.5 text-stone-400" />
                          <span>{b.borrowDate}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-stone-600 dark:text-stone-300">
                        <div className="flex items-center gap-1.5 text-xs font-medium">
                          <Calendar className="w-3.5 h-3.5 text-orange-500" />
                          <span>{b.returnDate}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                          <CheckCircle2 className="w-3 h-3" />
                          In Reading
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleReturn(b)}
                          disabled={returningId === b._id}
                          className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 shadow-sm shadow-orange-600/20 disabled:opacity-50 transition-all inline-flex items-center gap-1.5"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>{returningId === b._id ? "Returning..." : "Return Book"}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-stone-200 dark:border-slate-800">
            <BookMarked className="w-12 h-12 text-stone-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200">
              No borrowed books right now
            </h3>
            <p className="text-sm text-stone-500 mt-1 mb-6">
              Browse our shelves and pick up an inspiring book for your weekend reading.
            </p>
            <Link
              href="/books"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-medium text-sm shadow-md"
            >
              <BookOpen className="w-4 h-4" />
              <span>Browse Catalog</span>
            </Link>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
