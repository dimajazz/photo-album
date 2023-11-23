from fastapi import HTTPException, status
from sqlalchemy.orm.session import Session

from db.schemas import UserBase
from db.models import DBUser
from db.hashing import Hash


def create_new_user(request: UserBase, db: Session):
    new_user = DBUser(
        username=request.username,
        email=request.email,
        password=Hash.bcrypt(request.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


def get_user_by_username(username: str, db: Session):
    user = db.query(DBUser).filter(DBUser.username == username).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'User with username {username} not found')
    return user
