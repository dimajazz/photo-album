import { useState } from 'react';

import { Like } from 'components/like/like';

import { useAuth } from 'contexts/user.contexts';
import { FormatteNumber } from 'formatters/metricNumberFormatter';
import { CommentType } from 'types/types';

import './comments.css';
import { Icon } from 'components/Icon/icon';

export const Comments = (props: CommentProps) => {
  const { comments } = props;
  const [isCommentFormVisible, setIsCommentFormVisible] = useState(false);
  const [commentMessage, setCommentMessage] = useState('');
  const { userData } = useAuth();

  const sortComments = () => {
    comments.sort((comment1, comment2) => {
      return comment1.likes.length - comment2.likes.length;
    });
  };

  const addNewCommemt = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setCommentMessage('');
  };

  const commentMessageHandler = (message: string) => {
    setCommentMessage(message);
  };

  const toggleCommemtForm = () => {
    setIsCommentFormVisible((prev) => (prev = !prev));
  };

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
                  value={commentMessage}
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
      </div>
      {comments.length > 0 ? (
        <div className='post-comments-container'>
          {comments.map((comment, index) => (
            <div className='comment' key={index}>
              <Icon name='scissors' cssClass='scissors-icon' />
              <div className='comment-header'>
                <p className='comment-author'>{comment.username}:</p>
                <Like likes={comment.likes} likedTargetId={comment.id} likedTargetType='comment' />
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

type CommentProps = { comments: CommentType[] };
