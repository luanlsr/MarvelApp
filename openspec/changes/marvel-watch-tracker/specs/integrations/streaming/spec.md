## Purpose
Integrates with external sources to provide official streaming availability and trailers without hosting copyrighted video content or linking to illegal platforms.

## ADDED Requirements

### Requirement: Official Streaming Provider Abstraction
The system SHALL abstract streaming availability lookups behind an interface (e.g., `StreamingProvider`) that allows fetching official platforms (subscription, rental, purchase) for a given title.

#### Scenario: Looking up streaming availability
- **WHEN** the system requests availability for "Iron Man"
- **THEN** the provider abstraction returns platforms like Disney+ with their official links and pricing if applicable

### Requirement: Strict Anti-Piracy Compliance
The system SHALL NOT include, link to, or accept input for IPTV lists, torrents, or unauthorized streaming sites.

#### Scenario: Displaying watch options
- **WHEN** the user views the "Onde assistir" section
- **THEN** the system only displays links to official platforms (e.g., Disney+, Prime Video, Apple TV)

### Requirement: Official Trailer Integration
The system SHALL embed or link to official YouTube trailers for titles, opening them in an in-app modal when requested.

#### Scenario: Watching a trailer
- **WHEN** the user clicks "Assistir trailer" on a title
- **THEN** the system opens a modal playing the official YouTube video for that title
