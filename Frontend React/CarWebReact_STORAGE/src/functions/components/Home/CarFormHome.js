import React from 'react';

export default function CarForm({ car, handleInputChange, addCar }) {
  return (
    <div>
      <h2>Add new car here:</h2>
      <br/>
      <form id="carForm">
        <label htmlFor="id">Id:</label><br />
        <input type="text" id="id" name="id" value={car.id} onChange={handleInputChange} /><br /><br />

        <label htmlFor="brand">Brand:</label><br />
        <input type="text" id="brand" name="brand" value={car.brand} onChange={handleInputChange} /><br /><br />

        <label htmlFor="model">Model:</label><br />
        <input type="text" id="model" name="model" value={car.model} onChange={handleInputChange} /><br /><br />

        <label htmlFor="manufactureYear">Manufacture Year:</label><br />
        <input type="number" id="manufactureYear" name="manufactureYear" value={car.manufactureYear} onChange={handleInputChange} /><br /><br />

        <button type="button" onClick={addCar}>Add car</button><br /><br />
      </form>
    </div>
  );
}
