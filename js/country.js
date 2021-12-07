let country = localStorage.getItem("country");
let common = ""
const containerDiv = document.getElementsByClassName("h-photo")[0];


//an API gives the official name of the country
const countryAPI = fetch(`https://restcountries.com/v3.1/name/${country}`)
  .then((res) => {
    if (res.status !== 200) {
      console.log("there was a problem connecting to Api");
    } else {
      return res.json();
    }
  })
  .then((data) => {
    common = data[0].name.common
    const officialName = document.createElement("h1");
    officialName.setAttribute("id", "official-name");
    officialName.innerHTML = `${data[0].name.official}`;
    containerDiv.appendChild(officialName);

    const pixaKey = "24477339-22b8ee8a367b2cdaebd16eb69";
    const pixaAPI = fetch(
      `https://pixabay.com/api/?key=${pixaKey}&q=${common}&image_type=photo&pretty=true&imageHeight=1080&imageWidth=1920`
    )
      .then((resp) => {
        if (resp.status !== 200) {
          console.log("there was a problem connecting to Api");
        } else {
          return resp.json();
        }
      })
      .then((datax) => {
       
        const photo = document.createElement("img");
        photo.setAttribute("src", `${datax.hits[0].largeImageURL}`);
        photo.setAttribute("id", `header`);
        containerDiv.appendChild(photo);
      });
    


  });


//an API displays a photo of the selected country


//Countries API
// const countriesAPI = fetch(`https://restcountries.com/v3.1/name/france`);

//Cities API
const citiesAPI = `https://countriesnow.space/api/v0.1/countries/cities`;
// POST method implementation:
async function postData(url, data) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
////////////Display Country Details ////////////////
const countrySection = document.querySelector("#country");
const countryDetails = document.querySelector("#country-details");


//Countries API
const countriesAPI = fetch(`https://restcountries.com/v3.1/name/france`);
countriesAPI.then((data) => console.log(data.json()));


//the forecast for 3 days  function 
let cityWeather="";

SelectCity.addEventListener("chang",(e)=>{
  const city= e.target.value;
  cityWeather= e.target.value;
  displayCityDetails(city);
  displayWeather(cityWeather);
})
//selectors:
let daysCard= document.querySelectorAll('#days-card');

//function :
   function displayWeather(city){

      fetch(`https://goweather.herokuapp.com/weather/${city}`)
      .then(data => data.json())
      .then(data =>{
        const days= data.forecast;
        days.forecast.forEach((day,i) => {

        const dayWeather= document.createElement("div");
        dayWeather.classList.add('day-weather');
        daysCard.appendChild(dayWeather);

        const dayNum= document.createElement("div");
        dayNum.classList.add('days');
        dayNum.textContent="day"+days[i].day;
        dayWeather.appendChild(dayNum);

       const temp= +days[i].temperature;
       let srcURL="";
        if(temp<=0){ 
          srcURL="fontisto_night-alt-cloudy3.png"
        }else if(temp<=15){
          srcURL= "fluent_weather-cloudy-20-regular1.png"; 
        }else{
          srcURL= "fe_sunny-o2.png"; 
        }
        
        const dayImg= document.createElement("img");
        dayImg.classList.add("state");
        dayImg.src=`../assests/img/country-Details/${srcURL}`;
        dayWeather.appendChild(dayImg);

         });
       }) 
}

function displayCountryHeader(country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((data) => data.json())
    .then((data) => data[0])
    .then((selectedCountry) => {
      const cardHeader = document.createElement("div");
      cardHeader.classList.add("allign-item");
      countryDetails.appendChild(cardHeader);

      const mqmargin = document.createElement("div");
      mqmargin.classList.add("mq-margin");
      cardHeader.appendChild(mqmargin);

      const countryName = document.createElement("h1");
      countryName.id = "name";
      countryName.textContent = selectedCountry.name.common;
      const countryContinent = document.createElement("h2");
      countryContinent.id = "continent";
      countryContinent.textContent = selectedCountry.continents[0];

      mqmargin.appendChild(countryName);
      mqmargin.appendChild(countryContinent);

      const countryFlag = document.createElement("img");
      countryFlag.id = "flag";
      cardHeader.appendChild(countryFlag);
      countryFlag.src = selectedCountry.flags.svg;
    });
}

// Display Country Details (Population, currency etc..)
function displayCountryDetails(country) {
  let countryWeather = fetch(
    `https://goweather.herokuapp.com/weather/${country}`
  ).then((data) => data.json());

  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((data) => data.json())
    .then((data) => data[0])
    .then((selectedCountry) => {
      const infoGrid = document.createElement("div");
      infoGrid.classList.add("info-grid");
      countryDetails.appendChild(infoGrid);

      const popE = document.createElement("p");
      popE.classList.add("emoji");
      popE.textContent = "👫";
      const pop = document.createElement("p");
      pop.id = "population";
      pop.textContent = (selectedCountry.population / 1000000).toFixed(1) + "M";

      const langE = document.createElement("p");
      langE.classList.add("emoji");
      langE.textContent = "🗣";
      const lang = document.createElement("p");
      lang.id = "lang";
      lang.textContent = Object.values(selectedCountry.languages)[0];

      const currE = document.createElement("p");
      currE.classList.add("emoji");
      currE.textContent = "💰";
      const curr = document.createElement("p");
      curr.id = "currency";
      curr.textContent = Object.values(selectedCountry.currencies)[0].name;

      const weatherE = document.createElement("p");
      weatherE.classList.add("emoji");
      weatherE.textContent = "⛅";
      const weather = document.createElement("p");
      weather.id = "now-weather";
      countryWeather.then(
        (result) => (weather.textContent = result.description)
      );
      const values = [popE, pop, langE, lang, currE, curr, weatherE, weather];
      values.forEach((value) => infoGrid.appendChild(value));
    });
}

//Display Country Cities

const citySection = document.querySelector("#overlay");
const horizontalflex = document.querySelector(".horizantal-flex");
const weatherContainer = document.createElement("div");
horizontalflex.appendChild(weatherContainer);

//Get Cities of the country and display them
function displayCountryCities(selectedCountry) {
  const selectCity = document.createElement("select");
  selectCity.classList.add("margin-inside-the-box");
  selectCity.id = "cities";
  weatherContainer.appendChild(selectCity);
  postData(`${citiesAPI}`, { country: selectedCountry }).then((result) => {
    result.data.sort().forEach((city) => {
      const option = document.createElement("option");
      option.value = city;
      option.textContent = city;
      selectCity.name = city;

      selectCity.appendChild(option);
    });
  });

  selectCity.addEventListener("change", (e) => {
    const city = e.target.value;
    displayCityDetails(city);
  });
}

//Display city Details

function displayCityDetails(city) {
  fetch(`https://goweather.herokuapp.com/weather/${city}`)
    .then((result) => result.json())
    .then((result) => {
      //clear the container and add the new city

      //Todo: add the select element to the header
      weatherContainer.innerHTML = "";
      const marginVector = document.createElement("img");
      marginVector.classList.add("margin-inside-the-box", "dash");
      marginVector.src = "./assets/img/Country-Details/Vector 3.png";
      weatherContainer.appendChild(marginVector);

      const breakSpace = document.createElement("br");
      weatherContainer.appendChild(breakSpace);

      const weatherState = document.createElement("p");
      weatherState.id = "current-state";
      weatherState.classList.add("margin-inside-the-box");
      weatherState.textContent = result.description;
      weatherContainer.appendChild(weatherState);

      const windContainer = document.createElement("div");
      windContainer.id = "wind-speed";
      weatherContainer.appendChild(windContainer);

      const weatherIcon = document.createElement("img");
      weatherIcon.classList.add("margin-inside-the-box", "wind");
      weatherIcon.src = "./assets/img/Country-Details/bi_wind.png";
      windContainer.appendChild(weatherIcon);

      const windSpeed = document.createElement("p");
      windSpeed.id = "wind";
      windSpeed.textContent = result.wind;
      windContainer.appendChild(windSpeed);

      const tempContainer = document.createElement("div");
      horizontalflex.appendChild(tempContainer);

      const temp = document.createElement("h2");
      temp.id = "temp";
      temp.classList.add("margin-inside-the-box");

      temp.textContent = result.temperature;
      tempContainer.appendChild(temp);

      const nowStateDiv = document.createElement("div");
      nowStateDiv.classList.add("now-state-div");
      citySection.appendChild(nowStateDiv);

      const cloudImg = document.createElement("img");
      nowStateDiv.appendChild(cloudImg);
      cloudImg.classList.add("now-state-img");
      cloudImg.src = "./assets/img/Country-Details/carbon_mostly-cloudy.png";
    });
}

displayCountryHeader(country);
displayCountryDetails(country);

displayCountryCities(country);
