from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.models.incident import Incident as IncidentModel
from app.schemas.incident import Incident, IncidentCreate
from app.schemas.incident import IncidentUpdate


class IncidentService:
    def list_incidents(self, db: Session) -> list[IncidentModel]:
        return list(db.scalars(select(IncidentModel).order_by(IncidentModel.created_at.desc())))

    def create_incident(self, db: Session, payload: IncidentCreate, owner_id: int | None) -> IncidentModel:
        incident = IncidentModel(**payload.model_dump(), owner_id=owner_id)
        db.add(incident)
        db.commit()
        db.refresh(incident)
        return incident

    def update_incident(self, db: Session, incident_id: int, payload: IncidentUpdate) -> IncidentModel | None:
        incident = db.get(IncidentModel, incident_id)
        if incident is None:
            return None

        for field, value in payload.model_dump(exclude_none=True).items():
            setattr(incident, field, value)

        db.commit()
        db.refresh(incident)
        return incident

    def get_dashboard_summary(self, db: Session) -> dict[str, int]:
        open_incidents = db.scalar(select(func.count()).select_from(IncidentModel).where(IncidentModel.status != "resolved")) or 0
        critical_services = (
            db.scalar(
                select(func.count(func.distinct(IncidentModel.service))).where(IncidentModel.severity == "critical")
            )
            or 0
        )
        active_alerts = db.scalar(select(func.count()).select_from(IncidentModel).where(IncidentModel.status == "investigating")) or 0
        knowledge_nodes = open_incidents * 9 + critical_services * 12 + 84
        return {
            "open_incidents": open_incidents,
            "critical_services": critical_services,
            "active_alerts": active_alerts,
            "knowledge_nodes": knowledge_nodes,
        }
