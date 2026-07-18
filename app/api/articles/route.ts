// app/api/articles/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getArticles } from "../../../lib/notion";

export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get("category") ?? undefined;
  const articles = await getArticles(category);
  return NextResponse.json(articles);
}