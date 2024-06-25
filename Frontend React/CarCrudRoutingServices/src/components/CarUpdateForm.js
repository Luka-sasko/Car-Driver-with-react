import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Nav from './Nav.js';
import { updateCarById, showFilteredCars } from '../services/carService.js';

export default function UpdateForm() {
  const { id } = useParams();
  const [updatedCar, setUpdatedCar] = useState({
    id: id,
    brand: '',
    model: '',
    manufacturYear: ''
  });


  const updateSelectedCar = async (updatedCar) => {
    try {
      console.log(updatedCar);
      if (!updatedCar.id) {
        console.error('Error updating car: Missing id property');
        return;
      }
      const response = await updateCarById(updatedCar.id, updatedCar);
      if (response) {
        console.log('Car updated successfully:', response);  
      } else {
        console.error('Error updating car: No response received');
      }
      showFilteredCars();
    } catch (error) {
      console.error('Error updating car:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCar(prevCar => ({
      ...prevCar,
      [name]: value
    }));
  };

  const handleUpdate = () => {
    if (!updatedCar.brand || !updatedCar.model || !updatedCar.manufacturYear) {
      const message = `Please fill out all fields.`;
      alert(message);
      return;
    }
    updateSelectedCar(updatedCar);
  };

  return (
    <>
      <Nav />
      <h2>Update car here:</h2>
      <br />
      <form id="carForm">
        <label htmlFor="brand">Brand:</label><br />
        <input type="text" id="brand" name="brand" value={updatedCar.brand} onChange={handleInputChange} /><br /><br />

        <label htmlFor="model">Model:</label><br />
        <input type="text" id="model" name="model" value={updatedCar.model} onChange={handleInputChange} /><br /><br />

        <label htmlFor="manufacturYear">ManufacturYear:</label><br />
        <input type="number" id="manufacturYear" name="manufacturYear" value={updatedCar.manufacturYear} onChange={handleInputChange} /><br /><br />

        <button type="button" onClick={handleUpdate}>Update car</button><br /><br />
      </form>
    </>
  );
}
