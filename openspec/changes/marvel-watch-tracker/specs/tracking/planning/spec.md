## Purpose
Provides tools to help users set custom viewing goals and automatically generate a marathon schedule based on their availability.

## ADDED Requirements

### Requirement: Marathon Calendar Generation
The system SHALL calculate an estimated completion date and generate a weekly calendar schedule based on the user's available days and hours per week.

#### Scenario: Generating a marathon schedule
- **WHEN** the user inputs their start date and availability (e.g., 5 hours/week on Mondays and Wednesdays)
- **THEN** the system generates a schedule mapping specific movies and episodes to specific days

### Requirement: Custom Viewing Goals
The system SHALL allow users to define custom goals (e.g., "Watch 3 movies per week") and track progress against them.

#### Scenario: Tracking a weekly goal
- **WHEN** the user creates a goal to watch 3 movies per week and marks 2 movies as watched
- **THEN** the system displays a dashboard indicator showing 66% completion for that goal

### Requirement: Schedule Deviation Tracking
The system SHALL determine if the user is ahead of or behind their generated marathon schedule.

#### Scenario: Showing schedule status
- **WHEN** the user has watched fewer titles than planned by the current date
- **THEN** the system displays a warning indicating they are X days behind schedule
