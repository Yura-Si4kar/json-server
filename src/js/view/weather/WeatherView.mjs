'use strict';
const weatherBlock = document.querySelector('.case-weather');

export default function loadWeather(e) {
    weatherBlock.innerHTML = `
    <div class="weather__loading">
        <img src="./img/loading.gif" alt="Loading...">
    </div>`;

    navigator.geolocation.getCurrentPosition(showPosition);

    async function showPosition(position) {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;

        const server = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat.toFixed(2)}&lon=${long.toFixed(2)}&appid=08ea5a38d22551f446579fd0136e6518`;
        const response = await fetch(server, {
            method: 'GET',
        });
        const responseResult = await response.json();
        if (response.ok) {
            getWeather(responseResult);
        } else {
            weatherBlock.innerHTML = responseResult.message;
        }
    }
}

function getWeather(data) {
    const location = data.name;
    const temp = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like);
    const weatherStatus = data.weather[0].main;
    const weatherIcon = data.weather[0].icon;

    const template = `<div class="weather">
    <div class="weather__header">
        <div class="weather__main">
            <div class="weather__city">${location}</div>
            <div class="weather__icon">
                <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="Clouds" width="80" height="80">
            </div>
        </div>
        <div class="weather__status">${weatherStatus}</div>
        <div class="weather__temp">${temp}</div>
        <div class="weather__feels-like">Feals like: ${feelsLike}</div>
    </div>
    </div>`;

    weatherBlock.innerHTML = template;
}
