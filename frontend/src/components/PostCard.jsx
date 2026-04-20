import api from '../api/axios';
import CommentBox from './CommentBox';

export default function PostCard({ post, onRefresh }) {
  const toggleLike = async () => {
    await api.post(`/posts/${post.id}/likes/toggle`);
    onRefresh();
  };

  const addComment = async (content) => {
    await api.post(`/posts/${post.id}/comments`, { content });
    onRefresh();
  };

  return (
    <article className="post-card">
      <h3>{post.user?.name}</h3>
      <p>{post.content}</p>
      {post.image && <img src={`http://127.0.0.1:8000/storage/${post.image}`} alt="post" className="post-image" />}
      <div className="post-meta">
        <button onClick={toggleLike}>Like / Unlike</button>
        <span>{post.likes_count} likes</span>
        <span>{post.comments_count} comments</span>
      </div>
      <CommentBox onSubmit={addComment} />
      <ul className="comment-list">
        {post.comments?.map((comment) => (
          <li key={comment.id}><b>{comment.user?.name}:</b> {comment.content}</li>
        ))}
      </ul>
    </article>
  );
}
