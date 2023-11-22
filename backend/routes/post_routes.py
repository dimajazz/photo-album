from fastapi import APIRouter, Depends, status
from fastapi.exceptions import HTTPException
from sqlalchemy.orm.session import Session

from db.schemas import PostBase, PostDisplay
from db.database import get_db
from db import db_post


router = APIRouter(
    prefix='/post',
    tags=['post']
)

image_url_types = ['relative', 'absolute']


@router.post('/new', response_model=PostDisplay)
def create_post(request: PostBase, db: Session = Depends(get_db)):
    if not request.image_url_type in image_url_types:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail='An image url type can be only relative or absolute'
        )
    return db_post.create_new_post(request, db)
