import React from 'react';
import { Link } from 'react-router-dom';
const CarShowHome = ({ cars, deleteCar, showAllCars, hideAllCars,showFilter}) => {
  return (
    <div className='CarShowHome'>
      <h2>All Cars</h2>
      <button onClick={showAllCars}>Show All Cars</button>
      <button onClick={showFilter}>Filter</button>
      <button onClick={hideAllCars}>Hide All Cars</button>
      {cars.length === 0 ? (
        <p></p>
      ) : (
        <ul>
          {cars.map((car, index) => (
            <li key={index}>
              <br/><br/>
              {car.brand} {car.model} ({car.manufacturYear}  )
              <button onClick={() => deleteCar(car.id)}>Delete</button>
              <Link to={`/update/${car.id}`}>
                <button>Update</button>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CarShowHome;
