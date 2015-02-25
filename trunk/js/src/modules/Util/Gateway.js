(function($, document, window, General, undefined) {

	_.extend(window.Gateway, (function() {

			var url = General.getServiceURL();

			return {
				request: function(data, method) {
					return $.ajax({
						url: url + method,
						data: data,
						crossDomain: true
					});
				}
			}

		})());

})(jQuery, document, window, window.Config.General);