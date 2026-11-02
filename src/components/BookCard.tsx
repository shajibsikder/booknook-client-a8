"use client";

import React from "react";
import Link from "next/link";
import { User, Tag, ArrowRight, BookOpen } from "lucide-react";

export interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  totalCopies: number;
  userName?: string;
  userEmail?: string;
  createdAt?: string;
}

const categoryStyles: Record<string, string> = {
  Fiction: "bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 border-purple-200/80 dark:border-purple-800/60",
  Science: "bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300 border-sky-200/80 dark:border-sky-800/60",
  History: "bg-amber-50 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 border-amber-200/80 dark:border-amber-800/60",
  Kids: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800/60",
  Others: "bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300 border-stone-200 dark:border-stone-700",
};

export default function BookCard({ book }: { book: Book }) {
  const isOutOfStock = book.totalCopies <= 0;
  const isLowStock = book.totalCopies === 1;
  const categoryBadge = categoryStyles[book.category] || categoryStyles.Others;

  return (
    <article className="group flex flex-col h-full bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl overflow-hidden border border-stone-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-orange-500/40 dark:hover:border-orange-500/30 transition-all duration-300">
      {/* Book Cover Image Container (Portrait Book Ratio) */}
      <div className="relative aspect-[4/5] overflow-hidden bg-stone-100 dark:bg-slate-800">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80";
          }}
        />

        {/* Gradient overlay for top badge contrast */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/40 via-black/10 to-transparent pointer-events-none" />

        {/* Category Badge (Top Left) */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border backdrop-blur-md shadow-sm ${categoryBadge}`}
          >
            <Tag className="w-3 h-3" />
            <span>{book.category}</span>
          </span>
        </div>

        {/* Dynamic Stock Badge (Top Right) */}
        <div className="absolute top-3 right-3">
          {isOutOfStock ? (
            <span className="inline-flex items-center text-[11px] font-bold px-2.5 py-1 rounded-full bg-rose-600 text-white shadow-md">
              Out of Stock
            </span>
          ) : isLowStock ? (
            <span className="inline-flex items-center text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-500 text-white shadow-md">
              1 Copy Left
            </span>
          ) : (
            <span className="inline-flex items-center text-[11px] font-bold px-2.5 py-1 rounded-full bg-stone-950/85 text-emerald-400 border border-emerald-500/30 shadow-md backdrop-blur-md">
              {book.totalCopies} Available
            </span>
          )}
        </div>
      </div>

      {/* Book Information */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 justify-between">
        <div className="space-y-2">
          <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900 dark:text-white line-clamp-1 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
            {book.title}
          </h3>

          <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
            <User className="w-3.5 h-3.5 text-orange-600 shrink-0" />
            <span className="truncate">by {book.author}</span>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed pt-1">
            {book.description}
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-5 mt-4 border-t border-stone-100 dark:border-slate-800">
          <Link
            href={`/books/${book._id}`}
            className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 bg-stone-100 dark:bg-slate-800 text-stone-800 dark:text-stone-200 group-hover:bg-orange-600 group-hover:text-white dark:group-hover:bg-orange-600 dark:group-hover:text-white transition-all shadow-sm"
          >
            <BookOpen className="w-4 h-4" />
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
