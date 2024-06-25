import React from 'react';
import "./carShow.css"

const CarShowHome = ({ cars, deleteCar, updateCar, showAllCars, hideAllCars, showFilter }) => {
  return (
    <div>
      <h2>All Cars</h2>
      <button onClick={showAllCars}>Show All Cars</button>
      <button onClick={hideAllCars}>Hide All Cars</button>
      <button onClick={showFilter}>Filter</button>
      {cars.length === 0 ? (
        <p></p>
      ) : (


        <div className="car-table">
          <div className="car-table-header">
            <span>Car Type</span>
            <span id="year">Manufactur Year</span>
            <span>   </span>
          </div>
          <ul className="car-list">
            {cars.map((car, index) => (
              <li key={index} className="car-item">
                <span className="car-brand-model">{car.brand} {car.model}</span>
                <span className="car-year">{car.manufacturYear}</span>
                <div className="car-actions">
                  <button onClick={() => deleteCar(car.id)}>Delete</button>
                  <button onClick={() => updateCar(car.id)}>Update</button>
                </div>
              </li>
            ))}
          </ul>
        </div>



      )}
    </div>
  );
};

export default CarShowHome;
