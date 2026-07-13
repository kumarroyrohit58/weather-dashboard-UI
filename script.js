const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const cityName = document.getElementById("cityName");
const recentSearches = document.getElementById("recentSearches");

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

    // Update the displayed city name
    cityName.textContent = city;

    // Prevent duplicate recent searches
    const existingCities = [...recentSearches.querySelectorAll(".city-pill")];

    const alreadyExists = existingCities.some(
        pill => pill.textContent.toLowerCase() === city.toLowerCase()
    );

    if (!alreadyExists) {
        const pill = document.createElement("span");
        pill.className = "city-pill";
        pill.textContent = city;

        pill.addEventListener("click", () => {
            cityName.textContent = pill.textContent;
        });

        recentSearches.prepend(pill);
    }

    cityInput.value = "";
}