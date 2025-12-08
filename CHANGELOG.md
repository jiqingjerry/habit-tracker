# Changelog

All notable changes to the Habit Tracker project will be documented in this file.

## [Unreleased] - 2025-12-08

### Added
- **Project Setup**
  - Initialized FastAPI backend with Poetry for dependency management
  - Set up React frontend with Vite
  - Configured Docker Compose for PostgreSQL database (postgres:16-alpine)
  - Added CORS middleware to allow frontend requests from `http://localhost:5173`

- **Database Configuration**
  - Created `database.py` with SQLAlchemy engine, session management, and Base model
  - Implemented `get_db()` dependency for database session injection
  - Configured PostgreSQL connection with timezone support
  - Set up Alembic for database migrations
  - Created initial migration for activities table

- **Activity Model** (`app/models/activities.py`)
  - Created `Activity` model with fields:
    - `id`: Primary key with index
    - `name`: Required string field for activity name
    - `start_time`: Timezone-aware datetime (required)
    - `end_time`: Timezone-aware datetime (nullable)
  - Removed separate `date` field (date derived from start_time)
  - Uses plural table name convention (`activities`)

- **Activity Schemas** (`app/schemas/activity.py`)
  - Created `ActivityBase` with common fields
  - Created `ActivityCreate` for request validation
    - Enforces timezone-aware datetimes using `AwareDatetime`
    - Implements automatic UTC conversion via field validator
    - `end_time` is optional (defaults to None)
  - Created `ActivityResponse` for API responses
    - Includes `id` field from database
    - Configured with `from_attributes=True` for SQLAlchemy compatibility

- **API Endpoints**
  - Structured API with versioning (`/api/v1/`)
  - Created `api_router` to aggregate all v1 endpoints
  - Implemented POST `/api/v1/activities/` endpoint
    - Creates new activities with timezone handling
    - Returns 201 status code on success
    - Automatic OpenAPI documentation

- **Documentation**
  - Created README.md with setup instructions for backend and frontend
  - Added database migration commands
  - Documented pgcli connection instructions
  - Included common pgcli commands for database exploration

### Technical Decisions
- **Timezone Strategy**: Store all datetimes in UTC, accept timezone-aware input
- **Naming Conventions**:
  - Model files: plural (e.g., `activities.py`)
  - Model classes: singular (e.g., `Activity`)
  - Table names: plural (e.g., `activities`)
- **Schema Organization**: Separated Create and Response schemas for clean API contracts
- **API Structure**: Router aggregation pattern for scalable endpoint organization

### Testing
- Successfully created first activity via Swagger UI (`/docs`)
- Verified activity stored in PostgreSQL database with correct UTC conversion
- Test activity: "habit tracker project" from 11am-2pm PST

### Notes
- FastAPI automatic OpenAPI documentation available at `/docs` and `/redoc`
- Database migrations managed with Alembic
- Poetry handles Python dependency management
- Docker Compose provides isolated PostgreSQL instance
