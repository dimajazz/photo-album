import { useState, useEffect, useCallback } from 'react';

import { Post } from 'components/post/post';
import { CreateNewPost } from 'components/createNewPost/createNewPost';
import { SortSelector } from 'components/sortSelector/sortSelector';

import { BASE_APP_URL, NEWEST } from 'constants/constants';
import { PostType } from 'types/types';
import { SortType } from 'formatters/sortItems';
import { sortItems } from 'formatters/sortItems';
import './postsContainer.css';

export const PostsContainer = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [sortBy, setSortBy] = useState<SortType>(NEWEST);
  const [isSortOnPending, setIsSortOnPending] = useState(true);

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const response = await fetch(BASE_APP_URL + 'post/all');
        const posts = await response.json();

        if (response.ok && posts) {
          const newItems = (sortItems({
            items: posts,
            sortType: NEWEST,
          })) as PostType[];
          setPosts(newItems);
          setIsSortOnPending(false);
        }
      } catch (error: any) {
        console.error(error.message);
      }
    };
    getAllPosts();
  }, []);

  const sortItemsMemo = useCallback(() => {
    setIsSortOnPending(true);
    const newItems = sortItems({
      items: posts,
      sortType: sortBy,
    }) as PostType[];
    setPosts(newItems);
    setIsSortOnPending(false);
  }, [sortBy])

  useEffect(() => {
    sortItemsMemo()
  }, [sortBy]);

  return (
    <>
      <CreateNewPost />
      <SortSelector
        targetType='post'
        selectedValue={sortBy}
        setSelectedValue={setSortBy}
        isDisabled={isSortOnPending}
      />
      <div className='posts-container'>
        {posts.length ? (
          posts.map((post) => <Post {...post} key={post.id} />)
        ) : (
          <p className='no-posts'>
            There are no Photos here yet. Add yours. Be first.
          </p>
        )}
      </div>
    </>
  );
};
