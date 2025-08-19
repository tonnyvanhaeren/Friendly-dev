import type { Project } from '~/types';
import type { Route } from './+types/index';
import FeaturedProjects from '~/components/FeaturedProjects';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'The Friendly dev | Welcome' },
    { name: 'description', content: 'Custom website development' },
  ];
}

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/projects`);
  const data = await res.json();

  return { projects: data };
}

const HomePage = ({ loaderData }: Route.ComponentProps) => {
  const { projects } = loaderData;

  // const now = new Date().toISOString();

  // if (typeof window === 'undefined') {
  //   //server side
  //   console.log('server render at:', now);
  // } else {
  //   console.log('Client Hydra at:', now);
  // }

  return <>{<FeaturedProjects projects={projects} count={2} />}</>;
};

export default HomePage;
