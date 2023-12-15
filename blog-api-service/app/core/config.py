import os
from typing import List, Dict, Any, Optional
from pydantic import AnyHttpUrl, PostgresDsn, BaseSettings, validator


class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    SERVER_HOST: AnyHttpUrl = os.getenv("SERVER_HOST")
    PROJECT_NAME: str = "Blog API Service"
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = [
        "http://localhost:4200",
        "http://localhost:2000"
    ]
    POSTGRES_SERVER: str = os.getenv("POSTGRES_SERVER")
    POSTGRES_USER: str = os.getenv("POSTGRES_USER")
    POSTGRES_PASSWORD: str = os.getenv("POSTGRES_PASSWORD")
    POSTGRES_DB: str = os.getenv("POSTGRES_DB")
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
    
    KC_URL: str = os.getenv("KC_URL")
    KC_CLIENT_ID: str = os.getenv("KC_CLIENT_ID")
    KC_REALM: str = os.getenv("KC_REALM")

settings = Settings()