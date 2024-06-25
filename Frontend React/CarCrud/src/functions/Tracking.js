import React, { useEffect, useState } from 'react';
import TrackingForm from './components/Tracking/TrackingForm';
import axios from 'axios';
import TrackingShow from './components/Tracking/TrackingShow';

function Tracking() {
    
  const [carDrivers, setCarDrivers] = useState([]);
  const [selectedCarDriverId, setSelectedCarDriverId] = useState('');
  const [trackings, setTrackings] = useState([]);
  const [isTracking, setIsTracking] = useState(false);
  const [currentTracking, setCurrentTracking] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    const fetchCarDrivers = async () => {
      try {
        const response = await axios.get('https://localhost:44376/api/cardriver');
        setCarDrivers(response.data);
      } catch (error) {
        console.error('Error fetching car drivers:', error);
      }
    };

    const savedTrackings = JSON.parse(localStorage.getItem('trackings')) || [];
    setTrackings(savedTrackings);
    fetchCarDrivers();
  }, []);

  useEffect(() => {
    localStorage.setItem('trackings', JSON.stringify(trackings));
  }, [trackings]);

  useEffect(() => {
    let timer;
    if (isTracking) {
      timer = setInterval(() => {
        setCurrentTime(new Date().toISOString());
      }, 1000);
    } else {
      clearInterval(timer);
      setCurrentTime(null);
    }
    return () => clearInterval(timer);
  }, [isTracking]);

  const handleStartTracking = () => {
    if (selectedCarDriverId) {
      const selectedDriver = carDrivers.find(driver => driver.carId === parseInt(selectedCarDriverId));
      const newTracking = {
        id: Date.now(),
        carDriverId: selectedDriver.carId,
        driverFirstName: selectedDriver.driverFirstName,
        driverLastName: selectedDriver.driverLastName,
        carModel: selectedDriver.carModel,
        carBrand: selectedDriver.carBrand,
        startTime: new Date().toISOString(),
        endTime: null,
      };
      setCurrentTracking(newTracking);
      setIsTracking(true);
    } else {
      alert('Please select a Car Driver to start tracking.');
    }
  };

  const handleEndTracking = () => {
    if (isTracking && currentTracking) {
      const updatedTracking = {
        ...currentTracking,
        endTime: new Date().toISOString(),
      };
      setTrackings([...trackings, updatedTracking]);
      setCurrentTracking(null);
      setIsTracking(false);
    }
  };
  return (
    <div className="TrackingContainer">
      <h2>Tracking</h2>
      <div>
        <label>Select Car Driver: </label>
        <select onChange={(e) => setSelectedCarDriverId(e.target.value)} value={selectedCarDriverId}>
          <option value="">Select a Car Driver</option>
          {carDrivers.map((driver) => (
            <option key={driver.carId} value={driver.carId}>
              {driver.driverFirstName} {driver.driverLastName} - {driver.carModel} {driver.carBrand}
            </option>
          ))}
        </select>
      </div>
      <TrackingForm 
        isTracking={isTracking}
        handleStartTracking={handleStartTracking}
        handleEndTracking={handleEndTracking}
        currentTime={currentTime}
      />

    <TrackingShow  trackings={trackings} />

    </div>
  );
}

export default Tracking;
