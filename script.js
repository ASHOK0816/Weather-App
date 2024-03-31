document.addEventListener('DOMContentLoaded', () => {
    const getWeatherBtn = document.getElementById('get-weather-btn');
    const weatherInfo = document.getElementById('weather-info');

    getWeatherBtn.addEventListener('click', () => {
        getWeather()
            .then(displayWeather)
            .catch(error => {
                console.log('Error fetching weather data:', error);
                weatherInfo.innerHTML = '<p>Unable to fetch weather data. Please try again later.</p>';
            });
    });

    async function getWeather() {
        const position = await getPosition();
        const { latitude, longitude } = position.coords;
        const apiKey = 'YOUR_API_KEY'; // Replace with your API key
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Unable to fetch weather data');
        }
        return response.json();
    }

    async function getPosition() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }

    function displayWeather(data) {
        weatherInfo.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
        `;
    }
});
