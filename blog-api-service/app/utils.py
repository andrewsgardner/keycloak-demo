from sqlalchemy import select, func, Select
from app.api.deps import SessionDep
from app.schemas import PaginatedResponse

def paginate(session: SessionDep, query: Select, limit: int, offset: int) -> dict[PaginatedResponse]:
    return {
        'items': [i for i in session.scalars(query.limit(limit).offset(offset))],
        'limit': limit,
        'offset': offset,
        'total': session.scalar(select(func.count()).select_from(query.subquery()))
    }
