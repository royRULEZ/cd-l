const axios = require("axios");
const url =
  //"https://maps.googleapis.com/maps/api/geocode/json?address=Florence";
  "https://api.coinmarketcap.com/v1/ticker/tron/";
axios
  .get(url)
  .then(response => {
    console.log(
      `City: ${response.data[0].id}`
    );
  })
  .catch(error => {
    console.log(error);
  });