import '../styles/Home.css';
import React, { useEffect, useState } from 'react';
import CarFormHome from '../components/CarFormHome.js';
import CarShowHome from '../components/CarShowHome.js';
import NavBar from '../components/HomeNav.js';
import {addNewCar, deleteCarById, showFilteredCars } from '../services/carService.js';
import CarFilterForm from '../components/HomeCarFilterForm.js';


function Home() {

  const [selectedCarId, setSelectedCarId] = useState(null);
  const [flagFilter, setFilter] = useState(false);
  const [sortOption, setSortOption] = useState('model');
  const [car, setCar] = useState({
    id: '',
    model: '',
    brand: '',
    manufacturYear: ''
  });
  const [cars, setCars] = useState([]);

  useEffect(() => {
    showCars();
  }, [sortOption]);

  useEffect(() => {
    const selectedCar = cars.find(car => car.id === selectedCarId);
    if (selectedCar) {
    }
  }, [selectedCarId, cars]);

  const showCars = async () => {
    try {
      const carsData = await showFilteredCars();
      setCars(carsData);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCar(prevCar => ({
      ...prevCar,
      [name]: value
    }));
  };

  const addCar = async () => {
    try {
      console.log(car);
      if (car.brand === "" || car.model === "" || !(car.manufacturYear >= 1900 && car.manufacturYear <= 2024)) {
        alert("Please fill out all fields correctly.");
        return;
      }
      const newCar = await addNewCar(car);
      setCars([...cars, newCar]);
      setCar({
        id: '',
        brand: '',
        model: '',
        manufacturYear: ''
      });
    } catch (error) {
      console.error('Error adding car:', error);
    }
  };

  const deleteCar = async (id) => {
    try {
      await deleteCarById(id);
      const updatedCars = cars.filter(car => car.id !== id);
      setCars(updatedCars);
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  const hideAllCars = () => {
    try {
      setCars([]);
      setSelectedCarId(null);
    } catch (error) {
      console.error('Error hiding all cars:', error);
    }
  };

  const showAllCarsFunction = async () => { 
    try {
      showCars();
      setFilter(false);
      setSelectedCarId(null);
    } catch (error) {
      console.error('Error showing all cars:', error);
    }
  };

  const getFilteredCars = async (filters) => {
    try {
      const filteredCars = await showFilteredCars(filters);
      setCars(filteredCars);
    } catch (error) {
      console.error('Error fetching filtered cars:', error);
    }
  };

  const showFilter = () => {
    setFilter(!flagFilter);
  };

  const handleFilterSubmit = (filters) => {
    console.log(filters);
    getFilteredCars(filters);
  };

  const sortBy = (option) => {
    setSortOption(option);
  };

  return (
    <>
      <NavBar/>
      {flagFilter && <CarFilterForm onSubmit={handleFilterSubmit} sortBy={sortBy} />}
      <CarShowHome cars={cars} deleteCar={deleteCar} showAllCars={showAllCarsFunction} hideAllCars={hideAllCars} showFilter={showFilter} />
      <CarFormHome car={car} handleInputChange={handleInputChange} addCar={addCar} />
    </>
  );

}

export default Home;
