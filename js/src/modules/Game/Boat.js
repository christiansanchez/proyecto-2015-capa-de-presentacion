(function($, window, document, Default, undefined) {

	window.Boat = function(options) {

		var speed 	= options.speed || Default.speed,
			stamina = options.stamina || Default.stamina,
			vision	= options.vision || Default.vision,
			reach 	= options.reach || Default.reach,
			type 	= options.type || Default.type;

		return {

			getSpeed: function() {
				return speed;
			},

			getStamina: function() {
				return stamina;
			},

			getVision: function() {
				return vision;
			},

			getType: function() {
				return type;
			},

			computeDamage: function() {
				stamina--;
			},

			isDead: function() {
				stamina == 0;
			}
		}
				
	};

})(jQuery, window, document, window.Config.Boat.getDefaultConfig());