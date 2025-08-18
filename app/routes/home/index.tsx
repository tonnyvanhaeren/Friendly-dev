import type { Route } from './+types/index';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'The Friendly dev | Welcome' },
    { name: 'description', content: 'Custom website development' },
  ];
}

export default function Home() {
  console.log('home page');
  return (
    <section>
      <h2>My App</h2>
    </section>
  );
}
