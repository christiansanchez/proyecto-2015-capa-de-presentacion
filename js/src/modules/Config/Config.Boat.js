(function($, window, document) {

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
						x: 0,
						y: 0
					},
					gravity: {
						x: 0,
						y: 0
					},
					collideWorldBounds: true
				}
			},

			groupConfig = {
				enableBody: true, 
				physicsBodyType: Phaser.Physics.ARCADE
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
			},

			getGroupConfig: function() {
				return groupConfig;
			}

		}

	})();

})(jQuery, window, document);