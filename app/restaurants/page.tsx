// app/restaurants/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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

const CATEGORIES = ["台式", "中式", "日式", "韓式", "手搖飲", "早午餐", "燒烤", "素食"];

type Restaurant = {
  id: number;
  name: string;
  category: string;
  city: string;
  address: string;
  phone: string;
  description: string;
  google_maps_url: string;
};

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("restaurants")
        .select("*")
        .eq("is_published", true)
        .order("name");
      if (error) setError(error.message);
      else setRestaurants(data || []);
      setLoading(false);
    }
    fetchData();
  }, []);

  function toggleCategory(cat: string) {
    setSelected((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  }

  function removeCategory(cat: string) {
    setSelected((prev) => prev.filter((c) => c !== cat));
  }

  const filtered =
    selected.length === 0
      ? restaurants
      : restaurants.filter((r) => selected.includes(r.category));

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
                  美食地圖
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* 標題 */}
          <h1 className="font-bold mb-6" style={{ color: "#6B4423", fontSize: "24px" }}>
            🗺️ 美食地圖
          </h1>

          {/* Filter 泡泡 */}
          <div className="flex flex-wrap gap-2 mb-4">
            {CATEGORIES.map((cat) => {
              const isActive = selected.includes(cat);
              return (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className="text-sm px-4 py-1.5 rounded-full border transition-all duration-150 font-medium"
                  style={{
                    backgroundColor: isActive ? "#6B4423" : "white",
                    borderColor: isActive ? "#6B4423" : "#e8d8c4",
                    color: isActive ? "white" : "#6B4423",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* 已選取的 filter 標籤 */}
          {selected.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-xs" style={{ color: "#C49A6C" }}>已篩選：</span>
              {selected.map((cat) => (
                <span
                  key={cat}
                  className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full font-medium"
                  style={{ backgroundColor: "#E8A818", color: "#3a1e08" }}
                >
                  {cat}
                  <button
                    onClick={() => removeCategory(cat)}
                    className="ml-1 hover:opacity-70 transition-opacity"
                  >
                    ✕
                  </button>
                </span>
              ))}
              <button
                onClick={() => setSelected([])}
                className="text-xs underline transition-opacity hover:opacity-70"
                style={{ color: "#A63F24" }}
              >
                清除全部
              </button>
            </div>
          )}

          {/* 餐廳列表 */}
          {loading && (
            <p style={{ color: "#C49A6C" }}>載入中⋯</p>
          )}
          {error && (
            <p style={{ color: "#A63F24" }}>載入失敗：{error}</p>
          )}
          {!loading && filtered.length === 0 && (
            <p style={{ color: "#C49A6C" }}>沒有符合的餐廳。</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((r) => (
              <div
                key={r.id}
                className="p-5 rounded-xl transition-all duration-150"
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
                <div className="flex items-start justify-between mb-1">
                  <h2 className="font-bold text-lg" style={{ color: "#6B4423" }}>
                    {r.name}
                  </h2>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full shrink-0 ml-2"
                    style={{ backgroundColor: "#F9F2E8", color: "#A63F24", border: "1px solid #e8d8c4" }}
                  >
                    {r.category}
                  </span>
                </div>
                <p className="text-xs mb-2" style={{ color: "#C49A6C" }}>
                  📍 {r.city}
                </p>
                {r.description && (
                  <p className="text-sm mb-3" style={{ color: "#888" }}>
                    {r.description}
                  </p>
                )}
                {r.address && (
                  <p className="text-xs mb-1" style={{ color: "#C49A6C" }}>
                    {r.address}
                  </p>
                )}
                {r.phone && (
                  <p className="text-xs mb-2" style={{ color: "#C49A6C" }}>
                    📞 {r.phone}
                  </p>
                )}
                {r.google_maps_url && (
                  <a
                    href={r.google_maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium transition-opacity hover:opacity-70"
                    style={{ color: "#E8A818" }}
                  >
                    Google Maps →
                  </a>
                )}
              </div>
            ))}
          </div>

        </div>
      </main>
    </>
  );
}