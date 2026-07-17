// app/explore/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import { supabase } from "../../lib/supabase";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type Community = {
  id: number;
  name: string;
  category: string;
  description: string;
  location: string;
  contact: string;
  url: string;
  image_url: string;
};

const CATEGORIES = ["宗教", "運動", "團購", "親子", "同鄉", "其他"];

export default function ExplorePage() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase
        .from("community")
        .select("*")
        .eq("is_published", true)
        .order("name");
      setCommunities(data || []);
      setLoading(false);
    }
    fetch();
  }, []);

  function toggle(cat: string) {
    setSelected(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  }

  const filtered = selected.length === 0
    ? communities
    : communities.filter(c => selected.includes(c.category));

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
                <BreadcrumbPage style={{ color: "#6B4423", fontWeight: 600 }}>社群與玩樂</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="font-bold mb-6" style={{ color: "#6B4423", fontSize: "24px" }}>
            🎉 社群與玩樂
          </h1>

          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {CATEGORIES.map(cat => {
              const isActive = selected.includes(cat);
              return (
                <button key={cat} onClick={() => toggle(cat)}
                  className="text-sm px-4 py-1.5 rounded-full border transition-all duration-150 font-medium"
                  style={{
                    backgroundColor: isActive ? "#6B4423" : "white",
                    borderColor: isActive ? "#6B4423" : "#e8d8c4",
                    color: isActive ? "white" : "#6B4423",
                  }}>
                  {cat}
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
            <p style={{ color: "#C49A6C" }}>目前沒有社群資料。</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map(c => (
              <div key={c.id} className="p-5 rounded-xl flex gap-4"
                style={{ backgroundColor: "white", border: "1px solid #e8d8c4" }}>

                {/* Profile pic */}
                {c.image_url ? (
                  <div className="shrink-0">
                    <img src={c.image_url} alt={c.name}
                      className="rounded-full object-cover"
                      style={{ width: 56, height: 56, border: "2px solid #e8d8c4" }} />
                  </div>
                ) : (
                  <div className="shrink-0 rounded-full flex items-center justify-center text-xl"
                    style={{ width: 56, height: 56, backgroundColor: "#F9F2E8", border: "2px solid #e8d8c4" }}>
                    🎉
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h2 className="font-bold" style={{ color: "#6B4423", fontSize: "16px" }}>{c.name}</h2>
                    <span className="text-xs px-2 py-0.5 rounded-full shrink-0"
                      style={{ backgroundColor: "#F9F2E8", color: "#A63F24", border: "1px solid #e8d8c4" }}>
                      {c.category}
                    </span>
                  </div>
                  {c.description && (
                    <p className="text-sm mb-2" style={{ color: "#888" }}>{c.description}</p>
                  )}
                  {c.location && (
                    <p className="text-xs mb-1" style={{ color: "#C49A6C" }}>📍 {c.location}</p>
                  )}
                  {c.contact && (
                    <p className="text-xs mb-2" style={{ color: "#C49A6C" }}>📞 {c.contact}</p>
                  )}
                  {c.url && (
                    <a href={c.url} target="_blank" rel="noopener noreferrer"
                      className="text-xs font-medium hover:opacity-70"
                      style={{ color: "#E8A818" }}>
                      加入社群 →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}