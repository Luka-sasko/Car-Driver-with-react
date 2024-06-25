import React, { useEffect, useState, useRef, useCallback } from 'react';
import CarDriverForm from './components/CarDriver/CarDriverForm';
import CarDriverShow from './components/CarDriver/CarDriverShow';
import CarDriverFilterForm from './components/CarDriver/CarDriverFilterForm';
import CarDriverPaging from './components/Paging';
import axios from 'axios';

function CarDriver() {
  const [flagFilter, setFilter] = useState(false);
  const [showCarDrivers, setShowCarDrivers] = useState(true);

  const [sortOption, setSortOption] = useState('driverFirstName');
  const [carDriver, setCarDriver] = useState({ carId: '', driverId: '' });
  const [carDrivers, setCarDrivers] = useState([]);
  const [totalCarDrivers, setTotalCarDrivers] = useState(0);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [filters, setFilters] = useState({
    FirstName: '',
    LastName: '',
    Model: '',
    Brand: '',
    ManufacturYear: '',
    sortBy: '',
    isAsc: true
  });

  const filterRef = useRef(null);

  const fetchCarDrivers = useCallback(async () => {
    try {
      const response = await axios.get('https://localhost:44376/api/cardriver');
      setTotalCarDrivers(response.data.length);
      getFilteredCarDrivers(filters);
    } catch (error) {
      console.error('Error fetching car drivers:', error);
    }
  }, [filters]);

  useEffect(() => {
    fetchCarDrivers();
  }, [fetchCarDrivers, sortOption, pageNumber, pageSize]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarDriver((prevCarDriver) => ({ ...prevCarDriver, [name]: value }));
  };

  const addCarDriver = async () => {
    try {
      if (carDriver.carId === '' || carDriver.driverId === '') {
        alert('Please fill out all fields correctly.');
        return;
      }
      await axios.post('https://localhost:44376/api/cardriver', carDriver);
      alert(`Car driver added:\nCar ID: ${carDriver.carId}\nDriver ID: ${carDriver.driverId}`);
      getFilteredCarDrivers(filters);
      setCarDriver({ carId: '', driverId: '' });
    } catch (error) {
      console.error('Error adding car driver:', error);
    }
  };

  const deleteCarDriver = async (carId, driverId) => {
    try {
      await axios.delete(`https://localhost:44376/api/cardriver/${carId}/driver/${driverId}`);
      setCarDrivers((prevCarDrivers) => 
        prevCarDrivers.filter((carDriver) => !(carDriver.carId === carId && carDriver.driverId === driverId))
      );
      alert('Car driver has been deleted!');
    } catch (error) {
      console.error('Error deleting car driver:', error);
    }
  };

  const getFilteredCarDrivers = async (filters) => {
    setFilters(filters);
    try {
      let queryParams = new URLSearchParams();
      for (const key in filters) {
        if (filters[key] !== undefined && filters[key] !== '') {
          queryParams.append(key, filters[key]);
        }
      }
      queryParams.append('PageNumber', pageNumber);
      queryParams.append('PageSize', pageSize);
      const url = `https://localhost:44376/api/cardriver?${queryParams.toString()}`;
      console.log(URL);
      const response = await axios.get(url);
      setCarDrivers(response.data);
    } catch (error) {
      console.error('Error fetching filtered car drivers:', error);
    }
  };

  const showFilter = () => {
    setFilter((prevFlagFilter) => !prevFlagFilter);
    if (filterRef.current) {
      filterRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleFilterSubmit = (filters) => {
    getFilteredCarDrivers(filters);
  };

  const toggleShowCarDrivers = () => {
    setShowCarDrivers((prevShowCarDrivers) => !prevShowCarDrivers);
  };

  const sortBy = (option) => {
    setSortOption(option);
  };

  const handlePageChange = (newPageNumber) => {
    setPageNumber(newPageNumber);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
  };

  return (
    <div className="CarDriverFormContainer">
      {flagFilter && (
        <div ref={filterRef}>
          <CarDriverFilterForm onSubmit={handleFilterSubmit} sortByOptions={sortBy} />
        </div>
      )}
      <button onClick={toggleShowCarDrivers}>
        {showCarDrivers ? 'Hide Car Drivers' : 'Show Car Drivers'}
      </button>
      <button onClick={showFilter}>
        {flagFilter ? 'Hide filters' : 'Show filters'}
      </button>
      {showCarDrivers && (
        <CarDriverShow
          carDrivers={carDrivers}
          deleteCarDriver={deleteCarDriver}
          showFilter={showFilter}
        />
      )}

      <CarDriverPaging
        pageNumber={pageNumber}
        pageSize={pageSize}
        totalItems={totalCarDrivers}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
      <CarDriverForm
        carDriver={carDriver}
        handleInputChange={handleInputChange}
        addCarDriver={addCarDriver}
      />
    </div>
  );
}

export default CarDriver;
