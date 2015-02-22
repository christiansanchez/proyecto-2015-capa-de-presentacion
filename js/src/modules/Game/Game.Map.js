(function($, window, document, Config, Engine, undefined) {

	window.Game = {};

	window.Game.Map = (function() {

			return {
				
				addBackground: function(game, sprite) {
					game.bkg = game.add.tileSprite(0, 0, game.world.width, game.world.height, sprite);
					game.bkg.fixedToCamera = true;

					return game;
				},

				addGroup: function(game, options) {
					var newGroup = game.add.group();
					return _.extend(newGroup, options || {});
				},

				addObject: function(game, group, coords, sprite, options) {
					var obj = group.create(coords.x, coords.y, sprite);
					game.physics.arcade.enable(obj);
					
					return _.extend(obj, options);
				},

				initControls: function(game) {
					/**
				     * Prevents the space from working in the browser
				     * Only works for the game
				     */
				    game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.TAB]);
				    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
				    changeCharacterButton = game.input.keyboard.addKey(Phaser.Keyboard.TAB);
				    cursors = game.input.keyboard.createCursorKeys();
				}
			}

		})();

})(jQuery, window, document, window.Config.Map, window.Engine);