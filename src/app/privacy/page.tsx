"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin } from "lucide-react";

export default function PrivacyPage() {
  useEffect(() => {
    document.title = "BookNook | Privacy Policy";
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
          Privacy Policy
        </h1>
        <p className="text-xs text-stone-400">
          Last revised: October 2026 • Your trust and privacy are sacred to us
        </p>
      </div>

      {/* Main Content Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/80 dark:border-slate-800 p-6 sm:p-10 lg:p-12 shadow-sm space-y-8 text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <span className="text-orange-600">01.</span> Information We Collect
          </h2>
          <p>
            BookNook collects only the minimal information necessary to deliver an enjoyable, dependable reading and borrowing experience:
          </p>
          <ul className="space-y-2 list-disc pl-5 text-sm">
            <li><strong>Account Identity:</strong> Your name and email address when creating an account or signing in.</li>
            <li><strong>Circulation History:</strong> Records of books you have contributed or borrowed, including loan timestamps and return dates.</li>
            <li><strong>Security Sessions:</strong> JSON Web Tokens (JWT) used strictly to authenticate your requests securely across sessions.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <span className="text-orange-600">02.</span> How We Use Your Data
          </h2>
          <p>
            Your information is utilized solely for legitimate library services:
          </p>
          <ul className="space-y-2 list-disc pl-5 text-sm">
            <li>To manage book loan reservations, inventory counts, and return deadlines.</li>
            <li>To attribute book contributions to your public reader profile.</li>
            <li>To prevent duplicate borrowing and maintain fair circulation for all community patrons.</li>
            <li>We <strong>never sell, monetize, or rent</strong> your personal information or reading records to advertisers.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <span className="text-orange-600">03.</span> Data Security & Storage
          </h2>
          <p>
            All library records and credentials are authenticated via industry-standard hashing and encrypted token validation. We maintain strict access control on our database endpoints to prevent unauthorized extraction or tampering.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <span className="text-orange-600">04.</span> Your Rights & Control
          </h2>
          <p>
            You retain complete control over your library activity. You can edit or remove books you have uploaded, review your active loans at any moment, or manage your reader profile freely.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3 pt-2 border-t border-stone-100 dark:border-slate-800">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <span className="text-orange-600">05.</span> Contact Us
          </h2>
          <p>
            If you have any questions about this Privacy Policy, please get in touch:
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
