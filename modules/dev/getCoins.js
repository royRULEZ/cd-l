/* 
* Get All Coins
* Source https://www/coinmarketcap.com
*
*/

// Requires
const axios = require("axios");

// Variables
const allCoins = [];
const redditData = {};
const url = "https://api.coinmarketcap.com/v1/ticker/?limit=0";

// Request for all coins
axios
  .get(url)
  .then(response => {
    this.allCoins = response.data;
    
    
  })
  .catch(error => {
    console.log(error);
  });

// End


// Notes
/*
    "id": "bitcoin",
    "name": "Bitcoin",
    "symbol": "BTC",
    "rank": "1",
    "price_usd": "573.137",
    "price_btc": "1.0",
    "24h_volume_usd": "72855700.0",
    "market_cap_usd": "9080883500.0",
    "available_supply": "15844176.0",
    "total_supply": "15844176.0",
    "percent_change_1h": "0.04",
    "percent_change_24h": "-0.3",
    "percent_change_7d": "-0.57",
    "last_updated": "1472762067"
        
        
        
        
        
        
        
        
        
*/