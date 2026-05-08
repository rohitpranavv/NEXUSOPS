from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core import settings
from app.db.base import Base
from app.db.session import engine
from app.models import Incident, User
from app.services.security import hash_password


def init_db() -> None:
    Base.metadata.create_all(bind=engine)

    with Session(engine) as session:
        admin = session.scalar(select(User).where(User.email == settings.seed_admin_email))
        if admin is None:
            admin = User(
                email=settings.seed_admin_email,
                full_name="NexusOps Admin",
                role="admin",
                hashed_password=hash_password(settings.seed_admin_password),
            )
            session.add(admin)
            session.flush()

        incidents = session.scalar(select(Incident.id))
        if incidents is None:
            session.add_all(
                [
                    Incident(
                        title="API latency spike",
                        summary="Gateway latency exceeded SLO for the payments edge service.",
                        severity="high",
                        service="payments-edge",
                        status="open",
                        owner_id=admin.id,
                    ),
                    Incident(
                        title="Search index lag",
                        summary="Ingestion workers are behind, causing incomplete support search results.",
                        severity="medium",
                        service="search-ingestion",
                        status="investigating",
                        owner_id=admin.id,
                    ),
                ]
            )

        session.commit()
