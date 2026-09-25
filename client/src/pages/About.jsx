import CallToAction from '../components/CallToAction';
import { HiOutlineChatAlt2, HiOutlineCode, HiOutlinePencilAlt } from 'react-icons/hi';

export default function About() {
  const features = [
    {
      icon: <HiOutlinePencilAlt className='h-6 w-6' />,
      title: 'Weekly articles',
      text: 'Fresh tutorials and deep-dives on web development and software engineering.',
    },
    {
      icon: <HiOutlineCode className='h-6 w-6' />,
      title: 'Hands-on projects',
      text: 'Practical guides and code you can actually use in real-world builds.',
    },
    {
      icon: <HiOutlineChatAlt2 className='h-6 w-6' />,
      title: 'A friendly community',
      text: 'Comment, like, and reply. Learn together and grow with fellow readers.',
    },
  ];

  return (
    <div className='relative min-h-screen overflow-hidden'>
      <div className='pointer-events-none absolute inset-0 -z-10'>
        <div className='animate-float-slow absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl' />
        <div className='animate-float-slow absolute top-40 right-1/4 h-72 w-72 rounded-full bg-fuchsia-400/20 blur-3xl' />
      </div>

      <div className='mx-auto max-w-4xl px-4 py-20'>
        <div className='text-center'>
          <span className='brand-text animated-gradient text-sm font-semibold uppercase tracking-widest'>
            About us
          </span>
          <h1 className='mt-3 text-4xl font-extrabold sm:text-5xl'>
            About <span className='brand-text animated-gradient'>Blogify</span>
          </h1>
          <div className='mx-auto mt-6 flex max-w-2xl flex-col gap-5 text-gray-500 dark:text-gray-400'>
            <p>
              Welcome to Blogify! This blog was created by Chandan as a personal
              project to share thoughts and ideas with the world. Chandan is a
              passionate developer who loves writing about technology, coding,
              and everything in between.
            </p>
            <p>
              You&apos;ll find weekly articles and tutorials on topics like web
              development, software engineering, and programming languages.
              There&apos;s always something new to explore, so check back often.
            </p>
          </div>
        </div>

        <div className='perspective mt-14 grid gap-6 sm:grid-cols-3'>
          {features.map((f) => (
            <div key={f.title} className='perspective'>
              <div className='card-3d h-full rounded-2xl border border-gray-200 bg-white/80 p-6 text-center surface-3d dark:border-gray-700 dark:bg-white/5'>
                <div className='card-3d__layer brand-gradient mx-auto flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg shadow-indigo-500/30'>
                  {f.icon}
                </div>
                <h3 className='card-3d__layer mt-4 text-lg font-bold'>
                  {f.title}
                </h3>
                <p className='card-3d__layer mt-2 text-sm text-gray-500 dark:text-gray-400'>
                  {f.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className='mt-14'>
          <CallToAction />
        </div>
      </div>
    </div>
  );
}
