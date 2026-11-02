import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: {
    template: "%s | BookNook",
    default: "BookNook — A Small Online Library",
  },
  description:
    "BookNook is a community-driven digital library platform. Discover curated shelves, borrow timeless literature, and share books freely.",
  keywords: [
    "BookNook",
    "online library",
    "borrow books",
    "community library",
    "reading circle",
    "book sharing",
    "library management system",
    "Next.js library app",
  ],
  authors: [{ name: "Shajib Sikder" }],
  openGraph: {
    title: "BookNook — A Small Online Library",
    description: "Add a book, borrow a book, return a book. An open digital library for bibliophiles.",
    siteName: "BookNook",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased selection:bg-orange-500 selection:text-white flex flex-col min-h-screen bg-stone-50/50 dark:bg-stone-950 text-stone-900 dark:text-stone-100">
        <ThemeProvider>
          <AuthProvider>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3500,
                style: {
                  background: "#1c1917",
                  color: "#fff",
                  borderRadius: "14px",
                  fontSize: "14px",
                },
              }}
            />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
