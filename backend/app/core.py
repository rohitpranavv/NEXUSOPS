from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    app_name: str = "NexusOps AI"
    database_url: str = "sqlite:///./nexusops.db"
    redis_url: str = "redis://localhost:6379/0"
    neo4j_uri: str = "bolt://localhost:7687"
    neo4j_user: str = "neo4j"
    neo4j_password: str = "nexusops"
    chroma_host: str = "localhost"
    chroma_port: int = 8001
    openai_api_key: str = ""
    jwt_secret: str = "change-me"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 120
    seed_admin_email: str = "admin@nexusops.app"
    seed_admin_password: str = "admin12345"
    cors_origins_raw: str | None = None
    cors_origin_regex: str | None = None

    @property
    def cors_origins(self) -> list[str]:
        if self.cors_origins_raw:
            return [origin.strip() for origin in self.cors_origins_raw.split(",") if origin.strip()]
        return ["http://localhost:5173", "http://127.0.0.1:5173"]


settings = Settings()
