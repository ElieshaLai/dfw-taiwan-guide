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

      {/* 第一層：深棕 Header */}
      <div style={{ backgroundColor: "#6B4423" }}>
        <div className="max-w-5xl mx-auto px-5 h-20 flex items-center justify-between gap-4">

          {/* Logo：三行疊排 */}
          <Link href="/" className="shrink-0 leading-none flex flex-col">
            <span
              className="font-black tracking-widest uppercase"
              style={{ color: "#E8A818", fontSize: "22px", lineHeight: "1.15" }}
            >
              DFW
            </span>
            <span
              className="font-bold tracking-widest uppercase"
              style={{ color: "#C49A6C", fontSize: "13px", lineHeight: "1.2" }}
            >
              TAIWAN
            </span>
            <span
              className="font-medium tracking-widest uppercase"
              style={{ color: "#C49A6C", fontSize: "11px", lineHeight: "1.2", opacity: 0.75 }}
            >
              GUIDE
            </span>
          </Link>

          {/* 搜尋列 */}
          <div
            className="flex items-center gap-2 rounded-xl px-4 py-2 w-full max-w-sm"
            style={{ backgroundColor: "#4e2e10", border: "1px solid #8B5A2B" }}
          >
            <svg
              className="w-4 h-4 shrink-0"
              style={{ color: "#C49A6C" }}
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
              className="bg-transparent text-sm outline-none w-full"
              style={{ color: "white" }}
            />
          </div>

        </div>
      </div>

      {/* 第二層：分類 Tab Navbar */}
      <nav style={{ backgroundColor: "#F9F2E8", borderBottom: "2px solid #C49A6C" }}>
        <div className="max-w-5xl mx-auto px-5 flex gap-1 overflow-x-auto scrollbar-none">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className="whitespace-nowrap px-5 py-3 text-sm font-medium border-b-2 transition-colors"
                style={{
                  borderBottomColor: isActive ? "#A63F24" : "transparent",
                  color: isActive ? "#A63F24" : "#6B4423",
                }}
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