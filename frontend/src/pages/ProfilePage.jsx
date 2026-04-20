import { useEffect, useState } from 'react';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { user, refreshUser } = useAuth();
  const [connections, setConnections] = useState({ followers: [], following: [] });
  const [form, setForm] = useState({ name: '', bio: '' });

  useEffect(() => {
    if (user) {
      setForm({ name: user.name || '', bio: user.bio || '' });
      api.get(`/users/${user.id}/connections`).then(({ data }) => setConnections(data));
    }
  }, [user]);

  const save = async (e) => {
    e.preventDefault();
    await api.post('/profile', form);
    await refreshUser();
  };

  if (!user) return null;

  return (
    <>
      <Navbar />
      <main className="container">
        <section className="card">
          <h2>My Profile</h2>
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Bio:</b> {user.bio || 'No bio yet'}</p>
        </section>

        <form className="card" onSubmit={save}>
          <h3>Edit Profile</h3>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
          <button type="submit">Save</button>
        </form>

        <section className="card grid-2">
          <div>
            <h3>Followers ({connections.followers.length})</h3>
            {connections.followers.map((f) => <p key={f.id}>{f.name}</p>)}
          </div>
          <div>
            <h3>Following ({connections.following.length})</h3>
            {connections.following.map((f) => <p key={f.id}>{f.name}</p>)}
          </div>
        </section>
      </main>
    </>
  );
}
