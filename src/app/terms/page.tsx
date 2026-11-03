"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin } from "lucide-react";

export default function TermsPage() {
  useEffect(() => {
    document.title = "BookNook | Terms & Conditions";
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
          Terms & Conditions
        </h1>
        <p className="text-xs text-stone-400">
          Last revised: October 2026 • Effective for all BookNook readers & contributors
        </p>
      </div>

      {/* Main Content Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/80 dark:border-slate-800 p-6 sm:p-10 lg:p-12 shadow-sm space-y-8 text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <span className="text-orange-600">01.</span> Acceptance of Terms
          </h2>
          <p>
            By accessing or using the BookNook website, creating an account, or participating in the circulation of library volumes, you confirm that you have read, understood, and agreed to be bound by these Terms and Conditions.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <span className="text-orange-600">02.</span> Book Circulation & Borrowing Rules
          </h2>
          <ul className="space-y-2.5 list-disc pl-5 text-sm">
            <li>
              <strong>Loan Duration:</strong> Borrowed books are intended for personal, non-commercial reading within the standard 14-day circulation window.
            </li>
            <li>
              <strong>Single Copy Rule (No Double Borrow):</strong> To maintain equitable access for all readers, a patron may not borrow more than one copy of the exact same title at any given time.
            </li>
            <li>
              <strong>Return Obligation:</strong> Readers agree to return borrowed titles through their &apos;My Borrows&apos; dashboard as soon as they complete reading, ensuring the available stock is restored for subsequent patrons.
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <span className="text-orange-600">03.</span> Contributing Books to the Catalog
          </h2>
          <p>
            When adding a new title to BookNook via the &apos;Add Book&apos; portal, you agree to:
          </p>
          <ul className="space-y-2 list-disc pl-5 text-sm">
            <li>Provide accurate details (authentic book title, author name, and appropriate category).</li>
            <li>Only submit genuine cover image URLs that are safe, non-offensive, and publicly accessible.</li>
            <li>Maintain honest reporting of total copies physically or digitally available for community loan.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <span className="text-orange-600">04.</span> Account Integrity & Security
          </h2>
          <p>
            You are responsible for maintaining the confidentiality of your reader account credentials. You agree to notify BookNook immediately if you suspect unauthorized access or compromise of your login session.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3 pt-2 border-t border-stone-100 dark:border-slate-800">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <span className="text-orange-600">05.</span> Contact & Support
          </h2>
          <p>
            Questions or feedback regarding these terms may be directed to our support desk:
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
