import { Card } from 'components/card/card';
import { SignInUP } from 'components/signIn/signInUP';

import './header.css';
import logo from 'assets/statis/logo.jpg';

export const Header = (props: HeaderProps) => {
  const { setModalChilren, setIsModalShown } = props;

  const signIn = () => {
    setModalChilren(
      <Card title='Sign In' imgUrl={logo}>
        <SignInUP />
      </Card>
    );
    setIsModalShown(true);
  };

  const signUp = () => {
    setModalChilren(
      <Card title='Sign Up' imgUrl={logo}>
        <SignInUP isNewUser={true} />
      </Card>
    );
    setIsModalShown(true);
  };

  return (
    <header>
      <a href='/'>
        <img src={logo} alt='logo' className='logo' />
      </a>
      <div className='sign-in-up'>
        <button onClick={signIn}>Sing In</button>
        <button onClick={signUp}>Sing Up</button>
      </div>
    </header>
  );
};

type HeaderProps = {
  setModalChilren: React.Dispatch<React.SetStateAction<JSX.Element>>;
  setIsModalShown: React.Dispatch<React.SetStateAction<boolean>>;
};
