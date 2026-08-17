## Purpose
Provides the foundational catalog of Marvel content including movies, series, episodes, and characters, serving as the source of truth for the application.

## ADDED Requirements

### Requirement: Title Information Display
The system SHALL display comprehensive metadata for each title, including poster, banner, original title, type (movie/series), year, universe, phase, and importance for Avengers: Doomsday.

#### Scenario: Viewing a title's details
- **WHEN** the user navigates to a title's detail page
- **THEN** the system displays the title's metadata, synopsis, cast, timeline order, and relationship to other productions

### Requirement: Series and Episode Structure
The system SHALL hierarchically structure series into seasons and episodes, providing individual metadata (number, title, duration, thumbnail) for each episode.

#### Scenario: Browsing a series
- **WHEN** the user views a series details page
- **THEN** the system lists all seasons and their respective episodes

### Requirement: Importance Classification
The system SHALL classify each title with an importance level (ESSENCIAL, MUITO IMPORTANTE, RECOMENDADO, COMPLEMENTAR, OPCIONAL) to guide the marathon.

#### Scenario: Filtering catalog by importance
- **WHEN** the user filters the catalog by "Essencial"
- **THEN** the system displays only titles marked with the "ESSENCIAL" importance level

### Requirement: Character Database
The system SHALL maintain a database of key Marvel characters with their names, images, descriptions, and related titles.

#### Scenario: Exploring characters
- **WHEN** the user navigates to the characters page
- **THEN** the system displays a grid of characters, and clicking one reveals the titles they appear in

### Requirement: Content Timeline
The system SHALL provide a visual timeline of all Marvel content, supporting recommended, chronological, and release orders.

#### Scenario: Viewing the timeline in chronological order
- **WHEN** the user selects the "Ordem cronológica" option on the timeline page
- **THEN** the system reorders and displays the connected cards chronologically based on in-universe events
