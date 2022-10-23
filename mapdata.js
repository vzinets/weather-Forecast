const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};
let desc = "";
const weatherBlock = document.querySelector(".weather");
const map = document.querySelector("#map");

let lat;
let lon;

function gpsSuccess(pos) {
  console.log("🚀 ~ file: mapdata.js ~ line 13 ~ gpsSuccess ~ pos", pos);
  const crd = pos.coords;

  lat = crd.latitude;
  lon = crd.longitude;

  geoloctionWeatherLoad();
}

function gpsError(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}
function getCurrentUserGPS() {
  return navigator.geolocation.getCurrentPosition(
    gpsSuccess,
    gpsError,
    options
  );
}

async function geoloctionWeatherLoad() {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4758a8aa2394cf9b03db2821e7c18c6f&units=metric`
  );
  const responseResult = await response.json();

  renderGPSWeather(responseResult);
  // if(response.ok){
  //   getWeather(responseResult);
  // }
}

function renderGPSWeather(data) {
  console.log(data, "getGeolocationWeather");
  const state = data.name;
  const temp = Math.round(data.main.temp);
  const feel = Math.round(data.main.feels_like);
  const weatherStatus = data.weather[0].main;
  const weatherIcon = data.weather[0].icon;

  const forecast = `
<div class="city__weather-wrapper">
  <p class="city__weather">Weather in ${state}:  </p>
  <div class='weather__container'>
    <div class='weather__status-wrapper'>
      <div class='weather__status'>${weatherStatus}</div>
      <div class='weather__temp'><p class="temp">Temperature: ${temp}</p></div>
      <div class='weather__feel'><p class="feels">Feels like: ${feel}</p></div>
    </div>
    <div class='weather__icon'>
      <img src="http://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt="${weatherStatus}">
    </div>
   </div>
 </div>`;

  document.querySelector("header").innerHTML += forecast;
}

function getCityName(event) {
  const regionclass = event.target.classList.value;
  const cityCodeIndex = regionclass.indexOf("UKR");

  if (cityCodeIndex > 0) {
    const cityCode = regionclass.substring(cityCodeIndex, cityCodeIndex + 7);
    const cityName =
      simplemaps_countrymap_mapdata.state_specific[cityCode].name;
    weatherLoadByCityName(cityName);
    // console.log(cityName)
  }
  // sm_state sm_state_UKR290
}

async function weatherLoadByCityName(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4758a8aa2394cf9b03db2821e7c18c6f&units=metric`
  );
  const responseResult = await response.json();

  if (response.ok) {
    renderWeatherCityName(responseResult);
  }
}
const wrpper = `<div> </div>`;
function renderWeatherCityName(data) {
  console.log(data);
  const state = data.name;
  const temp = Math.round(data.main.temp);
  const feel = Math.round(data.main.feels_like);
  const weatherStatus = data.weather[0].main;
  const weatherIcon = data.weather[0].icon;

  const stateWeather = `
<p class="city__weather">${state}</p>
<div class=".state__weather-wrapper">
  <div class='weather__container'>
    <div class='cityWeather__status-wrapper'>
      <div class='weather__status'>${weatherStatus}</div>
      <div class='weather__temp'><p class="temp">Temperature: ${temp}</p></div>
      <div class='weather__feel'><p class="feels">Feels like: ${feel}</p></div>
    </div>
    <div class='weather__state-icon'>
      <img src="http://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt="${weatherStatus}">
    </div>
   </div>
 </div>`;
  const modal = document.querySelector("#tt_sm_map");

  wrpper.innerHTML = stateWeather;
  modal.innerHTML = stateWeather;
}

function reportWindowSize() {
  const screenWidth = window.innerWidth;

  const svgImg = document.querySelector("#map_inner > svg");

  svgImg.style.width = screenWidth * 0.6;
}
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    reportWindowSize();
  }, 10);
});
window.onresize = reportWindowSize;

map.addEventListener("mouseover", getCityName);

/////////////
getCurrentUserGPS();

var simplemaps_countrymap_mapdata = {
  main_settings: {
    //General settings
    width: 2050, //or 'responsive'
    background_color: "#FFFFFF",
    background_transparent: "yes",
    border_color: "#ffffff",
    pop_ups: "detect",

    //State defaults
    state_description: ``,
    state_color: "#88A4BC",
    state_hover_color: "#3B729F",
    state_url: "",
    border_size: 1.5,

    //Location defaults
    location_description: "",
    location_url: "",
    location_color: "#FF0067",
    location_opacity: 0.8,
    location_hover_opacity: 1,
    location_size: 25,
    location_type: "square",
    location_image_source: "",
    location_border_color: "#FFFFFF",
    location_border: 2,
    location_hover_border: 2.5,
    all_locations_inactive: "no",
    all_locations_hidden: "no",

    //Label defaults
    label_color: "#d5ddec",
    label_hover_color: "#d5ddec",
    label_size: 22,
    label_font: "Arial",
    hide_labels: "yes",
    hide_eastern_labels: "yes",

    //Popup settings
    popup_color: "",
    popup_opacity: 0,
    popup_shadow: 0,
    popup_corners: 0,
    popup_font: "",
    popup_nocss: "yes",

    //Advanced settings
    div: "map",
    auto_load: "yes",
    url_new_tab: "no",
    images_directory: "default",
    fade_time: 0.1,
    link_text: "View Website",
  },
  state_specific: {
    UKR283: {
      name: "Republic of Crimea",
      color: "default",
      hover_color: "default",
      url: "default",
    },
    UKR284: {
      name: "Mykolayiv",
    },
    UKR285: {
      name: "Chernihiv",
    },
    UKR286: {
      name: "Rivne",
    },
    UKR288: {
      name: "Chernivtsi",
    },
    UKR289: {
      name: "Ivano-Frankivsk",
    },
    UKR290: {
      name: "Khmelnytskyi",
    },
    UKR291: {
      name: "Lviv",
    },
    UKR292: {
      name: "Ternopil",
    },
    UKR293: {
      name: "Zakarpattia oblast",
    },
    UKR318: {
      name: "Kovel",
    },
    UKR319: {
      name: "Cherkasy",
    },
    UKR320: {
      name: "Kropyvnytskyi",
    },
    UKR321: {
      name: "Kyiv oblast",
    },
    UKR322: {
      name: "Odesa",
    },
    UKR323: {
      name: "Vinnytsia",
    },
    UKR324: {
      name: "Zhytomyr",
    },
    UKR325: {
      name: "Sumy",
    },
    UKR326: {
      name: "Dnipro",
    },
    UKR327: {
      name: "Donetsk",
    },
    UKR328: {
      name: "Kharkiv",
    },
    UKR329: {
      name: "Luhansk",
    },
    UKR330: {
      name: "Poltava",
    },
    UKR331: {
      name: "Zaporizhia",
    },
    UKR4826: {
      name: "Kyiv",
    },
    UKR4827: {
      name: "Kherson",
    },
    UKR5482: {
      name: "Sevastopol",
    },
  },
};
