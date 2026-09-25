import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import { HiArrowRight, HiSparkles } from 'react-icons/hi';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/post/getposts?limit=9');
        const data = await res.json();
        setPosts(data.posts || []);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className='overflow-hidden'>
      {/* Hero */}
      <section className='relative isolate'>
        {/* decorative blobs */}
        <div className='pointer-events-none absolute inset-0 -z-10 overflow-hidden'>
          <div className='animate-float-slow absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-400/30 blur-3xl dark:bg-indigo-500/20' />
          <div className='animate-float-slow absolute top-10 right-0 h-80 w-80 rounded-full bg-fuchsia-400/25 blur-3xl dark:bg-fuchsia-500/20' />
          <div className='absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-violet-400/20 blur-3xl dark:bg-violet-500/10' />
        </div>

        <div className='perspective mx-auto grid max-w-6xl items-center gap-10 px-4 py-24 sm:py-28 lg:grid-cols-2'>
          {/* Left: copy */}
          <div className='flex flex-col items-center gap-6 text-center lg:items-start lg:text-left'>
            <span className='animate-fade-up inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/60 px-4 py-1.5 text-sm font-medium text-indigo-600 backdrop-blur dark:border-indigo-500/30 dark:bg-white/5 dark:text-indigo-300'>
              <HiSparkles /> Fresh ideas, every week
            </span>

            <h1 className='animate-fade-up text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl'>
              Stories worth{' '}
              <span className='brand-text animated-gradient'>reading</span>,
              written for curious minds.
            </h1>

            <p className='animate-fade-up max-w-xl text-base text-gray-500 dark:text-gray-400 sm:text-lg'>
              Dive into articles, tutorials, and resources on web development,
              software engineering, and the tech that shapes tomorrow. Learn
              something new and level up your craft.
            </p>

            <div className='animate-fade-up flex flex-wrap items-center justify-center gap-3 lg:justify-start'>
              <Link
                to='/search'
                className='brand-gradient animated-gradient btn-3d inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-white'
              >
                Explore all posts <HiArrowRight />
              </Link>
              <Link
                to='/about'
                className='rounded-xl border border-gray-300 bg-white/70 px-6 py-3 font-semibold text-gray-700 backdrop-blur transition-transform hover:-translate-y-0.5 dark:border-gray-600 dark:bg-white/5 dark:text-gray-200'
              >
                About Blogify
              </Link>
            </div>
          </div>

          {/* Right: 3D floating card stack */}
          <div className='perspective hidden justify-center lg:flex'>
            <div className='preserve-3d animate-float-3d relative h-[380px] w-[340px]'>
              {/* back card */}
              <div
                className='surface-3d absolute inset-0 rounded-3xl border border-gray-200 bg-white/80 backdrop-blur dark:border-gray-700 dark:bg-gray-800/70'
                style={{ transform: 'translateZ(-60px) translateX(46px) rotate(8deg)' }}
              />
              {/* middle card */}
              <div
                className='surface-3d absolute inset-0 rounded-3xl border border-gray-200 bg-white/90 backdrop-blur dark:border-gray-700 dark:bg-gray-800/80'
                style={{ transform: 'translateZ(-30px) translateX(24px) rotate(4deg)' }}
              />
              {/* front card */}
              <div
                className='surface-3d absolute inset-0 flex flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800'
                style={{ transform: 'translateZ(0)' }}
              >
                <div className='brand-gradient animated-gradient h-40 w-full' />
                <div className='flex flex-1 flex-col gap-3 p-6'>
                  <span className='w-fit rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300'>
                    Featured
                  </span>
                  <div className='h-4 w-4/5 rounded-full bg-gray-200 dark:bg-gray-700' />
                  <div className='h-4 w-3/5 rounded-full bg-gray-200 dark:bg-gray-700' />
                  <div className='mt-auto flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400'>
                    Read article <HiArrowRight />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <div className='mx-auto max-w-6xl px-4'>
        <CallToAction />
      </div>

      {/* Recent posts */}
      <div className='mx-auto flex max-w-6xl flex-col gap-8 px-4 py-16'>
        <div className='flex flex-col items-center gap-2 text-center'>
          <h2 className='text-3xl font-bold'>Recent Posts</h2>
          <p className='text-gray-500 dark:text-gray-400'>
            Hand-picked reads from the latest publications.
          </p>
        </div>

        {loading ? (
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className='h-[360px] animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800'
              />
            ))}
          </div>
        ) : posts && posts.length > 0 ? (
          <>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='mx-auto inline-flex items-center gap-2 font-semibold text-indigo-600 transition-colors hover:text-indigo-500 dark:text-indigo-400'
            >
              View all posts <HiArrowRight />
            </Link>
          </>
        ) : (
          <p className='text-center text-gray-500 dark:text-gray-400'>
            No posts yet. Check back soon!
          </p>
        )}
      </div>
    </div>
  );
}
