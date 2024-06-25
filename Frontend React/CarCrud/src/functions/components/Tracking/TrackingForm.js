import React from 'react';

function TrackingForm({ isTracking, handleStartTracking, handleEndTracking, currentTime }) {
  return (
    <div>
      <button onClick={handleStartTracking} disabled={isTracking}>
        Start
      </button>
      <button onClick={handleEndTracking} disabled={!isTracking}>
        End
      </button>
      {isTracking && currentTime && (
        <div>
          <p>Current Tracking Time: {new Date(currentTime).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}

export default TrackingForm;
