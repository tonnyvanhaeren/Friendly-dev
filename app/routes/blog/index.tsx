import type { Route } from './+types/index';
import type { Post } from '~/types';
import PostCard from '~/components/PostCard';

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ posts: Post[] }> {
  const url = new URL('/posts-meta.json', request.url);
  const res = await fetch(url.href);

  if (!res.ok) throw new Error('Failed to fetch data');

  const data = await res.json();

  return { posts: data };
}

const BlogPage = ({ loaderData }: Route.ComponentProps) => {
  const { posts } = loaderData;
  //console.log(posts);

  return (
    <div className='max-w-3xl mx-auto mt-10 px-6 py-6 bg-gray-900'>
      <h2 className='text-3xl font-bold text-white mb-8 text-center'>
        🔖 Blog
      </h2>
      {posts.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </div>
  );
};

export default BlogPage;
