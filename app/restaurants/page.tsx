// app/restaurants/page.tsx
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

type Restaurant = {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  city: string;
  address: string;
  phone: string;
  description: string;
  google_maps_url: string;
};

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [selectedSubs, setSelectedSubs] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      const { data: enumData } = await supabase
        .rpc("get_enum_values", { enum_name: "restaurant_category" });
      if (enumData) setCategories(enumData);

      const { data, error } = await supabase
        .from("restaurants")
        .select("*")
        .eq("is_published", true)
        .order("name");

      if (error) {
        setError(error.message);
      } else {
        setRestaurants(data || []);
        const uniqueCities = [...new Set((data || []).map((r) => r.city).filter(Boolean))].sort();
        setCities(uniqueCities);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  // 當前主分類底下有哪些子分類
  const availableSubs = selectedCats.length > 0
    ? [...new Set(
        restaurants
          .filter((r) => selectedCats.includes(r.category) && r.subcategory)
          .map((r) => r.subcategory)
      )].sort()
    : [];

  function toggleCat(cat: string) {
    setSelectedCats((prev) => {
      const next = prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat];
      // 子分類只保留仍然有效的
      setSelectedSubs((subs) =>
        subs.filter((sub) =>
          restaurants.some((r) => next.includes(r.category) && r.subcategory === sub)
        )
      );
      return next;
    });
  }

  function toggleSub(sub: string) {
    setSelectedSubs((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
    );
  }

  function toggleCity(city: string) {
    setSelectedCities((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
    );
  }

  function clearAll() {
    setSelectedCats([]);
    setSelectedSubs([]);
    setSelectedCities([]);
  }

  const filtered = restaurants.filter((r) => {
    const catMatch = selectedCats.length === 0 || selectedCats.includes(r.category);
    const subMatch = selectedSubs.length === 0 || selectedSubs.includes(r.subcategory);
    const cityMatch = selectedCities.length === 0 || selectedCities.includes(r.city);
    return catMatch && subMatch && cityMatch;
  });

  const hasFilter = selectedCats.length > 0 || selectedSubs.length > 0 || selectedCities.length > 0;

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

          <h1 className="flex items-center gap-3 font-bold mb-6" style={{ color: "#6B4423", fontSize: "24px" }}>
            <Image src="/food-map-icon.png" alt="美食地圖" width={32} height={32} />
            美食地圖
          </h1>

          {/* 主分類 filter — 單選 */}
          {categories.length > 0 && (
            <div className="mb-3">
              <p className="text-xs font-medium mb-2" style={{ color: "#C49A6C" }}>類型</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => {
                  const isActive = selectedCats.includes(cat);
                  return (
                    <button
                      key={cat}
                      onClick={() => toggleCat(cat)}
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
            </div>
          )}

          {/* 子分類 filter — 選了主分類才出現 */}
          {availableSubs.length > 0 && (
            <div className="mb-3 pl-3 border-l-2" style={{ borderColor: "#C49A6C" }}>
<div className="flex flex-wrap gap-2">
                {availableSubs.map((sub) => {
                  const isActive = selectedSubs.includes(sub);
                  return (
                    <button
                      key={sub}
                      onClick={() => toggleSub(sub)}
                      className="text-sm px-4 py-1.5 rounded-full border transition-all duration-150 font-medium"
                      style={{
                        backgroundColor: isActive ? "#A63F24" : "#FBF5EE",
                        borderColor: isActive ? "#A63F24" : "#C49A6C",
                        color: isActive ? "white" : "#A63F24",
                      }}
                    >
                      {sub}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 城市 filter */}
          {cities.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-medium mb-2" style={{ color: "#C49A6C" }}>城市</p>
              <div className="flex flex-wrap gap-2">
                {cities.map((city) => {
                  const isActive = selectedCities.includes(city);
                  return (
                    <button
                      key={city}
                      onClick={() => toggleCity(city)}
                      className="text-sm px-4 py-1.5 rounded-full border transition-all duration-150 font-medium"
                      style={{
                        backgroundColor: isActive ? "#E8A818" : "white",
                        borderColor: isActive ? "#E8A818" : "#e8d8c4",
                        color: isActive ? "#3a1e08" : "#6B4423",
                      }}
                    >
                      {city}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 已選取標籤 */}
          {hasFilter && (
            <div className="flex flex-wrap items-center gap-2 mb-6 pt-3 border-t" style={{ borderColor: "#e8d8c4" }}>
              <span className="text-xs" style={{ color: "#C49A6C" }}>已篩選：</span>
              {selectedCats.map((cat) => (
                <span
                  key={cat}
                  className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full font-medium"
                  style={{ backgroundColor: "#6B4423", color: "white" }}
                >
                  {cat}
                  <button onClick={() => toggleCat(cat)} className="ml-1 hover:opacity-70">✕</button>
                </span>
              ))}
              {selectedSubs.map((sub) => (
                <span
                  key={sub}
                  className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full font-medium"
                  style={{ backgroundColor: "#A63F24", color: "white" }}
                >
                  {sub}
                  <button onClick={() => toggleSub(sub)} className="ml-1 hover:opacity-70">✕</button>
                </span>
              ))}
              {selectedCities.map((city) => (
                <span
                  key={city}
                  className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full font-medium"
                  style={{ backgroundColor: "#E8A818", color: "#3a1e08" }}
                >
                  {city}
                  <button onClick={() => toggleCity(city)} className="ml-1 hover:opacity-70">✕</button>
                </span>
              ))}
              <button
                onClick={clearAll}
                className="text-xs underline hover:opacity-70"
                style={{ color: "#A63F24" }}
              >
                清除全部
              </button>
            </div>
          )}

          {/* 結果數量 */}
          {!loading && (
            <p className="text-xs mb-4" style={{ color: "#C49A6C" }}>
              共 {filtered.length} 間餐廳
            </p>
          )}

          {loading && <p style={{ color: "#C49A6C" }}>載入中⋯</p>}
          {error && <p style={{ color: "#A63F24" }}>載入失敗：{error}</p>}
          {!loading && filtered.length === 0 && (
            <p style={{ color: "#C49A6C" }}>沒有符合的餐廳。</p>
          )}

          {/* 餐廳卡片 */}
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
                  <div className="flex gap-1 shrink-0 ml-2 flex-wrap justify-end">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: "#F9F2E8", color: "#A63F24", border: "1px solid #e8d8c4" }}
                    >
                      {r.category}
                    </span>
                    {r.subcategory && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: "#fff0e0", color: "#A63F24", border: "1px solid #e8d8c4" }}
                      >
                        {r.subcategory}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-xs mb-2" style={{ color: "#C49A6C" }}>
                  <span className="inline-flex items-center gap-1">
                    <Image src="/location-pin.png" alt="location" width={12} height={12} />
                    {r.city}
                  </span>
                </p>
                {r.description && (
                  <p className="text-sm mb-3" style={{ color: "#888" }}>{r.description}</p>
                )}
                {r.address && (
                  <p className="text-xs mb-1" style={{ color: "#C49A6C" }}>{r.address}</p>
                )}
                {r.phone && (
                  <p className="text-xs mb-2" style={{ color: "#C49A6C" }}>📞 {r.phone}</p>
                )}
                {r.google_maps_url && (
                  <a
                    href={r.google_maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium hover:opacity-70 transition-opacity"
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