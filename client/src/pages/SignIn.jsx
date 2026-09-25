import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';
import { HiOutlinePencilAlt } from 'react-icons/hi';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill all the fields'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok || data.success === false) {
        return dispatch(
          signInFailure(data.message || 'Something went wrong. Please try again.'),
        );
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(
        signInFailure(
          'Unable to reach the server. Please check your connection and try again.',
        ),
      );
      console.error(error.message);
    }
  };

  return (
    <div className='relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-16'>
      <div className='pointer-events-none absolute inset-0 -z-10'>
        <div className='animate-float-slow absolute -top-20 left-10 h-72 w-72 rounded-full bg-indigo-400/25 blur-3xl' />
        <div className='animate-float-slow absolute bottom-0 right-10 h-72 w-72 rounded-full bg-fuchsia-400/25 blur-3xl' />
      </div>

      <div className='grid w-full max-w-4xl overflow-hidden rounded-3xl border border-gray-200 bg-white/80 shadow-2xl backdrop-blur-xl md:grid-cols-2 dark:border-gray-700 dark:bg-gray-900/70'>
        {/* Left brand panel */}
        <div className='brand-gradient animated-gradient hidden flex-col justify-between p-10 text-white md:flex'>
          <Link to='/' className='flex items-center gap-2 text-2xl font-extrabold'>
            <span className='flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur'>
              <HiOutlinePencilAlt className='h-5 w-5' />
            </span>
            Blogify
          </Link>
          <div>
            <h2 className='text-3xl font-bold leading-tight'>
              Welcome back.
            </h2>
            <p className='mt-3 text-white/80'>
              Sign in to continue reading, writing, and joining the
              conversation.
            </p>
          </div>
          <p className='text-sm text-white/70'>
            Sign in with your email and password or with Google.
          </p>
        </div>

        {/* Right form */}
        <div className='p-8 sm:p-10'>
          <h1 className='mb-1 text-2xl font-bold'>Sign In</h1>
          <p className='mb-6 text-sm text-gray-500 dark:text-gray-400'>
            Enter your details to access your account.
          </p>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Your email' />
              <TextInput
                type='email'
                placeholder='user@gmail.com'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Your password' />
              <TextInput
                type='password'
                placeholder='**********'
                id='password'
                onChange={handleChange}
              />
            </div>
            <button
              type='submit'
              disabled={loading}
              className='brand-gradient animated-gradient btn-3d mt-1 flex cursor-pointer items-center justify-center rounded-lg px-5 py-2.5 font-semibold text-white disabled:opacity-60'
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign In'
              )}
            </button>
            <OAuth />
          </form>
          <div className='mt-5 flex gap-2 text-sm'>
            <span className='text-gray-500 dark:text-gray-400'>
              Don&apos;t have an account?
            </span>
            <Link to='/sign-up' className='font-semibold text-indigo-600 dark:text-indigo-400'>
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
