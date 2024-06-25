import React, { useRef, useEffect, useState } from 'react';

const CarFilterForm = ({ onSubmit, sortBy }) => {
  const [filters, setFilters] = useState({
    sortBy: '',
    isAsc: true,
    searchQuery: '',
    model: '',
    brand: '',
    manufacturYear: ''
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
    setFilters(prevFilters => ({
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
    setFilters(prevFilters => ({
      ...prevFilters,
      sortBy: selectedSortBy
    }));
    sortBy(selectedSortBy);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(filters);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Filter Cars</h2>
      <label htmlFor="sort">Sort By:</label>
      <select id="sort" onChange={handleSortChange}>
        <option value="Model">Model</option>
        <option value="Brand">Brand</option>
        <option value="ManufacturYear">ManufacturYear</option>
      </select>
      <br /><br />
      <label>
        Ascending Order ASC:
        <input type="checkbox" name="isAsc" checked={filters.isAsc} onChange={handleCheckboxChange} />
      </label>
      <br /><br />
      <label>
        Model:
        <input
          type="text"
          name="model"
          value={filters.model}
          onChange={handleInputChange}
          ref={inputRef}
        />
      </label>
      <label>
        Brand:
        <input
          type="text"
          name="brand"
          value={filters.brand}
          onChange={handleInputChange}
        />
      </label>
      <label>
        ManufacturYear:
        <input
          type="number"
          name="manufacturYear"
          value={filters.manufacturYear}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">Apply Filters</button>
    </form>
  );
};

export default CarFilterForm;
