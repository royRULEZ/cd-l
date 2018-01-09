const axios = require("axios");
const url = "https://api.coinmarketcap.com/v1/ticker/?limit=0";
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
