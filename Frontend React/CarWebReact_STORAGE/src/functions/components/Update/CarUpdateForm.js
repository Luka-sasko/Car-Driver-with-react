import React, { useState } from 'react';

export default function UpdateForm({ updateCar }) {
  const [updatedCar, setUpdatedCar] = useState({
    brand: '',
    model: '',
    manufactureYear: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCar(prevCar => ({
      ...prevCar,
      [name]: value
    }));
  };

  const handleUpdate = () => {
    if (!updatedCar.brand || !updatedCar.model || !updatedCar.manufactureYear) {
      alert("Please fill out all fields.");
      return;
    }

    updateCar(updatedCar);
    
    setUpdatedCar({
      brand: '',
      model: '',
      manufactureYear: ''
    });
  };

  return (
    <>
      <h2>Update car here:</h2>
      <br/>
      <form id="carForm">
        <label htmlFor="brand">Brand:</label><br/>
        <input type="text" id="brand" name="brand" value={updatedCar.brand} onChange={handleInputChange}/><br/><br/>
        
        <label htmlFor="model">Model:</label><br/>
        <input type="text" id="model" name="model" value={updatedCar.model} onChange={handleInputChange}/><br/><br/>
        
        <label htmlFor="manufactureYear">Manufacture Year:</label><br/>
        <input type="number" id="manufactureYear" name="manufactureYear" value={updatedCar.manufactureYear} onChange={handleInputChange}/><br/><br/>
        
        <button type="button" onClick={handleUpdate}>Update car</button><br/><br/>
      </form>
    </>
  );
}
