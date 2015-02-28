(function(window, document, pubsub, Util, undefined) {

	_.extend(window.SocketManager, (function() {

		var ws,
			gameStarted = false,

			bindEvents = function() {

				ws.onopen = function(evt) {
					console.debug('evt: ', evt);
					/**
					 * Not sure how this should be handled
					 */
					//pubsub.publish(Engine.evts.NEW_PLAYER, Util.parseWebSocketData(evt.data))
				};

				ws.onclose = function(evt) {
					ws.send(evt.data);
				};

				ws.onmessage = function(evt) {
					var data = Util.parseWebSocketData(evt.data);
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

	})());

})(window, document, jQuery.pubsub, window.Util);