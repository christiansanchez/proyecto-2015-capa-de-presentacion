(function($, window, document) {

	window.Config = {};

	window.Config.Map = (function() {
			/**
			 * Game starting settings
			 */
		var WIDTH 		= 800,
			HEIGHT 		= 600,
			RENDER 		= Phaser.AUTO,
			CONTAINER 	= 'game-container';

		return {

			getWidth: function() {
				return WIDTH;
			},

			getHeight: function() {
				return HEIGHT;
			},

			getRender: function() {
				return RENDER;
			},

			getContainer: function() {
				return CONTAINER;
			}
		};

	})();


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
					sprite: FREIGHT_BOAT_SPRITE,
					damageLimit: 8,
					cannons: 8
				},
				speedBoat: {
					qty: SPEEDBOATS,
					sprite: SPEEDBOAT_SPRITE,
					distance: SPEEDBOAT_DISTANCE,
					damageLimit: 3
				}
			},

			BULLETS = 100,

			DEFAULT_VISION	= 300,
			DEFAULT_SPEED 	= 200;

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
			}

		}

	})();

	window.Config.General = (function() {
			/**
			 * General App settings
			 */
		var ASSETS_PATH = 'assets/',

			ASSET_TYPES = {
				SPRITE: 'sprite',
				IMAGE: 'image'
			},

			SERVICE_URL = 'http://localhost:8080/axis2/services/WsFactibilidad/',
			SOCKET_URL 	= 'ws://localhost:8080/examples/websocket/chat';
			//SERVICE_URL = 'http://192.168.43.249/axis2/services/WsFactibilidad/';

		return {
			
			getAssetsPath: function() {
				return ASSETS_PATH;
			},

			getAssetTypes: function() {
				return ASSET_TYPES;
			},

			getServiceURL: function() {
				return SERVICE_URL;
			},

			getSocketURL: function() {
				return SOCKET_URL;
			}

		}

	})();

})(jQuery, window, document);