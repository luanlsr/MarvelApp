## 1. Setup Project & Infrastructure

- [x] 1.1 Initialize Next.js 15+ App Router project with TypeScript and Tailwind CSS
- [x] 1.2 Install and configure shadcn/ui and Radix UI components
- [x] 1.3 Set up Supabase Auth and configure environment variables
- [x] 1.4 Install Prisma ORM and configure PostgreSQL connection

## 2. Data Modeling & Database Setup

- [x] 2.1 Design Prisma schema for User, Title (Movie/Series), Season, Episode, Character, and UserProgress
- [x] 2.2 Design Prisma schema for Goal and Tracking logic
- [x] 2.3 Generate Prisma client and run initial database migrations
- [x] 2.4 Create a seed script with foundational Marvel Phase 1-3 data to facilitate UI testing

## 3. Core Catalog Features

- [x] 3.1 Implement Server Actions for fetching the content catalog with filters and search
- [x] 3.2 Build the shared UI components: TitleCard, Poster, and Banner
- [x] 3.3 Create the `/catalogo` page with responsive grid and sidebar filters
- [x] 3.4 Build the title details page `/titulo/[slug]` displaying metadata, cast, and chronological context
- [x] 3.5 Build the character database and timeline views

## 4. Tracking System

- [x] 4.1 Implement Server Actions for updating user watch status and inserting personal notes/ratings
- [x] 4.2 Build the "Mark as Watched" and "Add Review" UI components for movies
- [x] 4.3 Build the Season/Episode list UI with individual and bulk watch buttons for series
- [x] 4.4 Implement server-side logic to dynamically calculate total marathon percentage and next recommended title

## 5. Planning & Goals

- [x] 5.1 Implement Server Actions for creating custom viewing goals
- [x] 5.2 Build the Marathon Calendar generator logic based on user hours/days availability
- [x] 5.3 Create the `/planejamento` page UI to display the generated schedule and track deviation

## 6. Dashboard & Insights

- [x] 6.1 Create the Home Dashboard UI with the cinematic hero section and *Avengers: Doomsday* countdown
- [x] 6.2 Integrate the Next Recommended Title component ("Continuar maratona") into the Dashboard
- [x] 6.3 Implement data aggregation logic for the statistics page
- [x] 6.4 Build the `/estatisticas` page UI to display hours watched, favorite universes, and top titles

## 7. Streaming & Integrations

- [x] 7.1 Define the `StreamingProvider` TypeScript interface for official availability lookups
- [x] 7.2 Implement a basic provider class for streaming links
- [x] 7.3 Build the "Onde Assistir" UI component for the title details page
- [x] 7.4 Integrate a YouTube iframe modal for playing official trailers without leaving the app
