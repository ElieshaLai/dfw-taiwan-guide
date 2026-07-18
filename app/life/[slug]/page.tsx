// app/life/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../../components/Navbar";
import { getArticleBySlug } from "../../../lib/notion";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const revalidate = 3600;

// 把 Notion block 轉成 HTML
function renderBlock(block: any): string {
  const text = (richText: any[]) =>
    richText?.map((t: any) => {
      let s = t.plain_text;
      if (t.annotations?.bold) s = `<strong>${s}</strong>`;
      if (t.annotations?.italic) s = `<em>${s}</em>`;
      if (t.annotations?.code) s = `<code>${s}</code>`;
      if (t.href) s = `<a href="${t.href}" target="_blank" rel="noopener noreferrer">${s}</a>`;
      return s;
    }).join("") ?? "";

  switch (block.type) {
    case "paragraph":
      return `<p>${text(block.paragraph.rich_text)}</p>`;
    case "heading_1":
      return `<h1>${text(block.heading_1.rich_text)}</h1>`;
    case "heading_2":
      return `<h2>${text(block.heading_2.rich_text)}</h2>`;
    case "heading_3":
      return `<h3>${text(block.heading_3.rich_text)}</h3>`;
    case "bulleted_list_item":
      return `<li>${text(block.bulleted_list_item.rich_text)}</li>`;
    case "numbered_list_item":
      return `<li>${text(block.numbered_list_item.rich_text)}</li>`;
    case "quote":
      return `<blockquote>${text(block.quote.rich_text)}</blockquote>`;
    case "divider":
      return `<hr />`;
    case "image":
      const url = block.image?.file?.url || block.image?.external?.url;
      return url ? `<img src="${url}" alt="" style="max-width:100%;border-radius:8px;margin:16px 0;" />` : "";
    default:
      return "";
  }
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);
  if (!article) notFound();

  const html = article.blocks.map(renderBlock).join("\n");

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
                <BreadcrumbLink render={<Link href="/life">新生活指南</Link>} />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage style={{ color: "#6B4423", fontWeight: 600 }}>{article.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="font-bold mb-3" style={{ color: "#6B4423", fontSize: "28px" }}>
            {article.title}
          </h1>
          {article.date && (
            <p className="text-xs mb-8" style={{ color: "#C49A6C" }}>{article.date}</p>
          )}

          {/* 文章內容 */}
          <div
            className="notion-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </main>

      <style>{`
        .notion-content p { margin-bottom: 1rem; line-height: 1.8; color: #444; }
        .notion-content h1 { font-size: 1.6rem; font-weight: 700; color: #6B4423; margin: 2rem 0 1rem; }
        .notion-content h2 { font-size: 1.3rem; font-weight: 700; color: #6B4423; margin: 1.8rem 0 0.8rem; }
        .notion-content h3 { font-size: 1.1rem; font-weight: 600; color: #6B4423; margin: 1.5rem 0 0.6rem; }
        .notion-content li { margin-bottom: 0.5rem; line-height: 1.7; color: #444; margin-left: 1.5rem; list-style: disc; }
        .notion-content blockquote { border-left: 3px solid #C49A6C; padding-left: 1rem; color: #888; font-style: italic; margin: 1.5rem 0; }
        .notion-content hr { border: none; border-top: 1px solid #e8d8c4; margin: 2rem 0; }
        .notion-content code { background: #f0e4d0; padding: 0.1rem 0.4rem; border-radius: 4px; font-size: 0.9em; color: #A63F24; }
        .notion-content a { color: #E8A818; text-decoration: underline; }
        .notion-content strong { font-weight: 700; color: #4a2010; }
      `}</style>
    </>
  );
}