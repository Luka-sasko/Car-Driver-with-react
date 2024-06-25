import '../styles/Update.css';
import React from 'react';
import UpdateFormById from '../components/CarUpdateFromById.js';
import NavBar from '../components/UpdateNav.js';
import { updateCar } from '../services/carService.js';

export default function Update() {

  const updatedCar = async (updatedCarData) => {
    try {
      if (!updatedCarData.id) {
        console.error('Error updating car: Missing id property');
        return;
      }
      const response = await updateCar(updatedCarData);
      if (response) {
        console.log('Car updated successfully:', response);
        alert('Car updated successfully: \n' + JSON.stringify(response, null, 2));
      } else {
        console.error('Error updating car: No response received');
      }
    } catch (error) {
      console.error('Error updating car:', error);
    }
  };
  

  return (
    <>
      <NavBar />
      <UpdateFormById updateCar={updatedCar} />
    </>
  );
}
