/* 
* Get All Coins
*
*/

// Requires
const axios = require("axios");

// Variables
const allCoins = [];
const url = 'https://files.coinmarketcap.com/generated/search/quick_search.json';

// Request
axios
  .get(url)
  .then(response => {
    console.log(
      `City: ${response.data[0].tokens[0]}`
    );
    this.allCoins = response.data;
    console.log(this.allCoins[4].symbol);
  })
  .catch(error => {
    console.log(error);
  });

// End