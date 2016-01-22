'use strict';

$(document).ready(function() {
	populateItems();
	$('#addItem').click(addItem);
});

function addItem() {
	var newItem = $('#item').val();
	var newDate = $('#date').val();
	$.post('./items', {
		item: newItem,
		date: newDate
	})
	.success(function(data) {
		console.log(data);
		var $task = $('#template').clone();
		$task.removeAttr('id');
		$task.children('.itemOutput').text(data[0]);
		$task.children('.dateOutput').text(data[1]);
		$('#taskList').append($task);
	})
	.fail(function(err) {
		alert('something went wrong');
	});
}


function populateItems() {
	$.get('./items', function(data) {
		console.log(data);
		data.forEach(function(obj) {
			var $task = $('#template').clone();
			$task.removeAttr('id');
			$task.children('.itemOutput').text(obj.item);
			$task.children('.dateOutput').text(obj.date);
			$('#taskList').append($task);
		}); 
	})
}