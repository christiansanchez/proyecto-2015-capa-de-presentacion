(function($, window, document, undefined) {

	window.Util = (function() {

		var RESULTS_NODE = 'return';

		return {
			parseWebServiceData: function(response) {
				return $(response).find(RESULTS_NODE).text();
			},

			parseWebSocketData: function(data) {
				return data;
			}
		}

	})();

})(jQuery, document, window);