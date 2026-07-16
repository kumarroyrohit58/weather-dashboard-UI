const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const cityName = document.getElementById("cityName");
const recentSearches = document.getElementById("recentSearches");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherIcon = document.getElementById("weatherIcon");
const forecastContainer = document.getElementById("forecastContainer");

const API_KEY = "8f99b84643d43e7c6a258ad30faf6451";

searchBtn.addEventListener("click", searchCity);

cityInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        searchCity();
    }
});

async function searchCity() {

    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    searchBtn.textContent = "Loading...";

    try {

        // ---------------- CURRENT WEATHER ----------------

        const weatherUrl =
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

        const weatherResponse = await fetch(weatherUrl);

        const weatherData = await weatherResponse.json();

        if (!weatherResponse.ok) {
            alert(weatherData.message);
            searchBtn.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i> Search`;
            return;
        }

        cityName.textContent = weatherData.name;
        temperature.textContent = Math.round(weatherData.main.temp) + "°C";
        condition.textContent = weatherData.weather[0].description;
        humidity.textContent = weatherData.main.humidity + "%";
        wind.textContent = weatherData.wind.speed + " m/s";

        weatherIcon.innerHTML =
            `<img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png" alt="Weather Icon">`;

        // ---------------- 5-DAY FORECAST ----------------

        const forecastUrl =
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

        const forecastResponse = await fetch(forecastUrl);

        const forecastData = await forecastResponse.json();

        const dailyForecast = forecastData.list.filter(item =>
            item.dt_txt.includes("12:00:00")
        );

        forecastContainer.innerHTML = "";

        dailyForecast.forEach(day => {

            const date = new Date(day.dt_txt);

            const dayName = date.toLocaleDateString("en-US", {
                weekday: "short"
            });

            const card = `
                <div class="forecast-card">
                    <h4>${dayName}</h4>

                    <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="Weather Icon">

                    <p>${Math.round(day.main.temp)}°C</p>

                    <small>${day.weather[0].main}</small>
                </div>
            `;

            forecastContainer.innerHTML += card;

        });

        // ---------------- RECENT SEARCHES ----------------

        const existingCities = [...recentSearches.querySelectorAll(".city-pill")];

        const alreadyExists = existingCities.some(
            pill => pill.textContent.toLowerCase() === city.toLowerCase()
        );

        if (!alreadyExists) {

            const pill = document.createElement("span");

            pill.className = "city-pill";

            pill.textContent = weatherData.name;

            pill.addEventListener("click", () => {
                cityInput.value = pill.textContent;
                searchCity();
            });

            recentSearches.prepend(pill);

        }

        cityInput.value = "";

    } catch (error) {

        alert("Something went wrong!");

        console.error(error);

    } finally {

        searchBtn.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i> Search`;

    }

}