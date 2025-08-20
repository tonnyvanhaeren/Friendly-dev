import ReactMarkdown from 'react-markdown';
import type { Route } from './+types/details';
import type { Post } from '~/types';
import { Link } from 'react-router';

export async function loader({ request, params }: Route.LoaderArgs) {
  const { slug } = params;
  const url = new URL('/posts-meta.json', request.url);
  const res = await fetch(url.href);

  if (!res.ok) throw new Error('Failed to load posts');

  const index = await res.json();

  const postMeta = index.find((post: Post) => post.slug === slug);

  if (!postMeta) throw new Response('Post Not Found', { status: 404 });

  // Dynamically get raw markdown data
  const markdown = await import(`../../posts/${slug}.md?raw`);

  return { post: postMeta, markdown: markdown.default };
}

type BlogPostDetailsPageProps = {
  loaderData: {
    post: Post;
    markdown: string;
  };
};

const BlogPostDetailsPage = ({ loaderData }: BlogPostDetailsPageProps) => {
  const { post, markdown } = loaderData;

  return (
    <div className='max-w-3xl mx-auto px-6 py-12 bg-gray-900'>
      <h1 className='text-3xl font-bold text-blue-400 mb-2'>{post.title}</h1>
      <p className='text sm text-gray-400 mb-6'>
        {new Date(post.date).toDateString()}
      </p>

      <img
        src={post.image}
        alt={post.title}
        className='w-full h-64 object-cover mb-4 '
      />

      <div className='prose prose-invert max-w-none mb-12'>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>

      <Link
        to='/blog'
        className='inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition'
      >
        ← Back To Posts
      </Link>
    </div>
  );
};

export default BlogPostDetailsPage;
