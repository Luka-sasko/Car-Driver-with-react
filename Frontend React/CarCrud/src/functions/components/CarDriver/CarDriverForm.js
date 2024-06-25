import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CarDriverForm = ({ onCarDriverAdded }) => {
  const [carId, setCarId] = useState('');
  const [driverId, setDriverId] = useState('');
  const [cars, setCars] = useState([]);
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    fetchCars();
    fetchDrivers();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await axios.get('https://localhost:44376/api/car');
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const fetchDrivers = async () => {
    try {
      const response = await axios.get('https://localhost:44376/api/driver');
      setDrivers(response.data);
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`https://localhost:44376/api/cardriver/${carId}/driver/${driverId}`);
      if (typeof onCarDriverAdded === 'function') {
        onCarDriverAdded(); 
      }
      alert('Car driver added successfully!');
      setCarId('');
      setDriverId('');
    } catch (error) {
      console.error('Error adding car driver:', error);
      alert('Failed to add car driver');
    }
  };
  

  return (
    <div>
      <h2>Add Car Driver</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Select Car:
          <select value={carId} onChange={(e) => setCarId(e.target.value)} required>
            <option value="">Select a car</option>
            {cars.map((car) => (
              <option key={car.id} value={car.id}>{car.brand} {car.model} ({car.manufacturYear})</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Select Driver:
          <select value={driverId} onChange={(e) => setDriverId(e.target.value)} required>
            <option value="">Select a driver</option>
            {drivers.map((driver) => (
              <option key={driver.id} value={driver.id}>{driver.firstName} {driver.lastName}</option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit">Add Car Driver</button>
      </form>
    </div>
  );
};

export default CarDriverForm;
