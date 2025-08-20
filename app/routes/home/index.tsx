import type { Project, Post } from '~/types';
import type { Route } from './+types/index';
import FeaturedProjects from '~/components/FeaturedProjects';
import AboutPreview from '~/components/AboutPreview';
import LatestPosts from '~/components/LatestPosts';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'The Friendly dev | Welcome' },
    { name: 'description', content: 'Custom website development' },
  ];
}

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[]; posts: Post[] }> {
  const url = new URL(request.url);
  const [projectRes, postRes] = await Promise.all([
    fetch(`${import.meta.env.VITE_API_URL}/projects`),
    fetch(new URL('/posts-meta.json', url)),
  ]);

  if (!projectRes.ok || !postRes.ok) {
    throw new Error('Failed to fetch projects or posts');
  }

  const [projects, posts] = await Promise.all([
    projectRes.json(),
    postRes.json(),
  ]);

  // const res = await fetch(`${import.meta.env.VITE_API_URL}/projects`);
  // const data = await res.json();

  return { projects, posts };
}

const HomePage = ({ loaderData }: Route.ComponentProps) => {
  const { projects, posts } = loaderData;

  // const now = new Date().toISOString();

  // if (typeof window === 'undefined') {
  //   //server side
  //   console.log('server render at:', now);
  // } else {
  //   console.log('Client Hydra at:', now);
  // }

  return (
    <>
      <FeaturedProjects projects={projects} count={2} />
      <AboutPreview />
      <LatestPosts posts={posts} />
    </>
  );
};

export default HomePage;
