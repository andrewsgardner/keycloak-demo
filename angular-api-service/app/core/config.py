from typing import List, Dict, Any, Optional
from pydantic import AnyHttpUrl, PostgresDsn, BaseSettings, validator


class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    SERVER_HOST: AnyHttpUrl = "http://localhost:8000"
    PROJECT_NAME: str = "Angular API Service"
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = []
    POSTGRES_SERVER: str = "localhost:5432"
    POSTGRES_USER: str = "postgres" # os.getenv('POSTGRES_USER')
    POSTGRES_PASSWORD: str = "postgres"
    POSTGRES_DB: str = "angular_data"
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

settings = Settings()