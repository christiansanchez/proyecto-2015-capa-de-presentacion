(function($, window, document, Config, undefined) {

	window.Boat = function(type) {

		return Config.isFreightBoat(type) ?
				new FreightBoat() :
				new SpeedBoat();
				
	};

})(jQuery, window, document, window.Config.Player);