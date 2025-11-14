import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/auth.service';
import { useAuth } from '../context/AuthContext';
import jwtDecode from 'jwt-decode';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login: setAuthToken } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const token = await login({ username, password });
      setAuthToken(token);

      const decoded: any = jwtDecode(token);

      if (decoded.role === 'ADMIN') {
        navigate('/admin');
      } else if (decoded.role === 'PI') {
        navigate('/allprojects');
      } else {
        navigate('/user');
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #89f7fe, #66a6ff)',
        padding: 20
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: 'white',
          padding: 32,
          borderRadius: 20,
          width: 360,
          boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
          animation: 'fadeIn 0.5s ease'
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            marginBottom: 20,
            color: '#1e3a8a',
            fontWeight: 600
          }}
        >
          Welcome Back 👋
        </h2>

        <label style={{ color: '#475569', fontSize: 14 }}>Username</label>
        <input
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: '100%',
            padding: 10,
            marginTop: 5,
            marginBottom: 15,
            borderRadius: 8,
            border: '1px solid #cbd5e1',
            outline: 'none',
            transition: '0.2s',
          }}
          onFocus={(e) => (e.target.style.borderColor = '#3b82f6')}
          onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
          required
        />

        <label style={{ color: '#475569', fontSize: 14 }}>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '100%',
            padding: 10,
            marginTop: 5,
            marginBottom: 15,
            borderRadius: 8,
            border: '1px solid #cbd5e1',
            outline: 'none',
            transition: '0.2s',
          }}
          onFocus={(e) => (e.target.style.borderColor = '#3b82f6')}
          onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
          required
        />

        {error && (
          <div style={{ color: 'red', marginBottom: 12, fontSize: 14 }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          style={{
            width: '100%',
            padding: 12,
            background: 'linear-gradient(135deg, #4f46e5, #3b82f6)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontSize: 16,
            fontWeight: 500,
            cursor: 'pointer',
            transition: '0.3s',
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.opacity = '0.9')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.opacity = '1')
          }
        >
          Login
        </button>

        <p
          style={{
            textAlign: 'center',
            marginTop: 14,
            fontSize: 14,
            color: '#475569',
          }}
        >
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#2563eb', fontWeight: 500 }}>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;


