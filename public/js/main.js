'use strict';

$(document).ready(function() {
	populateItems();
	$('#addItem').click(addItem);
	$('body').on('click','.delete', deleteItem);
	$('body').on('click','.toggle', toggleItem);
});

function populateItems() {
	$.get('./items', function(data) {
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
	$.post('./items/toggle', {"index": index})
	.success(function(bool) {
		appendComplete(bool, $tr);
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

function appendComplete(bool, $row) {
	if (bool) {
		$row.css('background', '#f5f5f0');
		$row.find('.toggle').prop('checked', true);
	} else {
		$row.css('background', 'none');
		$row.find('.toggle').prop('checked', false);
	}
}