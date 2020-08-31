const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  const query = req.body.cityName;
  const appID = "a3f94e3542cfabebe67776fc25ffee76";
  const units = "imperial";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appID + "&units=" + units;
  https.get(url, function(response) {
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>The weather currently is " + weatherDescription + ".</p>");
      res.write("<h1>The temperature in " + query + " is " + temp + " degrees.</h1>");
      res.write("<img src=" + imageURL + ">");
      res.send();
    });
  });
});


app.listen(3000, function() {
  console.log("server is running");
});
