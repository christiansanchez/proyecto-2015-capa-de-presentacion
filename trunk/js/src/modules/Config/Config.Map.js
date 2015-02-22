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

})(jQuery, window, document);