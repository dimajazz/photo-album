import './signInUp.css';

export const SignInUP = (props: signInUPProps) => {
  const { isNewUser = false } = props;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isNewUser) {
      console.log('Sign Up');
    } else {
      console.log('Sing In');
    }
  };

  return (
    <form className='sign-in-up-form' onSubmit={handleSubmit}>
      <input
        className='form-input'
        type='text'
        placeholder='username'
        required
      />
      {isNewUser && (
        <input
          className='form-input'
          type='email'
          placeholder='email'
          required
        />
      )}
      <input
        className='form-input'
        type='password'
        placeholder='password'
        required
      />
      <button type='submit'>{isNewUser ? 'Sign Up' : 'Sing In'}</button>
    </form>
  );
};

type signInUPProps = {
  isNewUser?: boolean;
};
