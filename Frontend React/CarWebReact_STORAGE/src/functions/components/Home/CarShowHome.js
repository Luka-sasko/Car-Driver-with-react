import React from 'react';

export default function CarShow({ cars, deleteCar, updateCar, showAllCars, hideAllCars }) {
  return (
    <div>
      <button onClick={() => showAllCars()}>Show cars</button>
      <button onClick={() => hideAllCars()}>Hide cars</button>
      <h3>List of cars:</h3>
      <ul className='CarShow'>
        <br/>
        {cars.map((car, index) => (
          <li key={index}>
            {car.brand} {car.model} ({car.manufactureYear})
            <button onClick={() => deleteCar(index)}>Delete</button>
            <button onClick={() => updateCar(index)}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
