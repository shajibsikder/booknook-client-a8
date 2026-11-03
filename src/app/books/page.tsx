"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import BookCard, { Book } from "@/components/BookCard";
import { BookOpen, Search } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://booknook-server-a8.vercel.app";

const categories = ["All", "Fiction", "Science", "History", "Kids", "Others"];

function BooksContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(
    initialCategory && categories.includes(initialCategory) ? initialCategory : "All"
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.title = "BookNook | All Books";
  }, []);

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && categories.includes(cat)) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  useEffect(() => {
    async function fetchBooks() {
      setLoading(true);
      try {
        let url = `${API_BASE}/books`;
        if (selectedCategory !== "All") {
          url += `?category=${encodeURIComponent(selectedCategory)}`;
        }
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setBooks(data);
        }
      } catch (err) {
        console.error("Failed to fetch books", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, [selectedCategory]);

  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 dark:text-white">
          All Books
        </h1>
        <p className="text-stone-500 dark:text-stone-400 text-sm sm:text-base">
          Browse our complete library catalog. Pick any title you like and borrow it freely.
        </p>
      </div>

      {/* Search and filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-stone-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-orange-600 text-white shadow-sm shadow-orange-600/30"
                  : "bg-stone-50 dark:bg-slate-800 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800/80 text-stone-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      {/* Books grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <div
              key={i}
              className="h-80 rounded-2xl bg-stone-200/60 dark:bg-slate-800 animate-pulse"
            />
          ))}
        </div>
      ) : filteredBooks.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-stone-200 dark:border-slate-800">
          <BookOpen className="w-12 h-12 text-stone-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200">No books found</h3>
          <p className="text-sm text-stone-500 mt-1">Try another category or search keyword.</p>
        </div>
      )}
    </div>
  );
}

export default function AllBooksPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="w-10 h-10 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-stone-500 text-sm mt-4">Loading Library Catalog...</p>
        </div>
      }
    >
      <BooksContent />
    </Suspense>
  );
}
