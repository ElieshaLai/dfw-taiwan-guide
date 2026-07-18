// app/api/articles/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getArticleBySlug } from "../../../../lib/notion";

export async function GET(_: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return NextResponse.json(null, { status: 404 });
  return NextResponse.json(article);
}