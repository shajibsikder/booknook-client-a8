"use client";

import React, { useState } from "react";
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
  const [hasImgError, setHasImgError] = useState(false);

  return (
    <article className="group flex flex-col h-full bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-stone-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-orange-500/40 dark:hover:border-orange-500/30 transition-all duration-300">
      {/* Book Cover Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 dark:bg-slate-800 flex items-center justify-center">
        {hasImgError || !book.image ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-stone-100 dark:bg-slate-800 text-stone-400 dark:text-stone-500">
            <BookOpen className="w-10 h-10 mb-1.5 stroke-1" />
            <span className="text-[11px] text-center font-medium">No cover image</span>
          </div>
        ) : (
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            onError={() => setHasImgError(true)}
          />
        )}
      </div>

      {/* Book Information (Smart, compact layout for 5 cards per row) */}
      <div className="flex flex-col flex-1 p-3.5 sm:p-4 justify-between">
        <div className="space-y-1.5">
          <h3 className="font-serif text-base sm:text-[17px] font-bold text-stone-900 dark:text-white line-clamp-1 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
            {book.title}
          </h3>

          {/* Author Name */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
            <User className="w-3.5 h-3.5 text-orange-600 shrink-0" />
            <span className="truncate">by {book.author}</span>
          </div>

          {/* Category under author */}
          <div className="text-[11px] font-medium text-stone-500 dark:text-stone-400 flex items-center gap-1 pt-0.5">
            <span className="text-stone-400 dark:text-stone-500">Category:</span>
            <span className="text-orange-600 dark:text-orange-400 font-semibold">{book.category}</span>
          </div>

          {/* Short description */}
          <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed pt-1">
            {book.description}
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-3 mt-3 border-t border-stone-100 dark:border-slate-800">
          <Link
            href={`/books/${book._id}`}
            className="w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 bg-stone-100 dark:bg-slate-800 text-stone-800 dark:text-stone-200 group-hover:bg-orange-600 group-hover:text-white dark:group-hover:bg-orange-600 dark:group-hover:text-white transition-all shadow-sm"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>View Details</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
