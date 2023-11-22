from sqlalchemy.orm.session import Session
from datetime import datetime

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
