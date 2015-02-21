(function($, document, window, General, undefined) {

	window.Gateway = (function() {

			var url = General.getServiceURL();

			return {
				request: function(data, method) {
					return $.ajax({
						url: url + method,
						data: data
					});
				}
			}

		})();

})(jQuery, document, window, window.Config.General);