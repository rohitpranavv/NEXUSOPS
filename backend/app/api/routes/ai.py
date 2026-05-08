from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth.deps import get_current_user
from app.ai.client import AIClient
from app.db.session import get_db
from app.models.incident import Incident
from app.models.user import User
from app.schemas.ai import SummaryRequest, SummaryResponse

router = APIRouter()
client = AIClient()


@router.post("/summarize", response_model=SummaryResponse)
def summarize_text(payload: SummaryRequest, _: User = Depends(get_current_user)) -> SummaryResponse:
    summary, provider = client.summarize_incident(payload.text)
    return SummaryResponse(summary=summary, provider=provider)


@router.post("/incidents/{incident_id}/summarize", response_model=SummaryResponse)
def summarize_incident(incident_id: int, db: Session = Depends(get_db), _: User = Depends(get_current_user)) -> SummaryResponse:
    incident = db.get(Incident, incident_id)
    if incident is None:
        return SummaryResponse(summary="Incident not found.", provider="local-fallback")

    summary, provider = client.summarize_incident(f"{incident.title}\n\n{incident.summary}")
    incident.ai_summary = summary
    db.commit()
    db.refresh(incident)
    return SummaryResponse(summary=summary, provider=provider)
