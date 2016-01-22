'use strict';

var PORT = 4000;

// bring in dependencies
var fs = require('fs');
var express = require('express');
var app = express();
var logger = require('morgan');
var bodyParser = require('body-parser');

// configure general middleware
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

// route definitions
app.get('/', (req, res) => {
	var html = fs.readFileSync('./index.html').toString();
	res.send(html);
});

app.get('/items', (req, res, next) => {
	fs.readFile('./list.json', (err, data) => {
		if (err) return res.status(400).send(err);
		var arr = JSON.parse(data);
		res.send(arr);
	});
});

app.post('/items', (req, res, next) => {
	fs.readFile('./list.json', (err, data) => {
		if (err) return res.status(400).send(err);
		var arr = JSON.parse(data);
		var name = req.body.name;
		arr.push(name);
		fs.writeFile('./list.json', JSON.stringify(arr), (err, data) => {
			if (err) return res.status(400).send(err);
			res.send(name + ' received.\n');
		});
	})
});

// spin up server
app.listen(PORT, () => {
	console.log('Express server listening on port', PORT)
});