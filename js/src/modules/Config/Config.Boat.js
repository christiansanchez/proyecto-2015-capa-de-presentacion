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
						y: 0
					},
					gravity: {
						y: 0
					},
					collideWorldBounds: true,
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

})(jQuery, window, document);