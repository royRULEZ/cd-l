/*

https://www.reddit.com/r/cryptocurrency/search.json?q=BTC&restrict_sr=on&limit=100&sort=hot&t=day

after               fullname of a thing
before              fullname of a thing
count               a positive integer (default: 0)
include_facets      boolean value
limit               the maximum number of items desired (default: 25, maximum: 100)
q                   a string no longer than 512 characters
restrict_sr         boolean value
show                (optional) the string all
sort                one of (relevance, hot, top, new, comments)
sr_detail           (optional) expand subreddits
syntax              one of (cloudsearch, lucene, plain)
t                   one of (hour, day, week, month, year, all)
type                (optional) comma-delimited list of result types (sr, link, user)

*/

// Requires
const axios = require("axios");
const MongoClient   = require('mongodb').MongoClient;
const request = require('sync-request');

// Database
var db_url = "mongodb://@localhost";

MongoClient.connect(db_url, function (err, client) {
    if(err) return console.log(err);
    var db = client.db('crypto');
    var collection = 'main';
    var coins = [];
    var reddit_data = {};

    
    // Get Coin IDs
    db.collection(collection).find({}).toArray(function(err, result) {
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
            var collection_ = 'main';
            var date = new Date();
            var options = { year: 'numeric', month: 'short'};
            var _resultDate = new Intl.DateTimeFormat('en-GB', options).format(date);

            var query = 
                { 
                    coin_id: coin_id_
                };

            var newvalues = 
                { 
                    $push: 
                    { 
                        r_data:
                        {
                            "day": _resultDate,
                            "created": new Date().getTime(),
                            "new_posts": results.data.children.length,
                            "comment_sum": comment_sum,
                            "score_sum": score_sum,
                            "crosspost_sum": crosspost_sum,
                            "sentiment_score": sentiment_score   
                        }

                    } 
                };


            // Do Work
            db_.collection(collection_).updateOne(query, newvalues, function(err, res) {
                if (err) throw err;
                console.log("1 document updated");
                
            });
        }
        client.close();
    });
});


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

