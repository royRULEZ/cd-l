var request = require('sync-request');
var res = request('GET', 'https://www.reddit.com/r/cryptocurrency/search.json?q=BTC&restrict_sr=on&limit=100&sort=hot&t=day');
console.log(JSON.parse(res.getBody('utf8')));

