(function($, window, document, Events, Player, undefined) {

	_.extend(window.Engine2, (function() {

		var playersLimit = Player.getPlayersLimit(),
			players = [],
			localPlayer,

			newPlayer = function(data) {
				if(players.length < playersLimit) {
					players.push(new Player(data));
				}
			},

			shoot = function(data) {
				/**
				 * Que dispare el jugador
				 */
			},

			kill = function(data) {
				/**
				 * Eliminar jugador
				 */
			},

			move = function(data) {
				/**
				 * Mover jugador
				 */
			},

			bindEvents = function() {

				jQuery.pubsub.subscribe(EVENTS.NEW_PLAYER, newPlayer);
				jQuery.pubsub.subscribe(EVENTS.SHOT_PLAYER, shoot);
				jQuery.pubsub.subscribe(EVENTS.KILL_PLAYER, kill);
				jQuery.pubsub.subscribe(EVENTS.MOVE_PLAYER, move);

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
			}
		}

	})());

})(jQuery, window, document, window.Engine2.Events, window.Config.Player);