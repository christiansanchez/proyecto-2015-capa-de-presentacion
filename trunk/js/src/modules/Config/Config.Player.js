(function($, window, document) {

	window.Config.Player = (function() {
			/**
			 * Game objects settings
			 */
		var FREIGHT_BOAT = 1, 

			FREIGHT_BOATS_QTY	= 1,
			SPEEDBOATS 			= 3,
			AMUNITION 			= 50,

			FREIGHT_BOAT_SPRITE = 'freightboat',
			SPEEDBOAT_SPRITE 	= 'speedboat',

			SPEEDBOAT_DISTANCE = 100,

			/**
			 * To be used for players configuration
			 */
			PLAYERS = {
				freightBoat: {
					qty: FREIGHT_BOATS_QTY,
					sprite: FREIGHT_BOAT_SPRITE
				},
				speedBoat: {
					qty: SPEEDBOATS,
					sprite: SPEEDBOAT_SPRITE
				}
			},

			BULLETS = 2000,

			DEFAULT_VISION	= 300,
			DEFAULT_SPEED 	= 200,

			PLAYERS_LIMIT = 2;

		return {

			getPlayers: function() {
				return PLAYERS;
			},

			getDefaultSpeed: function() {
				return DEFAULT_SPEED;
			},

			isFreightBoat: function(type) {
				return type == FREIGHT_BOAT;
			},

			getBullets: function() {
				return BULLETS;
			},

			getBoatsQty: function(type) {
				return PLAYERS[type].qty
			},

			getSprite: function(type) {
				return PLAYERS[type].sprite;
			},

			getPlayersLimit: function() {
				return PLAYERS_LIMIT;
			}

		}

	})();

})(jQuery, window, document);