# AWZone Field Journal

A personal lab notebook for public work — experiments in progress, notes from building, working theories, small demos, and reflections on what worked, what failed, and what changed my mind.

Built on **Next.js**, **Neon Postgres**, **Drizzle ORM**, **better-auth**, **Tailwind CSS**, and **shadcn/ui**.

## What this is

This site does four jobs at once:

1. **Thinking tool** — a place to clarify ideas by writing them down
2. **Public trail of work** — evidence of what I'm making, testing, and learning
3. **Connection surface** — lets collaborators, clients, and curious peers understand how I think
4. **Asset engine** — posts can later become workshops, proposals, talks, or landing page copy

## Site structure

| Route | Purpose |
|-------|---------|
| `/` | Home — positioning, recent notes, current focus |
| `/notes` | Reverse-chronological feed of all posts |
| `/experiments` | Ongoing projects and active experiments |
| `/projects` | Current and recent builds with status |
| `/about` | Who I am and what kinds of conversations fit |
| `/now` | What I'm focused on right now |

## Content pillars

- **Build notes** — What I'm making right now
- **Experiments** — Small tests with a question behind them
- **Field reflections** — What I'm noticing in work, teaching, and product strategy
- **Resources & playbooks** — Useful, reusable pieces

## Post types

- **Lab note** — Short, frequent. What I tried, what happened, what changed.
- **Build log** — Progress report on a project over time.
- **Essay** — Longer post developing a real argument or perspective.
- **How-to** — Practical walkthrough for a specific problem.
- **Open question** — A post centered on something I don't yet know.
- **Roundup** — What I learned this month, what I'm exploring, what's worth sharing.

## Database schema

Posts are stored in Neon Postgres via Drizzle ORM.

**`posts` table** — `src/lib/posts/schema.ts`
- `type`: `lab-note | build-log | essay | how-to | open-question | roundup`
- `pillar`: `build-notes | experiments | field-reflections | resources`
- `status`: `draft | published`

## Local setup

### Install dependencies

```bash
npm install
```

### Environment variables

```bash
cp .env.example .env
```

Set in `.env`:

```
DATABASE_URL=<postgres://user:pass@host/db>
BETTER_AUTH_SECRET=<openssl rand -base64 32>
BETTER_AUTH_URL=http://localhost:3000
```

### Run migrations

```bash
npm run db:generate
npm run db:migrate
```

### Start dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Database scripts

```bash
npm run db:generate   # Generate migration files from schema
npm run db:migrate    # Apply migrations
npm run db:studio     # Open Drizzle Studio (visual DB browser)
```

## Tech stack

- [Next.js](https://nextjs.org/) — React framework
- [Neon](https://neon.tech/) — Serverless Postgres
- [Drizzle ORM](https://orm.drizzle.team/) — Type-safe database queries
- [better-auth](https://www.better-auth.com/) — Authentication
- [Tailwind CSS](https://tailwindcss.com/) — Styling
- [shadcn/ui](https://ui.shadcn.com/) — UI components
