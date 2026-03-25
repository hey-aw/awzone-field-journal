import { pgTable, text, timestamp, pgEnum, serial, index } from "drizzle-orm/pg-core";

export const postTypeEnum = pgEnum("post_type", [
  "lab-note",
  "build-log",
  "essay",
  "how-to",
  "open-question",
  "roundup",
]);

export const postPillarEnum = pgEnum("post_pillar", [
  "build-notes",
  "experiments",
  "field-reflections",
  "resources",
]);

export const postStatusEnum = pgEnum("post_status", ["draft", "published"]);

export const posts = pgTable(
  "posts",
  {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    excerpt: text("excerpt"),
    content: text("content").notNull().default(""),
    type: postTypeEnum("type").notNull().default("lab-note"),
    pillar: postPillarEnum("pillar").notNull().default("build-notes"),
    status: postStatusEnum("status").notNull().default("draft"),
    publishedAt: timestamp("published_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("posts_slug_idx").on(table.slug),
    index("posts_status_idx").on(table.status),
    index("posts_pillar_idx").on(table.pillar),
    index("posts_type_idx").on(table.type),
  ],
);
