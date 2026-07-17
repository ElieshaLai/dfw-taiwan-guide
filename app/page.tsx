// app/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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

  useEffect(() => { setGreeting(getGreeting()); }, []);

  return (
    <>
      <Navbar isHomePage={true} />

      <main>
        {/* Hero 第一屏 — 問候 + scroll 提示 */}
        <section className="relative" style={{ height: "100vh", backgroundColor: "#a5defd" }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/hero.png"
              alt="DFW Taiwan Guide"
              fill
              style={{ objectFit: "cover", objectPosition: "center top" }}
              priority
            />
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(to right, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.05) 60%, transparent 100%)" }}
            />
          </div>

          {/* 問候語 — 置中 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 z-10 text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-black"
              style={{
                fontSize: "clamp(64px, 14vw, 120px)",
                color: "#4a2010",
                textShadow: "0 2px 20px rgba(255,255,255,0.3)"
              }}
            >
              {greeting}
            </motion.p>
          </div>

          {/* Scroll 提示 — 下方 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-3 z-10"
            style={{ color: "#6B4423" }}
          >
            <span className="font-medium tracking-widest uppercase" style={{ fontSize: "15px" }}>Scroll</span>
            <motion.svg
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              width="28" height="28" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </motion.svg>
          </motion.div>
        </section>

        {/* 第二屏 — 從哪裡開始（左）+ 最新消息（右）*/}
        <section style={{ backgroundColor: "#FBF5EE", borderTop: "3px solid #C49A6C" }}>
          <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row gap-12 items-start">

            {/* 左：從哪裡開始 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="w-full md:flex-1"
            >
              <div className="flex items-center gap-3 mb-6">
                <Image src="/question.png" alt="從哪裡開始" width={28} height={28} />
                <span className="font-semibold tracking-widest" style={{ color: "#6B4423", fontSize: "clamp(18px, 2.5vw, 26px)" }}>
                  從哪裡開始？
                </span>
                <svg
                  width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="#6B4423" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>

              <div className="flex flex-wrap gap-2">
                {keywords.map((k) => (
                  <Link
                    key={k.href}
                    href={k.href}
                    className="font-medium px-5 py-2.5 rounded-full transition-all duration-150"
                    style={{
                      fontSize: "clamp(13px, 1.5vw, 16px)",
                      backgroundColor: "white",
                      border: "1px solid #C49A6C",
                      color: "#6B4423",
                      fontWeight: 600,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "#fdf0e0";
                      (e.currentTarget as HTMLElement).style.borderColor = "#C49A6C";
                      (e.currentTarget as HTMLElement).style.color = "#A63F24";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "white";
                      (e.currentTarget as HTMLElement).style.borderColor = "#C49A6C";
                      (e.currentTarget as HTMLElement).style.color = "#6B4423";
                    }}
                  >
                    {k.label}
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* 分隔線 */}
            <div className="hidden md:block w-px self-stretch" style={{ backgroundColor: "#e8d8c4" }} />

            {/* 右：最新消息 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              viewport={{ once: true }}
              className="w-full md:flex-1"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="flex items-center gap-2 font-bold"
                  style={{ color: "#6B4423", fontSize: "clamp(18px, 2.5vw, 26px)" }}>
                  <Image src="/speaker-icon.png" alt="最新消息" width={24} height={24} />
                  最新消息
                </h2>
                <Link href="/news"
                  className="text-xs font-medium transition-opacity hover:opacity-70"
                  style={{ color: "#A63F24" }}>
                  查看全部 →
                </Link>
              </div>

              <div className="flex flex-col gap-3">
                {latestNews.map((news, i) => (
                  <Link key={i} href={news.href}
                    className="flex items-center gap-4 p-4 rounded-xl transition-all duration-150 group"
                    style={{
                      backgroundColor: "white",
                      border: "1px solid #e8d8c4",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "#fdf0e0";
                      (e.currentTarget as HTMLElement).style.borderColor = "#C49A6C";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "white";
                      (e.currentTarget as HTMLElement).style.borderColor = "#e8d8c4";
                    }}
                  >
                    <span className="text-xs font-mono shrink-0" style={{ color: "#C49A6C" }}>{news.date}</span>
                    <span className="text-sm font-medium" style={{ color: "#6B4423" }}>{news.title}</span>
                    <span className="ml-auto text-xs transition-transform group-hover:translate-x-1"
                      style={{ color: "#C49A6C" }}>→</span>
                  </Link>
                ))}
              </div>
            </motion.div>

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