import React, { useState } from 'react';
import './AttendeeManagement.css';

const AttendeeManagement = () => {
  const [firstName, setFirstName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [invitationType, setInvitationType] = useState('');

  const generatePassword = (length) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const resetForm = () => {
    setFirstName('');
    setFamilyName('');
    setCompany('');
    setPosition('');
    setEmail('');
    setMobileNumber('');
    setCountry('');
    setCity('');
    setInvitationType('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const password = generatePassword(8);
    const attendeeData = {
      first_name: firstName,
      family_name: familyName,
      company: company,
      position: position,
      email: email,
      password: password,
      mobile_number: mobileNumber,
      country: country,
      city: city,
      invitation_type: invitationType,
    };
    try {
      const response = await fetch('https://attendapp-backend.cloud-stacks.com/api/attendees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(attendeeData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        alert('Error: ' + errorData.error);
      } else {
        alert('Attendee invited successfully');
        resetForm();
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="attendee-management-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          {/* Logo Placeholder */}
        </div>
        <ul className="nav-items">
          <li><i className="icon-dashboard"></i><span>Dashboard</span></li>
          <li><i className="icon-agenda"></i><span>Agenda</span></li>
          <li className="active"><i className="icon-attendees"></i><span>Attendees</span></li>
          <li><i className="icon-budget"></i><span>Budget</span></li>
          <li><i className="icon-invitation-content"></i><span>Invitation Content</span></li>
          <li><i className="icon-event-page"></i><span>Event page</span></li>
          <li><i className="icon-venues"></i><span>Venues</span></li>
          <li><i className="icon-suppliers"></i><span>Suppliers</span></li>
          <li><i className="icon-invoices"></i><span>Invoices</span></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Navigation */}
        <div className="top-nav">
          <div className="search-bar">
            <input type="text" placeholder="Search" />
          </div>
          <div className="user-profile">
            <div className="user-image">
              <span>ME</span>
            </div>
            <span className="user-name">Mohamed El Nahwi</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <div className="tab active">Invite</div>
          <div className="tab">Bulk Invitation</div>
        </div>

        {/* Form Section */}
        <div className="form-section">
          <form onSubmit={handleSubmit}>
            <div className="form-columns">
              {/* Left Column */}
              <div className="form-column">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    placeholder="Enter First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Company</label>
                  <input
                    type="text"
                    placeholder="Enter Company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Country</label>
                  <input
                    type="text"
                    placeholder="Enter Country"
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
                    <option value="">Select Invitation Type</option>
                    <option value="Type A">Type A</option>
                    <option value="Type B">Type B</option>
                  </select>
                </div>
              </div>

              {/* Right Column */}
              <div className="form-column">
                <div className="form-group">
                  <label>Family Name</label>
                  <input
                    type="text"
                    placeholder="Enter Family Name"
                    value={familyName}
                    onChange={(e) => setFamilyName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Position</label>
                  <input
                    type="text"
                    placeholder="Enter Position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Mobile Number</label>
                  <input
                    type="text"
                    placeholder="Enter Mobile Number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    placeholder="Enter City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="form-actions">
              <button type="button" className="cancel-button" onClick={resetForm}>Cancel</button>
              <button type="submit" className="invite-button">Invite</button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default AttendeeManagement;