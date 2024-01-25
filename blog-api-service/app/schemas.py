import uuid
from typing import Union, Optional, Generic, TypeVar, List
from pydantic import BaseModel, Field
from pydantic.generics import GenericModel
from datetime import datetime

class PostSchema(BaseModel):
    id: uuid.UUID
    userid: Union[str, None]
    post_text: Optional[str]
    create_date: datetime
    update_date: datetime

M = TypeVar('M')

class PaginatedResponse(GenericModel, Generic[M]):
    items: List[M] = Field(description="List of items")
    limit: int = Field(description="Page size limit")
    offset: int = Field(description="Page offset")
    total: int = Field(description="Total number of items")