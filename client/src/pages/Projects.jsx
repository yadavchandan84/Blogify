import CallToAction from '../components/CallToAction';
import { HiCheckCircle } from 'react-icons/hi';

export default function Projects() {
  const learnings = [
    'How to structure HTML for clean and semantic code',
    'Styling with CSS to create visually appealing designs',
    'Adding interactivity with JavaScript',
    'Debugging and problem-solving techniques',
    'Best practices for responsive and accessible web design',
  ];

  return (
    <div className='relative min-h-screen overflow-hidden'>
      <div className='pointer-events-none absolute inset-0 -z-10'>
        <div className='animate-float-slow absolute -top-20 right-1/4 h-72 w-72 rounded-full bg-violet-400/20 blur-3xl' />
        <div className='animate-float-slow absolute top-40 left-1/4 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl' />
      </div>

      <div className='mx-auto flex max-w-4xl flex-col items-center gap-8 p-6 py-20'>
        <div className='text-center'>
          <h1 className='text-4xl font-extrabold sm:text-5xl'>
            Explore Our <span className='brand-text animated-gradient'>Projects</span>
          </h1>
          <p className='mx-auto mt-4 max-w-2xl text-lg text-gray-500 dark:text-gray-400'>
            Dive into a collection of fun, engaging projects designed to help
            you master HTML, CSS, and JavaScript. Whether you&apos;re a beginner
            or a seasoned developer, these builds will sharpen your skills and
            spark creativity.
          </p>
        </div>

        <div className='perspective grid w-full gap-6 md:grid-cols-2'>
          <div className='perspective'>
            <section className='card-3d h-full rounded-2xl border border-gray-200 bg-white/80 p-6 surface-3d dark:border-gray-700 dark:bg-white/5'>
              <h2 className='card-3d__layer text-2xl font-bold'>
                Why build projects?
              </h2>
              <p className='card-3d__layer mt-3 text-gray-500 dark:text-gray-400'>
                Building projects is one of the best ways to learn programming.
                It lets you apply theory in practice, solve real problems, and
                create a portfolio that showcases your skills to employers and
                clients.
              </p>
            </section>
          </div>
          <div className='perspective'>
            <section className='card-3d h-full rounded-2xl border border-gray-200 bg-white/80 p-6 surface-3d dark:border-gray-700 dark:bg-white/5'>
              <h2 className='card-3d__layer text-2xl font-bold'>
                What you&apos;ll learn
              </h2>
              <ul className='card-3d__layer mt-3 flex flex-col gap-2 text-gray-500 dark:text-gray-400'>
                {learnings.map((item) => (
                  <li key={item} className='flex items-start gap-2'>
                    <HiCheckCircle className='mt-0.5 h-5 w-5 shrink-0 text-indigo-500' />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        <div className='w-full'>
          <CallToAction />
        </div>
      </div>
    </div>
  );
}
