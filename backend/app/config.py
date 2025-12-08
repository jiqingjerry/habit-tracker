from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "Habit Tracker API"
    debug: bool = True
    database_url: str = "postgresql://postgres:changeme@localhost:5432/habit_tracker"

    class Config:
        env_file = ".env"


settings = Settings()
