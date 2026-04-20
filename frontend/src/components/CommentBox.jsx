import { useState } from 'react';

export default function CommentBox({ onSubmit }) {
  const [content, setContent] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    await onSubmit(content);
    setContent('');
  };

  return (
    <form onSubmit={submit} className="comment-box">
      <input value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write a comment" />
      <button type="submit">Send</button>
    </form>
  );
}
