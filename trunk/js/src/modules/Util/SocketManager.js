(function(window, document, pubsub, Util, undefined) {

	_.extend(window.SocketManager, (function() {

		var ws,
			gameStarted = false,
			socketCounter = 0,

			bindEvents = function() {
				ws.onclose = function(evt) {
					ws.send(evt.data);
				};

				ws.onmessage = function(evt) {
					var data = Util.parseWebSocketData(evt.data);
					console.log('socketCounter: ', socketCounter++);

					if(data.evt == 'dibujar') {
						pubsub.publish(data.data[0].evt, data.data[0]);
					} else {
						pubsub.publish(data.evt, data.data);
					}
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

	})());

})(window, document, jQuery.pubsub, window.Util);