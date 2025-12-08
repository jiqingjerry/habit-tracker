# Habit Tracker

I wanted to create something that is useful for me while having fun learning about new tech stacks and frameworks.

A full-stack habit tracking application built with FastAPI and React.

## Project Structure

```
habit-tracker/
├── backend/          # FastAPI backend
│   ├── app/
│   │   ├── main.py   # FastAPI application entry point
│   │   └── config.py # Configuration settings
│   └── pyproject.toml # Poetry dependencies
└── frontend/         # React frontend (Vite)
    └── src/
```

## Backend Setup (FastAPI + Poetry)

### Prerequisites
- Python 3.10+
- Poetry

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies with Poetry:
```bash
poetry install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

### Running the Backend

Start the development server:
```bash
poetry run uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`
- API Documentation: `http://localhost:8000/docs`
- Alternative docs: `http://localhost:8000/redoc`

### Database Migrations

Run migrations:
```bash
poetry run alembic upgrade head
```

Create a new migration:
```bash
poetry run alembic revision --autogenerate -m "description"
```

### Connecting to PostgreSQL with pgcli

Connect to the database:
```bash
pgcli postgresql://user:password@localhost:5432/habit_tracker
```

Or if you have environment variables set in `.env`:
```bash
# Extract connection details from your .env file
pgcli postgresql://[username]:[password]@[host]:[port]/[database_name]
```

Common pgcli commands:
- `\dt` - List all tables
- `\d table_name` - Describe table structure
- `SELECT * FROM activities;` - Query activities
- `\q` - Quit pgcli

## Frontend Setup (React + Vite)

### Prerequisites
- Node.js 18+
- npm

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

### Running the Frontend

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Development

### Backend
- The backend uses Poetry for dependency management
- FastAPI provides automatic API documentation
- CORS is configured to allow requests from the frontend

### Frontend
- Built with Vite for fast development
- React 18 with modern hooks

## Next Steps

- Add database models and migrations
- Create habit CRUD endpoints
- Build habit tracking UI components
- Add user authentication
- Implement habit streaks and statistics
