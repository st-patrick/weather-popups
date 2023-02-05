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

// Fetch weather information for each city
for (const city of cities) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&units=${units}&appid=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const weatherData = data.weather[0];
      const weatherIcon = `http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`;
      const weatherDescription = weatherData.description;
      const weatherTemperature = data.main.temp;

      // Create the weather info div
      const weatherInfo = document.createElement("div");
      weatherInfo.style.position = "absolute";
      weatherInfo.style.right = "0";
      weatherInfo.style.top = "0";
      weatherInfo.style.backgroundColor = "#f2f2f2";
      weatherInfo.style.padding = "5px";
      weatherInfo.innerHTML = `
        <p>${weatherTemperature} &deg;C</p>
        <p>${weatherDescription}</p>
        <img src="${weatherIcon}" alt="${weatherDescription}" />
      `;

      // Add the weather info div next to the city element
      city.element.parentNode.appendChild(weatherInfo);
    });
}
