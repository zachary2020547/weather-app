//API Key
const appId = "set your own app ID"; 

const requestedCityWeather = city => fetch(`api.openweathermap.org/data/2.5/weather?q=sydney&appid=appId&units=metric`) .then(response => response.json());

const createCardHtml = (name, temp, feelsLike, description) => `
      <div class="col-10">
        <div class="card-body">
          <div class="row card-title justify-content-between">
            <h4>${name}</h4>
            <h6>It is ${temp}c however it feels like ${feelsLike}c</h6>
          </div>
          <div class="row">
            <h5 class="card-subtitle text-muted">${description}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

const submitButton = document.querySelector('#submit-button');
const cityInput = document.querySelector('#city-input');
const weatherContainer = document.querySelector('#weather-container');

submitButton.addEventListener('click', async () => {
  const city = cityInput.value;
  const response = await fetch (`api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${appId}&units=metric`);
  const data = await response.json;
  requestedCityWeather(city)
    .then(data => {
    // as the name is the first level
      const name = data.name;
      const temp = data.main.temp;
    // as it is two levels down - main then feels_like
      const feelsLike = data.main.feels_like;
    // under weather array [0]
      const description = data.weather[0].description;

      const finishedHtml = createCardHtml(name, temp, feelsLike, description);

      weatherContainer.innerHTML = finishedHtml;
    });
});