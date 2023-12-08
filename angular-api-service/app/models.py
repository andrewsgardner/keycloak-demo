import uuid
from datetime import datetime
from sqlmodel import Field, SQLModel
from typing import Union, Optional

class UserBase(SQLModel):
    username: str

class User(UserBase, table=True):
    __tablename__: str = "users"

    id: uuid.UUID = Field(
        default_factory=uuid.uuid4,
        primary_key=True,
        index=True,
        nullable=False
    )

class PostBase(SQLModel):
    post_text: Optional[str]
    userid: Union[str, None] = None
    update_date: Union[datetime, None] = None

class Post(PostBase, table=True):
    __tablename__: str = "posts"
    
    id: uuid.UUID = Field(
        default_factory=uuid.uuid4,
        primary_key=True,
        index=True,
        nullable=False
    )

class PostCreate(PostBase):
    post_text: str

class PostUpdate(PostBase):
    post_text: str

class PostOut(PostBase):
    id: uuid.UUID