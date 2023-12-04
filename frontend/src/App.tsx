import { useEffect, useState } from 'react';

import { Header } from 'components/header/header';
import { Footer } from 'components/footer/footer';
import { Post } from 'components/post/post';
import { Modal } from 'components/modal/modal';

import { AuthProvider } from 'contexts/user.contexts';

import type { PostType } from 'types/types';
import { BASE_APP_URL } from 'constants/constants';

import './App.css';

function App() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isModalShown, setIsModalShown] = useState(false);
  const [modalChilren, setModalChilren] = useState<JSX.Element>(<></>);

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const response = await fetch(BASE_APP_URL + 'post/all');
        const posts = await response.json();

        if (response.ok && posts) {
          posts.sort((postPrev: PostType, postNext: PostType) => {
            const timePrev = new Date(postPrev.timestamp).getTime();
            const timeNext = new Date(postNext.timestamp).getTime();
            return timeNext - timePrev;
          });
          setPosts(posts);
        }
      } catch (error: any) {
        console.error(error.message);
      }
    };
    getAllPosts();
  }, []);

  return (
    <AuthProvider>
      <div className='app'>
        <Header
          setIsModalShown={setIsModalShown}
          setModalChilren={setModalChilren}
        />
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
    </AuthProvider>
  );
}

export default App;
