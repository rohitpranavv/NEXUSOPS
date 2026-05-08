from pydantic import BaseModel, Field


class SummaryRequest(BaseModel):
    text: str = Field(min_length=20, max_length=4000)


class SummaryResponse(BaseModel):
    summary: str
    provider: str

