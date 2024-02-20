import os
from typing import List, Dict, Any, Optional
from pydantic import AnyHttpUrl, PostgresDsn, BaseSettings, validator

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    SERVER_HOST: AnyHttpUrl = "http://localhost:9000" # os.getenv("SERVER_HOST")
    PROJECT_NAME: str = "Issue Tracker API Service"
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = [
        "http://localhost:3000",
        "http://localhost:4000"
    ]
    POSTGRES_SERVER: str = "postgres-service:5432" # os.getenv("POSTGRES_SERVER")
    POSTGRES_USER: str = "postgres" # os.getenv("POSTGRES_USER")
    POSTGRES_PASSWORD: str = "postgres" # os.getenv("POSTGRES_PASSWORD")
    POSTGRES_DB: str = "issue_tracker_data" #os.getenv("POSTGRES_DB")
    SQLALCHEMY_DATABASE_URI: Optional[PostgresDsn] = None

    @validator("SQLALCHEMY_DATABASE_URI", pre=True)
    def assemble_db_connection(cls, v: Optional[str], values: Dict[str, Any]) -> Any:
        if isinstance(v, str):
            return v
        return PostgresDsn.build(
            scheme="postgresql+psycopg",
            user=values.get("POSTGRES_USER"),
            password=values.get("POSTGRES_PASSWORD"),
            host=values.get("POSTGRES_SERVER"),
            path=f"/{values.get('POSTGRES_DB') or ''}",
        )
    
    KC_SERVER_URL: str = "http://keycloak-service:8080" # os.getenv("KC_SERVER_URL")
    KC_AUTH_URL: str = "http://localhost:8080" # os.getenv("KC_AUTH_URL")
    KC_TOKEN_URL: str = "http://localhost:8080" # os.getenv("KC_TOKEN_URL")
    KC_CLIENT_ID: str = "issue-tracker-api" # os.getenv("KC_CLIENT_ID")
    KC_REALM: str = "demo" # os.getenv("KC_REALM")

settings = Settings()