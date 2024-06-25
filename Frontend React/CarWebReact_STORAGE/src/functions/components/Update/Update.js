import React from 'react';
import UpdateForm from './CarUpdateForm';

function Update({ updateSelectedCar }) {
  return (
    <div>
      <br/>
      <UpdateForm updateCar={updateSelectedCar} /> 
    </div>
  );
}

export default Update;
