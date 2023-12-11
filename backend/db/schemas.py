from pydantic import BaseModel
from datetime import datetime


class UserBase(BaseModel):
    username: str
    email: str
    password: str


class UserDisplay(BaseModel):
    username: str
    email: str

    class Config():
        from_attributes = True


class PostBase(BaseModel):
    image_url: str
    image_url_type: str
    caption: str
    creator_id: int


class PostCreatorDisplay(BaseModel):
    username: str
    id: int

    class Config():
        from_attributes = True


class CommentLikeBase(BaseModel):
    user_id: int
    comment_id: int


class Comment(BaseModel):
    id: int
    text: str
    username: str
    likes: list[CommentLikeBase]
    timestamp: datetime

    class Config():
        from_attributes = True


class PostLikeBase(BaseModel):
    user_id: int
    post_id: int


class PostDisplay(BaseModel):
    id: int
    image_url: str
    image_url_type: str
    caption: str
    likes: list[PostLikeBase]
    timestamp: datetime
    creator: PostCreatorDisplay
    comments: list[Comment]

    class Config():
        from_attributes = True


class UserAuth(BaseModel):
    id: int
    username: str
    email: str


class CommentBase(BaseModel):
    id: int
    username: str
    text: str
    post_id: int
