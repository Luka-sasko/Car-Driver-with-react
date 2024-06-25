import React from 'react';
import UpdateForm from './CarUpdateForm';


export default function Update({ car, updateSelectedCar }) {
  return (
    <UpdateForm car={car} updateSelectedCar={updateSelectedCar} />
  );
}

