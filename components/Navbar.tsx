// components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/guides/rent", label: "🏠 居住與租屋" },
  { href: "/education",   label: "🏫 學校與教育" },
  { href: "/restaurants", label: "🍜 美食與購物" },
  { href: "/life",        label: "📘 新生活指南" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [query, setQuery] = useState("");

  return (
    <header className="sticky top-0 z-50">

      {/* 第一層：深色 Header */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl font-bold text-red-400 tracking-tight">DFW</span>
            <span className="text-sm text-gray-400 hidden sm:block">台灣生活指南</span>
          </Link>

          {/* 搜尋列（目前 UI only，之後可接功能） */}
          <div className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 w-full max-w-sm">
            <svg
              className="w-4 h-4 text-gray-400 shrink-0"
              fill="none" stroke="currentColor" strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="搜尋餐廳、學校、資訊⋯"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent text-sm text-white placeholder-gray-500 outline-none w-full"
            />
          </div>

        </div>
      </div>

      {/* 第二層：分類 Tab Navbar */}
      <nav className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-5 flex gap-1 overflow-x-auto scrollbar-none">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  whitespace-nowrap px-5 py-3 text-sm font-medium border-b-2 transition-colors
                  ${isActive
                    ? "border-red-500 text-red-500"
                    : "border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-200"
                  }
                `}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>

    </header>
  );
}