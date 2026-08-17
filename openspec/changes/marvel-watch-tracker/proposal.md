## Why

Create a personal application to track a complete marathon of Marvel movies and series up to the release of *Avengers: Doomsday*. The application will help the user monitor their progress, find official streaming sources, view detailed information about titles and characters, and stay motivated with statistics and goals.

## What Changes

- Initialize a new Next.js 15+ project with TypeScript, React, Tailwind CSS, and shadcn/ui.
- Setup backend using Supabase Auth, Supabase Storage, PostgreSQL, Prisma ORM, and Next.js API Routes/Server Actions.
- Implement a comprehensive content catalog for Marvel movies, series, seasons, episodes, characters, and their relationships.
- Create a marathon tracking system to mark titles as watched (with support for individual episodes or entire seasons), add personal notes, and calculate completion percentages.
- Build a cinematic dashboard with countdown to *Avengers: Doomsday*, marathon progress, and "Continue Watching" recommendations.
- Implement a calendar planning tool and custom goal system to help the user stay on track.
- Integrate official streaming availability information (no illegal content) using an abstract provider interface (e.g., JustWatch).
- Add rich filtering, global search, and a visual timeline feature.

## Capabilities

### New Capabilities

- `core/catalog`: Management and display of Marvel movies, series, episodes, and characters, including importance classification and timeline order.
- `tracking/progress`: System to track user watched status, calculate percentages, determine the next title to watch, and manage personal notes.
- `tracking/planning`: Tools for setting custom marathon goals and generating a calendar plan based on available hours.
- `tracking/statistics`: Aggregation and visualization of user viewing stats (hours watched, favorite universes, etc.).
- `integrations/streaming`: Abstraction and integration for official streaming platform availability and YouTube trailers.
- `ui/dashboard`: The main cinematic dashboard and user interface layout for the marathon tracker.

### Modified Capabilities

- 

## Impact

- **New Application**: Sets up the entire foundation of the Marvel Watch Tracker from scratch.
- **Database Schema**: Introduces Prisma models for User, Title (Movies/Series), Episode, Character, UserProgress, Goal, etc.
- **External APIs**: Will require configuration for Supabase and potentially JustWatch API.
