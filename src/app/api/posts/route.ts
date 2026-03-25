import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { posts } from "@/lib/posts/schema";

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, excerpt, content, postType, pillar } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "title and content are required" },
        { status: 400 },
      );
    }

    const slug = uniqueSlug(slugify(title));

    const [post] = await db
      .insert(posts)
      .values({
        title,
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
