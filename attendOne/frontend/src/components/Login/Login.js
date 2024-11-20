import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);

  // Login state
  const [loginData, setLoginData] = useState({
    loginIdentifier: '',
    password: '',
  });
  const [loginError, setLoginError] = useState('');

  // Password reset state
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [resetError, setResetError] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleResetInputChange = (e) => {
    setResetEmail(e.target.value);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        {
          loginIdentifier: loginData.loginIdentifier,
          password: loginData.password,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      const { token } = response.data;
      localStorage.setItem('token', token);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setLoginError(error.response.data.error);
      } else {
        setLoginError('An error occurred during login.');
      }
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setResetError('');
    setResetMessage('');
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/reset-password',
        { email: resetEmail },
        { headers: { 'Content-Type': 'application/json' } }
      );
      setResetMessage(
        response.data.message ||
          'If an account with that email exists, a password reset link has been sent.'
      );
    } catch (error) {
      setResetError(
        error.response?.data?.error || 'An error occurred during password reset.'
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-background">
          <div className="login-overlay">
            <div className="login-logo">
              <h1>YourLogo</h1>
            </div>
            <div className="login-text">
              <h2>Welcome to AttendOne</h2>
              <p>Manage your events efficiently and effortlessly.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="login-right">
        <div className="login-form-container">
          {isResetPassword ? (
            <>
              <h1 className="Login-Title">Reset Password</h1>
              <p className="Login-sub-title">
                Enter your email to receive a password reset link
              </p>
              {resetMessage && <p className="success-message">{resetMessage}</p>}
              {resetError && <p className="error-message">{resetError}</p>}
              {!resetMessage && (
                <form className="reset-form" onSubmit={handleResetSubmit}>
                  <div className="form-group">
                    <label htmlFor="resetEmail">Email Address</label>
                    <input
                      type="email"
                      id="resetEmail"
                      name="email"
                      required
                      value={resetEmail}
                      onChange={handleResetInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <button type="submit">Reset Password</button>
                  </div>
                </form>
              )}
              <div className="form-toggle">
                <a onClick={() => setIsResetPassword(false)} className="switch-link">
                  Back to Login
                </a>
              </div>
            </>
          ) : (
            <>
              <h1 className="Login-Title">Welcome Back</h1>
              <p className="Login-sub-title">Sign in to your account</p>
              {loginError && <p className="error-message">{loginError}</p>}
              <form className="login-form" onSubmit={handleLoginSubmit}>
                <div className="form-group">
                  <label htmlFor="loginIdentifier">Email or Phone Number</label>
                  <input
                    type="text"
                    id="loginIdentifier"
                    name="loginIdentifier"
                    required
                    value={loginData.loginIdentifier}
                    onChange={handleLoginInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="loginPassword">Password</label>
                  <div className="password-input">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="loginPassword"
                      name="password"
                      required
                      value={loginData.password}
                      onChange={handleLoginInputChange}
                    />
                    <span
                      className="toggle-password"
                      onClick={togglePasswordVisibility}
                    >
                      <img src="/eye-slash.svg" alt="toggle visibility" />
                    </span>
                  </div>
                </div>
                <div className="form-group">
                  <a
                    onClick={() => setIsResetPassword(true)}
                    className="forgot-password"
                  >
                    Forgot Password?
                  </a>
                </div>
                <div className="form-group">
                  <button type="submit">Login</button>
                </div>
              </form>
              <div className="social-login">
                <a href="/register" className="register-link">
                  Register
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
