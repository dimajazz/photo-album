import { useState } from 'react';

import { useAuth } from 'contexts/user.contexts';
import { BASE_APP_URL } from 'constants/constants';
import './signInUp.css';

export const SignInUP = (props: SignInUPProps) => {
  const { isNewUser = false, setIsModalShown } = props;
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUserHandler } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    isNewUser ? await signUp() : await signIn();
    setIsModalShown(false);
  };

  const authenticate = async (authProps: AuthProps) => {
    const { endpoint, requestOptions } = authProps;

    try {
      const response = await fetch(BASE_APP_URL + endpoint, requestOptions);
      const data = await response.json();

      if (response.ok && data) {
        setUserHandler(data);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const signIn = async () => {
    const dataFromUser = { username, password };
    const formData = new FormData();
    for (const [key, value] of Object.entries(dataFromUser)) {
      formData.append(key, value);
    }

    const endpoint = 'login';
    const requestOptions = {
      method: 'POST',
      body: formData,
    };
    const authProps: AuthProps = { endpoint, requestOptions };
    await authenticate(authProps);
    window.location.reload();
  };

  const signUp = async () => {
    const dataFromUser = JSON.stringify({ username, email, password });
    const endpoint = 'user/new';
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: dataFromUser,
    };
    const authProps = { endpoint, requestOptions };
    await authenticate(authProps);
    await signIn();
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

export type requestOptions = {
  method: string;
  body: FormData | string;
  headers?: {
    'Content-Type': string;
  };
};

export type AuthProps = {
  endpoint: string;
  requestOptions: requestOptions;
};
