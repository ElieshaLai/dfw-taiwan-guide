// app/events/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import { supabase } from "../../lib/supabase";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Event = {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  url: string;
};

const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"];
const MONTHS = ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 5 }, (_, i) => currentYear - 1 + i);

export default function EventsPage() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [events, setEvents] = useState<Event[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      const firstDay = `${year}-${String(month + 1).padStart(2, "0")}-01`;
      const lastDay  = new Date(year, month + 1, 0);
      const lastDayStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(lastDay.getDate()).padStart(2, "0")}`;

      const { data } = await supabase
        .from("events")
        .select("*")
        .eq("is_published", true)
        .gte("date", firstDay)
        .lte("date", lastDayStr)
        .order("date");

      setEvents(data || []);
      setLoading(false);
    }
    fetchEvents();
  }, [year, month]);

  function prevMonth() {
    if (month === 0) { setYear(y => y - 1); setMonth(11); }
    else setMonth(m => m - 1);
    setSelected(null);
  }

  function nextMonth() {
    if (month === 11) { setYear(y => y + 1); setMonth(0); }
    else setMonth(m => m + 1);
    setSelected(null);
  }

  function goToday() {
    setYear(today.getFullYear());
    setMonth(today.getMonth());
    setSelected(null);
  }

  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth  = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  function dateStr(day: number) {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }

  function eventsOnDay(day: number) {
    return events.filter(e => e.date === dateStr(day));
  }

  const isToday = (day: number) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  const isCurrentMonthYear =
    month === today.getMonth() && year === today.getFullYear();

  const selectedEvents = selected ? events.filter(e => e.date === selected) : [];

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#FBF5EE", minHeight: "100vh" }}>
        <div className="max-w-5xl mx-auto px-6 py-10">

          {/* 麵包屑 */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href="/">首頁</Link>} />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage style={{ color: "#6B4423", fontWeight: 600 }}>
                  活動日曆
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="flex items-center gap-3 font-bold mb-8" style={{ color: "#6B4423", fontSize: "24px" }}>
            <Image src="/calendar-icon.png" alt="活動日曆" width={32} height={32} />
            活動日曆
          </h1>

          {/* 月份切換 + filter + 回到今天 */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">

            {/* 左：年月 filter */}
            <div className="flex items-center gap-2">
              <select
                value={year}
                onChange={(e) => { setYear(Number(e.target.value)); setSelected(null); }}
                className="text-sm font-medium px-3 py-2 rounded-lg border outline-none"
                style={{ borderColor: "#e8d8c4", color: "#6B4423", backgroundColor: "white" }}
              >
                {YEARS.map(y => (
                  <option key={y} value={y}>{y} 年</option>
                ))}
              </select>

              <select
                value={month}
                onChange={(e) => { setMonth(Number(e.target.value)); setSelected(null); }}
                className="text-sm font-medium px-3 py-2 rounded-lg border outline-none"
                style={{ borderColor: "#e8d8c4", color: "#6B4423", backgroundColor: "white" }}
              >
                {MONTHS.map((m, i) => (
                  <option key={i} value={i}>{m}</option>
                ))}
              </select>
            </div>

            {/* 右：上下月 + 回到今天 */}
            <div className="flex items-center gap-2">
              {!isCurrentMonthYear && (
                <button
                  onClick={goToday}
                  className="text-xs font-medium px-3 py-2 rounded-lg border transition-colors hover:bg-amber-50"
                  style={{ borderColor: "#C49A6C", color: "#6B4423" }}
                >
                  回到今天
                </button>
              )}
              <button
                onClick={prevMonth}
                className="p-2 rounded-lg transition-colors hover:bg-amber-50"
                style={{ color: "#6B4423" }}
              >
                <ChevronLeft size={20} />
              </button>
              <span className="text-sm font-bold" style={{ color: "#6B4423", minWidth: "80px", textAlign: "center" }}>
                {year} / {String(month + 1).padStart(2, "0")}
              </span>
              <button
                onClick={nextMonth}
                className="p-2 rounded-lg transition-colors hover:bg-amber-50"
                style={{ color: "#6B4423" }}
              >
                <ChevronRight size={20} />
              </button>
            </div>

          </div>

          {/* 日曆 */}
          <div
            className="rounded-2xl overflow-hidden mb-6"
            style={{ border: "1px solid #e8d8c4", backgroundColor: "white" }}
          >
            {/* 星期標題 */}
            <div className="grid grid-cols-7">
              {WEEKDAYS.map((d, i) => (
                <div
                  key={d}
                  className="py-4 text-center text-sm font-semibold"
                  style={{
                    color: i === 0 || i === 6 ? "#659429" : "#C49A6C",
                    borderBottom: "1px solid #f0e4d0",
                  }}
                >
                  {d}
                </div>
              ))}
            </div>

            {/* 日期格子 */}
            <div className="grid grid-cols-7">
              {cells.map((day, idx) => {
                if (!day) return (
                  <div
                    key={`empty-${idx}`}
                    className="p-2"
                    style={{
                      minHeight: "100px",
                      borderBottom: "1px solid #f9f2e8",
                      borderRight: idx % 7 !== 6 ? "1px solid #f9f2e8" : "none",
                    }}
                  />
                );

                const dayEvents = eventsOnDay(day);
                const ds = dateStr(day);
                const isSelected = selected === ds;
                const weekday = (firstWeekday + day - 1) % 7;
                const isWeekend = weekday === 0 || weekday === 6;

                return (
                  <div
                    key={day}
                    onClick={() => setSelected(isSelected ? null : ds)}
                    className="p-2 cursor-pointer transition-colors"
                    style={{
                      minHeight: "100px",
                      borderBottom: "1px solid #f0e4d0",
                      borderRight: (firstWeekday + day - 1) % 7 !== 6 ? "1px solid #f0e4d0" : "none",
                      backgroundColor: isSelected ? "#f0e4d0" : isToday(day) ? "#fdf5e8" : "white",
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) (e.currentTarget as HTMLElement).style.backgroundColor = "#fdf8f2";
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) (e.currentTarget as HTMLElement).style.backgroundColor = isToday(day) ? "#fdf5e8" : "white";
                    }}
                  >
                    {/* 日期數字 */}
                    <div
                      className="text-sm font-medium mb-1.5 w-8 h-8 flex items-center justify-center rounded-full"
                      style={{
                        color: isToday(day) ? "white" : isWeekend ? "#659429" : "#6B4423",
                        backgroundColor: isToday(day) ? "#A63F24" : "transparent",
                        fontWeight: isToday(day) ? 700 : 500,
                      }}
                    >
                      {day}
                    </div>

                    {/* 活動標籤 */}
                    <div className="flex flex-col gap-1">
                      {dayEvents.slice(0, 3).map((e) => (
                        <div
                          key={e.id}
                          className="text-xs px-1.5 py-0.5 rounded truncate"
                          style={{ backgroundColor: "#6B4423", color: "white", fontSize: "11px" }}
                        >
                          {e.title}
                        </div>
                      ))}
                      {dayEvents.length > 3 && (
                        <div className="text-xs" style={{ color: "#C49A6C", fontSize: "10px" }}>
                          +{dayEvents.length - 3} 個
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 選取日期的活動詳情 */}
          {selected && selectedEvents.length > 0 && (
            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold" style={{ color: "#6B4423" }}>
                {selected.replace(/-/g, "/")} 的活動
              </h3>
              {selectedEvents.map((e) => (
                <div
                  key={e.id}
                  className="p-5 rounded-xl"
                  style={{ backgroundColor: "white", border: "1px solid #e8d8c4" }}
                >
                  <h4 className="font-bold mb-2" style={{ color: "#6B4423", fontSize: "16px" }}>
                    {e.title}
                  </h4>
                  <div className="flex flex-wrap gap-3 mb-3">
                    {e.time && (
                      <span className="inline-flex items-center gap-1 text-xs" style={{ color: "#C49A6C" }}>
                        <Image src="/clock-icon.png" alt="time" width={12} height={12} />
                        {e.time}
                      </span>
                    )}
                    {e.location && (
                      <span className="inline-flex items-center gap-1 text-xs" style={{ color: "#C49A6C" }}>
                        <Image src="/location-pin.png" alt="location" width={12} height={12} />
                        {e.location}
                      </span>
                    )}
                  </div>
                  {e.description && (
                    <p className="text-sm mb-3 leading-relaxed" style={{ color: "#888" }}>
                      {e.description}
                    </p>
                  )}
                  {e.url && (
                    <a
                      href={e.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium hover:opacity-70 transition-opacity"
                      style={{ color: "#E8A818" }}
                    >
                      報名 / 詳細資訊 →
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}

          {selected && selectedEvents.length === 0 && (
            <p className="text-sm text-center py-6" style={{ color: "#C49A6C" }}>
              這天沒有活動
            </p>
          )}

          {loading && (
            <p className="text-center text-sm" style={{ color: "#C49A6C" }}>載入中⋯</p>
          )}

        </div>
      </main>
    </>
  );
}