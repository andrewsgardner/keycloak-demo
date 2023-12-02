from typing import Union
from datetime import datetime
from sqlmodel import Field, SQLModel
from uuid import UUID
class UserBase(SQLModel):
    username: str

class User(UserBase, table=True):
    __tablename__: str = "users"
    id: Union[UUID, None] = Field(default=None, primary_key=True, nullable=False)

class PostBase(SQLModel):
    userid: str
    post_text: str
    update_date: datetime

class Post(PostBase, table=True):
    __tablename__: str = "posts"
    id: Union[UUID, None] = Field(default=None, primary_key=True, nullable=False)

class PostCreate(PostBase):
    post_text: str

class PostUpdate(PostBase):
    post_text: str

class PostOut(PostBase):
    id: UUID