"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import {
  BookOpen,
  Sparkles,
  ArrowRight,
  Star,
  CheckCircle2,
  Bookmark,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import BookCard, { Book } from "@/components/BookCard";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const heroSlides = [
  {
    id: 1,
    tag: "FEATURED FICTION",
    tagColor: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    title: "Escape Into Stories That Linger Forever",
    highlight: "Stories That Linger",
    desc: "From midnight libraries to timeless tales, explore thousands of community-shared volumes ready to borrow in a single click.",
    cta: "Browse Books",
    featuredBook: {
      title: "The Midnight Library",
      author: "Matt Haig",
      category: "Fiction",
      rating: "4.8",
      copies: "5 copies on shelf",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80",
    },
    bgGradient: "from-stone-950 via-stone-900 to-amber-950/40",
  },
  {
    id: 2,
    tag: "SCIENCE & COSMOLOGY",
    tagColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    title: "Expand Your Universe With Modern Science",
    highlight: "Modern Science",
    desc: "Journey from quantum particles to distant galaxies with the greatest scientific literature curated by fellow stargazers.",
    cta: "Browse Books",
    featuredBook: {
      title: "A Brief History of Time",
      author: "Stephen Hawking",
      category: "Science",
      rating: "4.9",
      copies: "4 copies on shelf",
      image: "https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?auto=format&fit=crop&w=800&q=80",
    },
    bgGradient: "from-slate-950 via-stone-900 to-indigo-950/40",
  },
  {
    id: 3,
    tag: "HUMAN HISTORY & GROWTH",
    tagColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    title: "Pass Wisdom Forward: Share Your Books",
    highlight: "Share Your Books",
    desc: "Have a transformative book on your shelf? Add it to BookNook and let another curious reader embark on the adventure.",
    cta: "Browse Books",
    featuredBook: {
      title: "Sapiens: A Brief History",
      author: "Yuval Noah Harari",
      category: "History",
      rating: "4.9",
      copies: "6 copies on shelf",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
    },
    bgGradient: "from-stone-950 via-stone-900 to-emerald-950/40",
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
      {/* 1. SMART REDESIGNED HERO SLIDER (2-Column Crisp Layout) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <div className="rounded-3xl sm:rounded-[36px] overflow-hidden shadow-2xl border border-stone-800 bg-stone-950 text-white relative">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation
            className="w-full"
          >
            {heroSlides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div
                  className={`relative w-full bg-gradient-to-br ${slide.bgGradient} p-6 sm:p-12 lg:p-16 flex items-center min-h-[500px] sm:min-h-[560px]`}
                >
                  {/* Subtle Grid Ambient Texture */}
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

                  {/* 2-Column Responsive Grid */}
                  <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Left Column: Headline, Description & CTAs */}
                    <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold tracking-wider backdrop-blur-md mx-auto lg:mx-0 shadow-sm">
                        <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                        <span>{slide.tag}</span>
                      </div>

                      <h1 className="font-serif text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.12] tracking-tight">
                        {slide.title}
                      </h1>

                      <p className="text-sm sm:text-base lg:text-lg text-stone-300 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
                        {slide.desc}
                      </p>

                      {/* Action Buttons */}
                      <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                        <Link
                          href="/books"
                          className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-semibold text-sm sm:text-base shadow-lg shadow-orange-600/30 flex items-center gap-2.5 transition-all hover:gap-3.5 hover:scale-[1.02]"
                        >
                          <BookOpen className="w-5 h-5" />
                          <span>{slide.cta}</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>

                        <Link
                          href="/add-book"
                          className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm sm:text-base backdrop-blur-md border border-white/20 transition-all hover:scale-[1.02]"
                        >
                          Share a Book
                        </Link>
                      </div>

                      {/* Social Proof Mini-Badge */}
                      <div className="pt-4 flex items-center justify-center lg:justify-start gap-4 border-t border-white/10">
                        <div className="flex -space-x-2">
                          <img
                            className="w-8 h-8 rounded-full border-2 border-stone-900 object-cover"
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                            alt="Reader"
                          />
                          <img
                            className="w-8 h-8 rounded-full border-2 border-stone-900 object-cover"
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                            alt="Reader"
                          />
                          <img
                            className="w-8 h-8 rounded-full border-2 border-stone-900 object-cover"
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
                            alt="Reader"
                          />
                        </div>
                        <div className="text-left text-xs text-stone-300">
                          <div className="flex items-center gap-1 text-amber-400">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star key={s} className="w-3 h-3 fill-amber-400" />
                            ))}
                            <span className="font-bold ml-1 text-white">4.9 / 5</span>
                          </div>
                          <p className="text-[11px] text-stone-400">Trusted by 850+ local readers</p>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: High-End Book Showcase Card (Smart 3D Depth) */}
                    <div className="lg:col-span-5 flex justify-center lg:justify-end">
                      <div className="relative w-full max-w-xs sm:max-w-sm group">
                        {/* Glow Behind Card */}
                        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-orange-600/30 to-amber-600/30 blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />

                        {/* Visual Card */}
                        <div className="relative p-5 sm:p-6 rounded-3xl bg-stone-900/90 border border-stone-700/80 backdrop-blur-xl shadow-2xl space-y-4">
                          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg bg-stone-800">
                            <img
                              src={slide.featuredBook.image}
                              alt={slide.featuredBook.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-3 left-3">
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-600 text-white shadow-md">
                                {slide.featuredBook.category}
                              </span>
                            </div>
                            <div className="absolute bottom-3 right-3">
                              <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-black/75 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
                                {slide.featuredBook.copies}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <h3 className="font-serif text-lg font-bold text-white line-clamp-1">
                              {slide.featuredBook.title}
                            </h3>
                            <p className="text-xs text-stone-400">
                              by {slide.featuredBook.author}
                            </p>
                          </div>

                          <Link
                            href="/books"
                            className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-orange-600 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                          >
                            <span>Inspect & Borrow</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
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
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-medium hover:bg-orange-600 dark:hover:bg-orange-500 dark:hover:text-white transition-all shadow-md"
          >
            <BookOpen className="w-4 h-4" />
            <span>See All Books In Library</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 3. EXTRA SECTION 1: HOW BORROWING WORKS */}
      <section className="bg-stone-100/70 dark:bg-slate-900/50 py-16 sm:py-20 border-y border-stone-200/60 dark:border-slate-800">
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
          <div className="lg:col-span-5 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-8">
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
