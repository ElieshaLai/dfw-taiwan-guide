// app/directory/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import LocationPin from "../../components/LocationPin";
import { supabase } from "../../lib/supabase";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type Directory = {
  id: number;
  name: string;
  category: string;
  title: string;
  company: string;
  phone: string;
  email: string;
  description: string;
  city: string;
  image_url: string;
};

const CATEGORIES = ["房屋", "保險", "汽車", "醫療", "律師"];

export default function DirectoryPage() {
  const [entries, setEntries] = useState<Directory[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase
        .from("directory")
        .select("*")
        .eq("is_published", true)
        .order("name");
      setEntries(data || []);
      setLoading(false);
    }
    fetch();
  }, []);

  function toggle(cat: string) {
    setSelected(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  }

  const filtered = selected.length === 0
    ? entries
    : entries.filter(e => selected.includes(e.category));

  const categoryEmoji: Record<string, string> = {
    房屋: "🏠", 保險: "🛡️", 汽車: "🚗", 醫療: "🏥", 律師: "⚖️",
  };

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#FBF5EE", minHeight: "100vh", paddingTop: "140px" }}>
        <div className="max-w-5xl mx-auto px-6 py-10">

          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href="/">首頁</Link>} />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage style={{ color: "#6B4423", fontWeight: 600 }}>名片與推薦</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="font-bold mb-2" style={{ color: "#6B4423", fontSize: "24px" }}>
            📇 名片與推薦
          </h1>
          <p className="text-sm mb-6" style={{ color: "#C49A6C" }}>
            台灣人推薦的專業人士，找對人少走冤枉路
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {CATEGORIES.map(cat => {
              const isActive = selected.includes(cat);
              return (
                <button key={cat} onClick={() => toggle(cat)}
                  className="text-sm px-4 py-1.5 rounded-full border transition-all duration-150 font-medium flex items-center gap-1"
                  style={{
                    backgroundColor: isActive ? "#6B4423" : "white",
                    borderColor: isActive ? "#6B4423" : "#e8d8c4",
                    color: isActive ? "white" : "#6B4423",
                  }}>
                  {categoryEmoji[cat]} {cat}
                </button>
              );
            })}
            {selected.length > 0 && (
              <button onClick={() => setSelected([])}
                className="text-xs underline hover:opacity-70"
                style={{ color: "#A63F24" }}>
                清除
              </button>
            )}
          </div>

          {loading && <p style={{ color: "#C49A6C" }}>載入中⋯</p>}
          {!loading && filtered.length === 0 && (
            <p style={{ color: "#C49A6C" }}>目前沒有名片資料。</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map(e => (
              <div key={e.id} className="p-5 rounded-xl flex gap-4 transition-all duration-150"
                style={{ backgroundColor: "white", border: "1px solid #e8d8c4" }}
                onMouseEnter={el => {
                  (el.currentTarget as HTMLElement).style.borderColor = "#C49A6C";
                  (el.currentTarget as HTMLElement).style.backgroundColor = "#fdf8f2";
                }}
                onMouseLeave={el => {
                  (el.currentTarget as HTMLElement).style.borderColor = "#e8d8c4";
                  (el.currentTarget as HTMLElement).style.backgroundColor = "white";
                }}>

                {e.image_url ? (
                  <div className="shrink-0">
                    <img src={e.image_url} alt={e.name}
                      className="rounded-full object-cover"
                      style={{ width: 64, height: 64, border: "2px solid #e8d8c4" }} />
                  </div>
                ) : (
                  <div className="shrink-0 rounded-full flex items-center justify-center text-2xl"
                    style={{ width: 64, height: 64, backgroundColor: "#F9F2E8", border: "2px solid #e8d8c4" }}>
                    {categoryEmoji[e.category] || "👤"}
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-0.5">
                    <h2 className="font-bold" style={{ color: "#6B4423", fontSize: "16px" }}>{e.name}</h2>
                    <span className="text-xs px-2 py-0.5 rounded-full shrink-0"
                      style={{ backgroundColor: "#F9F2E8", color: "#A63F24", border: "1px solid #e8d8c4" }}>
                      {categoryEmoji[e.category]} {e.category}
                    </span>
                  </div>
                  {e.title && (
                    <p className="text-sm font-medium mb-1" style={{ color: "#A63F24" }}>{e.title}</p>
                  )}
                  {e.company && (
                    <p className="text-xs mb-2" style={{ color: "#C49A6C" }}>{e.company}</p>
                  )}
                  {e.description && (
                    <p className="text-sm mb-2" style={{ color: "#888" }}>{e.description}</p>
                  )}
                  {e.city && (
                    <p className="text-xs mb-1" style={{ color: "#C49A6C" }}>
                      <LocationPin text={e.city} />
                    </p>
                  )}
                  <div className="flex flex-wrap gap-3 mt-2">
                    {e.phone && (
                      <a href={`tel:${e.phone}`} className="text-xs font-medium hover:opacity-70"
                        style={{ color: "#6B4423" }}>
                        📞 {e.phone}
                      </a>
                    )}
                    {e.email && (
                      <a href={`mailto:${e.email}`} className="text-xs font-medium hover:opacity-70"
                        style={{ color: "#E8A818" }}>
                        ✉️ {e.email}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}