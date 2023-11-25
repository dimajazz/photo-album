from fastapi import APIRouter, Depends
from sqlalchemy.orm.session import Session

from db.database import get_db
from db import db_comment
from db.schemas import CommentBase, UserAuth
from auth.oauth2 import get_current_user


router = APIRouter(
    prefix='/comment',
    tags=['comment']
)


@router.get('/all/{post_id}')
def get_all_post_comments(post_id: int, db: Session = Depends(get_db)):
    return db_comment.get_all(post_id, db).all()


@router.post('/new')
def create_comment(
    request: CommentBase,
    db: Session = Depends(get_db),
    currnet_user: UserAuth = Depends(get_current_user)
):
    return db_comment.create(request, db)
