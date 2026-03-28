import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { posts } from "@/lib/posts/schema";
import { desc, eq } from "drizzle-orm";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

function uniqueSlug(base: string): string {
  const suffix = Date.now().toString(36);
  return `${base}-${suffix}`;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") ?? "draft";

    const results = await db
      .select({
        id: posts.id,
        title: posts.title,
        slug: posts.slug,
        excerpt: posts.excerpt,
        content: posts.content,
        type: posts.type,
        pillar: posts.pillar,
        status: posts.status,
        createdAt: posts.createdAt,
      })
      .from(posts)
      .where(eq(posts.status, status as "draft" | "published"))
      .orderBy(desc(posts.createdAt));

    return NextResponse.json(results);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch posts";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, excerpt, content, postType, pillar } = body;

    if (!content) {
      return NextResponse.json(
        { error: "content is required" },
        { status: 400 },
      );
    }

    const effectiveTitle = title?.trim() || "Untitled capture";
    const slug = uniqueSlug(slugify(effectiveTitle));

    const [post] = await db
      .insert(posts)
      .values({
        title: effectiveTitle,
        slug,
        excerpt: excerpt ?? null,
        content,
        type: postType ?? "lab-note",
        pillar: pillar ?? "build-notes",
        status: "draft",
      })
      .returning({ id: posts.id, slug: posts.slug });

    return NextResponse.json({ id: post.id, slug: post.slug }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to save post";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
