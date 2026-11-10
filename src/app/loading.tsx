import React from "react";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="size-10 rounded-full border-2 border-stone-200 dark:border-slate-700 border-t-orange-600 animate-spin" />
      <p className="mt-4 text-xs font-medium text-stone-400 tracking-wider uppercase">Loading...</p>
    </div>
  );
}
