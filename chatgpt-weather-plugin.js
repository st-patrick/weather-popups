async function fetchWeather(city) {
  const API_KEY = "434f129864a5807f3150c9657a109014";
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );
  const data = await response.json();
  return data;
}

function getForecast(data) {
  const forecast = [];
  const days = {
    Mon: [],
    Tue: [],
    Wed: [],
    Thu: [],
    Fri: [],
    Sat: [],
    Sun: [],
  };
  for (let i = 0; i < data.list.length; i++) {
    const date = new Date(data.list[i].dt * 1000);
    const day = date.toString().split(" ")[0];
    days[day].push(data.list[i]);
  }
  for (let day in days) {
    let maxTemp = -Infinity;
    let avgTemp = 0;
    for (let i = 0; i < days[day].length; i++) {
      avgTemp += days[day][i].main.temp / days[day].length;
      maxTemp = Math.max(maxTemp, days[day][i].main.temp);
    }
    forecast.push({
      day: day.substring(0, 3),
      avgTemp: avgTemp.toFixed(1),
      maxTemp: maxTemp.toFixed(1),
    });
  }
  return forecast;
}

async function main() {
	// Get the elements that match the query selector
	const cityElements = Array.from(document.querySelectorAll(".browse-data-entry.trip-link > h3"));


	// Loop through the city names
	for (const cityElement of cityElements) {
		// Code to get the weather info and display it in a div goes here
		const city = cityElement.innerHTML;
		const data = await fetchWeather(city);
		const forecast = getForecast(data);
		let table = "<table>";
		table += "<tr><th>Day</th><th>Avg Temp</th><th>Max Temp</th></tr>";
		for (let i = 0; i < forecast.length; i++) {
		table += `<tr><td>${forecast[i].day}</td><td>${forecast[i].avgTemp}°C</td><td>${forecast[i].maxTemp}°C</td></tr>`;
		}
		table += "</table>";
		const div = document.createElement("div");
		div.innerHTML = table;
		div.style.position = "absolute";
		div.style.right = "0";
		div.style.top = "0";
      	// Add the forecast info div next to the city element
      	cityElement.parentNode.appendChild(div);
	}
	

}

main();