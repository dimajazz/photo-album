from sqlalchemy.orm.session import Session
from fastapi import HTTPException, status

from db.models import DBPostLike, DBCommentLike


ALLOWED_LIKE_TYPES = ['post', 'comment']


def toggle_like_on_target(target_id: int, user_id: int, target_type: str, db: Session):
    if target_type in ALLOWED_LIKE_TYPES:
        if target_type == 'post':
            like = db.query(DBPostLike).filter(DBPostLike.post_id == target_id).filter(
                DBPostLike.user_id == user_id).first()
        elif target_type == 'comment':
            like = db.query(DBCommentLike).filter(DBCommentLike.comment_id == target_id).filter(
                DBCommentLike.user_id == user_id).first()

        if like:
            db.delete(like)
            db.commit()
            return 'The user with id {user_id} canceled his like'
        else:
            if target_type == 'post':
                new_like = DBPostLike(
                    user_id=user_id,
                    post_id=target_id
                )
            elif target_type == 'comment':
                new_like = DBCommentLike(
                    user_id=user_id,
                    comment_id=target_id
                )
            db.add(new_like)
            db.commit()
            db.refresh(new_like)
            return new_like
    else:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f'Wrong subject type for like. Allowed type is one from the list: {ALLOWED_LIKE_TYPES}'
        )
