var express = require('express');
var request = require('request');
var parser = require('./parser.js')();
var app = express();

app.use(express.static('public'));

app.get('/home', function (req, res) {
	var address = req.query.address;

	if (!address) {
		res.status(400).send('Please provide an address');
		return;
	}

	request({
		url: 'https://rets.io/api/v1/test/listings',
		qs: {
			access_token: '6baca547742c6f96a6ff71b138424f21',
			limit: 1,
			near: address,
			fields: 'address,price,listDate,foundationDetails'
		}
	}, function (error, response, body) {
		parser.parse(JSON.parse(body), function(result) {
			res.json(result);
		});
	});
});

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server running");
});