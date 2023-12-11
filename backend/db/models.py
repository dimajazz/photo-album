from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql.schema import ForeignKey
from sqlalchemy.orm import relationship

from db.database import Base


class DBUser(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    email = Column(String)
    password = Column(String)
    items = relationship('DBPost', back_populates='creator')


class DBPost(Base):
    __tablename__ = 'post'
    id = Column(Integer, primary_key=True, index=True)
    image_url = Column(String)
    image_url_type = Column(String)
    caption = Column(String)
    timestamp = Column(DateTime)
    creator_id = Column(Integer, ForeignKey('user.id'))
    creator = relationship('DBUser', back_populates='items')
    comments = relationship('DBComment', back_populates='post')
    likes = relationship('DBPostLike', back_populates='post')


class DBComment(Base):
    __tablename__ = 'comment'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    text = Column(String)
    timestamp = Column(DateTime)
    post_id = Column(Integer, ForeignKey('post.id'))
    post = relationship('DBPost', back_populates='comments')
    likes = relationship('DBCommentLike', back_populates='comment')


class DBPostLike(Base):
    '''
    __tablename__: 'post_likes'
    id: Integer
    user_id: ForeignKey('user.id')
    post_id: ForeignKey('post.id')
    post: DBPost.likes
    '''
    __tablename__ = 'post_likes'
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('user.id'))
    post_id = Column(Integer, ForeignKey('post.id'))
    post = relationship('DBPost', back_populates='likes')


class DBCommentLike(Base):
    __tablename__ = 'comment_likes'
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('user.id'))
    comment_id = Column(Integer, ForeignKey('comment.id'))
    comment = relationship('DBComment', back_populates='likes')
