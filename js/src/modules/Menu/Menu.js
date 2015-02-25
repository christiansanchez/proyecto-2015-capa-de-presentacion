(function($, document, window, View, Config, undefined) {

	_.extend(window.Menu, (function() {

			var matches = {},

				parse = function(data) {
					return data;
				};

			return {
				
				init: function() {
					SocketManager.init(Config.getSocketURL());
					Templates.init();
					Engine.init();
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