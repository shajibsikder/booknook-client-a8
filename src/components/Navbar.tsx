"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "next-themes";
import {
  BookOpen,
  Sun,
  Moon,
  Menu,
  X,
  LogOut,
  User as UserIcon,
  BookMarked,
  PlusCircle,
  Library,
  ChevronDown,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#fbf9f5]/85 dark:bg-[#0c0f17]/85 border-b border-[#eae6df] dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-600 via-amber-600 to-amber-700 flex items-center justify-center text-white shadow-md shadow-orange-600/15 group-hover:scale-105 transition-all">
              <BookOpen className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-black tracking-tight text-stone-900 dark:text-white">
                Book<span className="text-orange-600 dark:text-orange-400">Nook</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 font-semibold -mt-1 font-sans">
                Community Library
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 p-1.5 rounded-full bg-stone-100/70 dark:bg-slate-850/80 border border-stone-200/60 dark:border-slate-800">
            <Link
              href="/"
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                isActive("/")
                  ? "bg-white dark:bg-slate-900 text-orange-600 dark:text-orange-400 shadow-sm"
                  : "text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white"
              }`}
            >
              Home
            </Link>

            <Link
              href="/books"
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                isActive("/books")
                  ? "bg-white dark:bg-slate-900 text-orange-600 dark:text-orange-400 shadow-sm"
                  : "text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white"
              }`}
            >
              All Books
            </Link>

            {/* Private Links (visible when logged in) */}
            {user && (
              <>
                <Link
                  href="/add-book"
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                    isActive("/add-book")
                      ? "bg-white dark:bg-slate-900 text-orange-600 dark:text-orange-400 shadow-sm"
                      : "text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white"
                  }`}
                >
                  <PlusCircle className="w-3.5 h-3.5 text-orange-600" />
                  Add Book
                </Link>

                <Link
                  href="/my-books"
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                    isActive("/my-books")
                      ? "bg-white dark:bg-slate-900 text-orange-600 dark:text-orange-400 shadow-sm"
                      : "text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white"
                  }`}
                >
                  <Library className="w-3.5 h-3.5 text-amber-600" />
                  My Books
                </Link>

                <Link
                  href="/my-borrows"
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                    isActive("/my-borrows")
                      ? "bg-white dark:bg-slate-900 text-orange-600 dark:text-orange-400 shadow-sm"
                      : "text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white"
                  }`}
                >
                  <BookMarked className="w-3.5 h-3.5 text-emerald-600" />
                  My Borrows
                </Link>
              </>
            )}
          </nav>

          {/* Right Actions: Theme Toggle & User Auth */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="w-10 h-10 rounded-full flex items-center justify-center text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-slate-800 border border-stone-200/60 dark:border-slate-800 transition-colors"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-stone-600" />
              )}
            </button>

            {/* User Profile / Dropdown */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-2.5 rounded-full border border-stone-200 dark:border-slate-800 hover:border-orange-400 bg-white dark:bg-slate-900 transition-all focus:outline-none shadow-sm"
                  aria-label="User Menu"
                >
                  <img
                    src={
                      user.photoURL ||
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                    }
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";
                    }}
                  />
                  <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2.5 w-60 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-stone-200/90 dark:border-slate-800 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-3 border-b border-stone-100 dark:border-slate-800">
                      <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">
                        Signed in as
                      </p>
                      <p className="text-sm font-bold text-stone-900 dark:text-white truncate mt-0.5">
                        {user.name}
                      </p>
                      <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
                        {user.email}
                      </p>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="px-4 py-2.5 text-sm text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-slate-800/60 flex items-center gap-2.5 transition-colors font-medium"
                      >
                        <UserIcon className="w-4 h-4 text-orange-600" />
                        <span>My Profile</span>
                      </Link>

                      <Link
                        href="/my-books"
                        onClick={() => setDropdownOpen(false)}
                        className="px-4 py-2.5 text-sm text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-slate-800/60 flex items-center gap-2.5 transition-colors font-medium"
                      >
                        <Library className="w-4 h-4 text-amber-600" />
                        <span>My Shared Books</span>
                      </Link>

                      <Link
                        href="/my-borrows"
                        onClick={() => setDropdownOpen(false)}
                        className="px-4 py-2.5 text-sm text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-slate-800/60 flex items-center gap-2.5 transition-colors font-medium"
                      >
                        <BookMarked className="w-4 h-4 text-emerald-600" />
                        <span>My Borrowed Loans</span>
                      </Link>
                    </div>

                    <div className="border-t border-stone-100 dark:border-slate-800 pt-1">
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          logout();
                        }}
                        className="w-full text-left px-4 py-2.5 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2.5 transition-colors font-semibold"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-full text-xs font-semibold text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-5 py-2 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 shadow-sm transition-all"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-slate-800 border border-stone-200/60 dark:border-slate-800"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200/80 dark:border-slate-800 bg-[#fbf9f5] dark:bg-[#0c0f17] px-6 py-6 space-y-3 animate-in fade-in slide-in-from-top-3 duration-200">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-stone-900 dark:text-white"
          >
            Home
          </Link>
          <Link
            href="/books"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-stone-900 dark:text-white"
          >
            All Books
          </Link>
          {user ? (
            <>
              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-base font-semibold text-stone-900 dark:text-white"
              >
                My Profile
              </Link>
              <Link
                href="/add-book"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-base font-semibold text-stone-900 dark:text-white"
              >
                Add Book
              </Link>
              <Link
                href="/my-books"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-base font-semibold text-stone-900 dark:text-white"
              >
                My Books
              </Link>
              <Link
                href="/my-borrows"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-base font-semibold text-stone-900 dark:text-white"
              >
                My Borrows
              </Link>
              <div className="pt-3 border-t border-stone-200 dark:border-slate-800">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full text-left py-2 text-base font-semibold text-rose-600 dark:text-rose-400"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="pt-4 flex flex-col gap-2.5">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-2xl text-sm font-semibold border border-stone-300 dark:border-slate-700 text-stone-800 dark:text-stone-200"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-2xl text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
