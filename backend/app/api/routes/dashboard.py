from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schemas.dashboard import DashboardSummary
from app.db.session import get_db
from app.services.incident_service import IncidentService

router = APIRouter()
service = IncidentService()


@router.get("/summary", response_model=DashboardSummary)
def get_dashboard_summary(db: Session = Depends(get_db)) -> DashboardSummary:
    return DashboardSummary(**service.get_dashboard_summary(db))
