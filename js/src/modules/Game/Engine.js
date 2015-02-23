(function($, window, document, Events, Config, Player, undefined) {

	_.extend(window.Engine, (function() {

		var playersLimit = Config.getPlayersLimit(),
			players = [],
			localPlayer,

			endGame = function() {
				/**
				 * Determine winner or draw.
				 * Show score?
				 */
			},

			newPlayer = function(evt, data) {
				if(players.length < playersLimit) {
					players.push(new Player(data));
				}

				if(players.length == playersLimit) {
					/**
					 * Must be a better way to have this done
					 */
					$('#menu-container').addClass('hidden');
					$('#game-wrapper').removeClass('hidden');
					
					Game.init();
				}
			},

			abandon = function(evt, data) {
				players.splice(data.index, 1);
				endGame();
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
				jQuery.pubsub.subscribe(Events.SHOT_PLAYER, shoot);
				jQuery.pubsub.subscribe(Events.KILL_PLAYER, kill);
				jQuery.pubsub.subscribe(Events.MOVE_PLAYER, move);
				jQuery.pubsub.subscribe(Events.ABANDON_PLAYER, abandon);

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

})(jQuery, window, document, window.Engine.Events, window.Config.Player, window.Player);