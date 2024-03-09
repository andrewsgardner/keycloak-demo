import os
from typing import List, Optional, Union
from pydantic_settings import BaseSettings
from pydantic import PostgresDsn, field_validator, ValidationInfo
from app.core.tags import tags_metadata


class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    SERVER_HOST: str = os.getenv("SERVER_HOST")
    SERVER_PORT: int = os.getenv("SERVER_PORT")
    PROJECT_TITLE: str = "Blog API Service"
    PROJECT_DESCRIPTION: str = "A FastAPI server for the Blog Client."
    PROJECT_VERSION: str = "1.0.0"
    PROJECT_TAGS: List = tags_metadata
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:4200",
        "http://localhost:2000"
    ]
    POSTGRES_SERVER: str = os.getenv("POSTGRES_SERVER") # Use localhost:5432 if running outside of a docker container
    POSTGRES_USER: str = os.getenv("POSTGRES_USER")
    POSTGRES_PASSWORD: str = os.getenv("POSTGRES_PASSWORD")
    POSTGRES_DB: str = os.getenv("POSTGRES_DB")
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
    
    KC_SERVER_URL: str = os.getenv("KC_SERVER_URL") # Use localhost if running outside of a docker container
    KC_AUTH_URL: str = os.getenv("KC_AUTH_URL")
    KC_TOKEN_URL: str = os.getenv("KC_TOKEN_URL")
    KC_CLIENT_ID: str = os.getenv("KC_CLIENT_ID")
    KC_REALM: str = os.getenv("KC_REALM")

settings = Settings()