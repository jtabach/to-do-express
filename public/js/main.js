'use strict';

$(document).ready(function() {
	populateItems();
	$('#addItem').click(addItem);
});

// function addItem() {
// 	var newItem = $('#item').val();
// 	var date = $('#date').val();
// 	$.post('/list', {
// 		item: newItem,
// 		date: date
// 	})
// 	.success(function(data))
// }


function populateItems() {
	$.get('./items', function(data) {
		console.log(data);
		console.log(typeof data);
		var $items = data.map(function(itemObj) {
			return $('<li>').text(itemObj.item);
		});
		var $dates = data.map(function(itemObj) {
			return $('<li>').text(itemObj.date);
		});
		$('#itemOutput').append($items);
		$('#dateOutput').append($dates);



		// var $list = data.map(function(item) {
		// 	return $('<li>').text(item);
		// })
	})
}