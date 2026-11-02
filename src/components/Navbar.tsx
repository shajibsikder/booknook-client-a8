"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "next-themes";
import { BookOpen, Sun, Moon, Menu, X, LogOut, User as UserIcon, BookMarked, PlusCircle, Library } from "lucide-react";

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

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-stone-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
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

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link
              href="/"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive("/")
                  ? "bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400"
                  : "text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-slate-800"
              }`}
            >
              Home
            </Link>

            <Link
              href="/books"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive("/books")
                  ? "bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400"
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
                      ? "bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400"
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
                      ? "bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400"
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
                      ? "bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400"
                      : "text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <BookMarked className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  My Borrows
                </Link>
              </>
            )}
          </div>

          {/* Right Action Items (Theme Toggle & Auth) */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="p-2 rounded-lg text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-slate-800 transition-colors"
            >
              {theme === "dark" ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-stone-600" />}
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
                    src={user.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";
                    }}
                  />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-stone-200 dark:border-slate-800 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2.5 border-b border-stone-100 dark:border-slate-800">
                      <p className="text-xs text-stone-400 dark:text-stone-500 uppercase tracking-wider font-semibold">Signed in as</p>
                      <p className="text-sm font-semibold text-stone-900 dark:text-white truncate">{user.name}</p>
                      <p className="text-xs text-stone-500 dark:text-stone-400 truncate">{user.email}</p>
                    </div>

                    <div className="py-1">
                      <div className="px-4 py-2 text-sm text-stone-700 dark:text-stone-300 flex items-center gap-2 hover:bg-stone-50 dark:hover:bg-slate-800/50 cursor-pointer">
                        <UserIcon className="w-4 h-4 text-orange-600" />
                        <span>My Profile</span>
                      </div>
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

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-slate-800"
                aria-label="Toggle navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-5 space-y-2">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-slate-800"
          >
            Home
          </Link>
          <Link
            href="/books"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-slate-800"
          >
            All Books
          </Link>
          {user ? (
            <>
              <Link
                href="/add-book"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-slate-800"
              >
                Add Book
              </Link>
              <Link
                href="/my-books"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-slate-800"
              >
                My Books
              </Link>
              <Link
                href="/my-borrows"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-slate-800"
              >
                My Borrows
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-base font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="pt-2 flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-lg text-sm font-medium border border-stone-300 dark:border-slate-700 text-stone-700 dark:text-stone-200"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-lg text-sm font-medium text-white bg-orange-600 hover:bg-orange-700"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
