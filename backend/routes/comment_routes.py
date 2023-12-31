from fastapi import APIRouter, Depends
from sqlalchemy.orm.session import Session

from db.database import get_db
from db import db_comment, db_like
from db.schemas import CommentBase, UserAuth, Comment
from auth.oauth2 import get_current_user


router = APIRouter(
    prefix='/comment',
    tags=['comment']
)


@router.get('/all/{post_id}', response_model=list[Comment])
def get_all_post_comments(post_id: int, db: Session = Depends(get_db)):
    return db_comment.get_all(post_id, db).all()


@router.post('/new')
def create_comment(
    request: CommentBase,
    db: Session = Depends(get_db),
    currnet_user: UserAuth = Depends(get_current_user)
):
    return db_comment.create(request, db)


@router.post('/{comment_id}/like')
def toggle_post_like(
    comment_id: int,
    current_user: UserAuth = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return db_like.toggle_like_on_target(comment_id, current_user.id, 'comment', db)
