// app/search/page.tsx
"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import LocationPin from "../../components/LocationPin";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type Results = {
  restaurants: any[];
  community: any[];
  directory: any[];
  articles: any[];
  events: any[];
};

function SearchResults() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const [results, setResults] = useState<Results | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!q) return;
    setLoading(true);
    fetch(`/api/search?q=${encodeURIComponent(q)}`)
      .then(r => r.json())
      .then(data => {
        setResults(data.results);
        setLoading(false);
      });
  }, [q]);

  const total = results
    ? (results.restaurants?.length ?? 0) + (results.community?.length ?? 0) +
      (results.directory?.length ?? 0) + (results.articles?.length ?? 0) + (results.events?.length ?? 0)
    : 0;

  const cardStyle = { backgroundColor: "white", border: "1px solid #e8d8c4" };
  const hoverIn = (e: React.MouseEvent) => {
    (e.currentTarget as HTMLElement).style.borderColor = "#C49A6C";
    (e.currentTarget as HTMLElement).style.backgroundColor = "#fdf8f2";
  };
  const hoverOut = (e: React.MouseEvent) => {
    (e.currentTarget as HTMLElement).style.borderColor = "#e8d8c4";
    (e.currentTarget as HTMLElement).style.backgroundColor = "white";
  };

  return (
    <>
      <h1 className="font-bold mb-2" style={{ color: "#6B4423", fontSize: "22px" }}>
        搜尋：{q}
      </h1>

      {loading && <p style={{ color: "#C49A6C" }}>搜尋中⋯</p>}

      {!loading && results && (
        <p className="text-sm mb-8" style={{ color: "#C49A6C" }}>
          共找到 {total} 筆結果
        </p>
      )}

      {!loading && results && total === 0 && (
        <p style={{ color: "#C49A6C" }}>找不到「{q}」的相關結果。</p>
      )}

      {/* 文章 */}
      {(results?.articles?.length ?? 0) > 0 && (
        <section className="mb-8">
          <h2 className="font-semibold mb-3 text-sm" style={{ color: "#C49A6C" }}>📘 文章</h2>
          <div className="flex flex-col gap-3">
            {results!.articles.map(a => (
              <Link key={a.id} href={`/life/${a.slug}`}
                className="p-4 rounded-xl transition-all duration-150 group"
                style={cardStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
                <p className="font-semibold mb-1" style={{ color: "#6B4423" }}>{a.title}</p>
                {a.summary && <p className="text-sm" style={{ color: "#888" }}>{a.summary}</p>}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 活動 */}
      {(results?.events?.length ?? 0) > 0 && (
        <section className="mb-8">
          <h2 className="font-semibold mb-3 text-sm" style={{ color: "#C49A6C" }}>📅 活動</h2>
          <div className="flex flex-col gap-3">
            {results!.events.map(e => (
              <Link key={e.id} href="/events"
                className="p-4 rounded-xl transition-all duration-150"
                style={cardStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
                <p className="font-semibold mb-1" style={{ color: "#6B4423" }}>{e.title}</p>
                <div className="flex gap-3">
                  {e.date && <span className="text-xs" style={{ color: "#C49A6C" }}>📅 {e.date}</span>}
                  {e.location && <LocationPin text={e.location} className="text-xs" />}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 餐廳 */}
      {(results?.restaurants?.length ?? 0) > 0 && (
        <section className="mb-8">
          <h2 className="font-semibold mb-3 text-sm" style={{ color: "#C49A6C" }}>🍜 餐廳</h2>
          <div className="flex flex-col gap-3">
            {results!.restaurants.map(r => (
              <Link key={r.id} href="/restaurants"
                className="p-4 rounded-xl transition-all duration-150"
                style={cardStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold" style={{ color: "#6B4423" }}>{r.name}</p>
                  <span className="text-xs px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: "#F9F2E8", color: "#A63F24", border: "1px solid #e8d8c4" }}>
                    {r.category}
                  </span>
                </div>
                {r.city && <LocationPin text={r.city} className="text-xs" />}
                {r.description && <p className="text-sm mt-1" style={{ color: "#888" }}>{r.description}</p>}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 社群 */}
      {(results?.community?.length ?? 0) > 0 && (
        <section className="mb-8">
          <h2 className="font-semibold mb-3 text-sm" style={{ color: "#C49A6C" }}>🎉 社群</h2>
          <div className="flex flex-col gap-3">
            {results!.community.map(c => (
              <Link key={c.id} href="/community"
                className="p-4 rounded-xl transition-all duration-150"
                style={cardStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold" style={{ color: "#6B4423" }}>{c.name}</p>
                  <span className="text-xs px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: "#F9F2E8", color: "#A63F24", border: "1px solid #e8d8c4" }}>
                    {c.category}
                  </span>
                </div>
                {c.description && <p className="text-sm" style={{ color: "#888" }}>{c.description}</p>}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 名片 */}
      {(results?.directory?.length ?? 0) > 0 && (
        <section className="mb-8">
          <h2 className="font-semibold mb-3 text-sm" style={{ color: "#C49A6C" }}>📇 名片與推薦</h2>
          <div className="flex flex-col gap-3">
            {results!.directory.map(d => (
              <Link key={d.id} href="/directory"
                className="p-4 rounded-xl transition-all duration-150"
                style={cardStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold" style={{ color: "#6B4423" }}>{d.name}</p>
                  <span className="text-xs px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: "#F9F2E8", color: "#A63F24", border: "1px solid #e8d8c4" }}>
                    {d.category}
                  </span>
                </div>
                {d.title && <p className="text-sm" style={{ color: "#A63F24" }}>{d.title}</p>}
                {d.company && <p className="text-xs" style={{ color: "#C49A6C" }}>{d.company}</p>}
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default function SearchPage() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#FBF5EE", minHeight: "100vh", paddingTop: "140px" }}>
        <div className="max-w-3xl mx-auto px-6 py-10">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href="/">首頁</Link>} />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage style={{ color: "#6B4423", fontWeight: 600 }}>搜尋結果</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Suspense fallback={<p style={{ color: "#C49A6C" }}>載入中⋯</p>}>
            <SearchResults />
          </Suspense>
        </div>
      </main>
    </>
  );
}