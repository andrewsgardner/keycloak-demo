import os
from typing import List, Any, Optional, Union
from pydantic_settings import BaseSettings
from pydantic import AnyHttpUrl, PostgresDsn, field_validator, ValidationInfo
from app.core.tags import tags_metadata

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    SERVER_HOST: str = "localhost" # os.getenv("SERVER_HOST")
    SERVER_PORT: int = 9000
    PROJECT_TITLE: str = "Issue Tracker API Service"
    PROJECT_DESCRIPTION: str = "A FastAPI server for the Issue Tracker Client."
    PROJECT_VERSION: str = "1.0.0"
    PROJECT_TAGS: List = tags_metadata
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = [
        "http://localhost:3000",
        "http://localhost:4000"
    ]
    POSTGRES_SERVER: str = "localhost:5432" # os.getenv("POSTGRES_SERVER") - postgres-service
    POSTGRES_USER: str = "postgres" # os.getenv("POSTGRES_USER")
    POSTGRES_PASSWORD: str = "postgres" # os.getenv("POSTGRES_PASSWORD")
    POSTGRES_DB: str = "issue_tracker_data" #os.getenv("POSTGRES_DB")
    SQLALCHEMY_DATABASE_URI: Union[Optional[PostgresDsn], Optional[str]] = None

    @field_validator("SQLALCHEMY_DATABASE_URI", mode="after")
    def assemble_db_connection(cls, v: Optional[Union[PostgresDsn, str]], values: ValidationInfo) -> PostgresDsn:
        if isinstance(v, str):
            return v
        return PostgresDsn.build(
            scheme="postgresql+psycopg",
            username=values.data.get("POSTGRES_USER"),
            password=values.data.get("POSTGRES_PASSWORD"),
            host=values.data.get("POSTGRES_SERVER"),
            path=values.data.get("POSTGRES_DB")
        ).unicode_string()
    
    KC_SERVER_URL: str = "http://localhost:8080" # os.getenv("KC_SERVER_URL")
    KC_AUTH_URL: str = "http://localhost:8080" # os.getenv("KC_AUTH_URL")
    KC_TOKEN_URL: str = "http://localhost:8080" # os.getenv("KC_TOKEN_URL")
    KC_CLIENT_ID: str = "issue-tracker-api" # os.getenv("KC_CLIENT_ID")
    KC_REALM: str = "demo" # os.getenv("KC_REALM")

settings = Settings()