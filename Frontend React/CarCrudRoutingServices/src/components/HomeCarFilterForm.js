import React, { useState } from 'react';

function FilterForm({ onSubmit, sortBy }) {
  const [filters, setFilters] = useState({
    pageNumber: 1,
    pageSize: 10,
    sortBy: '',
    isAsc: true,
    searchQuery: '',
    model: '',
    brand: '',
    manufacturYear: ''
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(filters);
    onSubmit(filters);
  };

  const handleSortChange = (e) => {
    const selectedSortBy = e.target.value;
    console.log('Selected Sort By:', selectedSortBy);
    setFilters(prevFilters => {
      const updatedFilters = {
        ...prevFilters,
        sortBy: selectedSortBy
      };
      console.log('Updated Filters:', updatedFilters);
      return updatedFilters;
    });
    sortBy(selectedSortBy); 
  };
  
  
  return (
    <>
    <form onSubmit={handleSubmit}>
      <label>
        Page Number:
        <input type="number" name="pageNumber" value={filters.pageNumber} onChange={handleInputChange} />
      </label>
      <label>
        Page Size:
        <input type="number" name="pageSize" value={filters.pageSize} onChange={handleInputChange} />
      </label>
      <br/>
      <label htmlFor="sort">Sort By:</label>
        <select id="sort" onChange={handleSortChange}>
          <option value="Model">Model</option>
          <option value="Brand">Brand</option>
          <option value="ManufacturYear">ManufacturYear</option>
        </select>
        <br/><br/>
      <label>
        Ascending Order ASC:
        <input type="checkbox" name="isAsc" checked={filters.isAsc} onChange={handleCheckboxChange} />
      </label>
      <br/><br/>
      <label>
        Search Query:
        <input type="text" name="searchQuery" value={filters.searchQuery} onChange={handleInputChange} />
      </label>
      <label>
        Model:
        <input type="text" name="model" value={filters.model} onChange={handleInputChange} />
      </label>
      <label>
        Brand:
        <input type="text" name="brand" value={filters.brand} onChange={handleInputChange} />
      </label>
      <label>
        ManufacturYear:
        <input type="number" name="manufacturYear" value={filters.manufacturYear} onChange={handleInputChange} />
      </label>
      <button type="submit">Apply Filters</button>
    </form>
    </>
  );
}

export default FilterForm;
