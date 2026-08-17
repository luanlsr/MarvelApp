## Context

See proposal.md for motivation. This new application is built from scratch utilizing modern full-stack web technologies: Next.js 15+ (App Router), React, TypeScript, Tailwind CSS, shadcn/ui, Supabase (Auth, Storage, Postgres), and Prisma ORM. It requires robust relational data modeling for content (movies/series/episodes), user tracking (progress, ratings), and planning logic (goals).

## Goals / Non-Goals

**Goals:**
- Design a scalable PostgreSQL database schema that captures complex relationships between Marvel entities (universes, series, seasons, episodes, characters).
- Define a component-driven architecture using Next.js Server Components for SEO and fast loading, and Client Components for interactivity.
- Establish a pattern for updating user progress and recalculating overall marathon percentages efficiently.
- Integrate external provider abstractions for streaming availability lookups.

**Non-Goals:**
- Implementing actual video hosting, piracy scraping, or illegal video players.
- Supporting multiple languages/i18n in the initial version.
- Handling social/community features (sharing profiles or leaderboards), as this is a personal tracker.

## Decisions

### 1. Database Schema (Prisma)
- **Decision:** Use Prisma with PostgreSQL to model the catalog and user progress.
- **Rationale:** Prisma provides excellent type-safety with TypeScript. Modeling hierarchical content (Series -> Season -> Episode) requires relational integrity. User tracking will be stored in a `UserProgress` table linking a `User` to a `ContentItem` (which could be a Movie or an Episode).
- **Alternatives:** NoSQL (e.g., MongoDB). Rejected because the relationships between characters, universes, movies, and episodes are highly relational and structured.

### 2. State Management & Data Fetching
- **Decision:** Use Next.js App Router (Server Components & Server Actions) combined with TanStack Query for client-side state fetching.
- **Rationale:** Server components provide fast initial load times and secure database access directly from the server. Server Actions enable seamless form submissions (e.g., marking an item as watched). TanStack Query handles complex client-side caching and optimistic UI updates for progress bars.
- **Alternatives:** Redux or Zustand. Rejected because Server Actions + TanStack Query is cleaner for server-state synchronization in Next.js 15.

### 3. Streaming Provider Interface
- **Decision:** Create an abstract `StreamingProvider` interface in TypeScript. Implement a stub or JustWatch API wrapper.
- **Rationale:** The application must only point to official sources. An abstract interface (`search(title)`, `getAvailability(title)`) ensures the provider can be swapped later without breaking the UI.
- **Alternatives:** Hardcoding links. Rejected because streaming rights frequently change.

### 4. Progress Calculation
- **Decision:** Compute total progress dynamically on the server and cache the result. Series completion is calculated by checking the ratio of watched episodes to total episodes.
- **Rationale:** Doing this on the client would require downloading the entire catalog and user history. Server-side computation is more efficient.

## Risks / Trade-offs

- **Risk: Next.js App Router Caching Stale Data**
  → *Mitigation:* Carefully configure Next.js cache revalidation tags (e.g., `revalidateTag('user-progress')`) when a Server Action successfully updates a watch status.
- **Risk: Complex Seed Data Maintenance**
  → *Mitigation:* Create a robust seeder script (e.g., parsing a JSON file or TMDB/JustWatch data dump) to initialize the Marvel catalog, ensuring accurate order, phases, and episode counts.
- **Risk: JustWatch API Limitations**
  → *Mitigation:* If the official JustWatch API requires a commercial license, fall back to TMDB API (which provides JustWatch data under their terms) or a manually curated official links dataset.
