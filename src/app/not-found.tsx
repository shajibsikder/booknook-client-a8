"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { BookOpen, Home, Compass } from "lucide-react";

export default function NotFound() {
  useEffect(() => {
    document.title = "BookNook | 404 Page Not Found";
  }, []);

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-3xl bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 flex items-center justify-center mx-auto shadow-inner">
          <Compass className="w-12 h-12 animate-pulse" />
        </div>
        <span className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full text-xs font-black bg-stone-900 text-white dark:bg-white dark:text-stone-900 shadow">
          404
        </span>
      </div>

      <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-stone-900 dark:text-white">
        Lost Between The Shelves?
      </h1>
      <p className="mt-3 text-sm sm:text-base text-stone-500 dark:text-stone-400 max-w-md mx-auto">
        The literary page you are looking for has been misplaced, borrowed by another universe, or never written.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="px-6 py-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-medium text-sm shadow-md shadow-orange-600/20 flex items-center gap-2 transition-all hover:gap-3"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        <Link
          href="/books"
          className="px-6 py-3 rounded-2xl bg-stone-100 dark:bg-slate-800 text-stone-700 dark:text-stone-300 font-medium text-sm hover:bg-stone-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"
        >
          <BookOpen className="w-4 h-4" />
          <span>Browse All Books</span>
        </Link>
      </div>
    </div>
  );
}
