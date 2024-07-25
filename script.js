document.addEventListener("DOMContentLoaded", () => {
    const apikey = "2e1fb84f4c23810e848494227241150e";
    const apiurl = "https://api.openweathermap.org/data/2.5/weather?q=";

    const searchbox = document.querySelector(".search input");
    const searchbtn = document.querySelector(".search button");
    const weathericon = document.querySelector(".weather-icon");

    console.log("Script loaded successfully");

    async function checkweather(city) {
        console.log("Checking weather for:", city);
        try {
            const response = await fetch(`${apiurl}${city}&units=metric&appid=${apikey}`);
            console.log("API response status:", response.status);

            if (response.status === 404) {
                document.querySelector(".error").style.display = "block";
                document.querySelector(".weather").style.display = "none";
            } else {
                const data = await response.json();
                console.log("Weather data:", data);

                document.querySelector(".city").innerText = data.name;
                document.querySelector(".temp").innerText = Math.round(data.main.temp) + "°C";
                document.querySelector(".humidity").innerText = data.main.humidity + "%";
                document.querySelector(".wind").innerText = Math.round(data.wind.speed) + " km/h";

                switch (data.weather[0].main) {
                    case "Clouds":
                        weathericon.src = "clouds.png";
                        break;
                    case "Rain":
                        weathericon.src = "rain.png";
                        break;
                    case "Clear":
                        weathericon.src = "clear.png";
                        break;
                    case "Drizzle":
                        weathericon.src = "drizzle.png";
                        break;
                    case "Mist":
                        weathericon.src = "mist.png";
                        break;
                    default:
                        weathericon.src = "default.png";
                }

                document.querySelector(".weather").style.display = "block";
                document.querySelector(".error").style.display = "none";
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
            document.querySelector(".error").innerText = "Error fetching weather data. Please try again later.";
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        }
    }

    searchbtn.addEventListener("click", () => {
        console.log("Search button clicked");
        const city = searchbox.value.trim();
        if (city) {
            checkweather(city);
        } else {
            document.querySelector(".error").innerText = "Please enter a city name.";
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        }
    });

    console.log("Event listener added to search button");
});
var loader=document.getElementById("preloader");
window.addEventListener("load",function(){
    loader.style.display="none";
})
