from typing import Union
from sqlmodel import Field, SQLModel

class UserBase(SQLModel):
    username: str

class User(UserBase, table=True):
    id: Union[int, None] = Field(default=None, primary_key=True)

class PostBase(SQLModel):
    userid: str
    post_text: str
    update_date: str

class Post(PostBase, table=True):
    id: Union[int, None] = Field(default=None, primary_key=True)

class PostCreate(PostBase):
    post_text: str

class PostUpdate(PostBase):
    post_text: str