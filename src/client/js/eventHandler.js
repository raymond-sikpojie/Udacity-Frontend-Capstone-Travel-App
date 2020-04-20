import { getCoordinates, getWeather, getPhoto, updateUI } from "../index";
import { locationInfo } from "../index";

const form = document.querySelector(".form");
const cityText = document.querySelector(".city-text");
const date = document.querySelector(".date1");

const checkInput = () => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityValue = cityText.value;
    if (cityText.value.length < 1 || date.value === "") {
      alert("Enter a date and city");
    } else {
      getCoordinates(cityValue);

      setTimeout(() => {
        getWeather(locationInfo.latitude, locationInfo.longitude);
      }, 2000);

      setTimeout(() => {
        getPhoto(cityValue);
      }, 2000);

      setTimeout(() => {
        updateUI();
      }, 3000);

      setTimeout(() => {
        document.querySelector(".section2").style = "visibility: visible;";
        document.querySelector(".section3").style = "visibility: visible;";
      }, 2000);
    }

    setTimeout(() => {
      console.log(locationInfo);
    }, 2000);
  });
};

export { checkInput };
