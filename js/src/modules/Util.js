(function($, window, document, undefined) {

	window.Util = (function() {

		var RESULTS_NODE = 'return';

		return {
			parse: function(response) {
				return $(response).find(RESULTS_NODE).text();
			}
		}

	})();

})(jQuery, document, window);