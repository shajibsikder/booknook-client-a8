"use client";

import React from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";

interface CustomConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDeleting?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export default function CustomConfirmModal({
  isOpen,
  title = "Confirm Deletion",
  message,
  confirmText = "Yes, Delete",
  cancelText = "Cancel",
  isDeleting = false,
  onConfirm,
  onClose,
}: CustomConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 dark:border-slate-800 animate-in zoom-in-95 duration-200">
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950/50 flex items-center justify-center text-rose-600 dark:text-rose-400 mb-4">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <h3 className="text-xl font-bold text-stone-900 dark:text-white font-serif">{title}</h3>
        <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">{message}</p>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2.5 rounded-xl text-sm font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-slate-800 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 shadow-md shadow-rose-600/20 flex items-center gap-2 transition-all"
          >
            <Trash2 className="w-4 h-4" />
            {isDeleting ? "Deleting..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
