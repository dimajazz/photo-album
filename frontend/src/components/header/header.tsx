import { useEffect } from 'react';

import { Card } from 'components/card/card';
import { SignInUP } from 'components/signIn/signInUP';
import { useAuth } from 'contexts/user.contexts';
import { getFromLocalStorageWithExpiry } from 'servises/localStorageHandler';

import './header.css';
import logo from 'assets/statis/logo.jpg';
import logoPic from 'assets/statis/logo-pic.jpg';

export const Header = (props: HeaderProps) => {
  const { setModalChilren, setIsModalShown } = props;
  const { userData, setUserHandler } = useAuth();

  const signIn = () => {
    setModalChilren(
      <Card title='Sign In' imgUrl={logoPic}>
        <SignInUP setIsModalShown={setIsModalShown} />
      </Card>
    );
    setIsModalShown(true);
  };

  const signUp = () => {
    setModalChilren(
      <Card title='Sign Up' imgUrl={logoPic}>
        <SignInUP setIsModalShown={setIsModalShown} isNewUser={true} />
      </Card>
    );
    setIsModalShown(true);
  };

  const signOut = () => setUserHandler(null);

  useEffect(() => {
    const dataFromLocalStorage = getFromLocalStorageWithExpiry()

    if (dataFromLocalStorage) {
      setUserHandler(dataFromLocalStorage)
    }
  }, [])

  return (
    <header>
      <a href='/'>
        <img src={logo} alt='logo' className='logo' />
      </a>
      {userData?.access_token ? (
        <div className='sign-in-up'>
          <button onClick={signOut}>Sign Out</button>
        </div>
      ) : (
        <div className='sign-in-up'>
          <button onClick={signIn}>Sing In</button>
          <button onClick={signUp}>Sing Up</button>
        </div>
      )}
    </header>
  );
};

type HeaderProps = {
  setModalChilren: React.Dispatch<React.SetStateAction<JSX.Element>>;
  setIsModalShown: React.Dispatch<React.SetStateAction<boolean>>;
};
