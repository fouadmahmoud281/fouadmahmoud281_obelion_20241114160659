import React, { useState } from 'react';
import './Invitation.css';

function Invitation() {
  const [firstName, setFirstName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [invitationType, setInvitationType] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    const attendeeData = {
      first_name: firstName,
      family_name: familyName,
      company: company,
      position: position,
      email: email,
      mobile_number: mobileNumber,
      country: country,
      city: city,
      invitation_type: invitationType,
    };
    try {
      const response = await fetch('https://attendapp-backend.cloud-stacks.com/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(attendeeData),
      });
      if (response.ok) {
        setSuccessMessage('Invitation sent successfully.');
        setFirstName('');
        setFamilyName('');
        setCompany('');
        setPosition('');
        setEmail('');
        setMobileNumber('');
        setCountry('');
        setCity('');
        setInvitationType('');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Failed to send invitation.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="invitation-container">
      <aside className="sidebar">
        <ul className="navigation-menu">
          <li>
            <a href="#">
              <span className="icon-placeholder"></span>
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="icon-placeholder"></span>
              <span>Agenda</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="icon-placeholder"></span>
              <span>Attendees</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="icon-placeholder"></span>
              <span>Budget</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="icon-placeholder"></span>
              <span>Invitation Content</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="icon-placeholder"></span>
              <span>Event page</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="icon-placeholder"></span>
              <span>Venues</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="icon-placeholder"></span>
              <span>Suppliers</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="icon-placeholder"></span>
              <span>Invoices</span>
            </a>
          </li>
        </ul>
      </aside>
      <div className="main-content">
        <header className="top-navigation">
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
          </div>
          <div className="user-profile">
            <div className="user-image-placeholder">ME</div>
            <span>Mohamed El Nahwi</span>
          </div>
        </header>
        <div className="main-content-area">
          <div className="tabs">
            <button className="tab active">Invite</button>
            <button className="tab">Bulk Invitation</button>
          </div>
          <form className="invitation-form" onSubmit={handleSubmit}>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
            <div className="form-columns">
              <div className="left-column">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Company</label>
                  <input
                    type="text"
                    placeholder="Company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Country</label>
                  <input
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Invitation Type</label>
                  <select
                    value={invitationType}
                    onChange={(e) => setInvitationType(e.target.value)}
                  >
                    <option value="">Select Type</option>
                    <option value="Type1">Type1</option>
                    <option value="Type2">Type2</option>
                    <option value="Type3">Type3</option>
                  </select>
                </div>
              </div>
              <div className="right-column">
                <div className="form-group">
                  <label>Family Name</label>
                  <input
                    type="text"
                    placeholder="Family Name"
                    value={familyName}
                    onChange={(e) => setFamilyName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Position</label>
                  <input
                    type="text"
                    placeholder="Position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Mobile Number</label>
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="form-actions">
              <button type="button" className="cancel-button">Cancel</button>
              <button type="submit" className="invite-button">Invite</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Invitation;