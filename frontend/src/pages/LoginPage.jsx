import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(form);
      navigate('/');
    } catch {
      setError('Invalid credentials.');
    }
  };

  return (
    <main className="auth-page">
      <form onSubmit={submit} className="card">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <input placeholder="Email" type="email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button type="submit">Login</button>
        <p>New here? <Link to="/register">Create account</Link></p>
      </form>
    </main>
  );
}
