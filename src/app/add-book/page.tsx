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
  Upload,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://booknook-server-a8.vercel.app";

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
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    document.title = "BookNook | Add Book";
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image file size should be less than 5MB");
      return;
    }

    setUploadingImage(true);
    const toastId = toast.loading("Uploading cover image to ImgBB...");

    try {
      const apiKey =
        process.env.NEXT_PUBLIC_IMGBB_API_KEY ||
        "52f541054ea190c92da0a8b5be8095e2";
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      toast.dismiss(toastId);

      if (data.success && (data.data?.display_url || data.data?.url)) {
        const uploadedUrl = data.data.display_url || data.data.url;
        setImage(uploadedUrl);
        toast.success("Cover image uploaded to ImgBB!");
      } else {
        toast.error("ImgBB upload failed. Please try again or paste image URL.");
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Could not upload to ImgBB. Please paste direct image URL.");
    } finally {
      setUploadingImage(false);
      e.target.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim() || !category || !image.trim() || !description.trim()) {
      toast.error("Please fill in all required fields!");
      return;
    }

    setSubmitting(true);
    try {
      const today = new Date().toISOString().split("T")[0];
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
          addedDate: today,
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
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-orange-600" />
                Book Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. The Midnight Library"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800/80 text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5 flex items-center gap-1.5">
                <User className="w-4 h-4 text-orange-600" />
                Author Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Matt Haig"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800/80 text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

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

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                  <Upload className="w-4 h-4 text-orange-600" />
                  Book Cover Image *
                </label>
                <span className="text-[11px] font-medium text-orange-600 dark:text-orange-400">
                  Upload via ImgBB
                </span>
              </div>

              <label
                className={`flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
                  uploadingImage
                    ? "border-orange-400 bg-orange-50/50 dark:bg-orange-950/20"
                    : "border-stone-300 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 hover:border-orange-500"
                }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  className="hidden"
                />
                {uploadingImage ? (
                  <div className="flex items-center gap-2 text-orange-600 text-sm font-medium">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Uploading to ImgBB...</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center gap-1">
                    <Upload className="w-5 h-5 text-stone-400" />
                    <span className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                      Click to upload cover file
                    </span>
                    <span className="text-[10px] text-stone-500">
                      JPG, PNG, WebP up to 5MB (uploaded via ImgBB)
                    </span>
                  </div>
                )}
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                  <LinkIcon className="w-3.5 h-3.5" />
                </div>
                <input
                  type="url"
                  required
                  placeholder="Or paste direct image URL (https://...)"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800/80 text-stone-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {image.trim() && (
                <div className="mt-2 flex items-center gap-3 p-2.5 rounded-xl bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700">
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
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-stone-900 dark:text-white truncate">
                      {image.includes("ibb.co") ? "Uploaded to ImgBB" : "Cover Preview"}
                    </p>
                    <p className="text-[10px] text-stone-500 truncate">{image}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setImage("")}
                    className="text-xs text-rose-500 hover:underline px-2 py-1 shrink-0"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

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

            <div className="text-xs text-stone-500 dark:text-stone-400 pt-1">
              Adding as: <span className="font-semibold text-stone-800 dark:text-stone-200">{user?.name}</span> ({user?.email})
            </div>

            <button
              type="submit"
              disabled={submitting || uploadingImage}
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
