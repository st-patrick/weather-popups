const apiKey = "434f129864a5807f3150c9657a109014";
const units = "metric";
const cities = [];

// Find city names using the query selector
const cityElements = document.querySelectorAll(".browse-data-entry.trip-link > h3");
for (const cityElement of cityElements) {
  cities.push({
    name: cityElement.innerHTML.trim(),
    element: cityElement
  });
}

// Fetch forecast information for each city
for (const city of cities) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city.name}&units=${units}&appid=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const list = data.list;

      // Create the forecast info div
      const forecastInfo = document.createElement("div");
      forecastInfo.style.position = "absolute";
      forecastInfo.style.right = "0";
      forecastInfo.style.top = "0";
      forecastInfo.style.backgroundColor = "#f2f2f2";
      forecastInfo.style.padding = "5px";
      forecastInfo.innerHTML = "";

      // Add the forecast information for each day
      for (const weatherData of list) {
        const date = new Date(weatherData.dt * 1000);
        const day = date.toLocaleDateString("en-US", {weekday: "short"});
        const weatherIcon = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
        const weatherDescription = weatherData.weather[0].description;
        const weatherTemperature = weatherData.main.temp;
        forecastInfo.innerHTML += `
          <p>${day}: ${weatherTemperature} &deg;C</p>
          <p>${weatherDescription}</p>
          <img src="${weatherIcon}" alt="${weatherDescription}" />
          <br />
        `;
      }

      // Add the forecast info div next to the city element
      city.element.parentNode.appendChild(forecastInfo);
    });
}
