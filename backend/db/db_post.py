from sqlalchemy.orm.session import Session
from datetime import datetime
from fastapi import HTTPException, status

from db.schemas import PostBase
from db.models import DBPost


def create_new_post(request: PostBase, db: Session):
    new_post = DBPost(
        image_url=request.image_url,
        image_url_type=request.image_url_type,
        caption=request.caption,
        timestamp=datetime.now(),
        creator_id=request.creator_id
    )
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post


def get_all_posts(db: Session):
    return db.query(DBPost).all()


def delete_post(id: int, user_id: int, db: Session):
    post = db.query(DBPost).filter(DBPost.id == id).first()
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f'Post with id {id} not found'
        )
    if post.creator_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail='No permission. Only post creator can delete a post'
        )
    db.delete(post)
    db.commit()
    return 'The post have been successfully deleted'
