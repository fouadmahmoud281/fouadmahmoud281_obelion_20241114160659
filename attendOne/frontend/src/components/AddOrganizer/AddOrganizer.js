import React, { useState } from 'react';
import './AddOrganizer.css';

function AddOrganizer() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName]  = useState('');
  const [email, setEmail]        = useState('');
  const [role, setRole]          = useState('');
  const [password, setPassword]  = useState('');
  const [error, setError]        = useState('');
  const [success, setSuccess]    = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await fetch('https://attendapp-backend.cloud-stacks.com/api/organizers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          role: role,
          password: password
        }),
      });
      if (response.ok) {
        setSuccess('Organizer added successfully');
        setFirstName('');
        setLastName('');
        setEmail('');
        setRole('');
        setPassword('');
      } else {
        const data = await response.json();
        setError(data.error || 'An error occurred');
      }
    } catch {
      setError('An error occurred');
    }
  };

  return (
    <div className="container">
      <nav className="sidebar">
        <ul>
          <li>My Events</li>
          <li>Organizers</li>
          <li>Insights</li>
          <li>Settings</li>
        </ul>
      </nav>
      <div className="main-content">
        <header>
          <input type="text" placeholder="Search" />
          <div className="profile">
            <img src="path_to_profile_image" alt="Profile" />
            <span>Mohamed El Nahwi</span>
          </div>
        </header>
        <section className="content">
          <div className="title">
            <h1>Organizers</h1>
          </div>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e)=>setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e)=>setLastName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Role</label>
              <select value={role} onChange={(e)=>setRole(e.target.value)}>
                <option value="">Select Organizer Role</option>
                <option value="Admin">Admin</option>
                <option value="Coordinator">Coordinator</option>
                <option value="Volunteer">Volunteer</option>
              </select>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>
            <div className="button-group">
              <button type="button" className="cancel-btn">Cancel</button>
              <button type="submit" className="add-btn">Add Organizer</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default AddOrganizer;