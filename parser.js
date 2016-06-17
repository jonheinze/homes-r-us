

module.exports = function() {
	var fields = require('./field-mapping.json');
	var moment = require('moment');

	var handleField = function handleField(key, value) {
		var field = fields[key];

		var transformedValue;

		if (field.type === "text") {
			transformedValue = value;
		} else if (field.type === "number") {
			transformedValue = value;
		} else if (field.type === "array") {
			transformedValue = value.join(', ');
		} else if (field.type === "date") {
			transformedValue = moment(value).format('dddd, MMMM Do YYYY, h:mm:ss a')
		}

		return transformedValue;
	}

	var parse = function parse(data, callback) {
		var bundle = data.bundle;

		if(!bundle || !bundle.length || bundle.length === 0) {
			callback(null);
			return;
		}

		var parsedData = [];
		var house = bundle[0];
		for(var key in house) {
			if(!fields[key]) {
				continue;
			}

			parsedData.push({
				label: fields[key].label,
				value: handleField(key, house[key])
			});
		}

		callback(parsedData);
	}

	return {
		parse: parse
	}
}