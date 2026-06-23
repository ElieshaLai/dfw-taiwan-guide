// app/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12)  return "早安";
  if (hour >= 12 && hour < 18) return "午安";
  return "晚安";
}

const keywords = [
  { label: "租屋指南",   href: "/guides/rent" },
  { label: "台灣餐廳",   href: "/restaurants" },
  { label: "學區資訊",   href: "/education" },
  { label: "開銀行帳戶", href: "/life/bank" },
  { label: "駕照申請",   href: "/life/license" },
  { label: "亞洲超市",   href: "/shopping" },
];

const latestNews = [
  { date: "2026.06", title: "最新消息標題一", href: "#" },
  { date: "2026.06", title: "最新消息標題二", href: "#" },
  { date: "2026.05", title: "最新消息標題三", href: "#" },
];

export default function Home() {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  return (
    <>
      <Navbar />

      <main>
        {/* Hero — 垂直置中 */}
        <section
          className="relative text-white"
          style={{
            backgroundImage: "url('/hero.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "88vh",
          }}
        >
          {/* 暗化遮罩 */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(40,15,5,0.88) 0%, rgba(40,15,5,0.45) 55%, rgba(40,15,5,0.1) 100%)",
            }}
          />

          {/* 內容：垂直置中 */}
          <div className="relative h-full flex flex-col items-center justify-center text-center px-5">

            {/* H1：時間問候 */}
            <h1
              className="font-black leading-none mb-5"
              style={{
                fontSize: "clamp(52px, 12vw, 80px)",
                color: "#E8C9A0",
                textShadow: "0 2px 32px rgba(0,0,0,0.5)",
              }}
            >
              {greeting}
            </h1>

            <p
              className="mb-8 leading-relaxed max-w-md"
              style={{ color: "rgba(255,255,255,0.6)", fontSize: "15px" }}
            >
              給台灣人的 Dallas–Fort Worth 生活指南。<br />
              從租屋、學區到美食與生活資訊，協助你快速適應德州生活。
            </p>

            {/* 從哪裡開始 + 箭頭 — 在關鍵字上面 */}
            <div className="flex flex-col items-center gap-1 mb-5">
              <span
                className="text-sm font-medium tracking-widest"
                style={{ color: "#E8C9A0" }}
              >
                從哪裡開始？
              </span>
              <svg
                width="22" height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#E8C9A0"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ animation: "bounce 1.8s infinite" }}
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </div>

            {/* 關鍵字按鈕 */}
            <div className="flex flex-wrap gap-2 justify-center max-w-lg">
              {keywords.map((k) => (
                <Link
                  key={k.href}
                  href={k.href}
                  className="text-xs font-medium px-4 py-2 rounded-full transition-all duration-150"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(196,154,108,0.4)",
                    color: "#C49A6C",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(232,168,24,0.2)";
                    (e.currentTarget as HTMLElement).style.borderColor = "#E8A818";
                    (e.currentTarget as HTMLElement).style.color = "#E8A818";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.1)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(196,154,108,0.4)";
                    (e.currentTarget as HTMLElement).style.color = "#C49A6C";
                  }}
                >
                  {k.label}
                </Link>
              ))}
            </div>

          </div>
        </section>

        {/* 最新消息區塊 */}
        <section
          id="latest"
          style={{ backgroundColor: "#FBF5EE", borderTop: "3px solid #C49A6C" }}
          className="px-6 py-16"
        >
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-bold tracking-wide"
                style={{ color: "#6B4423", fontSize: "20px" }}>
                📣 最新消息
              </h2>
              <Link href="/news"
                className="text-xs font-medium transition-opacity hover:opacity-70"
                style={{ color: "#A63F24" }}>
                查看全部 →
              </Link>
            </div>

            <div className="flex flex-col gap-4">
              {latestNews.map((news, i) => (
                <Link
                  key={i}
                  href={news.href}
                  className="flex items-center gap-4 p-4 rounded-xl transition-all duration-150 group"
                  style={{ backgroundColor: "white", border: "1px solid #e8d8c4" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#C49A6C";
                    (e.currentTarget as HTMLElement).style.backgroundColor = "#fdf0e0";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#e8d8c4";
                    (e.currentTarget as HTMLElement).style.backgroundColor = "white";
                  }}
                >
                  <span className="text-xs font-mono shrink-0" style={{ color: "#C49A6C" }}>
                    {news.date}
                  </span>
                  <span className="text-sm font-medium" style={{ color: "#6B4423" }}>
                    {news.title}
                  </span>
                  <span className="ml-auto text-xs transition-transform group-hover:translate-x-1"
                    style={{ color: "#C49A6C" }}>
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 頁面底部 */}
        <div style={{ backgroundColor: "#FBF5EE" }} className="px-6 pb-12">
          <p className="text-center text-xs max-w-5xl mx-auto"
            style={{ color: "#C49A6C", opacity: 0.5 }}>
            DFW Taiwan Guide · 持續更新中
          </p>
        </div>

      </main>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(6px); }
        }
      `}</style>
    </>
  );
}