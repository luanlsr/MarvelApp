## Purpose
Provides the central cinematic entry point for the user, summarizing their marathon status and directing them to their next action.

## ADDED Requirements

### Requirement: Cinematic Hero Section
The system SHALL present a hero section with a cinematic banner, a countdown to the *Avengers: Doomsday* release date, and the user's overarching marathon progress.

#### Scenario: Viewing the home dashboard
- **WHEN** the user navigates to the home page
- **THEN** they see the "Minha Jornada até Avengers: Doomsday" banner with a countdown timer

### Requirement: Quick Continue Action
The system SHALL surface a primary action button linked to the immediately next recommended title based on the user's progress.

#### Scenario: Clicking continue marathon
- **WHEN** the user has a recommended next title (e.g., Loki Season 2)
- **THEN** the dashboard displays a prominent "Continuar maratona" button that takes them to that title's details or play options

### Requirement: Summary Metrics Display
The system SHALL display quick summary metrics on the dashboard, including total productions completed, percentage complete, and total hours watched.

#### Scenario: Checking quick stats
- **WHEN** the user looks at the hero section
- **THEN** they see text indicating "73 / 126 produções concluídas", "58%", and "Você já assistiu 124h 32min"
