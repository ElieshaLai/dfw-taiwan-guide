// app/life/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { Article } from "../../lib/notion";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function LifePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/articles?category=${encodeURIComponent("新生活指南")}`)
      .then(r => r.json())
      .then(data => {
        setArticles(data);
        setLoading(false);
      });
  }, []);

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
                <BreadcrumbPage style={{ color: "#6B4423", fontWeight: 600 }}>新生活指南</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="font-bold mb-2" style={{ color: "#6B4423", fontSize: "24px" }}>
            📘 新生活指南
          </h1>
          <p className="text-sm mb-8" style={{ color: "#C49A6C" }}>
            銀行、駕照、保險、搬家流程⋯ 一次搞懂達拉斯生活
          </p>

          {loading && <p style={{ color: "#C49A6C" }}>載入中⋯</p>}
          {!loading && articles.length === 0 && (
            <p style={{ color: "#C49A6C" }}>文章準備中，敬請期待！</p>
          )}

          <div className="flex flex-col gap-4">
            {articles.map(a => (
              <Link key={a.id} href={`/life/${a.slug}`}
                className="p-5 rounded-xl transition-all duration-150 group"
                style={{ backgroundColor: "white", border: "1px solid #e8d8c4" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#C49A6C";
                  (e.currentTarget as HTMLElement).style.backgroundColor = "#fdf8f2";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#e8d8c4";
                  (e.currentTarget as HTMLElement).style.backgroundColor = "white";
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-bold mb-1 group-hover:text-amber-800 transition-colors"
                      style={{ color: "#6B4423", fontSize: "17px" }}>
                      {a.title}
                    </h2>
                    {a.summary && (
                      <p className="text-sm" style={{ color: "#888" }}>{a.summary}</p>
                    )}
                  </div>
                  <span className="text-xs shrink-0 mt-1 transition-transform group-hover:translate-x-1"
                    style={{ color: "#C49A6C" }}>→</span>
                </div>
                {a.date && (
                  <p className="text-xs mt-3" style={{ color: "#C49A6C" }}>{a.date}</p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}