// script.js

const API_KEY = '722b6100961084f3f1063fa4f2906ce8'; // Get your API key from OpenWeatherMap
const getWeatherButton = document.getElementById('getWeather');
const cityInput = document.getElementById('city');
const weatherInfo = document.getElementById('weatherInfo');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const condition = document.getElementById('condition');

// Function to fetch weather data
async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(response.status === 404 ? 'City not found!' : 'Failed to fetch weather data.');
    }

    return response.json();
}

// Function to update the UI
function updateWeatherInfo(data) {
    cityName.textContent = `Weather in ${data.name}`;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    condition.textContent = `Condition: ${data.weather[0].description}`;
    weatherInfo.classList.remove('hidden');
}

// Function to handle errors
function handleError(error) {
    alert(error.message);
    weatherInfo.classList.add('hidden');
}

// Event listener for button click
getWeatherButton.addEventListener('click', async () => {
    const city = cityInput.value.trim();

    if (!city) {
        alert('Please enter a city name!');
        return;
    }

    try {
        const weatherData = await fetchWeather(city);
        updateWeatherInfo(weatherData);
    } catch (error) {
        handleError(error);
    }
});
