(function($, window, document, Events, Config, Player, undefined) {

	_.extend(window.Engine, (function() {

		var playersLimit = Config.Player.getPlayersLimit(),
			localPlayer,
			currentMatch,
			role,

			newPlayer = function(evt, data) {
				data = _.isArray(data) ? data[0] : data;

				var match = Matches.getMatch(data.nombrePartida);

				if(!match) {
					Matches.addMatch(data);
					match = Matches.getMatch(data.nombrePartida);
				} else {
					match.status = data.status;
				}

				if(Matches.getPlayers(data.nombrePartida).length < playersLimit) {
					Matches.addPlayer(data.nombrePartida, new Player(data));
					$.modal.close();
					Menu.View.showWaiting(data.nombrePartida);
				}

				if(!role) {
					role = data.rolPartida;
				}

				if(match.status == 'ENCURSO' || Matches.getPlayers(data.nombrePartida).length == playersLimit) {
					$('#menu-container').addClass('hidden');
					$('#game-wrapper').removeClass('hidden');
					
					$.modal.close();
					Game.init(data);
				}

				// SocketManager.send(
				// 		Util.parseToSendWebSocketData(
				// 				SocketManager.Methods.getJoinMethod(),
				// 				data
				// 			)
				// 	)
			},

			shoot = function(evt, data) {
				/**
				 * Que dispare el jugador
				 */
			},

			kill = function(evt, data) {
				/**
				 * Eliminar jugador
				 */
			},

			move = function(evt, data) {
				/**
				 * Mover jugador
				 */
			},

			bindEvents = function() {

				jQuery.pubsub.subscribe(Events.NEW_PLAYER, newPlayer);
				jQuery.pubsub.subscribe('setPartida', newPlayer); // Crear
				jQuery.pubsub.subscribe('unirse', newPlayer); // Unirse

				jQuery.pubsub.subscribe('getUnirsePartida', Menu.View.showModal); // Elegir partida a unirse
				jQuery.pubsub.subscribe('getCargarPartida', Menu.View.showModal); // Elegir partida a unirse
				jQuery.pubsub.subscribe('setCargarPartida', newPlayer); // Elegir partida a unirse

				jQuery.pubsub.subscribe('mover', Game.move); // Mover
				jQuery.pubsub.subscribe('virar', Game.turn); // Virar
				jQuery.pubsub.subscribe('fire', Game.fire)

				// jQuery.pubsub.subscribe(Events.SHOT_PLAYER, shoot);
				// jQuery.pubsub.subscribe(Events.KILL_PLAYER, kill);
				// jQuery.pubsub.subscribe(Events.MOVE_PLAYER, move);
				// jQuery.pubsub.subscribe(Events.ABANDON_PLAYER, abandon);

			};

		return {
			
			init: function() {
				bindEvents();
			},

			getPlayers: function() {
				return players;	
			},

			setLocalPlayer: function(player) {
				localPlayer = player;
			},

			getLocalPlayer: function() {
				return localPlayer;
			},

			getCurrentMatch: function() {
				return currentMatch;
			},

			getMatchName: function() {
				return currentMatch.name;
			},

			getRole: function() {
				return role;
			}
		}

	})());

})(jQuery, window, document, window.Engine.Events, window.Config, window.Player);