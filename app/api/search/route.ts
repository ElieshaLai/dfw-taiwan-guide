// app/api/search/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim();
  if (!q || q.length < 1) return NextResponse.json({ results: [] });

  const [restaurants, community, directory, articles, events] = await Promise.all([
    // 餐廳
    supabase
      .from("restaurants")
      .select("id, name, category, city, description")
      .eq("is_published", true)
      .or(`name.ilike.%${q}%,description.ilike.%${q}%,city.ilike.%${q}%`)
      .limit(5),

    // 社群
    supabase
      .from("community")
      .select("id, name, category, description")
      .eq("is_published", true)
      .or(`name.ilike.%${q}%,description.ilike.%${q}%`)
      .limit(5),

    // 名片
    supabase
      .from("directory")
      .select("id, name, category, title, company")
      .eq("is_published", true)
      .or(`name.ilike.%${q}%,title.ilike.%${q}%,company.ilike.%${q}%`)
      .limit(5),

    // 活動
    supabase
      .from("events")
      .select("id, title, date, location, description")
      .eq("is_published", true)
      .or(`title.ilike.%${q}%,description.ilike.%${q}%,location.ilike.%${q}%`)
      .limit(5),

    // 文章
    fetch(
      `https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filter: { property: "Published", checkbox: { equals: true } },
        }),
        cache: "no-store",
      }
    ).then(r => r.json()),
  ]);

  // Filter articles by keyword
  const articlesData = articles as any;
  const filteredArticles = (articlesData.results || [])
    .filter((page: any) => {
      const title = page.properties.Title?.title[0]?.plain_text ?? "";
      const summary = page.properties.Summary?.rich_text[0]?.plain_text ?? "";
      return title.includes(q) || summary.includes(q);
    })
    .slice(0, 5)
    .map((page: any) => ({
      id: page.id,
      title: page.properties.Title?.title[0]?.plain_text ?? "",
      summary: page.properties.Summary?.rich_text[0]?.plain_text ?? "",
      slug: page.properties.Slug?.rich_text[0]?.plain_text ?? "",
      category: page.properties.Category?.select?.name ?? "",
    }));

  return NextResponse.json({
    results: {
      restaurants: restaurants.data || [],
      community: community.data || [],
      directory: directory.data || [],
      articles: filteredArticles,
      events: (events as any).data || [],
    },
  });
}