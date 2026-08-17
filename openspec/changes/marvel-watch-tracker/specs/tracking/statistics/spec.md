## Purpose
Aggregates user viewing history into actionable statistics and insights to gamify and encourage marathon completion.

## ADDED Requirements

### Requirement: Global Statistics Aggregation
The system SHALL aggregate the user's watch history to provide metrics including total hours watched, hours remaining, and counts of completed movies, series, and episodes.

#### Scenario: Viewing the statistics dashboard
- **WHEN** the user navigates to the statistics page
- **THEN** the system displays the total runtime of all completed content as "Hours Watched"

### Requirement: Viewing Insights
The system SHALL calculate and display personal insights such as the most watched universe, the year with the most watched releases, the most recurring character seen, and the most watched director.

#### Scenario: Displaying favorite universe
- **WHEN** the user has watched more MCU titles than Fox titles
- **THEN** the system highlights "MCU" as their most watched universe

### Requirement: Top Favorites Ranking
The system SHALL generate a ranking of the user's favorite titles based on their personal 5-star ratings.

#### Scenario: Generating top rated list
- **WHEN** the user has rated 5 movies with 5 stars
- **THEN** the system displays those movies at the top of their personal favorites ranking
