/*
*   Update Main Table
*
*
*
*/

// Requires
const axios = require("axios");
const MongoClient   = require('mongodb').MongoClient;
const request = require('sync-request');

// Database
var db_url = "mongodb://@localhost";

// Variables (Change As Needed)
const allCoins = [];
const url = "https://api.coinmarketcap.com/v1/ticker/?limit=0";


MongoClient.connect(db_url, function (err, client) {
    if(err) return console.log(err);
    axios
    .get(url)
    .then(response => {
        this.allCoins = response.data;    
    
        for(i = 0; i < this.allCoins.length; i++){
            
            // Setup
            var db = client.db('crypto');
            var collection = 'main';
            var coin_id_ = this.allCoins[i].id;
            var query = 
                { 
                    coin_id: coin_id_
                };

            var newvalues = 
            { 
                $set: 
                { 
                    "price_usd": parseFloat(this.allCoins[i].price_usd),
                    "24h_volume_usd": parseFloat(this.allCoins[i]["24h_volume_usd"]),
                    "market_cap_usd": parseFloat(this.allCoins[i].market_cap_usd),
                    "available_supply": parseFloat(this.allCoins[i].available_supply),
                    "total_supply": parseFloat(this.allCoins[i].total_supply),    
                    "hour": parseFloat(this.allCoins[i].percent_change_1h),
                    "day": parseFloat(this.allCoins[i].percent_change_24h),
                    "week": parseFloat(this.allCoins[i].percent_change_7d),
                    "updated": new Date()
                }
            };


        

            // Do Work
            db.collection(collection).updateOne(query, newvalues, function(err, res) {
                if (err) throw err;
                client.close();
            });
                
                
         
        }
        
        console.log("Completed");
    }) // Then
    .catch(error => {
        console.log(error);
    }); // Catch     
}); // Mongo



/*
            db_.collection('r_data').findOne({coin_id: coins[i].coin_id}, function(err, result) {  
                if(err) return console.log(err);
                var data_length = (result.data.length - 1);
                
                r_score = (result.data[data_length].score_sum / result.data[data_length].new_posts);
                r_activity = (result.data[data_length].comment_sum / result.data[data_length].new_posts);                
                coin_id = coins[i].coin_id;
                
                var db__ = client.db('crypto');
                var query = 
                    {
                        coin_id: coin_id
                    };
                var newvalues = 
                    { 
                        $set: 
                        {    
                            "r_score": r_score,
                            "r_activity": r_activity
                            //"r_24hr": "0",
                            //"t_activity": "0",
                            //"t_24hr": "0"
                        }
                    };

                // Do Work
                console.log("gonnawork");
                db__.collection('table').updateOne(query, newvalues, function(err, res) {
                    if (err) throw err;
                    console.log("1 document updated");

                });
                
                
                
            });
*/




/*
MongoClient.connect(db_url, function (err, client) {
  if (err) throw err;
  db.collection('orders').aggregate([
    { $lookup:
       {
         from: 'products',
         localField: 'product_id',
         foreignField: '_id',
         as: 'orderdetails'
       }
     }
    ], function(err, res) {
    if (err) throw err;
    console.log(JSON.stringify(res));
    db.close();
  });
});


MongoClient.connect(db_url)
    .then(function (db) { // <- db as first argument
        //console.log(db);
        var coins = [];
        db.collection('table').find({}).toArray(function(err, result) {
        if(err) return console.log(err);
        coins = result;
        db.close();
        });
    })
    .catch(function (err) {
        return console.log(err);
        db.close();
});
*/














/*







MongoClient.connect(db_url, function (err, client) {
    if(err) return console.log(err);
    var db = client.db('crypto');
    
    var coins = [];
    var reddit_data = {};

    
    // Get Coin IDs
    db.collection('table').find({}).toArray(function(err, result) {
        if(err) return console.log(err);
        coins = result;
        var r_score = 0;
        var r_activity = 0;
        var r_48hr = 0;
        for(i = 0; i < /*result.length 3; i++){
            console.log("Entering Item: " + i);
            var db_ = client.db('crypto');
            
            db_.collection('r_data').findOne({coin_id: coins[i].coin_id}, function(err, result) {  
                if(err) return console.log(err);
                var data_length = (result.data.length - 1);
                
                r_score = (result.data[data_length].score_sum / result.data[data_length].new_posts);
                r_activity = (result.data[data_length].comment_sum / result.data[data_length].new_posts);                
                coin_id = coins[i].coin_id;
                
                var db__ = client.db('crypto');
                var query = 
                    {
                        coin_id: coin_id
                    };
                var newvalues = 
                    { 
                        $set: 
                        {    
                            "r_score": r_score,
                            "r_activity": r_activity
                            //"r_24hr": "0",
                            //"t_activity": "0",
                            //"t_24hr": "0"
                        }
                    };

                // Do Work
                console.log("gonnawork");
                db__.collection('table').updateOne(query, newvalues, function(err, res) {
                    if (err) throw err;
                    console.log("1 document updated");

                });
                
                
                
            });        
        }
        client.close();
    });
});











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

FIELDS
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


*/


