import React, { useState } from 'react';
import './StepThree.css';
import axios from 'axios';

function StepThree() {
  const [preferredCuisine, setPreferredCuisine] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [error, setError] = useState('');

  const handleCancel = () => {
    // Handle cancel action
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      preferredCuisine,
      numberOfGuests,
      dietaryRestrictions,
      preferredDate,
    };

    try {
      const response = await axios.post(
        'https://attendapp-backend.cloud-stacks.com/api/events',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      // Handle success (e.g., redirect to next step)
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.error || 'An error occurred');
      } else {
        setError('An error occurred');
      }
    }
  };

  return (
    <div className="container">
      <div className="sidebar">
        <nav>
          <ul>
            <li>
              <span className="icon">🏠</span>
              <span>Dashboard</span>
            </li>
            <li>
              <span className="icon">📅</span>
              <span>Events</span>
            </li>
            <li>
              <span className="icon">📊</span>
              <span>Analytics</span>
            </li>
            <li>
              <span className="icon">⚙️</span>
              <span>Settings</span>
            </li>
          </ul>
        </nav>
      </div>
      <div className="main-content">
        <header>
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
          </div>
          <div className="user-profile">
            <img src="/path/to/user/image.jpg" alt="User" />
            <span>John Doe</span>
          </div>
        </header>
        <section>
          <ul className="tabs">
            <li>Basic Info</li>
            <li>Venue</li>
            <li className="active">Catering</li>
            <li>Marketing</li>
          </ul>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Preferred Cuisine</label>
              <select
                value={preferredCuisine}
                onChange={(e) => setPreferredCuisine(e.target.value)}
              >
                <option value="">Select Cuisine</option>
                <option value="Italian">Italian</option>
                <option value="Chinese">Chinese</option>
                <option value="Japanese">Japanese</option>
                <option value="Indian">Indian</option>
              </select>
            </div>
            <div className="form-group">
              <label>Number of Guests</label>
              <input
                type="number"
                placeholder="Enter number of guests"
                value={numberOfGuests}
                onChange={(e) => setNumberOfGuests(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Dietary Restrictions</label>
              <input
                type="text"
                placeholder="Enter any dietary restrictions"
                value={dietaryRestrictions}
                onChange={(e) => setDietaryRestrictions(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Preferred Date</label>
              <input
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
              />
            </div>
            {error && <div className="error">{error}</div>}
            <div className="form-buttons">
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit">Next</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default StepThree;