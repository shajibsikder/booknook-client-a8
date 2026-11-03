"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import BorrowModal from "@/components/BorrowModal";
import { User, Tag, Calendar, ArrowLeft, BookMarked, CheckCircle2, AlertCircle, BookOpen } from "lucide-react";
import toast from "react-hot-toast";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function BookDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [borrowModalOpen, setBorrowModalOpen] = useState(false);

  const fetchBookDetails = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/books/${id}`);
      if (res.ok) {
        const data = await res.json();
        setBook(data);
        document.title = `BookNook | ${data.title}`;
      } else {
        toast.error("Book not found");
        router.push("/books");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch book details");
    } finally {
      setLoading(false);
    }
  }, [id, router]);

  useEffect(() => {
    if (id) {
      fetchBookDetails();
    }
  }, [id, fetchBookDetails]);

  return (
    <ProtectedRoute>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Back Link */}
        <Link
          href="/books"
          className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-orange-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Books</span>
        </Link>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 animate-pulse">
            <div className="md:col-span-5 aspect-[3/4] bg-stone-200 dark:bg-slate-800 rounded-2xl" />
            <div className="md:col-span-7 space-y-4">
              <div className="h-8 bg-stone-200 dark:bg-slate-800 rounded w-3/4" />
              <div className="h-4 bg-stone-200 dark:bg-slate-800 rounded w-1/2" />
              <div className="h-32 bg-stone-200 dark:bg-slate-800 rounded" />
            </div>
          </div>
        ) : book ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/80 dark:border-slate-800 shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 p-6 sm:p-10 lg:p-12">
              {/* Left Column: Book Image */}
              <div className="md:col-span-5 flex flex-col items-center">
                <div className="relative w-full aspect-[3/4] max-w-sm rounded-2xl overflow-hidden shadow-2xl bg-stone-100 dark:bg-slate-800 flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-stone-400 stroke-1" />
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
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-600 text-white shadow-md">
                      {book.category}
                    </span>
                  </div>
                </div>

                {/* Copies status card */}
                <div className="w-full max-w-sm mt-6 p-4 rounded-2xl bg-stone-50 dark:bg-slate-800/60 border border-stone-200/60 dark:border-slate-700/60 flex items-center justify-between">
                  <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    Library Stock
                  </span>
                  {book.totalCopies > 0 ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {book.totalCopies} Available
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Not Available
                    </span>
                  )}
                </div>
              </div>

              {/* Right Column: Book Information */}
              <div className="md:col-span-7 flex flex-col justify-between space-y-8">
                <div className="space-y-6">
                  <div>
                    <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 dark:text-white leading-tight">
                      {book.title}
                    </h1>
                    <p className="text-lg text-orange-600 dark:text-orange-400 font-medium mt-2 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Written by {book.author}
                    </p>
                  </div>

                  {/* Metadata Chips */}
                  <div className="flex flex-wrap gap-4 py-3 border-y border-stone-100 dark:border-slate-800 text-xs sm:text-sm text-stone-600 dark:text-stone-300">
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-4 h-4 text-orange-500" />
                      <span className="font-semibold text-stone-900 dark:text-white">Genre:</span> {book.category}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-amber-500" />
                      <span className="font-semibold text-stone-900 dark:text-white">Listed:</span>{" "}
                      {book.createdAt ? new Date(book.createdAt).toLocaleDateString() : "Active Collection"}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white">Synopsis</h3>
                    <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-sm sm:text-base">
                      {book.description}
                    </p>
                  </div>

                  {/* Contributor / Added By Information */}
                  <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/30">
                    <p className="text-xs uppercase font-bold text-amber-800 dark:text-amber-400 tracking-wider">
                      Shared To BookNook By
                    </p>
                    <p className="text-sm font-semibold text-stone-900 dark:text-stone-100 mt-1">
                      {book.userName || "BookNook Curator"}
                    </p>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      {book.userEmail || "curator@booknook.com"}
                    </p>
                  </div>
                </div>

                {/* Borrow Button */}
                <div className="pt-6 border-t border-stone-100 dark:border-slate-800">
                  {book.totalCopies > 0 ? (
                    <button
                      onClick={() => setBorrowModalOpen(true)}
                      className="w-full sm:w-auto px-8 py-4 rounded-2xl font-medium text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 shadow-xl shadow-orange-600/25 flex items-center justify-center gap-3 transition-all hover:scale-[1.02]"
                    >
                      <BookMarked className="w-5 h-5" />
                      <span>Borrow This Book</span>
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full sm:w-auto px-8 py-4 rounded-2xl font-medium text-stone-400 bg-stone-200 dark:bg-slate-800 cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      <AlertCircle className="w-5 h-5" />
                      <span>Not Available (0 Copies Left)</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* Borrow Modal */}
        {book && (
          <BorrowModal
            isOpen={borrowModalOpen}
            book={book}
            onClose={() => setBorrowModalOpen(false)}
            onSuccess={() => {
              toast.success("Hooray! Book borrowed successfully!");
              fetchBookDetails();
            }}
          />
        )}
      </div>
    </ProtectedRoute>
  );
}
