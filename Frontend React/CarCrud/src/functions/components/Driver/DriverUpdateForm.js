import React, { forwardRef, useState, useEffect } from 'react';

const DriverUpdateForm = forwardRef(({ driver, updateSelectedDriver }, ref) => {
  const [updatedDriver, setUpdatedDriver] = useState(driver || {});

  useEffect(() => {
    setUpdatedDriver(driver || {});
  }, [driver]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDriver((prevDriver) => ({
      ...prevDriver,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSelectedDriver(updatedDriver);
  };

  return (
    <div className="DriverFormContainer" ref={ref}>
      <h2>Update Driver</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" name="firstName" value={updatedDriver.firstName || ''} onChange={handleInputChange} />
        </label>
        <label>
          Last Name:
          <input type="text" name="lastName" value={updatedDriver.lastName || ''} onChange={handleInputChange} />
        </label>
        <label>
          Contact:
          <input type="text" name="contact" value={updatedDriver.contact || ''} onChange={handleInputChange} />
        </label>
        <button type="submit">Update Driver</button>
      </form>
    </div>
  );
});

export default DriverUpdateForm;
