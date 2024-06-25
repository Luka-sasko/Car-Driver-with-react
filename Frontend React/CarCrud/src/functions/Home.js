import React, { useEffect, useState, useRef } from 'react';

import CarFormHome from './components/Home/CarFormHome.js';
import CarShowHome from './components/Home/CarShowHome.js';
import UpdateForm from './components/Update/CarUpdateForm.js';
import axios from 'axios';
import CarFilterForm from './components/Home/CarFilterForm.js';
import CarPaging from './components/Paging.js';

function Home() {
  const [updatedCar, setUpdatedCar] = useState(null);
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [flagUpdate, setFlagUpdate] = useState(false);
  const [flagFilter, setFilter] = useState(false);
  const [sortOption, setSortOption] = useState('model');

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [car, setCar] = useState({
    id: '',
    model: '',
    brand: '',
    manufacturYear: ''
  });
  const [cars, setCars] = useState([]);
  const [totalCars, setTotalCars] = useState([]);
  const updateFormRef = useRef(null);
  const filterRef = useRef(null);

  const [filters, setFilters] = useState({
    sortBy: '',
    isAsc: true,
    searchQuery: '',
    model: '',
    brand: '',
    manufacturYear: ''
  });

  useEffect(() => {
    const fetchCars = async () => {
      try {
        getFilteredCars(filters);
        const responseTotalCars = await axios.get(`https://localhost:44376/api/Car`);
        setTotalCars(responseTotalCars.data)


      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };
    fetchCars();
  }, [sortOption, pageNumber, pageSize, filters]);

  useEffect(() => {
    const selectedCar = cars.find((car) => car.id === selectedCarId);
    if (selectedCar) {
      setUpdatedCar(selectedCar);
    }
  }, [selectedCarId, cars]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCar((prevCar) => ({
      ...prevCar,
      [name]: value
    }));
  };

  const addCar = async () => {
    try {
      if (
        car.brand === '' ||
        car.model === '' ||
        !(car.manufacturYear >= 1900 && car.manufacturYear <= 2024)
      ) {
        alert('Please fill out all fields correctly.');
        return;
      }
      await axios.post('https://localhost:44376/api/Car', car);
      alert(
        `Car added: \nBrand: ${car.brand}\nModel: ${car.model}\nManufacture Year: ${car.manufacturYear}`
      );
      getFilteredCars();
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
      await axios.delete(`https://localhost:44376/api/Car/${id}`);
      const updatedCars = cars.filter((car) => car.id !== id);
      setCars(updatedCars);
      alert('Car has been deleted!');
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  const updateCar = (index) => {
    setFlagUpdate(true);
    setSelectedCarId(index);

    if (updateFormRef.current) {
      updateFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const updateSelectedCar = async (updatedCar) => {
    try {
      if (!updatedCar.id) {
        console.error('Error updating car: Missing id property');
        return;
      }
      const response = await axios.put(`https://localhost:44376/api/Car/${updatedCar.id}`, updatedCar);
      getFilteredCars();
      alert('Car updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating car:', error);
    }
    setFlagUpdate(false);
    setSelectedCarId(null);
  };

  const hideAllCars = () => {
    try {
      setCars([]);
      setFlagUpdate(false);
      setSelectedCarId(null);
    } catch (error) {
      console.error('Error hiding all cars:', error);
    }
  };

  const showAllCars = async () => {
    try {
      const response = await axios.get('https://localhost:44376/api/Car');
      setCars(response.data);
      setFilter(false);
      setFlagUpdate(false);
      setSelectedCarId(null);
    } catch (error) {
      console.error('Error showing all cars:', error);
    }
  };

  const getFilteredCars = async (filters) => {
    try {
      setFilters(filters);
      let queryParams = new URLSearchParams();
      for (const key in filters) {
        if (filters[key] || filters[key] === false) {
          queryParams.append(key, filters[key]);
        }
      }
      queryParams.append('PageNumber', pageNumber);
      queryParams.append('PageSize', pageSize);
      const url = `https://localhost:44376/api/Car?${queryParams.toString()}`;
      const response = await axios.get(url);
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching filtered cars:', error);
    }
  };

  const showFilter = () => {
    setFilter(!flagFilter);

    if (filterRef.current) {
      filterRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleFilterSubmit = (filters) => {
    getFilteredCars(filters);
  };

  const sortBy = (option) => {
    setSortOption(option);
  };

  const handlePageChange = (newPageNumber) => {
    setPageNumber(newPageNumber);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setPageNumber(1);
  };

  return (
    <div className="CarFormContainer">
      {flagFilter && (
        <div ref={filterRef}>
          <CarFilterForm onSubmit={handleFilterSubmit} sortBy={sortBy} />
        </div>
      )}
      <CarShowHome
        cars={cars}
        deleteCar={deleteCar}
        updateCar={updateCar}
        showAllCars={showAllCars}
        hideAllCars={hideAllCars}
        showFilter={showFilter}
      />
      <CarPaging
        pageNumber={pageNumber}
        pageSize={pageSize}
        totalItems={totalCars.length}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />

      <CarFormHome car={car} handleInputChange={handleInputChange} addCar={addCar} />
      {flagUpdate && <UpdateForm ref={updateFormRef} car={updatedCar} updateSelectedCar={updateSelectedCar} />}
    </div>
  );
}

export default Home;
