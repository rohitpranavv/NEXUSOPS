from pydantic import BaseModel


class DashboardSummary(BaseModel):
    open_incidents: int
    critical_services: int
    active_alerts: int
    knowledge_nodes: int

