import React, { useState, useEffect } from 'react';
import './AddOrganizer.css';
import axios from 'axios';

function AddOrganizer() {
  const [organizers, setOrganizers] = useState([]);
  const [newOrganizer, setNewOrganizer] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchOrganizers = async () => {
      try {
        const response = await axios.get('https://attendapp-backend.cloud-stacks.com/api/organizers');
        setOrganizers(response.data);
      } catch (error) {
        console.error('Failed to fetch organizers:', error);
      }
    };

    fetchOrganizers();
  }, []);

  const handleAddOrganizer = async () => {
    if (newOrganizer.trim() !== '') {
      try {
        const response = await axios.post(
          'https://attendapp-backend.cloud-stacks.com/api/organizers',
          { name: newOrganizer },
          { headers: { 'Content-Type': 'application/json' } }
        );
        setOrganizers([...organizers, response.data]);
        setNewOrganizer('');
      } catch (error) {
        console.error('Failed to add organizer:', error);
      }
    }
  };

  const handlePermissionChange = async (id, module) => {
    const organizer = organizers.find((o) => o.id === id);
    if (!organizer) return;

    const updatedPermissions = { ...organizer, [module]: !organizer[module] };

    try {
      const response = await axios.put(
        `https://attendapp-backend.cloud-stacks.com/api/organizers/${id}`,
        { [module]: updatedPermissions[module] },
        { headers: { 'Content-Type': 'application/json' } }
      );
      const updatedOrganizers = organizers.map((o) =>
        o.id === id ? response.data : o
      );
      setOrganizers(updatedOrganizers);
    } catch (error) {
      console.error('Failed to update organizer:', error);
    }
  };

  const handleDeleteOrganizer = async (id) => {
    try {
      await axios.delete(
        `https://attendapp-backend.cloud-stacks.com/api/organizers/${id}`
      );
      setOrganizers(organizers.filter((o) => o.id !== id));
    } catch (error) {
      console.error('Failed to delete organizer:', error);
    }
  };

  const filteredOrganizers = organizers.filter((organizer) =>
    organizer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="main-container">
      <header>
        <div className="logo-section">
          <img src="logo.png" alt="Logo" />
        </div>
        <div className="profile-section">
          <p>User Profile</p>
        </div>
      </header>
      <nav>
        <ul>
          <li>Dashboard</li>
          <li>Events</li>
          <li>Organizers</li>
          <li>Settings</li>
        </ul>
      </nav>
      <main>
        <div className="top-bar">
          <input
            type="text"
            placeholder="Search organizers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <input
            type="text"
            placeholder="Organizer Name"
            value={newOrganizer}
            onChange={(e) => setNewOrganizer(e.target.value)}
          />
          <button onClick={handleAddOrganizer}>Add Organizer</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Organizer Name</th>
              <th>Module A</th>
              <th>Module B</th>
              <th>Module C</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrganizers.map((organizer) => (
              <tr key={organizer.id}>
                <td>{organizer.name}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={organizer.moduleA}
                    onChange={() =>
                      handlePermissionChange(organizer.id, 'moduleA')
                    }
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={organizer.moduleB}
                    onChange={() =>
                      handlePermissionChange(organizer.id, 'moduleB')
                    }
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={organizer.moduleC}
                    onChange={() =>
                      handlePermissionChange(organizer.id, 'moduleC')
                    }
                  />
                </td>
                <td>
                  <button>Edit</button>
                  <button onClick={() => handleDeleteOrganizer(organizer.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default AddOrganizer;