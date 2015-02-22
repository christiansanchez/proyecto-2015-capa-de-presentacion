(function(window, document, pubsub, Util, undefined) {

	window.SocketManager = function() {

		var ws,
			gameStarted = false,

			bindEvents = function() {

				ws.onopen = function(event) {
					/**
					 * Not sure how this should be handled
					 */
					$.pubsub.publish(Engine.Events.NEW_PLAYER, Util.parseWebSocketData(event.data))
				};

				ws.onclose = function(event) {
					ws.send(event.data);
				};

				ws.onmessage = function(event) {
					var data = Util.parseWebSocketData(event.data);
					pubsub.publish(data.evt, data.data);
				};

			};

		return {

			init: function(url) {
				try {
					ws = new WebSocket(url);
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
			},

			startGame: function() {
				gameStarted = true;
			}
		}

	};

})(window, document, jQuery.pubsub, window.Util);