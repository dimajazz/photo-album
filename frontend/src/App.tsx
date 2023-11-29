import { useEffect, useState } from 'react';

import { Header } from 'components/header/header';
import { Footer } from 'components/footer/footer';
import { Post } from 'components/post/post';
import { Modal } from 'components/modal/modal';

import type { PostType } from 'types/types';
import { BASE_APP_URL } from 'constants/constants';

import './App.css';

function App() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isModalShown, setIsModalShown] = useState(false);
  const [modalChilren, setModalChilren] = useState<JSX.Element>(<></>);

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
    <div className='app'>
      <Header setIsModalShown={setIsModalShown} setModalChilren={setModalChilren} />
      <h1 className='app-title'>Photo Album</h1>
      <div className='posts-container'>
        {posts.length ? (
          posts.map((post) => <Post {...post} key={post.id} />)
        ) : (
          <p className='no-posts'>
            There are no Photos here yet. Add yours. Be first.
          </p>
        )}
      </div>
      <Footer />
      <Modal isModalShown={isModalShown} setIsModalShown={setIsModalShown}>
        {modalChilren}
      </Modal>
    </div>
  );
}

export default App;
