import React, { useState } from 'react';
import './StepFour.css';

function StepFour() {
  const [additionalServices, setAdditionalServices] = useState('');
  const [serviceDate, setServiceDate] = useState('');
  const [staffNumber, setStaffNumber] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!additionalServices || !serviceDate || !staffNumber) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    const data = {
      eventName: 'Event Name Placeholder',
      eventType: 'seminar',
      eventDate: serviceDate,
      attendees: parseInt(staffNumber),
      additionalServices,
    };

    fetch('https://attendapp-backend.cloud-stacks.com/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || 'Failed to create event');
        }
        return response.json();
      })
      .then((data) => {
        setSuccessMessage('Event created successfully');
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
            <i className="icon-dashboard"></i> Dashboard
          </li>
          <li>
            <i className="icon-events"></i> Events
          </li>
          <li>
            <i className="icon-venues"></i> Venues
          </li>
          <li>
            <i className="icon-suppliers"></i> Suppliers
          </li>
        </ul>
      </nav>

      <div className="main-content">
        <header>
          <input type="text" placeholder="Search..." />
          <div className="user-profile">
            <img src="user.jpg" alt="User" />
            <span>Organizer Name</span>
          </div>
        </header>

        <section>
          <ul className="tabs">
            <li>Basic Info</li>
            <li>Venue</li>
            <li>Catering</li>
            <li>Marketing</li>
          </ul>

          {errorMessage && <p className="error">{errorMessage}</p>}
          {successMessage && <p className="success">{successMessage}</p>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="additionalServices">Select Additional Services</label>
              <select
                id="additionalServices"
                value={additionalServices}
                onChange={(e) => setAdditionalServices(e.target.value)}
              >
                <option value="">Choose Service</option>
                <option value="photography">Photography</option>
                <option value="audioVisual">Audio Visual</option>
                <option value="decor">Decoration</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="serviceDate">Service Date</label>
              <input
                type="date"
                id="serviceDate"
                value={serviceDate}
                onChange={(e) => setServiceDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="staffNumber">Number of Staff Required</label>
              <input
                type="number"
                id="staffNumber"
                min="1"
                value={staffNumber}
                onChange={(e) => setStaffNumber(e.target.value)}
              />
            </div>

            <div className="button-group">
              <button type="button">Cancel</button>
              <button type="submit">Next</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default StepFour;