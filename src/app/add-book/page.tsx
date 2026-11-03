"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  BookOpen,
  User,
  Tag,
  UploadCloud,
  Link as LinkIcon,
  Layers,
  FileText,
  X,
  CheckCircle2,
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
  const [imageMode, setImageMode] = useState<"upload" | "url">("upload");
  const [description, setDescription] = useState("");
  const [totalCopies, setTotalCopies] = useState(3);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = "BookNook | Add Book";
  }, []);

  // Handle image upload from user's computer
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File is too large! Please choose an image under 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setImage(result);
      toast.success("Cover image loaded from PC!");
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim() || !category || !image || !description.trim()) {
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
          image,
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

            {/* Cover Image Section: Toggle between Upload from PC and Image URL */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                  Book Cover Image *
                </span>

                {/* Mode Selector */}
                <div className="inline-flex rounded-lg p-0.5 bg-stone-100 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-xs">
                  <button
                    type="button"
                    onClick={() => setImageMode("upload")}
                    className={`px-3 py-1 rounded-md font-medium transition-colors flex items-center gap-1.5 ${
                      imageMode === "upload"
                        ? "bg-white dark:bg-slate-700 text-orange-600 dark:text-orange-400 shadow-sm"
                        : "text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
                    }`}
                  >
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>Upload from PC</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageMode("url")}
                    className={`px-3 py-1 rounded-md font-medium transition-colors flex items-center gap-1.5 ${
                      imageMode === "url"
                        ? "bg-white dark:bg-slate-700 text-orange-600 dark:text-orange-400 shadow-sm"
                        : "text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
                    }`}
                  >
                    <LinkIcon className="w-3.5 h-3.5" />
                    <span>Image URL</span>
                  </button>
                </div>
              </div>

              {/* Upload Mode */}
              {imageMode === "upload" ? (
                <div>
                  {!image ? (
                    <label
                      htmlFor="book-cover-file"
                      className="border-2 border-dashed border-stone-300 dark:border-slate-700 hover:border-orange-500 dark:hover:border-orange-500 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-stone-50/50 dark:bg-slate-800/40"
                    >
                      <div className="w-12 h-12 rounded-full bg-orange-50 dark:bg-orange-950/40 text-orange-600 flex items-center justify-center mb-2">
                        <UploadCloud className="w-6 h-6" />
                      </div>
                      <span className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                        Click to choose image from your computer
                      </span>
                      <span className="text-xs text-stone-400 mt-1">
                        PNG, JPG, JPEG, WEBP (Max 5MB)
                      </span>
                      <input
                        id="book-cover-file"
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <div className="flex items-center gap-4 p-3 rounded-2xl bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700">
                      <img
                        src={image}
                        alt="Book cover preview"
                        className="w-14 h-20 object-cover rounded-lg shadow-sm border border-stone-200 dark:border-slate-700"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Image uploaded from PC</span>
                        </div>
                        <p className="text-xs text-stone-400 mt-0.5">Ready to save with this book.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setImage("")}
                        className="p-2 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                        title="Remove image"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* URL Mode */
                <div className="space-y-2">
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800/80 text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  {image && (
                    <div className="flex items-center gap-3 p-2.5 rounded-xl bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700">
                      <img
                        src={image}
                        alt="Cover preview"
                        className="w-10 h-14 object-cover rounded-md"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80";
                        }}
                      />
                      <span className="text-xs text-stone-500 dark:text-stone-400">Cover preview loaded</span>
                      <button
                        type="button"
                        onClick={() => setImage("")}
                        className="ml-auto text-xs text-rose-500 hover:underline"
                      >
                        Clear
                      </button>
                    </div>
                  )}
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
