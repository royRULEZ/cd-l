var date = new Date();
var options = { year: 'numeric', month: 'short'};
var _resultDate = new Intl.DateTimeFormat('en-GB', options).format(date);
console.log(_resultDate);