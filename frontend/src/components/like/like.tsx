import { useState } from 'react';

import { Icon } from 'components/Icon/icon';
import { FormatteNumber } from 'formatters/metricNumberFormatter';
import { useAuth } from 'contexts/user.contexts';
import { LikeType } from 'types/types';
import { BASE_APP_URL } from 'constants/constants';
import './like.css';

export const Like = (props: LikeProps) => {
  const { likes, likedTargetId, likedTargetType } = props;
  const [targetLikesAmount, setTargetLikesAmount] = useState(likes.length);
  const { userData } = useAuth();

  const isUserLikeItCheck = () => {
    if (userData?.access_token) {
      const filterdLikesArr = likes.find(
        (postLikes) => postLikes.user_id === userData?.user_id
      );
      return filterdLikesArr ? true : false;
    }
    return false;
  };

  const [isUserLikeTarget, setIsUserLikeTarget] = useState(isUserLikeItCheck());

  const togglePostLike = async () => {
    if (userData?.access_token) {
      setIsUserLikeTarget((prev) => !prev);
      if (isUserLikeTarget) {
        await toggleLike();
        setTargetLikesAmount((prev) => prev - 1);
      } else {
        await toggleLike();
        setTargetLikesAmount((prev) => prev + 1);
      }
    }
  };

  const toggleLike = async () => {
    const endpoint = `${BASE_APP_URL}${likedTargetType}/${likedTargetId}/like`;
    const requestBodyStr = JSON.stringify({
      post_id: likedTargetId,
    });
    const requestsOptions = {
      method: 'POST',
      headers: new Headers({
        Authorization: userData?.token_type + ' ' + userData?.access_token,
        'Content-Type': 'application/json',
      }),
      body: requestBodyStr,
    };

    try {
      const response = await fetch(endpoint, requestsOptions);
      const data = await response.json();

      if (response.ok && data) {
      } else {
        return response;
      }
    } catch (error: any) {
      return console.error(error.message);
    }
  };

  return (
    <div className='like-container' onClick={togglePostLike}>
      <Icon name='like' cssClass={`like ${isUserLikeTarget ? 'active' : ''}`} />
      <span className='like-amount'>{FormatteNumber(targetLikesAmount)}</span>
    </div>
  );
};

export type LikeProps = {
  likes: LikeType[];
  likedTargetId: number;
  likedTargetType: 'post' | 'comment'
};
