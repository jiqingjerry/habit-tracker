from pydantic import BaseModel, field_validator, AwareDatetime
from datetime import datetime, timezone


class ActivityBase(BaseModel):
    name: str


class ActivityCreate(ActivityBase):
    start_time: AwareDatetime
    end_time: AwareDatetime | None = None

    @field_validator("start_time", "end_time")
    @classmethod
    def convert_to_utc(cls, v: datetime | None) -> datetime | None:
        if v is not None:
            return v.astimezone(timezone.utc)
        return v


class ActivityResponse(ActivityBase):
    id: int
    start_time: datetime
    end_time: datetime | None

    model_config = {"from_attributes": True}
