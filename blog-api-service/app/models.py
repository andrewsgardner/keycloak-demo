import uuid
from datetime import datetime
from sqlmodel import Field, SQLModel
from pydantic import BaseModel
from typing import Union, Optional

class User(BaseModel):
    id: str
    username: str
    email: str
    first_name: str
    last_name: str
    realm_roles: list
    client_roles: list

class authConfiguration(BaseModel):
    server_url: str
    realm: str
    client_id: str
    client_secret: str
    authorization_url: str
    token_url: str

class PostBase(SQLModel):
    post_text: Optional[str]

class Post(PostBase, table=True):
    __tablename__: str = "posts"
    
    id: uuid.UUID = Field(
        default_factory=uuid.uuid4,
        primary_key=True,
        index=True,
        nullable=False
    )
    userid: Union[str, None] = Field(
        index=True,
    )
    update_date: Union[datetime, None] = Field(
        default_factory=datetime.utcnow,
        index=True
    )

class PostCreate(PostBase):
    post_text: str
    userid: str

class PostUpdate(PostBase):
    post_text: str

class PostOut(PostBase):
    id: uuid.UUID
    userid: Union[str, None]
    update_date: Union[datetime, None]