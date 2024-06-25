import React, { useState } from 'react';

export default function UpdateForm({ updateCar }) {
  const [updatedCar, setUpdatedCar] = useState({
    id: '',
    brand: '',
    model: '',
    manufacturYear: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCar(prevCar => ({
      ...prevCar,
      [name]: value
    }));
  };

  const handleUpdate = () => {
    if (!updatedCar.brand || !updatedCar.model || !updatedCar.manufacturYear || !updatedCar.id) {
      const message = `Please fill out all fields.`;
      alert(message);
      return;
    }
    updateCar(updatedCar);

    setUpdatedCar({
      id: '',
      brand: '',
      model: '',
      manufacturYear: ''
    });
  };

  return (
    <>
      <h2>Update car here:</h2>
      <br/>
      <form id="carForm">

        <label htmlFor="id">Car ID:</label><br/>
        <input type="text" id="id" name="id" value={updatedCar.id} onChange={handleInputChange}/><br/><br/>
  
        <label htmlFor="brand">Brand:</label><br/>
        <input type="text" id="brand" name="brand" value={updatedCar.brand} onChange={handleInputChange}/><br/><br/>
        
        <label htmlFor="model">Model:</label><br/>
        <input type="text" id="model" name="model" value={updatedCar.model} onChange={handleInputChange}/><br/><br/>
        
        <label htmlFor="manufacturYear">ManufacturYear:</label><br/>
        <input type="number" id="manufacturYear" name="manufacturYear" value={updatedCar.manufacturYear} onChange={handleInputChange}/><br/><br/>
        
        <button type="button" onClick={handleUpdate}>Update car</button><br/><br/>
      </form>
    </>
  );
}
