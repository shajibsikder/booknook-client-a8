"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, User, Tag, ArrowRight } from "lucide-react";

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

const categoryColors: Record<string, string> = {
  Fiction: "bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800",
  Science: "bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
  History: "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800",
  Kids: "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
  Others: "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700",
};

export default function BookCard({ book }: { book: Book }) {
  const isOutOfStock = book.totalCopies <= 0;
  const categoryStyle = categoryColors[book.category] || categoryColors.Others;

  return (
    <div className="group flex flex-col h-full bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-stone-200/80 dark:border-slate-800 hover:shadow-xl hover:border-orange-200 dark:hover:border-slate-700 transition-all duration-300">
      {/* Book Cover Image Container */}
      <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-stone-100 dark:bg-slate-800">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80";
          }}
        />

        {/* Category Pill Tag */}
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border backdrop-blur-md shadow-sm ${categoryStyle}`}>
            <Tag className="w-3 h-3" />
            {book.category}
          </span>
        </div>

        {/* Stock / Copies Badge */}
        <div className="absolute top-3 right-3">
          {isOutOfStock ? (
            <span className="inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-full bg-rose-600 text-white shadow-sm">
              Not Available
            </span>
          ) : (
            <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-stone-900/80 text-stone-200 backdrop-blur-md">
              {book.totalCopies} {book.totalCopies === 1 ? "copy" : "copies"}
            </span>
          )}
        </div>
      </div>

      {/* Book Content */}
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
            className="w-full py-2.5 px-4 rounded-xl text-sm font-medium flex items-center justify-center gap-2 bg-stone-50 dark:bg-slate-800 text-stone-800 dark:text-stone-200 group-hover:bg-orange-600 group-hover:text-white dark:group-hover:bg-orange-600 transition-all shadow-sm"
          >
            <BookOpen className="w-4 h-4" />
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
          </Link>
        </div>
      </div>
    </div>
  );
}
