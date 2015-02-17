(function($, window, document, Config, Engine, undefined) {

	window.Game = (function() {

			return {
				init: function() {
					new Phaser.Game(
						Config.getWidth(), 
						Config.getHeight(), 
						Config.getRender(),
						Config.getContainer(),
						{
							preload: Engine.preload,
							create: Engine.create,
							update: Engine.update
						}
					)
				}
			}

		})();

	Game.init()

})(jQuery, window, document, window.Config.Map, window.Engine);