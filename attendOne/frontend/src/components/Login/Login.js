import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('https://attendapp-backend.cloud-stacks.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrPhone, password }),
      });
      const data = await response.json();
      if (response.ok) {
        const { token } = data;
        localStorage.setItem('token', token);
        navigate('/dashboard');
      } else {
        setError(data.error || 'An error occurred during login');
      }
    } catch (err) {
      setError('An error occurred during login');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'https://attendapp-backend.cloud-stacks.com/auth/google';
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <label>Email or Phone Number</label>
        <input
          type="text"
          value={emailOrPhone}
          onChange={(e) => setEmailOrPhone(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <button onClick={handleGoogleLogin}>Login with Google</button>
      <p><a href="/forgot-password">Forgot Password?</a></p>
      <p>Don't have an account? <a href="/register">Register here</a></p>
    </div>
  );
}

export default Login;