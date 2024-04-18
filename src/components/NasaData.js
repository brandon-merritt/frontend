import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NasaData = () => {
    const [nasaData, setNasaData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNasaData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/nasa-data');
                setNasaData(response.data);
            } catch (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.error('Server responded with an error:', error.response.data);
                    setError('Server responded with an error. Please try again later.');
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error('No response received from server:', error.request);
                    setError('No response received from server. Please check your internet connection.');
                } else {
                    // Something happened in setting up the request that triggered an error
                    console.error('Error setting up the request:', error.message);
                    setError('An error occurred. Please try again later.');
                }
            }
        };

        fetchNasaData();
    }, []);

    return (
        <div>
            <h2>NASA Data</h2>
            {nasaData ? (
                <div>
                    <img src={nasaData.url} alt={nasaData.title} />
                    <h3>{nasaData.title}</h3>
                    <p>{nasaData.explanation}</p>
                </div>
            ) : (
                <p>Loading NASA data...</p>
            )}
        </div>
    );
};

export default NasaData;