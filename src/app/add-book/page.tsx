"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { PlusCircle, BookOpen, User, Tag, Image as ImageIcon, Layers, FileText, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const categories = ["Fiction", "Science", "History", "Kids", "Others"];

export default function AddBookPage() {
  const router = useRouter();
  const { user, token } = useAuth();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("Fiction");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [totalCopies, setTotalCopies] = useState(3);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = "BookNook | Add Book";
  }, []);

  const handleFillDemo = () => {
    setTitle("Atomic Habits");
    setAuthor("James Clear");
    setCategory("Others");
    setImage("https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80");
    setDescription("An easy and proven way to build good habits and break bad ones. This book offers a proven framework for improving every day.");
    setTotalCopies(5);
    toast.success("Sample book details filled! Click 'Add Book to Library' to save.");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !author || !category || !image || !description) {
      toast.error("Please fill in all required fields!");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
          "x-user-email": user?.email || "",
        },
        body: JSON.stringify({
          title,
          author,
          category,
          image,
          description,
          totalCopies: Number(totalCopies) || 1,
          userName: user?.name,
          userEmail: user?.email,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to add book");
      }

      toast.success("Awesome! Your book has been added to BookNook!");
      router.push("/books");
    } catch (err: any) {
      toast.error(err.message || "Failed to add book");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 text-xs font-semibold">
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Contribute to Library</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white">
            Add a New Book
          </h1>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Share a beloved volume with our reading circle. Fill out the details below.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/80 dark:border-slate-800 p-6 sm:p-10 shadow-xl">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-100 dark:border-slate-800">
            <h2 className="text-sm font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Book Specification Form
            </h2>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800/60 hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Auto-Fill Sample Book</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Book Title */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1.5 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-orange-600" />
                Book Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. The Midnight Library"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800/80 text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Author Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1.5 flex items-center gap-1.5">
                <User className="w-4 h-4 text-orange-600" />
                Author Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Matt Haig"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800/80 text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Category and Total Copies Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Category */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1.5 flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-orange-600" />
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800/80 text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Total Copies (Challenge) */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1.5 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-orange-600" />
                  Total Copies Available *
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  required
                  value={totalCopies}
                  onChange={(e) => setTotalCopies(parseInt(e.target.value) || 1)}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800/80 text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Book Image URL */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-orange-600" />
                  Book Cover Image URL *
                </label>
                <span className="text-[11px] text-stone-400">Direct URL or via ImgBB / Postimage</span>
              </div>
              <input
                type="url"
                required
                placeholder="https://images.unsplash.com/photo-..."
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800/80 text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {image && (
                <div className="mt-3 flex items-center gap-3 p-2 bg-stone-50 dark:bg-slate-800 rounded-xl">
                  <img src={image} alt="Cover Preview" className="w-12 h-16 object-cover rounded-md" />
                  <span className="text-xs text-stone-500">Cover preview loaded</span>
                </div>
              )}
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1.5 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-orange-600" />
                Short Description *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Write a concise overview of what makes this book unforgettable..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800/80 text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Read-Only User Info Section */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-800/50 border border-stone-200/60 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase font-bold text-stone-400 dark:text-stone-500">
                  Contributor Name (Read-Only)
                </label>
                <input
                  type="text"
                  readOnly
                  value={user?.name || ""}
                  className="w-full mt-1 px-3 py-2 text-xs bg-transparent text-stone-700 dark:text-stone-300 font-medium cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase font-bold text-stone-400 dark:text-stone-500">
                  Contributor Email (Read-Only)
                </label>
                <input
                  type="text"
                  readOnly
                  value={user?.email || ""}
                  className="w-full mt-1 px-3 py-2 text-xs bg-transparent text-stone-700 dark:text-stone-300 font-medium cursor-not-allowed"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-2xl text-base font-semibold text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 shadow-xl shadow-orange-600/20 transition-all flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-5 h-5" />
              <span>{submitting ? "Adding Book to Shelves..." : "Add Book to Library"}</span>
            </button>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}
