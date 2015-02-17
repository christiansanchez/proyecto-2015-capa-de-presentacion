(function($, document, window, General, undefined) {

	window.Gateway = (function() {

			var url = General.getServiceURL();

			return {
				request: function(data, method, callback) {
					return $.ajax({
						url: url + method,
						data: data,
						crossDomain: true
					});
				}
			}

		})();

})(jQuery, document, window, window.Config.General);