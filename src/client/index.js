import { sendData } from "../client/js/getRequest";
import { checkInput } from "../client/js/eventHandler";
import "./styles/style.scss";
// const runApplication = () => {
const form = document.querySelector(".form");
const cityText = document.querySelector(".city-text");
const destination = document.querySelector(".destination");
const date = document.querySelector(".date1");
const dateHeading = document.querySelector(".date-heading");
const weather1 = document.querySelector(".weather1");
const day1 = document.querySelector(".day1");
const weather2 = document.querySelector(".weather2");
const day2 = document.querySelector(".day2");
const weather3 = document.querySelector(".weather3");
const day3 = document.querySelector(".day3");
const weather4 = document.querySelector(".weather4");
const day4 = document.querySelector(".day4");
const weather5 = document.querySelector(".weather5");
const day5 = document.querySelector(".day5");

const proxy = "https://cors-anywhere.herokuapp.com/";

let locationInfo = {
  city: "",
  country: "",
  latitude: "",
  longitude: "",
};

let weatherForecast = {
  dayOne: {
    temp: "",
    date: "",
  },
  dayTwo: {
    temp: "",
    date: "",
  },
  dayThree: {
    temp: "",
    date: "",
  },
  dayFour: {
    temp: "",
    date: "",
  },
  dayFive: {
    temp: "",
    date: "",
  },
};

// Handle GET and POST requests for the geo-coordiantes data
const getCoordinates = (city) => {
  fetch(
    `${proxy}http://api.geonames.org/searchJSON?q=${city}&maxRows=10&username=rayomon`
  )
    .then((response) => {
      return response.json();
    })

    // Calling POST request
    .then((data) => {
      sendData(data);
    })
    // Calling GET request
    .then(() => {
      fetchCoords();
    })

    .catch((error) => {
      console.log(error);
    });
};

// Make a POST request to server with the geo-coordinates data
// const sendData = (data) => {
//   fetch("http://localhost:5500/geocoords", {
//     method: "POST",
//     credentials: "same-origin",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       return data;
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// Making GET request to retrieve geo coordinates
const fetchCoords = () => {
  fetch("http://localhost:5500/geocoords")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      locationInfo.latitude = data.latitude;
      locationInfo.longitude = data.longitude;
      locationInfo.city = data.name;
      locationInfo.country = data.country;
    })
    .catch((error) => {
      console.log(error);
    });
};

const getWeather = (lat, lon) => {
  fetch(
    `https://api.weatherbit.io/v2.0/forecast/daily?key=73dcbe9d0fe3416a94f73a8bdbc18d78&lat=${lat}&lon=${lon}&days=7&units=I`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // Weather forecast for 4 days with the date reversed
      // to give the correct format.
      weatherForecast.dayOne.temp = data.data[0].temp;
      weatherForecast.dayOne.date = data.data[0].datetime
        .split("-")
        .reverse()
        .join("-");
      weatherForecast.dayTwo.temp = data.data[1].temp;
      weatherForecast.dayTwo.date = data.data[1].datetime
        .split("-")
        .reverse()
        .join("-");
      weatherForecast.dayThree.temp = data.data[2].temp;
      weatherForecast.dayThree.date = data.data[2].datetime
        .split("-")
        .reverse()
        .join("-");
      weatherForecast.dayFour.temp = data.data[3].temp;
      weatherForecast.dayFour.date = data.data[3].datetime
        .split("-")
        .reverse()
        .join("-");
      weatherForecast.dayFive.temp = data.data[4].temp;
      weatherForecast.dayFive.date = data.data[4].datetime
        .split("-")
        .reverse()
        .join("-");
    })
    .catch((error) => {
      console.log(error);
    });
};

const getPhoto = (city) => {
  fetch(
    `${proxy}https://pixabay.com/api/?key=16039104-d4a665d2570df15bc2b3dc6da&q=${city}&image_type=photo`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      const image = document.createElement("img");
      let imgUrl = data.hits[0].largeImageURL;
      image.setAttribute("alt", "photo");
      image.setAttribute("src", imgUrl);
      document.querySelector(".photo").appendChild(image);
    })

    .catch((error) => {
      console.log(error);
    });
};

const updateUI = () => {
  // Set the travel date
  let presentDate = new Date().getDate();
  let selectedDate = date.value;

  // Convert the value of date input into an array of numbers
  let dateString = selectedDate.toString().split("-");

  // Select the third value which represents the date
  selectedDate = dateString[2];

  let tripCountdown = selectedDate - presentDate;

  let travelSummary;

  destination.textContent = `${locationInfo.city}, ${locationInfo.country}`;
  tripCountdown === 1
    ? (travelSummary = `Your trip to ${
        locationInfo.city
      } is ${tripCountdown} day away. You will be leaving on ${dateString
        .reverse()
        .join("-")}`)
    : (travelSummary = `Your trip to ${
        locationInfo.city
      } is ${tripCountdown} days away. You will be leaving on ${dateString
        .reverse()
        .join("-")}`);

  dateHeading.textContent = travelSummary;

  // Set Weather
  weather1.textContent = `${weatherForecast.dayOne.temp} ℉`;
  day1.textContent = weatherForecast.dayOne.date;

  weather2.textContent = `${weatherForecast.dayTwo.temp} ℉`;
  day2.textContent = weatherForecast.dayTwo.date;

  weather3.textContent = `${weatherForecast.dayThree.temp} ℉`;
  day3.textContent = weatherForecast.dayThree.date;

  weather4.textContent = `${weatherForecast.dayFour.temp} ℉`;
  day4.textContent = weatherForecast.dayFour.date;

  weather5.textContent = `${weatherForecast.dayFive.temp} ℉`;
  day5.textContent = weatherForecast.dayFive.date;
};

// Add Event Listener
// form.addEventListener("submit", (e) => {
//   e.preventDefault();
// let cityValue = cityText.value;
// if (cityText.value.length < 1 || date.value === "") {
//   alert("Enter a date and city");
// } else {

checkInput();
export { getCoordinates, getWeather, getPhoto, updateUI, locationInfo };
// getCoordinates(cityValue);

// setTimeout(() => {
//   getWeather(locationInfo.latitude, locationInfo.longitude);
// }, 2000);

// setTimeout(() => {
//   getPhoto(cityValue);
// }, 2000);

// setTimeout(() => {
//   updateUI();
// }, 3000);

// setTimeout(() => {
//   document.querySelector(".section2").style = "visibility: visible;";
//   document.querySelector(".section3").style = "visibility: visible;";
// }, 2000);
// }
// });
//   };

//   export { runApplication };
