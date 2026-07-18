// lib/notion.ts
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const databaseId = process.env.NOTION_DATABASE_ID!;

export type Article = {
  id: string;
  title: string;
  category: string;
  slug: string;
  summary: string;
  date: string;
};

// 抓文章列表
export async function getArticles(category?: string): Promise<Article[]> {
  const filter: any = category
    ? {
        and: [
          { property: "Published", checkbox: { equals: true } },
          { property: "Category", select: { equals: category } },
        ],
      }
    : { property: "Published", checkbox: { equals: true } };

  const response = await fetch(
    `https://api.notion.com/v1/databases/${databaseId}/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filter,
        sorts: [{ property: "Date", direction: "descending" }],
      }),
      next: { revalidate: 3600 },
    }
  );

  const data = await response.json();
  console.log("Notion response:", JSON.stringify(data).slice(0, 500));

  return (data.results || []).map((page: any) => ({
    id: page.id,
    title: page.properties.Title?.title[0]?.plain_text ?? "",
    category: page.properties.Category?.select?.name ?? "",
    slug: page.properties.Slug?.rich_text[0]?.plain_text ?? "",
    summary: page.properties.Summary?.rich_text[0]?.plain_text ?? "",
    date: page.properties.Date?.date?.start ?? "",
  }));
}

// 抓單篇文章（by slug）
export async function getArticleBySlug(slug: string) {
  console.log("getArticleBySlug called with slug:", slug);
  const response = await fetch(
    `https://api.notion.com/v1/databases/${databaseId}/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filter: {
          and: [
            { property: "Slug", rich_text: { equals: slug } },
            { property: "Published", checkbox: { equals: true } },
          ],
        },
      }),
      next: { revalidate: 3600 },
    }
  );

  const data = await response.json();
  console.log("slug query result:", JSON.stringify(data).slice(0, 300));
  if (!data.results || data.results.length === 0) return null;

  const page = data.results[0];

  // 抓文章 blocks
  const blocksRes = await fetch(
    `https://api.notion.com/v1/blocks/${page.id}/children`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
        "Notion-Version": "2022-06-28",
      },
      next: { revalidate: 3600 },
    }
  );

  const blocksData = await blocksRes.json();

  return {
    id: page.id,
    title: page.properties.Title?.title[0]?.plain_text ?? "",
    category: page.properties.Category?.select?.name ?? "",
    slug: page.properties.Slug?.rich_text[0]?.plain_text ?? "",
    summary: page.properties.Summary?.rich_text[0]?.plain_text ?? "",
    date: page.properties.Date?.date?.start ?? "",
    blocks: blocksData.results || [],
  };
}