import React from 'react';
import './CarDriverShow.css';

const CarDriverShow = ({ carDrivers, deleteCarDriver }) => {

  const handleDelete = async (carId, driverId) => {
    try {
      await deleteCarDriver(carId, driverId);
    } catch (error) {
      console.error('Error deleting car driver:', error);
    }
  };
  
  return (
    <div className="car-drivers-container">
      <h2>Car Drivers List</h2>
      {carDrivers.length === 0 ? (
        <p>No car drivers to display.</p>
      ) : (
        <ul className="car-drivers-list">
          {carDrivers.map((carDriver) => (
            <li key={`${carDriver.carId}-${carDriver.driverId}`} className="car-driver-item">
              <div>
                <strong>{carDriver.driverFirstName} {carDriver.driverLastName}</strong> - {carDriver.carBrand} {carDriver.carModel} ({carDriver.carManufacturYear})
              </div>
              <div>
                <button onClick={() => handleDelete(carDriver.carId, carDriver.driverId)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CarDriverShow;
