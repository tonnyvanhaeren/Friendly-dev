import type { Route } from './+types/index';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'The Friendly dev | Welcome' },
    { name: 'description', content: 'Custom website development' },
  ];
}

export default function Home() {
  // const now = new Date().toISOString();

  // if (typeof window === 'undefined') {
  //   //server side
  //   console.log('server render at:', now);
  // } else {
  //   console.log('Client Hydra at:', now);
  // }

  return <>Home page</>;
}
