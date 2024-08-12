import React from 'react';

const WeatherComponent = ({ weatherData }) => {
    // Extract relevant data
    const { name, sys, dt } = weatherData;
    const { country, sunrise, sunset } = sys;

    // Convert UNIX timestamp to milliseconds
    const sunriseTime = new Date(sunrise * 1000);
    const sunsetTime = new Date(sunset * 1000);
    const currentTime = new Date(dt * 1000);

    
    const formatDate = (date) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        const day = days[date.getDay()];
        const month = months[date.getMonth()];
        const dayOfMonth = date.getDate();
        const year = date.getFullYear();
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // Handle midnight (0 AM)

        return `${day}, ${month} ${dayOfMonth}, ${year} at ${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
    };

    return (
        <div>
            {/* <h1>Weather in {name}, {country}</h1>
            <p>Sunrise: {formatDate(sunriseTime)}</p>
            <p>Sunset: {formatDate(sunsetTime)}</p> */}
            <p>{formatDate(currentTime)}</p>
        </div>
    );
};

export default WeatherComponent;
