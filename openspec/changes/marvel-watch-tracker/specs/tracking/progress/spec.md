## Purpose
Enables users to mark their viewing status, add personal notes, and track their marathon progress down to the episode level.

## ADDED Requirements

### Requirement: Title Watch Status Management
The system SHALL allow users to mark movies or individual episodes with statuses: Não assistido, Assistindo, Concluído, Reassistir, or Ignorado.

#### Scenario: Marking a movie as watched
- **WHEN** the user clicks "Marcar como assistido" on a movie
- **THEN** the system updates its status to "Concluído" and records the watch date

### Requirement: Bulk Watch Status Update
The system SHALL provide bulk actions to mark entire seasons or series as watched.

#### Scenario: Marking a season as watched
- **WHEN** the user clicks "Marcar temporada completa"
- **THEN** the system marks all episodes in that season as "Concluído"

### Requirement: Progress Calculation
The system SHALL calculate the completion percentage of the marathon, accounting for movies (0% or 100%) and series (proportional to episodes watched).

#### Scenario: Viewing series progress
- **WHEN** the user has watched 4 out of 6 episodes of Loki Season 1
- **THEN** the system displays a 66% progress bar for that season

### Requirement: Personal Notes and Ratings
The system SHALL allow users to add personal 5-star ratings and text comments to any title they have watched.

#### Scenario: Adding a review
- **WHEN** the user submits a 5-star rating and a text review for a completed movie
- **THEN** the system saves the note and displays it on the user's view of the title details

### Requirement: Next Title Recommendation
The system SHALL identify the last watched title and automatically recommend the immediate next title in the marathon order.

#### Scenario: Continuing the marathon
- **WHEN** the user finishes watching "Deadpool 2"
- **THEN** the system recommends "Deadpool & Wolverine" in the "Continue daqui" section
