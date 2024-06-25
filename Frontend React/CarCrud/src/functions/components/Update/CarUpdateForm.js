
import React, { useRef, useEffect, useState } from 'react';

const UpdateForm = React.forwardRef(({ car: initialCar, updateSelectedCar }, ref) => {
  const [car, setCar] = useState(initialCar || {});

  useEffect(() => {
    setCar(initialCar || {});
  }, [initialCar]);

  const inputRef = useRef(null);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    focusInput();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCar(prevCar => ({
      ...prevCar,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSelectedCar(car);
  };

  return (
    <form ref={ref} onSubmit={handleSubmit}>
      <h2>Update Car</h2>
      <label>
        Brand:
        <input
          type="text"
          name="brand"
          value={car.brand || ''}
          onChange={handleInputChange}
          ref={inputRef} 
        />
      </label>
      <label>
        Model:
        <input
          type="text"
          name="model"
          value={car.model || ''}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Manufacture Year:
        <input
          type="number"
          name="manufacturYear"
          value={car.manufacturYear || ''}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">Update Car</button>
    </form>
  );
});

export default UpdateForm;
