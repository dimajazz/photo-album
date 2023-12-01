import { useState } from 'react';

import { useAuth } from 'contexts/user.contexts';
import { BASE_APP_URL } from 'constants/constants';
import './signInUp.css';

export const SignInUP = (props: SignInUPProps) => {
  const { isNewUser = false, setIsModalShown } = props;
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUserHandler } = useAuth()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const authenticate = (authProps: AuthenticateProps) => {
      const formData = new FormData();
      for (const [key, value] of Object.entries(authProps)) {
        formData.append(key, value);
      }

      const endpoint = isNewUser ? 'user/new' : 'login';
      const requestOptions = {
        method: 'POST',
        body: formData,
      };

      fetch(BASE_APP_URL + endpoint, requestOptions)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw response;
        })
        .then((data) => {
          setUserHandler(data);
        })
        .catch((error) => console.error(error.message));
    };

    if (isNewUser) {
      const dataFromUser = { username, email, password };
      authenticate(dataFromUser);
    } else {
      const dataFromUser = { username, password };
      authenticate(dataFromUser);
    }
    setIsModalShown(false);
  };

  return (
    <form className='sign-in-up-form' onSubmit={handleSubmit}>
      <input
        className='form-input'
        type='text'
        placeholder='username'
        name='username'
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {isNewUser && (
        <input
          className='form-input'
          type='email'
          placeholder='email'
          name='email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      )}
      <input
        className='form-input'
        type='password'
        placeholder='password'
        name='password'
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type='submit'>{isNewUser ? 'Sign Up' : 'Sing In'}</button>
    </form>
  );
};

export type SignInUPProps = {
  setIsModalShown: React.Dispatch<React.SetStateAction<boolean>>;
  isNewUser?: boolean;
};

export type AuthenticateProps = {
  username: string;
  password: string;
  email?: string;
};
