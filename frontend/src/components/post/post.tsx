import { useState } from 'react';

import { Card } from 'components/card/card';

import { useAuth } from 'contexts/user.contexts';
import { PostType } from 'types/types';
import { BASE_APP_URL } from 'constants/constants';
import './post.css';

export const Post = (post: PostProps) => {
  const { image_url, image_url_type, caption, creator, id: postId } = post;
  const [comments, setComments] = useState(post.comments);
  const [isVisible, setIsVisible] = useState(false);
  const { userData } = useAuth();
  
  const getImageUrl = () => {
    if (image_url_type === 'absolute') {
      return image_url;
    }
    return BASE_APP_URL + image_url;
  };

  const showDetails = () => setIsVisible((prev) => !prev);

  const deletePost = async () => {
    const requestsOptions = {
      method: 'GET',
      headers: new Headers({
        Authorization: userData?.token_type + ' ' + userData?.access_token,
      }),
    };

    try {
      const response = await fetch(
        BASE_APP_URL + `post/delete/${postId}`,
        requestsOptions
      );
      const data = await response.json();

      if (response.ok && data) {
        window.location.reload()
      } else {
        return response;
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

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
                {creator.id === userData?.user_id && <button className='del-btn' onClick={deletePost}>Delete</button>}
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
