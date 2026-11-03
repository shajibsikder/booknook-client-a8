"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import CustomConfirmModal from "@/components/CustomConfirmModal";
import { Library, Edit3, Trash2, PlusCircle, BookOpen, X } from "lucide-react";
import toast from "react-hot-toast";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const categories = ["Fiction", "Science", "History", "Kids", "Others"];

export default function MyBooksPage() {
  const { user, token } = useAuth();
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<any>(null);
  const [deleting, setDeleting] = useState(false);

  // Edit modal state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<any>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    author: "",
    category: "Fiction",
    image: "",
    description: "",
    totalCopies: 1,
  });
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    document.title = "BookNook | My Books";
  }, []);

  const fetchMyBooks = useCallback(async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/books?email=${encodeURIComponent(user.email)}`);
      if (res.ok) {
        const data = await res.json();
        setBooks(data);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch your books");
    } finally {
      setLoading(false);
    }
  }, [user?.email]);

  useEffect(() => {
    fetchMyBooks();
  }, [fetchMyBooks]);

  // Open Edit Modal with prefilled data
  const handleOpenEdit = (b: any) => {
    setEditingBook(b);
    setEditForm({
      title: b.title,
      author: b.author,
      category: b.category,
      image: b.image,
      description: b.description,
      totalCopies: b.totalCopies,
    });
    setEditModalOpen(true);
  };

  // Submit Update
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBook) return;
    setUpdating(true);

    try {
      const res = await fetch(`${API_BASE}/books/${editingBook._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
          "x-user-email": user?.email || "",
        },
        body: JSON.stringify(editForm),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");

      toast.success("Book updated successfully!");
      setEditModalOpen(false);
      fetchMyBooks();
    } catch (err: any) {
      toast.error(err.message || "Failed to update book");
    } finally {
      setUpdating(false);
    }
  };

  // Open Custom Delete Modal
  const handleOpenDelete = (b: any) => {
    setBookToDelete(b);
    setDeleteModalOpen(true);
  };

  // Confirm Delete
  const handleConfirmDelete = async () => {
    if (!bookToDelete) return;
    setDeleting(true);

    try {
      const res = await fetch(`${API_BASE}/books/${bookToDelete._id}`, {
        method: "DELETE",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "x-user-email": user?.email || "",
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete");

      toast.success(`"${bookToDelete.title}" removed from catalog.`);
      setBooks((prev) => prev.filter((b) => b._id !== bookToDelete._id));
      setDeleteModalOpen(false);
    } catch (err: any) {
      toast.error(err.message || "Failed to delete book");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white">
              My Books
            </h1>
            <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
              Manage, edit, or remove books you have contributed to BookNook.
            </p>
          </div>

          <Link
            href="/add-book"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-medium text-sm shadow-md transition-all self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Another Book</span>
          </Link>
        </div>

        {/* Content Table / Cards */}
        {loading ? (
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-white dark:bg-slate-900 rounded-2xl" />
            ))}
          </div>
        ) : books.length > 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-stone-100 dark:border-slate-800 bg-stone-50/50 dark:bg-slate-800/30 text-stone-500 dark:text-stone-400 text-xs uppercase tracking-wider">
                    <th className="py-4 px-6">Book</th>
                    <th className="py-4 px-6">Category</th>
                    <th className="py-4 px-6">Copies</th>
                    <th className="py-4 px-6">Date Added</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-slate-800 text-sm">
                  {books.map((b) => (
                    <tr key={b._id} className="hover:bg-stone-50/70 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-16 rounded-lg overflow-hidden bg-stone-100 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-stone-200/60 dark:border-slate-700/60 shadow-sm relative">
                            <BookOpen className="w-5 h-5 text-stone-400" />
                            <img
                              src={b.image}
                              alt={b.title}
                              className="absolute inset-0 w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = "none";
                              }}
                              onLoad={(e) => {
                                (e.target as HTMLElement).style.display = "block";
                              }}
                            />
                          </div>
                          <div>
                            <Link href={`/books/${b._id}`} className="font-semibold text-stone-900 dark:text-white hover:text-orange-600 line-clamp-1">
                              {b.title}
                            </Link>
                            <p className="text-xs text-stone-500">by {b.author}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-stone-100 dark:bg-slate-800 text-stone-700 dark:text-stone-300">
                          {b.category}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                          {b.totalCopies} left
                        </span>
                      </td>
                      <td className="py-4 px-6 text-xs text-stone-500">
                        {b.createdAt ? new Date(b.createdAt).toLocaleDateString() : "Recent"}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(b)}
                            className="p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/40 transition-colors"
                            title="Edit Book"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleOpenDelete(b)}
                            className="p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                            title="Delete Book"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-stone-200 dark:border-slate-800">
            <BookOpen className="w-12 h-12 text-stone-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200">
              You have not added any books yet
            </h3>
            <p className="text-sm text-stone-500 mt-1 mb-6">
              Share a title with fellow book enthusiasts to start your personal library collection.
            </p>
            <Link
              href="/add-book"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-medium text-sm shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Your First Book</span>
            </Link>
          </div>
        )}

        {/* Delete modal */}
        <CustomConfirmModal
          isOpen={deleteModalOpen}
          title="Delete Book From Catalog?"
          message={`Are you sure you want to permanently delete "${bookToDelete?.title}"? This action cannot be undone.`}
          confirmText="Yes, Delete Book"
          isDeleting={deleting}
          onConfirm={handleConfirmDelete}
          onClose={() => setDeleteModalOpen(false)}
        />

        {/* Edit modal */}
        {editModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-orange-600" />
                  <h3 className="text-xl font-bold font-serif text-stone-900 dark:text-white">Edit Book Details</h3>
                </div>
                <button
                  onClick={() => setEditModalOpen(false)}
                  className="p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUpdate} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1">
                    Book Title
                  </label>
                  <input
                    type="text"
                    required
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 text-stone-900 dark:text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1">
                    Author Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editForm.author}
                    onChange={(e) => setEditForm({ ...editForm, author: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 text-stone-900 dark:text-white text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1">
                      Category
                    </label>
                    <select
                      value={editForm.category}
                      onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 text-stone-900 dark:text-white text-sm"
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1">
                      Total Copies
                    </label>
                    <input
                      type="number"
                      min="0"
                      required
                      value={editForm.totalCopies}
                      onChange={(e) => setEditForm({ ...editForm, totalCopies: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 text-stone-900 dark:text-white text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1">
                    Book Cover Image URL
                  </label>
                  <input
                    type="url"
                    required
                    value={editForm.image}
                    onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  {editForm.image.trim() && (
                    <div className="mt-2.5 flex items-center gap-3 p-2 rounded-xl bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700">
                      <div className="w-10 h-14 rounded-md overflow-hidden bg-stone-200 dark:bg-slate-700 flex items-center justify-center shrink-0">
                        <img
                          src={editForm.image}
                          alt="Preview"
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
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1">
                    Short Description
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 text-stone-900 dark:text-white text-sm"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-sm font-medium text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updating}
                    className="px-6 py-2.5 rounded-xl text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 shadow-md shadow-orange-600/20"
                  >
                    {updating ? "Saving Changes..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
