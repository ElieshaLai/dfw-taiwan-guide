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

      {/* 第一層：深棕 Header — 全寬，內容貼左 */}
      <div style={{ backgroundColor: "#6B4423" }}>
        <div className="w-full px-6 h-20 flex items-center justify-between gap-4">

          {/* Logo 貼左 */}
          <Link href="/" className="shrink-0 flex flex-col items-start leading-none">
            <span className="font-black tracking-widest uppercase"
              style={{ color: "#E8A818", fontSize: "20px", lineHeight: "1.1" }}>
              DFW
            </span>
            <span className="font-semibold tracking-widest uppercase"
              style={{ color: "#C49A6C", fontSize: "18px", lineHeight: "1.3", letterSpacing: "0.2em" }}>
              Taiwan
            </span>
            <span className="font-semibold tracking-widest uppercase"
              style={{ color: "#C49A6C", fontSize: "18px", lineHeight: "1.3", letterSpacing: "0.2em" }}>
              Guide
            </span>
          </Link>

          {/* 搜尋列 */}
          <div
            className="flex items-center gap-2 rounded-xl px-4 py-2 w-full max-w-sm"
            style={{ backgroundColor: "#4e2e10", border: "1px solid #8B5A2B" }}
          >
            <svg className="w-4 h-4 shrink-0" style={{ color: "#C49A6C" }}
              fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
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

      {/* 第二層：分類 Tab — 全寬貼左 */}
      <nav style={{ backgroundColor: "#F9F2E8", borderBottom: "2px solid #C49A6C" }}>
        <div className="w-full px-6 flex gap-1 overflow-x-auto scrollbar-none">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className="whitespace-nowrap px-5 py-3 text-sm font-medium border-b-2 transition-all duration-150"
                style={{
                  borderBottomColor: isActive ? "#A63F24" : "transparent",
                  color: isActive ? "#A63F24" : "#6B4423",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.color = "#A63F24";
                    (e.currentTarget as HTMLElement).style.backgroundColor = "#f0e4d0";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.color = "#6B4423";
                    (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                  }
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