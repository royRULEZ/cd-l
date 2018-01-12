/*
* Get Google Data
* Source: https://www.npmjs.com/package/google-trends-api
*
*
*/

const googleTrends = require('google-trends-api');



googleTrends.relatedQueries({keyword: 'stellar'})
.then((res) => {
  console.log(res);
})
.catch((err) => {
  console.log(err);
})

/*
googleTrends.interestOverTime({keyword: 'Bitcoin'})
.then(function(results){
  console.log('These results are awesome', results);
})
.catch(function(err){
  console.error('Oh no there was an error', err);
});




googleTrends.interestOverTime({keyword: 'Women\'s march'})
.then(function(results){
  console.log('These results are awesome', results);
})
.catch(function(err){
  console.error('Oh no there was an error', err);
});


googleTrends.autoComplete({keyword: 'stellar'})
.then(function(results) {
  console.log(results);
})
.catch(function(err) {
  console.error(err);
})







*/
