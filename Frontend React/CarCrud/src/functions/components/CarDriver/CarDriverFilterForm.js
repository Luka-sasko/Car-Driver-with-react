import React, { useRef, useState, useEffect } from 'react';

const CarDriverFilterForm = ({ onSubmit, sortByOptions }) => {
  const [filters, setFilters] = useState({
    FirstName: '',
    LastName: '',
    Model: '',
    Brand: '',
    ManufacturYear: '',
    sortBy: 'FirstName',
    isAsc: true
  });

  const inputRef = useRef(null);

  useEffect(() => {
    focusInput();
  }, []);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: checked
    }));
  };

  const handleSortChange = (e) => {
    const selectedSortBy = e.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      sortBy: selectedSortBy
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(filters);
  };

  return (
    <div className="CarDriverFilterForm">
      <h2>Filter Car Drivers</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Driver First Name:
          <input type="text" name="FirstName" value={filters.driverFirstName} onChange={handleInputChange} ref={inputRef} />
        </label>
        <label>
          Driver Last Name:
          <input type="text" name="LastName" value={filters.driverLastName} onChange={handleInputChange} />
        </label>
        <label>
          Model:
          <input type="text" name="Model" value={filters.carModel} onChange={handleInputChange} />
        </label>
        <label>
          Brand:
          <input type="text" name="Brand" value={filters.carBrand} onChange={handleInputChange} />
        </label>
        <label>
          Manufacture Year:
          <input type="number" name="ManufacturYear" value={filters.carManufacturYear} onChange={handleInputChange} />
        </label>
        <label>
          Ascending Order ASC:
          <input type="checkbox" name="isAsc" checked={filters.isAsc} onChange={handleCheckboxChange} />
        </label>
        <label>
          Sort by:
          <select id="sort" onChange={handleSortChange} value={filters.sortBy}>
            <option value="FirstName">Driver First Name</option>
            <option value="LastName">Driver Last Name</option>
            <option value="Model">Model</option>
            <option value="Brand">Brand</option>
            <option value="ManufacturYear">Manufacture Year</option>
          </select>
        </label>
        <br />
        <button type="submit">Apply Filters</button>
      </form>
    </div>
  );
};

export default CarDriverFilterForm;
