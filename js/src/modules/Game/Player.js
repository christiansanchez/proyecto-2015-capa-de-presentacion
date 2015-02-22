(function($, window, document, Events, Player, Boat) {

	window.Player = function(options) {

		var isFreightBoat = isFreightBoat(options.type),

			setBoats = function(type) {
				var boatsQty 	= Player.getBoatsQty(type),
					config 		= isFreightBoat ?
									Boat.getDefaultConfig() :
									Boat.getSpeedBoatConfig();
				
				for(var i = 0; i < boatsQty; i++) {
					boats.push(new Boat(config));
				}
			},

			boats 	= setBoats(options.type);
			sprite 	= Player.getSprite(options.type);

		return {
			boats: boats,
			sprite: sprite
		}

	};

})(jQuery, window, document, window.Engine2.Events, Config.Player, Config.Boat);