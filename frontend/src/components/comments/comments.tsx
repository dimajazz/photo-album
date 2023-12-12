import { useState, useCallback, useEffect } from 'react';

import { Like } from 'components/like/like';
import { Icon } from 'components/Icon/icon';
import { SortSelector } from 'components/sortSelector/sortSelector';

import { useAuth } from 'contexts/user.contexts';
import { FormatteNumber } from 'formatters/metricNumberFormatter';
import { SortType, sortItems } from 'formatters/sortItems';
import { CommentType } from 'types/types';
import { NEWEST, BASE_APP_URL } from 'constants/constants';

import './comments.css';

export const Comments = (props: CommentProps) => {
  const { comments: initialComments, postId } = props;
  const [isCommentFormVisible, setIsCommentFormVisible] = useState(false);
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const { userData } = useAuth();
  const [sortBy, setSortBy] = useState<SortType>(NEWEST);
  const [isSortOnPending, setIsSortOnPending] = useState(true);

  const addNewCommemt = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    const requestDataStr = JSON.stringify({
      username: userData?.username,
      text: newComment,
      post_id: postId,
    });
    const requestOptions = {
      method: 'POST',
      headers: new Headers({
        Authorization: userData?.token_type + ' ' + userData?.access_token,
        'Content-Type': 'application/json',
      }),
      body: requestDataStr,
    };
    const endpoint = BASE_APP_URL + 'comment/new';

    try {
      const response = await fetch(endpoint, requestOptions);
      const data = await response.json();

      if (response.ok && data) {
        await getAllComments();
        return data;
      } else {
        return response;
      }
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setNewComment('');
    }
  };

  const getAllComments = async () => {
    const endpoint = BASE_APP_URL + 'comment/all/' + postId;

    try {
      const response = await fetch(endpoint);
      const data = await response.json();

      if (response.ok && data) {
        const sortedData = sortItems({
          items: data,
          sortType: sortBy,
        }) as CommentType[];
        
        setComments(sortedData);
        return data;
      } else {
        return response;
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const commentMessageHandler = (message: string) => {
    setNewComment(message);
  };

  const toggleCommemtForm = () => {
    setIsCommentFormVisible((prev) => (prev = !prev));
  };

  const sortItemsMemo = useCallback(() => {
    setIsSortOnPending(true);
    const newItems = sortItems({
      items: comments,
      sortType: sortBy,
    }) as CommentType[];
    setComments(newItems);
    setIsSortOnPending(false);
  }, [sortBy]);

  useEffect(() => {
    sortItemsMemo();
  }, [sortBy]);

  return (
    <div className='commetns-section'>
      <div className='commetns-section-header'>
        {userData?.access_token && (
          <>
            <button className='add-new-comment-btn' onClick={toggleCommemtForm}>
              {isCommentFormVisible ? 'Cancel' : 'Add comment'}
            </button>
            {isCommentFormVisible && (
              <form className='comment-form' onSubmit={addNewCommemt}>
                <textarea
                  onChange={(event) =>
                    commentMessageHandler(event?.target.value)
                  }
                  rows={5}
                  placeholder='Leave your comment'
                  minLength={1}
                  maxLength={300}
                  value={newComment}
                  name='comment'
                  required
                />
                <button type='submit'>Send</button>
              </form>
            )}
          </>
        )}
        <div className='comments-title'>
          <h4>Comments:</h4>
          <div className='comments-number'>
            <Icon name='message' />
            {FormatteNumber(comments.length)}
          </div>
        </div>
        <SortSelector
          targetType='comment'
          selectedValue={sortBy}
          setSelectedValue={setSortBy}
          isDisabled={isSortOnPending}
        />
      </div>
      {comments.length > 0 ? (
        <div className='post-comments-container'>
          {comments.map((comment) => (
            <div className='comment' key={comment.id}>
              <Icon name='scissors' cssClass='scissors-icon' />
              <div className='comment-header'>
                <p className='comment-author'>{comment.username}:</p>
                <Like
                  likes={comment.likes}
                  likedTargetId={comment.id}
                  likedTargetType='comment'
                />
              </div>
              <p className='comment-body'>{comment.text}</p>
              <p className='comment-footer'>
                {new Date(comment.timestamp).toUTCString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>'Leave you comment here'</p>
      )}
    </div>
  );
};

type CommentProps = {
  comments: CommentType[];
  postId: number;
};
