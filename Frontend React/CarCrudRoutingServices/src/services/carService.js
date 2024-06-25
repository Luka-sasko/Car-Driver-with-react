import axios from 'axios';


export const addNewCar = async (carData) => {
  try {
    const response = await axios.post(`https://localhost:44376/api/Car`, carData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCarById = async (carId) => {
  try {
    await axios.delete(`https://localhost:44376/api/Car/${carId}`);
  } catch (error) {
    throw error;
  }
};

export const updateCarById = async (carId, updatedCarData) => {
  try {
    const response = await axios.put(`https://localhost:44376/api/Car/${carId}`, updatedCarData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCar = async (updatedCarData) => {
  try {
    const { id, ...rest } = updatedCarData;
    const response = await axios.put(`https://localhost:44376/api/Car/${id}`, rest);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const showFilteredCars = async (filters) => {
  try {
    let queryParams = new URLSearchParams();
    for (const key in filters) {
      if (filters[key] || filters[key] === false) {
        queryParams.append(key, filters[key]);
      }
    }
    const url = `https://localhost:44376/api/Car?${queryParams.toString()}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};