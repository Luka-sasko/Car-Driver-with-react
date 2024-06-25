import React, { useEffect, useState } from 'react';
import CarFormHome from './components/Home/CarFormHome.js';
import CarShowHome from './components/Home/CarShowHome.js';
//import Update from './components/Update/Update.js';
import UpdateClass from './UpdateClass.js';

function Home() {
  const [selectedCarIndex, setSelectedCarIndex] = useState(null);
  const [flagUpdate, setFlagUpdate] = useState(false);
  const [car, setCar] = useState({
    id: '',
    brand: '',
    model: '',
    manufactureYear: ''
  });
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const loadCarsFromLocalStorage = () => {
      const storedCars = JSON.parse(localStorage.getItem("cars"));
      if (storedCars) {
        setCars(storedCars);
      }
    };
    loadCarsFromLocalStorage();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCar(prevCar => ({
      ...prevCar,
      [name]: value
    }));
  };

  const addCar = () => {
    if (car.brand === "" || car.model === "" || !(car.manufactureYear >= 1900 && car.manufactureYear <= 2024)) {
      alert("Please fill out all fields correctly.");
      return;
    }

    const updatedAddedCars = [...cars, car];
    setCars(updatedAddedCars);
    localStorage.setItem("cars", JSON.stringify(updatedAddedCars));

    setCar({
      id: '',
      brand: '',
      model: '',
      manufactureYear: ''
    });
  };

  const deleteCar = (index) => {
    const updatedCars = [...cars];
    updatedCars.splice(index, 1);
    setCars(updatedCars);
    localStorage.setItem("cars", JSON.stringify(updatedCars));
    setFlagUpdate(false);

  };

  const updateCar = (index) => {
    setFlagUpdate(true);
    setSelectedCarIndex(index);
    alert('car needs update!');
  };

  const updateSelectedCar = (updatedCar) => {
    if (selectedCarIndex !== null) {
      const updatedCars = [...cars];
      updatedCars[selectedCarIndex] = updatedCar;
      setCars(updatedCars);
      localStorage.setItem("cars", JSON.stringify(updatedCars));
      setFlagUpdate(false);
      setSelectedCarIndex(null);
    }
  };

  const hideAllCars = () => {
    setCars([]);
    setFlagUpdate(false);
  };

  const showAllCars = () => {
    const storedCars = JSON.parse(localStorage.getItem("cars"));
    if (storedCars) {
      setCars(storedCars);
    }
    setFlagUpdate(false);
  };

  return (
    <>
      <CarShowHome cars={cars} deleteCar={deleteCar} updateCar={updateCar} showAllCars={showAllCars} hideAllCars={hideAllCars} />
      <CarFormHome car={car} handleInputChange={handleInputChange} addCar={addCar} />
      {/* {flagUpdate && <Update updateSelectedCar={updateSelectedCar}/>} */}
      {flagUpdate && <UpdateClass updateCar={updateSelectedCar}/>} 

    </>
  );
}

export default Home;
