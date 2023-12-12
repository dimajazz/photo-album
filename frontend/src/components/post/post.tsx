import { useState } from 'react';

import { Card } from 'components/card/card';
import { Comments } from 'components/comments/comments';
import { Like } from 'components/like/like';

import { useAuth } from 'contexts/user.contexts';
import { PostType } from 'types/types';
import { BASE_APP_URL } from 'constants/constants';
import './post.css';

export const Post = (props: PostProps) => {
  const { post } = props;
  const {
    image_url,
    image_url_type,
    caption,
    creator,
    id: postId,
    likes,
  } = props.post;
  const { setModalChilren, setIsModalShown } = props;
  const [isVisible, setIsVisible] = useState(false);
  const { userData } = useAuth();

  const getImageUrl = () => {
    if (image_url_type === 'absolute') {
      return image_url;
    }
    return BASE_APP_URL + image_url;
  };

  const showDetails = () => setIsVisible((prev) => !prev);

  const confirmDelete = async () => {
    await setModalChilren(
      <div className='del-confirm'>
        <p>Are you sure you want to delete the post?</p>
        <div className='confirm-btn-container'>
          <button
            onClick={() => {
              setIsModalShown(false);
              return;
            }}
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              await deletePost();
              setIsModalShown(false);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    );
    setIsModalShown(true);
  };

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
        window.location.reload();
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
          <div className='post-header'>
            <Like likes={likes} likedTargetId={postId} likedTargetType='post' />
            <span className='more-less-toggler' onClick={showDetails}>
              {isVisible ? 'less' : 'more'}
            </span>
          </div>
          {isVisible && (
            <>
              <div className='post-description'>
                <div className='post-creator'>
                  <div>
                    <h4>Posted by: {creator.username}</h4>
                    <p>{new Date(post.timestamp).toUTCString()}</p>
                  </div>
                  {creator.id === userData?.user_id && (
                    <button className='del-btn' onClick={confirmDelete}>
                      Delete
                    </button>
                  )}
                </div>
                <Comments comments={post.comments} postId={postId} />
              </div>
              <div className='post-footer'>
                <span className='more-less-toggler' onClick={showDetails}>
                  {isVisible ? 'less' : 'more'}
                </span>
              </div>
            </>
          )}
        </>
      </Card>
    </div>
  );
};

type PostProps = {
  post: PostType;
  setModalChilren: React.Dispatch<React.SetStateAction<JSX.Element>>;
  setIsModalShown: React.Dispatch<React.SetStateAction<boolean>>;
};
