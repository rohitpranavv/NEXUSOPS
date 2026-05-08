from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.auth.deps import get_current_user
from app.db.session import get_db
from app.models.user import User
from app.schemas.incident import Incident, IncidentCreate, IncidentUpdate
from app.services.incident_service import IncidentService

router = APIRouter()
service = IncidentService()


@router.get("", response_model=list[Incident])
def list_incidents(db: Session = Depends(get_db), _: User = Depends(get_current_user)) -> list[Incident]:
    return [Incident.model_validate(item) for item in service.list_incidents(db)]


@router.post("", response_model=Incident, status_code=status.HTTP_201_CREATED)
def create_incident(
    payload: IncidentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Incident:
    return Incident.model_validate(service.create_incident(db, payload, current_user.id))


@router.patch("/{incident_id}", response_model=Incident)
def update_incident(
    incident_id: int,
    payload: IncidentUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
) -> Incident:
    incident = service.update_incident(db, incident_id, payload)
    if incident is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Incident not found.")
    return Incident.model_validate(incident)
