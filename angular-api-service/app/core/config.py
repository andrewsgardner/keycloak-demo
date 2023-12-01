from typing import List
from pydantic import AnyHttpUrl
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    SERVER_HOST: AnyHttpUrl = "http://localhost:8000"
    PROJECT_NAME: str = "Angular API Service"
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = []
    POSTGRES_SERVER: str = "postgresql://localhost:5432"
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = "postgres"
    POSTGRES_DB: str = "angular_data"

settings = Settings()