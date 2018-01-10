/* 
* Create Collection
*
*
*/

// Requires
const axios = require("axios");
const MongoClient   = require('mongodb').MongoClient;

// Database
var db_url = "mongodb://@localhost";

// Variables (Change As Needed)
const allCoins = [];
const url = "https://api.coinmarketcap.com/v1/ticker/?limit=0";



// Request for all coins

    
MongoClient.connect(db_url, function (err, client) {
    axios
    .get(url)
    .then(response => {
        this.allCoins = response.data;

        for(i = 0; i < this.allCoins.length; i++){
            if(err) return console.log(err);

            // Setup
            var db = client.db('crypto');
            var collection = 'coins';
            
            var newvalues = 
            { 
                "coin_id": this.allCoins.id,
                "symbol": this.allCoins.symbol
            };
            
            // Do Work
            db.collection(collection).insertOne(newvalues, function(err, res) {
                if (err) throw err;
                console.log("1 document updated");
                client.close();
            });
            
        }
        console.log("Completed");
    })
    .catch(error => {
        console.log(error);
    });
}); 


// End

/*

var newvalues = 
{ 
    "coin_id": this.allCoins.id,
    "data":
        [
            {
                "day": "Jan 8 2018",
                "created": new Date(),
                "new_posts": "0",
                "comment_sum": "0",
                "score_sum": "0",
                "crosspost_sum": "0",
                "sentiment_score": "0"                
            }
        ]
};
var newvalues = 
{ 
    "coin_id": this.allCoins.id,
    "symbol": this.allCoins.symbol
};
var newvalues = 
{ 
    "coin_id": this.allCoins[i].id,
    "symbol": this.allCoins[i].symbol,
    "price_usd": this.allCoins[i].price_usd,
    "24h_volume_usd": this.allCoins[i]["24h_volume_usd"],
    "market_cap_usd": this.allCoins[i].market_cap_usd,
    "available_supply": this.allCoins[i].available_supply,
    "total_supply": this.allCoins[i].total_supply,
    "r_score": "0",
    "r_activity": "0",
    "r_24hr": "0",
    "t_activity": "0",
    "t_24hr": "0",
    "hour": this.allCoins[i].hour,
    "day": this.allCoins[i].day,
    "week": this.allCoins[i].week,
    "updated": new Date()
};               
               


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






