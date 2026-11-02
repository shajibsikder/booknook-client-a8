"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import {
  BookOpen,
  Sparkles,
  ArrowRight,
  Star,
  CheckCircle2,
  Tag,
  Users,
} from "lucide-react";
import BookCard, { Book } from "@/components/BookCard";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const heroSlides = [
  {
    id: 1,
    tag: "CURATED FICTION",
    title: "Escape Into Stories That Stay With You Forever",
    desc: "From quiet midnight libraries to breathtaking adventures, borrow community-shared volumes and return them freely for the next avid reader.",
    cta: "Browse All Books",
    featuredBook: {
      title: "The Midnight Library",
      author: "Matt Haig",
      category: "Fiction",
      copies: "5 Copies Available",
      quote: "Between life and death there is a library with infinite lives to try.",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80",
    },
  },
  {
    id: 2,
    tag: "SCIENCE & DISCOVERY",
    title: "Unravel the Cosmos & the Mysteries of Time",
    desc: "Dive into groundbreaking cosmology, physics, and natural history written by the most visionary scientific thinkers of our generation.",
    cta: "Explore Science Titles",
    featuredBook: {
      title: "A Brief History of Time",
      author: "Stephen Hawking",
      category: "Science",
      copies: "4 Copies Available",
      quote: "From the Big Bang to black holes, the landmark exploration of our universe.",
      image: "https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?auto=format&fit=crop&w=800&q=80",
    },
  },
  {
    id: 3,
    tag: "COMMUNITY SHARING",
    title: "Pass Wisdom Forward: Share Your Bookshelf",
    desc: "Have an inspiring volume sitting on your shelf? Add it to BookNook in 30 seconds and let fellow book lovers experience its magic.",
    cta: "Browse Collection",
    featuredBook: {
      title: "Sapiens: A Brief History",
      author: "Yuval Noah Harari",
      category: "History",
      copies: "6 Copies Available",
      quote: "How an insignificant ape became the undisputed ruler of planet Earth.",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
    },
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
      {/* 1. SEAMLESS, ELEGANT EDITORIAL HERO SHOWCASE */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f7f3eb] via-[#faf8f4] to-transparent dark:from-[#111726] dark:via-[#0c0f17] dark:to-transparent border-b border-[#eae6df] dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={32}
            slidesPerView={1}
            autoplay={{ delay: 5500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="w-full pb-12 sm:pb-14"
          >
            {heroSlides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                  {/* Left Column: Literary Headline, Paragraph, CTAs */}
                  <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/80 dark:bg-orange-950/50 border border-orange-200/80 dark:border-orange-900/60 text-orange-800 dark:text-orange-300 text-xs font-bold tracking-wider mx-auto lg:mx-0 shadow-sm">
                      <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                      <span>{slide.tag}</span>
                    </div>

                    <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-stone-900 dark:text-white leading-[1.14] tracking-tight">
                      {slide.title}
                    </h1>

                    <p className="text-stone-600 dark:text-stone-300 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
                      {slide.desc}
                    </p>

                    {/* Action Buttons */}
                    <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
                      <Link
                        href="/books"
                        className="px-7 py-3.5 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm sm:text-base shadow-lg shadow-orange-600/25 flex items-center gap-2.5 transition-all hover:scale-[1.02]"
                      >
                        <BookOpen className="w-4 h-4" />
                        <span>{slide.cta}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>

                      <Link
                        href="/add-book"
                        className="px-6 py-3.5 rounded-full bg-white dark:bg-slate-900 text-stone-800 dark:text-stone-200 font-semibold text-sm sm:text-base border border-stone-200 dark:border-slate-800 hover:border-orange-400 shadow-sm transition-all hover:scale-[1.02]"
                      >
                        Share a Book
                      </Link>
                    </div>

                    {/* Social Proof */}
                    <div className="pt-4 flex items-center justify-center lg:justify-start gap-4">
                      <div className="flex -space-x-2">
                        <img
                          className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 object-cover shadow-sm"
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                          alt="Patron"
                        />
                        <img
                          className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 object-cover shadow-sm"
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                          alt="Patron"
                        />
                        <img
                          className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 object-cover shadow-sm"
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
                          alt="Patron"
                        />
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-1 text-amber-500">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className="w-3.5 h-3.5 fill-amber-400" />
                          ))}
                          <span className="text-xs font-bold text-stone-900 dark:text-white ml-1">
                            4.9 / 5
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-500 dark:text-stone-400">
                          Loved by 850+ local readers
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Physical Book Aesthetic Display */}
                  <div className="lg:col-span-5 flex justify-center">
                    <div className="relative w-full max-w-sm sm:max-w-md p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-stone-200/80 dark:border-slate-800 shadow-2xl flex flex-col sm:flex-row items-center gap-6">
                      {/* Book Cover with 3D Spine Depth */}
                      <div className="relative w-36 sm:w-44 aspect-[2/3] shrink-0 rounded-xl overflow-hidden shadow-2xl ring-1 ring-black/10">
                        <img
                          src={slide.featuredBook.image}
                          alt={slide.featuredBook.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80";
                          }}
                        />
                      </div>

                      {/* Featured Book Metadata */}
                      <div className="space-y-3 text-center sm:text-left">
                        <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300">
                          {slide.featuredBook.category}
                        </span>

                        <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900 dark:text-white leading-tight">
                          {slide.featuredBook.title}
                        </h3>

                        <p className="text-xs text-stone-500 dark:text-stone-400">
                          by {slide.featuredBook.author}
                        </p>

                        <p className="text-xs text-stone-600 dark:text-stone-300 italic line-clamp-2">
                          &ldquo;{slide.featuredBook.quote}&rdquo;
                        </p>

                        <div className="pt-1 flex items-center justify-center sm:justify-start gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{slide.featuredBook.copies}</span>
                        </div>

                        <Link
                          href="/books"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 pt-1"
                        >
                          <span>Inspect Book Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* 2. DYNAMIC NEW ARRIVALS (Latest 6 Books) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-widest mb-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Fresh Off The Press</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white">
              New Arrivals
            </h2>
            <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
              Explore the latest six treasures added to our shared library shelves.
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
                className="h-96 rounded-3xl bg-stone-200/60 dark:bg-slate-800 animate-pulse"
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
          <div className="text-center py-16 bg-stone-50 dark:bg-slate-900 rounded-3xl border border-dashed border-stone-200 dark:border-slate-800">
            <BookOpen className="w-12 h-12 text-stone-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200">No books found</h3>
            <p className="text-sm text-stone-500 mt-1">Be the first bibliophile to add a book to BookNook!</p>
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/books"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-semibold hover:bg-orange-600 dark:hover:bg-orange-500 dark:hover:text-white transition-all shadow-md"
          >
            <BookOpen className="w-4 h-4" />
            <span>See All Books In Library</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 3. EXTRA SECTION 1: HOW BORROWING WORKS */}
      <section className="bg-stone-100/60 dark:bg-slate-900/50 py-16 sm:py-20 border-y border-stone-200/60 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400">
              Effortless Circulation
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white mt-1.5">
              How BookNook Works
            </h2>
            <p className="text-stone-500 dark:text-stone-400 text-sm mt-2">
              Our library operates on trust, curiosity, and community sharing. Here is how you can begin reading today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative p-8 rounded-3xl bg-white dark:bg-slate-900 border border-stone-200/70 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 flex items-center justify-center font-bold text-lg mb-6">
                01
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-white mb-2">
                Discover a Book
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Filter by categories such as Fiction, Science, History, or Kids. Review book descriptions and check available shelf copies.
              </p>
            </div>

            <div className="relative p-8 rounded-3xl bg-white dark:bg-slate-900 border border-stone-200/70 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 flex items-center justify-center font-bold text-lg mb-6">
                02
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-white mb-2">
                Borrow in 1-Click
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Logged-in readers can instantly confirm borrowing. Our smart system automatically updates inventory and reserves your copy.
              </p>
            </div>

            <div className="relative p-8 rounded-3xl bg-white dark:bg-slate-900 border border-stone-200/70 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 flex items-center justify-center font-bold text-lg mb-6">
                03
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-white mb-2">
                Read & Return Freely
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Enjoy your reading journey. When finished, click Return from your My Borrows dashboard so the next avid reader can enjoy it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. EXTRA SECTION 2: READER REVIEWS & COMMUNITY STATS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 bg-gradient-to-br from-stone-900 via-stone-850 to-stone-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-orange-400 font-semibold">Community Impact</span>
              <h3 className="font-serif text-3xl font-bold text-white mt-2">Books in Motion</h3>
              <p className="text-sm text-stone-400 mt-2">
                We believe stories multiply when shared. Every book borrowed is another journey celebrated.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-stone-800">
              <div>
                <p className="font-serif text-3xl font-extrabold text-orange-400">1,450+</p>
                <p className="text-xs text-stone-400 uppercase tracking-wider mt-1">Books Circulated</p>
              </div>
              <div>
                <p className="font-serif text-3xl font-extrabold text-amber-400">99.2%</p>
                <p className="text-xs text-stone-400 uppercase tracking-wider mt-1">Timely Return Rate</p>
              </div>
              <div>
                <p className="font-serif text-3xl font-extrabold text-emerald-400">850+</p>
                <p className="text-xs text-stone-400 uppercase tracking-wider mt-1">Avid Readers</p>
              </div>
              <div>
                <p className="font-serif text-3xl font-extrabold text-sky-400">100%</p>
                <p className="text-xs text-stone-400 uppercase tracking-wider mt-1">Open & Free</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400">
                Bibliophile Voices
              </span>
              <h2 className="font-serif text-3xl font-bold text-stone-900 dark:text-white mt-1">
                What Our Readers Say
              </h2>
            </div>

            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200/80 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-1 text-amber-500 mb-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-stone-700 dark:text-stone-300 italic">
                  &ldquo;BookNook rekindled my love for paper and hardcovers. Finding rare science and history volumes borrowed right through neighbors feels magical.&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
                    alt="Farhana Ahmed"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-stone-900 dark:text-white">Farhana Ahmed</h4>
                    <p className="text-xs text-stone-500">History Enthusiast, Dhaka</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200/80 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-1 text-amber-500 mb-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-stone-700 dark:text-stone-300 italic">
                  &ldquo;Adding my childhood favorite books so kids in the area can borrow them was effortless. The return flow is clean, honest, and smooth.&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                    alt="Tanvir Rahman"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-stone-900 dark:text-white">Tanvir Rahman</h4>
                    <p className="text-xs text-stone-500">Fiction Writer & Reader</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
