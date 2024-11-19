import React, { useState } from 'react';
import './StepOne.css';

function StepOne() {
  const [eventName, setEventName] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [attendees, setAttendees] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eventData = {
      eventName,
      eventType,
      eventDate,
      attendees: parseInt(attendees),
    };

    try {
      const response = await fetch('https://attendapp-backend.cloud-stacks.com/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'An error occurred while creating the event.');
      } else {
        // Move to the next step or perform any action needed on success
        // For example, you can clear the form or redirect to another page
        setEventName('');
        setEventType('');
        setEventDate('');
        setAttendees('');
        setError('');
        // Proceed to the next step
      }
    } catch (err) {
      setError('An error occurred while connecting to the server.');
    }
  };

  return (
    <div className="container">
      <nav className="sidebar">
        <div className="logo">
          <h1>Attend.</h1>
        </div>
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
            <span className="icon">⚙️</span>
            <span>Settings</span>
          </li>
        </ul>
      </nav>
      <div className="main-content">
        <header>
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
          </div>
          <div className="user-profile">
            <img src="user-image-url" alt="User" />
            <span>User Name</span>
          </div>
        </header>
        <section>
          <ul className="tabs">
            <li className="active">Basic Info</li>
            <li>Venue</li>
            <li>Catering</li>
            <li>Marketing</li>
          </ul>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="eventName">Event Name</label>
              <input
                type="text"
                id="eventName"
                name="eventName"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="eventType">Event Type</label>
              <select
                id="eventType"
                name="eventType"
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                required
              >
                <option value="">Select Type</option>
                <option value="conference">Conference</option>
                <option value="seminar">Seminar</option>
                <option value="webinar">Webinar</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="eventDate">Event Date</label>
              <input
                type="date"
                id="eventDate"
                name="eventDate"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="attendees">Number of Attendees</label>
              <input
                type="number"
                id="attendees"
                name="attendees"
                value={attendees}
                onChange={(e) => setAttendees(e.target.value)}
                required
                min="1"
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="form-buttons">
              <button type="button" className="cancel-button">
                Cancel
              </button>
              <button type="submit" className="next-button">
                Next
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default StepOne;