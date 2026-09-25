import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';

export default function PostCard({ post }) {
  return (
    <div className='perspective group w-full'>
      <div className='card-3d relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white surface-3d dark:border-gray-700 dark:bg-gray-800/70'>
        <Link to={`/post/${post.slug}`} className='block overflow-hidden'>
          <div className='relative h-56 w-full overflow-hidden'>
            <img
              src={post.image}
              alt={post.title}
              loading='lazy'
              className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-110'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90' />
            <span className='card-3d__layer absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-indigo-600 shadow-lg backdrop-blur dark:bg-black/60 dark:text-indigo-300'>
              {post.category}
            </span>
          </div>
        </Link>

        <div className='card-3d__layer flex flex-1 flex-col gap-3 p-5'>
          <Link to={`/post/${post.slug}`}>
            <h3 className='line-clamp-2 text-lg font-bold leading-snug transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400'>
              {post.title}
            </h3>
          </Link>

          <Link
            to={`/post/${post.slug}`}
            className='mt-auto inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-indigo-600 transition-all hover:gap-2.5 dark:text-indigo-400'
          >
            Read article <HiArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}
