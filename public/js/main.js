'use strict';

$(document).ready(function() {
	populateItems();
	$('#addItem').click(addItem);
	$('body').on('click','.delete', deleteItem);
	$('body').on('click','.toggle', toggleItem);
});

function populateItems() {
	$.get('./items', function(data) {
		console.log(data);
		appendItem(data);
	})
}

function addItem() {
	var newItem = $('#item').val();
	var newDate = $('#date').val();
	$.post('./items/add', {
		item: newItem,
		date: newDate,
		checked: false
	})
	.success(function(data) {
		appendItem(data);
	})
	.fail(function(err) {
		alert('something went wrong');
	});
}

function deleteItem() {
	var $tr = $(this).closest('tr');
	var index  = $tr.index() - 1;
	$.post('./items/delete', {"index": index})
	.success(function(data) {
		$tr.remove();
	})
	.fail(function(err) {
		alert('something went wrong');
	});
}

function toggleItem() {
	var $tr = $(this).closest('tr');
	var index = $tr.index() - 1;
	console.log(index);
	$.post('./items/toggle', {"index": index})
	.success(function(data) {
		console.log('checked');
		appendComplete(data, $tr);
	})
	.fail(function(err) {
		alert('something went wrong');
	});
}

function appendItem(data) {
	data.forEach(function(obj) {
		var $task = $('#template').clone();
		$task.removeAttr('id');
		$task.children('.itemOutput').text(obj.item);
		$task.children('.dateOutput').text(obj.date);
		$('#taskList').append($task);
		appendComplete(obj.complete, $task);
	});
}

function appendComplete(data, $row) {
	if (data === true) {
		$row.css('background', 'green');
		console.log($row.children('.toggle'));
		$row.find('.toggle').prop('checked', true);
	} else {
		$row.css('background', 'none');
		$row.find('.toggle').prop('checked', false);
	}
}