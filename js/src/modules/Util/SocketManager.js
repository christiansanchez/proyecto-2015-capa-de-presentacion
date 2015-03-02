(function(window, document, pubsub, Util, undefined) {

	_.extend(window.SocketManager, (function() {

		var ws,
			gameStarted = false,
			socketCounter = 0,

			bindEvents = function() {

				ws.open = function(evt) {
					console.log('socket opened: ', evt);
				};

				ws.onclose = function(evt) {
					ws.send(evt.data);
				};

				ws.onmessage = function(evt) {
					var data = Util.parseWebSocketData(evt.data);

					if(data.evt == 'dibujar') {
						Game.updateBoat(data.data[0]);
						/*if(data.data[0].evt == 'mover') {
							Game.move(data.data[0]);
						} else if(data.data[0].evt == 'virar') {
							Game.turn(null, data.data[0]);
						}*/
						//pubsub.publish(data.data[0].evt, data.data[0]);
					} else if(data.evt == 'setCargarPartida') {
						var loadedMatch = Game.setMatchData(data.data);
						pubsub.publish(data.evt, loadedMatch.match);
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