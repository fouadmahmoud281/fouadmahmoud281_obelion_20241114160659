import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    familyName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(data.message);
        navigate('/login');
      } else {
        setErrorMessage(data.error || 'Registration failed');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginClick = () => {
    navigate('/');
  };

  return (
    <div className="register-container-unique">
      <div className="register-left-unique">
        <div className="overlay-text-unique">
          <div className="logo-unique">AttendOne</div>
          <h1>Welcome to AttendOne</h1>
          <p>Your event management solution</p>
        </div>
      </div>
      <div className="register-right-unique">
        <div className="form-container-unique">
          <h1 className="login-title-unique">Complete Your Registration</h1>
          <p className="login-sub-title-unique">Sign up new account</p>
          <form onSubmit={handleSubmit}>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
            <div className="first-last-unique">
              <div className="form-group-unique">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group-unique">
                <label htmlFor="familyName">Family Name</label>
                <input
                  type="text"
                  id="familyName"
                  name="familyName"
                  placeholder="Family Name"
                  value={formData.familyName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group-unique">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group-unique">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div className="form-group-unique">
              <label htmlFor="password">Password</label>
              <div className="password-input-unique">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <span
                  className="toggle-password-unique"
                  onClick={togglePasswordVisibility}
                >
                  <img src="/eye-slash.svg" alt="toggle visibility" />
                </span>
              </div>
            </div>
            <div className="form-group-unique">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-input-unique">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <span
                  className="toggle-password-unique"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  <img src="/eye-slash.svg" alt="toggle visibility" />
                </span>
              </div>
            </div>
            <button type="submit" className="btn-register-unique" disabled={loading}>
              {loading ? 'Registering...' : 'Sign up'}
            </button>
            <div className="Navigation">
              <span href="/reset-password" className="forgot-password-span">
              Already have account ? 
              </span>
              <a onClick={handleLoginClick} className="forgot-password-unique">
                Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
