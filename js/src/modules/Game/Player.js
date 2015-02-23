(function($, window, document, PlayerConfig, BoatConfig) {

	window.Player = function(options) {

		var isFreightBoat = PlayerConfig.isFreightBoat(options.type),
			boats = [],
			sprite,

			setBoats = function(type) {
				var boatsQty 	= PlayerConfig.getBoatsQty(type),
					config 		= isFreightBoat ?
									BoatConfig.getDefaultConfig() :
									BoatConfig.getSpeedBoatConfig();
				
				for(var i = 0; i < boatsQty; i++) {
					boats.push(new Boat(config));
				}
			},

			setSprite = function() {
				sprite = PlayerConfig.getSprite(options.type);
			};

			setBoats(options.type);
			setSprite();

		return {
			getBoats: function() {
				return boats;
			},

			getSprite: function() {
				return sprite;
			},
			
			getType: function() {
				return options.type;
			}
		}

	};

})(jQuery, window, document, window.Config.Player, window.Config.Boat, window.Boat);