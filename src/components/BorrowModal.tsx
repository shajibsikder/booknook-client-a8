"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { BookMarked, Calendar, X, AlertCircle } from "lucide-react";

interface BorrowModalProps {
  isOpen: boolean;
  book: {
    _id: string;
    title: string;
    image: string;
    author: string;
    totalCopies: number;
  };
  onClose: () => void;
  onSuccess: () => void;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function BorrowModal({ isOpen, book, onClose, onSuccess }: BorrowModalProps) {
  const { user, token } = useAuth();
  const [returnDate, setReturnDate] = useState(() => {
    // Default 14 days return period
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().split("T")[0];
  });
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch(`${API_BASE}/borrows`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
          "x-user-email": user.email,
        },
        body: JSON.stringify({
          bookId: book._id,
          bookTitle: book.title,
          bookImage: book.image,
          userEmail: user.email,
          userName: user.name,
          returnDate: returnDate,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to borrow book");
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 dark:border-slate-800 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/40 text-orange-600 flex items-center justify-center">
              <BookMarked className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-serif text-stone-900 dark:text-white">Borrow Book</h3>
              <p className="text-xs text-stone-500">BookNook Circulation Desk</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="mt-4 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 flex items-start gap-3 text-rose-700 dark:text-rose-400 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Book Summary Card */}
          <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-stone-50 dark:bg-slate-800/60 border border-stone-100 dark:border-slate-800">
            <div className="relative w-14 h-20 shrink-0 rounded-lg overflow-hidden bg-stone-200 dark:bg-slate-700 shadow-sm flex items-center justify-center">
              <BookMarked className="w-6 h-6 text-stone-400" />
              <img
                src={book.image}
                alt={book.title}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
                onLoad={(e) => {
                  (e.target as HTMLElement).style.display = "block";
                }}
              />
            </div>
            <div>
              <h4 className="font-semibold text-stone-900 dark:text-white line-clamp-1">{book.title}</h4>
              <p className="text-xs text-stone-500 dark:text-stone-400">by {book.author}</p>
              <span className="inline-block mt-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                {book.totalCopies} copies available
              </span>
            </div>
          </div>

          {/* User Name (Read-Only) */}
          <div>
            <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-1">
              Reader Name
            </label>
            <input
              type="text"
              readOnly
              value={user?.name || ""}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-100 dark:bg-slate-800/80 text-stone-700 dark:text-stone-300 text-sm cursor-not-allowed"
            />
          </div>

          {/* User Email (Read-Only) */}
          <div>
            <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-1">
              Reader Email
            </label>
            <input
              type="email"
              readOnly
              value={user?.email || ""}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-100 dark:bg-slate-800/80 text-stone-700 dark:text-stone-300 text-sm cursor-not-allowed"
            />
          </div>

          {/* Return Date */}
          <div>
            <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-orange-600" />
              Proposed Return Date
            </label>
            <input
              type="date"
              required
              min={new Date().toISOString().split("T")[0]}
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-stone-800 dark:text-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || book.totalCopies <= 0}
              className="px-6 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 shadow-md shadow-orange-600/20 disabled:opacity-50 transition-all"
            >
              {submitting ? "Processing..." : "Confirm Borrow"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
