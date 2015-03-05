(function(window, document, pubsub, Util, undefined) {

	_.extend(window.SocketManager, (function() {

		var ws,
			gameStarted = false,
			socketCounter = 0,

			dataForLoad = function(data) {
				return _.filter(data.data, function(matchInfo) { 
					return matchInfo.manguera1 == true || matchInfo.manguera1 == false
				}).length > 0;
			},

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
					} else if(data.evt == 'abandonar') {
						Menu.View.showWinner(data.data[0].winner);
					} else if(data.evt == 'setCargarPartida' || (data.data && dataForLoad(data))) {
						var loadedMatch = Game.setMatchData(data.data);
						pubsub.publish('setCargarPartida', loadedMatch.match);
					} else if(data.evt == 'guardar') {
						Menu.View.showSaveConfirmation();
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