import React, { useEffect, useState, useRef } from 'react';
import DriverFormHome from './components/Driver/DriverFormHome';
import DriverShowHome from './components/Driver/DriverShowHome';
import DriverUpdateForm from './components/Driver/DriverUpdateForm';
import DriverFilterForm from './components/Driver/DriverFilterForm';
import axios from 'axios';
import DriverPaging from './components/Paging.js';

function Driver() {
  const [updatedDriver, setUpdatedDriver] = useState(null);
  const [selectedDriverId, setSelectedDriverId] = useState(null);
  const [flagUpdate, setFlagUpdate] = useState(false);
  const [flagFilter, setFilter] = useState(false);
  const [sortOption, setSortOption] = useState('firstName');

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [driver, setDriver] = useState({
    id: '',
    firstName: '',
    lastName: '',
    contact: ''
  });
  const [drivers, setDrivers] = useState([]);
  const [totalDrivers, setTotalDrivers] = useState([]);

  const [filters, setFilters] = useState({
    firstName: '',
    lastName: '',
    contact: '',
    sortBy: 'FirstName',
    isAsc: true
  });


  const updateFormRef = useRef(null);
  const filterRef = useRef(null);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        getFilteredDrivers(filters);
        const responseTotalDrivers = await axios.get('https://localhost:44376/api/Driver');
        setTotalDrivers(responseTotalDrivers.data);
      } catch (error) {
        console.error('Error fetching drivers:', error);
      }
    };
    fetchDrivers();
  }, [sortOption, pageNumber, pageSize, filters]);

  useEffect(() => {
    const selectedDriver = drivers.find((driver) => driver.id === selectedDriverId);
    if (selectedDriver) {
      setUpdatedDriver(selectedDriver);
    }
  }, [selectedDriverId, drivers]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDriver((prevDriver) => ({
      ...prevDriver,
      [name]: value
    }));
  };

  const addDriver = async () => {
    try {
      if (driver.firstName === '' || driver.lastName === '' || driver.contact === '') {
        alert('Please fill out all fields correctly.');
        return;
      }
      const response = await axios.post('https://localhost:44376/api/Driver', driver);
      alert(`Driver added: \nFirst Name: ${driver.firstName}\nLast Name: ${driver.lastName}\nContact: ${driver.contact}`);
      getFilteredDrivers();
      setDriver({
        id: '',
        firstName: '',
        lastName: '',
        contact: ''
      });
    } catch (error) {
      console.error('Error adding driver:', error);
      alert('Error adding driver. Please try again.');
    }
  };

  const deleteDriver = async (id) => {
    try {
      await axios.delete(`https://localhost:44376/api/Driver/${id}`);
      const updatedDrivers = drivers.filter((driver) => driver.id !== id);
      setDrivers(updatedDrivers);
      alert('Driver has been deleted!');
    } catch (error) {
      console.error('Error deleting driver:', error);
    }
  };

  const updateDriver = (index) => {
    setFlagUpdate(true);
    setSelectedDriverId(index);

    if (updateFormRef.current) {
      updateFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const updateSelectedDriver = async (updatedDriver) => {
    try {
      if (!updatedDriver.id) {
        console.error('Error updating driver: Missing id property');
        return;
      }
      const response = await axios.put(`https://localhost:44376/api/Driver/${updatedDriver.id}`, updatedDriver);
      getFilteredDrivers();
      alert('Driver updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating driver:', error);
    }
    setFlagUpdate(false);
    setSelectedDriverId(null);
  };

  const hideAllDrivers = () => {
    try {
      setDrivers([]);
      setFlagUpdate(false);
      setSelectedDriverId(null);
    } catch (error) {
      console.error('Error hiding all drivers:', error);
    }
  };

  const showAllDrivers = async () => {
    try {
      const response = await axios.get('https://localhost:44376/api/Driver');
      setDrivers(response.data);
      setFilter(false);
      setFlagUpdate(false);
      setSelectedDriverId(null);
    } catch (error) {
      console.error('Error showing all drivers:', error);
    }
  };

  const getFilteredDrivers = async (filters) => {
    try {
      setFilters(filters);
      let queryParams = new URLSearchParams();
      for (const key in filters) {
        if (filters[key] !== undefined && filters[key] !== '') {
          queryParams.append(key, filters[key]);
        }
      }
      queryParams.append('PageNumber', pageNumber);
      queryParams.append('PageSize', pageSize);
      const url = `https://localhost:44376/api/Driver?${queryParams.toString()}`;
      const response = await axios.get(url);
      setDrivers(response.data);
    } catch (error) {
      console.error('Error fetching filtered drivers:', error);
    }
  };

  const showFilter = () => {
    setFilter(!flagFilter);

    if (filterRef.current) {
      filterRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleFilterSubmit = (filters) => {
    getFilteredDrivers(filters);
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
    <div className="DriverFormContainer">
      {flagFilter && (
        <div ref={filterRef}>
          <DriverFilterForm onSubmit={handleFilterSubmit} sortByOptions={sortBy} />
        </div>
      )}
      <DriverShowHome
        drivers={drivers}
        deleteDriver={deleteDriver}
        updateDriver={updateDriver}
        showAllDrivers={showAllDrivers}
        hideAllDrivers={hideAllDrivers}
        showFilter={showFilter}
        sortBy={sortBy}
      />
      <DriverPaging
        pageNumber={pageNumber}
        pageSize={pageSize}
        totalItems={totalDrivers.length}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
      <DriverFormHome driver={driver} handleInputChange={handleInputChange} addDriver={addDriver} />
      {flagUpdate && <DriverUpdateForm ref={updateFormRef} driver={updatedDriver} updateSelectedDriver={updateSelectedDriver} />}
    </div>
  );
}

export default Driver;
