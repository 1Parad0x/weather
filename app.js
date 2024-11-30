const apiKey = "f63ff69dc9f3e3534fd44af21342db1f"
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`

const searchInput = document.querySelector(".search-input")
const searchButton = document.querySelector(".search-button")
const weatherImage = document.querySelector(".weather-icon")

async function weather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`)
    const weather = await response.json()
    console.log(weather)

    const date = new Date(weather.dt * 1000);
    const sunrise = new Date(weather.sys.sunrise * 1000)
    const sunset = new Date(weather.sys.sunset * 1000)
    document.querySelector(".date-time").innerHTML = date.toLocaleString('ru-RU')
    document.querySelector(".temperature").innerHTML = Math.round(weather.main.temp) + "°";
    document.querySelector(".city-name").innerHTML = weather.name + ", " + weather.sys.country;
    document.querySelector(".temperature-min-info").innerHTML = Math.round(weather.main.temp_max) + "°";
    document.querySelector(".temperature-max-info").innerHTML = Math.round(weather.main.temp_min) + "°";
    document.querySelector(".wind-detail").innerHTML = Math.round(weather.wind.speed) + "km/h";
    document.querySelector(".sunrice").innerHTML = sunrise.getHours() + ":" + sunrise.getMinutes();
    document.querySelector(".sunset").innerHTML = sunset.getHours() + ":" + sunset.getMinutes();
    document.querySelector(".humidity").innerHTML = weather.main.humidity + "%";

    const weatherCondition = weather.weather[0].main

    if (weatherCondition.includes("Clear")) {
        weatherImage.src = "icons/sun.png";
    } else if (weatherCondition.includes("Rain")) {
        weatherImage.src = "icons/rainy-day.png";
    } else if (weatherCondition.includes("Snow")) {
        weatherImage.src = "icons/snow.png";
    } else if (weatherCondition.includes("Clouds")) {
        weatherImage.src = "icons/cloudy.png";
    } else if (weatherCondition.includes("Fog")) {
        weatherImage.src = "icons/fog.png";
    } else if (weatherCondition.includes("Mist")) {
        weatherImage.src = "icons/fog.png";
    }
}

searchButton.addEventListener("click", () => {
    weather(searchInput.value);
    searchInput.value = "";
});

