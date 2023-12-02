import uuid
from datetime import datetime
from sqlmodel import Field, SQLModel

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
    userid: str
    post_text: str
    update_date: datetime

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