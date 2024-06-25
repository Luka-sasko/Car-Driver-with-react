import React, { useRef, useState, useEffect } from 'react';

const DriverFilterForm = ({ onSubmit, sortByOptions }) => {
  const [filters, setFilters] = useState({
    firstName: '',
    lastName: '',
    contact: '',
    isAsc: true,
    sortBy: 'FirstName'
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
    <div className="DriverFilterForm">
      <h2>Filter Drivers</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" name="firstName" value={filters.firstName} onChange={handleInputChange} ref={inputRef} y />
        </label>
        <label>
          Last Name:
          <input type="text" name="lastName" value={filters.lastName} onChange={handleInputChange} />
        </label>
        <label>
          Contact:
          <input type="text" name="contact" value={filters.contact} onChange={handleInputChange} />
        </label>
        <label>
          Ascending Order ASC:
          <input type="checkbox" name="isAsc" checked={filters.isAsc} onChange={handleCheckboxChange} />
        </label>
        <label>
          Sort by:
          <select id="sort" onChange={handleSortChange} value={filters.sortBy}>
            <option value="FirstName">First Name</option>
            <option value="LastName">Last Name</option>
            <option value="Contact">Contact</option>
          </select>
        </label>
        <br />
        <button type="submit">Apply Filters</button>
      </form>
    </div>
  );
};

export default DriverFilterForm;
