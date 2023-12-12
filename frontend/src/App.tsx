import { useState } from 'react';

import { Header } from 'components/header/header';
import { Footer } from 'components/footer/footer';
import { PostsContainer } from 'components/postsContainer/postsContainer';
import { Modal } from 'components/modal/modal';

import { AuthProvider } from 'contexts/user.contexts';

import './App.css';

function App() {
  const [isModalShown, setIsModalShown] = useState(false);
  const [modalChilren, setModalChilren] = useState<JSX.Element>(<></>);

  return (
    <AuthProvider>
      <div className='app'>
        <Header
          setIsModalShown={setIsModalShown}
          setModalChilren={setModalChilren}
        />
        <div>
          <h1 className='app-title'>Photo Album</h1>
          <PostsContainer setIsModalShown={setIsModalShown} setModalChilren={setModalChilren} />
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
