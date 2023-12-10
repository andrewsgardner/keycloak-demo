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

class PostUpdate(PostBase):
    post_text: str

class PostOut(PostBase):
    id: uuid.UUID
    userid: Union[str, None]
    update_date: Union[datetime, None]