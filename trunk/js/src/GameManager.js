(function($, window, document, General, undefined) {

	window.GameManager = (function() {

		var ws = new SocketManager(),

			setMenu = function() {
				ws.init(General.getSocketURL());
			},

			bindEvents = function() {



			};

		return {
			init: function() {
				setMenu();
				bindEvents();
			}
		}

	})()

})(jQuery, window, document, Config.General);