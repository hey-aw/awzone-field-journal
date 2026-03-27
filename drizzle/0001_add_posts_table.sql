CREATE TYPE "public"."post_type" AS ENUM('lab-note', 'build-log', 'essay', 'how-to', 'open-question', 'roundup');--> statement-breakpoint
CREATE TYPE "public"."post_pillar" AS ENUM('build-notes', 'experiments', 'field-reflections', 'resources');--> statement-breakpoint
CREATE TYPE "public"."post_status" AS ENUM('draft', 'published');--> statement-breakpoint
CREATE TABLE "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"excerpt" text,
	"content" text DEFAULT '' NOT NULL,
	"type" "post_type" DEFAULT 'lab-note' NOT NULL,
	"pillar" "post_pillar" DEFAULT 'build-notes' NOT NULL,
	"status" "post_status" DEFAULT 'draft' NOT NULL,
	"published_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "posts_slug_unique" UNIQUE("slug")
);--> statement-breakpoint
CREATE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "posts_status_idx" ON "posts" USING btree ("status");--> statement-breakpoint
CREATE INDEX "posts_pillar_idx" ON "posts" USING btree ("pillar");--> statement-breakpoint
CREATE INDEX "posts_type_idx" ON "posts" USING btree ("type");
