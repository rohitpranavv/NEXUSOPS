from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.auth import LoginRequest, UserCreate
from app.services.security import create_access_token, hash_password, verify_password


class AuthService:
    def register(self, db: Session, payload: UserCreate) -> User:
        existing = db.scalar(select(User).where(User.email == payload.email))
        if existing is not None:
            raise ValueError("A user with that email already exists.")

        user = User(
            email=payload.email,
            full_name=payload.full_name,
            role="operator",
            hashed_password=hash_password(payload.password),
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        return user

    def login(self, db: Session, payload: LoginRequest) -> str:
        user = db.scalar(select(User).where(User.email == payload.email))
        if user is None or not verify_password(payload.password, user.hashed_password):
            raise ValueError("Invalid credentials.")
        return create_access_token(str(user.id))
