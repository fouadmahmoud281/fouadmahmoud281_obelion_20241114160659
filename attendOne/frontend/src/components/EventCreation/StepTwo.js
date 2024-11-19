import React, { useState } from 'react';
import './StepTwo.css';

function StepTwo() {
  const [venue, setVenue] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleVenueChange = (e) => {
    setVenue(e.target.value);
  };

  const handleEventDateChange = (e) => {
    setEventDate(e.target.value);
  };

  const handleGuestCountChange = (e) => {
    setGuestCount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const eventData = {
      eventName: 'Default Event',
      eventType: 'conference',
      eventDate: eventDate,
      attendees: parseInt(guestCount, 10),
    };

    fetch('https://attendapp-backend.cloud-stacks.com/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.error || 'An error occurred');
          });
        }
        return response.json();
      })
      .then((data) => {
        // Handle success (e.g., redirect to dashboard)
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="container">
      <nav className="sidebar">
        <ul>
          <li>
            <span className="icon"></span>
            <span className="text">Dashboard</span>
          </li>
          <li>
            <span className="icon"></span>
            <span className="text">Events</span>
          </li>
          <li>
            <span className="icon"></span>
            <span className="text">Venues</span>
          </li>
          <li>
            <span className="icon"></span>
            <span className="text">Catering</span>
          </li>
          <li>
            <span className="icon"></span>
            <span className="text">Marketing</span>
          </li>
        </ul>
      </nav>
      <div className="main-content">
        <header>
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
          </div>
          <div className="user-profile">
            <div className="user-image">
              <img src="user.jpg" alt="User" />
            </div>
            <div className="user-name">John Doe</div>
          </div>
        </header>
        <section>
          <ul className="tabs">
            <li>Basic Info</li>
            <li className="active">Venue</li>
            <li>Catering</li>
            <li>Marketing</li>
          </ul>
          {errorMessage && <div className="error">{errorMessage}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="venue">Select Venue</label>
              <select id="venue" name="venue" value={venue} onChange={handleVenueChange}>
                <option value="">Select a venue</option>
                <option value="venue1">Venue 1</option>
                <option value="venue2">Venue 2</option>
                <option value="venue3">Venue 3</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="event-date">Event Date</label>
              <input
                type="date"
                id="event-date"
                name="event-date"
                value={eventDate}
                onChange={handleEventDateChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="guest-count">Number of Guests</label>
              <input
                type="number"
                id="guest-count"
                name="guest-count"
                value={guestCount}
                onChange={handleGuestCountChange}
              />
            </div>
            <div className="form-buttons">
              <button type="button">Cancel</button>
              <button type="submit">Next</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default StepTwo;