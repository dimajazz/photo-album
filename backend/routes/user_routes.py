from fastapi import APIRouter, Depends
from sqlalchemy.orm.session import Session

from db.schemas import UserBase, UserDisplay
from db.database import get_db
from db.db_user import create_user

router = APIRouter(
    prefix='/user',
    tags=['user']
)


@router.post('/new', response_model=UserDisplay)
def create_new_user(request: UserBase, db: Session = Depends(get_db)):
    return create_user(db, request)
