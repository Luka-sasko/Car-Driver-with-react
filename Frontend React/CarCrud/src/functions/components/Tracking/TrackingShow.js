import React, { useState, useEffect } from 'react';

function TrackingShow({ trackings }) {
    const [savedTrackings, setSavedTrackings] = useState([]);
    const [savedTrackingsFlag, setSavedTrackingsFlag] = useState(true);

    useEffect(() => {
        showSavedTracking();
    }, [savedTrackingsFlag]);

    const saveTracking = (tracking) => {
        const sessionTrackings = JSON.parse(sessionStorage.getItem('sessionTrackings')) || [];
        sessionTrackings.push(tracking);
        sessionStorage.setItem('sessionTrackings', JSON.stringify(sessionTrackings));
        setSavedTrackingsFlag(!savedTrackingsFlag);
    };

    const showSavedTracking = () => {
        const sessionTrackings = JSON.parse(sessionStorage.getItem('sessionTrackings')) || [];
        setSavedTrackings(sessionTrackings);
    };

    const hideSavedTracking = () => {
        setSavedTrackings([]);
    }

    return (
        <div>
            <h3>Tracking Sessions</h3>
            <ul>
                {trackings.map((tracking) => {
                    const startTime = new Date(tracking.startTime);
                    const endTime = tracking.endTime ? new Date(tracking.endTime) : null;
                    const totalTime = endTime ? ((endTime - startTime) / 1000).toFixed(2) : null;
                    return (
                        <li key={tracking.id}>
                            <p>
                                Driver & Car: {tracking.driverFirstName} {tracking.driverLastName} with {tracking.carBrand} - {tracking.carModel}
                            </p>
                            <p>Start Time: {startTime.toLocaleString()}</p>
                            <p>End Time: {endTime ? endTime.toLocaleString() : 'In Progress'}</p>
                            <p>Total Time (s): {totalTime !== null ? totalTime : 'In Progress'}</p>
                            <button onClick={() => saveTracking(tracking)}>Save tracking</button>
                        </li>
                    );
                })}
            </ul>
            <div>
                <button onClick={showSavedTracking}>Show saved trackings</button>
                <button onClick={hideSavedTracking}>Hide saved trackings</button>
                <ul>
                    {savedTrackings.map((savedTracking, index) => (
                        <li key={index}>
                            <p>
                                Saved Tracking {index + 1}:
                                Driver & Car: {savedTracking.driverFirstName} {savedTracking.driverLastName} with {savedTracking.carBrand} - {savedTracking.carModel}
                            </p>
                            <p> Start Time: {new Date(savedTracking.startTime).toLocaleString()}</p>
                            <p> End Time : {savedTracking.endTime ? new Date(savedTracking.endTime).toLocaleString() : 'In Progress'}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default TrackingShow;
