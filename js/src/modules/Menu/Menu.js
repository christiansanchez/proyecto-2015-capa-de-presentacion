(function($, document, window, View, Config, undefined) {

	_.extend(window.Menu, (function() {

			var matches = {},

				parse = function(data) {
					return data;
				};

			return {
				
				init: function() {
					/*Gateway.request({
						method: 'getPartidas'	
					}).then(function(data) {
						matches = parseWebServiceData(data);
						View.bindEvents();
					});*/

					Templates.init();
					//SocketManager.init(Config.getSocketURL());
					View.bindEvents();
				}, 

				getMatches: function() {
					return matches;
				},

				getSavedMatches: function() {
					return matches.saved;
				},

				getStartedMatches: function() {
					return matches.started;
				}
			}

		})());

})(jQuery, document, window, window.Menu.View, Config.General);