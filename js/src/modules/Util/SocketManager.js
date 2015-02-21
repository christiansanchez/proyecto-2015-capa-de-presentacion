(function(undefined) {

	window.SocketManager = function() {

		var ws,
			bindEvents = function() {

				ws.onopen = function() {
					ws.send(event.data);
				};

				ws.onclose = function(event) {
					ws.send(event.data);
				};

				ws.onmessage = function(event) {
					ws.send(event.data);
				};

			};

		return {

			init: function(url) {
				try {
					ws = new WebSocket(url);
					console.log(ws);
					bindEvents();
				} catch(e) {
					console.log('There was an error tring to open the socket: ', e);
				}
			},

			send: function(message) {
				ws.send(message);
			},

			close: function() {
				ws.close();
			}
		}

	};

})();