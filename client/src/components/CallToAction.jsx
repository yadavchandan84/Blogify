import { HiArrowRight, HiCode } from 'react-icons/hi';

export default function CallToAction() {
  return (
    <div className='relative my-8 flex flex-col items-center gap-6 overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-indigo-50 via-white to-fuchsia-50 p-8 text-center sm:flex-row sm:text-left dark:border-gray-700 dark:from-indigo-950/40 dark:via-gray-900 dark:to-fuchsia-950/30'>
      {/* glow */}
      <div className='pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-fuchsia-400/20 blur-3xl' />
      <div className='pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-indigo-400/20 blur-3xl' />

      <div className='relative flex flex-1 flex-col items-center gap-3 sm:items-start'>
        <span className='brand-gradient flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg shadow-indigo-500/30'>
          <HiCode className='h-6 w-6' />
        </span>
        <h2 className='text-2xl font-bold'>Want to level up your JavaScript?</h2>
        <p className='text-gray-500 dark:text-gray-400'>
          Explore a hands-on collection of 100 JavaScript projects and build
          your way to mastery.
        </p>
        <a
          href='https://www.100jsprojects.com'
          target='_blank'
          rel='noopener noreferrer'
          className='brand-gradient animated-gradient btn-3d mt-1 inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-white'
        >
          100 JavaScript Projects <HiArrowRight />
        </a>
      </div>

      <div className='perspective relative flex flex-1 items-center justify-center'>
        <div className='animate-float-3d grid w-full max-w-xs grid-cols-3 gap-3 font-mono text-xs'>
          {['<html>', '{ }', '() =>', 'const', 'flex', 'async', 'React', 'CSS', 'API'].map(
            (t, i) => (
              <div
                key={i}
                className='flex items-center justify-center rounded-xl border border-gray-200 bg-white/80 py-4 font-semibold text-indigo-600 surface-3d backdrop-blur dark:border-gray-700 dark:bg-white/5 dark:text-indigo-300'
                style={{ transform: `translateZ(${(i % 3) * 14}px)` }}
              >
                {t}
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
