// app/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
  const { scrollY } = useScroll();

  const titleY       = useTransform(scrollY, [0, 300], [0, -80]);
  const titleOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  const titleScale   = useTransform(scrollY, [0, 300], [1, 0.9]);

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  return (
    <>
      <Navbar isHomePage={true} />

      <main>
        {/* Hero — 全螢幕 */}
        <section className="relative" style={{ height: "100vh" }}>

          {/* 背景圖 */}
          <div className="absolute inset-0">
            <Image
              src="/hero.jpg"
              alt="DFW Taiwan Guide"
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              priority
            />
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(to bottom, rgba(40,15,5,0.25) 0%, rgba(40,15,5,0.7) 100%)" }}
            />
          </div>

          {/* 大標題 — 左上，scroll 時淡出 */}
          <motion.div
            style={{ y: titleY, opacity: titleOpacity, scale: titleScale }}
            className="absolute top-10 left-0 right-0 pointer-events-none z-10 px-8 sm:px-16"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-start"
            >
              <span
                className="font-black tracking-widest uppercase leading-none"
                style={{
                  fontSize: "clamp(48px, 10vw, 110px)",
                  color: "#E8C9A0",
                  textShadow: "0 4px 40px rgba(0,0,0,0.4)",
                }}
              >
                DFW
              </span>
              <span
                className="font-bold tracking-widest uppercase"
                style={{
                  fontSize: "clamp(36px, 7.5vw, 82px)",
                  color: "#C49A6C",
                  letterSpacing: "0.12em",
                  textShadow: "0 2px 20px rgba(0,0,0,0.4)",
                  lineHeight: 1.1,
                }}
              >
                TAIWAN GUIDE
              </span>
            </motion.div>
          </motion.div>

          {/* 問候 + 從哪裡開始 + 關鍵字 — 置中下方 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute bottom-16 left-0 right-0 flex flex-col items-center gap-4 px-6 z-10 text-center"
          >
            <p className="font-black" style={{
              fontSize: "clamp(36px, 8vw, 64px)",
              color: "#E8C9A0",
              textShadow: "0 2px 32px rgba(0,0,0,0.5)"
            }}>
              {greeting}
            </p>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium tracking-widest" style={{ color: "#E8C9A0" }}>
                從哪裡開始？
              </span>
              <motion.svg
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="#E8C9A0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </motion.svg>
            </div>

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
          </motion.div>
        </section>

        {/* 最新消息 */}
        <section id="latest"
          style={{ backgroundColor: "#FBF5EE", borderTop: "3px solid #C49A6C" }}
          className="px-6 py-16"
        >
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="flex items-center gap-2 font-bold tracking-wide"
                style={{ color: "#6B4423", fontSize: "20px" }}>
                <Image src="/speaker-icon.png" alt="最新消息" width={24} height={24} />
                最新消息
              </h2>
              <Link href="/news"
                className="text-xs font-medium transition-opacity hover:opacity-70"
                style={{ color: "#A63F24" }}>
                查看全部 →
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              {latestNews.map((news, i) => (
                <Link key={i} href={news.href}
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
                  <span className="text-xs font-mono shrink-0" style={{ color: "#C49A6C" }}>{news.date}</span>
                  <span className="text-sm font-medium" style={{ color: "#6B4423" }}>{news.title}</span>
                  <span className="ml-auto text-xs transition-transform group-hover:translate-x-1"
                    style={{ color: "#C49A6C" }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <div style={{ backgroundColor: "#FBF5EE" }} className="px-6 pb-12">
          <p className="text-center text-xs max-w-5xl mx-auto"
            style={{ color: "#C49A6C", opacity: 0.5 }}>
            DFW Taiwan Guide · 持續更新中
          </p>
        </div>
      </main>
    </>
  );
}