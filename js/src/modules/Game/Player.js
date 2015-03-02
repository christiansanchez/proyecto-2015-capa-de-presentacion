(function($, window, document, PlayerConfig, BoatConfig) {

	window.Player = function(options) {

		var type = (options.type == 'freightboat') || (options.rolPartida == 'BARCOCARGUERO') ? 'freightBoat' : 'speedBoat',
			isFreightBoat = PlayerConfig.isFreightBoat(type),
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
				sprite = PlayerConfig.getSprite(type);
			};

			setBoats(type);
			setSprite();

		return {
			getBoats: function() {
				return boats;
			},

			getSprite: function() {
				return sprite;
			},
			
			getType: function() {
				return type;
			}
		}

	};

})(jQuery, window, document, window.Config.Player, window.Config.Boat, window.Boat);