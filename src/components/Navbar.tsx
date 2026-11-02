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
  Home,
  Info,
  FileText,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock body scroll when mobile drawer is open (YouTube/News style)
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <nav className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-stone-200 dark:border-slate-800 transition-colors">
        <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Mobile Menu Trigger + Brand Logo */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Hamburger Button (Mobile Only) */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Open sidebar menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              {/* Logo & Brand Name */}
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-700 via-orange-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-2xl font-bold tracking-tight text-stone-900 dark:text-white">
                    Book<span className="text-orange-600 dark:text-orange-400">Nook</span>
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-stone-400 dark:text-stone-500 -mt-1 font-sans font-medium">
                    Online Library
                  </span>
                </div>
              </Link>
            </div>

            {/* Center: Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              <Link
                href="/"
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive("/")
                    ? "bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400 font-semibold"
                    : "text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-slate-800"
                }`}
              >
                Home
              </Link>

              <Link
                href="/books"
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive("/books")
                    ? "bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400 font-semibold"
                    : "text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-slate-800"
                }`}
              >
                All Books
              </Link>

              {/* Private Links - shown only when logged in */}
              {user && (
                <>
                  <Link
                    href="/add-book"
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                      isActive("/add-book")
                        ? "bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400 font-semibold"
                        : "text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <PlusCircle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                    Add Book
                  </Link>

                  <Link
                    href="/my-books"
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                      isActive("/my-books")
                        ? "bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400 font-semibold"
                        : "text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <Library className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    My Books
                  </Link>

                  <Link
                    href="/my-borrows"
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                      isActive("/my-borrows")
                        ? "bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400 font-semibold"
                        : "text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <BookMarked className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    My Borrows
                  </Link>
                </>
              )}
            </div>

            {/* Right: Theme Toggle & Profile Dropdown */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Theme Toggle Button */}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
                className="p-2 rounded-xl text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-slate-800 transition-colors"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-amber-400" />
                ) : (
                  <Moon className="w-5 h-5 text-stone-600" />
                )}
              </button>

              {/* Auth Buttons / User Avatar Dropdown */}
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 p-1 rounded-full ring-2 ring-orange-500/30 hover:ring-orange-500 transition-all focus:outline-none"
                    aria-label="User Profile menu"
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
                  </button>

                  {/* Desktop Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-stone-200 dark:border-slate-800 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-4 py-2.5 border-b border-stone-100 dark:border-slate-800">
                        <p className="text-xs text-stone-400 dark:text-stone-500 uppercase tracking-wider font-semibold">
                          Signed in as
                        </p>
                        <p className="text-sm font-semibold text-stone-900 dark:text-white truncate">
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
                          className="px-4 py-2 text-sm text-stone-700 dark:text-stone-300 flex items-center gap-2 hover:bg-stone-50 dark:hover:bg-slate-800/50 transition-colors"
                        >
                          <UserIcon className="w-4 h-4 text-orange-600" />
                          <span>My Profile</span>
                        </Link>
                      </div>

                      <div className="border-t border-stone-100 dark:border-slate-800 pt-1">
                        <button
                          onClick={() => {
                            setDropdownOpen(false);
                            logout();
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link
                    href="/login"
                    className="px-4 py-2 rounded-lg text-sm font-medium text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 shadow-sm transition-all"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* YOUTUBE / NEWS STYLE SLIDE-OUT LEFT DRAWER OVERLAY (ZERO HERO MOVEMENT)   */}
      {/* ========================================================================= */}

      {/* 1. Frosted Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* 2. Slide-Out Drawer (Fixed Over Screen, Leaves Hero Stationary) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[290px] sm:w-[320px] max-w-[85vw] bg-white dark:bg-slate-900 border-r border-stone-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Drawer Top Branding & Close Button */}
          <div className="flex items-center justify-between p-4 sm:p-5 border-b border-stone-200 dark:border-slate-800 shrink-0">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-700 via-orange-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold tracking-tight text-stone-900 dark:text-white leading-none">
                  Book<span className="text-orange-600 dark:text-orange-400">Nook</span>
                </span>
                <span className="text-[9px] uppercase tracking-widest text-stone-400 dark:text-stone-500 font-sans font-medium mt-0.5">
                  Online Library
                </span>
              </div>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-xl text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close sidebar menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Profile Card if logged in */}
          {user && (
            <div className="p-3 mx-3 my-3 rounded-2xl bg-stone-50 dark:bg-slate-800/60 border border-stone-200/80 dark:border-slate-700/80 shrink-0">
              <div className="flex items-center gap-3">
                <img
                  src={
                    user.photoURL ||
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                  }
                  alt={user.name}
                  className="w-10 h-10 rounded-xl object-cover ring-2 ring-orange-500/30 shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";
                  }}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-stone-900 dark:text-white truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Items (YouTube News Style) */}
          <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                isActive("/")
                  ? "bg-orange-600 text-white shadow-md shadow-orange-600/20"
                  : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-slate-800"
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>

            <Link
              href="/books"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                isActive("/books")
                  ? "bg-orange-600 text-white shadow-md shadow-orange-600/20"
                  : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-slate-800"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>All Books</span>
            </Link>

            {user && (
              <>
                <Link
                  href="/add-book"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive("/add-book")
                      ? "bg-orange-600 text-white shadow-md shadow-orange-600/20"
                      : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <PlusCircle className="w-4 h-4 text-orange-500" />
                  <span>Add Book</span>
                </Link>

                <Link
                  href="/my-books"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive("/my-books")
                      ? "bg-orange-600 text-white shadow-md shadow-orange-600/20"
                      : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <Library className="w-4 h-4 text-amber-500" />
                  <span>My Books</span>
                </Link>

                <Link
                  href="/my-borrows"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive("/my-borrows")
                      ? "bg-orange-600 text-white shadow-md shadow-orange-600/20"
                      : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <BookMarked className="w-4 h-4 text-emerald-500" />
                  <span>My Borrows</span>
                </Link>

                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive("/profile")
                      ? "bg-orange-600 text-white shadow-md shadow-orange-600/20"
                      : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <UserIcon className="w-4 h-4 text-orange-500" />
                  <span>My Profile</span>
                </Link>
              </>
            )}

            {/* Quick Links Divider */}
            <div className="pt-2 pb-1">
              <div className="h-px bg-stone-200 dark:bg-slate-800 my-1.5" />
              <span className="px-3.5 text-[10px] uppercase font-bold tracking-wider text-stone-400 dark:text-stone-500">
                Explore Pages
              </span>
            </div>

            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-slate-800"
            >
              <Info className="w-3.5 h-3.5 text-stone-400" />
              <span>About Us</span>
            </Link>

            <Link
              href="/terms"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-slate-800"
            >
              <FileText className="w-3.5 h-3.5 text-stone-400" />
              <span>Terms & Conditions</span>
            </Link>
          </nav>

          {/* Drawer Bottom Actions */}
          <div className="p-4 border-t border-stone-200 dark:border-slate-800 space-y-3 bg-stone-50/80 dark:bg-slate-900/80 shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">Dark / Light Mode</span>
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-stone-600 dark:text-stone-300 shadow-sm"
                aria-label="Toggle theme in drawer"
              >
                {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>

            {user ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 flex items-center justify-center gap-2 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 text-center rounded-xl text-xs font-bold border border-stone-200 dark:border-slate-700 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-slate-800"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 text-center rounded-xl text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 shadow-sm"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
