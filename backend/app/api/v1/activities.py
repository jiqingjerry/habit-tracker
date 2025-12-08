from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.activity import ActivityCreate, ActivityResponse
from app.models.activities import Activity

router = APIRouter()


@router.post("/", response_model=ActivityResponse, status_code=status.HTTP_201_CREATED)
def create_activity(activity: ActivityCreate, db: Session = Depends(get_db)):
    """
    Create a new activity.

    - **name**: Activity name (required)
    - **start_time**: When activity started (timezone-aware, required)
    - **end_time**: When activity ended (timezone-aware, optional)
    """
    # Create SQLAlchemy model instance
    db_activity = Activity(
        name=activity.name, start_time=activity.start_time, end_time=activity.end_time
    )

    # Add to database
    db.add(db_activity)
    db.commit()
    db.refresh(db_activity)  # Get the generated ID

    return db_activity
