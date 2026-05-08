from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field


Severity = Literal["low", "medium", "high", "critical"]
Status = Literal["open", "investigating", "resolved"]


class IncidentCreate(BaseModel):
    title: str = Field(min_length=3, max_length=120)
    summary: str = Field(min_length=10, max_length=500)
    severity: Severity
    service: str = Field(min_length=2, max_length=80)
    status: Status = "open"


class IncidentUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=3, max_length=120)
    summary: str | None = Field(default=None, min_length=10, max_length=500)
    severity: Severity | None = None
    service: str | None = Field(default=None, min_length=2, max_length=80)
    status: Status | None = None


class Incident(IncidentCreate):
    id: int
    ai_summary: str | None = None
    owner_id: int | None = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

