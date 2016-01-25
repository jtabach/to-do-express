'use strict';

var express = require('express');
var router = express.Router();

var fs = require('fs');

router.get('/', function(req, res) {
	fs.readFile('./list.json', (err, data) => {
		if (err) return res.status(400).send(err);
		var arr = JSON.parse(data);
		console.log(arr);
		// res.send('arr');
		res.render('index', {
			title: "To-do-list-express",
			tasks: arr
		});
	});

	


});

module.exports = router;