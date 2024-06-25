import React from 'react';
import "./driverShow.css";
const DriverShowHome = ({ drivers, deleteDriver, updateDriver, showAllDrivers, hideAllDrivers, showFilter }) => {
  return (
    <div className="driver-show-home">
      <h2>Driver List</h2>
      <div className="driver-show-home-buttons">
        <button onClick={showAllDrivers}>Show All Drivers</button>
        <button onClick={hideAllDrivers}>Hide All Drivers</button>
        <button onClick={showFilter}>Filter Drivers</button>
      </div>
      <div className="driver-table-container">
        <table className="driver-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <tr key={driver.id}>
                <td>{driver.firstName}</td>
                <td>{driver.lastName}</td>
                <td>{driver.contact}</td>
                <td>
                  <button onClick={() => updateDriver(driver.id)}>Update</button>
                  <button onClick={() => deleteDriver(driver.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DriverShowHome;
