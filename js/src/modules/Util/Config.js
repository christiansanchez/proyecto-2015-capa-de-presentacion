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

	window.Config.Boat = (function() {

		var DEFAULT_TYPE = 'freightboat',

			defaultConfig = {
				speed: 20,
				stamina: 8,
				vision: 100, 
				type: DEFAULT_TYPE,
				reach: 60
			},

			speedBoatsConfig = {
				speed: defaultConfig.speed * 2,
				stamina: 3,
				vision: defaultConfig.vision / 2, 
				type: 'speedboat', 
				reach: defaultConfig.reach * 2
			},

			physicsConfig = {
				anchor: {
					x: 0.5, 
					y: 0.5
				},
				angle: 90,
				body: {
					bounce: {
						y: 0
					},
					gravity: {
						y: 0
					},
					colideWorldBounds: true,
					drag: 0.2
				}
			};

		return {

			getDefaultConfig: function() {
				return defaultConfig;
			},

			getSpeedBoatConfig: function() {
				return speedBoatsConfig;
			},

			getPhysicsConfig: function() {
				return physicsConfig;
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