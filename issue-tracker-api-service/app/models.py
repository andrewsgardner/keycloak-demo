import uuid
from pydantic import BaseModel
from sqlmodel import SQLModel, Field
from typing import List

class TokenUser(BaseModel):
    id: str
    username: str
    email: str
    first_name: str
    last_name: str
    realm_roles: List
    client_roles: List

class UserBase(SQLModel):
    username: str
    first_name: str
    last_name: str

class User(UserBase, table=True):
    __tablename__: str = "users"

    id: uuid.UUID = Field(
        default_factory=uuid.uuid4,
        primary_key=True,
        index=True,
        nullable=False
    )

class UserOut(UserBase):
    id: uuid.UUID