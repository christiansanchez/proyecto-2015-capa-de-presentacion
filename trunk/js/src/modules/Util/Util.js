(function($, window, document, undefined) {

	window.Util = (function() {

		var RESULTS_NODE = 'return',
			OBJECT_SEPARATOR = ';';

			parseToObject = function(data) {
				return _.map(data.split(OBJECT_SEPARATOR), function(obj) {
						return JSON.parse(obj);
					});
			};

		return {
			parseWebServiceData: function(response) {
				return parseToObject($(response).find(RESULTS_NODE).text());
			},

			parseWebSocketData: function(data) {
				return data;
			}
		}

	})();

})(jQuery, document, window);