import { useEffect, useState } from 'react';

import { Post } from 'components/post/post';

import type { PostType } from 'types/types';
import { BASE_APP_URL } from 'constants/constants';

import './App.css';

function App() {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    fetch(BASE_APP_URL + 'post/all')
      .then((response) => response.json())
      .then((postsData) => {
        postsData.sort((postPrev: PostType, postNext: PostType) => {
          const timePrev = new Date(postPrev.timestamp).getTime();
          const timeNext = new Date(postNext.timestamp).getTime();
          return timeNext - timePrev;
        });
        setPosts(postsData);
      })
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <>
      <h1 className='app-title'>Photo Album</h1>
      <div className='posts-container'>
        {posts.length ? (
          posts.map((post) => <Post {...post} key={post.id} />)
        ) : (
          <p className='no-posts'>There are no Photos here yet. Add yours. Be first.</p>
        )}
      </div>
    </>
  );
}

export default App;
