const path = require("path");
const express = require("express");
const app = express();

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

//Configuring express to use body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Specify the directory from where to load files
app.use(express.static("dist"));

//Variable which stores data received from POST request
const appData = {
  name: "",
  country: "",
  latitude: "",
  longitude: "",
};

// POST Request which collects weather data
app.post("/geocoords", (req, res) => {
  let data = req.body.geonames[0];
  appData.name = data.name;
  appData.country = data.countryName;
  appData.latitude = data.lat;
  appData.longitude = data.lng;
  console.log("data received");
});

// GET Request to send the weather
app.get("/geocoords", (req, res) => {
  res.send(appData);
  console.log("data sent");
});

// Designates what port the app will listen to for incoming requests
const port = 5500;
app.listen(port, function () {
  console.log(`Server running on port ${port}`);
});

// export { appData, app };
module.exports = { appData, app };
