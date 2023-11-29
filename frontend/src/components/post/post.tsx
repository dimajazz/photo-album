import { useState } from 'react';

import { Card } from 'components/card/card';
import { PostType } from 'types/types';
import { BASE_APP_URL } from 'constants/constants';
import './post.css';

export const Post = (post: PostProps) => {
  const { image_url, image_url_type, caption, creator } = post;
  const [comments, setComments] = useState(post.comments);
  const [isVisible, setIsVisible] = useState(false);

  const getImageUrl = () => {
    if (image_url_type === 'absolute') {
      return image_url;
    }
    return BASE_APP_URL + image_url;
  };

  const showDetails = () => setIsVisible((prev) => !prev);

  return (
    <div className='post'>
      <Card title={caption} imgUrl={getImageUrl()}>
        <>
          {isVisible && (
            <div className='post-description'>
              <div className='post-creator'>
                <div>
                  <h4>Posted by: {creator.username}</h4>
                  <p>{new Date(post.timestamp).toUTCString()}</p>
                </div>
                <button>Delete</button>
              </div>
              <h4>Comments:</h4>
              {comments.length > 0 ? (
                <div className='post-comments-container'>
                  {comments.map((comment, index) => (
                    <p className='comment' key={index}>
                      <b>{comment.username}</b>: {comment.text}
                      <i>{new Date(comment.timestamp).toUTCString()}</i>
                    </p>
                  ))}
                </div>
              ) : (
                <p>'Leave you comment here'</p>
              )}
            </div>
          )}
          <div className='more-less'>
            <span onClick={showDetails}>{isVisible ? 'less' : 'more'}</span>
          </div>
        </>
      </Card>
    </div>
  );
};

type PostProps = PostType;
