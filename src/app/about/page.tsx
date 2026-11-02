"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { BookOpen, Sparkles, Heart, Users, ShieldCheck, ArrowRight, Library, Globe2 } from "lucide-react";

export default function AboutPage() {
  useEffect(() => {
    document.title = "BookNook | About Us";
  }, []);

  return (
    <div className="space-y-16 py-12 sm:py-20">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 text-xs font-semibold">
          <Sparkles className="w-4 h-4" />
          <span>Our Story & Mission</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 dark:text-white tracking-tight leading-tight">
          A Sanctuary Where Stories Belong to Everyone
        </h1>

        <p className="text-base sm:text-xl text-stone-600 dark:text-stone-300 max-w-3xl mx-auto leading-relaxed">
          BookNook was born from a simple belief: <span className="text-orange-600 font-semibold italic">a book unread is a story paused</span>. We connect bibliophiles through an open, community-powered online library where anyone can contribute, borrow, and pass wisdom forward.
        </p>
      </section>

      {/* Visual Stats Row */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-8 rounded-3xl bg-stone-900 text-white shadow-xl">
          <div className="text-center space-y-1">
            <p className="font-serif text-3xl sm:text-4xl font-extrabold text-orange-400">100%</p>
            <p className="text-xs uppercase tracking-wider text-stone-400">Free Community Access</p>
          </div>
          <div className="text-center space-y-1">
            <p className="font-serif text-3xl sm:text-4xl font-extrabold text-amber-400">1,450+</p>
            <p className="text-xs uppercase tracking-wider text-stone-400">Books Circulated</p>
          </div>
          <div className="text-center space-y-1">
            <p className="font-serif text-3xl sm:text-4xl font-extrabold text-emerald-400">99.2%</p>
            <p className="text-xs uppercase tracking-wider text-stone-400">Timely Return Rate</p>
          </div>
          <div className="text-center space-y-1">
            <p className="font-serif text-3xl sm:text-4xl font-extrabold text-sky-400">850+</p>
            <p className="text-xs uppercase tracking-wider text-stone-400">Avid Book Lovers</p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white">
            What Drives BookNook
          </h2>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Principles that guide every shelf, borrowing transaction, and community exchange.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-stone-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-white">
              Circular Reading
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Instead of gathering dust on private shelves, books find infinite lives in new readers' hands, promoting sustainability and shared knowledge.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-stone-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-white">
              Honor System & Trust
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              No punitive late fees or aggressive algorithms. Our community thrives on mutual trust, courteous returns, and honest reader stewardship.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-stone-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-white">
              Reader Empowerment
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Anyone can contribute titles, curate niche categories, review synopses, and build their unique literary profile with zero gatekeeping.
            </p>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-tr from-stone-900 to-stone-800 text-white space-y-6 shadow-2xl">
          <h2 className="font-serif text-3xl font-bold text-white">
            Ready to Start Your Reading Journey?
          </h2>
          <p className="text-stone-300 text-sm sm:text-base max-w-lg mx-auto">
            Discover rare gems, borrow in 1 click, or share a favorite book from your bookshelf today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/books"
              className="px-7 py-3.5 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white font-medium shadow-lg transition-all flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Browse All Books</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/register"
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-medium backdrop-blur-md transition-colors"
            >
              Join BookNook Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
