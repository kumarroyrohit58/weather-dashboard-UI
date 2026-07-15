const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const cityName = document.getElementById("cityName");
const recentSearches = document.getElementById("recentSearches");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherIcon = document.getElementById("weatherIcon");

const API_KEY = "8f99b84643d43e7c6a258ad30faf6451";

searchBtn.addEventListener("click", searchCity);

cityInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        searchCity();
    }
});

function searchCity() {
    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {

            console.log(data);

            cityName.textContent = data.name;

            temperature.textContent = data.main.temp + "°C";

            condition.textContent = data.weather[0].description;

            humidity.textContent = data.main.humidity + "%";

            wind.textContent = data.wind.speed + " m/s";
        })
        .catch(error => {
            console.log(error);
        })
}
