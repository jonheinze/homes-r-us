
(function($) {

	var $submitButton = $('#submit');
	var $addressInput = $('#address');
	var $errorMessage = $('#error-message');
	var $homeViewer = $('#home-viewer');

	function noHouseFound() {
		$homeViewer.empty();
		$homeViewer.append('<div class="no-house">We couldn\'t find a house at that address</div>');
	}

	function loadHouse(data) {
		if (!data || !data.length || data.length === 0) {
			noHouseFound();
			return;
		}

		$homeViewer.empty();

		for (var i = 0, l = data.length; i < l; i++) {
			var $div = $('<div />');
			var $label = $('<span class="data-label" />');
			var $value = $('<span class="data-value" />')

			$label.text(data[i].label + ":");
			$value.text(data[i].value);

			$div.append($label);
			$div.append($value);
			$homeViewer.append($div);
		}
	}

	function alertError(message) {
		$errorMessage.text(message);
		$errorMessage.css('top', '0px');
		setTimeout(function removeMessage() {
			$errorMessage.css('top', '');
		}, 3000);
	}

	function noAddressError() {
		alertError("Please input an address.");
		$addressInput.addClass('error');
		$addressInput.one('input', function removeInputError() { $addressInput.removeClass('error'); });
	}

	function ajaxError(error) {
		alertError("Unable to search for homes.");
	}

	function ajaxSuccess(data) {
		if (!data || !data.length || data.length === 0) {
			noHouseFound();
			return;
		}

		loadHouse(data);
	}

	function submitButtonClicked() {
		var address = $addressInput.val();

		if(!address) {
			noAddressError();
			return;
		}

		$.get('/home', { address: address }).
			success(ajaxSuccess).
			fail(ajaxError);
	}

	$submitButton.click(submitButtonClicked);

})($);