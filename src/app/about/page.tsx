"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin } from "lucide-react";

export default function AboutPage() {
  useEffect(() => {
    document.title = "BookNook | About Us";
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 hover:text-orange-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 dark:text-white">
          About BookNook
        </h1>
        <p className="text-xs text-stone-400">
          A community-powered online library built for book lovers everywhere.
        </p>
      </div>

      {/* Main Content Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/80 dark:border-slate-800 p-6 sm:p-10 lg:p-12 shadow-sm space-y-8 text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <span className="text-orange-600">01.</span> Our Mission
          </h2>
          <p>
            BookNook was born from a simple belief: <span className="text-orange-600 font-medium italic">a book unread is a story paused</span>. We connect readers through an open, community-powered digital library where anyone can contribute books from their shelf, borrow inspiring titles freely, and pass knowledge forward.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <span className="text-orange-600">02.</span> How BookNook Works
          </h2>
          <ul className="space-y-2.5 list-disc pl-5 text-sm">
            <li>
              <strong>Discover & Borrow:</strong> Browse our complete catalog, filter by your favorite genre, and reserve any available book with a single click.
            </li>
            <li>
              <strong>Share Your Shelf:</strong> Add your finished books to BookNook with title, author, and total copies so fellow readers can borrow them.
            </li>
            <li>
              <strong>Return on Time:</strong> Once you finish reading, return the book through your &apos;My Borrows&apos; dashboard so someone else can pick it up.
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <span className="text-orange-600">03.</span> Core Values
          </h2>
          <p>
            Our library is built on mutual respect and shared passion for literature:
          </p>
          <ul className="space-y-2 list-disc pl-5 text-sm">
            <li><strong>100% Free Access:</strong> No hidden subscriptions, late fines, or barriers to reading.</li>
            <li><strong>Trust & Community:</strong> A reader-driven ecosystem where users respect return deadlines and care for shared books.</li>
            <li><strong>Circular Knowledge:</strong> Giving physical and digital volumes multiple lifetimes in the hands of eager learners.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-3 pt-2 border-t border-stone-100 dark:border-slate-800">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <span className="text-orange-600">04.</span> Get in Touch
          </h2>
          <p>
            Have questions, book recommendations, or need assistance? Reach out to us anytime:
          </p>
          <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-stone-600 dark:text-stone-400 pt-1">
            <span className="flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-orange-600" />
              booknook@gmail.com
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-orange-600" />
              +880 1700-000000
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-orange-600" />
              Gazipur, Dhaka, Bangladesh
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
