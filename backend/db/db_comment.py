from sqlalchemy.orm.session import Session
from datetime import datetime

from db.models import DBComment
from db.schemas import CommentBase


def create(request: CommentBase, db: Session):
    new_comment = DBComment(
        username=request.username,
        text=request.text,
        post_id=request.post_id,
        timestamp=datetime.now()
    )
    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)
    return new_comment


def get_all(post_id: int, db: Session):
    return db.query(DBComment).filter(DBComment.post_id == post_id)
