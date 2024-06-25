import React from 'react';

const DriverFormHome = ({ driver, handleInputChange, addDriver }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    addDriver();
  };

  return (
    <div className="driver-form">
      <h2>Add New Driver</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            id="id"
            name="id"
            value={driver.id}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={driver.firstName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={driver.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact">Contact:</label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={driver.contact}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Add Driver</button>
      </form>
    </div>
  );
};

export default DriverFormHome;
