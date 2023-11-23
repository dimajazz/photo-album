from fastapi import APIRouter, Depends, status, UploadFile, File
from fastapi.exceptions import HTTPException
from sqlalchemy.orm.session import Session
import random
import string
import shutil

from db.schemas import PostBase, PostDisplay, UserAuth
from db.database import get_db
from db import db_post
from auth.oauth2 import get_current_user


router = APIRouter(
    prefix='/post',
    tags=['post']
)

image_url_types = ['relative', 'absolute']


@router.post('/new', response_model=PostDisplay)
def create_post(
    request: PostBase,
    db: Session = Depends(get_db),
    current_user: UserAuth = Depends(get_current_user)
):
    if not request.image_url_type in image_url_types:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail='An image url type can be only relative or absolute'
        )
    return db_post.create_new_post(request, db)


@router.get('/all', response_model=list[PostDisplay])
def get_all_posts(db: Session = Depends(get_db)):
    return db_post.get_all_posts(db)


@router.post('/image')
def upload_image(
    image: UploadFile = File(...),
    current_user: UserAuth = Depends(get_current_user)
):
    letters = string.ascii_letters
    rand_str = ''.join(random.choice(letters) for i in range(8))
    filename = f'_{rand_str}.'.join(image.filename.rsplit('.', 1))
    path = f'assets/uploaded_files/images/{filename}'

    with open(path, 'w+b') as buffer:
        shutil.copyfileobj(image.file, buffer)
    return {'filename': path}


@router.get('/delete/{id}')
def delete_post(
    id: int,
    db: Session = Depends(get_db),
    current_user: UserAuth = Depends(get_current_user)
):
    return db_post.delete_post(id, current_user.id, db)
