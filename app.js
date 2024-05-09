document.getElementById('searchBtn').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value;
    const apikey = "9056a9863ca813df68416d31605956e9";
    if (!city) return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`)
 .then(response => {
        if (!response.ok) { // Check if the response was successful
            throw new Error('City not found');
        }
        return response.json();
    })
 .then(data => {
            const weatherInfo = document.getElementById('weatherInfo');
            const cityName = document.getElementById('cityName');
            const weatherCondition = data.weather[0].main; // Extract the main weather condition
            let weatherIcon = 'weather-icon.png'; // Default icon
            let weatherBackground = 'background.jpg'; // Default background

            // Logic to change the icon and background based on weather condition
            if (weatherCondition === 'Clear') {
                weatherIcon = './img/clear.png'; // Example: You can replace 'sunny.png' with your actual sunny weather icon
                weatherBackground = './img/clear.jpg'; // Example: You can replace 'clear.jpg' with your actual clear weather background
            } else if (weatherCondition === 'Clouds') {
                weatherIcon = './img/clouds.png'; // Example: You can replace 'cloudy.png' with your actual cloudy weather icon
                weatherBackground = './img/clouds.jpg'; // Example: You can replace 'clouds.jpg' with your actual cloudy weather background
            } else if (weatherCondition === 'Rain') {
                weatherIcon = './img/rain.png'; // Example: You can replace 'rainy.png' with your actual rainy weather icon
                weatherBackground = './img/rain.jpg'; // Example: You can replace 'rain.jpg' with your actual rainy weather background
            }

            // Change the body background image
            document.body.style.backgroundImage = `url(${weatherBackground})`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';

            cityName.innerHTML = city.toUpperCase() ;
            // Display the weather icon and information
            weatherInfo.innerHTML = `
                <img src="${weatherIcon}" height="170px" weight="170px" alt="Weather Icon">
                <p>Temperature: ${Math.round(data.main.temp)}°C</p>
                <p>Feels Like: ${Math.round(data.main.feels_like)}°C</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Weather: ${data.weather[0].description}</p>
            `;
            weatherInfo.classList.add('slideIn');
        })
 .catch(error => {
        const weatherInfo = document.getElementById('weatherInfo');
        weatherInfo.innerHTML = `<p>${error.message}</p>`; // Display the error message
    });
});

// Add event listener for the Enter key press in the cityInput field
document.getElementById('cityInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default form submission behavior
        document.getElementById('searchBtn').click(); // Trigger the searchBtn click event
    }
});
