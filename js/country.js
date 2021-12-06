///////////////////////////////////      APIs

//Pictures API
const pixaKey = "24477339-22b8ee8a367b2cdaebd16eb69";
const pixaAPI = fetch(
  `https://pixabay.com/api/?key=${pixaKey}&q=paris&image_type=photo&pretty=true&imageHeight=1080&imageWidth=1920`
);

pixaAPI.then((data) => console.log(data.json()));

//Weather API
const weatherAPI = fetch(`https://goweather.herokuapp.com/weather/paris`);

weatherAPI.then((data) => console.log(data.json()));

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
//Get cities in France
postData(`${citiesAPI}`, { country: "France" }).then((data) => {
  console.log(data); // JSON data parsed by `data.json()` call
});

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
let test;
