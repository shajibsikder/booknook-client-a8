"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import {
  BookOpen,
  ArrowRight,
  Search,
  BookOpenCheck,
  Undo2,
  Sparkles,
  Atom,
  Landmark,
  Smile,
  Star,
} from "lucide-react";
import BookCard, { Book } from "@/components/BookCard";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const bannerSlides = [
  {
    title: "Your neighbourhood library, online",
    text: "Find a book that someone nearby already loved, and borrow it for a week.",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1600&q=80",
    cta: "Browse Books",
  },
  {
    title: "Share the books on your shelf",
    text: "Add the books you have finished. Let other readers enjoy them too.",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1600&q=80",
    cta: "Share a Book",
  },
  {
    title: "Borrow, read, return. Repeat.",
    text: "Seven days for every book. Return it with one click when you are done.",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1600&q=80",
    cta: "Browse Books",
  },
];

const categories = [
  {
    name: "Fiction",
    desc: "Novels and short stories",
    icon: Sparkles,
  },
  {
    name: "Science",
    desc: "How the world works",
    icon: Atom,
  },
  {
    name: "History",
    desc: "Stories from the past",
    icon: Landmark,
  },
  {
    name: "Kids",
    desc: "Picture books and more",
    icon: Smile,
  },
];

export default function HomePage() {
  const [newArrivals, setNewArrivals] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNewArrivals() {
      try {
        const res = await fetch(`${API_BASE}/books?limit=6&sort=newest`);
        if (res.ok) {
          const data = await res.json();
          setNewArrivals(data);
        }
      } catch (err) {
        console.error("Failed to load new arrivals:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchNewArrivals();
  }, []);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. HERO BANNER SLIDER (Like Instructor Demo, Fully Responsive) */}
      <section className="w-full">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="h-[440px] sm:h-[480px] md:h-[540px] w-full [--swiper-pagination-bullet-inactive-color:white] [--swiper-theme-color:#ea580c]"
        >
          {bannerSlides.map((slide) => (
            <SwiperSlide key={slide.title}>
              <div
                className="relative flex size-full items-center bg-cover bg-center h-full w-full"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                {/* Dark Cinematic Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/25" />

                {/* Left Content Container */}
                <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                  <div className="max-w-xl space-y-4 sm:space-y-5 text-white">
                    <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
                      BookNook
                    </p>
                    <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold leading-[1.12] tracking-tight text-white">
                      {slide.title}
                    </h1>
                    <p className="text-sm sm:text-lg text-white/90 leading-relaxed max-w-lg">
                      {slide.text}
                    </p>
                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <Link
                        href="/books"
                        className="px-6 sm:px-8 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm sm:text-base shadow-lg shadow-orange-600/30 transition-all hover:scale-105 inline-flex items-center gap-2"
                      >
                        <BookOpen className="w-4 h-4" />
                        <span>Browse Books</span>
                      </Link>

                      <Link
                        href="/add-book"
                        className="px-5 sm:px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm sm:text-base backdrop-blur-md border border-white/20 transition-all"
                      >
                        Share a Book
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* 2. DYNAMIC NEW ARRIVALS */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white">
              New Arrivals
            </h2>
            <p className="mt-2 text-sm sm:text-base text-stone-500 dark:text-stone-400">
              Explore the latest books added to our shared library shelves.
            </p>
          </div>

          <Link
            href="/books"
            className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 dark:text-orange-400 hover:text-orange-700 transition-colors"
          >
            <span>See All Books</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-96 rounded-2xl bg-stone-200/60 dark:bg-slate-800 animate-pulse"
              />
            ))}
          </div>
        ) : newArrivals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {newArrivals.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-stone-200 dark:border-slate-800">
            <BookOpen className="w-12 h-12 text-stone-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200">No books found</h3>
            <p className="text-sm text-stone-500 mt-1">Be the first bibliophile to add a book to BookNook!</p>
          </div>
        )}
      </section>

      {/* 3. HOW BORROWING WORKS (Directly inspired by instructor demo) */}
      <section className="bg-stone-100/70 dark:bg-slate-900/60 py-16 sm:py-20 border-y border-stone-200/80 dark:border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white">
              How Borrowing Works
            </h2>
            <p className="mt-2 text-stone-500 dark:text-stone-400 text-sm sm:text-base">
              Three steps. No library card needed.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Step 1 */}
            <div className="rounded-2xl border border-stone-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <span className="mx-auto mb-5 grid size-14 place-items-center rounded-full bg-orange-600 text-white shadow-md shadow-orange-600/20">
                <Search className="w-6 h-6" />
              </span>
              <p className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                Step 1
              </p>
              <h3 className="mt-1.5 font-serif text-xl font-bold text-stone-900 dark:text-white">
                Find a book
              </h3>
              <p className="mt-2 text-stone-500 dark:text-stone-400 text-sm leading-relaxed">
                Browse the shelf and open any book you like.
              </p>
            </div>

            {/* Step 2 */}
            <div className="rounded-2xl border border-stone-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <span className="mx-auto mb-5 grid size-14 place-items-center rounded-full bg-orange-600 text-white shadow-md shadow-orange-600/20">
                <BookOpenCheck className="w-6 h-6" />
              </span>
              <p className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                Step 2
              </p>
              <h3 className="mt-1.5 font-serif text-xl font-bold text-stone-900 dark:text-white">
                Borrow it
              </h3>
              <p className="mt-2 text-stone-500 dark:text-stone-400 text-sm leading-relaxed">
                Confirm the borrow. The book is yours for 7 days.
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-2xl border border-stone-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <span className="mx-auto mb-5 grid size-14 place-items-center rounded-full bg-orange-600 text-white shadow-md shadow-orange-600/20">
                <Undo2 className="w-6 h-6" />
              </span>
              <p className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                Step 3
              </p>
              <h3 className="mt-1.5 font-serif text-xl font-bold text-stone-900 dark:text-white">
                Return it
              </h3>
              <p className="mt-2 text-stone-500 dark:text-stone-400 text-sm leading-relaxed">
                Done reading? Return it from My Borrows in one click.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TOP CATEGORIES (Directly inspired by instructor demo) */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white">
            Top Categories
          </h2>
          <p className="mt-2 text-stone-500 dark:text-stone-400 text-sm sm:text-base">
            Pick a shelf and start reading.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/books?category=${encodeURIComponent(cat.name)}`}
              className="group flex h-full flex-col items-center rounded-2xl border border-stone-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center transition hover:-translate-y-1 hover:border-orange-500 dark:hover:border-orange-500 shadow-sm hover:shadow-md"
            >
              <cat.icon className="w-9 h-9 text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform" />
              <h3 className="mt-4 font-serif text-xl font-bold text-stone-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                {cat.name}
              </h3>
              <p className="mt-1.5 text-sm text-stone-500 dark:text-stone-400">
                {cat.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. EXTRA BONUS: COMMUNITY VOICES & IMPACT */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-stone-900 via-stone-850 to-stone-950 text-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs uppercase tracking-widest text-orange-400 font-semibold">
                Community Impact
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                Books in Motion
              </h3>
              <p className="text-sm text-stone-400 leading-relaxed">
                We believe stories multiply when shared. Every book borrowed is another journey celebrated.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-stone-800">
                <div>
                  <p className="font-serif text-2xl sm:text-3xl font-extrabold text-orange-400">1,450+</p>
                  <p className="text-xs text-stone-400 uppercase tracking-wider mt-0.5">Circulated</p>
                </div>
                <div>
                  <p className="font-serif text-2xl sm:text-3xl font-extrabold text-amber-400">99.2%</p>
                  <p className="text-xs text-stone-400 uppercase tracking-wider mt-0.5">Return Rate</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-1 text-amber-400 mb-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-stone-300 italic">
                  &ldquo;BookNook rekindled my love for paper and hardcovers. Finding rare science and history volumes borrowed right through neighbors feels magical.&rdquo;
                </p>
                <p className="text-xs text-stone-400 mt-3 font-semibold">— Farhana Ahmed, History Reader</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
