import { Outlet } from 'react-router';
import Hero from '~/components/Hero';
import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'The Friendly dev | Welcome' },
    { name: 'description', content: 'Custom website development' },
  ];
}

const HomeLayout = () => {
  return (
    <>
      <Hero name='Tonny' />
      <section className='max-w-6xl mx-auto px-6 my-8'>
        <Outlet />
      </section>
    </>
  );
};

export default HomeLayout;
