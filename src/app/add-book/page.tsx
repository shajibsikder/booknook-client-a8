"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  BookOpen,
  User,
  Tag,
  Link as LinkIcon,
  Layers,
  FileText,
} from "lucide-react";
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim() || !category || !image.trim() || !description.trim()) {
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
          title: title.trim(),
          author: author.trim(),
          category,
          image: image.trim(),
          description: description.trim(),
          totalCopies: Number(totalCopies) || 1,
          userName: user?.name,
          userEmail: user?.email,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to add book");
      }

      toast.success("Book successfully added to library!");
      router.push("/books");
    } catch (err: any) {
      toast.error(err.message || "Failed to add book");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Simple & Clean Header */}
        <div className="text-center space-y-2 mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white">
            Add a Book
          </h1>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Fill in the details below to add a new book to the library catalog.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-stone-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Book Title */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-orange-600" />
                Book Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. The Alchemist"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800/80 text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Author */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5 flex items-center gap-1.5">
                <User className="w-4 h-4 text-orange-600" />
                Author *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Paulo Coelho"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800/80 text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Category and Copies in a clean 2-column row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5 flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-orange-600" />
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800/80 text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-orange-600" />
                  Total Copies *
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  required
                  value={totalCopies}
                  onChange={(e) => setTotalCopies(parseInt(e.target.value) || 1)}
                  className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800/80 text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Book Cover Image URL */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5 flex items-center gap-1.5">
                <LinkIcon className="w-4 h-4 text-orange-600" />
                Book Cover Image URL *
              </label>
              <input
                type="url"
                required
                placeholder="https://images.unsplash.com/photo-..."
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800/80 text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">
                Provide a direct image URL (e.g. from Unsplash or image host).
              </p>

              {/* Simple Live Preview (No warning boxes, hides if not an image) */}
              {image.trim() && (
                <div className="mt-3 flex items-center gap-3 p-2.5 rounded-xl bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700">
                  <div className="w-10 h-14 rounded-md overflow-hidden bg-stone-200 dark:bg-slate-700 flex items-center justify-center shrink-0">
                    <img
                      src={image}
                      alt="Cover preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                      onLoad={(e) => {
                        (e.target as HTMLElement).style.display = "block";
                      }}
                    />
                  </div>
                  <span className="text-xs text-stone-500 dark:text-stone-400">Cover Preview</span>
                  <button
                    type="button"
                    onClick={() => setImage("")}
                    className="ml-auto text-xs text-rose-500 hover:underline px-2 py-1"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-orange-600" />
                Description *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Write a brief overview of this book..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800/80 text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
              />
            </div>

            {/* Simple User Info */}
            <div className="text-xs text-stone-500 dark:text-stone-400 pt-1">
              Adding as: <span className="font-semibold text-stone-800 dark:text-stone-200">{user?.name}</span> ({user?.email})
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 sm:py-3.5 rounded-xl text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 transition-colors shadow-md shadow-orange-600/20 disabled:opacity-50"
            >
              {submitting ? "Adding Book..." : "Add Book"}
            </button>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}
