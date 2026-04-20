import { useEffect, useState } from 'react';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import PostCard from '../components/PostCard';

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');

  const fetchPosts = async () => {
    const { data } = await api.get('/posts');
    setPosts(data.data || []);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = async (e) => {
    e.preventDefault();
    await api.post('/posts', { content });
    setContent('');
    fetchPosts();
  };

  return (
    <>
      <Navbar />
      <main className="container">
        <form onSubmit={createPost} className="card">
          <h2>Create Post</h2>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="What's happening?" />
          <button type="submit">Post</button>
        </form>
        {posts.map((post) => <PostCard key={post.id} post={post} onRefresh={fetchPosts} />)}
      </main>
    </>
  );
}
