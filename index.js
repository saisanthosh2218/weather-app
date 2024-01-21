let key = "81c835b7d3a244fc3972c86b6abfed9f";
let image = document.getElementsByClassName("img-class");
let description = document.getElementsByClassName("weather-des");
let cityInput = document.getElementById("name");
let h1Element = document.querySelector("h1");
let deg = document.getElementsByClassName("degrees");
let msg = document.getElementById("enter-text");
let humidity = document.getElementsByClassName("humidity-text");
let wind = document.getElementsByClassName("wind-text");
let factor = document.getElementsByClassName("factors")[0];
let errimg = document.getElementById("err-img");

function output() {
  let cityName = cityInput.value.trim();

  if (cityName !== "") {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=metric`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`City not found: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.main && data.main.temp && data.weather[0]) {
          let temperature = data.main.temp;
          let para = data.weather[0].description;
          deg[0].innerHTML = `${temperature} °C`;
          description[0].innerHTML = `${para}`;
          humidity[0].innerText = data.main.humidity + "%";
          wind[0].innerHTML = data.wind.speed + " km/h";

          if (data.weather[0].main === "Clouds") {
            image[0].src = "./asset/cloudy.png";
          } else if (data.weather[0].main === "Rainy") {
            image[0].src = "./asset/rainy.png";
          } else if (data.weather[0].main === "Sunny") {
            image[0].src = "./asset/sunny.png";
          } else if (data.weather[0].main === "Haze") {
            image[0].src = "./asset/haze.png";
          } else if (data.weather[0].main === "Clear") {
            image[0].src = "./asset/clear-sky.png";
          } else if (data.weather[0].main === "Drizzle") {
            image[0].src = "./asset/drizzle.png";
          } else if (data.weather[0].main === "Snow") {
            image[0].src = "./asset/snow.png";
          } else if (data.weather[0].main === "Cold") {
            image[0].src = "./asset/snow.png";
          } else if (data.weather[0].main === "Thunderstorm") {
            image[0].src = "./asset/thunderstorm.png";
          } else if (data.weather[0].main === "Mist") {
            image[0].src = "./asset/fog.png";
          } else if (data.weather[0].main === "Fog") {
            image[0].src = "./asset/mist.png";
          } else if (data.weather[0].main === "Smoke") {
            image[0].src = "./asset/smoke.png";
          } else {
            image[0].src = "";
          }

          image[0].style.opacity = 1;
          description[0].style.opacity = 1;
          deg[0].style.opacity = 1;
          msg.style.display = "none";
          factor.style.display = "flex";
        } else {
          throw new Error("Incomplete data received");
        }
      })
      .catch((err) => {
        console.error(err);
        msg.style.display = "block";
        if (err.message.includes("Failed to fetch")) {
          msg.innerText = err.message + " Please check your network connection";
        } else {
          msg.innerText =
            "Sorry! Couldn't Find The City Please Check The Name Again";
        }
        msg.style.fontSize = "18px";
        msg.style.fontFamily = "sans-serif";
        msg.style.textTransform = "capitalize";
        image[0].style.opacity = 0;
        description[0].style.opacity = 0;
        deg[0].style.opacity = 0;
        factor.style.display = "none";
      });
  }
}
