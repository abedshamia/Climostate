let country = localStorage.getItem("country");
console.log(country)
const containerDiv = document.getElementsByClassName("h-photo")[0];


//an API displays a photo of the selected country
const pixaKey = "24477339-22b8ee8a367b2cdaebd16eb69";
const pixaAPI = fetch(
  `https://pixabay.com/api/?key=${pixaKey}&q=${country}&image_type=photo&pretty=true&imageHeight=1080&imageWidth=1920`
)
  .then((res) => {
    if (res.status !== 200) {
      console.log("there was a problem connecting to Api");
    } else {
      return res.json();
    }
  })
  .then((data) => {
    const photo = document.createElement("img");
    photo.setAttribute("src", `${data.hits[0].largeImageURL}`);
    photo.setAttribute("id", `header`);
    containerDiv.appendChild(photo);
  });

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
    const officialName = document.createElement("h1");
    officialName.setAttribute("id", "official-name");
    officialName.innerHTML = `${data[0].name.official}`;
    containerDiv.appendChild(officialName);

  });
