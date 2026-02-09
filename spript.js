const form = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");
const statusEl = document.getElementById("status");
const currentEl = document.getElementById("current");
const forecastEl = document.getElementById("forecast");
const forecastGrid = document.getElementById("forecast-grid");
const themeToggle = document.getElementById("theme-toggle");

const placeEl = document.getElementById("place");
const descEl = document.getElementById("desc");
const tempEl = document.getElementById("temp");
const feelsEl = document.getElementById("feels");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const currentIconEl = document.getElementById("current-icon");

// Demo mode: no API key needed.
const COUNTRY_CODE = "NP";

const MOCK_CITIES = {
	Kathmandu: { temp: 22, feels: 21, humidity: 58, wind: 2.4, desc: "clear" },
	Pokhara: { temp: 24, feels: 24, humidity: 64, wind: 1.8, desc: "cloudy" },
	Lalitpur: { temp: 21, feels: 20, humidity: 55, wind: 2.1, desc: "haze" },
	Biratnagar: { temp: 27, feels: 28, humidity: 68, wind: 2.9, desc: "humid" },
	Bharatpur: { temp: 25, feels: 25, humidity: 61, wind: 2.2, desc: "sunny" },
};

const THEME_KEY = "weather-theme";

function applyTheme(theme) {
	document.body.setAttribute("data-theme", theme);
	const isLight = theme === "light";
	themeToggle.setAttribute("ar ia-pressed", String(isLight ));
	themeToggle.textContent = isLight ? "Dark mode" : "Light mode";
}

function getIconForCondition(condition) {
	const value = condition.toLowerCase();
	if (value.includes("thunder") || value.includes("storm")) {
		return "⛈️";
	}
	if (value.includes("rain") || value.includes("drizzle")) {
		return "🌧️";
	}
	if (value.includes("snow")) {
		return "❄️";
	}
	if (value.includes("fog") || value.includes("mist") || value.includes("haze")) {
		return "🌫️";
	}
	if (value.includes("cloud")) {
		return "☁️";
	}
	if (value.includes("clear") || value.includes("sun")) {
		return "☀️";
	}
	return "🌤️";
}

function renderForecastSkeleton() {
	forecastGrid.innerHTML = "";
	for (let i = 0; i < 4; i += 1) {
		const card = document.createElement("div");
		card.className = "forecast-card";

		const line1 = document.createElement("div");
		line1.className = "skeleton-line lg";
		const line2 = document.createElement("div");
		line2.className = "skeleton-line md";
		const line3 = document.createElement("div");
		line3.className = "skeleton-line sm";
		const line4 = document.createElement("div");
		line4.className = "skeleton-line sm";

		card.appendChild(line1);
		card.appendChild(line2);
		card.appendChild(line3);
		card.appendChild(line4);
		forecastGrid.appendChild(card);
	}
}

function setLoading(isLoading) {
	if (isLoading) {
		currentEl.hidden = false;
		forecastEl.hidden = false;
		currentEl.classList.add("is-loading");
		renderForecastSkeleton();
		return;
	}

	currentEl.classList.remove("is-loading");
}

function setStatus(message, isError) {
	statusEl.textContent = message;
	statusEl.style.color = isError ? "#fca5a5" : "var(--muted)";
}


function showCurrent(data) {
	placeEl.textContent = data.name + ", " + data.sys.country;
	descEl.textContent = data.weather[0].description;
	currentIconEl.textContent = getIconForCondition(data.weather[0].description);
	tempEl.textContent = Math.round(data.main.temp);
	feelsEl.textContent = Math.round(data.main.feels_like);
	humidityEl.textContent = data.main.humidity;
	windEl.textContent = data.wind.speed.toFixed(1);
	currentEl.hidden = false;
}

function showForecast(list) {
	forecastGrid.innerHTML = "";

	for (let i = 0; i < 4; i += 1) {
		const item = list[i];
		const card = document.createElement("div");
		card.className = "forecast-card";

		const time = new Date(item.dt * 1000).toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
		});
		const icon = getIconForCondition(item.weather[0].main);

		card.innerHTML =
			"<strong>" +
			time +
			"</strong>" +
			"<span class=\"forecast-icon\" aria-hidden=\"true\">" +
			icon +
			"</span>" +
			"<span>" +
			item.weather[0].main +
			"</span>" +
			"<span>" +
			Math.round(item.main.temp) +
			"°C</span>" +
			"<span>Humidity " +
			item.main.humidity +
			"%</span>";

		forecastGrid.appendChild(card);
	}

	forecastEl.hidden = false;
}

function makeMockForecast(baseTemp) {
	const list = [];
	for (let i = 0; i < 4; i += 1) {
		list.push({
			dt: Math.floor(Date.now() / 1000) + i * 3 * 60 * 60,
			main: {
				temp: baseTemp + (i % 2 === 0 ? 1 : -1),
				humidity: 55 + i * 3,
			},
			weather: [{ main: i % 2 === 0 ? "Clear" : "Clouds" }],
		});
	}
	return list;
}

function makeMockCurrent(city) {
	const info = MOCK_CITIES[city] || {
		temp: 23,
		feels: 23,
		humidity: 60,
		wind: 2.0,
		desc: "clear",
	};

	return {
		name: city,
		sys: { country: COUNTRY_CODE },
		weather: [{ description: info.desc }],
		main: {
			temp: info.temp,
			feels_like: info.feels,
			humidity: info.humidity,
		},
		wind: { speed: info.wind },
	};
}

function getWeather(city) {
	setStatus("Loading weather...", false);
	setLoading(true);

	window.setTimeout(function () {
		const currentData = makeMockCurrent(city);
		const forecastList = makeMockForecast(currentData.main.temp);

		showCurrent(currentData);
		showForecast(forecastList);
		setLoading(false);
		setStatus("Demo updated: " + new Date().toLocaleString(), false);
	}, 500);
}

const savedTheme = localStorage.getItem(THEME_KEY) || "dark";
applyTheme(savedTheme);

themeToggle.addEventListener("click", function () {
	const activeTheme = document.body.getAttribute("data-theme") || "dark";
	const nextTheme = activeTheme === "light" ? "dark" : "light";
	applyTheme(nextTheme);
	localStorage.setItem(THEME_KEY, nextTheme);
});

form.addEventListener("submit", function (event) {
	event.preventDefault();
	const city = cityInput.value.trim();

	if (!city) {
		setStatus("Please enter a city name.", true);
		return;
	}

	getWeather(
		city);
});
