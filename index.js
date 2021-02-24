//API Key
const appId = "698562790a4fc22fa3c7c9601d3c9e1e"; 

const requestedCityWeather = city => fetch(`api.openweathermap.org/data/2.5/weather?q=sydney&appid=appId&units=metric`) .then(response => response.json());

const createCardHtml = (name, emoji, temp, feelsLike, description) => `
  <div>              
        ${emoji}
      <div class="col-10">
        <div class="card-body">
          <div class="row card-title justify-content-between">
            <h4>${name}</h4>
            <h6>${temp}c, feels like ${feelsLike}c</h6>
          </div>
          <div class="row">
            <h5 class="card-subtitle text-muted">${description}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

const emojis = {
    '01d': '☀️',
    '02d': '⛅️',
    '03d': '☁️',
    '04d': '☁️',
    '09d': '🌧',
    '10d': '🌦',
    '11d': '⛈',
    '13d': '❄️',
    '50d': '💨',
    '01n': '☀️',
    '02n': '⛅️',
    '03n': '☁️',
    '04n': '☁️',
    '09n': '🌧',
    '10n': '🌦',
    '11n': '⛈',
    '13n': '❄️',
    '50n': '💨',
  };

const submitButton = document.querySelector('#submit-button');
const cityInput = document.querySelector('#city-input');
const weatherContainer = document.querySelector('#weather-container');

submitButton.addEventListener('click', () => {
  const city = cityInput.value;
  requestedCityWeather(city)
    .then(data => {
      const name = data.name;
      const emoji = emojis[data.weather[0].icon];
      const temp = data.main.temp;
      const feelsLike = data.main.feels_like;
      const description = data.weather[0].description;

      const cardHtml = createCardHtml(name, emoji, temp, feelsLike, description);

      weatherContainer.innerHTML = cardHtml;
    });
});