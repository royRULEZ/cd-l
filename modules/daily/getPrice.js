/*
*
*
*/

// Requires
const axios = require("axios");
const MongoClient   = require('mongodb').MongoClient;
const request = require('sync-request');

// Database
var db_url = "mongodb://@localhost";

// Variables
const url = "https://api.coinmarketcap.com/v1/ticker/?limit=0";
const allCoins = [];


// Open DB Connection
MongoClient.connect(db_url, function (err, client) {
    if(err) return console.log(err);
    axios
    .get(url)
    .then(response => {
        this.allCoins = response.data;    
    
        for(i = 0; i < this.allCoins.length; i++){
            
            // Setup
            var db = client.db('crypto');
            var collection = 'main_';
            var date = new Date();
            var options = { year: 'numeric', month: 'short'};
            var _resultDate = new Intl.DateTimeFormat('en-GB', options).format(date);
            var coin_id_ = this.allCoins[i].id;
            var query = 
                { 
                    coin_id: coin_id_
                };

            var newvalues = 
                { 
                    $push: 
                    { 
                        p_data:
                        {
                            "day": _resultDate,
                            "created": new Date().getTime(),
                            "price_usd": parseFloat(this.allCoins[i].price_usd),                        
                        }

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
MongoClient.connect(db_url, function (err, client) {
    if(err) return console.log(err);
    var db = client.db('crypto');
    var coin_collection = 'coins';
    var coins = [];
    var reddit_data = {}

    
    // Get Coin IDs
    db.collection(coin_collection).find({}).toArray(function(err, result) {
        if(err) return console.log(err);
        coins = result;
        
        
        // Cycle Through all Coin IDs
        for(i = 0; i < result.length; i++){
            console.log("Entering Item: " + i);
            
            var coin_id_ = coins[i].coin_id;
            var res = request('GET', 'https://www.reddit.com/r/cryptocurrency/search.json?q='+coins[i].coin_id+'&restrict_sr=on&limit=100&sort=hot&t=day');
            var results = JSON.parse(res.getBody('utf8'));
                    
            var num_posts = results.data.children.length;
                    
            // Cycle through all of the Posts from a day for a coin
            var day = 0;
            var new_posts = 0;
            var comment_sum = 0;
            var score_sum = 0;
            var crosspost_sum = 0;
            var sentiment_score = 0;

            for(j = 0; j < num_posts; j++){
                comment_sum += results.data.children[j].data.num_comments;
                score_sum += results.data.children[j].data.score;
                crosspost_sum += results.data.children[j].data.num_crossposts;
                sentiment_score = 0;                    
            }
            

            // Setup
            var db_ = client.db('crypto');
            var reddit_collection = 'r_data';
            var query = 
                { 
                    coin_id: coin_id_
                };

            var newvalues = 
                { 
                    $push: 
                    { 
                        data:
                        {
                            "day": "Jan 9 2018",
                            "created": new Date(),
                            "new_posts": results.data.children.length,
                            "comment_sum": comment_sum,
                            "score_sum": score_sum,
                            "crosspost_sum": crosspost_sum,
                            "sentiment_score": sentiment_score                
                        }

                    } 
                };


            // Do Work
            db_.collection(reddit_collection).updateOne(query, newvalues, function(err, res) {
                if (err) throw err;
                console.log("1 document updated");
                
            });
        }
        client.close();
    });
});
*/

